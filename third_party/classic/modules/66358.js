"use strict";
var r = n(55132),
  i = n(14226),
  o = n(92849);
e.exports = function (e, t) {
  return (function (e, t) {
    t = o({}, a, t);
    var n = e.world,
      i = r(
        t,
        function (e, t, r) {
          var i = n.getBlockID(e, t, r);
          return (
            5 != i &&
            6 != i &&
            8 != i &&
            15 != i &&
            16 != i &&
            n.getBlockSolidity(e, t, r)
          );
        },
        function (e, t, r) {
          return n.getBlockFluidity(e, t, r);
        },
      );
    return (
      (i._originalTick = i.tick),
      (i.tick = function (t) {
        (this._originalTick(t),
          (function (e) {
            for (
              var t = e.ents,
                n = t.getStatesList(t.names.physics),
                r = s,
                i = 0;
              i < n.length;
              ++i
            ) {
              var o = n[i],
                a = t.getPositionData(o.__id);
              ((r[0] = a.width / 2), (r[1] = 0), (r[2] = r[0]));
              for (
                var l = a.position,
                  c = o.body.aabb.base,
                  u = o.body.aabb.max,
                  h = a._extents,
                  d = 0;
                d < 3;
                d++
              )
                ((l[d] = c[d] + r[d]), (h[d] = c[d]), (h[d + 3] = u[d]));
            }
          })(e));
      }),
      i
    );
  })(e, t);
};
var a = { gravity: [0, -10, 0], airFriction: 0.999 },
  s = i.create();
