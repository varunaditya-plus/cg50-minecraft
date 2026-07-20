#include "ui.h"
#include "assets.h"
#include <gint/display.h>

static void sprite(const ClassicSprite *image, int left, int top, int width,
    int height)
{
    for (int y = 0; y < height; y++) for (int x = 0; x < width; x++) {
        unsigned src = (y * image->height / height) * image->width +
            x * image->width / width;
        if (image->alpha[src] >= 128 && left + x >= 0 && left + x < DWIDTH &&
            top + y >= 0 && top + y < DHEIGHT)
            gint_vram[(top + y) * DWIDTH + left + x] = image->pixels[src];
    }
}

static const ClassicSprite *preview(uint8_t block)
{
    for (int i = 0; i < 32; i++)
        if (classic_inventory_blocks[i] == block) return &classic_previews[i];
    return NULL;
}

static void text(int x, int y, const char *s)
{
    dtext(x + 1, y + 1, C_BLACK, s);
    dtext(x, y, C_WHITE, s);
}

void ui_draw(const Game *game, int paused)
{
    // Module 187: original 184x24 hotbar coordinates, at 2x scale.
    int left = (DWIDTH - 368) / 2, top = DHEIGHT - 48;
    sprite(&classic_hotbar_background, left + 2, top + 2, 364, 44);
    for (int i = 0; i < 9; i++) {
        const ClassicSprite *p = preview(game->hotbar[i]);
        if (p) sprite(p, left + i * 40 + 8, top + 8, 32, 32);
    }
    sprite(&classic_hotbar_selection, left + game->selected * 40, top, 48, 48);
    sprite(&classic_crosshair, DWIDTH / 2 - 5, DHEIGHT / 2 - 5, 10, 10);
    text(4, 4, "Minecraft Classic");
    text(4, 16, game->add_mode ? "F5 Place   F6 Mode" : "F5 Break   F6 Mode");
    if (game->memory_full) text(4, 30, "No free memory for more block changes");
    if (game->inventory_open) {
        drect(30, 8, DWIDTH - 31, 218, 0x2104);
        text(40, 14, "Select block");
        text(238, 14, "F5 / EXE select");
        for (int i = 0; i < 32; i++) {
            int x = 40 + (i % 8) * 40, y = 42 + (i / 8) * 40;
            if (i == game->inventory_cursor) drect(x - 3, y - 3, x + 34,
                y + 34, 0xad55);
            sprite(&classic_previews[i], x, y, 32, 32);
        }
        text(40, 204, classic_block_names[classic_inventory[game->inventory_cursor]]);
    }
    if (paused) {
        drect(60, 26, DWIDTH - 61, 171, 0x2104);
        text(76, 36, "Game paused");
        text(76, 56, "8456: walk   D-pad: look");
        text(76, 70, "F5: click   F6: switch build mode");
        text(76, 84, "cos / tan: change hotbar slot");
        text(76, 98, "SHIFT: jump   OPTN: inventory");
        text(76, 126, "EXE / EXIT: resume");
        text(76, 144, "MENU: quit");
    }
}
