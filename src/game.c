#include "game.h"
#include "world.h"
#include "blocks.h"
#include <stdlib.h>
#include <string.h>

// Native translation of Classic's shipped entry module: the helpers
// checkWaterBelowAdd through checkRemoveSponge, and handleFireEvent.
// Browser setTimeout and the two snapshot FIFOs become tick-time events.
enum EventKind {
    WATER_ADD, LAVA_ADD, WATER_BELOW, GROW_GRASS, REMOVE_GRASS,
    FOLIAGE_BELOW, FOLIAGE_ABOVE, CHECK_NEIGHBOURS, WATER_SPREAD, LAVA_SPREAD
};
struct GameEvent {
    struct GameEvent *next;
    uint32_t due;
    int16_t x, y, z;
    uint8_t kind;
};
struct GameSponge {
    struct GameSponge *next;
    int16_t x, y, z;
};

// Modules 187 and 67343 share this order and the nine original hotbar slots.
const uint8_t classic_inventory[32] = {
    2,9,3,4,13,14,8,6,5,16,15,11,12,23,22,21,
    24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39
};

static int inside(int x, int y, int z)
{
    return x >= 0 && x < WORLD_SIZE - 1 && z >= 0 && z < WORLD_SIZE - 1 &&
        y > 0 && y < WORLD_HEIGHT;
}

static uint32_t random_delay(Game *game, uint32_t base, uint32_t range)
{
    // Math.random has no specified sequence. This supplies its uniform delay
    // on the calculator without depending on a browser random generator.
    uint32_t value = game->random;
    value ^= value << 13;
    value ^= value >> 17;
    value ^= value << 5;
    game->random = value;
    return base + (uint32_t)(((uint64_t)value * range) >> 32);
}

static int set_block(Game *game, uint8_t block, int x, int y, int z)
{
    if(!inside(x, y, z)) return 0;
    if(world_set(x, y, z, block)) return 1;
    game->memory_full = 1;
    return 0;
}

static int add_block(Game *game, uint8_t block, int x, int y, int z)
{
    if(!set_block(game, block, x, y, z)) return 0;
    if(!block_plant(block) && block != BLOCK_LEAVES && block != BLOCK_GLASS)
        world_add_light(x, y, z);
    return 1;
}

static struct GameEvent *new_event(Game *game, enum EventKind kind,
    int x, int y, int z)
{
    struct GameEvent *event = malloc(sizeof *event);
    if(!event) {
        game->memory_full = 1;
        return NULL;
    }
    *event = (struct GameEvent){.x=x, .y=y, .z=z, .kind=kind};
    return event;
}

static void timeout(Game *game, enum EventKind kind, int x, int y, int z,
    uint32_t delay)
{
    struct GameEvent *event = new_event(game, kind, x, y, z);
    if(!event) return;
    event->due = game->time + delay;
    struct GameEvent **at = &game->timers;
    while(*at && (int32_t)((*at)->due - event->due) <= 0) at = &(*at)->next;
    event->next = *at;
    *at = event;
}

static void enqueue(Game *game, enum EventKind kind, int x, int y, int z)
{
    struct GameEvent *event = new_event(game, kind, x, y, z);
    if(!event) return;
    struct GameEvent **head = kind == LAVA_SPREAD ?
        &game->lava_head : &game->water_head;
    struct GameEvent **tail = kind == LAVA_SPREAD ?
        &game->lava_tail : &game->water_tail;
    if(*tail) (*tail)->next = event;
    else *head = event;
    *tail = event;
}

static void grass_timer(Game *game, int x, int y, int z, int grow)
{
    timeout(game, grow ? GROW_GRASS : REMOVE_GRASS, x, y, z,
        random_delay(game, 8000, 16000));
}

static void foliage_timer(Game *game, int x, int y, int z, int above)
{
    timeout(game, above ? FOLIAGE_ABOVE : FOLIAGE_BELOW, x, y, z,
        random_delay(game, 3000, 9000));
}

static int grass_transparent(uint8_t block)
{
    return block == BLOCK_AIR || block_plant(block) ||
        block == BLOCK_GLASS || block == BLOCK_LEAVES;
}

static uint8_t check_up_for_blocker(int x, int y, int z)
{
    uint8_t block = BLOCK_AIR;
    while(grass_transparent(block) && y < WORLD_HEIGHT)
        block = world_get(x, ++y, z);
    return block;
}

