#include "renderer.h"
#include "mesh.h"
#include "world.h"
#include "blocks.h"
#include "assets.h"
#include <math.h>
#include <stdlib.h>
#include <string.h>

// Platform replacement for Babylon's camera and rasteriser. Geometry, UVs,
// light-depth shading and texture pixels come from the original NOA mesher.
// Render at 198x112 and nearest-scale to the CG50's RGB565 LCD.
enum { WIDTH = 198, HEIGHT = 112, FIXED = 4096, FOCAL = 80, FAR = 48 };
static uint16_t pixels[WIDTH * HEIGHT], depth[WIDTH * HEIGHT];
enum { TILE_COLUMNS = (WIDTH + 7) / 8, TILE_COUNT = TILE_COLUMNS * (HEIGHT / 8) };
static uint16_t tile_depth[TILE_COUNT];
static uint8_t tile_coverage[TILE_COUNT][8], tile_rows[TILE_COUNT];
typedef struct { int x, y, z, u, v; } Vertex;
typedef struct { int x, y, q, uq, vq; } Screen;
typedef struct { int matrix[3][3], eye[3]; } Camera;
typedef struct { uint16_t id; int distance; } VisibleChunk;
static VisibleChunk visible[2048];

static int transform_row(const Camera *c, int row, int x, int y, int z)
{
    return (x * c->matrix[row][0] >> 12) +
        (y * c->matrix[row][1] >> 12) + (z * c->matrix[row][2] >> 12);
}

static Vertex view(const Camera *c, int x, int y, int z, int u, int v)
{
    x -= c->eye[0]; y -= c->eye[1]; z -= c->eye[2];
    Vertex p = {transform_row(c, 0, x, y, z),
        transform_row(c, 1, x, y, z), transform_row(c, 2, x, y, z), u, v};
    return p;
}

static void clouds(const Camera *c, uint32_t time)
{
    // Original module 89495: a 2000x2000 textured plane at y=68.
    // Entry tick advances its uOffset by 2e-7 * game time. Intersect each
    // camera scanline with that plane, using the original PNG pixels.
    int height = 68 * FIXED - c->eye[1];
    int drift = (int)(fmodf(time * 2e-7f, 1.0f) * 256 * 65536);
    for (int y = 0; y < HEIGHT; y++) {
        int vy = ((HEIGHT * 2 - y * 4 - 2) * FIXED) / (4 * FOCAL);
        int ry = (c->matrix[1][1] * vy >> 12) + c->matrix[2][1];
        if (!ry || (ry < 0) != (height < 0)) continue;
        int64_t distance = (int64_t)height * FIXED / ry;
        if (distance < 410 || distance > 2000 * FIXED) continue;
        int vx = ((-WIDTH * 2 + 2) * FIXED) / (4 * FOCAL);
        int rx = (c->matrix[0][0] * vx >> 12) +
            (c->matrix[1][0] * vy >> 12) + c->matrix[2][0];
        int rz = (c->matrix[0][2] * vx >> 12) +
            (c->matrix[1][2] * vy >> 12) + c->matrix[2][2];
        int64_t px = c->eye[0] + (distance * rx >> 12);
        int64_t pz = c->eye[2] + (distance * rz >> 12);
        int u = (int)(px * 256 * 65536 / (2000 * FIXED)) + 128 * 65536 + drift;
        int v = (int)(pz * 256 * 65536 / (2000 * FIXED)) + 128 * 65536;
        int du = (int)(distance * c->matrix[0][0] * 256 * 65536 /
            ((int64_t)FOCAL * FIXED * 2000 * FIXED));
        int dv = (int)(distance * c->matrix[0][2] * 256 * 65536 /
            ((int64_t)FOCAL * FIXED * 2000 * FIXED));
        unsigned q = (unsigned)(((int64_t)1 << 24) / distance);
        for (int x = 0; x < WIDTH; x++, u += du, v += dv) {
            unsigned sample = ((v >> 16) & 255) * 256 + ((u >> 16) & 255);
            unsigned at = y * WIDTH + x;
            pixels[at] = classic_clouds.pixels[sample];
            depth[at] = q;
        }
    }
}

static int plane_distance(Vertex p, int plane)
{
    switch (plane) {
    case 0: return p.z - 410; // Original camera near distance 0.1.
    case 1: return FAR * FIXED - p.z;
    case 2: return p.z * (WIDTH / 2) + p.x * FOCAL;
    case 3: return p.z * (WIDTH / 2) - p.x * FOCAL;
    case 4: return p.z * (HEIGHT / 2) + p.y * FOCAL;
    default: return p.z * (HEIGHT / 2) - p.y * FOCAL;
    }
}

