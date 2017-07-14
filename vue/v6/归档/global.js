(function(window) {
  "use strict";
  var G = {};

  G.param = function(source) {
    var array = [];

    for (var key in source) {
      var _key = encodeURIComponent(key),
        _value = encodeURIComponent(source[key]);
      array.push(_key + "=" + _value);
    }

    return array.join("&");
  };

  G.generateUrlWithParam = function(original, param) {
    return original + "?" + G.param(param);
  };

  G.getUrlParameter = function(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split("&"),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  };

  G.getMobileOperatingSystem = function() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (
      userAgent.match(/iPad/i) ||
      userAgent.match(/iPhone/i) ||
      userAgent.match(/iPod/i)
    ) {
      return "iOS";
    } else if (userAgent.match(/Android/i)) {
      return "Android";
    } else {
      return "unknown";
    }
  };

  G.getAllowhost = function() {
    var hostname = window.location.hostname, allowhost = 5;

    switch (hostname) {
      case "test.sythealth.com":
        allowhost = 3;
        break;

      case "m.sythealth.com":
        allowhost = 2;
        break;
    }
    return allowhost;
  };

  G.getProtocol = function() {
    return window.location.protocol === "file:"
      ? "https:"
      : window.location.protocol;
  };

  G.compatibleProtocol = function(file) {
    var protocol = G.getProtocol();
    switch (protocol) {
      case "http:":
        file = file.replace(/(^\w+:)/, "http:");
        break;

      case "https:":
        file = file.replace(/(^\w+:)/, "https:");
        break;

      default:
        if (G.getMobileOperatingSystem() !== "unknown")
          file = file.replace(/(^\w+:)/, "https:");
        else file = file.replace(/(^\w+:)/, "http:");
    }
    return file;
  };

  G.trim = function(x) {
    return x.replace(/^\s+|\s+$/gm, "");
  };

  G.config = {
    debug: true,
    statistics: G.getProtocol() + "//fireye.sythealth.com",
    tokenid: "tokenid_undefined",
    //allowhost: 3,
    allowhost: G.getAllowhost(),
    //host: 'http://local-qm.sythealth.com:84',
    //host: 'http://test.sythealth.com:8109',
    //host2: 'http://test.sythealth.com:8109'
    //host: 'http://192.168.0.35:8089'
    //qm:  G.getProtocol() + '//api.sythealth.com',
    //qm:  'https://local-api.sythealth.com',

    qm: G.getProtocol() + "//api.sythealth.com",
    mall: G.getProtocol() + "//api.sythealth.com",
    ws: G.getProtocol() + "//api.sythealth.com",
    task: G.getProtocol() + "//api.sythealth.com",
    ad: G.getProtocol() + "//api.sythealth.com"

    // qm: G.getProtocol() + "//local-api.sythealth.com",

    // mall: G.getProtocol() + "//local-api.sythealth.com",

    // ws: G.getProtocol() + "//local-api.sythealth.com",

    // task: G.getProtocol() + "//local-api.sythealth.com",

    // ad: G.getProtocol() + "//local-api.sythealth.com"

    //host4: 'http://42.96.139.238:8899'
  };

  G.statisticsNative = function(str) {
    // if (window.fitness_app) {
    //   fitness_app.onEvent(str);
    // }
  };

  G.statisticsFireye = function(eventid, id) {
    var deferred = _.defer.defer();

    var data = {
      tokenid: G.config.tokenid,
      allowhost: G.config.allowhost,
      eventid: eventid
    };

    var userid = G.getUrlParameter("userid");

    if (userid) {
      data["userid"] = userid;
    }

    if (id) {
      data["id"] = id;
    }

    _.http({
      method: "GET",
      url: G.config.statistics + "/ws/fireye/v2/event/saveevent",
      data: data,
      dataType: "json",
      success: function(res) {
        deferred.resolve(res);
      },
      error: function(res) {
        deferred.reject(res);
      }
    });

    return deferred.promise;
  };

  G.getAppVersion = function() {
    if (!G.getUrlParameter("appversion")) return 0;

    var version = G.getUrlParameter("appversion").split(".");
    var _version = ["0", "0", "0"];

    _.each(version, function(index, s) {
      _version[index] = version[index];
    });

    var str = "";

    _.each(_version, function(index, s) {
      str += s;
    });

    version = parseInt(str);

    return version;
  };

  window.G = G;
})(window);
(function() {
  var lastTime = 0;
  var vendors = ["webkit", "moz", "ms", "o"];
  var id;
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
      window[vendors[x] + "CancelAnimationFrame"] || // Webkit中此取消方法的名字变了
      window[vendors[x] + "CancelRequestAnimationFrame"];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
})();
