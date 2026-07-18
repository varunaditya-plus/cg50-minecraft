e.exports = function (e, t, n) {
  var r = t[0],
    i = t[1],
    o = t[2],
    a = n[0],
    s = n[1],
    l = n[2],
    c = n[3],
    u = s * o - l * i,
    h = l * r - a * o,
    d = a * i - s * r;
  return (
    (u *= 2),
    (h *= 2),
    (d *= 2),
    (e[0] = r + c * u + s * d - l * h),
    (e[1] = i + c * h + l * u - a * d),
    (e[2] = o + c * d + a * h - s * u),
    e
  );
};
