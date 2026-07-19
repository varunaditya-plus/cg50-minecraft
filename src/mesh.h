#ifndef CLASSIC_MESH_H
#define CLASSIC_MESH_H

#include <stdint.h>

// NOA face order: +X, -X, +Y, -Y, +Z, -Z; 6/7 crossed plants, 8 water plane.
typedef struct {
    uint8_t x, y, z, width, height, face, block, dark;
} ClassicQuad;

// Calculator-sized chunks use the original NOA greedy mask/rectangle algorithm.
ClassicQuad *mesh_build_chunk(int cx, int cy, int cz, unsigned *count);
void mesh_free(void);
const ClassicQuad *mesh_get_chunk(int cx, int cy, int cz, unsigned *count);

#endif
