!(function (i) {
  "use strict";
  function r(t, e) {
    for (var n = 0; n < e.length; n++) {
      var o = e[n];
      (o.enumerable = o.enumerable || !1),
        (o.configurable = !0),
        "value" in o && (o.writable = !0),
        Object.defineProperty(t, o.key, o);
    }
  }
  function c(t) {
    return (c = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t);
      })(t);
  }
  function f(t, e) {
    return (f =
      Object.setPrototypeOf ||
      function (t, e) {
        return (t.__proto__ = e), t;
      })(t, e);
  }
  function u(t, e) {
    return !e || ("object" != typeof e && "function" != typeof e)
      ? (function (t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      })(t)
      : e;
  }
  var t = (function () {
    function n(t) {
      var e;
      return (
        (function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, n),
        ((e = u(this, c(n).call(this))).CLASS_NAME = "AMap.CitySearch"),
        (e.config = i.getConfig()),
        (e.opt = t || {}),
        (e.url = e.config.server + "/v3/ip"),
        e
      );
    }
    var t, e, o;
    return (
      (function (t, e) {
        if ("function" != typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && f(t, e);
      })(n, i.Event),
      (t = n),
      (e = [
        {
          key: "getLocalCity",
          value: function (n) {
            var o = this,
              t = ["key=" + this.config.key, "s=rsv3"],
              e = this.url + (0 < t.length ? "?" + t.join("&") : "");
            i.WebService.get(e, {}, function (t, e) {
              "complete" === t &&
                e.status &&
                "1" === e.status &&
                o._onComplete(e, n),
                "error" === t && o._onError(e, n);
            });
          },
        },
        {
          key: "getCityByIp",
          value: function (t, n) {
            var o = this;
            if (t) {
              var e = ["ip=" + t, "key=" + this.config.key, "s=rsv3"],
                r = this.url + (0 < e.length ? "?" + e.join("&") : "");
              i.WebService.get(r, {}, function (t, e) {
                "complete" === t &&
                  e.status &&
                  "1" === e.status &&
                  o._onComplete(e, n),
                  "error" === t && o._onError(e, n);
              });
            } else n && "function" == typeof n && n("error", "NO_PARAMS");
          },
        },
        {
          key: "_onError",
          value: function (t, e) {
            this.emit("error", t.info),
              e && "function" == typeof e && e("error", t.info);
          },
        },
        {
          key: "_onComplete",
          value: function (t, e) {
            var n;
            if (parseInt(t.status, 10))
              if (
                t.city &&
                "string" == typeof t.city &&
                t.rectangle &&
                "string" == typeof t.rectangle
              ) {
                var o = t.rectangle.split(";");
                (o = o[0].split(",").concat(o[1].split(","))),
                  (n = Object.assign({}, t, {
                    bounds: new i.Bounds(o[0], o[1], o[2], o[3]),
                  })),
                  this.emit("complete", n),
                  e && "function" == typeof e && e("complete", n);
              } else
                (n = {
                  info: "ok" === t.info.toLowerCase() ? "NO_DATA" : t.info,
                }),
                  this.emit("complete", n),
                  e && "function" == typeof e && e("no_data", {});
            else
              (n = { info: t.info }),
                this.emit("error", n),
                e && "function" == typeof e && e("error", t.info);
          },
        },
      ]) && r(t.prototype, e),
      o && r(t, o),
      n
    );
  })();
  i.CitySearch = t;
})(window.AMap);
