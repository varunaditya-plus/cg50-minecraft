#include "mesh.h"
#include "world.h"
#include "blocks.h"
#include <limits.h>
#include <stdlib.h>
#ifndef CLASSIC_MESH_BAKE
#include "mesh_data.h"
#endif

// Native translation of NOA's masks and greedy rectangles, module 98296,
// functions o.u(), o.d() and o.f(). Babylon mesh objects are replaced by the
// compact quads below. AO is disabled by the original Classic entry point.
static int boundary_face(uint8_t a, uint8_t b)
{
    int ao = block_opaque(a), bo = block_opaque(b);
    if (ao && bo) return 0;
    if (ao) return 1;
    if (bo) return -1;
    if ((a == 7 && b == 41) || (a == 41 && b == 7)) return 0;
    if (b == 0 || b == 40 || b == 41 || block_plant(b)) return 1;
    if (a == 0 || a == 40 || a == 41 || block_plant(a)) return -1;
    int side = 0;
    if (a == 14) side = 1;
    if (b == 14) side = -1;
    if (a == 7) side = 1;
    if (b == 7) side = -1;
    if (a == 7 && b == 7) side = 0;
    if (a == 7 && b == 14) side = -1;
    if (a == 14 && b == 7) side = 1;
    if (a == 7 && b == 23) side = -1;
    if (a == 23 && b == 7) side = 1;
    if (a == 17 && (b == 14 || b == 23)) side = 1;
    if ((a == 14 || a == 23) && b == 17) side = -1;
    // The browser chooses randomly between two identical leaf materials.
    if (a == 14 && b == 14) side = 1;
    return side;
}

static int append(ClassicQuad **quads, unsigned *count, unsigned *capacity,
    ClassicQuad quad)
{
    if (*count == *capacity) {
        unsigned next = *capacity ? *capacity * 2 : 64;
        void *p = realloc(*quads, next * sizeof(**quads));
        if (!p) return 0;
        *quads = p;
        *capacity = next;
    }
    (*quads)[(*count)++] = quad;
    return 1;
}

