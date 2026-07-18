e.exports = function (e, t, n, r) {
  var i = n[0],
    o = n[2],
    a = t[0] - i,
    s = t[2] - o,
    l = Math.sin(r),
    c = Math.cos(r);
  return (
    (e[0] = i + s * l + a * c),
    (e[1] = t[1]),
    (e[2] = o + s * c - a * l),
    e
  );
};
