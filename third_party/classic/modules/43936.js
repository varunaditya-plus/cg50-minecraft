"use strict";
var r = n(92849);
e.exports = function (e, t) {
  return new s(e, t);
};
var i,
  o = { texturePath: "" },
  a = { solid: !0, opaque: !0, fluidDensity: 1, viscosity: 0.5 };
function s(e, t) {
  this.noa = e;
  var n = r({}, o, t);
  ((this._texturePath = n.texturePath),
    (this._blockSolidity = [!1]),
    (this._blockOpacity = [!1]),
    (this._blockIsFluid = [!1]),
    (this._blockMats = [null, null, null, null, null, null]),
    (this._blockProps = [null]),
    (this._blockMesh = [null]),
    (this._blockHandlers = [null]),
    (this._matIDs = {}),
    (this._matData = []),
    (this._textures = []));
  for (var i = 1; i <= 32; i++) this.registerBlock(i);
  (this.registerMaterial("dirt", [0.4, 0.3, 0], null),
    this.registerBlock(1, "dirt"));
}
function l(e) {
  ((this.onLoad = e.onLoad || null),
    (this.onUnload = e.onUnload || null),
    (this.onSet = e.onSet || null),
    (this.onUnset = e.onUnset || null),
    (this.onCustomMeshCreate = e.onCustomMeshCreate || null));
}
function c(e, t, n) {
  var r = e._matIDs[t];
  return (void 0 === r && n && (r = e.registerMaterial(t)), r);
}
((s.prototype.registerBlock = function (e, t) {
  ((t = t || {}), (a.solid = !t.fluid), (a.opaque = !t.fluid));
  var n = r({}, a, t);
  if (e < 1 || e > 255) throw "Invalid block id: " + e;
  (e > this._blockSolidity.length &&
    console.warn(
      "Probably better to register block IDs in counting order without gaps!",
    ),
    (this._blockSolidity[e] = !!n.solid),
    (this._blockOpacity[e] = !!n.opaque),
    (this._blockIsFluid[e] = !!n.fluid),
    (this._blockMesh[e] = n.blockMesh || null));
  var i,
    o = n.material || null;
  if (o)
    if ("string" == typeof o) i = [o, o, o, o, o, o];
    else if (o.length && 2 == o.length)
      i = [o[1], o[1], o[0], o[0], o[1], o[1]];
    else if (o.length && 3 == o.length)
      i = [o[2], o[2], o[0], o[1], o[2], o[2]];
    else {
      if (!o.length || 6 != o.length) throw "Invalid material parameter: " + o;
      i = o;
    }
  else i = [null, null, null, null, null, null];
  for (var s = 0; s < 6; ++s) this._blockMats[6 * e + s] = c(this, i[s], !0);
  ((this._blockProps[e] = {}),
    this._blockIsFluid[e] &&
      ((this._blockProps[e].fluidDensity = n.fluidDensity),
      (this._blockProps[e].viscosity = n.viscosity)));
  var u =
    n.onLoad || n.onUnload || n.onSet || n.onUnset || n.onCustomMeshCreate;
  return ((this._blockHandlers[e] = u ? new l(n) : null), e);
}),
  (s.prototype.registerMaterial = function (e, t, n, r) {
    var i = this._matIDs[e] || this._matData.length;
    this._matIDs[e] = i;
    var o = 1;
    return (
      t && 4 == t.length && (o = t.pop()),
      (this._matData[i] = {
        color: t || [1, 1, 1],
        alpha: o,
        texture: n ? this._texturePath + n : "",
        textureAlpha: !!r,
      }),
      null != n &&
        (this._textures[i] = new BABYLON.Texture(
          this._texturePath + n,
          this.noa.rendering._scene,
          !1,
          !0,
          BABYLON.Constants.TEXTURE_NEAREST_NEAREST_MIPNEAREST,
        )),
      i
    );
  }),
  (s.prototype.getBlockSolidity = function (e) {
    return this._blockSolidity[e];
  }),
  (s.prototype.getBlockOpacity = function (e) {
    return this._blockOpacity[e];
  }),
  (s.prototype.getBlockFluidity = function (e) {
    return this._blockIsFluid[e];
  }),
  (s.prototype.getBlockProps = function (e) {
    return this._blockProps[e];
  }),
  (s.prototype.getBlockFaceMaterialAccessor = function () {
    if (!this._storedBFMAccessor) {
      var e = this._blockMats;
      this._storedBFMAccessor = function (t, n) {
        return e[6 * t + n];
      };
    }
    return this._storedBFMAccessor;
  }),
  (s.prototype.getMaterialColor = function (e) {
    return this._matData[e].color;
  }),
  (s.prototype.getTexture = function (e) {
    return this._textures[e];
  }),
  (s.prototype.getMaterialVertexColorAccessor = function () {
    if (!i) {
      var e = this._matData;
      i = function (t) {
        return e[t].texture ? u : e[t].color;
      };
    }
    return i;
  }));
var u = [1, 1, 1];
((s.prototype.getMaterialTexture = function (e) {
  return this._matData[e].texture;
}),
  (s.prototype.getMaterialData = function (e) {
    return this._matData[e];
  }));
