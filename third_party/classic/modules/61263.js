e.exports = function (e, t, n, r) {
  var i = n[1],
    o = n[2],
    a = t[1] - i,
    s = t[2] - o,
    l = Math.sin(r),
    c = Math.cos(r);
  return (
    (e[0] = t[0]),
    (e[1] = i + a * c - s * l),
    (e[2] = o + a * l + s * c),
    e
  );
};
