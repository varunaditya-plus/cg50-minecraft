e.exports = function (e, t, n) {
  var r = t[0],
    i = t[1],
    o = t[2];
  return (
    (e[0] = r * n[0] + i * n[3] + o * n[6]),
    (e[1] = r * n[1] + i * n[4] + o * n[7]),
    (e[2] = r * n[2] + i * n[5] + o * n[8]),
    e
  );
};
