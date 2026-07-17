"use strict";
e.exports = function (e) {
  var t = e.rendering.getScene(),
    n = BABYLON.Mesh.CreatePlane("plane1", 1, t);
  return (
    (n.rotation.x = 0.5 * -Math.PI),
    (n.position = new BABYLON.Vector3(0, 1 - 0.07, 0)),
    BABYLON.Mesh.MergeMeshes([n])
  );
};
