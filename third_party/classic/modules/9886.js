"use strict";
function r(e) {
  return (
    (r =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          }),
    r(e)
  );
}
var i = n(37007).EventEmitter,
  o = n(40537),
  a = n(90121),
  s = n(77456),
  l = n(9430),
  c = n(67887),
  u = n(69629),
  h = n(22219),
  d = Math.min;
n(54981);
var f = n(20358),
  p = n(4637);
"undefined" == typeof window ||
  window.__gameShellPointerLockGuard ||
  ((window.__gameShellPointerLockGuard = !0),
  window.addEventListener("unhandledrejection", function (e) {
    var t = e && e.reason;
    if (t) {
      var n = t.name || "",
        r = "string" == typeof t ? t : t.message || "";
      "NotAllowedError" === n &&
        (/pointer\s*lock/i.test(r) ||
          /fullscreen/i.test(r) ||
          /user\s*gesture/i.test(r)) &&
        e.preventDefault();
    }
  }));
var m = (function () {
    var e,
      t,
      n = new Array(256);
    for (e = 0; e < 256; ++e) n[e] = "UNK";
    for (e in s)
      ("<" === (t = s[e]).charAt(0) &&
        ">" === t.charAt(t.length - 1) &&
        (t = t.substring(1, t.length - 1)),
        (t = t.replace(/\s/g, "-")),
        (n[parseInt(e)] = t));
    return n;
  })(),
  _ = c(Object.keys(l(m)));
function g(e) {
  return u.eq(_, e);
}
function v(e) {
  return g(m[e]);
}
function y() {
  (i.call(this),
    (this._curKeyState = new Array(_.length)),
    (this._pressCount = new Array(_.length)),
    (this._releaseCount = new Array(_.length)),
    (this._tickInterval = null),
    (this._rafHandle = null),
    (this._tickRate = 0),
    (this._lastTick = p()),
    (this._frameTime = 0),
    (this._paused = !0),
    (this._width = 0),
    (this._height = 0),
    (this._wantFullscreen = !1),
    (this._wantPointerLock = !1),
    (this._fullscreenActive = !1),
    (this._pointerLockActive = !1),
    (this._rafFunction = R.bind(void 0, this, !0)),
    (this.preventDefaults = !0),
    (this.stopPropagation = !1));
  for (var e = 0; e < _.length; ++e)
    ((this._curKeyState[e] = !1),
      (this._pressCount[e] = this._releaseCount[e] = 0));
  ((this.element = null),
    (this.bindings = {}),
    (this.frameSkip = 100),
    (this.tickCount = 0),
    (this.frameCount = 0),
    (this.startTime = p()),
    (this.tickTime = this._tickRate),
    (this.frameTime = 10),
    (this.stickyFullscreen = !1),
    (this.stickyPointerLock = !1),
    (this.scroll = [0, 0, 0]),
    (this.mouseX = 0),
    (this.mouseY = 0),
    (this.prevMouseX = 0),
    (this.prevMouseY = 0));
}
o.inherits(y, i);
var b = y.prototype;
function S(e, t, n) {
  if (n in t) {
    for (var r = t[n], i = 0, o = 0, a = r.length; o < a; ++o) i += e[g(r[o])];
    return i;
  }
  var s = g(n);
  return s >= 0 ? e[s] : 0;
}
function T(e) {
  var t = e.element;
  if (e._wantFullscreen && !e._fullscreenActive) {
    if (
      "undefined" != typeof navigator &&
      navigator.userActivation &&
      !1 === navigator.userActivation.isActive
    )
      return;
    var n =
      t.requestFullscreen ||
      t.requestFullScreen ||
      t.webkitRequestFullscreen ||
      t.webkitRequestFullScreen ||
      t.mozRequestFullscreen ||
      t.mozRequestFullScreen ||
      function () {};
    try {
      var r = n.call(t);
      r && "function" == typeof r.then && r.catch(function () {});
    } catch (e) {}
  }
  if (e._wantPointerLock && !e._pointerLockActive) {
    if (e._pointerLockExitTime && Date.now() - e._pointerLockExitTime < 3e3)
      return;
    if (
      "undefined" != typeof navigator &&
      navigator.userActivation &&
      !1 === navigator.userActivation.isActive
    )
      return;
    var i =
      t.requestPointerLock ||
      t.webkitRequestPointerLock ||
      t.mozRequestPointerLock ||
      t.msRequestPointerLock ||
      t.oRequestPointerLock ||
      function () {};
    try {
      var o = i.call(t);
      o && "function" == typeof o.then && o.catch(function () {});
    } catch (e) {}
  }
}
((b.keyNames = _),
  (b.bind = function (e) {
    var t, n;
    t = e in this.bindings ? this.bindings[e] : [];
    for (var r = 1, i = arguments.length; r < i; ++r)
      if (g((n = arguments[r])) >= 0) t.push(n);
      else if (n in this.bindings)
        for (var o = this.bindings[n], a = 0; a < o.length; ++a) t.push(o[a]);
    ((t = c(t)).length > 0 && (this.bindings[e] = t), this.emit("bind", e, t));
  }),
  (b.unbind = function (e) {
    (e in this.bindings && delete this.bindings[e], this.emit("unbind", e));
  }),
  (b.down = function (e) {
    return (function (e, t, n) {
      if (n in t) {
        for (var r = t[n], i = 0, o = r.length; i < o; ++i)
          if (e[g(r[i])]) return !0;
        return !1;
      }
      var a = g(n);
      return a >= 0 && e[a];
    })(this._curKeyState, this.bindings, e);
  }),
  (b.wasDown = function (e) {
    return this.down(e) || !!this.press(e);
  }),
  (b.up = function (e) {
    return !this.down(e);
  }),
  (b.wasUp = function (e) {
    return this.up(e) || !!this.release(e);
  }),
  (b.press = function (e) {
    return S(this._pressCount, this.bindings, e);
  }),
  (b.release = function (e) {
    return S(this._releaseCount, this.bindings, e);
  }),
  Object.defineProperty(b, "paused", {
    get: function () {
      return this._paused;
    },
    set: function (e) {
      !!e !== this._paused &&
        (this._paused
          ? ((this._paused = !1),
            (this._lastTick =
              p() - Math.floor(this._frameTime * this._tickRate)),
            (this._tickInterval = setInterval(R, this._tickRate, this, !1)),
            (this._rafHandle = requestAnimationFrame(this._rafFunction)))
          : ((this._paused = !0),
            (this._frameTime = d(1, (p() - this._lastTick) / this._tickRate)),
            clearInterval(this._tickInterval)));
    },
  }));
