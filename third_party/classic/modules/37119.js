"use strict";
n(74621);
var r = n(14226),
  i = n(92849),
  o = n(38655),
  a = n(37007).EventEmitter,
  s = n(89824),
  l = n(80131),
  c = n(67431),
  u = n(88018),
  h = n(66358),
  d = n(46280),
  f = n(43936),
  p = n(85452),
  m = n(29692);
e.exports = g;
var _ = {
  playerHeight: 1.8,
  playerWidth: 0.6,
  playerStart: [0, 10, 0],
  playerAutoStep: !1,
  tickRate: 30,
  blockTestDistance: 10,
  stickyPointerLock: !0,
  dragCameraOutsidePointerLock: !0,
  skipDefaultHighlighting: !1,
};
function g(e) {
  if (!(this instanceof g)) return new g(e);
  ((e = i(_, e)),
    (this._tickRate = e.tickRate),
    (this._paused = !1),
    (this._dragOutsideLock = e.dragCameraOutsidePointerLock));
  var t = this;
  ((this.settings = e.settings || {}),
    (this.addMode = !1),
    (this.container = s(this, e)),
    (this.inputs = u(this, e, this.container.element)),
    (this.registry = f(this, e)),
    (this.world = c(this, e)),
    (this.rendering = l(this, e, this.container.canvas)),
    (this.entities = p(this, e)),
    (this.ents = this.entities),
    (this.physics = h(this, e)),
    (this.cameraControls = d(this, e)));
  var n = this.ents;
  ((this.playerEntity = n.add(
    e.playerStart,
    e.playerWidth,
    e.playerHeight,
    null,
    null,
    !0,
    !0,
  )),
    n.addComponent(this.playerEntity, n.names.collideTerrain),
    n.addComponent(this.playerEntity, n.names.collideEntities));
  var a = n.getPhysicsBody(this.playerEntity);
  ((a.gravityMultiplier = 4),
    (a.autoStep = e.playerAutoStep),
    (this.playerBody = a),
    n.addComponent(this.playerEntity, n.names.receivesInputs),
    n.addComponent(this.playerEntity, n.names.fadeOnZoom),
    n.addComponent(this.playerEntity, n.names.movement, { airJumps: 0 }),
    (this.playerEyeOffset = 0.9 * e.playerHeight),
    (this.blockTestDistance = e.blockTestDistance || 10));
  var v = this.world,
    y = function (e, t, n) {
      return v.getBlockID(e, t, n);
    },
    b = function (e, t, n) {
      return v.getBlockSolidity(e, t, n);
    };
  ((this._traceWorldRay = function (e, t, n, r, i) {
    return m(y, e, t, n, r, i);
  }),
    (this._traceWorldRayCollision = function (e, t, n, r, i) {
      return m(b, e, t, n, r, i);
    }),
    (this.targetedBlock = null),
    e.skipDefaultHighlighting ||
      ((this.defaultBlockHighlightFunction = function (e) {
        e
          ? t.rendering.highlightBlockFace(!0, e.position, e.normal, t.addMode)
          : t.rendering.highlightBlockFace(!1);
      }),
      this.on("targetBlockChanged", this.defaultBlockHighlightFunction)),
    this.rendering.initScene(),
    (window.noa = this),
    (window.ndarray = o),
    (window.vec3 = r));
}
((g.prototype = Object.create(a.prototype)),
  (g.prototype.tick = function () {
    if (!this._paused) {
      E("start");
      var e = this._tickRate;
      (this.world.tick(e),
        E("world"),
        this.world.playerChunkLoaded
          ? (this.physics.tick(e),
            E("physics"),
            this.rendering.tick(e),
            E("rendering"),
            (function (e) {
              var t = "",
                n = e.pick(null, null, null, !0);
              if (n) {
                for (var r = S, i = 0; i < 3; i++) {
                  var o = 0 | n.normal[i],
                    a = Math.floor(n.position[i]);
                  ((r.position[i] = a),
                    (r.normal[i] = o),
                    (r.adjacent[i] = a + o),
                    (t += "|" + a + "|" + o));
                }
                ((r.blockID = e.world.getBlockID(
                  r.position[0],
                  r.position[1],
                  r.position[2],
                )),
                  (t += "|" + n.blockID),
                  (e.targetedBlock = r),
                  (r.position[0] < 0 ||
                    r.position[0] >= e.worldSize - 1 ||
                    r.position[2] < 0 ||
                    r.position[2] >= e.worldSize - 1) &&
                    (e.targetedBlock = null),
                  10 != r.blockID || e.addMode || (e.targetedBlock = null));
              } else e.targetedBlock = null;
              t != T &&
                (e.emit("targetBlockChanged", e.targetedBlock), (T = t));
            })(this),
            E("targets"),
            this.emit("tick", e),
            E("tick content"),
            E("end"),
            this.entities.tick())
          : this.rendering.tick(e));
    }
  }),
  (g.prototype.render = function (e) {
    if (!this._paused) {
      x("start");
      var t = e * this._tickRate;
      ((this.container.hasPointerLock ||
        !this.container.supportsPointerLock ||
        (this._dragOutsideLock && this.inputs.state.fire)) &&
        this.cameraControls.updateForRender(),
        this.emit("beforeRender", t),
        x("before render"),
        this.rendering.render(t),
        x("render"),
        this.emit("afterRender", t),
        x("after render"),
        x("end"));
    }
  }),
  (g.prototype.setPaused = function (e) {
    ((this._paused = !!e),
      e || (this.inputs.state.dx = this.inputs.state.dy = 0));
  }),
  (g.prototype.getBlock = function (e, t, n) {
    return e.length
      ? this.world.getBlockID(e[0], e[1], e[2])
      : this.world.getBlockID(e, t, n);
  }),
  (g.prototype.setBlock = function (e, t, n, r) {
    return t.length
      ? this.world.setBlockID(e, t[0], t[1], t[2])
      : this.world.setBlockID(e, t, n, r);
  }),
  (g.prototype.addBlock = function (e, t, n, r) {
    return t.length
      ? !(
          (this.entities.isTerrainBlocked(t[0], t[1], t[2]) &&
            7 != e &&
            17 != e &&
            n) ||
          (this.world.setBlockID(e, t[0], t[1], t[2]), 0)
        )
      : !(
          (this.entities.isTerrainBlocked(t, n, r) && 7 != e && 17 != e) ||
          (this.world.setBlockID(e, t, n, r), 0)
        );
  }),
  (g.prototype.getPlayerPosition = function () {
    return this.entities.getPosition(this.playerEntity);
  }),
  (g.prototype.getPlayerMesh = function () {
    return this.entities.getMeshData(this.playerEntity).mesh;
  }),
  (g.prototype.setPlayerEyeOffset = function (e) {
    ((this.playerEyeOffset = e),
      (this.ents.getState(
        this.rendering.cameraTarget,
        this.ents.names.followsEntity,
      ).offset[1] = e));
  }),
  (g.prototype.getPlayerEyePosition = function () {
    var e = this.entities.getPosition(this.playerEntity);
    return (r.copy(v, e), (v[1] += this.playerEyeOffset), v);
  }));
var v = r.create();
g.prototype.getCameraVector = function () {
  var e = this.rendering.getCameraVector();
  return (r.set(y, e.x, e.y, e.z), y);
};
var y = r.create();
g.prototype.pick = function (e, t, n, r) {
  if (0 === n) return null;
  ((e = e || this.getPlayerEyePosition()),
    (t = t || this.getCameraVector()),
    (n = n || this.blockTestDistance));
  var i = b.position,
    o = b.normal;
  if (
    !(r
      ? this._traceWorldRayCollision(e, t, n, i, o)
      : this._traceWorldRay(e, t, n, i, o))
  )
    return null;
  for (var a = 0; a < 3; a++) i[a] -= 0.01 * o[a];
  return b;
};
var b = { position: r.create(), normal: r.create() },
  S = { blockID: 0, position: [], normal: [], adjacent: [] },
  T = "";
g.prototype.resetTargetBlock = function () {
  T = "";
};
var E = function (e) {},
  x = function (e) {};
