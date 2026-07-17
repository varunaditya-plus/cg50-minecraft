"use strict";
function t(e, t, n) {
  ((e.jumping = !!t.jump),
    e.jumping && e.jumpWasPressed && (e.jumping = !1),
    (e.jumpWasPressed = !!t.jump));
  var r = t.forward ? (t.backward ? 0 : 1) : t.backward ? -1 : 0,
    i = t.right ? (t.left ? 0 : 1) : t.left ? -1 : 0;
  0 === (r | i)
    ? (e.running = !1)
    : ((e.running = !0),
      r
        ? (-1 == r && (n += Math.PI), i && (n += (Math.PI / 4) * r * i))
        : (n += (i * Math.PI) / 2),
      (e.heading = n));
}
e.exports = function (e) {
  return {
    name: "receivesInputs",
    state: {},
    onAdd: null,
    onRemove: null,
    system: function (n, r) {
      for (
        var i = e.entities,
          o = e.inputs.state,
          a = e.rendering.getCameraRotation()[1],
          s = 0;
        s < r.length;
        s++
      )
        t(i.getMovement(r[s].__id), o, a);
    },
  };
};
