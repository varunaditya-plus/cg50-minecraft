"use strict";
var r = n(14226);
e.exports = function (e) {
  return {
    name: "movement",
    state: {
      heading: 0,
      running: !1,
      jumping: !1,
      maxSpeed: 6,
      moveForce: 30,
      responsiveness: 15,
      runningFriction: 0,
      standingFriction: 50,
      airMoveMult: 0.5,
      jumpImpulse: 11,
      jumpForce: 6.5,
      jumpTime: 500,
      airJumps: 1,
      _jumpCount: 0,
      _isJumping: 0,
      _currjumptime: 0,
    },
    onAdd: null,
    onRemove: null,
    system: function (t, n) {
      for (var r = e.entities, i = 0; i < n.length; i++) {
        var o = n[i];
        s(t, o, r.getPhysicsBody(o.__id));
      }
    },
  };
};
var i = r.create(),
  o = r.create(),
  a = r.create();
function s(e, t, n) {
  var s = noa.world.getBlockID(
      Math.floor(n.aabb.base[0]),
      Math.floor(n.aabb.base[1]),
      Math.floor(n.aabb.base[2]),
    ),
    l = noa.world.getBlockID(
      Math.floor(n.aabb.base[0]),
      Math.floor(n.aabb.base[1] + 0.5),
      Math.floor(n.aabb.base[2]),
    ),
    c = !1,
    u = !1;
  ((7 != s && 41 != s && 7 != l && 41 != l) || (c = !0),
    17 == s && (u = !0),
    (n.autoStep = !1),
    (c || u) && 0 == l && (n.autoStep = !0),
    (n.gravityMultiplier = 4.2),
    c && (n.gravityMultiplier = 2.1),
    u && (n.gravityMultiplier = 1.05));
  var h = n.atRestY() < 0,
    d = h || t._jumpCount < t.airJumps;
  if ((h && ((t._isJumping = !1), (t._jumpCount = 0)), !t.jumping || c || u))
    t._isJumping = !1;
  else if (t._isJumping) {
    if (t._currjumptime > 0) {
      var f = t.jumpForce;
      (t._currjumptime < e && (f *= t._currjumptime / e),
        n.applyForce([0, f, 0]),
        (t._currjumptime -= e));
    }
  } else
    d &&
      ((t._isJumping = !0),
      h || t._jumpCount++,
      (t._currjumptime = t.jumpTime),
      n.applyImpulse([0, t.jumpImpulse, 0]),
      !h && n.velocity[1] < 0 && (n.velocity[1] = 0));
  (t.jumpWasPressed && c && n.applyForce([0, 3 * t.maxSpeed, 0]),
    t.jumpWasPressed && u && n.applyForce([0, 1.5 * t.maxSpeed, 0]));
  var p = i,
    m = o;
  if (t.running) {
    var _ = t.maxSpeed;
    (c && (_ *= 0.5),
      u && (_ *= 0.25),
      r.set(p, 0, 0, _),
      r.rotateY(p, p, a, t.heading),
      r.subtract(m, p, n.velocity),
      (m[1] = 0));
    var g = r.length(m);
    if ((r.normalize(m, m), g > 0)) {
      var v = t.moveForce;
      h || (v *= t.airMoveMult);
      var y = t.responsiveness * g;
      (v > y && (v = y), r.scale(m, m, v), n.applyForce(m));
    }
    n.friction = t.runningFriction;
  } else n.friction = t.standingFriction;
  var b = n.getPosition();
  (b[0] <= 0.2 && (n.setPosition([0.2, b[1], b[2]]), (n.velocity[0] = 0)),
    b[0] >= noa.worldSize - 1 - 0.8 &&
      (n.setPosition([noa.worldSize - 1 - 0.8, b[1], b[2]]),
      (n.velocity[0] = 0)),
    (b = n.getPosition())[2] <= 0.2 &&
      (n.setPosition([b[0], b[1], 0.2]), (n.velocity[2] = 0)),
    b[2] >= noa.worldSize - 1 - 0.8 &&
      (n.setPosition([b[0], b[1], noa.worldSize - 1 - 0.8]),
      (n.velocity[2] = 0)),
    b[1] <= 0 && (n.setPosition([b[0], 0, b[2]]), (n.velocity[1] = 0)));
}
