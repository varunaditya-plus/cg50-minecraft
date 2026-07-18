#include "player.h"
#include "blocks.h"
#include "world.h"

#include <math.h>
#include <string.h>

#define PI 3.14159265358979323846

// Native translation of classic.minecraft.net app.js webpack modules:
// 26579 RigidBody; 55132 voxel-physics-engine; 64601 voxel-aabb-sweep;
// 90583 movement; 20713 receivesInputs; 29692 voxel-raycast;
// 46280 cameraControls; 37119 NOA engine. Numeric module IDs refer to the
// preserved, unminified upstream files. Vector writes retain float32 storage,
// while the sweep/raycast use the original double scalar calculations.

static int solid_at(int x, int y, int z)
{
    // Module 66358 physics predicate excludes crossed plant meshes.
    uint8_t block = world_get(x, y, z);
    return block != 5 && block != 6 && block != 8 && block != 15 &&
        block != 16 && block_solid(block);
}

// Module 74621 AABB.translate; base/max are independent Float32Arrays.
static void translate(PlayerBox *box, const double delta[3])
{
    for(int axis = 0; axis < 3; axis++) {
        box->max[axis] = (float)((double)box->max[axis] + delta[axis]);
        box->base[axis] = (float)((double)box->base[axis] + delta[axis]);
    }
}

static void set_base(Player *player, const double base[3])
{
    double delta[3];
    for(int axis = 0; axis < 3; axis++)
        delta[axis] = base[axis] - player->box.base[axis];
    translate(&player->box, delta);
    player->sleep_frames = 10;
}

static void sync_position(Player *player)
{
    player->position[0] = (float)((double)player->box.base[0] + 0.3f);
    player->position[1] = player->box.base[1];
    player->position[2] = (float)((double)player->box.base[2] + 0.3f);
}

typedef enum { SWEEP_SLIDE, SWEEP_STOP, SWEEP_VERTICAL } SweepMode;

