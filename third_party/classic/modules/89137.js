e.exports = function (e, t, n, r) {
  var i = n[0],
    o = n[1],
    a = t[0] - i,
    s = t[1] - o,
    l = Math.sin(r),
    c = Math.cos(r);
  return (
    (e[0] = i + a * c - s * l),
    (e[1] = o + a * l + s * c),
    (e[2] = t[2]),
    e
  );
};
