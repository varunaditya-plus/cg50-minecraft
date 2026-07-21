"use strict";
var r = n(92849),
  i = n(9886),
  o = n(37007).EventEmitter;
function a(e, t) {
  var n, o, a;
  ((t = t || {}),
    (this._noa = e),
    (this.element =
      t.domElement ||
      (((n = document.createElement("div")).tabindex = 1),
      (n.style.position = "absolute"),
      (n.style.left = "0px"),
      (n.style.right = "0px"),
      (n.style.top = "0px"),
      (n.style.bottom = "0px"),
      (n.style.height = "100%"),
      (n.style.overflow = "hidden"),
      document.body.appendChild(n),
      (document.body.style.overflow = "hidden"),
      (document.body.style.height = "100%"),
      (n.id = "noa-container"),
      n)),
    (this.canvas =
      ((o = this.element),
      (a = o.querySelector("canvas")) ||
        (((a = document.createElement("canvas")).style.position = "absolute"),
        (a.style.left = "0px"),
        (a.style.top = "0px"),
        (a.style.height = "100%"),
        (a.style.width = "100%"),
        (a.id = "noa-canvas"),
        o.insertBefore(a, o.firstChild)),
      a)),
    (this._shell = (function (e, t) {
      var n = r({ pointerLock: !0, preventDefaults: !1 }, t);
      n.element = e;
      var o = i(n);
      return ((o.preventDefaults = n.preventDefaults), o);
    })(this.canvas, t)),
    (this.hasPointerLock = !1),
    (this.supportsPointerLock = !1),
    (this.pointerInGame = !1),
    (this.windowFocused = document.hasFocus()));
  var l = this,
    c = function (e) {
      !(function (e) {
        var t =
          document.pointerLockElement ||
          document.mozPointerLockElement ||
          document.webkitPointerLockElement;
        (t
          ? ((e.hasPointerLock = !0), e.emit("gainedPointerLock"))
          : ((e.hasPointerLock = !1), e.emit("lostPointerLock")),
          t && (e.pointerInGame = !0));
      })(l);
    };
  (document.addEventListener("pointerlockchange", c, !1),
    document.addEventListener("mozpointerlockchange", c, !1),
    document.addEventListener("webkitpointerlockchange", c, !1),
    (function (e) {
      if (
        "pointerLockElement" in document ||
        "mozPointerLockElement" in document ||
        "webkitPointerLockElement" in document
      ) {
        e.supportsPointerLock = !0;
        var t = function (n) {
          ((e.supportsPointerLock = !1),
            document.removeEventListener(n.type, t));
        };
        document.addEventListener("touchmove", t);
      }
    })(l),
    l.element.addEventListener("mouseenter", function () {
      l.pointerInGame = !0;
    }),
    l.element.addEventListener("mouseleave", function () {
      l.pointerInGame = !1;
    }),
    window.addEventListener("focus", function () {
      l.windowFocused = !0;
    }),
    window.addEventListener("blur", function () {
      l.windowFocused = !1;
    }),
    this._shell.on("init", s.bind(null, this)));
}
function s(e) {
  var t = e._noa,
    n = e._shell;
  (n.on("tick", function (e) {
    t.tick(e);
  }),
    n.on("render", function (e) {
      t.render(e);
    }),
    n.on("resize", t.rendering.resize.bind(t.rendering)),
    e.emit("DOMready"));
}
((e.exports = function (e, t) {
  return new a(e, t);
}),
  (a.prototype = Object.create(o.prototype)),
  (a.prototype.appendTo = function (e) {
    this.element.appendChild(e);
  }),
  (a.prototype.setPointerLock = function (e) {
    this._shell.pointerLock = !!e;
  }));
