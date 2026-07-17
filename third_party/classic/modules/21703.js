var t,
  n,
  r,
  i,
  o = Math.sqrt(5),
  a = Math.sqrt(7),
  s = Math.floor;
function l(e) {
  return e - s(e);
}
e.exports = function () {
  for (t = o, n = a, r = 0; r < arguments.length; ++r)
    ((t = l(t * ((i = arguments[r]) + a))), (n *= i + o));
  return (t = l(t * n));
};