static int interpolate(int a, int b, int numerator, int denominator)
{
    return a + (int)(((int64_t)b - a) * numerator / denominator);
}

static int clip(const Vertex *in, int count, Vertex *out, int plane)
{
    int n = 0;
    Vertex a = in[count - 1];
    int da = plane_distance(a, plane);
    for (int i = 0; i < count; i++) {
        Vertex b = in[i];
        int db = plane_distance(b, plane);
        if ((da < 0) != (db < 0)) {
            int denominator = da - db;
            out[n++] = (Vertex){interpolate(a.x, b.x, da, denominator),
                interpolate(a.y, b.y, da, denominator),
                interpolate(a.z, b.z, da, denominator),
                interpolate(a.u, b.u, da, denominator),
                interpolate(a.v, b.v, da, denominator)};
        }
        if (db >= 0) out[n++] = b;
        a = b; da = db;
    }
    return n;
}

static uint16_t shade(uint16_t color, unsigned brightness)
{
    unsigned r = ((color >> 11) * brightness) >> 5;
    unsigned g = (((color >> 5) & 63) * brightness) >> 5;
    unsigned b = ((color & 31) * brightness) >> 5;
    return (r << 11) | (g << 5) | b;
}

static uint16_t blend(uint16_t a, uint16_t b, unsigned alpha)
{
    unsigned inv = 32 - alpha;
    unsigned r = ((a >> 11) * alpha + (b >> 11) * inv) >> 5;
    unsigned g = (((a >> 5) & 63) * alpha + ((b >> 5) & 63) * inv) >> 5;
    unsigned blue = ((a & 31) * alpha + (b & 31) * inv) >> 5;
    return (r << 11) | (g << 5) | blue;
}

static Screen project(Vertex v)
{
    // floor(2^32/z), using SH4's 32-bit divide. Adding one is necessary
    // exactly when z divides 2^32, i.e. z is a power of two.
    unsigned z = v.z;
    int q = (int)(UINT32_MAX / z + ((z & (z - 1)) == 0));
    return (Screen){WIDTH * 8 + v.x * (FOCAL * 16) / v.z,
        HEIGHT * 8 - v.y * (FOCAL * 16) / v.z, q,
        (int)((int64_t)v.u * q >> 8), (int)((int64_t)v.v * q >> 8)};
}

// First complete coverage establishes a conservative tile depth. Later writes
// normally move nearer; retaining the old minimum avoids rescanning each pixel.
static void cover_tile(int x, int y)
{
    unsigned tile = (y >> 3) * TILE_COLUMNS + (x >> 3);
    if (tile_depth[tile]) {
        // Keep the bound safe even if a depth conversion wraps to uint16_t.
        if (depth[y * WIDTH + x] < tile_depth[tile])
            tile_depth[tile] = depth[y * WIDTH + x];
        return;
    }
    uint8_t *row = &tile_coverage[tile][y & 7], old = *row;
    *row |= 1u << (x & 7);
    unsigned full = (x >> 3) == TILE_COLUMNS - 1 ?
        (1u << (WIDTH - (TILE_COLUMNS - 1) * 8)) - 1 : 255;
    if (old == full || *row != full || ++tile_rows[tile] != 8) return;
    unsigned minimum = UINT16_MAX;
    for (int yy = (y >> 3) * 8; yy < (y >> 3) * 8 + 8; yy++)
        for (int xx = (x >> 3) * 8; xx < (x >> 3) * 8 + 8 && xx < WIDTH; xx++)
            if (depth[yy * WIDTH + xx] < minimum)
                minimum = depth[yy * WIDTH + xx];
    tile_depth[tile] = minimum;
}