static void check_down_for_ground(Game *game, int x, int y, int z, int grow)
{
    uint8_t block = BLOCK_AIR;
    while(grass_transparent(block) && y >= 0) {
        block = world_get(x, --y, z);
        if(!grow && block_plant(block)) foliage_timer(game, x, y, z, 1);
    }
    if(block == (grow ? BLOCK_DIRT : BLOCK_GRASS))
        grass_timer(game, x, y, z, grow);
}

static int should_water_have_surface(int x, int y, int z)
{
    uint8_t above[5] = {world_get(x,y+1,z), world_get(x-1,y+1,z),
        world_get(x+1,y+1,z), world_get(x,y+1,z+1), world_get(x,y+1,z-1)};
    int air = 0;
    for(unsigned i = 0; i < 5; i++) {
        if(block_water(above[i])) return 0;
        if(above[i] == BLOCK_AIR) air = 1;
    }
    return air;
}

static const int8_t horizontal[4][2] = {{-1,0},{1,0},{0,1},{0,-1}};

static void check_water_below(Game *game, int x, int y, int z, int adding)
{
    if(adding)
        set_block(game, should_water_have_surface(x,y,z) ?
            BLOCK_WATER_SURFACE : BLOCK_WATER, x,y,z);
    else if(world_get(x,y,z) == BLOCK_WATER_SURFACE)
        add_block(game, BLOCK_WATER, x,y,z);
    for(unsigned i = 0; i < 4; i++) {
        int nx = x + horizontal[i][0], nz = z + horizontal[i][1];
        if(block_water(world_get(nx,y,nz)))
            set_block(game, should_water_have_surface(nx,y,nz) &&
                world_get(nx,y+1,nz) != BLOCK_AIR ?
                BLOCK_WATER_SURFACE : BLOCK_WATER, nx,y,nz);
    }
}

static int add_water(Game *game, int x, int y, int z)
{
    if(!inside(x,y,z)) return 0;
    uint8_t above = world_get(x,y+1,z);
    int surface = should_water_have_surface(x,y,z) && above != BLOCK_AIR &&
        above != BLOCK_EMPTY_SPONGE;
    if(!add_block(game, BLOCK_WATER, x,y,z)) return 0;
    if(surface) {
        add_block(game, BLOCK_WATER_SURFACE, x,y,z);
        for(unsigned i = 0; i < 4; i++) {
            int nx = x + horizontal[i][0], nz = z + horizontal[i][1];
            if(world_get(nx,y,nz) == BLOCK_WATER &&
                world_get(nx,y+1,nz) != BLOCK_AIR)
                set_block(game, BLOCK_WATER_SURFACE, nx,y,nz);
        }
    }
    uint8_t below = world_get(x,y-1,z);
    if(below == BLOCK_GRASS) grass_timer(game,x,y-1,z,0);
    if(below == BLOCK_LAVA) set_block(game,BLOCK_STONE,x,y-1,z);
    if(below == BLOCK_WATER_SURFACE) set_block(game,BLOCK_WATER,x,y-1,z);
    return 1;
}

static int add_lava(Game *game, int x, int y, int z)
{
    if(!add_block(game, BLOCK_LAVA, x,y,z)) return 0;
    uint8_t below = world_get(x,y-1,z);
    if(below == BLOCK_GRASS) grass_timer(game,x,y-1,z,0);
    if(below == BLOCK_WATER) set_block(game,BLOCK_STONE,x,y-1,z);
    return 1;
}

static void check_neighbours(Game *game, int x, int y, int z, int water_below)
{
    if(!inside(x,y,z) || world_get(x,y,z) != BLOCK_AIR) return;
    uint8_t neighbours[5] = {world_get(x,y+1,z), world_get(x-1,y,z),
        world_get(x+1,y,z), world_get(x,y,z+1), world_get(x,y,z-1)};
    int lava = 0, water = 0;
    for(unsigned i = 0; i < 5; i++) {
        if(neighbours[i] == BLOCK_LAVA) lava = 1;
        if(block_water(neighbours[i])) water = 1;
    }
    if(lava) timeout(game,LAVA_ADD,x,y,z,1500);
    if(water) timeout(game,WATER_ADD,x,y,z,150);
    if(water_below) timeout(game,WATER_BELOW,x,y-1,z,160);
}

