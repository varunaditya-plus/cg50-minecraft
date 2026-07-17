"use strict";
var r = n(92849),
  i = n(74621),
  o = n(14226),
  a = n(64601),
  s = n(26579);
e.exports = function (e, t, n) {
  return new c(e, t, n);
};
var l = {
  gravity: [0, -10, 0],
  airFriction: 0.995,
  minBounceImpulse: 0.5,
  fluidDensity: 1.2,
  fluidDrag: 4,
};
function c(e, t, n) {
  ((e = r({}, l, e)),
    (this.gravity = e.gravity),
    (this.airFriction = e.airFriction),
    (this.fluidDensity = e.fluidDensity),
    (this.fluidDrag = e.fluidDrag),
    (this.minBounceImpulse = e.minBounceImpulse),
    (this.bodies = []),
    (this.testSolid = t),
    (this.testFluid = n));
}
((c.prototype.addBody = function (e, t, n, r, o, a) {
  ((e = e || new i([0, 0, 0], [1, 1, 1])),
    void 0 === t && (t = 1),
    void 0 === n && (n = 1),
    void 0 === r && (r = 0),
    void 0 === o && (o = 1));
  var l = new s(e, t, n, r, o, a);
  return (this.bodies.push(l), l);
}),
  (c.prototype.removeBody = function (e) {
    var t = this.bodies.indexOf(e);
    t < 0 || (this.bodies.splice(t, 1), (e.aabb = e.onCollide = null));
  }));
var u = o.create(),
  h = o.create(),
  d = o.create(),
  f = o.create(),
  p = o.create(),
  m = o.create(),
  _ = o.create();
function g(e, t, n, r) {
  return (
    o.set(r, 0, 0, 0),
    a(e.testSolid, t, n, function (e, t, n, i) {
      ((r[t] = n), (i[t] = 0));
    })
  );
}
c.prototype.tick = function (e) {
  var t,
    n,
    r,
    i,
    a = P(0, o.squaredLength(this.gravity));
  for (e /= 1e3, n = 0, i = this.bodies.length; n < i; ++n)
    if (
      ((t = this.bodies[n]),
      o.copy(_, t.resting),
      !x(this, t, e, a || 0 === t.gravityMultiplier))
    ) {
      if (
        (t._sleepFrameCount--,
        o.scale(h, t._forces, 1 / t.mass),
        o.scaleAndAdd(h, h, this.gravity, t.gravityMultiplier),
        o.scale(f, t._impulses, 1 / t.mass),
        o.add(t.velocity, t.velocity, f),
        o.scale(f, h, e),
        o.add(t.velocity, t.velocity, f),
        _[1] < 0)
      ) {
        var s = e * t.friction;
        (o.scale(u, t.velocity, -1), (u[1] = 0));
        var l = o.length(u);
        l > s
          ? (o.scale(u, u, s / l), o.add(t.velocity, t.velocity, u))
          : (t.velocity[0] = t.velocity[2] = 0);
      } else o.scale(t.velocity, t.velocity, this.airFriction);
      for (
        o.scale(p, t.velocity, e),
          o.set(t._forces, 0, 0, 0),
          o.set(t._impulses, 0, 0, 0),
          t.autoStep && A(v, t.aabb),
          g(this, t.aabb, p, t.resting),
          t.autoStep && E(this, t, v, p),
          r = 0;
        r < 3;
        ++r
      )
        ((m[r] = 0),
          t.resting[r] &&
            (_[r] || (m[r] = -t.velocity[r]), (t.velocity[r] = 0)));
      var c = o.length(m);
      c > 0.001 &&
        (c > this.minBounceImpulse &&
          t.restitution &&
          (o.scale(m, m, t.restitution * t.mass), t.applyImpulse(m)),
        t.onCollide && t.onCollide(m));
      for (
        var y = t.aabb,
          b = Math.floor((y.base[0] + y.max[0]) / 2),
          S = Math.floor((y.base[2] + y.max[2]) / 2),
          T = Math.floor(y.base[1]),
          C = Math.floor(y.max[1]),
          R = 0,
          I = T;
        I <= C && this.testFluid(b, I, S);
        ++I
      )
        ++R;
      if (R > 0) {
        var O = (T + R - y.base[1]) / y.vec[1];
        O > 1 && (O = 1);
        var M = y.vec[0] * y.vec[1] * y.vec[2] * O;
        (o.scale(d, this.gravity, -t.gravityMultiplier * this.fluidDensity * M),
          o.scale(u, t.velocity, -this.fluidDrag * O),
          o.add(d, d, u),
          t.applyForce(d),
          (t.inFluid = !0));
      } else t.inFluid = !1;
      o.squaredLength(t.velocity) > 1e-5 && t._markActive();
    }
};
var v = new i([], []),
  y = o.create(),
  b = o.create(),
  S = o.create(),
  T = o.create();
function E(e, t, n, r) {
  if (!(t.resting[1] >= 0) || t.inFluid) {
    var i = 0 !== t.resting[0],
      s = 0 !== t.resting[2];
    if (i || s) {
      var l = Math.abs(r[0] / r[2]);
      if ((i || !(l > 4)) && (s || !(l < 1 / 4))) {
        o.add(b, n.base, r);
        var c = e.testSolid,
          u =
            (a(c, n, r, function (e, t, n, r) {
              if (1 !== t) return !0;
              r[t] = 0;
            }),
            t.aabb.base[1]),
          h = Math.floor(u + 1.001) - u;
        o.set(S, 0, h, 0);
        var d = !1;
        (a(c, n, S, function (e, t, n, r) {
          return ((d = !0), !0);
        }),
          d ||
            (o.subtract(T, b, n.base),
            (T[1] = 0),
            g(e, n, T, y),
            (i && !P(n.base[0], b[0])) ||
              (s && !P(n.base[2], b[2])) ||
              (A(t.aabb, n),
              (t.resting[0] = y[0]),
              (t.resting[2] = y[2]),
              t.onStep && t.onStep())));
      }
    }
  }
}
function x(e, t, n, r) {
  if (t._sleepFrameCount > 0) return !1;
  if (r) return !0;
  var i = !1;
  return (
    o.scale(f, e.gravity, n),
    a(
      e.testSolid,
      t.aabb,
      f,
      function () {
        return ((i = !0), !0);
      },
      !0,
    ),
    i
  );
}
function P(e, t) {
  return Math.abs(e - t) < 1e-5;
}
function A(e, t) {
  for (var n = 0; n < 3; n++)
    ((e.base[n] = t.base[n]), (e.max[n] = t.max[n]), (e.vec[n] = t.vec[n]));
}
