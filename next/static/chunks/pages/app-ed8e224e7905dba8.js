(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [888],
  {
    6840: function (n, t, e) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/app",
        function () {
          return e(3847);
        },
      ]);
    },
    3847: function (n, t, e) {
      "use strict";
      e.r(t);
      var r = e(5893);
      e(2523), e(6774), e(4213), e(2755);
      function u(n, t, e) {
        return (
          t in n
            ? Object.defineProperty(n, t, {
                value: e,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (n[t] = e),
          ngenerator
        );
      }
      t.default = function (n) {
        var t = n.Component,
          e = n.pageProps;
        return (0, r.jsx)(
          t,
          (function (n) {
            for (var t = 1; t < arguments.length; t++) {
              var e = null != arguments[t] ? arguments[t] : {},
                r = Object.keys(e);
              "function" === typeof Object.getOwnPropertySymbols &&
                (r = r.concat(
                  Object.getOwnPropertySymbols(e).filter(function (n) {
                    return Object.getOwnPropertyDescriptor(e, n).enumerable;
                  })
                )),
                r.forEach(function (t) {
                  u(n, t, e[t]);
                });
            }
            return n;
          })({}, e)
        );
      };
    },
    2523: function () {},
    2755: function () {},
    4213: function () {},
    6774: function () {},
  },
  function (n) {
    var t = function (t) {
      return n((n.s = t));
    };
    n.O(0, [774, 179], function () {
      return t(6840), t(880);
    });
    var e = n.O();
    _N_E = e;
  },
]);
