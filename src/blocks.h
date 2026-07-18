#ifndef CLASSIC_BLOCKS_H
#define CLASSIC_BLOCKS_H
#include <stdint.h>

// IDs from the shipped Classic entry module, registerBlock calls.
enum {
    BLOCK_AIR = 0, BLOCK_GRASS = 1, BLOCK_STONE = 2, BLOCK_DIRT = 3,
    BLOCK_WOOD = 4, BLOCK_RED_FLOWER = 5, BLOCK_YELLOW_FLOWER = 6,
    BLOCK_WATER = 7, BLOCK_BUSH = 8, BLOCK_ROCK = 9, BLOCK_BEDROCK = 10,
    BLOCK_SAND = 11, BLOCK_GRAVEL = 12, BLOCK_TREE = 13, BLOCK_LEAVES = 14,
    BLOCK_RED_MUSHROOM = 15, BLOCK_BROWN_MUSHROOM = 16, BLOCK_LAVA = 17,
    BLOCK_GOLD_ORE = 18, BLOCK_IRON_ORE = 19, BLOCK_COAL_ORE = 20,
    BLOCK_GOLD = 21, BLOCK_SPONGE = 22, BLOCK_GLASS = 23,
    BLOCK_COLOR_FIRST = 24, BLOCK_COLOR_LAST = 39,
    BLOCK_EMPTY_SPONGE = 40, BLOCK_WATER_SURFACE = 41,
};
int block_solid(uint8_t block);
int block_fluid(uint8_t block);
int block_opaque(uint8_t block);
int block_light_blocker(uint8_t block);
int block_plant(uint8_t block);
int block_water(uint8_t block);

#endif
