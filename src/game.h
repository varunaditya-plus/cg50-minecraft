#ifndef CLASSIC_GAME_H
#define CLASSIC_GAME_H
#include "player.h"
#include <stdint.h>

struct GameEvent;
struct GameSponge;
typedef struct {
    Player player;
    Hit target;
    uint8_t hotbar[9];
    int selected, add_mode, inventory_open, inventory_cursor;
    int memory_full;
    uint32_t time, water_time, lava_time, random;
    struct GameEvent *timers, *water_head, *water_tail, *lava_head, *lava_tail;
    struct GameSponge *sponges;
} Game;

extern const uint8_t classic_inventory[32];
void game_init(Game *game);
void game_dispose(Game *game);
void game_tick(Game *game, const PlayerInput *input);
void game_update_target(Game *game);
int game_left_click(Game *game);
void game_right_click(Game *game);
void game_cycle_slot(Game *game, int delta);
void game_choose_block(Game *game, uint8_t block);

#endif
