"use strict";
var r = n(92849),
  i = n(14226),
  o = n(74621),
  a = n(64601),
  s = n(19391).removeUnorderedListItem;
if (!BABYLON) throw new Error("Babylon.js reference not found! Abort! Abort!");
e.exports = function (e, t, n) {
  return new h(e, t, n);
};
var l = BABYLON.Vector3,
  c = BABYLON.Color3;
window.BABYLON = BABYLON;
var u = {
  showFPS: !1,
  antiAlias: !0,
  clearColor: [0.588, 0.835, 1],
  ambientColor: [1, 1, 1],
  lightDiffuse: [1, 1, 1],
  lightSpecular: [1, 1, 1],
  groundLightColor: [0.5, 0.5, 0.5],
  initialCameraZoom: 0,
  cameraZoomSpeed: 0.2,
  cameraMaxAngle: Math.PI / 2 - 0.01,
  useAO: !0,
  AOmultipliers: [0.93, 0.8, 0.5],
  reverseAOmultiplier: 1,
};
function h(e, t, n) {
  this.noa = e;
  var i = r({}, u, t);
  ((this.zoomDistance = i.initialCameraZoom),
    (this._currentZoom = this.zoomDistance),
    (this._cameraZoomSpeed = i.cameraZoomSpeed),
    (this._maxCamAngle = i.cameraMaxAngle),
    (function (e, t, n) {
      if (!BABYLON) throw new Error("BABYLON.js engine not found!");
      ((e._engine = new BABYLON.Engine(t, n.antiAlias, void 0, !0)),
        (e._scene = new BABYLON.Scene(e._engine)));
      var r = e._scene;
      function i(e) {
        return new c(e[0], e[1], e[2]);
      }
      (r.detachControl(),
        (e._octree = new BABYLON.Octree()),
        (e._octree.blocks = []),
        (r._selectionOctree = e._octree),
        (e._rotationHolder = new BABYLON.Mesh("rotHolder", r)),
        (e._cameraHolder = new BABYLON.Mesh("camHolder", r)),
        (e._camera = new BABYLON.FreeCamera("camera", new l(0, 0, 0), r)),
        (e._camera.parent = e._cameraHolder),
        (e._camera.minZ = 0.01),
        (e._cameraHolder.visibility = !1),
        (e._rotationHolder.visibility = !1),
        (e._camScreen = BABYLON.Mesh.CreatePlane("camScreen", 10, r)),
        e.addDynamicMesh(e._camScreen),
        (e._camScreen.position.z = 0.11),
        (e._camScreen.parent = e._camera),
        (e._camScreenMat = e.makeStandardMaterial("camscreenmat")),
        (e._camScreenMat.specularColor = new c(0, 0, 0)),
        (e._camScreen.material = e._camScreenMat),
        e._camScreen.setEnabled(!1),
        (e._camLocBlock = 0),
        (e._light = new BABYLON.HemisphericLight(
          "light",
          new l(0.1, 1, 0.3),
          r,
        )),
        (r.clearColor = i(n.clearColor)),
        (r.ambientColor = i(n.ambientColor)),
        (e._light.diffuse = i(n.lightDiffuse)),
        (e._light.specular = i(n.lightSpecular)),
        (e._light.groundColor = i(n.groundLightColor)),
        (e.flatMaterial = e.makeStandardMaterial("flatmat")),
        (e.flatMaterial.specularColor = BABYLON.Color3.Black()));
    })(this, n, i),
    (this._meshedChunks = {}),
    (this._numMeshedChunks = 0),
    (this.useAO = !!i.useAO),
    (this.aoVals = i.AOmultipliers),
    (this.revAoVal = i.reverseAOmultiplier),
    (this.meshingCutoffTime = 6),
    (window.scene = this._scene),
    i.showFPS &&
      (function () {
        var e = document.createElement("div");
        e.id = "noa_fps";
        ((e.style =
          "position:absolute; top:0; right:0; z-index:0;color:white; background-color:rgba(0,0,0,0.5);font:14px monospace; text-align:center;min-width:2em; margin:4px;"),
          document.body.appendChild(e));
        var t = 0,
          n = 0,
          r = performance.now(),
          i = r;
        S = function () {
          t++;
          var o = performance.now();
          if ((o - i > n && (n = o - i), (i = o), !(o - r < 1e3))) {
            var a = Math.round((t / (o - r)) * 1e3),
              s = Math.round((1 / n) * 1e3);
            ((e.innerHTML = a + "<br>" + s), (t = 0), (n = 0), (r = o));
          }
        };
      })());
}
((h.prototype.initScene = function () {
  ((this.cameraTarget = this.noa.ents.createEntity(["position"])),
    this.noa.ents.addComponent(this.cameraTarget, "followsEntity", {
      entity: this.noa.playerEntity,
      offset: [0, this.noa.playerEyeOffset, 0],
    }));
}),
  (h.prototype.getScene = function () {
    return this._scene;
  }),
  (h.prototype.tick = function (e) {}));