static void spread(Game *game, int x, int y, int z, int lava)
{
    if(lava ? (x < 0 || x > WORLD_SIZE-1 || z < 0 || z > WORLD_SIZE-1) :
        (x <= 0 || x >= WORLD_SIZE-1 || z <= 0 || z >= WORLD_SIZE-1)) return;
    const int8_t offsets[5][3] = {
        {0,-1,0}, {-1,0,0}, {1,0,0}, {0,0,1}, {0,0,-1}
    };
    for(unsigned i = 0; i < 5; i++) {
        int nx=x+offsets[i][0], ny=y+offsets[i][1], nz=z+offsets[i][2];
        if(world_get(nx,ny,nz) == BLOCK_AIR &&
            (lava ? add_lava(game,nx,ny,nz) : add_water(game,nx,ny,nz)))
            enqueue(game,lava ? LAVA_SPREAD : WATER_SPREAD,nx,ny,nz);
    }
}

static void check_down_sand_gravel(Game *game, int x, int y, int z,
    uint8_t block)
{
    // The original falls through air, water, lava, and sponge placeholders,
    // but stops on foliage despite its non-colliding physics mesh.
    uint8_t below = BLOCK_AIR;
    int at = y;
    while((below == BLOCK_AIR || block_fluid(below) ||
        below == BLOCK_EMPTY_SPONGE) && at >= 0)
        below = world_get(x,--at,z);
    if(below == BLOCK_AIR) return;
    if(!set_block(game,BLOCK_AIR,x,y,z)) return;
    set_block(game,block,x,at+1,z);
    uint8_t above = world_get(x,y+1,z);
    if(above == BLOCK_SAND || above == BLOCK_GRAVEL)
        check_down_sand_gravel(game,x,y+1,z,above);
    world_remove_light(x,y,z);
    check_neighbours(game,x,y,z,0);
}

static void sponge_area(Game *game, int x, int y, int z, int removing)
{
    int min_x = x-2 < 1 ? 1 : x-2, max_x = x+2 > WORLD_SIZE-3 ? WORLD_SIZE-3 : x+2;
    int min_z = z-2 < 1 ? 1 : z-2, max_z = z+2 > WORLD_SIZE-3 ? WORLD_SIZE-3 : z+2;
    for(int sy=y-2; sy<=y+2; sy++)
        for(int sx=min_x; sx<=max_x; sx++)
            for(int sz=min_z; sz<=max_z; sz++) {
                uint8_t block = world_get(sx,sy,sz);
                if(removing && block == BLOCK_EMPTY_SPONGE) {
                    set_block(game,BLOCK_AIR,sx,sy,sz);
                    if(sx == x-2 || sx == x+2 || sz == z-2 || sz == z+2)
                        enqueue(game,CHECK_NEIGHBOURS,sx,sy,sz);
                } else if(!removing && (block == BLOCK_WATER || block == BLOCK_AIR)) {
                    set_block(game,BLOCK_EMPTY_SPONGE,sx,sy,sz);
                    world_remove_light(sx,sy,sz);
                }
            }
}

static void add_sponge(Game *game, int x, int y, int z)
{
    struct GameSponge *sponge = malloc(sizeof *sponge);
    if(!sponge) game->memory_full = 1;
    else {
        *sponge = (struct GameSponge){.x=x,.y=y,.z=z};
        struct GameSponge **at = &game->sponges;
        while(*at) at = &(*at)->next;
        *at = sponge;
    }
    sponge_area(game,x,y,z,0);
}

static void remove_sponge(Game *game, int x, int y, int z)
{
    struct GameSponge **at = &game->sponges;
    while(*at) {
        struct GameSponge *sponge = *at;
        if(sponge->x == x && sponge->y == y && sponge->z == z) {
            *at = sponge->next;
            free(sponge);
            break;
        }
        at = &sponge->next;
    }
    sponge_area(game,x,y,z,1);
    for(struct GameSponge *sponge=game->sponges; sponge; sponge=sponge->next)
        sponge_area(game,sponge->x,sponge->y,sponge->z,0);
}

