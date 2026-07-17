(() => {
  "use strict";
  __webpack_require__(27461);
  var e = __webpack_require__(92629);
  function t(e) {
    return (
      (t =
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
      t(e)
    );
  }
  function n() {
    var e,
      t,
      i = "function" == typeof Symbol ? Symbol : {},
      o = i.iterator || "@@iterator",
      a = i.toStringTag || "@@toStringTag";
    function s(n, i, o, a) {
      var s = i && i.prototype instanceof c ? i : c,
        u = Object.create(s.prototype);
      return (
        r(
          u,
          "_invoke",
          (function (n, r, i) {
            var o,
              a,
              s,
              c = 0,
              u = i || [],
              h = !1,
              d = {
                p: 0,
                n: 0,
                v: e,
                a: f,
                f: f.bind(e, 4),
                d: function (t, n) {
                  return ((o = t), (a = 0), (s = e), (d.n = n), l);
                },
              };
            function f(n, r) {
              for (a = n, s = r, t = 0; !h && c && !i && t < u.length; t++) {
                var i,
                  o = u[t],
                  f = d.p,
                  p = o[2];
                n > 3
                  ? (i = p === r) &&
                    ((s = o[(a = o[4]) ? 5 : ((a = 3), 3)]), (o[4] = o[5] = e))
                  : o[0] <= f &&
                    ((i = n < 2 && f < o[1])
                      ? ((a = 0), (d.v = r), (d.n = o[1]))
                      : f < p &&
                        (i = n < 3 || o[0] > r || r > p) &&
                        ((o[4] = n), (o[5] = r), (d.n = p), (a = 0)));
              }
              if (i || n > 1) return l;
              throw ((h = !0), r);
            }
            return function (i, u, p) {
              if (c > 1) throw TypeError("Generator is already running");
              for (
                h && 1 === u && f(u, p), a = u, s = p;
                (t = a < 2 ? e : s) || !h;
              ) {
                o ||
                  (a
                    ? a < 3
                      ? (a > 1 && (d.n = -1), f(a, s))
                      : (d.n = s)
                    : (d.v = s));
                try {
                  if (((c = 2), o)) {
                    if ((a || (i = "next"), (t = o[i]))) {
                      if (!(t = t.call(o, s)))
                        throw TypeError("iterator result is not an object");
                      if (!t.done) return t;
                      ((s = t.value), a < 2 && (a = 0));
                    } else
                      (1 === a && (t = o.return) && t.call(o),
                        a < 2 &&
                          ((s = TypeError(
                            "The iterator does not provide a '" +
                              i +
                              "' method",
                          )),
                          (a = 1)));
                    o = e;
                  } else if ((t = (h = d.n < 0) ? s : n.call(r, d)) !== l)
                    break;
                } catch (t) {
                  ((o = e), (a = 1), (s = t));
                } finally {
                  c = 1;
                }
              }
              return { value: t, done: h };
            };
          })(n, o, a),
          !0,
        ),
        u
      );
    }
    var l = {};
    function c() {}
    function u() {}
    function h() {}
    t = Object.getPrototypeOf;
    var d = [][o]
        ? t(t([][o]()))
        : (r((t = {}), o, function () {
            return this;
          }),
          t),
      f = (h.prototype = c.prototype = Object.create(d));
    function p(e) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(e, h)
          : ((e.__proto__ = h), r(e, a, "GeneratorFunction")),
        (e.prototype = Object.create(f)),
        e
      );
    }
    return (
      (u.prototype = h),
      r(f, "constructor", h),
      r(h, "constructor", u),
      (u.displayName = "GeneratorFunction"),
      r(h, a, "GeneratorFunction"),
      r(f),
      r(f, a, "Generator"),
      r(f, o, function () {
        return this;
      }),
      r(f, "toString", function () {
        return "[object Generator]";
      }),
      (n = function () {
        return { w: s, m: p };
      })()
    );
  }
  function r(e, t, n, i) {
    var o = Object.defineProperty;
    try {
      o({}, "", {});
    } catch (e) {
      o = 0;
    }
    ((r = function (e, t, n, i) {
      function a(t, n) {
        r(e, t, function (e) {
          return this._invoke(t, n, e);
        });
      }
      t
        ? o
          ? o(e, t, {
              value: n,
              enumerable: !i,
              configurable: !i,
              writable: !i,
            })
          : (e[t] = n)
        : (a("next", 0), a("throw", 1), a("return", 2));
    }),
      r(e, t, n, i));
  }
  function i(t, n, r, i, o, a, s) {
    try {
      var l = t[a](s),
        c = l.value;
    } catch (t) {
      return void r(t);
    }
    l.done ? n(c) : e.resolve(c).then(i, o);
  }
  function o(t) {
    return function () {
      var n = this,
        r = arguments;
      return new e(function (e, o) {
        var a = t.apply(n, r);
        function s(t) {
          i(a, e, o, s, l, "next", t);
        }
        function l(t) {
          i(a, e, o, s, l, "throw", t);
        }
        s(void 0);
      });
    };
  }
  function a(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      ((r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(e, s(r.key), r));
    }
  }
  function s(e) {
    var n = (function (e) {
      if ("object" != t(e) || !e) return e;
      var n = e[Symbol.toPrimitive];
      if (void 0 !== n) {
        var r = n.call(e, "string");
        if ("object" != t(r)) return r;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(e);
    })(e);
    return "symbol" == t(n) ? n : n + "";
  }
  var l = __webpack_require__(96555);
  const c = (function () {
    function t() {
      !(function (e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      })(this, t);
    }
    return (
      (r = t),
      (i = [
        {
          key: "init",
          value: function () {
            ((self.baseUrl = l.backendBaseUrl), (self.socket = null));
          },
        },
        {
          key: "getICECandidates",
          value: function (n) {
            return new e(function (e, r) {
              t.executeXhr("/get-ice-candidates/" + n, "get").then(
                function (t) {
                  e([JSON.parse(t).v.iceServers]);
                },
              );
            });
          },
        },
        {
          key: "getNewGame",
          value: function () {
            return new e(function (e, n) {
              t.executeXhr("/game", "get").then(function (n) {
                var r = JSON.parse(n);
                (e(r),
                  setInterval(function () {
                    t.executeXhr("/game/" + r.code + "/heartbeat", "put").then(
                      function (e) {},
                    );
                  }, 3e4));
              });
            });
          },
        },
        {
          key: "getGame",
          value: function (n) {
            return null == n
              ? t.getNewGame()
              : new e(function (e, r) {
                  t.executeXhr("/game/" + n, "get").then(
                    function (t) {
                      e(JSON.parse(t));
                    },
                    function (t) {
                      e(null);
                    },
                  );
                });
          },
        },
        {
          key: "listenForData",
          value:
            ((d = o(
              n().m(function e(t, r) {
                return n().w(function (e) {
                  for (;;)
                    switch (e.n) {
                      case 0:
                        if (null !== self.socket) {
                          e.n = 1;
                          break;
                        }
                        return (console.log("no socket!"), e.a(2));
                      case 1:
                        socket.addEventListener("message", function (e) {
                          var t = JSON.parse(e.data),
                            n = {
                              payload: t.p,
                              meta: t.m,
                              msgEvent: t.o,
                              to: t.m.t,
                              from: t.m.f,
                            };
                          r(n);
                        });
                      case 2:
                        return e.a(2);
                    }
                }, e);
              }),
            )),
            function (e, t) {
              return d.apply(this, arguments);
            }),
        },
        {
          key: "createSignalingChannel",
          value:
            ((h = o(
              n().m(function r(i, a) {
                return n().w(function (r) {
                  for (;;)
                    if (0 === r.n)
                      return r.a(
                        2,
                        new e(
                          (function () {
                            var e = o(
                              n().m(function e(r, o) {
                                var s;
                                return n().w(function (e) {
                                  for (;;)
                                    switch (e.n) {
                                      case 0:
                                        return (
                                          (e.n = 1),
                                          t.executeXhr(
                                            "/create-channel/" + i,
                                            "get",
                                          )
                                        );
                                      case 1:
                                        return (
                                          (e.n = 2),
                                          t.getWebSocket(i, a)
                                        );
                                      case 2:
                                        ((s = e.v),
                                          (self.socket = s),
                                          s.addEventListener(
                                            "open",
                                            function () {
                                              (r(),
                                                setInterval(function () {
                                                  s.send("ping");
                                                }, 800));
                                            },
                                          ));
                                      case 3:
                                        return e.a(2);
                                    }
                                }, e);
                              }),
                            );
                            return function (t, n) {
                              return e.apply(this, arguments);
                            };
                          })(),
                        ),
                      );
                }, r);
              }),
            )),
            function (e, t) {
              return h.apply(this, arguments);
            }),
        },
        {
          key: "joinSignalingChannel",
          value:
            ((u = o(
              n().m(function r(i, a) {
                return n().w(function (r) {
                  for (;;)
                    if (0 === r.n)
                      return r.a(
                        2,
                        new e(
                          (function () {
                            var e = o(
                              n().m(function e(r, o) {
                                var s;
                                return n().w(function (e) {
                                  for (;;)
                                    switch (e.n) {
                                      case 0:
                                        return (
                                          (e.n = 1),
                                          t.getWebSocket(i, a)
                                        );
                                      case 1:
                                        ((s = e.v),
                                          (self.socket = s),
                                          s.addEventListener(
                                            "open",
                                            function () {
                                              (r(),
                                                setInterval(function () {
                                                  s.send("ping");
                                                }, 800));
                                            },
                                          ));
                                      case 2:
                                        return e.a(2);
                                    }
                                }, e);
                              }),
                            );
                            return function (t, n) {
                              return e.apply(this, arguments);
                            };
                          })(),
                        ),
                      );
                }, r);
              }),
            )),
            function (e, t) {
              return u.apply(this, arguments);
            }),
        },
        {
          key: "sendSignalingTo",
          value:
            ((c = o(
              n().m(function e(t, r, i, o) {
                var a;
                return n().w(function (e) {
                  for (;;)
                    switch (e.n) {
                      case 0:
                        if (null !== self.socket) {
                          e.n = 1;
                          break;
                        }
                        return (console.log("no socket!"), e.a(2));
                      case 1:
                        ((a = {
                          t: "u",
                          m: { f: t + "/" + i, t: r, o: "message" },
                          p: { signal: JSON.stringify(o) },
                        }),
                          self.socket.send(JSON.stringify(a)));
                      case 2:
                        return e.a(2);
                    }
                }, e);
              }),
            )),
            function (e, t, n, r) {
              return c.apply(this, arguments);
            }),
        },
        {
          key: "getWebSocket",
          value:
            ((s = o(
              n().m(function e(r, i) {
                var o, a, s, l, c;
                return n().w(function (e) {
                  for (;;)
                    switch (e.n) {
                      case 0:
                        return (
                          (l = JSON),
                          (e.n = 1),
                          t.executeXhr(
                            "/get-signaling-token/" + r + "/" + i,
                            "get",
                          )
                        );
                      case 1:
                        return (
                          (o = l.parse.call(l, e.v).v),
                          (c = JSON),
                          (e.n = 2),
                          t.executeXhr(
                            "/get-signaling-host/" + r + "/" + i,
                            "get",
                          )
                        );
                      case 2:
                        return (
                          (a = c.parse.call(c, e.v).v),
                          (s = a + "/v2/" + o),
                          e.a(2, new WebSocket(s))
                        );
                    }
                }, e);
              }),
            )),
            function (e, t) {
              return s.apply(this, arguments);
            }),
        },
        {
          key: "addPlayerToGame",
          value: function (n, r) {
            return new e(function (e, r) {
              t.executeXhr("/game/" + n, "put").then(function (t) {
                e(JSON.parse(t));
              });
            });
          },
        },
        {
          key: "pathUrl",
          value: function (e) {
            return self.baseUrl + e;
          },
        },
        {
          key: "executeXhr",
          value: function (n, r) {
            return new e(function (e, i) {
              var o = new XMLHttpRequest(),
                a = t.pathUrl(n);
              (o.open(r, a),
                (o.onreadystatechange = function () {
                  4 !== o.readyState || 404 !== o.status || i();
                }),
                o.send(),
                (o.onload = function () {
                  e(o.responseText);
                }),
                (o.onerror = function (e) {
                  (console.log(e), i(e));
                }));
            });
          },
        },
      ]),
      i && a(r, i),
      Object.defineProperty(r, "prototype", { writable: !1 }),
      r
    );
    var r, i, s, c, u, h, d;
  })();
  var u = __webpack_require__(41770),
    h = __webpack_require__.n(u),
    d = __webpack_require__(85534);
  function f(e) {
    return (function (e) {
      var t = 2,
        n = 256,
        r = 10,
        i = document.createElement("canvas");
      ((i.width = window.innerWidth - 16), (i.height = n * t));
      var o = i.getContext("2d");
      o.imageSmoothingEnabled = !1;
      var a = document.getElementById("chat");
      (a.appendChild(i),
        (a.style.width = i.width + "px"),
        (a.style.height = n * t + "px"));
      var s = "",
        l = 0,
        c = [],
        u = 0,
        h = {
          player: null,
          isOpen: !1,
          open: function () {
            ((r = 20),
              (l = performance.now()),
              (h.isOpen = !0),
              (n = 512),
              h.resize(),
              document.addEventListener("keypress", h.keypress, !1),
              document.addEventListener("keydown", h.keydown, !1),
              document.exitPointerLock(),
              (e.inputs.state.active = !1));
          },
          close: function () {
            (document.removeEventListener("keypress", h.keypress),
              document.removeEventListener("keydown", h.keydown));
            var t = document.getElementById("noa-container");
            (setTimeout(function () {
              safeRequestPointerLock(t);
            }, 200),
              (r = 10),
              (h.isOpen = !1),
              (n = 256),
              h.resize(),
              (e.inputs.state.active = !0));
          },
          sendMessage: function (e) {
            if (0 == e.indexOf("/")) {
              var t = 'Unknown command. Type "/help" for help.';
              if (
                (0 == e.indexOf("/ban") && (t = "Command disabled."),
                0 == e.indexOf("/banip") && (t = "Command disabled."),
                0 == e.indexOf("/say") && (t = "Command disabled."),
                0 == e.indexOf("/deop") && (t = "Command disabled."),
                0 == e.indexOf("/kick"))
              ) {
                var n = e.substr(e.indexOf("kick") + 5).trim();
                t = b.getInstance().kickPlayer(n);
              }
              if (
                (0 == e.indexOf("/op") && (t = "Command disabled."),
                0 == e.indexOf("/tp"))
              ) {
                var r = e.substr(e.indexOf("tp") + 3).trim();
                t = b.getInstance().teleportToPlayer(r);
              }
              return (
                0 == e.indexOf("/unban") && (t = "Command disabled."),
                0 == e.indexOf("/setspawn") && (t = b.getInstance().setSpawn()),
                0 == e.indexOf("/solid") && (t = "Command disabled."),
                0 == e.indexOf("/list") &&
                  (t = JSON.stringify(b.getInstance().getPlayerNames()).slice(
                    1,
                    -1,
                  )),
                0 == e.indexOf("/help") &&
                  (t = "Available Commands: /list /kick /tp /setspawn /help"),
                c.push({
                  type: "local",
                  message: t,
                  from: "",
                  timestamp: new Date().getTime(),
                }),
                void (c.length > 20 && c.shift())
              );
            }
            null != h.player && h.player.sendMessage(e);
          },
          keydown: function (e) {
            if (
              (e.shiftKey &&
                55 == e.keyCode &&
                (e.preventDefault(), h.keypress(e)),
              13 == e.keyCode)
            ) {
              var t = s.trim();
              return (
                t.length > 0 && h.sendMessage(t),
                (s = ""),
                void h.redraw()
              );
            }
            (8 == e.keyCode &&
              s.length > 0 &&
              (s = s.substring(0, s.length - 1)),
              h.redraw());
          },
          keypress: function (e) {
            if (!(performance.now() < l + 100)) {
              var t = e.key,
                n = 10;
              (null != h.player && (n = h.player.state.name.length),
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ,.:-_'*!\\\"#%/()=+?[]{}<>@|$;".indexOf(
                  t,
                ) >= 0 &&
                  s.length < 64 - (n + 2) &&
                  (s += t),
                h.redraw());
            }
          },
          update: function (e) {
            for (
              c = (function (e) {
                for (var t = e.concat(), n = 0; n < t.length; ++n)
                  for (var r = n + 1; r < t.length; ++r)
                    JSON.stringify(t[n]) === JSON.stringify(t[r]) &&
                      t.splice(r--, 1);
                return t;
              })(c.concat(e));
              c.length > 20;
            )
              c.shift();
            h.redraw();
          },
          tick: function () {
            var e = new Date().getTime();
            if (!(e < u + 1e3)) {
              for (var t = !1, n = 0; n < c.length; n++)
                c[n].timestamp + 1e4 < e && ((c[n].isOld = !0), (t = !0));
              (t && h.redraw(), (u = e));
            }
          },
          redraw: function () {
            (o.clearRect(0, 0, i.width, n * t),
              (o.font = 14 * t + "px Minecraft, sans-serif"),
              (o.textBaseline = "alphabetic"),
              (o.textAlign = "left"));
            var e = 4 * t,
              a = 2 * t;
            if (h.isOpen) {
              ((o.fillStyle = "rgba(0,0,0,0.6)"),
                o.fillRect(0, n * t - 25 * t, i.width, n * t));
              var l = n * t - 7 * t;
              ((o.fillStyle = "rgb(63,63,63)"),
                o.fillText("> " + s, e + a, l + a),
                (o.fillStyle = "rgb(255,255,255)"),
                o.fillText("> " + s, e, l));
            }
            e = 0;
            for (var u = 1, d = c.length - 1; d >= 0; d--)
              if (!c[d].isOld || h.isOpen) {
                if (u > r) break;
                var f = "",
                  p = "rgb(255,255,255)";
                switch (c[d].type) {
                  case "message":
                    f = c[d].from + ": " + c[d].message;
                    break;
                  case "left":
                    ((f = c[d].from + " left the game"),
                      (p = "rgb(255,255,64)"));
                    break;
                  case "joined":
                    ((f = c[d].from + " joined the game"),
                      (p = "rgb(255,255,64)"));
                    break;
                  case "local":
                    ((f = c[d].message), (p = "rgb(255,255,64)"));
                }
                var m = n * t - 25 * t - 15 * u++ * t;
                ((o.fillStyle = "rgb(63,63,63)"),
                  o.fillText(f, e + a, m + a),
                  (o.fillStyle = p),
                  o.fillText(f, e, m));
              }
          },
          resize: function () {
            ((t = 2),
              window.innerHeight < 600 && (t = 1),
              (i.width = window.innerWidth - 16),
              (i.height = n * t),
              (a.style.width = i.width + "px"),
              (a.style.height = n * t + "px"),
              (o.imageSmoothingEnabled = !1),
              h.redraw());
          },
        };
      return (h.resize(), h);
    })(e);
  }
  function p(e) {
    return (
      (p =
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
      p(e)
    );
  }
  function m(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) return _(e);
      })(e) ||
      (function (e) {
        if (
          ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
          null != e["@@iterator"]
        )
          return Array.from(e);
      })(e) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return _(e, t);
          var n = {}.toString.call(e).slice(8, -1);
          return (
            "Object" === n && e.constructor && (n = e.constructor.name),
            "Map" === n || "Set" === n
              ? Array.from(e)
              : "Arguments" === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? _(e, t)
                : void 0
          );
        }
      })(e) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function _(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  function g(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      ((r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(e, v(r.key), r));
    }
  }
  function v(e) {
    var t = (function (e) {
      if ("object" != p(e) || !e) return e;
      var t = e[Symbol.toPrimitive];
      if (void 0 !== t) {
        var n = t.call(e, "string");
        if ("object" != p(n)) return n;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(e);
    })(e);
    return "symbol" == p(t) ? t : t + "";
  }
  (Object.defineProperty(f, "name", { value: "default", configurable: !0 }),
    (window.BABYLON = __webpack_require__(67828)),
    (window.safeRequestPointerLock = function (e) {
      if (
        e &&
        "function" == typeof e.requestPointerLock &&
        document.pointerLockElement !== e &&
        ("undefined" == typeof navigator ||
          !navigator.userActivation ||
          !1 !== navigator.userActivation.isActive)
      )
        try {
          var t = e.requestPointerLock();
          t && "function" == typeof t.then && t.catch(function () {});
        } catch (e) {}
    }));
  var y = (function () {
    function e() {
      return (
        (function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
        e.instance || (e.instance = this),
        e.instance
      );
    }
    return (
      (t = e),
      (n = [
        {
          key: "initialize",
          value: function (e) {
            var t = this;
            ((this.playerSpawned = !1),
              (this.worldGenerated = !1),
              (this.worldInitialized = !1),
              (this.client = null),
              (this.network = e.network));
            var n = __webpack_require__(37119),
              r = __webpack_require__(34898);
            this.soundPlayer = __webpack_require__(44879)();
            var i,
              o = __webpack_require__(38840),
              a = __webpack_require__(187),
              s = __webpack_require__(67343),
              l = __webpack_require__(41244),
              c = __webpack_require__(88243),
              u = __webpack_require__(57695),
              h = o(),
              p = 32,
              _ = 128,
              g = null,
              v = !1,
              y = !1,
              b = this;
            if (Math.round(e.seed) == e.seed) {
              this.player = void 0 !== e.player ? e.player : null;
              var S = new URLSearchParams(window.location.search),
                T = S.get("size");
              if (
                ("small" == T && (_ = 128),
                "normal" == T && (_ = 256),
                "huge" == T && (_ = 512),
                d.A.getInstance().gameSaved()
                  ? (_ = d.A.getInstance().getWorldSize())
                  : d.A.getInstance().setWorldSize(_),
                "undefined" != typeof Worker)
              ) {
                if (void 0 === E) {
                  var E = new Worker("assets/js/RandomLevelWorker.js");
                  (E.postMessage({ worldSize: _, seed: e.seed }), h.show());
                }
                E.onmessage = function (e) {
                  var t = e.data;
                  ((h.task = t.string),
                    (h.percent = t.percent),
                    h.tick(),
                    null != t.tiles &&
                      ((g = t.tiles),
                      (b.worldGenerated = !0),
                      null == b.client
                        ? d.A.getInstance().gameSaved()
                          ? (b.syncSavedWorld(), pe())
                          : pe()
                        : b.client &&
                          (b.hostInfo
                            ? b.hostInfo.numberOfChangedBlocks <= 0
                              ? pe()
                              : b.client.broadcast({
                                  type: "requestChanges",
                                  from: b.client.state.changedBlocks.length,
                                })
                            : pe())));
                };
              } else console.log("No worker support.");
              var x = 0.5 * _,
                P = 3e3,
                A = {
                  chunkSize: p,
                  chunkAddDistance: 7,
                  chunkRemoveDistance: 8,
                  blockTestDistance: 6,
                  playerStart: [x + 0.5, 48, x + 0.5],
                  playerHeight: 1.8,
                  texturePath: "assets/textures/",
                  useAO: !1,
                  stickyPointerLock: !0,
                };
              this.lightDepths = new Array(_);
              for (var C = 0; C < _; C++) this.lightDepths[C] = new Array(_);
              var R = {
                  music: !1,
                  sound: !0,
                  invert: !1,
                  fps: !1,
                  drawDistance: 0,
                  forward: "W",
                  left: "A",
                  backward: "S",
                  right: "D",
                  jump: "<space>",
                  build: "B",
                  chat: "T",
                  fog: "F",
                  saveLoc: "<enter>",
                  loadLoc: "R",
                  username: "",
                },
                I = JSON.parse(localStorage.getItem("settings"));
              null == I || I.back || (R = I);
              var O = {
                forward: R.forward,
                left: R.left,
                backward: R.backward,
                right: R.right,
                fire: "<mouse 1>",
                "mid-fire": "<mouse 2>",
                "alt-fire": "<mouse 3>",
                jump: R.jump,
                build: R.build,
                chat: R.chat,
                fog: R.fog,
                saveLoc: R.saveLoc,
                loadLoc: R.loadLoc,
                spawnSteve: "G",
              };
              ((A.bindings = O),
                (A.settings = R),
                (this.soundPlayer.musicOn = R.music),
                (this.soundPlayer.soundOn = R.sound));
              var M = n(A);
              (M.setPaused(!0),
                (M.worldSize = _),
                (M.worldHeight = 64),
                (M.waterLevel = 30),
                (M.time = 0),
                (M.rendering._camera.minZ = 0.1),
                (M.rendering._camera.fov = (70 * Math.PI) / 180),
                (M.rendering._scene.fogColor = new BABYLON.Color3(
                  0.9,
                  0.95,
                  1,
                )),
                (M.rendering._scene.fogMode = BABYLON.Scene.FOGMODE_EXP2),
                (M.rendering._scene.fogDensity = 0.002),
                (M.rendering._scene.clearColor = M.rendering._scene.fogColor),
                this.hostInfo
                  ? (M.hostInfo = this.hostInfo)
                  : (M.hostInfo = {
                      maxPlayers: this.player.network.maxPlayers,
                    }));
              var D = a(M),
                N = s(D),
                L = l(M, e.singlePlayer),
                F = u(M);
              this.addParticles = r(M);
              var w = D.currentId - 1;
              (M.on("tick", function (e) {
                if (
                  ((M.time += e),
                  null != b.player && null == i.player && (i.player = b.player),
                  i && i.tick(),
                  F && F.isOpen && F.tick(),
                  V && (V.material.diffuseTexture.uOffset = 2e-7 * M.time),
                  b.steveArray)
                )
                  for (var t = 0; t < b.steveArray.length; t++) {
                    var n = b.steveArray[t];
                    (n.tick(e),
                      n.state.shouldRemove &&
                        (n.remove(), (b.steveArray.splice(t, 1)[0] = null)));
                  }
                !(function () {
                  if (M.time > ie + re) {
                    var e = oe.slice();
                    oe.length = 0;
                    for (var t = 0; t < e.length; t++) {
                      var n;
                      (n = i = e[t]).func.apply(n, m(i.args));
                    }
                    ie = M.time;
                  }
                  if (M.time > le + se) {
                    for (
                      e = ce.slice(), ce.length = 0, t = 0;
                      t < e.length;
                      t++
                    ) {
                      var r, i;
                      (r = i = e[t]).func.apply(r, m(i.args));
                    }
                    le = M.time;
                  }
                })();
              }),
                (this.getBrightness = function (e, t, n) {
                  return e < 0 || t < 0 || n < 0 || e >= _ - 1 || n >= _ - 1
                    ? t >= 30
                      ? 1
                      : 0.6
                    : t >= b.lightDepths[e][n] + 1
                      ? 1
                      : 0.6;
                }),
                (M.getBrightness = this.getBrightness),
                (this.addBlockCheckLit = function (e, t, n) {
                  var r = this.lightDepths[e][n];
                  if (t >= r) {
                    if (Math.floor(t / p) != Math.floor(r / p)) {
                      var i = M.world.getBlockID(e, r, n);
                      (M.world.setBlockID(0, e, r, n),
                        M.world.setBlockID(i, e, r, n));
                    }
                    this.lightDepths[e][n] = t;
                  }
                }),
                (this.removeBlockCheckLit = function (e, t, n) {
                  var r = this.lightDepths[e][n];
                  if (t >= r) {
                    for (
                      var i = 0, o = t;
                      (0 == i ||
                        i == this.redflowerID ||
                        i == this.yellowflowerID ||
                        i == this.bushID ||
                        i == this.redmushroomID ||
                        i == this.brownmushroomID ||
                        i == this.glassID ||
                        i == this.leafID ||
                        i == this.emptySpongeID) &&
                      o >= 0;
                    )
                      ((o -= 1), (i = M.world.getBlockID(e, o, n)));
                    return (
                      Math.floor(o / p) != Math.floor(r / p) &&
                        (M.world.setBlockID(0, e, o, n),
                        M.world.setBlockID(i, e, o, n)),
                      (this.lightDepths[e][n] = o),
                      1
                    );
                  }
                  return 0.6;
                }));
              var B = function () {
                  var e = !1;
                  if (
                    (b.hostInfo &&
                      null != b.hostInfo.spawnPoint &&
                      null != b.hostInfo.spawnPoint &&
                      (e = !0),
                    e)
                  )
                    M.entities.setPosition(
                      M.playerEntity,
                      b.hostInfo.spawnPoint.x,
                      b.hostInfo.spawnPoint.y,
                      b.hostInfo.spawnPoint.z,
                    );
                  else {
                    for (var t = 0, n = 0; t < 30 && n < 50;) {
                      var r =
                          Math.floor(x - _ / 4 + Math.random() * (_ / 2)) + 0.5,
                        i =
                          Math.floor(x - _ / 4 + Math.random() * (_ / 2)) + 0.5,
                        o = M.pick([r, 100, i], [0, -1, 0], 1e3, !0);
                      (null != o && (t = o.position[1]), ++n);
                    }
                    if (n >= 50) return void setTimeout(B, 100);
                    M.entities.setPosition(
                      M.playerEntity,
                      o.position[0],
                      o.position[1] + 1,
                      o.position[2],
                    );
                  }
                  (h.hide(),
                    b.updateResetPosition(),
                    (b.playerSpawned = !0),
                    setTimeout(function () {
                      M.entities.setPhysicsInterpolation(M.playerEntity, !0);
                    }, 100));
                },
                V = __webpack_require__(89495)(M),
                U =
                  (__webpack_require__(75265)(M),
                  __webpack_require__(32006)(M, p),
                  __webpack_require__(71268)),
                G = __webpack_require__(9210),
                k = [
                  "grass",
                  "dirt",
                  "grass_dirt",
                  "stone",
                  "wood",
                  "rock",
                  "bedrock",
                  "sand",
                  "gravel",
                  "tree_top",
                  "tree_side",
                  "lava",
                  "rock_gold",
                  "rock_bronze",
                  "rock_coal",
                  "gold",
                  "sponge",
                  "color0",
                  "color1",
                  "color2",
                  "color3",
                  "color4",
                  "color5",
                  "color6",
                  "color7",
                  "color8",
                  "color9",
                  "color10",
                  "color11",
                  "color12",
                  "color13",
                  "color14",
                  "color15",
                ],
                z = [
                  "leaves_opaque",
                  "glass",
                  "water",
                  "bush",
                  "red_flower",
                  "yellow_flower",
                  "red_mushroom",
                  "brown_mushroom",
                ];
              for (C = 0; C < k.length; C++) {
                var W = null;
                ("lava" == (H = k[C]) && (W = [0.4, 0, 0, 0.95]),
                  M.registry.registerMaterial(H, W, H + ".png"));
              }
              for (C = 0; C < z.length; C++) {
                var H;
                ((W = null),
                  "water" == (H = z[C]) && (W = [0, 0, 0.4, 0.85]),
                  M.registry.registerMaterial(H, W, H + ".png", !0));
              }
              M.registry.registerMaterial(
                "empty_sponge",
                [0, 0, 0, 0],
                null,
                !0,
              );
              var Y,
                X = [],
                j = [null, null, null, 8, 5, 6, 15, 16];
              for (C = 3; C < 8; C++) {
                var q = z[C],
                  K = U(M);
                (((Y = M.rendering.makeStandardMaterial(
                  q + "Mat",
                )).diffuseTexture = new BABYLON.Texture(
                  "assets/textures/" + q + ".png",
                  scene,
                  !0,
                  !0,
                  1,
                )),
                  (Y.diffuseTexture.hasAlpha = !0),
                  (Y.diffuseTexture.getAlphaFromRGB = !0),
                  (K.material = Y));
                var Z = j[C],
                  Q = M.registry.registerBlock(Z, {
                    material: [null, q, null, null, null, null],
                    opaque: !1,
                    blockMesh: K,
                  });
                X.push(Q);
              }
              for (
                this.grassID = M.registry.registerBlock(1, {
                  material: ["grass", "dirt", "grass_dirt"],
                }),
                  this.stoneID = M.registry.registerBlock(2, {
                    material: "stone",
                  }),
                  this.dirtID = M.registry.registerBlock(3, {
                    material: "dirt",
                  }),
                  this.woodID = M.registry.registerBlock(4, {
                    material: "wood",
                  }),
                  this.redflowerID = X[1],
                  this.yellowflowerID = X[2],
                  this.waterID = M.registry.registerBlock(7, {
                    material: "water",
                    opaque: !1,
                    solid: !1,
                    fluid: !0,
                    fluidDensity: 1,
                    viscosity: 0.5,
                  }),
                  this.bushID = X[0],
                  this.rockID = M.registry.registerBlock(9, {
                    material: "rock",
                  }),
                  this.bedrockID = M.registry.registerBlock(10, {
                    material: "bedrock",
                  }),
                  this.sandID = M.registry.registerBlock(11, {
                    material: "sand",
                  }),
                  this.gravelID = M.registry.registerBlock(12, {
                    material: "gravel",
                  }),
                  this.treeID = M.registry.registerBlock(13, {
                    material: ["tree_top", "tree_top", "tree_side"],
                  }),
                  this.leafID = M.registry.registerBlock(14, {
                    material: "leaves_opaque",
                    opaque: !1,
                  }),
                  this.redmushroomID = X[3],
                  this.brownmushroomID = X[4],
                  this.lavaID = M.registry.registerBlock(17, {
                    material: "lava",
                    solid: !1,
                    fluid: !0,
                    fluidDensity: 1,
                    viscosity: 0.5,
                  }),
                  this.rockGoldID = M.registry.registerBlock(18, {
                    material: "rock_gold",
                  }),
                  this.rockbronzeID = M.registry.registerBlock(19, {
                    material: "rock_bronze",
                  }),
                  this.rockcoalID = M.registry.registerBlock(20, {
                    material: "rock_coal",
                  }),
                  this.goldID = M.registry.registerBlock(21, {
                    material: "gold",
                  }),
                  this.spongeID = M.registry.registerBlock(22, {
                    material: "sponge",
                  }),
                  this.glassID = M.registry.registerBlock(23, {
                    material: "glass",
                    opaque: !1,
                  }),
                  this.colorBlockArray = [],
                  C = 0;
                C < 16;
                C++
              ) {
                var J = M.registry.registerBlock(24 + C, {
                  material: "color" + C,
                });
                this.colorBlockArray.push(J);
              }
              for (
                this.emptySpongeID = M.registry.registerBlock(40, {
                  material: "empty_sponge",
                  opaque: !1,
                  solid: !1,
                }),
                  K = G(M),
                  (Y = M.rendering.makeStandardMaterial(
                    q + "Mat",
                  )).diffuseTexture = M.waterTexture,
                  Y.alpha = 0.85,
                  Y.useAlphaFromDiffuseTexture = !0,
                  Y.backFaceCulling = !1,
                  Y.disableLighting = !0,
                  Y.emissiveColor = new BABYLON.Color3(0.6, 0.6, 0.6),
                  K.material = Y,
                  this.waterHackID = M.registry.registerBlock(41, {
                    material: [null, "water", null, null, null, null],
                    opaque: !1,
                    solid: !1,
                    fluid: !0,
                    fluidDensity: 1,
                    viscosity: 0.5,
                    blockMesh: K,
                  }),
                  this.soundArray = [
                    null,
                    { id: "grass", volume: 0.9, pitch: 1 },
                    { id: "stone", volume: 1, pitch: 1 },
                    { id: "grass", volume: 0.8, pitch: 1 },
                    { id: "wood", volume: 1, pitch: 1 },
                    null,
                    null,
                    null,
                    null,
                    { id: "stone", volume: 1, pitch: 1 },
                    null,
                    { id: "gravel", volume: 0.8, pitch: 1 },
                    { id: "gravel", volume: 0.8, pitch: 1 },
                    { id: "wood", volume: 1, pitch: 1 },
                    { id: "grass", volume: 1, pitch: 0.4 },
                    null,
                    null,
                    null,
                    { id: "stone", volume: 1, pitch: 1 },
                    { id: "stone", volume: 1, pitch: 1 },
                    { id: "stone", volume: 1, pitch: 1 },
                    { id: "metal", volume: 0.7, pitch: 1 },
                    { id: "cloth", volume: 1, pitch: 0.9 },
                    { id: "metal", volume: 1, pitch: 1 },
                    { id: "cloth", volume: 1, pitch: 1 },
                    { id: "cloth", volume: 1, pitch: 1 },
                    { id: "cloth", volume: 1, pitch: 1 },
                    { id: "cloth", volume: 1, pitch: 1 },
                    { id: "cloth", volume: 1, pitch: 1 },
                    { id: "cloth", volume: 1, pitch: 1 },
                    { id: "cloth", volume: 1, pitch: 1 },
                    { id: "cloth", volume: 1, pitch: 1 },
                    { id: "cloth", volume: 1, pitch: 1 },
                    { id: "cloth", volume: 1, pitch: 1 },
                    { id: "cloth", volume: 1, pitch: 1 },
                    { id: "cloth", volume: 1, pitch: 1 },
                    { id: "cloth", volume: 1, pitch: 1 },
                    { id: "cloth", volume: 1, pitch: 1 },
                    { id: "cloth", volume: 1, pitch: 1 },
                    { id: "cloth", volume: 1, pitch: 1 },
                  ],
                  this.blockArray = [
                    this.grassID,
                    this.stoneID,
                    this.dirtID,
                    this.woodID,
                    this.redflowerID,
                    this.yellowflowerID,
                    this.waterID,
                    this.bushID,
                    this.rockID,
                    this.bedrockID,
                    this.sandID,
                    this.gravelID,
                    this.treeID,
                    this.leafID,
                    this.redmushroomID,
                    this.brownmushroomID,
                    this.lavaID,
                    this.rockGoldID,
                    this.rockbronzeID,
                    this.rockcoalID,
                    this.goldID,
                    this.spongeID,
                    this.glassID,
                  ],
                  C = 0;
                C < this.colorBlockArray.length;
                C++
              )
                this.blockArray.push(this.colorBlockArray[C]);
              var $ = __webpack_require__(45364)(M, this.blockArray);
              ($.setBlock(w),
                window.addEventListener("beforeunload", function (e) {
                  !b.playerSpawned ||
                    v ||
                    y ||
                    (e.preventDefault(), (e.returnValue = ""));
                }),
                document.addEventListener("mousewheel", _e, !1),
                document.addEventListener("DOMMouseScroll", _e, !1),
                M.inputs.down.on("fire", function () {
                  if (M.targetedBlock) {
                    var e = {
                      targetedBlockBlockID: M.targetedBlock.blockID,
                      targetedBlockPosition: M.targetedBlock.position,
                      targetedBlockAdjacentPosition: M.targetedBlock.adjacent,
                      chosenBlock: w,
                      addMode: M.addMode,
                    };
                    M.addMode && (e.localPlayer = !0);
                    var t = b.handleFireEvent(e);
                    (delete e.localPlayer,
                      null != b.player && t && b.player.emitFireEvent(e));
                  }
                }),
                M.inputs.down.on("mid-fire", function () {
                  if (M.targetedBlock) {
                    var e = M.targetedBlock.blockID;
                    if (
                      e == b.rockcoalID ||
                      e == b.rockbronzeID ||
                      e == b.rockGoldID
                    )
                      return;
                    (1 == e && (e = 3), D.pick(e), (w = e - 1), $.setBlock(w));
                  }
                }),
                M.inputs.down.on("alt-fire", function () {
                  (M.addMode
                    ? (M.addMode = !1)
                    : ((M.addMode = !0), $.setBlock(w)),
                    M.resetTargetBlock(),
                    M.emit("targetBlockChanged", M.targetedBlock));
                }),
                document.addEventListener(
                  "keydown",
                  function (e) {
                    var t = e.keyCode;
                    if (
                      (8 == t && e.preventDefault(),
                      e.ctrlKey && e.preventDefault(),
                      !F.isOpen && ee)
                    )
                      if (((ee = !1), 27 == t && i.isOpen)) i.close();
                      else if (
                        (27 == t &&
                          (L.isOpen
                            ? L.close()
                            : (L.open(), N.isOpen && N.close())),
                        !L.isOpen && (!i || !i.isOpen) && t >= 49 && t <= 57)
                      ) {
                        var n = t - 49;
                        (D.setIndex(n), (w = D.currentId - 1), $.setBlock(w));
                      }
                  },
                  !1,
                ),
                document.addEventListener(
                  "keyup",
                  function (e) {
                    ee = !0;
                  },
                  !1,
                ));
              var ee = !0;
              (M.inputs.down.on("build", function (e, t) {
                L.isOpen || i.isOpen || N.open();
              }),
                M.inputs.down.on("chat", function (e, t) {
                  L.isOpen || i.isOpen || (N.isOpen && N.close(), i.open());
                }),
                M.inputs.down.on("fog", function (e, t) {
                  L.isOpen || i.isOpen || de();
                }),
                M.inputs.down.on("saveLoc", function (e, t) {
                  L.isOpen || i.isOpen || b.updateResetPosition();
                }),
                M.inputs.down.on("loadLoc", function (e, t) {
                  L.isOpen || i.isOpen || b.applyResetPosition();
                }),
                M.inputs.down.on("spawnSteve", function (e, t) {
                  L.isOpen || i.isOpen || b.spawnSteve();
                }));
              var te = !1;
              (document.addEventListener(
                "pointerlockchange",
                function (e) {
                  var t = !1;
                  (i && (t = i.isOpen),
                    null != document.pointerLockElement ||
                    !te ||
                    N.isOpen ||
                    t ||
                    F.isOpen
                      ? ((te = !0),
                        (M.inputs.state.forward = !1),
                        (M.inputs.state.backward = !1),
                        (M.inputs.state.left = !1),
                        (M.inputs.state.right = !1),
                        t && ee && i.close())
                      : L.open());
                },
                !1,
              ),
                window.addEventListener("resize", function (e) {
                  (L.resize(),
                    h.resize(),
                    F.resize(),
                    D.resize(),
                    i && i.resize(),
                    M.version && M.version.resize(),
                    N.resize());
                }),
                M.on("setPreviewBlock", function (e) {
                  ((w = e - 1), $.setBlock(w));
                }));
              var ne = {
                position: [
                  A.playerStart[0],
                  A.playerStart[1],
                  A.playerStart[2],
                ],
                rotation: [0, 0, 0],
              };
              ((this.setPlayerPosition = function (e) {
                var t = M.playerEntity;
                (M.entities.setPhysicsInterpolation(t, !1),
                  M.entities.setPosition(t, e[0], e[1] + 0.5, e[2]),
                  setTimeout(function () {
                    M.entities.setPhysicsInterpolation(t, !0);
                  }, 100));
              }),
                (this.updateResetPosition = function () {
                  var e = M.playerEntity,
                    t = M.entities.getPosition(e);
                  ((ne.position[0] = t[0]),
                    (ne.position[1] = t[1]),
                    (ne.position[2] = t[2]),
                    (ne.rotation[0] = 0),
                    (ne.rotation[1] = M.rendering._rotationHolder.rotation.y),
                    (ne.rotation[2] = 0),
                    b.applyResetPosition());
                }),
                (this.applyResetPosition = function () {
                  M.entities.setPhysicsInterpolation(M.playerEntity, !1);
                  var e = M.playerEntity;
                  (M.entities.setPosition(
                    e,
                    ne.position[0],
                    ne.position[1] + 0.5,
                    ne.position[2],
                  ),
                    (M.rendering._rotationHolder.rotation.x = ne.rotation[0]),
                    (M.rendering._rotationHolder.rotation.y = ne.rotation[1]),
                    (M.rendering._rotationHolder.rotation.z = ne.rotation[2]),
                    setTimeout(function () {
                      M.entities.setPhysicsInterpolation(M.playerEntity, !0);
                    }, 100));
                }),
                (this.steveArray = []),
                (this.spawnSteve = function () {
                  var e = M.entities.getPositionData(M.playerEntity),
                    t = __webpack_require__(86218),
                    n = e.position[0],
                    r = e.position[1] + 0.5,
                    i = e.position[2],
                    o = t(M, n, r, i);
                  b.steveArray.push(o);
                }));
              var re = 250,
                ie = 0,
                oe = [],
                ae = function (e, t) {
                  oe.push({ func: e, args: t });
                },
                se = 1500,
                le = 0,
                ce = [],
                ue = function (e, t) {
                  ce.push({ func: e, args: t });
                };
              ((this.checkWaterBelowAdd = function (e, t, n) {
                var r = this.waterID;
                (this.shouldWaterHaveSurface(e, t, n) && (r = this.waterHackID),
                  this.setBlock(r, e, t, n));
                var i = M.world.getBlockID(e - 1, t, n),
                  o = M.world.getBlockID(e + 1, t, n),
                  a = M.world.getBlockID(e, t, n + 1),
                  s = M.world.getBlockID(e, t, n - 1);
                if (i == this.waterID || i == this.waterHackID) {
                  r = this.waterID;
                  var l = M.world.getBlockID(e - 1, t + 1, n);
                  (this.shouldWaterHaveSurface(e - 1, t, n) &&
                    0 != l &&
                    (r = this.waterHackID),
                    this.setBlock(r, e - 1, t, n));
                }
                if (o == this.waterID || o == this.waterHackID) {
                  r = this.waterID;
                  var c = M.world.getBlockID(e + 1, t + 1, n);
                  (this.shouldWaterHaveSurface(e + 1, t, n) &&
                    0 != c &&
                    (r = this.waterHackID),
                    this.setBlock(r, e + 1, t, n));
                }
                if (a == this.waterID || a == this.waterHackID) {
                  r = this.waterID;
                  var u = M.world.getBlockID(e, t + 1, n + 1);
                  (this.shouldWaterHaveSurface(e, t, n + 1) &&
                    0 != u &&
                    (r = this.waterHackID),
                    this.setBlock(r, e, t, n + 1));
                }
                if (s == this.waterID || s == this.waterHackID) {
                  r = this.waterID;
                  var h = M.world.getBlockID(e, t + 1, n - 1);
                  (this.shouldWaterHaveSurface(e, t, n - 1) &&
                    0 != h &&
                    (r = this.waterHackID),
                    this.setBlock(r, e, t, n - 1));
                }
              }),
                (this.checkWaterHackBelowDestroy = function (e, t, n) {
                  M.world.getBlockID(e, t, n) == this.waterHackID &&
                    this.addBlock(this.waterID, e, t, n);
                  var r,
                    i = M.world.getBlockID(e - 1, t, n),
                    o = M.world.getBlockID(e + 1, t, n),
                    a = M.world.getBlockID(e, t, n + 1),
                    s = M.world.getBlockID(e, t, n - 1);
                  if (i == this.waterID || i == this.waterHackID) {
                    r = this.waterID;
                    var l = M.world.getBlockID(e - 1, t + 1, n);
                    (this.shouldWaterHaveSurface(e - 1, t, n) &&
                      0 != l &&
                      (r = this.waterHackID),
                      this.setBlock(r, e - 1, t, n));
                  }
                  if (o == this.waterID || o == this.waterHackID) {
                    r = this.waterID;
                    var c = M.world.getBlockID(e + 1, t + 1, n);
                    (this.shouldWaterHaveSurface(e + 1, t, n) &&
                      0 != c &&
                      (r = this.waterHackID),
                      this.setBlock(r, e + 1, t, n));
                  }
                  if (a == this.waterID || a == this.waterHackID) {
                    r = this.waterID;
                    var u = M.world.getBlockID(e, t + 1, n + 1);
                    (this.shouldWaterHaveSurface(e, t, n + 1) &&
                      0 != u &&
                      (r = this.waterHackID),
                      this.setBlock(r, e, t, n + 1));
                  }
                  if (s == this.waterID || s == this.waterHackID) {
                    r = this.waterID;
                    var h = M.world.getBlockID(e, t + 1, n - 1);
                    (this.shouldWaterHaveSurface(e, t, n - 1) &&
                      0 != h &&
                      (r = this.waterHackID),
                      this.setBlock(r, e, t, n - 1));
                  }
                }),
                (this.shouldWaterHaveSurface = function (e, t, n) {
                  var r = M.world.getBlockID(e, t + 1, n),
                    i = M.world.getBlockID(e - 1, t + 1, n),
                    o = M.world.getBlockID(e + 1, t + 1, n),
                    a = M.world.getBlockID(e, t + 1, n + 1),
                    s = M.world.getBlockID(e, t + 1, n - 1);
                  return (
                    (0 == r || 0 == i || 0 == o || 0 == a || 0 == s) &&
                    r != this.waterID &&
                    i != this.waterID &&
                    o != this.waterID &&
                    a != this.waterID &&
                    s != this.waterID &&
                    r != this.waterHackID &&
                    i != this.waterHackID &&
                    o != this.waterHackID &&
                    a != this.waterHackID &&
                    s != this.waterHackID
                  );
                }),
                (this.addWater = function (e, t, n) {
                  if (
                    e < 0 ||
                    e >= M.worldSize - 1 ||
                    n < 0 ||
                    n >= M.worldSize - 1
                  )
                    return !1;
                  var r = this.waterID,
                    i = M.world.getBlockID(e, t + 1, n);
                  if (
                    (this.shouldWaterHaveSurface(e, t, n) &&
                      0 != i &&
                      i != this.emptySpongeID &&
                      (r = this.waterHackID),
                    this.addBlock(this.waterID, e, t, n),
                    r != this.waterID)
                  ) {
                    this.addBlock(r, e, t, n);
                    var o = M.world.getBlockID(e - 1, t, n),
                      a = M.world.getBlockID(e + 1, t, n),
                      s = M.world.getBlockID(e, t, n + 1),
                      l = M.world.getBlockID(e, t, n - 1),
                      c = M.world.getBlockID(e - 1, t + 1, n),
                      u = M.world.getBlockID(e + 1, t + 1, n),
                      h = M.world.getBlockID(e, t + 1, n + 1),
                      d = M.world.getBlockID(e, t + 1, n - 1);
                    (o == this.waterID &&
                      0 != c &&
                      (M.setBlock(r, e - 1, t, n),
                      this.setBlockTilesArray(r, e - 1, t, n)),
                      a == this.waterID &&
                        0 != u &&
                        (M.setBlock(r, e + 1, t, n),
                        this.setBlockTilesArray(r, e - 1, t, n)),
                      s == this.waterID &&
                        0 != h &&
                        (M.setBlock(r, e, t, n + 1),
                        this.setBlockTilesArray(r, e - 1, t, n)),
                      l == this.waterID &&
                        0 != d &&
                        (M.setBlock(r, e, t, n - 1),
                        this.setBlockTilesArray(r, e - 1, t, n)));
                  }
                  var f = M.world.getBlockID(e, t - 1, n);
                  return (
                    f == this.grassID && this.flagToRemoveGrass(e, t - 1, n),
                    f == this.lavaID &&
                      this.setBlock(this.stoneID, e, t - 1, n),
                    f == this.waterHackID &&
                      this.setBlock(this.waterID, e, t - 1, n),
                    !0
                  );
                }),
                (this.addLava = function (e, t, n) {
                  this.addBlock(this.lavaID, e, t, n);
                  var r = M.world.getBlockID(e, t - 1, n);
                  (r == this.grassID && this.flagToRemoveGrass(e, t - 1, n),
                    r == this.waterID &&
                      this.setBlock(this.stoneID, e, t - 1, n));
                }),
                (this.checkNeighbours = function (e, t, n, r) {
                  if (
                    !(
                      e < 0 ||
                      e >= M.worldSize - 1 ||
                      n < 0 ||
                      n >= M.worldSize - 1
                    ) &&
                    0 == M.world.getBlockID(e, t, n)
                  ) {
                    var i = M.world.getBlockID(e, t + 1, n),
                      o = M.world.getBlockID(e - 1, t, n),
                      a = M.world.getBlockID(e + 1, t, n),
                      s = M.world.getBlockID(e, t, n + 1),
                      l = M.world.getBlockID(e, t, n - 1);
                    ((i != b.lavaID &&
                      o != b.lavaID &&
                      a != b.lavaID &&
                      s != b.lavaID &&
                      l != b.lavaID) ||
                      setTimeout(function () {
                        (b.addLava(e, t, n),
                          ue(b.checkNeighboursAsLava, [e, t, n]));
                      }, 1500),
                      (i != b.waterID &&
                        o != b.waterID &&
                        a != b.waterID &&
                        s != b.waterID &&
                        l != b.waterID &&
                        i != b.waterHackID &&
                        o != b.waterHackID &&
                        a != b.waterHackID &&
                        s != b.waterHackID &&
                        l != b.waterHackID) ||
                        setTimeout(function () {
                          b.addWater(e, t, n) &&
                            ae(b.checkNeighboursAsWater, [e, t, n]);
                        }, 150),
                      r &&
                        setTimeout(function () {
                          b.checkWaterHackBelowDestroy(e, t - 1, n);
                        }, 160));
                  }
                }),
                (this.checkNeighboursAsWater = function (e, t, n) {
                  if (!(
                    e <= 0 ||
                    e >= M.worldSize - 1 ||
                    n <= 0 ||
                    n >= M.worldSize - 1
                  )) {
                    var r = M.world.getBlockID(e, t - 1, n),
                      i = M.world.getBlockID(e - 1, t, n),
                      o = M.world.getBlockID(e + 1, t, n),
                      a = M.world.getBlockID(e, t, n + 1),
                      s = M.world.getBlockID(e, t, n - 1);
                    (0 == r &&
                      b.addWater(e, t - 1, n) &&
                      ae(b.checkNeighboursAsWater, [e, t - 1, n]),
                      0 == i &&
                        b.addWater(e - 1, t, n) &&
                        ae(b.checkNeighboursAsWater, [e - 1, t, n]),
                      0 == o &&
                        b.addWater(e + 1, t, n) &&
                        ae(b.checkNeighboursAsWater, [e + 1, t, n]),
                      0 == a &&
                        b.addWater(e, t, n + 1) &&
                        ae(b.checkNeighboursAsWater, [e, t, n + 1]),
                      0 == s &&
                        b.addWater(e, t, n - 1) &&
                        ae(b.checkNeighboursAsWater, [e, t, n - 1]));
                  }
                }),
                (this.checkNeighboursAsLava = function (e, t, n) {
                  if (!(
                    e < 0 ||
                    e > M.worldSize - 1 ||
                    n < 0 ||
                    n > M.worldSize - 1
                  )) {
                    var r = M.world.getBlockID(e, t - 1, n),
                      i = M.world.getBlockID(e - 1, t, n),
                      o = M.world.getBlockID(e + 1, t, n),
                      a = M.world.getBlockID(e, t, n + 1),
                      s = M.world.getBlockID(e, t, n - 1);
                    (0 == r &&
                      (b.addLava(e, t - 1, n),
                      ue(b.checkNeighboursAsLava, [e, t - 1, n])),
                      0 == i &&
                        (b.addLava(e - 1, t, n),
                        ue(b.checkNeighboursAsLava, [e - 1, t, n])),
                      0 == o &&
                        (b.addLava(e + 1, t, n),
                        ue(b.checkNeighboursAsLava, [e + 1, t, n])),
                      0 == a &&
                        (b.addLava(e, t, n + 1),
                        ue(b.checkNeighboursAsLava, [e, t, n + 1])),
                      0 == s &&
                        (b.addLava(e, t, n - 1),
                        ue(b.checkNeighboursAsLava, [e, t, n - 1])));
                  }
                }),
                (this.flagToGrowGrass = function (e, t, n) {
                  var r = 8e3 + 16e3 * Math.random();
                  setTimeout(function () {
                    if (M.world.getBlockID(e, t, n) == b.dirtID) {
                      var r = b.checkUpForBlocker(e, t, n);
                      (0 != r &&
                        r != b.redflowerID &&
                        r != b.yellowflowerID &&
                        r != b.bushID &&
                        r != b.redmushroomID &&
                        r != b.brownmushroomID &&
                        r != b.glassID &&
                        r != b.leafID) ||
                        b.setBlock(b.grassID, e, t, n);
                    }
                  }, r);
                }),
                (this.flagToRemoveGrass = function (e, t, n) {
                  var r = 8e3 + 16e3 * Math.random();
                  setTimeout(function () {
                    if (M.world.getBlockID(e, t, n) == b.grassID) {
                      var r = b.checkUpForBlocker(e, t, n);
                      0 != r &&
                        r != b.redflowerID &&
                        r != b.yellowflowerID &&
                        r != b.bushID &&
                        r != b.redmushroomID &&
                        r != b.brownmushroomID &&
                        r != b.glassID &&
                        r != b.leafID &&
                        b.setBlock(b.dirtID, e, t, n);
                    }
                  }, r);
                }),
                (this.checkBelowFoilage = function (e, t, n) {
                  var r = P + 9e3 * Math.random();
                  setTimeout(function () {
                    var r = M.world.getBlockID(e, t, n);
                    if (
                      r == b.redflowerID ||
                      r == b.yellowflowerID ||
                      r == b.bushID ||
                      r == b.redmushroomID ||
                      r == b.brownmushroomID
                    ) {
                      var i = M.world.getBlockID(e, t - 1, n);
                      i != b.grassID &&
                        i != b.dirtID &&
                        (b.setBlock(0, e, t, n),
                        ae(b.checkNeighbours, [e, t, n]));
                    }
                  }, r);
                }),
                (this.checkAboveFoilage = function (e, t, n) {
                  var r = P + 9e3 * Math.random();
                  setTimeout(function () {
                    var r = M.world.getBlockID(e, t, n);
                    if (
                      (r == b.redflowerID ||
                        r == b.yellowflowerID ||
                        r == b.bushID ||
                        r == b.redmushroomID ||
                        r == b.brownmushroomID) &&
                      b.getBrightness(e, t, n) < 1
                    ) {
                      (b.setBlock(0, e, t, n),
                        ae(b.checkNeighbours, [e, t, n]));
                      var i = M.world.getBlockID(e, t + 1, n);
                      (i != b.sandID && i != b.gravelID) ||
                        b.checkDownSandGravel(e, t + 1, n, i);
                    }
                  }, r);
                }),
                (this.checkDownForGrass = function (e, t, n) {
                  for (
                    var r = 0, i = t;
                    (0 == r ||
                      r == this.redflowerID ||
                      r == this.yellowflowerID ||
                      r == this.bushID ||
                      r == this.redmushroomID ||
                      r == this.brownmushroomID ||
                      r == this.glassID ||
                      r == this.leafID) &&
                    i >= 0;
                  )
                    ((i -= 1),
                      ((r = M.world.getBlockID(e, i, n)) != this.redflowerID &&
                        r != this.yellowflowerID &&
                        r != this.bushID &&
                        r != this.redmushroomID &&
                        r != this.brownmushroomID) ||
                        b.checkAboveFoilage(e, i, n));
                  r == this.grassID && this.flagToRemoveGrass(e, i, n);
                }),
                (this.checkDownForDirt = function (e, t, n) {
                  for (
                    var r = 0, i = t;
                    (0 == r ||
                      r == this.redflowerID ||
                      r == this.yellowflowerID ||
                      r == this.bushID ||
                      r == this.redmushroomID ||
                      r == this.brownmushroomID ||
                      r == this.glassID ||
                      r == this.leafID) &&
                    i >= 0;
                  )
                    ((i -= 1), (r = M.world.getBlockID(e, i, n)));
                  r == this.dirtID && this.flagToGrowGrass(e, i, n);
                }),
                (this.checkDownSandGravel = function (e, t, n, r) {
                  for (
                    var i = 0, o = t;
                    (0 == i ||
                      i == this.waterID ||
                      i == this.waterHackID ||
                      i == this.lavaID ||
                      i == this.emptySpongeID) &&
                    o >= 0;
                  )
                    ((o -= 1), (i = M.world.getBlockID(e, o, n)));
                  if (0 != i) {
                    (b.setBlock(0, e, t, n), b.setBlock(r, e, o + 1, n));
                    var a = M.world.getBlockID(e, t + 1, n);
                    ((a != b.sandID && a != b.gravelID) ||
                      b.checkDownSandGravel(e, t + 1, n, a),
                      b.removeBlockCheckLit(e, t, n),
                      b.checkNeighbours(e, t, n, !1));
                  }
                }),
                (this.checkUpForBlocker = function (e, t, n) {
                  for (
                    var r = 0, i = t;
                    (0 == r ||
                      r == this.redflowerID ||
                      r == this.yellowflowerID ||
                      r == this.bushID ||
                      r == this.redmushroomID ||
                      r == this.brownmushroomID ||
                      r == this.glassID ||
                      r == this.leafID) &&
                    i < 64;
                  )
                    ((i += 1), (r = M.world.getBlockID(e, i, n)));
                  return r;
                }));
              var he = {};
              ((this.updateRemainingSponges = function () {
                for (var e in he) {
                  var t = he[e];
                  b.checkAddSponge(t.x, t.y, t.z, !1);
                }
              }),
                (this.checkAddSponge = function (e, t, n, r) {
                  (r || null == r) &&
                    (he["s" + e + t + n] = { x: e, y: t, z: n });
                  for (
                    var i = Math.max(e - 2, 1),
                      o = Math.min(e + 2, _ - 3),
                      a = Math.max(n - 2, 1),
                      s = Math.min(n + 2, _ - 3),
                      l = t - 2;
                    l <= t + 2;
                    l++
                  )
                    for (var c = i; c <= o; c++)
                      for (var u = a; u <= s; u++) {
                        var h = M.world.getBlockID(c, l, u);
                        (h != b.waterID && 0 != h) ||
                          (b.setBlock(b.emptySpongeID, c, l, u),
                          b.removeBlockCheckLit(c, l, u));
                      }
                }),
                (this.checkRemoveSponge = function (e, t, n) {
                  delete he["s" + e + t + n];
                  for (
                    var r = Math.max(e - 2, 1),
                      i = Math.min(e + 2, _ - 3),
                      o = Math.max(n - 2, 1),
                      a = Math.min(n + 2, _ - 3),
                      s = t - 2;
                    s <= t + 2;
                    s++
                  )
                    for (var l = r; l <= i; l++)
                      for (var c = o; c <= a; c++) {
                        var u;
                        ((u =
                          l == e - 2 || l == e + 2 || c == n - 2 || c == n + 2),
                          M.world.getBlockID(l, s, c) == b.emptySpongeID &&
                            (b.setBlock(0, l, s, c),
                            u && ae(b.checkNeighbours, [l, s, c])));
                      }
                  b.updateRemainingSponges();
                }));
              var de = function () {
                (M.settings.drawDistance++,
                  M.settings.drawDistance > 3 && (M.settings.drawDistance = 0),
                  fe(M.settings.drawDistance),
                  M.emit("saveSettings"));
              };
              M.on("cycleDrawDistance", de);
              var fe = function (e) {
                switch (((M.settings.drawDistance = e), e)) {
                  case 0:
                    ((M.rendering.fogWorld = 0.002),
                      (M.rendering.fogWater = 0.08),
                      (M.rendering.fogLava = 0.2),
                      (M.rendering._camera.maxZ = 800));
                    break;
                  case 1:
                    ((M.rendering.fogWorld = 0.008),
                      (M.rendering.fogWater = 0.08),
                      (M.rendering.fogLava = 0.2),
                      (M.rendering._camera.maxZ = 200));
                    break;
                  case 2:
                    ((M.rendering.fogWorld = 0.05),
                      (M.rendering.fogWater = 0.1),
                      (M.rendering.fogLava = 0.2),
                      (M.rendering._camera.maxZ = 50));
                    break;
                  case 3:
                    ((M.rendering.fogWorld = 0.2),
                      (M.rendering.fogWater = 0.2),
                      (M.rendering.fogLava = 0.2),
                      (M.rendering._camera.maxZ = 10));
                }
                M.rendering._camLocBlock += 1;
              };
              (fe(M.settings.drawDistance),
                M.on("toggleMusic", function () {
                  (M.settings.music
                    ? ((M.settings.music = !1), b.soundPlayer.setMusicVolume(0))
                    : ((M.settings.music = !0),
                      b.soundPlayer.setMusicVolume(1)),
                    (b.soundPlayer.musicOn = M.settings.music),
                    M.emit("saveSettings"));
                }),
                M.on("toggleSound", function () {
                  (M.settings.sound
                    ? (M.settings.sound = !1)
                    : (M.settings.sound = !0),
                    (b.soundPlayer.soundOn = M.settings.sound),
                    M.emit("saveSettings"));
                }),
                M.on("toggleInvertMouse", function () {
                  (M.settings.invert
                    ? (M.settings.invert = !1)
                    : (M.settings.invert = !0),
                    (M.cameraControls.inverseY = M.settings.invert),
                    M.emit("saveSettings"));
                }),
                M.on("toggleFps", function () {
                  (M.settings.fps
                    ? (M.settings.fps = !1)
                    : (M.settings.fps = !0),
                    (M.version.showFps = M.settings.fps),
                    (M.version.lastRedraw = 0),
                    M.version.redraw(),
                    M.emit("saveSettings"));
                }),
                M.on("saveSettings", function () {
                  localStorage.setItem("settings", JSON.stringify(M.settings));
                }),
                setInterval(function () {
                  if (null != t.player) {
                    var e = M.entities.getPositionData(M.playerEntity),
                      n = M.rendering._rotationHolder.rotation;
                    t.player.setPosition(
                      { x: e.position[0], y: e.position[1], z: e.position[2] },
                      n,
                      t.playerSpawned,
                    );
                  }
                }, 50),
                (M.setName = function (e) {
                  b.setName && b.setName(e);
                }),
                (this.onHostDisconnect = function () {
                  y ||
                    (this.worldInitialized &&
                      (L.isOpen && L.close(),
                      i.isOpen && i.close(),
                      N.isOpen && N.close()),
                    F && F.show(3),
                    (v = !0));
                }),
                (this.onHostFull = function () {
                  F && F.show(2);
                }),
                (this.onKicked = function () {
                  ((y = !0), F && F.show(5));
                }),
                (this.addPlayer = function (e, t, n, r, i) {
                  return __webpack_require__(16223)(M, e, t, n, r, i);
                }),
                (this.getPlayerPosition = function () {
                  return M.entities.getPosition(M.playerEntity);
                }),
                (this.getPlayerRotation = function () {
                  return M.rendering._rotationHolder.rotation;
                }),
                (this.setBlock = function (e, t, n, r) {
                  var i = t.length ? t : [t, n, r];
                  (this.setBlockTilesArray(e, i),
                    M.setBlock(e, i),
                    void 0 !== this.changedBlockHandler &&
                      null !== this.changedBlockHandler &&
                      this.changedBlockHandler.setBlock(i, e));
                }),
                (this.addBlock = function (e, t, n, r) {
                  var i = t.length ? t : [t, n, r],
                    o = !!t.length && n;
                  return (
                    this.setBlockTilesArray(e, i),
                    !!M.addBlock(e, i, o) &&
                      (void 0 !== this.changedBlockHandler &&
                        null !== this.changedBlockHandler &&
                        this.changedBlockHandler.addBlock(i, e),
                      e != this.leafID &&
                        e != this.glassID &&
                        e != this.redflowerID &&
                        e != this.yellowflowerID &&
                        e != this.bushID &&
                        e != this.redmushroomID &&
                        e != this.brownmushroomID &&
                        this.addBlockCheckLit(i[0], i[1], i[2]),
                      !0)
                  );
                }),
                (this.handleChangedBlocks = function (e) {
                  for (var t in e) {
                    var n = e[t];
                    (this.setBlockTilesArray(n.bt, n.p),
                      this.worldInitialized &&
                        (n.add
                          ? this.addBlock(n.bt, n.p)
                          : (this.setBlock(n.bt, n.p),
                            0 == n.bt &&
                              this.removeBlockCheckLit(
                                n.p[0],
                                n.p[1],
                                n.p[2],
                              ))));
                  }
                  this.worldGenerated && !this.worldInitialized && pe();
                }),
                (this.syncSavedWorld = function () {
                  var e = d.A.getInstance().getChangedBlocks();
                  for (var t in e) {
                    var n = e[t];
                    this.setBlockTilesArray(n.bt, n.p);
                  }
                }),
                (this.setBlockTilesArray = function (e, t, n, r) {
                  if (g) {
                    var i = t.length ? t : [t, n, r];
                    g[(i[1] * _ + i[2]) * _ + i[0]] = e;
                  }
                }),
                (this.updateChatLog = function (e) {
                  void 0 !== i && i.update(e);
                }));
            } else console.log("seed must be an integer.");
            function pe() {
              (!(function () {
                for (var e = 0; e < _; ++e)
                  for (var t = 0; t < 64; ++t)
                    for (var n = 0; n < _; ++n) {
                      var r = e,
                        i = t,
                        o = n,
                        a = g[(i * _ + o) * _ + r],
                        s = 0;
                      (null != b.lightDepths[r][o] && (s = b.lightDepths[r][o]),
                        0 != a &&
                          a != b.redflowerID &&
                          a != b.yellowflowerID &&
                          a != b.bushID &&
                          a != b.redmushroomID &&
                          a != b.brownmushroomID &&
                          a != b.glassID &&
                          a != b.leafID &&
                          a != b.emptySpongeID &&
                          i >= s &&
                          (s = i),
                        (b.lightDepths[r][o] = s));
                    }
              })(),
                M.world.on("worldDataNeeded", me),
                M.setPaused(!1),
                (i = f(M)),
                (M.version = c()),
                (M.version.showFps = M.settings.fps),
                M.entities.setPhysicsInterpolation(M.playerEntity, !1),
                setTimeout(B, 100),
                (b.worldInitialized = !0),
                M.hostInfo.gameFull && (L.isOpen && L.close(!0), F.show(2)),
                null != S.get("host")
                  ? (L.isOpen && L.close(!0),
                    b.noWebrtcJoin ? F.show(6) : F.show(0))
                  : null != S.get("join") &&
                    (L.isOpen && L.close(!0), F.show(1)));
            }
            function me(e, t, n, r, i) {
              var o = e.split("|"),
                a = parseInt(o[0], 10),
                s = parseInt(o[1], 10),
                l = parseInt(o[2], 10),
                c = a * p,
                u = s * p,
                h = l * p,
                d = !1;
              if (
                ((a < 0 || s < 0 || l < 0) && (d = !0),
                (a >= _ / p || s >= 2 || l >= _ / p) && (d = !0),
                d)
              ) {
                for (var f = b.bedrockID, m = 0; m < t.shape[0]; ++m)
                  for (var v = 0; v < t.shape[1]; ++v)
                    for (var y = 0; y < t.shape[2]; ++y)
                      ((f = 0),
                        (S = v - 1 + u) <= 30 && (f = b.waterID),
                        S <= 28 && (f = b.bedrockID),
                        t.set(m, v, y, f));
                M.world.setChunkData(e, t);
              } else {
                for (f = b.bedrockID, m = 0; m < t.shape[0]; ++m)
                  for (v = 0; v < t.shape[1]; ++v)
                    for (y = 0; y < t.shape[2]; ++y) {
                      var S,
                        T = m - 1 + c,
                        E = y - 1 + h;
                      ((null != (f = g[((S = v - 1 + u) * _ + E) * _ + T]) &&
                        0 != S) ||
                        (f = b.bedrockID),
                        (T < 0 || E < 0 || m + c >= _ || y + h >= _) &&
                          ((f = 0),
                          S <= 30 && (f = b.waterID),
                          S <= 28 && (f = b.bedrockID)),
                        t.set(m, v, y, f));
                    }
                M.world.setChunkData(e, t);
              }
            }
            function _e(e) {
              e.ctrlKey && e.preventDefault();
            }
          },
        },
        {
          key: "handleFireEvent",
          value: function (e) {
            var t = e.targetedBlockBlockID,
              n = e.targetedBlockPosition,
              r = e.targetedBlockAdjacentPosition,
              i = e.addMode,
              o = e.chosenBlock,
              a = e.localPlayer;
            if ("undefined" == typeof noa)
              return (
                i
                  ? this.setBlockTilesArray(this.blockArray[o], r)
                  : this.setBlockTilesArray(0, n),
                !1
              );
            if (i) {
              if (r[1] >= noa.worldHeight) return !1;
              var s = noa.world.getBlockID(r[0], r[1], r[2]);
              if (!this.addBlock(this.blockArray[o], r, a)) return !1;
              var l = this.blockArray[o];
              return (
                l == this.dirtID && this.flagToGrowGrass(r[0], r[1], r[2]),
                this.checkDownForGrass(r[0], r[1], r[2]),
                ((v = noa.world.getBlockID(r[0], r[1] - 1, r[2])) !=
                  this.waterID &&
                  v != this.waterHackID) ||
                  0 != s ||
                  this.checkWaterBelowAdd(r[0], r[1] - 1, r[2]),
                (l != this.sandID && l != this.gravelID) ||
                  this.checkDownSandGravel(r[0], r[1], r[2], l),
                l == this.spongeID && this.checkAddSponge(r[0], r[1], r[2]),
                (l != this.redflowerID &&
                  l != this.yellowflowerID &&
                  l != this.bushID &&
                  l != this.redmushroomID &&
                  l != this.brownmushroomID) ||
                  (v != this.dirtID &&
                    v != this.grassID &&
                    this.checkBelowFoilage(r[0], r[1], r[2]),
                  this.checkAboveFoilage(r[0], r[1], r[2])),
                !0
              );
            }
            if (t != this.bedrockID) {
              var c = noa.registry.getBlockFaceMaterialAccessor()(t, 0),
                u = noa.registry._textures[c];
              this.setBlock(0, n);
              var h = n,
                d = this.removeBlockCheckLit(h[0], h[1], h[2]),
                f = new BABYLON.Vector3(h[0], h[1], h[2]),
                p = BABYLON.Vector3.Distance(
                  noa.rendering._cameraHolder.position,
                  f,
                );
              (null != u &&
                p < 15 &&
                this.addParticles("debris", u, d).mesh.position.copyFromFloats(
                  h[0] + 0.5,
                  h[1] + 0.5,
                  h[2] + 0.5,
                ),
                this.checkDownForDirt(n[0], n[1], n[2]),
                t == this.spongeID && this.checkRemoveSponge(n[0], n[1], n[2]));
              var m = noa.world.getBlockID(h[0], h[1] + 1, h[2]);
              ((t != this.dirtID && t != this.grassID) ||
                (m != this.redflowerID &&
                  m != this.yellowflowerID &&
                  m != this.bushID &&
                  m != this.redmushroomID &&
                  m != this.brownmushroomID) ||
                this.checkBelowFoilage(n[0], n[1] + 1, n[2]),
                (m != this.sandID && m != this.gravelID) ||
                  this.checkDownSandGravel(n[0], n[1] + 1, n[2], m));
              var _ = this.soundArray[t];
              if (null != _ && p < 15) {
                var g = 1 - p / 25;
                this.soundPlayer.play(_.id, _.volume * g, _.pitch);
              }
              var v,
                y = !1;
              return (
                ((v = noa.world.getBlockID(h[0], h[1] - 1, h[2])) !=
                  this.waterID &&
                  v != this.waterHackID) ||
                  (y = !0),
                this.checkNeighbours(n[0], n[1], n[2], y),
                !0
              );
            }
          },
        },
        {
          key: "setChangedBlockHandler",
          value: function (e) {
            this.changedBlockHandler = e;
          },
        },
        {
          key: "setPlayer",
          value: function (e) {
            this.player = e;
          },
        },
        {
          key: "setHostInfo",
          value: function (e) {
            if (
              ((this.hostInfo = e),
              this.hostInfo.gameFull || this.hostInfo.noSuchGame)
            ) {
              if (!t) var t = __webpack_require__(57695)({});
              (this.hostInfo.noSuchGame
                ? (t.show(4), (document.body.style.overflow = "hidden"))
                : t.show(2),
                window.addEventListener("resize", function (e) {
                  t.resize();
                }));
            }
          },
        },
        {
          key: "getPlayerNames",
          value: function () {
            return this.network.getSpawnedPlayerNames();
          },
        },
        {
          key: "kickPlayer",
          value: function (e) {
            return this.network.kickPlayer(e);
          },
        },
        {
          key: "teleportToPlayer",
          value: function (e) {
            for (var t in this.network.state.players)
              if (this.network.state.players[t].state.name === e) {
                var n = this.network.state.players[t].state.position;
                return (
                  noa.entities.setPhysicsInterpolation(noa.playerEntity, !1),
                  noa.entities.setPosition(noa.playerEntity, n.x, n.y, n.z),
                  setTimeout(function () {
                    noa.entities.setPhysicsInterpolation(noa.playerEntity, !0);
                  }, 100),
                  "Teleporting to " + e + " " + JSON.stringify(n)
                );
              }
            return "No such player";
          },
        },
        {
          key: "setSpawn",
          value: function () {
            return this.network.setSpawnToCurrentPosition();
          },
        },
        {
          key: "teleportTo",
          value: function (e) {
            var t = this.network.getPositionFor(e);
            return null === t
              ? e + ": no such player"
              : (this.setPlayerPosition([t.x, t.y, t.z]), "teleported to " + e);
          },
        },
      ]),
      (r = [
        {
          key: "getInstance",
          value: function () {
            return (
              void 0 === e.instance && (e.instance = new e()),
              e.instance
            );
          },
        },
      ]),
      n && g(t.prototype, n),
      r && g(t, r),
      Object.defineProperty(t, "prototype", { writable: !1 }),
      t
    );
    var t, n, r;
  })();
  const b = y;
  function S(e) {
    return (
      (S =
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
      S(e)
    );
  }
  function T(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      ((r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(e, E(r.key), r));
    }
  }
  function E(e) {
    var t = (function (e) {
      if ("object" != S(e) || !e) return e;
      var t = e[Symbol.toPrimitive];
      if (void 0 !== t) {
        var n = t.call(e, "string");
        if ("object" != S(n)) return n;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(e);
    })(e);
    return "symbol" == S(t) ? t : t + "";
  }
  const x = (function () {
    return (
      (e = function e(t, n) {
        (!(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          void 0 === e.id && (e.id = 1e4),
          (this.isClient = t.isClient),
          (this.isSelf = void 0 !== t.isSelf && t.isSelf),
          (this.network = void 0 !== t.network ? t.network : null),
          this.initializeState(t),
          (this.positionCallback = "function" == typeof n ? n : null),
          (this.id = e.id += 1),
          !0 === this.isClient && this.sendJoined());
      }),
      (t = [
        {
          key: "initializeState",
          value: function (e) {
            ((this.state = {
              name: e.name,
              position: { x: 0, y: 0, z: 0 },
              rotation: { x: 0, y: 0, z: 0 },
              walking: !1,
              spawned: !1,
            }),
              (this.peer = e.peer));
          },
        },
        {
          key: "setPosition",
          value: function (e, t, n) {
            ((this.state.walking =
              e.x !== this.state.position.x || e.z !== this.state.position.z),
              (this.state.position = e),
              (this.state.rotation = t),
              (this.state.spawned = n),
              this.positionCallback && this.positionCallback(this.state));
          },
        },
        {
          key: "setState",
          value: function (e) {
            var t = this.state.name !== e.name;
            ((this.state.position = e.position),
              (this.state.rotation = e.rotation),
              (this.state.walking = e.walking),
              (this.state.spawned = e.spawned),
              (this.state.name = e.name),
              (void 0 === this.noaPlayer || t) &&
                this.state.spawned &&
                (void 0 !== this.noaPlayer && this.noaPlayer.remove(),
                (this.noaPlayer = b
                  .getInstance()
                  .addPlayer(0, 0, 0, this.state.name, this.id))),
              void 0 !== this.noaPlayer &&
                (this.noaPlayer.setPosition(
                  e.position.x,
                  e.position.y,
                  e.position.z,
                ),
                this.noaPlayer.setRotation(0, e.rotation.y, 0),
                (this.noaPlayer.walking = e.walking)));
          },
        },
        {
          key: "sendJoined",
          value: function () {
            null != this.network && this.network.sendJoined(this.state.name);
          },
        },
        {
          key: "sendMessage",
          value: function (e) {
            null != this.network && this.network.sendMessage(e);
          },
        },
        {
          key: "emitFireEvent",
          value: function (e) {
            null != this.network && this.network.emitFireEvent(e);
          },
        },
      ]) && T(e.prototype, t),
      Object.defineProperty(e, "prototype", { writable: !1 }),
      e
    );
    var e, t;
  })();
  var P = __webpack_require__(92629);
  function A(e) {
    return (
      (A =
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
      A(e)
    );
  }
  function C(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      (t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r));
    }
    return n;
  }
  function R(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? C(Object(n), !0).forEach(function (t) {
            I(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : C(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t),
              );
            });
    }
    return e;
  }
  function I(e, t, n) {
    return (
      (t = M(t)) in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function O(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      ((r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(e, M(r.key), r));
    }
  }
  function M(e) {
    var t = (function (e) {
      if ("object" != A(e) || !e) return e;
      var t = e[Symbol.toPrimitive];
      if (void 0 !== t) {
        var n = t.call(e, "string");
        if ("object" != A(n)) return n;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(e);
    })(e);
    return "symbol" == A(t) ? t : t + "";
  }
  const D = (function () {
    return (
      (e = function e(t) {
        var n = this;
        (!(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          (this.maxChangesPerSync = 1e3),
          this.initializeState(t),
          (this.maxPlayers = 10),
          (this.lastUpdate = 0),
          (this.changedBlocks = []));
        var r = this;
        ((this.changedBlockHandler = {
          setBlock: function (e, t) {
            var n = { add: !1, p: e.slice(), bt: t };
            (d.A.getInstance().addBlockChange(n), r.changedBlocks.push(n));
          },
          addBlock: function (e, t) {
            var n = { add: !0, p: e.slice(), bt: t };
            (d.A.getInstance().addBlockChange(n), r.changedBlocks.push(n));
          },
        }),
          setInterval(function () {
            n.update();
          }, 50));
      }),
      (t = [
        {
          key: "update",
          value: function () {
            (new Date(), this.lastUpdate, this.broadcastPlayers());
          },
        },
        {
          key: "initializeState",
          value: function (e) {
            var t = {},
              n = new x({
                name: e.name,
                network: this,
                isClient: !1,
                peer: { send: function () {} },
              });
            ((t[e.name] = n),
              (this.state = {
                name: e.name,
                players: t,
                code: null,
                gameStarted: !1,
                game: e.game,
                seed: e.seed,
                chatLog: [],
                spawnPoint: null,
              }),
              (this.hostPlayer = n));
          },
        },
        {
          key: "setName",
          value: function (e) {
            ((this.getPlayer().state.name = e), (this.state.name = e));
          },
        },
        {
          key: "getPlayer",
          value: function () {
            return this.hostPlayer;
          },
        },
        {
          key: "copyPlayers",
          value: function () {
            return Object.assign({}, this.state.players);
          },
        },
        {
          key: "playersToArray",
          value: function () {
            var e = [];
            for (var t in this.state.players)
              e.push({
                name: t,
                peer: this.state.players[t].peer,
                state: this.state.players[t].state,
              });
            return e;
          },
        },
        {
          key: "getSpawnedPlayerNames",
          value: function () {
            var e = [];
            for (var t in this.state.players)
              this.state.players[t].state.spawned &&
                e.push(this.state.players[t].state.name);
            return e;
          },
        },
        {
          key: "kickPlayer",
          value: function (e) {
            if (this.state.name === e) return "No kicking yourself";
            for (var t in this.state.players)
              if (this.state.players[t].state.name === e) {
                var n = {
                  message: "kicking " + e,
                  timestamp: +new Date(),
                  type: "message",
                  from: this.state.name,
                };
                return (
                  this.handleMessage(n),
                  this.broadcastPlayer(t, { type: "kicked" }),
                  this.state.players[t].peer.destroy(),
                  "Kicking " + e
                );
              }
            return "No such player";
          },
        },
        {
          key: "setSpawnToCurrentPosition",
          value: function () {
            return (
              (this.state.spawnPoint = this.hostPlayer.state.position),
              "Spawn point set to " +
                JSON.stringify(this.hostPlayer.state.position)
            );
          },
        },
        {
          key: "getPositionFor",
          value: function (e) {
            for (var t in this.state.players)
              if (this.state.players[t].state.name === e)
                return this.state.players[t].state.position;
            return null;
          },
        },
        {
          key: "handleData",
          value: function (e, t) {
            switch (t.type) {
              case "connected":
                this.handleConnected(e);
                break;
              case "playerState":
                this.handlePlayerState(e, t.data.state);
                break;
              case "setBlockTypeAt":
                this.state.game.setBlock(t.data.blockTypeId, t.data.position);
                break;
              case "fireEvent":
                (this.state.game.handleFireEvent(t.data),
                  this.broadcastToOthers(e, {
                    type: "fireEvent",
                    data: t.data,
                  }));
                break;
              case "message":
                this.handleMessage(t.message);
                break;
              case "requestChanges":
                var n = this.changedBlocks.slice(
                  t.from,
                  t.from + this.maxChangesPerSync,
                );
                n.length &&
                  this.broadcastPlayer(e, {
                    type: "changedBlocks",
                    blocks: n,
                    from: t.from,
                  });
                break;
              default:
                throw Error("Unkown data type ", t.type);
            }
          },
        },
        {
          key: "broadcastPlayer",
          value: function (e, t) {
            var n = this.state.players[e].peer;
            n.connected && n.send(JSON.stringify(t));
          },
        },
        {
          key: "broadcast",
          value: function (e) {
            for (var t in this.state.players) this.broadcastPlayer(t, e);
          },
        },
        {
          key: "broadcastToOthers",
          value: function (e, t) {
            for (var n in this.state.players)
              e !== n && this.broadcastPlayer(n, t);
          },
        },
        {
          key: "broadcastPlayers",
          value: function () {
            this.broadcast({
              type: "players",
              players: this.playersToArray().map(function (e) {
                return { name: e.state.name, id: e.name, state: e.state };
              }),
            });
          },
        },
        {
          key: "handleConnected",
          value: function (e) {
            this.broadcastPlayers();
          },
        },
        {
          key: "getOpenGame",
          value: function (e) {
            var t = this;
            return new P(function (n, r) {
              c.getGame(e).then(function (e) {
                ((t.gameCode = e.code),
                  console.log("got code " + t.gameCode),
                  n(t.gameCode));
              });
            });
          },
        },
        {
          key: "initNewGame",
          value: function (e) {
            var t = this;
            return new P(function (n, r) {
              t.getOpenGame(e).then(function (e) {
                (t.setState({ code: e }),
                  n(e),
                  c.createSignalingChannel(e, "host").then(function () {
                    c.listenForData(e, function (n) {
                      void 0 !== n.payload.signal &&
                        t.handlePlayerSignaling(n, e);
                    });
                  }));
              });
            });
          },
        },
        {
          key: "handlePlayerSignaling",
          value: function (e, t) {
            var n = this,
              r = e.from.split("/")[1];
            if (void 0 === this.state.players[r]) {
              var i = new (h())({ initiator: !1 });
              (i.signal(e.payload.signal),
                i.on("signal", function (e) {
                  c.sendSignalingTo(t, r, "host", e);
                }));
              var o = this.copyPlayers();
              ((o[r] = new x({ name: r, peer: i })),
                this.setState({ players: o }, function () {
                  n.broadcastPlayers();
                }),
                i.on("connect", function () {
                  var e = n.playersToArray().length,
                    t = e > n.maxPlayers;
                  (n.sendWelcomeInfo(i, t, e), t && s(!1));
                }),
                i.on("data", function (e) {
                  n.handleData(r, JSON.parse(e));
                }));
              var a = this,
                s = function (e) {
                  var t = Object.assign({}, a.state.players);
                  void 0 !== t[r] &&
                    (void 0 !== t[r].noaPlayer && t[r].noaPlayer.remove(),
                    e &&
                      t[r].state.spawned &&
                      a.sendLeftMessage(t[r].state.name),
                    delete t[r],
                    a.setState({ players: t }),
                    i.destroy());
                };
              (i.on("close", function () {
                s(!0);
              }),
                i.on("error", function (e) {
                  e.code;
                }));
            }
          },
        },
        {
          key: "sendWelcomeInfo",
          value: function (e, t, n) {
            e.send(
              JSON.stringify({
                type: "welcomeInfo",
                hostName: this.hostPlayer.state.name,
                gameFull: t,
                playerCount: n,
                maxPlayers: this.maxPlayers,
                worldSeed: this.state.seed,
                worldSize: d.A.getInstance().getWorldSize(),
                spawnPoint: this.state.spawnPoint,
                numberOfChangedBlocks: this.changedBlocks.length,
              }),
            );
          },
        },
        {
          key: "setState",
          value: function (e, t) {
            ((this.state = R(R({}, this.state), e)),
              t && "function" == typeof t && t());
          },
        },
        {
          key: "handlePlayerState",
          value: function (e, t) {
            this.state.players[e].setState(t);
          },
        },
        {
          key: "emitFireEvent",
          value: function (e) {
            this.broadcast({ type: "fireEvent", data: e });
          },
        },
        {
          key: "sendJoinedMessage",
          value: function (e) {
            var t = {
              message: "",
              timestamp: +new Date(),
              type: "joined",
              from: e,
            };
            this.handleMessage(t);
          },
        },
        {
          key: "sendLeftMessage",
          value: function (e) {
            var t = {
              message: "",
              timestamp: +new Date(),
              type: "left",
              from: e,
            };
            this.handleMessage(t);
          },
        },
        {
          key: "sendMessage",
          value: function (e) {
            var t = {
              message: e,
              timestamp: +new Date(),
              type: "message",
              from: this.state.name,
            };
            this.handleMessage(t);
          },
        },
        {
          key: "handleMessage",
          value: function (e) {
            (this.state.chatLog.push(e),
              this.state.game.updateChatLog(this.state.chatLog.slice(-20)),
              this.broadcastToOthers(this.state.name, {
                type: "chatLog",
                chatLog: this.state.chatLog.slice(-20),
              }));
          },
        },
        {
          key: "setChangedBlocks",
          value: function (e) {
            this.changedBlocks = e.splice(0);
          },
        },
      ]),
      t && O(e.prototype, t),
      Object.defineProperty(e, "prototype", { writable: !1 }),
      e
    );
    var e, t;
  })();
  var N = __webpack_require__(11798),
    L = __webpack_require__(92629);
  function F(e) {
    return (
      (F =
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
      F(e)
    );
  }
  function w(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      (t &&
        (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, r));
    }
    return n;
  }
  function B(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? w(Object(n), !0).forEach(function (t) {
            V(e, t, n[t]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : w(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t),
              );
            });
    }
    return e;
  }
  function V(e, t, n) {
    return (
      (t = z(t)) in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function U(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) return G(e);
      })(e) ||
      (function (e) {
        if (
          ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
          null != e["@@iterator"]
        )
          return Array.from(e);
      })(e) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return G(e, t);
          var n = {}.toString.call(e).slice(8, -1);
          return (
            "Object" === n && e.constructor && (n = e.constructor.name),
            "Map" === n || "Set" === n
              ? Array.from(e)
              : "Arguments" === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? G(e, t)
                : void 0
          );
        }
      })(e) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function G(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  function k(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      ((r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(e, z(r.key), r));
    }
  }
  function z(e) {
    var t = (function (e) {
      if ("object" != F(e) || !e) return e;
      var t = e[Symbol.toPrimitive];
      if (void 0 !== t) {
        var n = t.call(e, "string");
        if ("object" != F(n)) return n;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(e);
    })(e);
    return "symbol" == F(t) ? t : t + "";
  }
  const W = (function () {
    return (
      (e = function e(t) {
        (!(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          this.initializeState(t),
          (this.welcomeInfoResolve = null),
          (this.peer = null));
      }),
      (t = [
        {
          key: "initializeState",
          value: function (e) {
            this.state = {
              code: e.code,
              name: e.name,
              connected: !1,
              connecting: !1,
              gameStarted: !1,
              error: "",
              host: null,
              players: [],
              game: e.game,
              changedBlocks: [],
              enqueuedChangedBlocks: [],
              chatLog: [],
            };
          },
        },
        {
          key: "handleData",
          value: function (e) {
            switch (e.type) {
              case "startGame":
                this.setState({ gameStarted: !0 });
                break;
              case "players":
                this.handlePlayers(e.players);
                break;
              case "changedBlocks":
                this.handleChangedBlocks(e);
                break;
              case "fireEvent":
                this.state.game.handleFireEvent(e.data);
                break;
              case "chatLog":
                this.handleChatLog(e.chatLog);
                break;
              case "welcomeInfo":
                this.handleWelcomeInfo(e);
                break;
              case "kicked":
                this.handleOnKicked();
                break;
              default:
                throw Error("Unknown input type " + e.type);
            }
          },
        },
        {
          key: "handleChangedBlocks",
          value: function (e) {
            if (e.blocks.length || !this.state.game.playerSpawned)
              if (this.state.game.worldGenerated) {
                if (this.state.enqueuedChangedBlocks.length) {
                  ((this.state.changedBlocks =
                    this.state.enqueuedChangedBlocks.splice(0)),
                    this.state.game.handleChangedBlocks(
                      this.state.changedBlocks,
                    ));
                  for (var t = 0; t < this.state.changedBlocks.length; t++)
                    d.A.getInstance().addBlockChange(
                      this.state.changedBlocks[t],
                    );
                }
                for (var n = 0; n < e.blocks.length; n++)
                  void 0 === this.state.changedBlocks[e.from + n] &&
                    ((this.state.changedBlocks[e.from + n] = e.blocks[n]),
                    d.A.getInstance().addBlockChange(e.blocks[n]));
                this.state.game.handleChangedBlocks(e.blocks);
              } else
                this.state.enqueuedChangedBlocks = [].concat(
                  U(this.state.enqueuedChangedBlocks),
                  U(e.blocks),
                );
          },
        },
        {
          key: "broadcast",
          value: function (e) {
            this.peer.connected && this.peer.send(JSON.stringify(e));
          },
        },
        {
          key: "joinGame",
          value: function () {
            var e = this;
            return new L(function (t, n) {
              e.setState({ error: "", connecting: !0 });
              var r = e.state,
                i = r.code;
              (r.database,
                c.getGame(i).then(function (n) {
                  null == n
                    ? e.handleNoSuchGame(t, i)
                    : e.handleJoinExistingGame(i, t);
                }));
            });
          },
        },
        {
          key: "handleJoinExistingGame",
          value: function (e, t) {
            var n = this;
            c.getICECandidates(e).then(function (r) {
              var i = N(8);
              c.joinSignalingChannel(e, i).then(function () {
                var o = new (h())({
                  initiator: !0,
                  trickle: !1,
                  reconnectTimer: 3e3,
                  config: { iceServers: r },
                });
                ((n.peer = o),
                  o.on("signal", function (t) {
                    c.sendSignalingTo(e, "host", i, t).then(function () {});
                  }),
                  c.listenForData(e, function (e) {
                    void 0 !== e.payload.signal && o.signal(e.payload.signal);
                  }),
                  o.on("data", function (e) {
                    n.handleData(JSON.parse(e));
                  }),
                  n.handleConnectionEstablished(o, t, e),
                  n.pollWorldChanges(),
                  n.handleHostDisconnected(o, e),
                  o.on("error", function (e) {
                    "ERR_ICE_CONNECTION_FAILURE" === e.code &&
                      (console.log("Host disconnected!"),
                      console.log(e),
                      console.log(this));
                  }));
              });
            });
          },
        },
        {
          key: "handleHostDisconnected",
          value: function (e, t) {
            var n = this;
            e.on("close", function () {
              (n.setState({
                gameStarted: !1,
                connected: !1,
                error: "Disconnected from host",
                code: "",
              }),
                n.removeOtherPlayers());
            });
          },
        },
        {
          key: "handleConnectionEstablished",
          value: function (e, t, n) {
            var r = this;
            e.on("connect", function () {
              (setTimeout(function () {
                (r.broadcast({ type: "connected" }),
                  r.setState({ connected: !0, connecting: !1 }));
              }, 1e3),
                t(n));
            });
          },
        },
        {
          key: "pollWorldChanges",
          value: function () {
            var e = this;
            setInterval(function () {
              var t = e.state.changedBlocks.length
                ? e.state.changedBlocks.length
                : e.state.enqueuedChangedBlocks.length;
              e.broadcast({ type: "requestChanges", from: t });
            }, 1e3);
          },
        },
        {
          key: "handleNoSuchGame",
          value: function (e, t) {
            (this.handleWelcomeInfo({
              hostName: "no host",
              gameFull: !0,
              playerCount: 0,
              maxPlayers: 0,
              worldSeed: 0,
              noSuchGame: !0,
              worldSize: 128,
              numberOfChangedBlocks: 0,
            }),
              e(t));
          },
        },
        {
          key: "getWelcomeInfo",
          value: function () {
            var e = this;
            return new L(function (t, n) {
              e.welcomeInfoResolve = t;
            });
          },
        },
        {
          key: "getSpawnedPlayerNames",
          value: function () {
            var e = [this.state.name];
            for (var t in this.state.players)
              this.state.players[t].state.spawned &&
                e.push(this.state.players[t].state.name);
            return e;
          },
        },
        {
          key: "setBlockAt",
          value: function (e, t) {
            this.broadcast({
              type: "setBlockTypeAt",
              data: { position: e, blockTypeId: t },
            });
          },
        },
        {
          key: "emitFireEvent",
          value: function (e) {
            this.broadcast({ type: "fireEvent", data: e });
          },
        },
        {
          key: "sendJoined",
          value: function (e) {
            var t = {
              message: "",
              timestamp: +new Date(),
              type: "joined",
              from: e,
            };
            this.broadcast({ type: "message", message: t });
          },
        },
        {
          key: "sendMessage",
          value: function (e) {
            var t = {
              message: e,
              timestamp: +new Date(),
              type: "message",
              from: this.state.name,
            };
            this.broadcast({ type: "message", message: t });
          },
        },
        {
          key: "setState",
          value: function (e, t) {
            ("Disconnected from host" == e.error &&
              this.state.game.onHostDisconnect &&
              this.state.game.onHostDisconnect(),
              (this.state = B(B({}, this.state), e)),
              t && "function" == typeof t && t());
          },
        },
        {
          key: "removeOtherPlayers",
          value: function () {
            for (var e in this.state.players)
              e !== this.state.name &&
                (this.state.players[e].noaPlayer.remove(),
                delete this.state.players[e]);
          },
        },
        {
          key: "handlePlayers",
          value: function (e) {
            if (this.state.game.playerSpawned) {
              var t = [];
              for (var n in e)
                if (!0 === e[n].state.spawned) {
                  var r = e[n].state.name;
                  (t.push(r),
                    r !== this.state.name &&
                      void 0 === this.state.players[r] &&
                      (this.state.players[r] = new x({
                        name: r,
                        isClient: !0,
                      })),
                    r !== this.state.name &&
                      this.state.players[r].setState(e[n].state));
                }
              for (var i in this.state.players)
                -1 === t.indexOf(i) &&
                  (this.state.players[i].noaPlayer.remove(),
                  delete this.state.players[i]);
            }
          },
        },
        {
          key: "kickPlayer",
          value: function (e) {
            return "Command not allowed";
          },
        },
        {
          key: "setSpawnToCurrentPosition",
          value: function () {
            return "Command not allowed";
          },
        },
        {
          key: "getPositionFor",
          value: function (e) {
            for (var t in this.state.players)
              if (this.state.players[t].state.name === e)
                return this.state.players[t].state.position;
            return null;
          },
        },
        {
          key: "handleChatLog",
          value: function (e) {
            this.state.game.playerSpawned &&
              ((this.state.chatLog = e),
              this.state.game.updateChatLog(this.state.chatLog));
          },
        },
        {
          key: "handleOnKicked",
          value: function () {
            this.state.game.playerSpawned && this.state.game.onKicked();
          },
        },
        {
          key: "handleWelcomeInfo",
          value: function (e) {
            (null != this.welcomeInfoResolve && this.welcomeInfoResolve(e),
              this.state.game.setHostInfo({
                hostName: e.hostName,
                gameFull: e.gameFull,
                playerCount: e.playerCount,
                maxPlayers: e.maxPlayers,
                worldSeed: e.worldSeed,
                worldSize: e.worldSize,
                spawnPoint: e.spawnPoint,
                noSuchGame: void 0 !== e.noSuchGame && e.noSuchGame,
                numberOfChangedBlocks: e.numberOfChangedBlocks,
              }),
              e.gameFull && this.peer.destroy());
          },
        },
      ]) && k(e.prototype, t),
      Object.defineProperty(e, "prototype", { writable: !1 }),
      e
    );
    var e, t;
  })();
  var H = __webpack_require__(59660);
  function Y(e) {
    return (
      (Y =
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
      Y(e)
    );
  }
  function X(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      ((r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(e, j(r.key), r));
    }
  }
  function j(e) {
    var t = (function (e) {
      if ("object" != Y(e) || !e) return e;
      var t = e[Symbol.toPrimitive];
      if (void 0 !== t) {
        var n = t.call(e, "string");
        if ("object" != Y(n)) return n;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(e);
    })(e);
    return "symbol" == Y(t) ? t : t + "";
  }
  new ((function () {
    return (
      (e = function e() {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e);
        var t = new b(),
          n = Math.floor(99999999999999 * Math.random());
        (new URL(document.location).searchParams,
          d.A.getInstance().gameSaved() &&
            (n = d.A.getInstance().getWorldSeed()),
          (t.noWebrtcJoin = !1));
        var r = new H.A();
        r.isMobile
          ? (document.getElementById("mobile").style.display = "block")
          : r.isWebGLSupported
            ? this.setupAsSinglePlayer(n, t)
            : (document.getElementById("webgl_webrtc").style.display = "block");
      }),
      (t = [
        {
          key: "setupAsClient",
          value: function (e, t) {
            var n = e.get("join"),
              r = new W({ code: n, game: t }),
              i = null;
            ((t.setName = function (e) {
              null === i &&
                ((i = new x(
                  { name: e, network: r, isSelf: !0, isClient: !0 },
                  function (e) {
                    r.broadcast({ type: "playerState", data: { state: e } });
                  },
                )),
                r.setState({ name: e }),
                t.setPlayer(i));
            }),
              r.joinGame().then(function (e) {
                d.A.getInstance().clearData();
              }),
              r.getWelcomeInfo().then(function (e) {
                (d.A.getInstance().setWorldSeed(e.worldSeed),
                  d.A.getInstance().setWorldSize(e.worldSize),
                  t.initialize({ seed: e.worldSeed, network: r }),
                  (t.client = r));
              }));
          },
        },
        {
          key: "setupAsSinglePlayer",
          value: function (e, t) {
            var n = new D({ name: "temp", seed: e, game: t });
            if (
              (d.A.getInstance().setWorldSeed(e), d.A.getInstance().gameSaved())
            ) {
              var r = d.A.getInstance().getChangedBlocks();
              n.setChangedBlocks(r);
            }
            (t.initialize({
              seed: e,
              player: n.getPlayer(),
              network: n,
              singlePlayer: !0,
            }),
              t.setChangedBlockHandler(n.changedBlockHandler),
              (t.setName = function (e) {
                n.setName(e);
              }));
          },
        },
        {
          key: "setupAsHost",
          value: function (e, t, n) {
            var r = this,
              i = null !== e.get("host") ? e.get("host") : null,
              o = new D({ name: "temp", seed: t, game: n });
            if (
              (d.A.getInstance().setWorldSeed(t), d.A.getInstance().gameSaved())
            ) {
              var a = d.A.getInstance().getChangedBlocks();
              o.setChangedBlocks(a);
            }
            (o.initNewGame(i).then(function (i) {
              (r.setHostUrl(e, i),
                n.initialize({ seed: t, player: o.getPlayer(), network: o }),
                n.setChangedBlockHandler(o.changedBlockHandler));
            }),
              (n.setName = function (e) {
                o.setName(e);
              }));
          },
        },
        {
          key: "setHostUrl",
          value: function (e, t) {
            if ("URLSearchParams" in window) {
              var n = new URLSearchParams(window.location.search);
              (n.set("host", t), history.pushState({}, t, "?" + n.toString()));
            }
          },
        },
      ]) && X(e.prototype, t),
      Object.defineProperty(e, "prototype", { writable: !1 }),
      e
    );
    var e, t;
  })())();
})();
