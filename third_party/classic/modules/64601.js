"use strict";
var t = [],
  n = [],
  r = [],
  i = [],
  o = [],
  a = [],
  s = [],
  l = [],
  c = [],
  u = [],
  h = [],
  d = [];
e.exports = function (e, f, p, m, _, g) {
  for (var v = s, y = c, b = u, S = d, T = 0; T < 3; T++)
    ((v[T] = +p[T]), (b[T] = +f.max[T]), (y[T] = +f.base[T]));
  g || (g = 1e-10);
  var E = (function (e, s, c, u, d, f) {
    var p = t,
      m = n,
      _ = r,
      g = i,
      v = o,
      y = a,
      b = l,
      S = Math.floor,
      T = 0,
      E = 0,
      x = 0,
      P = 0,
      A = 0;
    if ((C(), 0 === x)) return 0;
    for (P = O(); E <= x;) {
      if (R(P) && I()) return T;
      P = O();
    }
    for (T += x, A = 0; A < 3; A++) ((u[A] += c[A]), (d[A] += c[A]));
    return T;
    function C() {
      if (
        ((E = 0),
        0 !== (x = Math.sqrt(c[0] * c[0] + c[1] * c[1] + c[2] * c[2])))
      )
        for (var e = 0; e < 3; e++) {
          var t = c[e] >= 0;
          g[e] = t ? 1 : -1;
          var n = t ? d[e] : u[e];
          ((p[e] = t ? u[e] : d[e]),
            (m[e] = M(n, g[e])),
            (_[e] = D(p[e], g[e])),
            (b[e] = c[e] / x),
            (v[e] = Math.abs(1 / b[e])));
          var r = t ? m[e] + 1 - n : n - m[e];
          y[e] = v[e] < 1 / 0 ? v[e] * r : 1 / 0;
        }
    }
    function R(t) {
      for (
        var n = g[0],
          r = 0 === t ? m[0] : _[0],
          i = m[0] + n,
          o = g[1],
          a = 1 === t ? m[1] : _[1],
          s = m[1] + o,
          l = g[2],
          c = 2 === t ? m[2] : _[2],
          u = m[2] + l,
          h = r;
        h != i;
        h += n
      )
        for (var d = a; d != s; d += o)
          for (var f = c; f != u; f += l) if (e(h, d, f)) return !0;
      return !1;
    }
    function I() {
      T += E;
      var e = g[P],
        t = E / x,
        n = h;
      for (A = 0; A < 3; A++) {
        var r = c[A] * t;
        ((u[A] += r), (d[A] += r), (n[A] = c[A] - r));
      }
      if (
        (e > 0 ? (d[P] = Math.round(d[P])) : (u[P] = Math.round(u[P])),
        s(T, P, e, n))
      )
        return !0;
      for (A = 0; A < 3; A++) c[A] = n[A];
      return (C(), 0 === x);
    }
    function O() {
      var e = y[0] < y[1] ? (y[0] < y[2] ? 0 : 2) : y[1] < y[2] ? 1 : 2,
        t = y[e] - E;
      for (E = y[e], m[e] += g[e], y[e] += v[e], A = 0; A < 3; A++)
        ((p[A] += t * b[A]), (_[A] = D(p[A], g[A])));
      return e;
    }
    function M(e, t) {
      return S(e - t * f);
    }
    function D(e, t) {
      return S(e + t * f);
    }
  })(e, m, v, y, b, g);
  if (!_) {
    for (T = 0; T < 3; T++)
      S[T] = p[T] > 0 ? b[T] - f.max[T] : y[T] - f.base[T];
    f.translate(S);
  }
  return E;
};
