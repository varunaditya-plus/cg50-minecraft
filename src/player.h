#ifndef MINECRAFT_PLAYER_H
#define MINECRAFT_PLAYER_H

#include <stdint.h>

// Classic NOA player dimensions, entry.js and module 37119.
#define PLAYER_WIDTH 0.6f
#define PLAYER_HEIGHT 1.8f
#define PLAYER_EYE_HEIGHT 1.62f
#define PLAYER_TICK_MS 30

typedef struct {
    float base[3], max[3], size[3];
} PlayerBox;

typedef struct {
    float position[3]; // Centre x/z, feet y; NOA position component.
    float velocity[3];
    float yaw, pitch;
    PlayerBox box;
    float forces[3], impulses[3];
    float friction;
    double gravity_multiplier;
    int resting[3], in_fluid, auto_step, sleep_frames;
    int jump_count, is_jumping, jump_time, jump_was_pressed;
} Player;

typedef struct {
    int forward, backward, left, right, jump;
} PlayerInput;

typedef struct {
    int valid, x, y, z, nx, ny, nz;
    uint8_t block;
    float distance;
} Hit;

void player_init(Player *player, float x, float y, float z);
void player_tick(Player *player, const PlayerInput *input);
void player_look(Player *player, float dyaw, float dpitch);
void player_direction(const Player *player, float out[3]);
void player_pick(const Player *player, Hit *hit);

#endif
