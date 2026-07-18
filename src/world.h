#ifndef CLASSIC_WORLD_H
#define CLASSIC_WORLD_H
#include <stdint.h>

#define WORLD_SIZE 128
#define WORLD_HEIGHT 64
#define WORLD_CHUNK_SIZE 8
#define WORLD_CHUNK_VOLUME 512
#define WORLD_CHUNK_COUNT 2048

extern uint32_t world_revision;
void world_init(void);
void world_reset(void);
uint8_t world_get(int x, int y, int z);
int world_set(int x, int y, int z, uint8_t block);
void world_load_chunk(int cx, int cy, int cz, uint8_t out[512]);
int world_chunk_modified(int cx, int cy, int cz);
uint32_t world_chunk_revision(int cx, int cy, int cz);
int world_light_depth(int x, int z);
void world_add_light(int x, int y, int z);
void world_remove_light(int x, int y, int z);
uint32_t world_seed(void);

#endif
