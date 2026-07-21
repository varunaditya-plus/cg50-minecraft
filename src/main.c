#include <gint/display.h>
#include <gint/keyboard.h>
#include <gint/timer.h>
#include <gint/cpu.h>
#include "game.h"
#include "mesh.h"
#include "renderer.h"
#include "ui.h"

static Game game;
static volatile uint32_t ticks;

static int tick(void)
{
    ticks++;
    return TIMER_CONTINUE;
}

int main(void)
{
    game_init(&game);
    int timer = timer_configure(TIMER_ANY, PLAYER_TICK_MS * 1000,
        GINT_CALL(tick));
    if (timer < 0) {
        dclear(C_BLACK);
        dtext(12, 12, C_WHITE, "Could not start the game timer");
        dupdate();
        getkey();
        game_dispose(&game);
        return 1;
    }
    timer_start(timer);
    uint32_t previous = ticks;
    int paused = 0, redraw = 1;
    for (;;) {
        cleareventflips();
        clearevents();
        if (keydown(KEY_MENU)) break;
        if (keypressed(KEY_EXIT)) {
            if (game.inventory_open) game.inventory_open = 0;
            else paused = !paused;
            redraw = 1;
        }
        if (paused && keypressed(KEY_EXE)) { paused = 0; redraw = 1; }
        if (!paused) {
            if (keypressed(KEY_OPTN)) {
                game.inventory_open = !game.inventory_open;
                redraw = 1;
            }
            if (game.inventory_open) {
                int row = game.inventory_cursor / 8, col = game.inventory_cursor % 8;
                if (keypressed(KEY_LEFT) || keypressed(KEY_COS)) col = (col + 7) % 8;
                if (keypressed(KEY_RIGHT) || keypressed(KEY_TAN)) col = (col + 1) % 8;
                if (keypressed(KEY_UP)) row = (row + 3) % 4;
                if (keypressed(KEY_DOWN)) row = (row + 1) % 4;
                int cursor = row * 8 + col;
                if (cursor != game.inventory_cursor) { game.inventory_cursor = cursor; redraw = 1; }
                if (keypressed(KEY_F5) || keypressed(KEY_EXE)) {
                    game_choose_block(&game, classic_inventory[game.inventory_cursor]);
                    game.inventory_open = 0;
                    redraw = 1;
                }
            } else {
                if (keypressed(KEY_COS)) { game_cycle_slot(&game, -1); redraw = 1; }
                if (keypressed(KEY_TAN)) { game_cycle_slot(&game, 1); redraw = 1; }
                if (keypressed(KEY_F6)) { game_right_click(&game); redraw = 1; }
                if (keypressed(KEY_F5)) { game_left_click(&game); redraw = 1; }
            }
        }
        uint32_t now = ticks;
        if (paused) previous = now;
        else if ((int32_t)(now - previous) > 0) {
            PlayerInput input = {!game.inventory_open && keydown(KEY_8),
                !game.inventory_open && keydown(KEY_5),
                !game.inventory_open && keydown(KEY_4),
                !game.inventory_open && keydown(KEY_6),
                !game.inventory_open && keydown(KEY_SHIFT)};
            uint32_t catchup_start = ticks;
            while ((int32_t)(ticks - previous) > 0) {
                // Original game-shell module 9886 catches up every owed
                // 30 ms tick. Its 175 ms budget limits catch-up work, not
                // elapsed time. Six hardware ticks approximate that budget.
                if (ticks - catchup_start >= 6) { previous = ticks + 1; break; }
                if (!game.inventory_open) player_look(&game.player,
                    (keydown(KEY_RIGHT) - keydown(KEY_LEFT)) * 0.045f,
                    (keydown(KEY_DOWN) - keydown(KEY_UP)) * 0.045f);
                game_tick(&game, &input);
                previous++;
            }
            redraw = 1;
        }
        if (redraw) {
            renderer_draw(&game, gint_vram);
            ui_draw(&game, paused);
            dupdate();
            redraw = 0;
        } else sleep();
    }
    timer_stop(timer);
    mesh_free();
    game_dispose(&game);
    return 0;
}