var d = 0;
((h.prototype.render = function (e) {
  ((d += e),
    (function (e) {
      e._cameraHolder.rotation.copyFrom(e._rotationHolder.rotation);
      var t = e.noa.ents.getPositionData(e.cameraTarget).renderPosition;
      e._cameraHolder.position.copyFromFloats(t[0], t[1], t[2]);
      var n = e.zoomDistance,
        r = e._cameraZoomSpeed;
      (n > 0 &&
        ((n = (function (e) {
          var t = 0.2;
          m ||
            ((m = new o([0, 0, 0], [0.4, 0.4, 0.4])),
            (_ = function (t, n, r) {
              return e.noa.world.getBlockSolidity(t, n, r);
            }));
          var n = e._cameraHolder.position;
          (i.set(g, n.x - t, n.y - t, n.z - t), m.setPosition(g));
          var r = -e.zoomDistance,
            s = e.getCameraVector();
          return (
            i.set(v, r * s.x, r * s.y, r * s.z),
            a(
              _,
              m,
              v,
              function (e, t, n, r) {
                return !0;
              },
              !0,
            )
          );
        })(e)),
        n < e._currentZoom && (e._currentZoom = n)),
        (e._currentZoom += r * (n - e._currentZoom)),
        (e._camera.position.z = -e._currentZoom));
      var s = e.getCameraPosition(),
        l = e.noa.world.getBlockID(
          Math.floor(s.x),
          Math.floor(s.y),
          Math.floor(s.z),
        );
      !(function (e, t) {
        if (t !== e._camLocBlock) {
          if (0 === t || 40 === t)
            (e._camScreen.setEnabled(!1),
              (e._scene.fogColor = new BABYLON.Color3(0.9, 0.95, 1)),
              (e._scene.fogDensity = e.fogWorld),
              (e._scene.clearColor = e._scene.fogColor));
          else {
            var n = e.noa.registry.getBlockFaceMaterialAccessor()(t, 1),
              r = e.noa.registry.getMaterialData(n),
              i = r.color,
              o = r.alpha;
            i &&
              o &&
              o < 1 &&
              (17 == t &&
                ((e._camScreenMat.diffuseColor = new c(0.8, 0, 0)),
                (e._camScreenMat.alpha = 0.8),
                e._camScreen.setEnabled(!0),
                (e._scene.fogColor = new BABYLON.Color3(0.1, 0, 0)),
                (e._scene.fogDensity = e.fogLava),
                (e._scene.clearColor = e._scene.fogColor)),
              (7 != t && 41 != t) ||
                ((e._camScreenMat.diffuseColor = new c(0, 0, 0.8)),
                (e._camScreenMat.alpha = 0.5),
                e._camScreen.setEnabled(!0),
                (e._scene.fogColor = new BABYLON.Color3(0, 0, 0.1)),
                (e._scene.fogDensity = e.fogWater),
                (e._scene.clearColor = e._scene.fogColor)));
          }
          e._camLocBlock = t;
        }
      })(e, l);
    })(this),
    this._engine.beginFrame(),
    this._scene.render(),
    this.noa.addMode || y(this, d),
    this.noa.addMode && b(this, d),
    S(),
    this._engine.endFrame(),
    this.noa.version &&
      ((this.noa.version.fps = Math.round(
        1e3 / this._scene.getEngine().getDeltaTime(),
      )),
      (this.noa.version.chunkUpdates += this.noa.world._blockChanges),
      this.noa.version.redraw(),
      (this.noa.world._blockChanges = 0)),
    this.noa.inputs.tick());
}),
  (h.prototype.resize = function (e) {
    this._engine.resize();
  }),
  (h.prototype.highlightBlockFace = function (e, t, n, r) {
    var o = (function (e) {
      var t = e._highlightMesh;
      if (!t) {
        var n = BABYLON.Mesh.CreateBox("highlight", 1.005, e._scene),
          r = e.makeDynamicStandardMaterial("highlightMat");
        ((r.disableLighting = !0),
          (r.backFaceCulling = !1),
          (r.emissiveColor = new c(1, 1, 1)),
          (r.alpha = 0.2),
          (n.material = r),
          (t = e._highlightMesh = n));
        var i = 0.5,
          o = BABYLON.Mesh.CreateLines(
            "hightlightLines",
            [
              new l(i, i, i),
              new l(i, -i, i),
              new l(-i, -i, i),
              new l(-i, i, i),
              new l(i, i, i),
              new l(i, i, -i),
              new l(i, -i, -i),
              new l(-i, -i, -i),
              new l(-i, i, -i),
              new l(i, i, -i),
              new l(i, i, i),
              new l(i, -i, i),
              new l(i, -i, -i),
              new l(i, i, -i),
              new l(i, i, i),
              new l(-i, i, i),
              new l(-i, -i, i),
              new l(-i, -i, -i),
              new l(-i, i, -i),
              new l(-i, i, i),
            ],
            e._scene,
          );
        ((o.color = new c(0, 0, 0)),
          (o.parent = n),
          e.addDynamicMesh(t),
          e.addDynamicMesh(o));
      }
      return t;
    })(this);
    if (e && !r) {
      (this._currentZoom, i.distance(this.noa.getPlayerEyePosition(), t));
      for (var a = 0, s = f, u = 0; u < 3; ++u) s[u] = t[u] + 0.5;
      (o.position.copyFromFloats(s[0], s[1], s[2]), o.setEnabled(!0));
    } else o.setEnabled(!1);
    if (
      ((o = (function (e) {
        var t = function () {
            var e = noa.rendering.getScene(),
              t = 0.25 * Math.PI,
              n = BABYLON.Mesh.CreatePlane("plane1", 1, e),
              r = BABYLON.Mesh.CreatePlane("plane2", 1, e);
            ((n.rotation.y = t), (r.rotation.y = Math.PI + t));
            var i = BABYLON.Mesh.CreatePlane("plane3", 1, e),
              o = BABYLON.Mesh.CreatePlane("plane4", 1, e);
            return (
              (i.rotation.y = 0.5 * -Math.PI + t),
              (o.rotation.y = 0.5 * Math.PI + t),
              (n.position = new BABYLON.Vector3(0, 0, 0.5)),
              (r.position = new BABYLON.Vector3(0, 0, 0.5)),
              (i.position = new BABYLON.Vector3(0, 0, 0.5)),
              (o.position = new BABYLON.Vector3(0, 0, 0.5)),
              BABYLON.Mesh.MergeMeshes([n, r, i, o])
            );
          },
          n = e._previewMesh;
        if (!n) {
          var r = BABYLON.Mesh.CreatePlane("preview0", 1, e._scene);
          (((h = e.makeDynamicStandardMaterial("previewMat0")).diffuseTexture =
            new BABYLON.Texture(null, e._scene)),
            (r.material = h));
          var i = BABYLON.Mesh.CreatePlane("preview1", 1, e._scene);
          (((h = e.makeDynamicStandardMaterial("previewMat1")).diffuseTexture =
            new BABYLON.Texture(null, e._scene)),
            (i.material = h),
            (i.parent = r),
            (i.rotation.y = Math.PI),
            (i.position = new BABYLON.Vector3(0, 0, 1)));
          var o = BABYLON.Mesh.CreatePlane("preview2", 1, e._scene);
          (((h = e.makeDynamicStandardMaterial("previewMat2")).diffuseTexture =
            new BABYLON.Texture(null, e._scene)),
            (o.material = h),
            (o.parent = r),
            (o.rotation.y = 0.5 * Math.PI),
            (o.position = new BABYLON.Vector3(-0.5, 0, 0.5)));
          var a = BABYLON.Mesh.CreatePlane("preview3", 1, e._scene);
          (((h = e.makeDynamicStandardMaterial("previewMat3")).diffuseTexture =
            new BABYLON.Texture(null, e._scene)),
            (a.material = h),
            (a.parent = r),
            (a.rotation.y = -0.5 * Math.PI),
            (a.position = new BABYLON.Vector3(0.5, 0, 0.5)));
          var s = BABYLON.Mesh.CreatePlane("preview4", 1, e._scene);
          (((h = e.makeDynamicStandardMaterial("previewMat4")).diffuseTexture =
            new BABYLON.Texture(null, e._scene)),
            (s.material = h),
            (s.parent = r),
            (s.rotation.x = -0.5 * Math.PI),
            (s.rotation.y = Math.PI),
            (s.position = new BABYLON.Vector3(0, -0.5, 0.5)));
          var u = BABYLON.Mesh.CreatePlane("preview5", 1, e._scene);
          (((h = e.makeDynamicStandardMaterial("previewMat5")).diffuseTexture =
            new BABYLON.Texture(null, e._scene)),
            (u.material = h),
            (u.parent = r),
            (u.rotation.x = 0.5 * Math.PI),
            (u.position = new BABYLON.Vector3(0, 0.5, 0.5)));
          var h,
            d = 0.5,
            f = BABYLON.Mesh.CreateLines(
              "previewLines",
              [
                new l(d, d, d),
                new l(d, -d, d),
                new l(-d, -d, d),
                new l(-d, d, d),
                new l(d, d, d),
                new l(d, d, -d),
                new l(d, -d, -d),
                new l(-d, -d, -d),
                new l(-d, d, -d),
                new l(d, d, -d),
                new l(d, d, d),
                new l(d, -d, d),
                new l(d, -d, -d),
                new l(d, d, -d),
                new l(d, d, d),
                new l(-d, d, d),
                new l(-d, -d, d),
                new l(-d, -d, -d),
                new l(-d, d, -d),
                new l(-d, d, d),
              ],
              e._scene,
            );
          ((f.color = new c(0, 0, 0)),
            (f.position = new BABYLON.Vector3(0, 0, 0.5)),
            (f.parent = r),
            ((t = t()).parent = r),
            ((h = e.makeStandardMaterial("crossMat")).diffuseTexture =
              new BABYLON.Texture(null, e._scene)),
            (t.material = h),
            (n = e._previewMesh = r),
            e.addDynamicMesh(n),
            e.addDynamicMesh(i),
            e.addDynamicMesh(o),
            e.addDynamicMesh(a),
            e.addDynamicMesh(s),
            e.addDynamicMesh(u),
            e.addDynamicMesh(f),
            e.addDynamicMesh(t));
        }
        return n;
      })(this)),
      e && r)
    ) {
      for (
        this._currentZoom,
          i.distance(this.noa.getPlayerEyePosition(), t),
          a = 0,
          s = f,
          u = 0;
        u < 3;
        ++u
      )
        s[u] = t[u] + 0.5 + (1 + a) * n[u];
      (o.position.copyFromFloats(s[0], s[1], s[2] - 0.5), o.setEnabled(!0));
    } else o.setEnabled(!1);
  }));