static void run_event(Game *game, struct GameEvent *event)
{
    int x=event->x, y=event->y, z=event->z;
    uint8_t block;
    switch(event->kind) {
    case WATER_ADD:
        if(add_water(game,x,y,z)) enqueue(game,WATER_SPREAD,x,y,z);
        break;
    case LAVA_ADD:
        if(add_lava(game,x,y,z)) enqueue(game,LAVA_SPREAD,x,y,z);
        break;
    case WATER_BELOW: check_water_below(game,x,y,z,0); break;
    case GROW_GRASS:
        if(world_get(x,y,z) == BLOCK_DIRT &&
            grass_transparent(check_up_for_blocker(x,y,z)))
            set_block(game,BLOCK_GRASS,x,y,z);
        break;
    case REMOVE_GRASS:
        if(world_get(x,y,z) == BLOCK_GRASS &&
            !grass_transparent(check_up_for_blocker(x,y,z)))
            set_block(game,BLOCK_DIRT,x,y,z);
        break;
    case FOLIAGE_BELOW:
        block = world_get(x,y,z);
        if(block_plant(block)) {
            uint8_t below = world_get(x,y-1,z);
            if(below != BLOCK_GRASS && below != BLOCK_DIRT) {
                set_block(game,BLOCK_AIR,x,y,z);
                enqueue(game,CHECK_NEIGHBOURS,x,y,z);
            }
        }
        break;
    case FOLIAGE_ABOVE:
        if(block_plant(world_get(x,y,z)) && y < world_light_depth(x,z)+1) {
            set_block(game,BLOCK_AIR,x,y,z);
            enqueue(game,CHECK_NEIGHBOURS,x,y,z);
            block = world_get(x,y+1,z);
            if(block == BLOCK_SAND || block == BLOCK_GRAVEL)
                check_down_sand_gravel(game,x,y+1,z,block);
        }
        break;
    case CHECK_NEIGHBOURS: check_neighbours(game,x,y,z,0); break;
    case WATER_SPREAD: spread(game,x,y,z,0); break;
    case LAVA_SPREAD: spread(game,x,y,z,1); break;
    }
}

static void run_queue(Game *game, struct GameEvent **head,
    struct GameEvent **tail)
{
    // Source oe.slice()/ce.slice(): events enqueued while this batch runs
    // wait for the next batch, rather than flooding recursively in one tick.
    struct GameEvent *event = *head;
    *head = *tail = NULL;
    while(event) {
        struct GameEvent *next = event->next;
        run_event(game,event);
        free(event);
        event = next;
    }
}

void game_init(Game *game)
{
    static const uint8_t initial[9] = {2,3,4,9,11,12,13,14,15};
    memset(game,0,sizeof *game);
    memcpy(game->hotbar,initial,sizeof initial);
    game->random = world_seed() ? world_seed() : 1;
    world_init();
    // Entry B chooses a registry-solid surface in the central half of the
    // level, above sea level, with the pick/reset-position offsets.
    int x=64, z=64, ground=0;
    for(int attempt=0; attempt<50 && ground<30; attempt++) {
        x=32+random_delay(game,0,64);
        z=32+random_delay(game,0,64);
        ground=0;
        for(int y=WORLD_HEIGHT-1; y>=0; y--) {
            uint8_t block=world_get(x,y,z);
            if(block_solid(block)) {
                ground=y;
                break;
            }
        }
    }
    player_init(&game->player,x+0.5f,ground+2.49f,z+0.5f);
    game_update_target(game);
}

void game_dispose(Game *game)
{
    struct GameEvent *lists[3] = {game->timers,game->water_head,game->lava_head};
    for(unsigned i=0; i<3; i++) {
        struct GameEvent *event=lists[i];
        while(event) {
            struct GameEvent *next=event->next;
            free(event);
            event=next;
        }
    }
    while(game->sponges) {
        struct GameSponge *next=game->sponges->next;
        free(game->sponges);
        game->sponges=next;
    }
    game->timers=game->water_head=game->water_tail=NULL;
    game->lava_head=game->lava_tail=NULL;
}