var E =
  document.exitFullscreen ||
  document.cancelFullscreen ||
  document.cancelFullScreen ||
  document.webkitCancelFullscreen ||
  document.webkitCancelFullScreen ||
  document.mozCancelFullscreen ||
  document.mozCancelFullScreen ||
  function () {};
function x(e) {
  ((e._fullscreenActive =
    document.fullscreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen ||
    !1),
    !e.stickyFullscreen && e._fullscreenActive && (e._wantFullscreen = !1));
}
Object.defineProperty(b, "fullscreen", {
  get: function () {
    return this._fullscreenActive;
  },
  set: function (e) {
    return (
      e
        ? ((this._wantFullscreen = !0), T(this))
        : ((this._wantFullscreen = !1),
          (document.fullscreen ||
            document.mozFullScreen ||
            document.webkitIsFullScreen) &&
            E.call(document)),
      this._fullscreenActive
    );
  },
});
var P =
  document.exitPointerLock ||
  document.webkitExitPointerLock ||
  document.mozExitPointerLock ||
  function () {};
function A(e, t) {
  var n = e._pointerLockActive;
  ((e._pointerLockActive =
    e.element ===
    (document.pointerLockElement ||
      document.mozPointerLockElement ||
      document.webkitPointerLockElement ||
      null)),
    n && !e._pointerLockActive && (e._pointerLockExitTime = Date.now()),
    !e.stickyPointerLock && e._pointerLockActive && (e._wantPointerLock = !1));
}
function C(e, t, n) {
  e._curKeyState[t] !== n &&
    (n ? e._pressCount[t]++ : e._releaseCount[t]++, (e._curKeyState[t] = n));
}
function R(e, t) {
  (!(function (e) {
    for (
      var t,
        n,
        r,
        i = p() + e.frameSkip,
        o = e._pressCount,
        a = e._releaseCount,
        s = e._tickRate,
        l = _.length;
      !e._paused && p() >= e._lastTick + s;
    ) {
      if (p() > i) return void (e._lastTick = p() + s);
      for (
        n = p(),
          e.emit("tick"),
          r = p(),
          e.tickTime = r - n,
          ++e.tickCount,
          e._lastTick += s,
          t = 0;
        t < l;
        ++t
      )
        o[t] = a[t] = 0;
      (e._pointerLockActive
        ? ((e.prevMouseX = e.mouseX = e.width >> 1),
          (e.prevMouseY = e.mouseY = e.height >> 1))
        : ((e.prevMouseX = e.mouseX), (e.prevMouseY = e.mouseY)),
        (e.scroll[0] = e.scroll[1] = e.scroll[2] = 0));
    }
  })(e),
    t &&
      (function (e) {
        var t;
        ((e._rafHandle = requestAnimationFrame(e._rafFunction)),
          (t = e._paused
            ? e._frameTime
            : d(1, (p() - e._lastTick) / e._tickRate)),
          ++e.frameCount);
        var n = p();
        e.emit("render", t);
        var r = p();
        e.frameTime = r - n;
      })(e));
}
function I(e, t) {
  (e.preventDefaults && t.preventDefault(),
    e.stopPropagation && t.stopPropagation());
}
function O(e, t) {
  I(e, t);
  var n = v(t.keyCode || t.char || t.which || t.charCode);
  n >= 0 && C(e, n, !1);
}
function M(e, t) {
  if (
    (function (e) {
      return (
        document.activeElement === document.body ||
        document.activeElement === e.element
      );
    })(e)
  )
    if ((I(e, t), t.metaKey)) G(e);
    else {
      var n = v(t.keyCode || t.char || t.which || t.charCode);
      n >= 0 && C(e, n, !0);
    }
}
(Object.defineProperty(b, "pointerLock", {
  get: function () {
    return this._pointerLockActive;
  },
  set: function (e) {
    return (
      e
        ? ((this._wantPointerLock = !0), T(this))
        : ((this._wantPointerLock = !1), P.call(document)),
      this._pointerLockActive
    );
  },
}),
  Object.defineProperty(b, "width", {
    get: function () {
      return this.element.clientWidth;
    },
  }),
  Object.defineProperty(b, "height", {
    get: function () {
      return this.element.clientHeight;
    },
  }));