var f = i.create();
h.prototype.getCameraVector = function () {
  return l.TransformCoordinates(
    BABYLON.Axis.Z,
    this._rotationHolder.getWorldMatrix(),
  );
};
var p = l.Zero();
((h.prototype.getCameraPosition = function () {
  return l.TransformCoordinates(p, this._camera.getWorldMatrix());
}),
  (h.prototype.getCameraRotation = function () {
    var e = this._rotationHolder.rotation;
    return [e.x, e.y];
  }),
  (h.prototype.setCameraRotation = function (e, t) {
    var n = this._rotationHolder.rotation;
    ((n.x = Math.max(-this._maxCamAngle, Math.min(this._maxCamAngle, e))),
      (n.y = t));
  }),
  (h.prototype.addDynamicMesh = function (e) {
    if (!((t = this._octree.dynamicContent.indexOf(e)) >= 0)) {
      this._octree.dynamicContent.push(e);
      for (var t = 0; t < e.getChildren().length; t++)
        (this._octree.dynamicContent.push(e.getChildren()[t]),
          (e.getChildren()[t].useOctreeForCollisions = !0));
      var n = s.bind(null, this._octree.dynamicContent, e);
      if (e.onDisposeObservable) e.onDisposeObservable.add(n);
      else {
        var r = e.onDispose || function () {};
        e.onDispose = function () {
          (r(), n());
        };
      }
    }
  }),
  (h.prototype.removeDynamicMesh = function (e) {
    s(this._octree.dynamicContent, e);
  }),
  (h.prototype.makeMeshInstance = function (e, t) {
    var n = e.createInstance(e.name + " instance" || 0);
    return (
      e.billboardMode && (n.billboardMode = e.billboardMode),
      t || this.addDynamicMesh(n),
      (e.getLOD = n.getLOD =
        function () {
          return e;
        }),
      (n._currentLOD = e),
      t &&
        (n.isInFrustum = function () {
          return !0;
        }),
      n
    );
  }),
  (h.prototype.makeStandardMaterial = function (e) {
    return new BABYLON.StandardMaterial(e, this._scene);
  }),
  (h.prototype.makeDynamicStandardMaterial = function (e) {
    return new BABYLON.StandardMaterial(e, this._scene);
  }),
  (h.prototype.prepareChunkForRendering = function (e) {
    var t = e.size,
      n = new l(e.x, e.y, e.z),
      r = new l(e.x + t, e.y + t, e.z + t);
    ((e.octreeBlock = new BABYLON.OctreeBlock(n, r)),
      this._octree.blocks.push(e.octreeBlock),
      (window.chunk = e));
  }),
  (h.prototype.disposeChunkForRendering = function (e) {
    (this.removeTerrainMesh(e),
      s(this._octree.blocks, e.octreeBlock),
      (e.octreeBlock.entries.length = 0),
      (e.octreeBlock = null));
  }),
  (h.prototype.addTerrainMesh = function (e, t) {
    ((this._meshedChunks[e.id] = t),
      this._numMeshedChunks++,
      t.getIndices().length && e.octreeBlock.entries.push(t),
      t.getChildren().map(function (t) {
        e.octreeBlock.entries.push(t);
      }));
  }),
  (h.prototype.removeTerrainMesh = function (e) {
    var t = this._meshedChunks[e.id];
    t &&
      (s(e.octreeBlock.entries, t),
      t.getChildren().map(function (t) {
        s(e.octreeBlock.entries, t);
      }),
      t.dispose(),
      delete this._meshedChunks[e.id],
      this._numMeshedChunks--);
  }));
