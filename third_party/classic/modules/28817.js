e.exports = function (e, t) {
  var n = e[0],
    i = e[1],
    o = e[2],
    a = t[0],
    s = t[1],
    l = t[2];
  return (
    Math.abs(n - a) <= r * Math.max(1, Math.abs(n), Math.abs(a)) &&
    Math.abs(i - s) <= r * Math.max(1, Math.abs(i), Math.abs(s)) &&
    Math.abs(o - l) <= r * Math.max(1, Math.abs(o), Math.abs(l))
  );
};
var r = n(72864);