void game_tick(Game *game, const PlayerInput *input)
{
    game->time += PLAYER_TICK_MS;
    player_tick(&game->player,input);
    while(game->timers && (int32_t)(game->time-game->timers->due) >= 0) {
        struct GameEvent *event=game->timers;
        game->timers=event->next;
        run_event(game,event);
        free(event);
    }
    if(game->time > game->water_time+250) {
        run_queue(game,&game->water_head,&game->water_tail);
        game->water_time=game->time;
    }
    if(game->time > game->lava_time+1500) {
        run_queue(game,&game->lava_head,&game->lava_tail);
        game->lava_time=game->time;
    }
    game_update_target(game);
}

void game_update_target(Game *game)
{
    player_pick(&game->player,&game->target);
    if(game->target.valid && (game->target.x < 0 ||
        game->target.x >= WORLD_SIZE-1 || game->target.z < 0 ||
        game->target.z >= WORLD_SIZE-1 ||
        (game->target.block == BLOCK_BEDROCK && !game->add_mode)))
        game->target.valid=0;
}

static int player_blocks_placement(const Player *player, int x, int y, int z)
{
    // NOA entities.isTerrainBlocked: overlap with the player's AABB.
    return x+0.999f >= player->box.base[0] && x+0.001f <= player->box.max[0] &&
        y+0.999f >= player->box.base[1] && y+0.001f <= player->box.max[1] &&
        z+0.999f >= player->box.base[2] && z+0.001f <= player->box.max[2];
}

int game_left_click(Game *game)
{
    if(game->inventory_open || !game->target.valid) return 0;
    Hit hit=game->target;
    if(game->add_mode) {
        int x=hit.x+hit.nx, y=hit.y+hit.ny, z=hit.z+hit.nz;
        uint8_t block=game->hotbar[game->selected];
        if(y >= WORLD_HEIGHT ||
            ((block != BLOCK_WATER && block != BLOCK_LAVA) &&
            player_blocks_placement(&game->player,x,y,z))) return 0;
        uint8_t replaced=world_get(x,y,z);
        if(!add_block(game,block,x,y,z)) return 0;
        if(block == BLOCK_DIRT) grass_timer(game,x,y,z,1);
        check_down_for_ground(game,x,y,z,0);
        uint8_t below=world_get(x,y-1,z);
        if(block_water(below) && replaced == BLOCK_AIR)
            check_water_below(game,x,y-1,z,1);
        if(block == BLOCK_SAND || block == BLOCK_GRAVEL)
            check_down_sand_gravel(game,x,y,z,block);
        if(block == BLOCK_SPONGE) add_sponge(game,x,y,z);
        if(block_plant(block)) {
            if(below != BLOCK_DIRT && below != BLOCK_GRASS)
                foliage_timer(game,x,y,z,0);
            foliage_timer(game,x,y,z,1);
        }
    } else {
        if(hit.block == BLOCK_BEDROCK || !set_block(game,BLOCK_AIR,hit.x,hit.y,hit.z))
            return 0;
        world_remove_light(hit.x,hit.y,hit.z);
        check_down_for_ground(game,hit.x,hit.y,hit.z,1);
        if(hit.block == BLOCK_SPONGE) remove_sponge(game,hit.x,hit.y,hit.z);
        uint8_t above=world_get(hit.x,hit.y+1,hit.z);
        if((hit.block == BLOCK_DIRT || hit.block == BLOCK_GRASS) && block_plant(above))
            foliage_timer(game,hit.x,hit.y+1,hit.z,0);
        if(above == BLOCK_SAND || above == BLOCK_GRAVEL)
            check_down_sand_gravel(game,hit.x,hit.y+1,hit.z,above);
        check_neighbours(game,hit.x,hit.y,hit.z,
            block_water(world_get(hit.x,hit.y-1,hit.z)));
    }
    game_update_target(game);
    return 1;
}

void game_right_click(Game *game)
{
    if(game->inventory_open) return;
    game->add_mode=!game->add_mode;
    game_update_target(game);
}

void game_cycle_slot(Game *game, int delta)
{
    game->selected=(game->selected+delta)%9;
    if(game->selected<0) game->selected+=9;
}

void game_choose_block(Game *game, uint8_t block)
{
    // Hotbar swap/checkExistingSwap exchanges an existing duplicate slot.
    for(int i=0; i<9; i++)
        if(i != game->selected && game->hotbar[i] == block) {
            game->hotbar[i]=game->hotbar[game->selected];
            break;
        }
    game->hotbar[game->selected]=block;
    game->inventory_open=0;
}