var m,
  _,
  g = i.create(),
  v = i.create(),
  y = function (e, t) {
    var n = e._highlightMesh;
    n && (n.material.alpha = 0.05 + 0.25 * Math.abs(Math.sin(0.005 * t)));
  },
  b = function (e, t) {
    var n = e._previewMesh;
    if (n) {
      var r = 0.35 + 0.35 * Math.abs(Math.sin(0.003 * t));
      ((n.material.alpha = r),
        (n._children[0].material.alpha = r),
        (n._children[1].material.alpha = r),
        (n._children[2].material.alpha = r),
        (n._children[3].material.alpha = r),
        (n._children[4].material.alpha = r),
        (n._children[6].material.alpha = r));
    }
  };
((h.prototype.debug_SceneCheck = function () {
  var e = this._scene.meshes,
    t = this._octree.dynamicContent,
    n = [],
    r = this._scene.materials,
    i = [];
  (r.forEach(function (e) {
    e.subMaterials
      ? e.subMaterials.forEach(function (e) {
          return i.push(e);
        })
      : i.push(e);
  }),
    this._octree.blocks.forEach(function (e) {
      for (var t in e.entries) n.push(e.entries[t]);
    }),
    e.forEach(function (e) {
      (e._isDisposed && a(e, "disposed mesh in scene"),
        0 !== e.getIndices().length &&
          (s(e, t, n) && a(e, "non-empty mesh missing from octree"),
          e.material
            ? (e.material.subMaterials || [e.material]).forEach(function (e) {
                s(e, r) && a(e, "mesh material not in scene");
              })
            : a(e, "non-empty scene mesh with no material")));
    }));
  var o = [];
  function a(e, t) {
    console.warn(e.name + " --- " + t);
  }
  function s(e, t, n) {
    return !(!e || (n ? t.includes(e) || n.includes(e) : t.includes(e)));
  }
  return (
    i.forEach(function (t) {
      var n = !1;
      (e.forEach(function (e) {
        (e.material === t && (n = !0),
          e.material &&
            e.material.subMaterials &&
            e.material.subMaterials.includes(t) &&
            (n = !0));
      }),
        n || o.push(t.name));
    }),
    o.length && console.warn("Materials unused by any mesh: ", o.join(", ")),
    t.forEach(function (t) {
      s(t, e) && a(t, "octree/dynamic mesh not in scene");
    }),
    n.forEach(function (t) {
      s(t, e) && a(t, "octree block mesh not in scene");
    }),
    "done."
  );
}),
  (h.prototype.debug_MeshCount = function () {
    var e = {};
    for (var t in (this._scene.meshes.forEach(function (t) {
      var n = t.name || "";
      ((n = (n = (n = (n = n.replace(/-\d+.*/, "#")).replace(
        /\d+.*/,
        "#",
      )).replace(/(rotHolder|camHolder|camScreen)/, "rendering use")).replace(
        /atlas sprite .*/,
        "atlas sprites",
      )),
        (e[n] = e[n] || 0),
        e[n]++);
    }),
    e))
      console.log("   " + (e[t] + "       ").substr(0, 7) + t);
  }));
var S = function () {};
