e.exports = function (e, t, n, r) {
  var i = t[0],
    o = t[1],
    a = t[2];
  return (
    (e[0] = i + r * (n[0] - i)),
    (e[1] = o + r * (n[1] - o)),
    (e[2] = a + r * (n[2] - a)),
    e
  );
};
