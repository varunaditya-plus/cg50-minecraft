"use strict";
e.exports = function (e) {
  var t = e.rendering.getScene(),
    n = 0.25 * Math.PI,
    r = BABYLON.Mesh.CreatePlane("plane1", 1, t),
    i = BABYLON.Mesh.CreatePlane("plane2", 1, t);
  ((r.rotation.y = n), (i.rotation.y = Math.PI + n));
  var o = BABYLON.Mesh.CreatePlane("plane3", 1, t),
    a = BABYLON.Mesh.CreatePlane("plane4", 1, t);
  return (
    (o.rotation.y = 0.5 * -Math.PI + n),
    (a.rotation.y = 0.5 * Math.PI + n),
    (r.position = new BABYLON.Vector3(0, 0.5, 0)),
    (i.position = new BABYLON.Vector3(0, 0.5, 0)),
    (o.position = new BABYLON.Vector3(0, 0.5, 0)),
    (a.position = new BABYLON.Vector3(0, 0.5, 0)),
    BABYLON.Mesh.MergeMeshes([r, i, o, a])
  );
};