static int tiles_occlude(Screen a, Screen b, Screen c, int area,
    int miny, int maxy)
{
    int minx = a.x, maxx = a.x, nearest = a.q;
    Screen points[2] = {b, c};
    for (int i = 0; i < 2; i++) {
        if (points[i].x < minx) minx = points[i].x;
        if (points[i].x > maxx) maxx = points[i].x;
        if (points[i].q > nearest) nearest = points[i].q;
    }
    minx = (minx + 7) / 16;
    maxx = (maxx - 8) / 16;
    if (minx < 0) minx = 0;
    if (maxx >= WIDTH) maxx = WIDTH - 1;
    if (minx > maxx) return 0;
    unsigned minimum = UINT16_MAX;
    for (int y = miny >> 3; y <= maxy >> 3; y++)
        for (int x = minx >> 3; x <= maxx >> 3; x++) {
            unsigned bound = tile_depth[y * TILE_COLUMNS + x];
            if (bound <= (unsigned)(nearest >> 8)) return 0;
            if (bound < minimum) minimum = bound;
        }
    // Edge rounding and first-column endpoint division can sample up to one
    // pixel outside a thin triangle. Bound sixteen subpixels of q slope
    // plus fixed-point rounding before rejecting.
    // Cross multiplication avoids the gradient divisions this test replaces.
    int gap = (int)(minimum * 256) - nearest - 8;
    if (gap <= 0) return 0;
    int64_t slope = ((int64_t)b.q - a.q) * (c.y - a.y) -
        ((int64_t)c.q - a.q) * (b.y - a.y);
    uint64_t magnitude = slope < 0 ? (uint64_t)(-slope) : (uint64_t)slope;
    return (uint64_t)(unsigned)gap * (unsigned)abs(area) > magnitude * 16;
}

typedef struct { int64_t x, y; } Gradient;

static Gradient gradient(int av, int bv, int cv, Screen a, Screen b,
    Screen c, int area)
{
    int64_t ab = (int64_t)bv - av, ac = (int64_t)cv - av;
    // Screen positions use sixteenths of a pixel. Slopes use eight extra
    // fractional bits, retaining smooth perspective-correct UV interpolation
    // without any divisions in the scanline setup.
    return (Gradient){(ab * (c.y-a.y) - ac * (b.y-a.y)) * 4096 / area,
        (ac * (b.x-a.x) - ab * (c.x-a.x)) * 4096 / area};
}

static int64_t attribute_start(int value, Gradient g, Screen origin,
    int x, int y)
{
    return (int64_t)value * 256 +
        (g.x * (x*16+8-origin.x) + g.y * (y*16+8-origin.y)) / 16;
}

static inline int divide_uv(int numerator, unsigned denominator,
    unsigned reciprocal)
{
    // Two UV coordinates share one reciprocal division per pixel. The SH4
    // multiplies directly into MACH:MACL; correct its at-most-one-unit
    // underestimate to retain exact C signed-division texture selection.
    unsigned magnitude = numerator < 0 ? 0u-(unsigned)numerator :
        (unsigned)numerator;
    unsigned quotient = (unsigned)((uint64_t)magnitude*reciprocal >> 32);
    if (magnitude-quotient*denominator >= denominator) quotient++;
    return numerator < 0 ? (int)(0u-quotient) : (int)quotient;
}

static void triangle(Screen a, Screen b, Screen c, int texture,
    unsigned brightness, int transparent)
{
    Screen points[3] = {a, b, c};
    int area = (b.x-a.x)*(c.y-a.y) - (c.x-a.x)*(b.y-a.y);
    if (!area) return;
    int miny = a.y, maxy = a.y;
    for (int i = 1; i < 3; i++) {
        if (points[i].y < miny) miny = points[i].y;
        if (points[i].y > maxy) maxy = points[i].y;
    }
    miny = (miny + 7) / 16;
    maxy = (maxy - 8) / 16;
    if (miny < 0) miny = 0;
    if (maxy >= HEIGHT) maxy = HEIGHT - 1;
    if (miny > maxy) return;
    if (tiles_occlude(a, b, c, area, miny, maxy)) return;
    Gradient qgradient = gradient(a.q,b.q,c.q,a,b,c,area);
    Gradient ugradient = gradient(a.uq,b.uq,c.uq,a,b,c,area);
    Gradient vgradient = gradient(a.vq,b.vq,c.vq,a,b,c,area);
    for (int y = miny; y <= maxy; y++) {
        int scan = y * 16 + 8, n = 0;
        int ends[3];
        for (int i = 0; i < 3; i++) {
            Screen p = points[i], q = points[(i + 1) % 3];
            if ((p.y <= scan && q.y > scan) || (q.y <= scan && p.y > scan))
                // Clipped coordinates bound this product below 2^31.
                ends[n++] = p.x + (q.x-p.x)*(scan-p.y)/(q.y-p.y);
        }
        if (n < 2) continue;
        int left = ends[0], right = ends[1];
        if (left > right) { int t = left; left = right; right = t; }
        if (left == right) continue;
        int start = (left + 7) / 16, end = (right - 8) / 16;
        if (start < 0) start = 0;
        if (end >= WIDTH) end = WIDTH - 1;
        if (start > end) continue;
        int64_t qvalue = attribute_start(a.q,qgradient,a,start,y);
        int64_t uvalue = attribute_start(a.uq,ugradient,a,start,y);
        int64_t vvalue = attribute_start(a.vq,vgradient,a,start,y);
        unsigned pos = y * WIDTH + start;
        for (int x = start; x <= end; x++, pos++, qvalue += qgradient.x,
            uvalue += ugradient.x, vvalue += vgradient.x) {
            int q = (int)(qvalue/256);
            int uq = (int)(uvalue/256), vq = (int)(vvalue/256);
            if (q <= 0 || (unsigned)(q >> 8) <= depth[pos]) continue;
            unsigned reciprocal = UINT32_MAX/(unsigned)q;
            unsigned texel = (divide_uv(vq,q,reciprocal) & 15) * 16 +
                (divide_uv(uq,q,reciprocal) & 15);
            unsigned alpha = classic_texture_alpha[texture][texel];
            if (alpha < 128) continue;
            uint16_t color = shade(classic_textures[texture][texel], brightness);
            if (transparent) color = blend(color, pixels[pos], transparent);
            pixels[pos] = color;
            depth[pos] = q >> 8;
            cover_tile(x, y);
        }
    }
}

