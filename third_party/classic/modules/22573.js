e.exports = function (e, t) {
  var n = r(e[0], e[1], e[2]),
    a = r(t[0], t[1], t[2]);
  (i(n, n), i(a, a));
  var s = o(n, a);
  return s > 1 ? 0 : Math.acos(s);
};
var r = n(63198),
  i = n(41785),
  o = n(70409);
