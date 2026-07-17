var r = n(74621),
  i = n(14226);
function o(e, t, n, o, a, s, l) {
  ((this.aabb = new r(e.base, e.vec)),
    (this.mass = t),
    (this.friction = n),
    (this.restitution = o),
    (this.gravityMultiplier = a),
    (this.onCollide = s),
    (this.autoStep = !!l),
    (this.onStep = null),
    (this.velocity = i.create()),
    (this.resting = [!1, !1, !1]),
    (this.inFluid = !1),
    (this._forces = i.create()),
    (this._impulses = i.create()),
    (this._sleepFrameCount = 10));
}
((e.exports = o),
  (o.prototype.setPosition = function (e) {
    (i.subtract(e, e, this.aabb.base),
      this.aabb.translate(e),
      this._markActive());
  }),
  (o.prototype.getPosition = function () {
    return i.clone(this.aabb.base);
  }),
  (o.prototype.applyForce = function (e) {
    (i.add(this._forces, this._forces, e), this._markActive());
  }),
  (o.prototype.applyImpulse = function (e) {
    (i.add(this._impulses, this._impulses, e), this._markActive());
  }),
  (o.prototype._markActive = function () {
    this._sleepFrameCount = 10;
  }),
  (o.prototype.atRestX = function () {
    return this.resting[0];
  }),
  (o.prototype.atRestY = function () {
    return this.resting[1];
  }),
  (o.prototype.atRestZ = function () {
    return this.resting[2];
  }));