// Direct translation of module 64601's C/O/R/I traversal. The leading
// boundary advances through voxel planes; after collision its callback clears
// just that axis and the remaining displacement is swept again.
static double sweep(PlayerBox *box, const float movement[3], int resting[3],
    SweepMode mode, int no_translate, int *collided)
{
    const double epsilon = 1e-10;
    double motion[3], base[3], max[3], trail_position[3];
    double direction[3], delta[3], next[3];
    int step[3], lead[3], trail[3];
    double travelled = 0;
    for(int axis = 0; axis < 3; axis++) {
        motion[axis] = movement[axis];
        base[axis] = box->base[axis];
        max[axis] = box->max[axis];
        if(resting) resting[axis] = 0;
    }
    if(collided) *collided = 0;

    for(;;) {
        double length = sqrt(motion[0]*motion[0] + motion[1]*motion[1] +
            motion[2]*motion[2]);
        if(length == 0) break;
        double distance = 0;
        for(int axis = 0; axis < 3; axis++) {
            step[axis] = motion[axis] >= 0 ? 1 : -1;
            double leading = step[axis] > 0 ? max[axis] : base[axis];
            trail_position[axis] = step[axis] > 0 ? base[axis] : max[axis];
            lead[axis] = (int)floor(leading - step[axis]*epsilon);
            trail[axis] = (int)floor(trail_position[axis] + step[axis]*epsilon);
            direction[axis] = motion[axis] / length;
            delta[axis] = direction[axis] == 0 ? INFINITY :
                fabs(1 / direction[axis]);
            double gap = step[axis] > 0 ? lead[axis]+1-leading : leading-lead[axis];
            next[axis] = isfinite(delta[axis]) ? delta[axis]*gap : INFINITY;
        }

        int restart = 0, stop = 0;
        for(;;) {
            // Ties choose z, then y, exactly as original O().
            int axis = next[0] < next[1] ? (next[0] < next[2] ? 0 : 2) :
                (next[1] < next[2] ? 1 : 2);
            double advance = next[axis] - distance;
            distance = next[axis];
            lead[axis] += step[axis];
            next[axis] += delta[axis];
            for(int k = 0; k < 3; k++) {
                trail_position[k] += advance * direction[k];
                trail[k] = (int)floor(trail_position[k] + step[k]*epsilon);
            }
            if(distance > length) break;

            int start[3];
            for(int k = 0; k < 3; k++) start[k] = k == axis ? lead[k] : trail[k];
            int blocked = 0;
            for(int x = start[0]; x != lead[0]+step[0] && !blocked; x += step[0])
                for(int y = start[1]; y != lead[1]+step[1] && !blocked; y += step[1])
                    for(int z = start[2]; z != lead[2]+step[2]; z += step[2])
                        if(solid_at(x,y,z)) { blocked = 1; break; }
            if(!blocked) continue;

            travelled += distance;
            double remaining[3], fraction = distance / length;
            for(int k = 0; k < 3; k++) {
                double amount = motion[k] * fraction;
                base[k] += amount;
                max[k] += amount;
                remaining[k] = motion[k] - amount;
            }
            if(step[axis] > 0) max[axis] = floor(max[axis] + 0.5);
            else base[axis] = floor(base[axis] + 0.5);
            if(collided) *collided = 1;
            if(mode == SWEEP_STOP || (mode == SWEEP_VERTICAL && axis != 1)) {
                stop = 1;
                break;
            }
            if(resting) resting[axis] = step[axis];
            remaining[axis] = 0;
            for(int k = 0; k < 3; k++) motion[k] = remaining[k];
            restart = 1;
            break;
        }
        if(stop) break;
        if(restart) continue;
        travelled += length;
        for(int axis = 0; axis < 3; axis++) {
            base[axis] += motion[axis];
            max[axis] += motion[axis];
        }
        break;
    }

    if(!no_translate) {
        double shift[3];
        for(int axis = 0; axis < 3; axis++)
            shift[axis] = movement[axis] > 0 ? max[axis]-box->max[axis] :
                base[axis]-box->base[axis];
        translate(box, shift);
    }
    return travelled;
}

static void apply_force(Player *player, const float force[3])
{
    for(int axis = 0; axis < 3; axis++)
        player->forces[axis] = (float)((double)player->forces[axis] + force[axis]);
    player->sleep_frames = 10;
}

// Module 55132 E(): Original submerged/supported autoStep path.
static void auto_step(Player *player, PlayerBox previous, const float movement[3])
{
    if(player->resting[1] >= 0 && !player->in_fluid) return;
    int hit_x = player->resting[0] != 0, hit_z = player->resting[2] != 0;
    if(!hit_x && !hit_z) return;
    double ratio = fabs((double)movement[0] / movement[2]);
    if((!hit_x && ratio > 4) || (!hit_z && ratio < 0.25)) return;
    float target[3];
    for(int axis = 0; axis < 3; axis++)
        target[axis] = (float)((double)previous.base[axis] + movement[axis]);
    sweep(&previous, movement, NULL, SWEEP_VERTICAL, 0, NULL);
    double y = player->box.base[1];
    float lift[3] = {0, (float)(floor(y+1.001)-y), 0};
    int blocked;
    sweep(&previous, lift, NULL, SWEEP_STOP, 0, &blocked);
    if(blocked) return;
    float remaining[3];
    for(int axis = 0; axis < 3; axis++)
        remaining[axis] = (float)((double)target[axis] - previous.base[axis]);
    remaining[1] = 0;
    int resting[3];
    sweep(&previous, remaining, resting, SWEEP_SLIDE, 0, NULL);
    if((hit_x && fabs((double)previous.base[0]-target[0]) >= 1e-5) ||
        (hit_z && fabs((double)previous.base[2]-target[2]) >= 1e-5)) return;
    player->box = previous;
    player->resting[0] = resting[0];
    player->resting[2] = resting[2];
}

