e.exports = function (e, t) {
  var n = t[0],
    r = t[1],
    i = t[2],
    o = n * n + r * r + i * i;
  return (
    o > 0 &&
      ((o = 1 / Math.sqrt(o)),
      (e[0] = t[0] * o),
      (e[1] = t[1] * o),
      (e[2] = t[2] * o)),
    e
  );
};
