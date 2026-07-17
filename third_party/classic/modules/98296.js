"use strict";
function r(e) {
  ((this.id = 0 | e),
    (this.positions = []),
    (this.indices = []),
    (this.normals = []),
    (this.colors = []),
    (this.uvs = []));
}
function i() {
  var e;
  function t(e, t) {
    for (
      var n, r = [], i = [], o = [], a = Object.keys(e), s = null, l = 0;
      l < a.length;
      ++l
    ) {
      var c = e[a[l]];
      if (t(c))
        if (
          (r.push(c.positions.length),
          i.push(c.indices.length),
          o.push(c.id),
          s)
        ) {
          var u = s.positions.length / 3;
          ((s.positions = s.positions.concat(c.positions)),
            (s.normals = s.normals.concat(c.normals)),
            (s.colors = s.colors.concat(c.colors)),
            (s.uvs = s.uvs.concat(c.uvs)));
          for (var h = 0, d = c.indices.length; h < d; ++h)
            s.indices.push(c.indices[h] + u);
          (c.dispose(), delete e[a[l]]);
        } else ((s = c), (n = a[l]));
    }
    return { mergedID: n, vertices: r, indices: i, matIDs: o };
  }
  function r(t, n, r, i, o) {
    var a = e.rendering.getScene(),
      s = new BABYLON.Mesh(n, a),
      l = new BABYLON.VertexData();
    if (
      ((l.positions = t.positions),
      (l.indices = t.indices),
      (l.normals = t.normals),
      (l.colors = t.colors),
      (l.uvs = t.uvs),
      l.applyToMesh(s),
      t.dispose(),
      1 === r.length)
    )
      s.material = r[0];
    else {
      var c = new BABYLON.MultiMaterial("multimat " + n, a);
      ((s.subMeshes = []), l.positions.length, l.indices.length);
      for (var u = 0, h = 0, d = 0; d < r.length; d++) {
        c.subMaterials[d] = r[d];
        var f = new BABYLON.SubMesh(d, u, i[d], h, o[d], s);
        ((s.subMeshes[d] = f), (u += i[d]), (h += o[d]));
      }
      s.material = c;
    }
    return s;
  }
  ((this.build = function (n, i, a) {
    ((e = n.noa),
      t(i, function (t) {
        if (a) return !0;
        var n = e.registry.getMaterialTexture(t.id),
          r = e.registry.getMaterialData(t.id).alpha;
        return !(n || r < 1) && void 0;
      }));
    var s = t(i, function () {
        return !0;
      }),
      l = r(
        i[s.mergedID],
        "chunk_" + n.id,
        s.matIDs.map(function (e) {
          return o(e, a);
        }),
        s.vertices,
        s.indices,
      ),
      c = n.i * n.size,
      u = n.j * n.size,
      h = n.k * n.size;
    return (
      (l.position.x = c),
      (l.position.y = u),
      (l.position.z = h),
      l.freezeWorldMatrix(),
      l.freezeNormals(),
      l
    );
  }),
    (this.buildWithoutMultimats = function (n, i, a) {
      ((e = n.noa),
        t(i, function (t) {
          if (a) return !0;
          var n = e.registry.getMaterialTexture(t.id),
            r = e.registry.getMaterialData(t.id).alpha;
          return !(n || r < 1) && void 0;
        }));
      for (var s = null, l = Object.keys(i), c = 0; c < l.length; ++c) {
        var u = i[l[c]],
          h = u.id,
          d = o(h, a),
          f = r(u, "chunk_inner_" + n.id + " " + h, [d]);
        if (s) f.parent = s;
        else {
          s = f;
          var p = n.i * n.size,
            m = n.j * n.size,
            _ = n.k * n.size;
          ((s.position.x = p), (s.position.y = m), (s.position.z = _));
        }
        (f.freezeWorldMatrix(), f.freezeNormals());
      }
      return s;
    }));
  var i = {};
  function o(t, r) {
    if (r) return e.rendering.flatMaterial;
    var o = "terrain mat " + t;
    return (
      i[o] ||
        (i[o] = (function (t) {
          var r = e.registry.getMaterialTexture(t),
            i = e.registry.getMaterialData(t),
            o = i.alpha;
          if (!r && 1 == o) return e.rendering.flatMaterial;
          var a = e.rendering.flatMaterial.clone("terrain" + t);
          if (r) {
            var s = e.rendering.getScene(),
              l = new BABYLON.Texture(
                r,
                s,
                !0,
                !1,
                BABYLON.Texture.NEAREST_SAMPLINGMODE,
              );
            if ((12 == t && (l = n(8760)(e).texture), i.textureAlpha)) {
              if (((l.hasAlpha = !0), (a.diffuseTexture = l), 36 == t)) {
                if (e.waterTexture) a.diffuseTexture = e.waterTexture;
                else {
                  var c = n(23255)(e);
                  a.diffuseTexture = c.texture;
                }
                a.useAlphaFromDiffuseTexture = !0;
              }
              (34 != t && 36 != t) || (a.backFaceCulling = !1);
            } else
              ((a.ambientTexture = l), 12 == t && (a.backFaceCulling = !1));
          }
          return (i.alpha < 1 && (a.alpha = i.alpha), a);
        })(t)),
      i[o]
    );
  }
}
function o() {
  var e = n(96834),
    t = e.ID_MASK,
    i = (e.VAR_MASK, e.SOLID_BIT),
    o = e.OPAQUE_BIT,
    s = e.OBJECT_BIT,
    l = new Int16Array(256),
    c = new Uint16Array(256);
  function u(e, n, r, i, o, a) {
    for (
      var s = r.shape[1],
        u = l,
        h = c,
        f = 0,
        p = r.data,
        m = r.index(e - 1, 0, 0),
        _ = r.stride[0],
        g = r.stride[1],
        v = r.stride[2],
        y = 0;
      y < s;
      ++y
    ) {
      var b = m;
      m += v;
      for (var S = 0; S < s; S++, f++, b += g) {
        var T = p[b],
          E = p[b + _],
          x = d(T, E, S, y);
        if (x) {
          if (
            ((u[f] = x > 0 ? i(T & t, 2 * n) : -i(E & t, 2 * n + 1)), 0 != u[f])
          ) {
            var P = a[0] + e + x,
              A = a[1] + S,
              C = a[2] + y;
            (1 == n && ((P = a[0] + y), (A = a[1] + e + x), (C = a[2] + S)),
              2 == n && ((P = a[0] + S), (A = a[1] + y), (C = a[2] + e + x)),
              0 == n && x > 0 && (P -= 1),
              1 == n && x > 0 && (A -= 1),
              2 == n && x > 0 && (C -= 1),
              noa.getBrightness(P, A, C) < 1 && (u[f] += 512 * x));
          }
          if (o) {
            var R = x > 0 ? e : e - 1,
              I = x > 0 ? e - 1 : e;
            h[f] = o(r, R, I, S, y);
          }
        }
      }
    }
  }
  this.mesh = function (e, t, n, r, i, o, s) {
    var h,
      d = [],
      p = r && o === i[0];
    r && (h = p ? v : y);
    for (var m = 0; m < 3; ++m) {
      var _ = (m + 1) % 3,
        g = (m + 2) % 3,
        b = e
          .transpose(m, _, g)
          .lo(1, 1, 1)
          .hi(e.shape[m] - 2, e.shape[_] - 2, e.shape[g] - 2),
        S = b.shape[0] - 1,
        T = b.shape[1],
        E = b.shape[2];
      l.length < T * E &&
        ((l = new Int16Array(T * E)), (c = new Uint16Array(T * E)));
      for (var x = 0; x <= S; ++x)
        (u(x, m, b, t, h, s),
          a("built masks"),
          f(x, m, _, g, T, E, r, d, n, i, o),
          a("build submeshes"));
    }
    return d;
  };
  var h = n(21703);
  function d(e, t, n, r) {
    var i = e & o,
      a = t & o;
    if (i && a) return 0;
    if (i) return 1;
    if (a) return -1;
    if (7 === e && 32809 === t) return 0;
    if (7 === t && 32809 === e) return 0;
    if (0 === t || t & s) return 1;
    if (0 === e || e & s) return -1;
    if (40 === t || t & s) return 1;
    if (40 === e || e & s) return -1;
    var l = 0;
    return (
      8206 == e && (l = 1),
      8206 == t && (l = -1),
      7 == e && (l = 1),
      7 == t && (l = -1),
      7 == e && 7 == t && (l = 0),
      7 == e && 8206 == t && (l = -1),
      8206 == e && 7 == t && (l = 1),
      7 == e && 8215 == t && (l = -1),
      8215 == e && 7 == t && (l = 1),
      17 == e && 8206 == t && (l = 1),
      8206 == e && 17 == t && (l = -1),
      17 == e && 8215 == t && (l = 1),
      8215 == e && 17 == t && (l = -1),
      8206 == e && 8206 == t && ((l = 1), h(n, r) > 0.5 && (l = -1)),
      l
    );
  }
  function f(e, t, n, i, o, a, s, u, h, d, f, v) {
    for (
      var y = 0, b = l, S = c, T = s ? p : m, E = s ? g : _, x = 0;
      x < a;
      ++x
    )
      for (var P = 1, A = 1, C = 0; C < o; C += P, y += P) {
        var R = b[y];
        if (R) {
          var I = S[y];
          for (P = 1; P < o - C && T(y + P, b, R, S, I); ++P);
          e: for (A = 1; A < a - x; ++A)
            for (var O = 0; O < P; ++O)
              if (!T(y + O + A * o, b, R, S, I)) break e;
          var M = b[y];
          (M >= 512 && (M -= 512), M <= -512 && (M += 512));
          var D = Math.abs(M);
          u[D] || (u[D] = new r(D));
          var N = u[D],
            L = N.colors,
            F = h(D);
          ((F[0] = 1),
            (F[1] = 1),
            (F[2] = 1),
            M != R && ((F[0] = 0.6), (F[1] = 0.6), (F[2] = 0.6)));
          var w = E(L, F, I, d, f),
            B = 0;
          (36 == D || 12 == D) && 1 == t && M > 0 && (B = 0.07);
          var V = [0, 0, 0];
          ((V[t] = e), (V[n] = C), (V[i] = x));
          var U = [0, 0, 0];
          U[n] = P;
          var G = [0, 0, 0];
          G[i] = A;
          var k = N.positions;
          k.push(
            V[0],
            V[1] - B,
            V[2],
            V[0] + U[0],
            V[1] + U[1] - B,
            V[2] + U[2],
            V[0] + U[0] + G[0],
            V[1] + U[1] + G[1] - B,
            V[2] + U[2] + G[2],
            V[0] + G[0],
            V[1] + G[1] - B,
            V[2] + G[2],
          );
          var z = R > 0 ? 1 : -1;
          2 === t
            ? N.uvs.push(0, A, -z * P, A, -z * P, 0, 0, 0)
            : N.uvs.push(0, P, 0, 0, z * A, 0, z * A, P);
          var W = k.length / 3 - 4;
          R < 0
            ? w
              ? N.indices.push(W, W + 1, W + 2, W, W + 2, W + 3)
              : N.indices.push(W + 1, W + 2, W + 3, W, W + 1, W + 3)
            : w
              ? N.indices.push(W, W + 2, W + 1, W, W + 3, W + 2)
              : N.indices.push(W + 3, W + 1, W, W + 3, W + 2, W + 1);
          var H = 0 === t ? z : 0,
            Y = 1 === t ? z : 0,
            X = 2 === t ? z : 0;
          N.normals.push(H, Y, X, H, Y, X, H, Y, X, H, Y, X);
          for (var j = 0; j < A; ++j)
            for (var q = 0; q < P; ++q) b[y + q + j * o] = 0;
        } else P = 1;
      }
  }
  function p(e, t, n, r, i) {
    return n === t[e] && i === r[e];
  }
  function m(e, t, n, r, i) {
    return n === t[e];
  }
  function _(e, t, n, r, i) {
    return (
      e.push(t[0], t[1], t[2], 1),
      e.push(t[0], t[1], t[2], 1),
      e.push(t[0], t[1], t[2], 1),
      e.push(t[0], t[1], t[2], 1),
      !0
    );
  }
  function g(e, t, n, r, i) {
    var o = b(n, 0, 0),
      a = b(n, 1, 0),
      s = b(n, 1, 1),
      l = b(n, 0, 1);
    return (
      S(e, t, o, r, i),
      S(e, t, a, r, i),
      S(e, t, s, r, i),
      S(e, t, l, r, i),
      o === s ? l !== a || 2 == l : l !== a && o + s > l + a
    );
  }
  function v(e, t, n, r, o) {
    var a = 1,
      s = 1,
      l = 1,
      c = 1,
      u = i,
      h = u & e.get(t, r, o);
    return (
      e.get(t, r + 1, o) & u && (++l, ++c),
      e.get(t, r - 1, o) & u && (++a, ++s),
      e.get(t, r, o + 1) & u && (++s, ++c),
      e.get(t, r, o - 1) & u && (++a, ++l),
      h
        ? ((c = 3 == c || e.get(t, r + 1, o + 1) & u ? 3 : 2),
          (s = 3 == s || e.get(t, r - 1, o + 1) & u ? 3 : 2),
          (l = 3 == l || e.get(t, r + 1, o - 1) & u ? 3 : 2),
          (a = 3 == a || e.get(t, r - 1, o - 1) & u ? 3 : 2))
        : (1 === c && e.get(t, r + 1, o + 1) & u && (c = 2),
          1 === s && e.get(t, r - 1, o + 1) & u && (s = 2),
          1 === l && e.get(t, r + 1, o - 1) & u && (l = 2),
          1 === a && e.get(t, r - 1, o - 1) & u && (a = 2)),
      (c << 6) | (l << 4) | (s << 2) | a
    );
  }
  function y(e, t, n, r, o) {
    var a = 1,
      s = 1,
      l = 1,
      c = 1,
      u = i,
      h = u & e.get(t, r, o);
    return (
      e.get(t, r + 1, o) & u && (++l, ++c),
      e.get(t, r - 1, o) & u && (++a, ++s),
      e.get(t, r, o + 1) & u && (++s, ++c),
      e.get(t, r, o - 1) & u && (++a, ++l),
      h
        ? ((c = 3 == c || e.get(t, r + 1, o + 1) & u ? 3 : 2),
          (s = 3 == s || e.get(t, r - 1, o + 1) & u ? 3 : 2),
          (l = 3 == l || e.get(t, r + 1, o - 1) & u ? 3 : 2),
          (a = 3 == a || e.get(t, r - 1, o - 1) & u ? 3 : 2))
        : (1 === c &&
            (e.get(t, r + 1, o + 1) & u
              ? (c = 2)
              : (e.get(n, r, o + 1) & u &&
                  e.get(n, r + 1, o) & u &&
                  e.get(n, r + 1, o + 1) & u) ||
                (c = 0)),
          1 === l &&
            (e.get(t, r + 1, o - 1) & u
              ? (l = 2)
              : (e.get(n, r, o - 1) & u &&
                  e.get(n, r + 1, o) & u &&
                  e.get(n, r + 1, o - 1) & u) ||
                (l = 0)),
          1 === s &&
            (e.get(t, r - 1, o + 1) & u
              ? (s = 2)
              : (e.get(n, r, o + 1) & u &&
                  e.get(n, r - 1, o) & u &&
                  e.get(n, r - 1, o + 1) & u) ||
                (s = 0)),
          1 === a &&
            (e.get(t, r - 1, o - 1) & u
              ? (a = 2)
              : (e.get(n, r, o - 1) & u &&
                  e.get(n, r - 1, o) & u &&
                  e.get(n, r - 1, o - 1) & u) ||
                (a = 0))),
      (c << 6) | (l << 4) | (s << 2) | a
    );
  }
  function b(e, t, n) {
    return (e >> (t ? (n ? 6 : 4) : n ? 2 : 0)) & 3;
  }
  function S(e, t, n, r, i) {
    var o = 0 === n ? i : r[n - 1];
    e.push(t[0] * o, t[1] * o, t[2] * o, 1);
  }
}
((e.exports = new (function () {
  var e = new o(),
    t = new i();
  this.meshChunk = function (n, r, i, o, s, l, c) {
    a("start");
    var u,
      h = n.noa,
      d = [n.i * n.size, n.j * n.size, n.k * n.size],
      f = n.array,
      p = r || h.registry.getBlockFaceMaterialAccessor(),
      m = i || h.registry.getMaterialVertexColorAccessor(),
      _ = void 0 === s ? h.rendering.useAO : s,
      g = l || h.rendering.aoVals,
      v = isNaN(c) ? h.rendering.revAoVal : c,
      y = e.mesh(f, p, m, _, g, v, d);
    return (
      y.length && ((u = t.build(n, y, o)), a("built terrain")),
      a("end"),
      u || null
    );
  };
})()),
  (r.prototype.dispose = function () {
    ((this.positions = null),
      (this.indices = null),
      (this.normals = null),
      (this.colors = null),
      (this.uvs = null));
  }));
var a = function () {};
