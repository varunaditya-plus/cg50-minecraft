e.exports = function (e, t, n, i, o, a) {
  var s, l;
  for (
    t || (t = 3),
      n || (n = 0),
      l = i ? Math.min(i * t + n, e.length) : e.length,
      s = n;
    s < l;
    s += t
  )
    ((r[0] = e[s]),
      (r[1] = e[s + 1]),
      (r[2] = e[s + 2]),
      o(r, r, a),
      (e[s] = r[0]),
      (e[s + 1] = r[1]),
      (e[s + 2] = r[2]));
  return e;
};
var r = n(51216)();
