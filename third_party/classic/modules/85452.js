"use strict";
var r = n(92849),
  i = n(74621),
  o = n(14226),
  a = n(77371);
e.exports = function (e, t) {
  return new l(e, t);
};
var s = { shadowDistance: 10 };
function l(e, t) {
  (a.call(this), (this.noa = e), (t = r(s, t)), (this.names = {}));
  var i = t.shadowDistance;
  ((this.names.position = this.createComponent(n(65549)(e))),
    (this.names.physics = this.createComponent(n(78061)(e))),
    (this.names.followsEntity = this.createComponent(n(77841)(e))),
    (this.names.mesh = this.createComponent(n(30691)(e))),
    (this.names.shadow = this.createComponent(n(36930)(e, i))),
    (this.names.collideTerrain = this.createComponent(n(83041)(e))),
    (this.names.collideEntities = this.createComponent(n(46653)(e))),
    (this.names.every = this.createComponent(n(29483)(e))),
    (this.names.smoothCamera = this.createComponent(n(62383)(e))),
    (this.names.movement = this.createComponent(n(90583)(e))),
    (this.names.receivesInputs = this.createComponent(n(20713)(e))),
    (this.names.fadeOnZoom = this.createComponent(n(51806)(e))),
    (this.isPlayer = function (t) {
      return t === e.playerEntity;
    }),
    (this.hasPhysics = this.getComponentAccessor(this.names.physics)),
    (this.cameraSmoothed = this.getComponentAccessor(this.names.smoothCamera)),
    (this.hasMesh = this.getComponentAccessor(this.names.mesh)),
    (this.hasPosition = this.getComponentAccessor(this.names.position)));
  var l = this.getStateAccessor(this.names.position);
  ((this.getPositionData = l),
    (this.getPosition = function (e) {
      return l(e).position;
    }),
    (this.setPosition = function (e, t, n, r) {
      var i = this.getPositionData(e);
      (o.set(i.position, t, n, r),
        (i._extentsChanged = !0),
        this.hasPhysics(e) && u(this.getPhysicsBody(e).aabb, i));
    }));
  var c = this.getStateAccessor(this.names.physics);
  ((this.getPhysicsBody = function (e) {
    return c(e).body;
  }),
    (this.getPhysicsInterpolation = function (e) {
      return c(e).interpolatePosition;
    }),
    (this.setPhysicsInterpolation = function (e, t) {
      c(e).interpolatePosition = t;
    }),
    (this.getMeshData = this.getStateAccessor(this.names.mesh)),
    (this.getMovement = this.getStateAccessor(this.names.movement)),
    (this.getCollideTerrain = this.getStateAccessor(this.names.collideTerrain)),
    (this.getCollideEntities = this.getStateAccessor(
      this.names.collideEntities,
    )));
  var h = this;
  (e.on("tick", function (e) {}),
    e.on("beforeRender", function (e) {
      h.render(e);
    }),
    this.createEntity());
}
((l.prototype = Object.create(a.prototype)),
  (l.prototype.constructor = l),
  (l.prototype.addComponentAgain = function (e, t, n) {
    (this.hasComponent(e, t) && this.removeComponent(e, t),
      this.addComponent(e, t, n));
  }),
  (l.prototype.isTerrainBlocked = function (e, t, n) {
    var r = c,
      i = 0.001;
    return (
      r.setPosition([e + i, t + i, n + i]),
      this.getEntitiesInAABB(r, this.names.collideTerrain).length > 0
    );
  }));
var c = new i([0, 0, 0], [0.998, 0.998, 0.998]);
function u(e, t) {
  var n = t.width,
    r = t.position,
    i = n / 2;
  (o.set(e.base, r[0] - i, r[1], r[2] - i),
    o.set(e.vec, n, t.height, n),
    o.add(e.max, e.base, e.vec));
}
((l.prototype.setEntitySize = function (e, t, n, r) {
  if (!this.hasPosition(e))
    throw "Set size of entity without a position component";
  var i = this.getPositionData(e);
  ((i.width = (t + r) / 2),
    (i.height = n),
    (i._extentsChanged = !0),
    this.hasPhysics(e) && u(this.getPhysicsBody(e).aabb, i));
}),
  (l.prototype.getEntitiesInAABB = function (e, t) {
    for (
      var n = [],
        r = this,
        i = t
          ? r.getStatesList(t).map(function (e) {
              return r.getPositionData(e.__id);
            })
          : (i = r.getStatesList(this.names.position)),
        o = h,
        a = 0;
      a < i.length;
      a++
    )
      (u(o, i[a]), e.intersects(o) && n.push(i[a].__id));
    return n;
  }));
var h = new i([], []);
l.prototype.add = function (e, t, n, r, i, a, s) {
  var l = this,
    c = this.createEntity(),
    u = o.create();
  if (
    (o.copy(u, e),
    this.addComponent(c, this.names.position, {
      position: u,
      width: t,
      height: n,
    }),
    a)
  ) {
    this.addComponent(c, this.names.physics);
    var h = this.getPhysicsBody(c),
      d = this.names.smoothCamera;
    h.onStep = function () {
      l.addComponentAgain(c, d);
    };
  }
  return (
    r &&
      (i || (i = o.create()),
      this.addComponent(c, this.names.mesh, { mesh: r, offset: i })),
    s && this.addComponent(c, this.names.shadow, { size: t }),
    c
  );
};
