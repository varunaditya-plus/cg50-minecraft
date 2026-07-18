"use strict";
var t = Object.prototype.hasOwnProperty,
  n = Object.prototype.toString,
  r = Object.defineProperty,
  i = Object.getOwnPropertyDescriptor,
  o = function (e) {
    return "function" == typeof Array.isArray
      ? Array.isArray(e)
      : "[object Array]" === n.call(e);
  },
  a = function (e) {
    if (!e || "[object Object]" !== n.call(e)) return !1;
    var r,
      i = t.call(e, "constructor"),
      o =
        e.constructor &&
        e.constructor.prototype &&
        t.call(e.constructor.prototype, "isPrototypeOf");
    if (e.constructor && !i && !o) return !1;
    for (r in e);
    return void 0 === r || t.call(e, r);
  },
  s = function (e, t) {
    r && "__proto__" === t.name
      ? r(e, t.name, {
          enumerable: !0,
          configurable: !0,
          value: t.newValue,
          writable: !0,
        })
      : (e[t.name] = t.newValue);
  },
  l = function (e, n) {
    if ("__proto__" === n) {
      if (!t.call(e, n)) return;
      if (i) return i(e, n).value;
    }
    return e[n];
  };
e.exports = function e() {
  var t,
    n,
    r,
    i,
    c,
    u,
    h = arguments[0],
    d = 1,
    f = arguments.length,
    p = !1;
  for (
    "boolean" == typeof h && ((p = h), (h = arguments[1] || {}), (d = 2)),
      (null == h || ("object" != typeof h && "function" != typeof h)) &&
        (h = {});
    d < f;
    ++d
  )
    if (null != (t = arguments[d]))
      for (n in t)
        ((r = l(h, n)),
          h !== (i = l(t, n)) &&
            (p && i && (a(i) || (c = o(i)))
              ? (c
                  ? ((c = !1), (u = r && o(r) ? r : []))
                  : (u = r && a(r) ? r : {}),
                s(h, { name: n, newValue: e(p, u, i) }))
              : void 0 !== i && s(h, { name: n, newValue: i })));
  return h;
};