static void polygon(Vertex *vertices, int texture, unsigned light, int alpha)
{
    unsigned outside = 0, common = 63;
    for (int i = 0; i < 4; i++) {
        unsigned code = 0;
        for (int plane = 0; plane < 6; plane++)
            if (plane_distance(vertices[i],plane) < 0) code |= 1u << plane;
        outside |= code;
        common &= code;
    }
    if (common) return;
    if (!outside) {
        Screen a = project(vertices[0]), b = project(vertices[1]);
        Screen c = project(vertices[2]), d = project(vertices[3]);
        triangle(a,b,c,texture,light,alpha);
        triangle(a,c,d,texture,light,alpha);
        return;
    }
    Vertex buffers[2][12];
    memcpy(buffers[0], vertices, 4 * sizeof(Vertex));
    int count = 4, side = 0;
    for (int plane = 0; plane < 6 && count; plane++) {
        if (!(outside & (1u << plane))) continue;
        count = clip(buffers[side], count, buffers[!side], plane);
        side = !side;
    }
    if (count < 3) return;
    Screen first = project(buffers[side][0]);
    Screen previous = project(buffers[side][1]);
    for (int i = 2; i < count; i++) {
        Screen next = project(buffers[side][i]);
        triangle(first, previous, next, texture, light, alpha);
        previous = next;
    }
}

