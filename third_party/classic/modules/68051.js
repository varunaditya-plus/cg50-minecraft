e.exports = function (e, t) {
  var n = t[0] - e[0],
    r = t[1] - e[1],
    i = t[2] - e[2];
  return Math.sqrt(n * n + r * r + i * i);
};