// Module 55132 tick(): forces from the preceding ECS tick are consumed first,
// then collisions and fluid forces for the next tick are calculated.
static void physics_tick(Player *player)
{
    const double dt = 0.03;
    if(player->sleep_frames <= 0) {
        float test[3] = {0, -0.3f, 0};
        int supported;
        sweep(&player->box, test, NULL, SWEEP_STOP, 1, &supported);
        if(player->gravity_multiplier == 0 || supported) return;
    }
    player->sleep_frames--;
    int previously_resting_y = player->resting[1];
    float acceleration[3];
    for(int axis = 0; axis < 3; axis++) acceleration[axis] = player->forces[axis];
    acceleration[1] = (float)(acceleration[1] - 10.0*player->gravity_multiplier);
    for(int axis = 0; axis < 3; axis++) {
        player->velocity[axis] = (float)((double)player->velocity[axis] + player->impulses[axis]);
        float change = (float)(acceleration[axis] * dt);
        player->velocity[axis] = (float)((double)player->velocity[axis] + change);
    }
    if(previously_resting_y < 0) {
        double amount = dt * player->friction;
        float counter[3] = {-player->velocity[0],0,-player->velocity[2]};
        double length = sqrt((double)counter[0]*counter[0] + (double)counter[2]*counter[2]);
        if(length > amount) {
            for(int axis = 0; axis < 3; axis++) {
                counter[axis] = (float)(counter[axis] * (amount/length));
                player->velocity[axis] = (float)((double)player->velocity[axis] + counter[axis]);
            }
        } else player->velocity[0] = player->velocity[2] = 0;
    } else for(int axis = 0; axis < 3; axis++)
        player->velocity[axis] = (float)(player->velocity[axis] * 0.999);

    float movement[3];
    for(int axis = 0; axis < 3; axis++) {
        movement[axis] = (float)(player->velocity[axis] * dt);
        player->forces[axis] = player->impulses[axis] = 0;
    }
    PlayerBox previous = player->box;
    sweep(&player->box, movement, player->resting, SWEEP_SLIDE, 0, NULL);
    if(player->auto_step) auto_step(player, previous, movement);
    for(int axis = 0; axis < 3; axis++)
        if(player->resting[axis]) player->velocity[axis] = 0;

    int x = (int)floor(((double)player->box.base[0]+player->box.max[0])/2);
    int z = (int)floor(((double)player->box.base[2]+player->box.max[2])/2);
    int bottom = (int)floor(player->box.base[1]);
    int top = (int)floor(player->box.max[1]);
    int layers = 0;
    for(int y = bottom; y <= top && block_fluid(world_get(x,y,z)); y++) layers++;
    player->in_fluid = layers > 0;
    if(layers > 0) {
        double submerged = (bottom+layers-player->box.base[1]) / player->box.size[1];
        if(submerged > 1) submerged = 1;
        double volume = (double)player->box.size[0]*player->box.size[1]*
            player->box.size[2]*submerged;
        float buoyancy[3] = {0,(float)(10.0*player->gravity_multiplier*1.2*volume),0};
        for(int axis = 0; axis < 3; axis++) {
            float drag = (float)(player->velocity[axis] * (-4*submerged));
            buoyancy[axis] = (float)((double)buoyancy[axis]+drag);
        }
        apply_force(player, buoyancy);
    }
    double speed_squared = (double)player->velocity[0]*player->velocity[0] +
        (double)player->velocity[1]*player->velocity[1] +
        (double)player->velocity[2]*player->velocity[2];
    if(speed_squared > 1e-5) player->sleep_frames = 10;
    sync_position(player);
}

