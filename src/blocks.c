#include "blocks.h"

int block_plant(uint8_t block)
{
    return block == BLOCK_RED_FLOWER || block == BLOCK_YELLOW_FLOWER ||
        block == BLOCK_BUSH || block == BLOCK_RED_MUSHROOM ||
        block == BLOCK_BROWN_MUSHROOM;
}

int block_water(uint8_t block)
{
    return block == BLOCK_WATER || block == BLOCK_WATER_SURFACE;
}

int block_fluid(uint8_t block)
{
    return block_water(block) || block == BLOCK_LAVA;
}

// Registry module 43936 defaults to solid=!fluid. Plants are pickable;
// physics module 66358 separately excludes their custom crossed meshes.
int block_solid(uint8_t block)
{
    return block != BLOCK_AIR && !block_fluid(block) &&
        block != BLOCK_EMPTY_SPONGE;
}

int block_opaque(uint8_t block)
{
    return block != BLOCK_AIR && !block_plant(block) && !block_fluid(block) &&
        block != BLOCK_LEAVES && block != BLOCK_GLASS &&
        block != BLOCK_EMPTY_SPONGE;
}

// Entry getBrightness/pe use these exceptions, including lava as a blocker.
int block_light_blocker(uint8_t block)
{
    return block != BLOCK_AIR && !block_plant(block) &&
        block != BLOCK_GLASS && block != BLOCK_LEAVES &&
        block != BLOCK_EMPTY_SPONGE;
}