static void draw_quad(const Camera *camera, int cx, int cy, int cz,
    const ClassicQuad *q, int pass, int preview_alpha)
{
    int fluid = block_fluid(q->block);
    if (!preview_alpha && !!fluid != pass) return;
    int face = q->face == 8 ? 2 : q->face;
    int x = (cx * 8 + q->x) * FIXED;
    int y = (cy * 8 + q->y) * FIXED;
    int z = (cz * 8 + q->z) * FIXED;
    int axis = face / 2;
    if (face < 6 && !fluid) {
        int p = axis == 0 ? x : axis == 1 ? y : z;
        if ((!(face & 1) && camera->eye[axis] <= p) ||
            ((face & 1) && camera->eye[axis] >= p)) return;
    }
    int type = face == 2 ? 0 : face == 3 ? 1 : 2;
    int texture = classic_block_texture[q->block][type];
    if (texture < 0) return;
    Vertex vertices[4];
    if (q->face == 6 || q->face == 7) {
        // Module 71268's crossed one-unit planes rotated by pi/4.
        int lo = 600, hi = FIXED - 600;
        int z1 = q->face == 6 ? z + lo : z + hi;
        int z2 = q->face == 6 ? z + hi : z + lo;
        vertices[0] = view(camera, x + lo, y, z1, 0, 16 * 256);
        vertices[1] = view(camera, x + hi, y, z2, 16 * 256, 16 * 256);
        vertices[2] = view(camera, x + hi, y + FIXED, z2, 16 * 256, 0);
        vertices[3] = view(camera, x + lo, y + FIXED, z1, 0, 0);
    } else {
        if (axis == 1 && !(face & 1) && fluid) y -= 287;
        int u = (axis + 1) % 3, v = (axis + 2) % 3;
        int sign = face & 1 ? -1 : 1;
        int uv[4][2];
        if (axis == 2) {
            int a[4][2] = {{0, q->height}, {-sign * q->width, q->height},
                {-sign * q->width, 0}, {0, 0}};
            memcpy(uv, a, sizeof uv);
        } else {
            int a[4][2] = {{0, q->width}, {0, 0},
                {sign * q->height, 0}, {sign * q->height, q->width}};
            memcpy(uv, a, sizeof uv);
        }
        // Integer block offsets transform exactly by the camera basis.
        vertices[0] = view(camera, x, y, z, 0, 0);
        Vertex du = {q->width * camera->matrix[0][u],
            q->width * camera->matrix[1][u], q->width * camera->matrix[2][u], 0, 0};
        Vertex dv = {q->height * camera->matrix[0][v],
            q->height * camera->matrix[1][v], q->height * camera->matrix[2][v], 0, 0};
        vertices[1] = (Vertex){vertices[0].x + du.x, vertices[0].y + du.y,
            vertices[0].z + du.z, 0, 0};
        vertices[2] = (Vertex){vertices[1].x + dv.x, vertices[1].y + dv.y,
            vertices[1].z + dv.z, 0, 0};
        vertices[3] = (Vertex){vertices[0].x + dv.x, vertices[0].y + dv.y,
            vertices[0].z + dv.z, 0, 0};
        for (int i = 0; i < 4; i++) {
            vertices[i].u = uv[i][0] * 16 * 256;
            vertices[i].v = uv[i][1] * 16 * 256;
        }
    }
    // NOA's hemispheric light points toward (0.1,1,0.3), ground=0.5.
    static const uint8_t lighting[8] = {25, 23, 32, 16, 27, 21, 27, 27};
    unsigned light = lighting[face < 8 ? face : 2];
    if (q->dark) light = light * 19 / 32;
    if (q->block == 41) light = 19;
    polygon(vertices, texture, light, preview_alpha ? preview_alpha :
        q->block == 17 ? 30 : fluid ? 27 : 0);
}

static void placement_preview(const Camera *camera, const Game *game)
{
    const Hit *hit = &game->target;
    if (!hit->valid) return;
    int x = hit->x + hit->nx, y = hit->y + hit->ny, z = hit->z + hit->nz;
    if (x < 0 || x >= WORLD_SIZE - 1 || z < 0 || z >= WORLD_SIZE - 1 ||
        y < 0 || y >= WORLD_HEIGHT) return;
    uint8_t block = game->hotbar[game->selected];
    // Module 80131: adjacent textured preview, alpha 0.35..0.70.
    int alpha = (int)((0.35f + 0.35f * fabsf(sinf(0.003f * game->time))) * 32);
    if (block_plant(block)) {
        for (int face = 6; face < 8; face++) {
            ClassicQuad q = {x & 7, y & 7, z & 7, 1, 1, face, block, 0};
            draw_quad(camera, x >> 3, y >> 3, z >> 3, &q, 0, alpha);
        }
    } else for (int face = 0; face < 6; face++) {
        ClassicQuad q = {x & 7, y & 7, z & 7, 1, 1, face, block, 0};
        if (!(face & 1)) {
            if (face == 0) q.x++;
            if (face == 2) q.y++;
            if (face == 4) q.z++;
        }
        draw_quad(camera, x >> 3, y >> 3, z >> 3, &q, 0, alpha);
    }
}

static void outline(const Camera *c, const Hit *hit)
{
    if (!hit->valid) return;
    Vertex p[8];
    for (int i = 0; i < 8; i++)
        p[i] = view(c, (hit->x + (i & 1)) * FIXED,
            (hit->y + ((i >> 1) & 1)) * FIXED,
            (hit->z + ((i >> 2) & 1)) * FIXED, 0, 0);
    for (int axis = 0; axis < 3; axis++) for (int i = 0; i < 8; i++) {
        int j = i ^ (1 << axis);
        if (j < i || p[i].z < 410 || p[j].z < 410) continue;
        Screen a = project(p[i]), b = project(p[j]);
        int x = a.x / 16, y = a.y / 16, endx = b.x / 16, endy = b.y / 16;
        int dx = abs(endx - x), dy = -abs(endy - y);
        int sx = x < endx ? 1 : -1, sy = y < endy ? 1 : -1;
        int error = dx + dy;
        if (dx > WIDTH * 4 || -dy > HEIGHT * 4) continue;
        for (;;) {
            if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) {
                unsigned at = y * WIDTH + x;
                unsigned nearq = (a.q < b.q ? a.q : b.q) >> 8;
                if (nearq + 16 >= depth[at]) pixels[at] = 0;
            }
            if (x == endx && y == endy) break;
            int e2 = error * 2;
            if (e2 >= dy) { error += dy; x += sx; }
            if (e2 <= dx) { error += dx; y += sy; }
        }
    }
}