// Modules 20713 t() and 90583 s(): held jump suppresses the jumping flag after
// its first tick, while jumpWasPressed drives swimming every held tick.
// airJumps=0 is the player override in module 37119.
static void movement_tick(Player *player, const PlayerInput *input)
{
    int jumping = !!input->jump;
    if(jumping && player->jump_was_pressed) jumping = 0;
    player->jump_was_pressed = !!input->jump;
    int forward = input->forward ? (input->backward ? 0 : 1) :
        (input->backward ? -1 : 0);
    int strafe = input->right ? (input->left ? 0 : 1) : (input->left ? -1 : 0);
    double heading = player->yaw;
    if(forward) {
        if(forward == -1) heading += PI;
        if(strafe) heading += (PI/4)*forward*strafe;
    } else heading += strafe * PI/2;

    int x = (int)floor(player->box.base[0]), y = (int)floor(player->box.base[1]);
    int z = (int)floor(player->box.base[2]);
    uint8_t lower = world_get(x,y,z), upper = world_get(x,
        (int)floor(player->box.base[1]+0.5),z);
    int water = lower == 7 || lower == 41 || upper == 7 || upper == 41;
    int lava = lower == 17;
    player->auto_step = (water || lava) && upper == 0;
    player->gravity_multiplier = water ? 2.1 : (lava ? 1.05 : 4.2);
    int grounded = player->resting[1] < 0;
    if(grounded) { player->is_jumping = 0; player->jump_count = 0; }
    if(!jumping || water || lava) player->is_jumping = 0;
    else if(player->is_jumping) {
        if(player->jump_time > 0) {
            double force = 6.5;
            if(player->jump_time < PLAYER_TICK_MS) force *= (double)player->jump_time/PLAYER_TICK_MS;
            float up[3] = {0,(float)force,0};
            apply_force(player,up);
            player->jump_time -= PLAYER_TICK_MS;
        }
    } else if(grounded) {
        player->is_jumping = 1;
        player->jump_time = 500;
        player->impulses[1] = (float)((double)player->impulses[1]+11);
        player->sleep_frames = 10;
    }
    if(player->jump_was_pressed && water) {
        float up[3] = {0,18,0}; apply_force(player,up);
    }
    if(player->jump_was_pressed && lava) {
        float up[3] = {0,9,0}; apply_force(player,up);
    }
    if(forward || strafe) {
        double speed = water ? 3 : (lava ? 1.5 : 6);
        float desired[3] = {(float)(speed*sin(heading)),0,(float)(speed*cos(heading))};
        float difference[3];
        for(int axis = 0; axis < 3; axis++)
            difference[axis] = (float)((double)desired[axis]-player->velocity[axis]);
        difference[1] = 0;
        double length = sqrt((double)difference[0]*difference[0] +
            (double)difference[2]*difference[2]);
        if(length > 0) {
            for(int axis = 0; axis < 3; axis++) difference[axis] = (float)(difference[axis]/length);
            double force = grounded ? 30 : 15;
            if(force > 15*length) force = 15*length;
            for(int axis = 0; axis < 3; axis++) difference[axis] = (float)(difference[axis]*force);
            apply_force(player,difference);
        }
        player->friction = 0;
    } else player->friction = 50;

    // Original movement bounds operate on body.getPosition() (AABB base).
    double base[3];
    for(int axis = 0; axis < 3; axis++) base[axis] = player->box.base[axis];
    if(base[0] <= 0.2) { base[0] = 0.2; set_base(player,base); player->velocity[0] = 0; }
    if(base[0] >= WORLD_SIZE-1-0.8) { base[0] = WORLD_SIZE-1-0.8; set_base(player,base); player->velocity[0] = 0; }
    for(int axis = 0; axis < 3; axis++) base[axis] = player->box.base[axis];
    if(base[2] <= 0.2) { base[2] = 0.2; set_base(player,base); player->velocity[2] = 0; }
    if(base[2] >= WORLD_SIZE-1-0.8) { base[2] = WORLD_SIZE-1-0.8; set_base(player,base); player->velocity[2] = 0; }
    if(base[1] <= 0) { base[1] = 0; set_base(player,base); player->velocity[1] = 0; }
    sync_position(player);
}

