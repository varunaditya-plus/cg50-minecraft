"use strict";
e.exports = function (e) {
  return (function (e) {
    var t = 1,
      n = 480,
      r = 300,
      i = 50,
      o = !1,
      a = { x: 0, y: 0 },
      s = { x: 0, y: 0 },
      l = document.createElement("canvas");
    ((l.width = n * t), (l.height = r * t));
    var c = l.getContext("2d");
    c.imageSmoothingEnabled = !1;
    var u = document.getElementById("previewWindow");
    (u.appendChild(l),
      (u.style.width = n * t + "px"),
      (u.style.height = r * t + "px"));
    var h = 0,
      d = 0,
      f = function () {
        ++h >= d && v.redraw();
      },
      p = [
        2, 9, 3, 4, 13, 14, 8, 6, 5, 16, 15, 11, 12, 23, 22, 21, 24, 25, 26, 27,
        28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      ],
      m = [];
    d = p.length;
    for (var _ = 0; _ < p.length; _++) {
      var g = new Image();
      ((g.onload = f),
        (g.src = "assets/textures/previews/" + p[_] + ".png"),
        (m[_] = g));
    }
    var v = {
      isOpen: !1,
      open: function () {
        ((o = !1),
          v.redraw(),
          (u.style.display = "block"),
          u.addEventListener("mousemove", this.mousemove, !1),
          document.addEventListener("mousedown", this.select, !1),
          document.exitPointerLock(),
          (v.isOpen = !0));
      },
      close: function () {
        ((u.style.display = "none"),
          u.removeEventListener("mousemove", this.mousemove),
          document.removeEventListener("mousedown", this.select));
        var e = document.getElementById("noa-container");
        (safeRequestPointerLock(e), (v.isOpen = !1));
      },
      mousemove: function (e) {
        var n = (function (e) {
            for (
              var t = e.target, n = 0, r = 0;
              t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop);
            )
              ((n += t.offsetLeft - t.scrollLeft),
                (r += t.offsetTop - t.scrollTop),
                (t = t.offsetParent));
            return { x: (n = e.clientX - n), y: (r = e.clientY - r) };
          })(e),
          r = n.x,
          l = n.y,
          c = Math.floor((r + 8 * t) / (i * t)) - 1,
          u = Math.floor((l + 32 * t) / (i * t)) - 2;
        c < 0 || c > 7 || u < 0 || u > 3
          ? o && ((o = !1), (a.x = null), (a.y = null), v.redraw())
          : ((s.x = a.x),
            (s.y = a.y),
            (o = !0),
            (a.x = c),
            (a.y = u),
            (a.x == s.x && a.y == s.y) || v.redraw());
      },
      select: function (t) {
        if ((v.close(), o)) {
          var n = 8 * a.y + a.x,
            r = p[n];
          e.swap(r);
        }
      },
      redraw: function () {
        (c.clearRect(0, 0, n * t, r * t),
          (c.fillStyle = "rgba(0,0,0,0.6)"),
          c.fillRect(0, 0, n * t, r * t),
          (function (e, n, r) {
            ((c.font = 16 * t + "px Minecraft"),
              (c.textBaseline = "alphabetic"),
              (c.textAlign = "center"));
            var i = 2 * t;
            ((c.fillStyle = "rgb(63,63,63)"),
              c.fillText(e, n + i, r + i),
              (c.fillStyle = "rgb(255,255,255)"),
              c.fillText(e, n, r));
          })("Select block", n * t * 0.5, 40 * t));
        var e = 48 * t,
          s = 82 * t,
          l = null;
        if (o) {
          c.fillStyle = "rgba(255,255,255,0.6)";
          var u = a.x * (i * t) + e - 10 * t,
            h = a.y * (i * t) + s - 10 * t;
          (c.fillRect(u, h, 52 * t, 52 * t), (l = 8 * a.y + a.x));
        }
        ((u = 0), (h = 0));
        for (var d = 0; d < p.length; d++) {
          var f = m[d],
            _ = 32,
            g = 0;
          d == l && ((_ = 52), (g = 10));
          var v = u * (i * t) + e - g * t,
            y = h * (i * t) + s - g * t;
          (c.drawImage(f, v, y, _ * t, _ * t), ++u >= 8 && (++h, (u = 0)));
        }
      },
      resize: function () {
        var e = t;
        ((t = 2),
          window.innerHeight < 900 && (t = 1),
          t != e &&
            ((l.width = n * t),
            (l.height = r * t),
            (u.style.width = n * t + "px"),
            (u.style.height = r * t + "px"),
            (c.imageSmoothingEnabled = !1),
            v.redraw()));
      },
    };
    return (v.close(), v.resize(), v);
  })(e);
};
