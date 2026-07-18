e.exports = function (e, t, n) {
  var r = t[0],
    i = t[1],
    o = t[2],
    a = n[0],
    s = n[1],
    l = n[2];
  return (
    (e[0] = i * l - o * s),
    (e[1] = o * a - r * l),
    (e[2] = r * s - i * a),
    e
  );
};
