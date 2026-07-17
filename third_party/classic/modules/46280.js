"use strict";
var r = n(92849);
e.exports = function (e, t) {
  return new o(e, t);
};
var i = { rotationScale: 8e-4, inverseY: !1 };
function o(e, t) {
  ((this.noa = e),
    (t = r({}, i, t)),
    (this.rotationScale = t.rotationScale),
    (this.inverseY = t.inverseY));
}
o.prototype.updateForRender = function () {
  var e,
    t,
    n = this.noa.inputs.state,
    r = this.rotationScale * n.dy * (this.inverseY ? -1 : 1),
    i = this.rotationScale * n.dx,
    o = this.noa.rendering.getCameraRotation(),
    s =
      ((e = o[0] + r), (t = a), isFinite(t) ? Math.max(Math.min(e, t), -t) : e),
    l = (o[1] + i) % (2 * Math.PI);
  this.noa.rendering.setCameraRotation(s, l);
};
var a = Math.PI / 2 - 1e-4;
