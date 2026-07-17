"use strict";
e.exports = function (e) {
  return (function (e) {
    var t = 0,
      n = [2, 3, 4, 9, 11, 12, 13, 14, 15],
      r = 3,
      i = 184,
      o = 24,
      a = document.createElement("canvas");
    ((a.width = i * r), (a.height = o * r));
    var s = a.getContext("2d");
    s.imageSmoothingEnabled = !1;
    var l = document.getElementById("hotbar");
    (l.appendChild(a),
      (l.style.width = i * r + "px"),
      (l.style.marginLeft = -184 * r * 0.5 + "px"));
    var c = 0,
      u = 0,
      h = function () {
        ++c >= u && v.redraw();
      },
      d = new Image();
    ((d.onload = h), (d.src = "assets/textures/hotbar_bg.png"));
    var f = new Image();
    ((f.onload = h), (f.src = "assets/textures/hotbar_selection.png"));
    var p = [
        2, 9, 3, 4, 13, 14, 8, 6, 5, 16, 15, 11, 12, 23, 22, 21, 24, 25, 26, 27,
        28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      ],
      m = [];
    u = p.length + 2;
    for (var _ = 0; _ < p.length; _++) {
      var g = new Image();
      ((g.onload = h),
        (g.src = "assets/textures/previews/" + p[_] + ".png"),
        (m[p[_]] = g));
    }
    e.on("tick", function (r) {
      var i = noa.inputs.state.scrolly;
      if (!(Math.abs(i) < 200)) {
        noa.inputs.state.scrolly = 0;
        var o = t - (i > 0 ? -1 : 1);
        (o < 0 && (o = 8),
          o > 8 && (o = 0),
          (t = o),
          v.redraw(),
          (v.currentId = n[t]),
          e.emit("setPreviewBlock", v.currentId));
      }
    });
    var v = {
      currentId: n[t],
      setIndex: function (e) {
        e < 0 || e > 8 || ((t = e), (this.currentId = n[t]), this.redraw());
      },
      swap: function (r, i) {
        var o = i || t;
        (null == i && this.checkExistingSwap(r, n[o], o),
          (n[o] = r),
          null == i && ((this.currentId = n[t]), e.emit("setPreviewBlock", r)),
          this.redraw());
      },
      checkExistingSwap: function (e, t, r) {
        for (var i = 0; i < n.length; i++)
          if (i != r && n[i] == e) {
            this.swap(t, i);
            break;
          }
      },
      pick: function (e) {
        for (var t = !1, r = 0; r < n.length; r++)
          if (n[r] == e) {
            (this.setIndex(r), (t = !0));
            break;
          }
        t ? this.redraw() : this.swap(e);
      },
      redraw: function () {
        (s.clearRect(0, 0, i * r, o * r),
          s.drawImage(d, 1 * r, 1 * r, 182 * r, 22 * r));
        for (var e = 0; e < n.length; e++) {
          var a = m[n[e]],
            l = e * (20 * r) + 4 * r;
          s.drawImage(a, l, 4 * r, 16 * r, 16 * r);
        }
        ((l = t * (20 * r)), s.drawImage(f, l, 0, o * r, o * r));
      },
      resize: function () {
        var e = r;
        ((r = 3),
          window.innerHeight < 600 && (r = 2),
          r != e &&
            ((a.width = i * r),
            (a.height = o * r),
            (l.style.width = i * r + "px"),
            (l.style.marginLeft = -184 * r * 0.5 + "px"),
            (s.imageSmoothingEnabled = !1),
            v.redraw()));
      },
    };
    return (v.resize(), v);
  })(e);
};
