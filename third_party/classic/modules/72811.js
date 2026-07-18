e.exports = function (e, t) {
  t = t || 1;
  var n = 2 * Math.random() * Math.PI,
    r = 2 * Math.random() - 1,
    i = Math.sqrt(1 - r * r) * t;
  return (
    (e[0] = Math.cos(n) * i),
    (e[1] = Math.sin(n) * i),
    (e[2] = r * t),
    e
  );
};