void player_init(Player *player, float x, float y, float z)
{
    memset(player,0,sizeof(*player));
    player->position[0] = x; player->position[1] = y; player->position[2] = z;
    player->box.base[0] = (float)(x-0.3); player->box.base[1] = y;
    player->box.base[2] = (float)(z-0.3);
    player->box.size[0] = player->box.size[2] = PLAYER_WIDTH;
    player->box.size[1] = PLAYER_HEIGHT;
    for(int axis = 0; axis < 3; axis++)
        player->box.max[axis] = (float)((double)player->box.base[axis]+player->box.size[axis]);
    player->friction = 1;
    player->gravity_multiplier = 4;
    player->sleep_frames = 10;
}

void player_tick(Player *player, const PlayerInput *input)
{
    // Module 37119 tick(): physics before entities.tick().
    physics_tick(player);
    movement_tick(player,input);
}

void player_look(Player *player, float dyaw, float dpitch)
{
    const double limit = PI/2-1e-4;
    double pitch = (double)player->pitch+dpitch;
    if(pitch > limit) pitch = limit;
    if(pitch < -limit) pitch = -limit;
    player->pitch = (float)pitch;
    player->yaw = (float)fmod((double)player->yaw+dyaw,2*PI);
}

void player_direction(const Player *player, float out[3])
{
    double horizontal = cos(player->pitch);
    out[0] = (float)(sin(player->yaw)*horizontal);
    out[1] = (float)-sin(player->pitch);
    out[2] = (float)(cos(player->yaw)*horizontal);
}

void player_pick(const Player *player, Hit *hit)
{
    // Module 29692 raycast: preserve tie handling, inclusive six-block reach,
    // and starting-voxel tests. Module 37119 uses Float32Array eye/hit vectors
    // and subtracts .01*normal before flooring the selected coordinates.
    memset(hit,0,sizeof(*hit));
    float ray[3];
    player_direction(player,ray);
    double origin[3] = {player->position[0],
        (float)((double)player->position[1]+1.62),player->position[2]};
    double length = sqrt((double)ray[0]*ray[0] + (double)ray[1]*ray[1] + (double)ray[2]*ray[2]);
    double direction[3], delta[3], next[3];
    int cell[3], step[3];
    for(int axis = 0; axis < 3; axis++) {
        direction[axis] = ray[axis]/length;
        cell[axis] = (int)floor(origin[axis]);
        step[axis] = direction[axis] > 0 ? 1 : -1;
        delta[axis] = direction[axis] == 0 ? INFINITY : fabs(1/direction[axis]);
        next[axis] = isfinite(delta[axis]) ? delta[axis]*(step[axis] > 0 ?
            cell[axis]+1-origin[axis] : origin[axis]-cell[axis]) : INFINITY;
    }
    double distance = 0;
    int entered_axis = -1;
    while(distance <= 6) {
        if(block_solid(world_get(cell[0],cell[1],cell[2]))) {
            hit->valid = 1;
            if(entered_axis == 0) hit->nx = -step[0];
            if(entered_axis == 1) hit->ny = -step[1];
            if(entered_axis == 2) hit->nz = -step[2];
            int selected[3];
            for(int k = 0; k < 3; k++) {
                float point = (float)(origin[k]+distance*direction[k]);
                int normal = k == entered_axis ? -step[k] : 0;
                point = (float)((double)point-0.01*normal);
                selected[k] = (int)floor(point);
            }
            hit->x = selected[0]; hit->y = selected[1]; hit->z = selected[2];
            hit->block = world_get(hit->x,hit->y,hit->z);
            hit->distance = (float)distance;
            return;
        }
        int axis = next[0] < next[1] ? (next[0] < next[2] ? 0 : 2) :
            (next[1] < next[2] ? 1 : 2);
        cell[axis] += step[axis];
        distance = next[axis];
        next[axis] += delta[axis];
        entered_axis = axis;
    }
}