void renderer_draw(const Game *game, uint16_t *framebuffer)
{
    const Player *p = &game->player;
    float sy = sinf(p->yaw), cy = cosf(p->yaw);
    float sp = sinf(p->pitch), cp = cosf(p->pitch);
    Camera camera = {{{(int)(cy * FIXED), 0, (int)(-sy * FIXED)},
        {(int)(sy * sp * FIXED), (int)(cp * FIXED), (int)(cy * sp * FIXED)},
        {(int)(sy * cp * FIXED), (int)(-sp * FIXED), (int)(cy * cp * FIXED)}},
        {(int)(p->position[0] * FIXED),
         (int)((p->position[1] + PLAYER_EYE_HEIGHT) * FIXED),
         (int)(p->position[2] * FIXED)}};
    for (unsigned i = 0; i < WIDTH * HEIGHT; i++) pixels[i] = 0xe77f;
    memset(depth, 0, sizeof depth);
    memset(tile_depth, 0, sizeof tile_depth);
    memset(tile_coverage, 0, sizeof tile_coverage);
    memset(tile_rows, 0, sizeof tile_rows);
    clouds(&camera, game->time);
    // The support of an eight-cube AABB on each camera frustum plane.
    // Integer corners transform exactly as centre +/- four matrix columns.
    int radius[6];
    radius[0] = radius[1] = 4 * (abs(camera.matrix[2][0]) +
        abs(camera.matrix[2][1]) + abs(camera.matrix[2][2]));
    for (int plane = 2; plane < 6; plane++) {
        int row = plane < 4 ? 0 : 1;
        int half = plane < 4 ? WIDTH / 2 : HEIGHT / 2;
        int sign = plane & 1 ? -1 : 1, extent = 0;
        for (int axis = 0; axis < 3; axis++)
            extent += abs(half * camera.matrix[2][axis] +
                sign * FOCAL * camera.matrix[row][axis]);
        // Fractional plant/fluid vertices have at most one unit of rounding
        // per axis and camera row before those rows form a frustum plane.
        radius[plane] = 4 * extent + 3 * (half + FOCAL);
    }
    unsigned count = 0;
    for (int y = 0; y < 8; y++) for (int z = 0; z < 16; z++)
        for (int x = 0; x < 16; x++) {
            Vertex centre = view(&camera, (x * 8 + 4) * FIXED,
                (y * 8 + 4) * FIXED, (z * 8 + 4) * FIXED, 0, 0);
            int outside = 0;
            for (int plane = 0; plane < 6; plane++)
                if (plane_distance(centre, plane) + radius[plane] < 0) {
                    outside = 1;
                    break;
                }
            if (outside) continue;
            VisibleChunk v = {(y * 16 + z) * 16 + x, centre.z};
            unsigned i = count++;
            while (i && visible[i - 1].distance > v.distance) {
                visible[i] = visible[i - 1]; i--;
            }
            visible[i] = v;
        }
    for (int pass = 0; pass < 2; pass++) for (unsigned j = 0; j < count; j++) {
        unsigned id = visible[pass ? count - j - 1 : j].id;
        int x = id & 15, z = (id >> 4) & 15, y = id >> 8;
        unsigned n;
        const ClassicQuad *quads = mesh_get_chunk(x, y, z, &n);
        for (unsigned i = 0; i < n; i++) draw_quad(&camera, x, y, z, &quads[i], pass, 0);
    }
    if (game->add_mode) placement_preview(&camera, game);
    else outline(&camera, &game->target);
    uint8_t eye_block = world_get((int)p->position[0],
        (int)(p->position[1] + PLAYER_EYE_HEIGHT), (int)p->position[2]);
    int submerged = block_fluid(eye_block);
    for (int y = 0; y < HEIGHT; y++) for (int x = 0; x < WIDTH; x++) {
        uint16_t color = pixels[y * WIDTH + x];
        if (submerged) color = blend(eye_block == 17 ? 0xb000 : 0x0016, color,
            eye_block == 17 ? 25 : 16);
        unsigned at = y * 2 * 396 + x * 2;
        framebuffer[at] = framebuffer[at + 1] = color;
        framebuffer[at + 396] = framebuffer[at + 397] = color;
    }
}