var D = h(32).map(function (e) {
  return g("mouse-" + (e + 1));
});
function N(e, t) {
  if ((I(e, t), e._pointerLockActive)) {
    var n = t.movementX || t.mozMovementX || t.webkitMovementX || 0,
      r = t.movementY || t.mozMovementY || t.webkitMovementY || 0;
    ((e.mouseX += n), (e.mouseY += r));
  } else
    ((e.mouseX = t.clientX - e.element.offsetLeft),
      (e.mouseY = t.clientY - e.element.offsetTop));
  return !1;
}
function L(e, t) {
  return (I(e, t), C(e, D[t.button], !0), !1);
}
function F(e, t) {
  return (I(e, t), C(e, D[t.button], !1), !1);
}
function w(e, t) {
  return (
    I(e, t),
    e._pointerLockActive
      ? ((e.prevMouseX = e.mouseX = e.width >> 1),
        (e.prevMouseY = e.mouseY = e.height >> 1))
      : ((e.prevMouseX = e.mouseX = t.clientX - e.element.offsetLeft),
        (e.prevMouseY = e.mouseY = t.clientY - e.element.offsetTop)),
    !1
  );
}
function B(e, t) {
  return (
    I(e, t),
    (function (e) {
      for (var t = 0; t < 32; ++t) C(e, D[t], !1);
    })(e),
    !1
  );
}
function V(e, t) {
  I(e, t);
  var n = 1;
  switch (t.deltaMode) {
    case 0:
      n = 1;
      break;
    case 1:
      n = 12;
      break;
    case 2:
      n = e.height;
  }
  return (
    (e.scroll[0] += t.deltaX * n),
    (e.scroll[1] += t.deltaY * n),
    (e.scroll[2] += t.deltaZ * n || 0),
    !1
  );
}
function U(e, t) {
  return (I(e, t), !1);
}
function G(e, t) {
  var n,
    r = _.length,
    i = e._curKeyState,
    o = e._releaseCount;
  for (n = 0; n < r; ++n) (i[n] && ++o[n], (i[n] = !1));
  return !1;
}
function k(e, t) {
  var n = 0 | e.element.clientWidth,
    r = 0 | e.element.clientHeight;
  (n === e._width && r === e._height) ||
    ((e._width = n), (e._height = r), e.emit("resize", n, r));
}
function z() {
  var e = document.createElement("div");
  return (
    (e.tabindex = 1),
    (e.style.position = "absolute"),
    (e.style.left = "0px"),
    (e.style.right = "0px"),
    (e.style.top = "0px"),
    (e.style.bottom = "0px"),
    (e.style.height = "100%"),
    (e.style.overflow = "hidden"),
    document.body.appendChild(e),
    (document.body.style.overflow = "hidden"),
    (document.body.style.height = "100%"),
    e
  );
}
e.exports = function (e) {
  var t = !!(e = e || {}).fullscreen,
    n = t;
  void 0 !== r(e.pointerLock) && (n = !!e.pointerLock);
  var i = new y();
  return (
    (i._tickRate = e.tickRate || 30),
    (i.frameSkip = e.frameSkip || 5 * (i._tickRate + 5)),
    (i.stickyFullscreen = !!e.stickyFullscreen || !!e.sticky),
    (i.stickyPointerLock = !!e.stickyPointerLock || !!e.sticky),
    e.bindings && (i.bindings = e.bindings),
    setTimeout(function () {
      a(function () {
        var o = e.element;
        if ("string" == typeof o) {
          var a = document.querySelector(o);
          (a || (a = document.getElementById(o)),
            a || (a = document.getElementByClass(o)[0]),
            a || (a = z()),
            (i.element = a));
        } else
          "object" === r(o) && o
            ? (i.element = o)
            : (i.element = "function" == typeof o ? o() : z());
        (i.element.style &&
          ((i.element.style["-webkit-touch-callout"] = "none"),
          (i.element.style["-webkit-user-select"] = "none"),
          (i.element.style["-khtml-user-select"] = "none"),
          (i.element.style["-moz-user-select"] = "none"),
          (i.element.style["-ms-user-select"] = "none"),
          (i.element.style["user-select"] = "none")),
          (i._width = i.element.clientWidth),
          (i._height = i.element.clientHeight));
        var s = k.bind(void 0, i);
        ("undefined" != typeof MutationObserver
          ? new MutationObserver(s).observe(i.element, {
              attributes: !0,
              subtree: !0,
            })
          : i.element.addEventListener("DOMSubtreeModified", s, !1),
          window.addEventListener("resize", s, !1),
          window.addEventListener("keydown", M.bind(void 0, i), !1),
          window.addEventListener("keyup", O.bind(void 0, i), !1),
          (i.element.oncontextmenu = U.bind(void 0, i)),
          i.element.addEventListener("mousedown", L.bind(void 0, i), !1),
          i.element.addEventListener("mouseup", F.bind(void 0, i), !1),
          i.element.addEventListener("mousemove", N.bind(void 0, i), !1),
          i.element.addEventListener("mouseenter", w.bind(void 0, i), !1));
        var l = B.bind(void 0, i);
        (i.element.addEventListener("mouseleave", l, !1),
          i.element.addEventListener("mouseout", l, !1),
          window.addEventListener("mouseleave", l, !1),
          window.addEventListener("mouseout", l, !1));
        var c = G.bind(void 0, i);
        (i.element.addEventListener("blur", c, !1),
          i.element.addEventListener("focusout", c, !1),
          i.element.addEventListener("focus", c, !1),
          window.addEventListener("blur", c, !1),
          window.addEventListener("focusout", c, !1),
          window.addEventListener("focus", c, !1),
          f(i.element, V.bind(void 0, i), !1));
        var u = x.bind(void 0, i);
        (document.addEventListener("fullscreenchange", u, !1),
          document.addEventListener("mozfullscreenchange", u, !1),
          document.addEventListener("webkitfullscreenchange", u, !1),
          i.element.addEventListener("click", T.bind(void 0, i), !1));
        var h = A.bind(void 0, i);
        (document.addEventListener("pointerlockchange", h, !1),
          document.addEventListener("mozpointerlockchange", h, !1),
          document.addEventListener("webkitpointerlockchange", h, !1),
          document.addEventListener("pointerlocklost", h, !1),
          document.addEventListener("webkitpointerlocklost", h, !1),
          document.addEventListener("mozpointerlocklost", h, !1),
          (i.fullscreen = t),
          (i.pointerLock = n),
          i.bind("mouse-left", "mouse-1"),
          i.bind("mouse-right", "mouse-3"),
          i.bind("mouse-middle", "mouse-2"),
          (i._lastTick = p()),
          (i.startTime = p()),
          (i.paused = !1),
          i.emit("init"));
      });
    }, 0),
    i
  );
};
