"use strict";
e.exports = function (e, t, n, r, i, o) {
  var a = +t[0],
    s = +t[1],
    l = +t[2],
    c = +n[0],
    u = +n[1],
    h = +n[2],
    d = Math.sqrt(c * c + u * u + h * h);
  if (0 === d) throw new Error("Can't raycast along a zero vector");
  return (function (e, t, n, r, i, o, a, s, l, c) {
    for (
      var u = 0,
        h = Math.floor,
        d = 0 | h(t),
        f = 0 | h(n),
        p = 0 | h(r),
        m = i > 0 ? 1 : -1,
        _ = o > 0 ? 1 : -1,
        g = a > 0 ? 1 : -1,
        v = Math.abs(1 / i),
        y = Math.abs(1 / o),
        b = Math.abs(1 / a),
        S = v < 1 / 0 ? v * (m > 0 ? d + 1 - t : t - d) : 1 / 0,
        T = y < 1 / 0 ? y * (_ > 0 ? f + 1 - n : n - f) : 1 / 0,
        E = b < 1 / 0 ? b * (g > 0 ? p + 1 - r : r - p) : 1 / 0,
        x = -1;
      u <= s;
    ) {
      var P = e(d, f, p);
      if (P)
        return (
          l && ((l[0] = t + u * i), (l[1] = n + u * o), (l[2] = r + u * a)),
          c &&
            ((c[0] = c[1] = c[2] = 0),
            0 === x && (c[0] = -m),
            1 === x && (c[1] = -_),
            2 === x && (c[2] = -g)),
          P
        );
      S < T
        ? S < E
          ? ((d += m), (u = S), (S += v), (x = 0))
          : ((p += g), (u = E), (E += b), (x = 2))
        : T < E
          ? ((f += _), (u = T), (T += y), (x = 1))
          : ((p += g), (u = E), (E += b), (x = 2));
    }
    return (
      l && ((l[0] = t + u * i), (l[1] = n + u * o), (l[2] = r + u * a)),
      c && (c[0] = c[1] = c[2] = 0),
      0
    );
  })(
    e,
    a,
    s,
    l,
    (c /= d),
    (u /= d),
    (h /= d),
    (r = void 0 === r ? 64 : +r),
    i,
    o,
  );
};
