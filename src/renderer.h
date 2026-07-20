#ifndef CLASSIC_RENDERER_H
#define CLASSIC_RENDERER_H
#include <stdint.h>
#include "game.h"

// The framebuffer is the calculator's native 396x224 RGB565 surface.
void renderer_draw(const Game *game, uint16_t *framebuffer);

#endif