ClassicQuad *mesh_build_chunk(int cx, int cy, int cz, unsigned *count)
{
    ClassicQuad *quads = NULL;
    unsigned capacity = 0;
    *count = 0;
    int origin[3] = {cx * 8, cy * 8, cz * 8};
    uint8_t blocks[512], neighbours[6][64];
    world_load_chunk(cx, cy, cz, blocks);
    static const int stride[3] = {1, 64, 8};
    for (int axis = 0; axis < 3; axis++) {
        int u = (axis + 1) % 3, v = (axis + 2) % 3;
        for (int side = 0; side < 2; side++)
            for (int j = 0; j < 8; j++) for (int i = 0; i < 8; i++) {
                int p[3] = {origin[0], origin[1], origin[2]};
                p[axis] += side ? 8 : -1;
                p[u] += i;
                p[v] += j;
                neighbours[axis * 2 + side][j * 8 + i] =
                    world_get(p[0], p[1], p[2]);
            }
    }
    for (int axis = 0; axis < 3; axis++) {
        int u = (axis + 1) % 3, v = (axis + 2) % 3;
        for (int plane = 0; plane <= 8; plane++) {
            int16_t mask[64] = {0};
            for (int j = 0; j < 8; j++) for (int i = 0; i < 8; i++) {
                int p[3] = {origin[0], origin[1], origin[2]};
                p[axis] += plane - 1;
                p[u] += i;
                p[v] += j;
                int index = i * stride[u] + j * stride[v] + plane * stride[axis];
                uint8_t a = plane ? blocks[index - stride[axis]] :
                    neighbours[axis * 2][j * 8 + i];
                p[axis]++;
                uint8_t b = plane < 8 ? blocks[index] :
                    neighbours[axis * 2 + 1][j * 8 + i];
                int side = boundary_face(a, b);
                // Each boundary belongs to the chunk containing its solid.
                if (!side || (plane == 0 && side > 0) ||
                    (plane == 8 && side < 0)) continue;
                uint8_t block = side > 0 ? a : b;
                if (!block || block == 40 || block == 41 ||
                    block_plant(block)) continue;
                if (side < 0) p[axis]--;
                int dark = p[1] < world_light_depth(p[0], p[2]) + 1;
                mask[j * 8 + i] = side * (block | (dark ? 256 : 0));
            }
            for (int j = 0; j < 8; j++) for (int i = 0; i < 8;) {
                int16_t value = mask[j * 8 + i];
                if (!value) { i++; continue; }
                int w = 1, h = 1;
                while (i + w < 8 && mask[j * 8 + i + w] == value) w++;
                for (; j + h < 8; h++) {
                    int k;
                    for (k = 0; k < w; k++)
                        if (mask[(j + h) * 8 + i + k] != value) break;
                    if (k != w) break;
                }
                unsigned code = value > 0 ? value : -value;
                ClassicQuad q = {0};
                uint8_t p[3] = {0};
                p[axis] = plane;
                p[u] = i;
                p[v] = j;
                q.x = p[0]; q.y = p[1]; q.z = p[2];
                q.width = w; q.height = h;
                q.face = axis * 2 + (value < 0);
                q.block = code & 255; q.dark = !!(code & 256);
                if (!append(&quads, count, &capacity, q)) goto failed;
                for (int y = 0; y < h; y++) for (int x = 0; x < w; x++)
                    mask[(j + y) * 8 + i + x] = 0;
                i += w;
            }
        }
    }
    // The original plant mesh (module 71268) is two double-sided diagonal
    // unit planes, centred at (0.5, 0.5, 0.5) in the block.
    for (int y = 0; y < 8; y++) for (int z = 0; z < 8; z++)
        for (int x = 0; x < 8; x++) {
            uint8_t block = blocks[(y * 8 + z) * 8 + x];
            if (block == 41) {
                ClassicQuad q = {x, y + 1, z, 1, 1, 8, block, 1};
                if (!append(&quads, count, &capacity, q)) goto failed;
            }
            if (!block_plant(block)) continue;
            int dark = origin[1] + y <
                world_light_depth(origin[0] + x, origin[2] + z) + 1;
            for (int face = 6; face < 8; face++) {
                ClassicQuad q = {x, y, z, 1, 1, face, block, dark};
                if (!append(&quads, count, &capacity, q)) goto failed;
            }
        }
    if (*count && *count < capacity) {
        void *p = realloc(quads, *count * sizeof(*quads));
        if (p) quads = p;
    }
    return quads;
failed:
    free(quads);
    *count = UINT_MAX;
    return NULL;
}

#ifndef CLASSIC_MESH_BAKE
typedef struct { ClassicQuad *quads; unsigned count; uint32_t revision; } Mesh;
static Mesh edited[2048];

void mesh_free(void)
{
    for (unsigned i = 0; i < 2048; i++) {
        free(edited[i].quads);
        edited[i] = (Mesh){0};
    }
}

const ClassicQuad *mesh_get_chunk(int cx, int cy, int cz, unsigned *count)
{
    unsigned id = (cy * 16 + cz) * 16 + cx;
    uint32_t revision = world_chunk_revision(cx, cy, cz);
    if (!revision) {
        *count = classic_mesh_offsets[id + 1] - classic_mesh_offsets[id];
        return classic_mesh_quads + classic_mesh_offsets[id];
    }
    Mesh *mesh = &edited[id];
    if (revision != mesh->revision) {
        unsigned n;
        ClassicQuad *p = mesh_build_chunk(cx, cy, cz, &n);
        if (n == UINT_MAX) { *count = mesh->count; return mesh->quads; }
        free(mesh->quads);
        mesh->quads = p;
        mesh->count = n;
        mesh->revision = revision;
    }
    *count = mesh->count;
    return mesh->quads;
}
#endif
