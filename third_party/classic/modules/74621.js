e.exports = i;
var r = n(14226);
function i(e, t) {
  if (!(this instanceof i)) return new i(e, t);
  var n = r.create();
  (r.add(n, e, t),
    (this.base = r.min(r.create(), e, n)),
    (this.vec = r.clone(t)),
    (this.max = r.max(r.create(), e, n)),
    (this.mag = r.length(this.vec)));
}
var o = i.prototype;
((o.width = function () {
  return this.vec[0];
}),
  (o.height = function () {
    return this.vec[1];
  }),
  (o.depth = function () {
    return this.vec[2];
  }),
  (o.x0 = function () {
    return this.base[0];
  }),
  (o.y0 = function () {
    return this.base[1];
  }),
  (o.z0 = function () {
    return this.base[2];
  }),
  (o.x1 = function () {
    return this.max[0];
  }),
  (o.y1 = function () {
    return this.max[1];
  }),
  (o.z1 = function () {
    return this.max[2];
  }),
  (o.translate = function (e) {
    return (r.add(this.max, this.max, e), r.add(this.base, this.base, e), this);
  }),
  (o.setPosition = function (e) {
    return (r.add(this.max, e, this.vec), r.copy(this.base, e), this);
  }),
  (o.expand = function (e) {
    var t = r.create(),
      n = r.create();
    return (
      r.max(t, e.max, this.max),
      r.min(n, e.base, this.base),
      r.subtract(t, t, n),
      new i(n, t)
    );
  }),
  (o.intersects = function (e) {
    return !(
      e.base[0] > this.max[0] ||
      e.base[1] > this.max[1] ||
      e.base[2] > this.max[2] ||
      e.max[0] < this.base[0] ||
      e.max[1] < this.base[1] ||
      e.max[2] < this.base[2]
    );
  }),
  (o.touches = function (e) {
    var t = this.union(e);
    return null !== t && (0 == t.width() || 0 == t.height() || 0 == t.depth());
  }),
  (o.union = function (e) {
    if (!this.intersects(e)) return null;
    var t = Math.max(e.base[0], this.base[0]),
      n = Math.max(e.base[1], this.base[1]),
      r = Math.max(e.base[2], this.base[2]);
    return new i(
      [t, n, r],
      [
        Math.min(e.max[0], this.max[0]) - t,
        Math.min(e.max[1], this.max[1]) - n,
        Math.min(e.max[2], this.max[2]) - r,
      ],
    );
  }));
