#include "world.h"
#include "blocks.h"
#include "level_data.h"
#include <stdlib.h>
#include <string.h>

// The worker's original 128*64*128 level lives compressed in ROM. Only
// edited 8-cube chunks need writable storage on the calculator.
static uint8_t *edited[WORLD_CHUNK_COUNT];
static int8_t light_depth[WORLD_SIZE * WORLD_SIZE];
static struct {
    uint8_t blocks[WORLD_CHUNK_VOLUME];
    int id;
    uint32_t used;
} cache[16];
static uint32_t cache_clock;
uint32_t world_revision;

static int chunk_id(int cx, int cy, int cz)
{
    if(cx < 0 || cx >= 16 || cy < 0 || cy >= 8 || cz < 0 || cz >= 16)
        return -1;
    return (cy * 16 + cz) * 16 + cx;
}

static void decode(int id, uint8_t out[512])
{
    unsigned pos = 0;
    for(uint32_t i = classic_chunk_offsets[id];
        i < classic_chunk_offsets[id + 1]; i++) {
        uint16_t run = classic_chunk_runs[i];
        unsigned length = (run >> 6) + 1;
        memset(out + pos, run & 63, length);
        pos += length;
    }
}

static const uint8_t *chunk(int id)
{
    if(edited[id]) return edited[id];
    unsigned oldest = 0;
    for(unsigned i = 0; i < 16; i++) {
        if(cache[i].id == id) {
            cache[i].used = ++cache_clock;
            return cache[i].blocks;
        }
        if(cache[i].used < cache[oldest].used) oldest = i;
    }
    decode(id, cache[oldest].blocks);
    cache[oldest].id = id;
    cache[oldest].used = ++cache_clock;
    return cache[oldest].blocks;
}

void world_reset(void)
{
    for(int i = 0; i < WORLD_CHUNK_COUNT; i++) {
        free(edited[i]);
        edited[i] = NULL;
    }
    for(unsigned i = 0; i < 16; i++) {
        cache[i].id = -1;
        cache[i].used = 0;
    }
    memcpy(light_depth, classic_light_depth, sizeof light_depth);
    cache_clock = 0;
    world_revision++;
}

void world_init(void)
{
    world_reset();
}

uint32_t world_seed(void)
{
    return classic_seed;
}

// Entry me() supplies an ocean/bedrock boundary and forces the bottom layer.
// Its last x/z row is outside the editable world, as in the web version.
uint8_t world_get(int x, int y, int z)
{
    if(y < 0) return BLOCK_BEDROCK;
    if(y >= WORLD_HEIGHT) return BLOCK_AIR;
    if(x < 0 || x >= WORLD_SIZE - 1 || z < 0 || z >= WORLD_SIZE - 1)
        return y <= 28 ? BLOCK_BEDROCK : y <= 30 ? BLOCK_WATER : BLOCK_AIR;
    if(y == 0) return BLOCK_BEDROCK;
    int id = chunk_id(x >> 3, y >> 3, z >> 3);
    return chunk(id)[((y & 7) * 8 + (z & 7)) * 8 + (x & 7)];
}

int world_set(int x, int y, int z, uint8_t block)
{
    if(x < 0 || x >= WORLD_SIZE - 1 || z < 0 || z >= WORLD_SIZE - 1 ||
        y <= 0 || y >= WORLD_HEIGHT || block > BLOCK_WATER_SURFACE)
        return 0;
    int id = chunk_id(x >> 3, y >> 3, z >> 3);
    unsigned local = ((y & 7) * 8 + (z & 7)) * 8 + (x & 7);
    if(chunk(id)[local] == block) return 1;
    if(!edited[id]) {
        edited[id] = malloc(WORLD_CHUNK_VOLUME);
        if(!edited[id]) return 0;
        decode(id, edited[id]);
    }
    edited[id][local] = block;
    world_revision++;
    return 1;
}

void world_load_chunk(int cx, int cy, int cz, uint8_t out[512])
{
    int id = chunk_id(cx, cy, cz);
    if(id >= 0) {
        memcpy(out, chunk(id), 512);
        if(cy == 0) memset(out, BLOCK_BEDROCK, 64);
        if(cx == 15 || cz == 15) {
            for(int y = 0; y < 8; y++)
                for(int z = 0; z < 8; z++)
                    for(int x = 0; x < 8; x++)
                        if(cx * 8 + x == 127 || cz * 8 + z == 127)
                            out[(y * 8 + z) * 8 + x] =
                                world_get(cx * 8 + x, cy * 8 + y, cz * 8 + z);
        }
    } else {
        for(int y = 0; y < 8; y++)
            for(int z = 0; z < 8; z++)
                for(int x = 0; x < 8; x++)
                    out[(y * 8 + z) * 8 + x] =
                        world_get(cx * 8 + x, cy * 8 + y, cz * 8 + z);
    }
}

int world_chunk_modified(int cx, int cy, int cz)
{
    int id = chunk_id(cx, cy, cz);
    return id >= 0 && edited[id] != NULL;
}

uint32_t world_chunk_revision(int cx, int cy, int cz)
{
    static const int8_t adjacent[7][3] = {
        {0,0,0}, {-1,0,0}, {1,0,0}, {0,-1,0}, {0,1,0}, {0,0,-1}, {0,0,1}
    };
    for(unsigned i = 0; i < 7; i++)
        if(world_chunk_modified(cx + adjacent[i][0], cy + adjacent[i][1],
            cz + adjacent[i][2])) return world_revision;
    return 0;
}

int world_light_depth(int x, int z)
{
    if(x < 0 || x >= WORLD_SIZE - 1 || z < 0 || z >= WORLD_SIZE - 1)
        return 29;
    return light_depth[z * WORLD_SIZE + x];
}

void world_add_light(int x, int y, int z)
{
    if(x >= 0 && x < WORLD_SIZE - 1 && z >= 0 && z < WORLD_SIZE - 1 &&
        y >= light_depth[z * WORLD_SIZE + x])
        light_depth[z * WORLD_SIZE + x] = y;
}

void world_remove_light(int x, int y, int z)
{
    if(x < 0 || x >= WORLD_SIZE - 1 || z < 0 || z >= WORLD_SIZE - 1 ||
        y < light_depth[z * WORLD_SIZE + x]) return;
    // Entry removeBlockCheckLit starts one cell BELOW the removed cell.
    uint8_t block = BLOCK_AIR;
    while(!block_light_blocker(block) && y >= 0)
        block = world_get(x, --y, z);
    light_depth[z * WORLD_SIZE + x] = y;
}
