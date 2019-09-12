(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.FlvPlayer = factory());
}(this, function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

  function _typeof(obj) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return _typeof2(obj);
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized = _assertThisInitialized;

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  var possibleConstructorReturn = _possibleConstructorReturn;

  var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
  });

  var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
  });

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }

  var inherits = _inherits;

  var optionValidator = createCommonjsModule(function (module, exports) {
  !function(r,t){module.exports=t();}(commonjsGlobal,function(){function e(r){return (e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(r)}var n=Object.prototype.toString,c=function(r){if(void 0===r)return "undefined";if(null===r)return "null";var t=e(r);if("boolean"===t)return "boolean";if("string"===t)return "string";if("number"===t)return "number";if("symbol"===t)return "symbol";if("function"===t)return function(r){return "GeneratorFunction"===o(r)}(r)?"generatorfunction":"function";if(function(r){return Array.isArray?Array.isArray(r):r instanceof Array}(r))return "array";if(function(r){if(r.constructor&&"function"==typeof r.constructor.isBuffer)return r.constructor.isBuffer(r);return !1}(r))return "buffer";if(function(r){try{if("number"==typeof r.length&&"function"==typeof r.callee)return !0}catch(r){if(-1!==r.message.indexOf("callee"))return !0}return !1}(r))return "arguments";if(function(r){return r instanceof Date||"function"==typeof r.toDateString&&"function"==typeof r.getDate&&"function"==typeof r.setDate}(r))return "date";if(function(r){return r instanceof Error||"string"==typeof r.message&&r.constructor&&"number"==typeof r.constructor.stackTraceLimit}(r))return "error";if(function(r){return r instanceof RegExp||"string"==typeof r.flags&&"boolean"==typeof r.ignoreCase&&"boolean"==typeof r.multiline&&"boolean"==typeof r.global}(r))return "regexp";switch(o(r)){case"Symbol":return "symbol";case"Promise":return "promise";case"WeakMap":return "weakmap";case"WeakSet":return "weakset";case"Map":return "map";case"Set":return "set";case"Int8Array":return "int8array";case"Uint8Array":return "uint8array";case"Uint8ClampedArray":return "uint8clampedarray";case"Int16Array":return "int16array";case"Uint16Array":return "uint16array";case"Int32Array":return "int32array";case"Uint32Array":return "uint32array";case"Float32Array":return "float32array";case"Float64Array":return "float64array"}if(function(r){return "function"==typeof r.throw&&"function"==typeof r.return&&"function"==typeof r.next}(r))return "generator";switch(t=n.call(r)){case"[object Object]":return "object";case"[object Map Iterator]":return "mapiterator";case"[object Set Iterator]":return "setiterator";case"[object String Iterator]":return "stringiterator";case"[object Array Iterator]":return "arrayiterator"}return t.slice(8,-1).toLowerCase().replace(/\s/g,"")};function o(r){return r.constructor?r.constructor.name:null}function f(r,t){var e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:["option"];return s(r,t,e),y(r,t,e),function(a,i,u){var r=c(i),t=c(a);if("object"===r){if("object"!==t)throw new Error("[Type Error]: '".concat(u.join("."),"' require 'object' type, but got '").concat(t,"'"));Object.keys(i).forEach(function(r){var t=a[r],e=i[r],n=u.slice();n.push(r),s(t,e,n),y(t,e,n),f(t,e,n);});}if("array"===r){if("array"!==t)throw new Error("[Type Error]: '".concat(u.join("."),"' require 'array' type, but got '").concat(t,"'"));a.forEach(function(r,t){var e=a[t],n=i[t]||i[0],o=u.slice();o.push(t),s(e,n,o),y(e,n,o),f(e,n,o);});}}(r,t,e),r}function s(r,t,e){if("string"===c(t)){var n=c(r);if(!(-1<t.indexOf("|")?t.split("|").map(function(r){return r.toLowerCase().trim()}).filter(Boolean).some(function(r){return n===r}):t.toLowerCase().trim()===n))throw new Error("[Type Error]: '".concat(e.join("."),"' require '").concat(t,"' type, but got '").concat(n,"'"))}}function y(r,t,e){if("function"===c(t)){var n=t(r,c(r),e);if(!0!==n){var o=c(n);throw"string"===o?new Error(n):"error"===o?n:new Error("[Validator Error]: The scheme for '".concat(e.join("."),"' validator require return true, but got '").concat(n,"'"))}}}return f.kindOf=c,f});
  });

  function checkWebAssembly() {
    try {
      if (_typeof_1(window.WebAssembly) === 'object' && typeof window.WebAssembly.instantiate === 'function') {
        var module = new window.WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));

        if (module instanceof window.WebAssembly.Module) {
          return new window.WebAssembly.Instance(module) instanceof window.WebAssembly.Instance;
        }
      }

      return false;
    } catch (e) {
      return false;
    }
  }
  function checkWorker() {
    return typeof window.Worker === 'function';
  }
  function checkFetch() {
    return typeof window.fetch === 'function';
  }
  function checkURL() {
    return window.URL && typeof window.URL.createObjectURL === 'function';
  }
  function checkReadableStream() {
    return typeof window.ReadableStream === 'function' && typeof window.Response === 'function' && Object.prototype.hasOwnProperty.call(window.Response.prototype, 'body');
  }
  function checkBlob() {
    return typeof window.Blob === 'function' && function () {
      try {
        return !!new window.Blob();
      } catch (e) {
        return false;
      }
    }();
  }
  function checkArrayBuffer() {
    return typeof window.ArrayBuffer === 'function';
  }
  function checkAACType() {
    var canPlay = new Audio().canPlayType('audio/aac;');
    return canPlay === 'probably' || canPlay === 'maybe';
  }
  function checkAudioContext() {
    return window.AudioContext || window.webkitAudioContext;
  }
  function checkWebGL() {
    if (window.WebGLRenderingContext) {
      var canvas = document.createElement('canvas');
      var names = ['webgl2', 'webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
      var context = false;

      for (var i = 0; i < names.length; i += 1) {
        try {
          context = canvas.getContext(names[i]);

          if (context && typeof context.getParameter === 'function') {
            return true;
          }
        } catch (e) {//
        }
      }

      return false;
    }

    return false;
  }
  function isSupported() {
    return checkWebAssembly() && checkWorker() && checkFetch() && checkBlob() && checkArrayBuffer() && checkURL() && checkAACType() && checkAudioContext() && checkWebGL();
  }

  var Emitter =
  /*#__PURE__*/
  function () {
    function Emitter() {
      classCallCheck(this, Emitter);
    }

    createClass(Emitter, [{
      key: "on",
      value: function on(name, fn, ctx) {
        var e = this.e || (this.e = {});
        (e[name] || (e[name] = [])).push({
          fn: fn,
          ctx: ctx
        });
        return this;
      }
    }, {
      key: "once",
      value: function once(name, fn, ctx) {
        var self = this;

        function listener() {
          self.off(name, listener);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          fn.apply(ctx, args);
        }

        listener._ = fn;
        return this.on(name, listener, ctx);
      }
    }, {
      key: "emit",
      value: function emit(name) {
        var evtArr = ((this.e || (this.e = {}))[name] || []).slice();

        for (var _len2 = arguments.length, data = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          data[_key2 - 1] = arguments[_key2];
        }

        for (var i = 0; i < evtArr.length; i += 1) {
          evtArr[i].fn.apply(evtArr[i].ctx, data);
        }

        return this;
      }
    }, {
      key: "off",
      value: function off(name, callback) {
        var e = this.e || (this.e = {});
        var evts = e[name];
        var liveEvents = [];

        if (evts && callback) {
          for (var i = 0, len = evts.length; i < len; i += 1) {
            if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
          }
        }

        if (liveEvents.length) {
          e[name] = liveEvents;
        } else {
          delete e[name];
        }

        return this;
      }
    }]);

    return Emitter;
  }();

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  var isNativeFunction = _isNativeFunction;

  var construct = createCommonjsModule(function (module) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      module.exports = _construct = Reflect.construct;
    } else {
      module.exports = _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  module.exports = _construct;
  });

  var wrapNativeSuper = createCommonjsModule(function (module) {
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return construct(Class, arguments, getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  module.exports = _wrapNativeSuper;
  });

  var FlvPlayerError =
  /*#__PURE__*/
  function (_Error) {
    inherits(FlvPlayerError, _Error);

    function FlvPlayerError(message) {
      var _this;

      classCallCheck(this, FlvPlayerError);

      _this = possibleConstructorReturn(this, getPrototypeOf(FlvPlayerError).call(this, message));
      _this.name = 'FlvPlayerError';
      return _this;
    }

    return FlvPlayerError;
  }(wrapNativeSuper(Error));

  var Debug = function Debug(flv) {
    classCallCheck(this, Debug);

    var debug = flv.options.debug;

    this.log = function (name) {
      if (debug) {
        var _console;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        (_console = console).log.apply(_console, ["FlvPlayer: [".concat(name, "]")].concat(args));
      }
    };

    this.warn = function (condition) {
      if (!condition && debug) {
        var _console2;

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        (_console2 = console).warn.apply(_console2, args);
      }
    };

    this.error = function (condition, msg) {
      if (!condition) {
        throw new FlvPlayerError(msg);
      }
    };
  };

  var Events =
  /*#__PURE__*/
  function () {
    function Events(flv) {
      var _this = this;

      classCallCheck(this, Events);

      this.destroys = [];
      this.proxy = this.proxy.bind(this);
      flv.on('destroy', function () {
        _this.destroy();
      });
    }

    createClass(Events, [{
      key: "proxy",
      value: function proxy(target, name, callback) {
        var _this2 = this;

        var option = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        if (Array.isArray(name)) {
          return name.map(function (item) {
            return _this2.proxy(target, item, callback, option);
          });
        }

        target.addEventListener(name, callback, option);

        var destroy = function destroy() {
          return target.removeEventListener(name, callback, option);
        };

        this.destroys.push(destroy);
        return destroy;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.destroys.forEach(function (event) {
          return event();
        });
      }
    }]);

    return Events;
  }();

  function template(flv, player) {
    var options = flv.options;
    var cacheCss = options.container.style.cssText;
    options.container.classList.add('flvplayer-container');
    options.container.innerHTML = "\n        <div class=\"flvplayer-player\">\n            <canvas class=\"flvplayer-canvas\" width=\"".concat(options.width, "\" height=\"").concat(options.height, "\"></canvas>\n        </div>\n    ");
    flv.on('destroy', function () {
      options.container.innerHTML = '';
      options.container.style.cssText = cacheCss;
      options.container.classList.remove('flvplayer-container');
    });
    Object.defineProperty(player, '$container', {
      value: options.container
    });
    Object.defineProperty(player, '$player', {
      value: options.container.querySelector('.flvplayer-player')
    });
    Object.defineProperty(player, '$canvas', {
      value: options.container.querySelector('.flvplayer-canvas')
    });
  }

  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  function isWechat() {
    return /MicroMessenger/i.test(navigator.userAgent);
  }
  function hasOwnProperty(obj, name) {
    return Object.prototype.hasOwnProperty.call(obj, name);
  }
  function readBuffer(buffer) {
    var index = 0;

    function read(length) {
      var tempUint8 = new Uint8Array(length);

      for (var i = 0; i < length; i += 1) {
        tempUint8[i] = buffer[index];
        index += 1;
      }

      read.index = index;
      return tempUint8;
    }

    read.index = 0;
    return read;
  }
  function mergeBuffer() {
    for (var _len = arguments.length, buffers = new Array(_len), _key = 0; _key < _len; _key++) {
      buffers[_key] = arguments[_key];
    }

    var Cons = buffers[0].constructor;
    return buffers.reduce(function (pre, val) {
      var merge = new Cons((pre.byteLength | 0) + (val.byteLength | 0));
      merge.set(pre, 0);
      merge.set(val, pre.byteLength | 0);
      return merge;
    }, new Cons());
  }
  function createWorker(workerString) {
    return new Worker(URL.createObjectURL(new Blob([workerString], {
      type: 'application/javascript'
    })));
  }
  function secondToTime(second) {
    var add0 = function add0(num) {
      return num < 10 ? "0".concat(num) : String(num);
    };

    var hour = Math.floor(second / 3600);
    var min = Math.floor((second - hour * 3600) / 60);
    var sec = Math.floor(second - hour * 3600 - min * 60);
    return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':');
  }
  function getNowTime() {
    if (performance && typeof performance.now === 'function') {
      return performance.now();
    }

    return Date.now();
  }
  function debounce(func, wait, context) {
    var timeout;

    function fn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var later = function later() {
        timeout = null;
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    }

    fn.clearTimeout = function ct() {
      clearTimeout(timeout);
    };

    return fn;
  }
  function throttle(callback, delay) {
    var isThrottled = false;
    var args;
    var context;

    function fn() {
      for (var _len3 = arguments.length, args2 = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args2[_key3] = arguments[_key3];
      }

      if (isThrottled) {
        args = args2;
        context = this;
        return;
      }

      isThrottled = true;
      callback.apply(this, args2);
      setTimeout(function () {
        isThrottled = false;

        if (args) {
          fn.apply(context, args);
          args = null;
          context = null;
        }
      }, delay);
    }

    return fn;
  }
  function clamp(num, a, b) {
    return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
  }
  function setStyle(element, key, value) {
    if (_typeof_1(key) === 'object') {
      Object.keys(key).forEach(function (item) {
        setStyle(element, item, key[item]);
      });
    }

    element.style[key] = value;
    return element;
  }
  function getStyle(element, key) {
    var numberType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var value = getComputedStyle(element, null).getPropertyValue(key);
    return numberType ? parseFloat(value) : value;
  }
  function loadScript(url, name) {
    return new Promise(function (resolve, reject) {
      var $script = document.createElement('script');
      $script.type = 'text/javascript';

      $script.onload = function () {
        if (window[name]) {
          resolve(window[name]);
        } else {
          reject(new Error("Unable to find global variable '".concat(name, "' from '").concat(url, "'")));
        }
      };

      $script.onerror = function () {
        reject(new Error("Resource loading failed '".concat(url, "'")));
      };

      $script.src = url;
      document.head.appendChild($script);
    });
  }
  function proxyPropertys(target) {
    for (var _len4 = arguments.length, sources = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      sources[_key4 - 1] = arguments[_key4];
    }

    return sources.reduce(function (result, source) {
      Object.getOwnPropertyNames(source).forEach(function (key) {
        if (!hasOwnProperty(result, key)) {
          Object.defineProperty(result, key, Object.getOwnPropertyDescriptor(source, key));
        } else {
          throw new Error("Target attribute name is duplicated: ".concat(key));
        }
      });
      return result;
    }, target);
  }
  function calculationRate(callback) {
    var totalSize = 0;
    var lastTime = getNowTime();
    return function (size) {
      totalSize += size;
      var thisTime = getNowTime();
      var diffTime = thisTime - lastTime;

      if (diffTime >= 1000) {
        callback(totalSize / diffTime * 1000);
        lastTime = thisTime;
        totalSize = 0;
      }
    };
  }

  var utils = /*#__PURE__*/Object.freeze({
    isMobile: isMobile,
    isWechat: isWechat,
    hasOwnProperty: hasOwnProperty,
    readBuffer: readBuffer,
    mergeBuffer: mergeBuffer,
    createWorker: createWorker,
    secondToTime: secondToTime,
    getNowTime: getNowTime,
    debounce: debounce,
    throttle: throttle,
    clamp: clamp,
    setStyle: setStyle,
    getStyle: getStyle,
    loadScript: loadScript,
    proxyPropertys: proxyPropertys,
    calculationRate: calculationRate
  });

  function property(flv, player) {
    Object.defineProperty(player, 'rect', {
      get: function get() {
        return player.$container.getBoundingClientRect();
      }
    });
    ['bottom', 'height', 'left', 'right', 'top', 'width'].forEach(function (key) {
      Object.defineProperty(player, key, {
        get: function get() {
          return player.rect[key];
        }
      });
    });
    Object.defineProperty(player, 'currentTime', {
      get: function get() {
        return flv.decoder.currentTime;
      },
      set: function set(time) {
        if (flv.options.cache) {
          flv.decoder.seeked(clamp(time, 0, player.loaded));
        }
      }
    });
    Object.defineProperty(player, 'streaming', {
      get: function get() {
        return flv.demuxer.streaming;
      }
    });
    Object.defineProperty(player, 'demuxed', {
      get: function get() {
        return flv.demuxer.demuxed;
      }
    });
    Object.defineProperty(player, 'videoDecoding', {
      get: function get() {
        return flv.decoder.video.decoding;
      }
    });
    Object.defineProperty(player, 'audioDecoding', {
      get: function get() {
        return flv.decoder.audio.decoding;
      }
    });
    Object.defineProperty(player, 'duration', {
      get: function get() {
        try {
          return flv.demuxer.scripMeta.amf2.metaData.duration;
        } catch (error) {
          return flv.options.duration || 0;
        }
      }
    });
    Object.defineProperty(player, 'frameRate', {
      get: function get() {
        var defaultFrameRate = Math.round(flv.options.frameRate || 30);

        try {
          return Math.round(flv.demuxer.scripMeta.amf2.metaData.framerate) || defaultFrameRate;
        } catch (error) {
          return defaultFrameRate;
        }
      }
    });
    Object.defineProperty(player, 'frameDuration', {
      get: function get() {
        return 1000 / player.frameRate | 0;
      }
    });
    Object.defineProperty(player, 'muted', {
      get: function get() {
        return flv.decoder.audio.muted;
      },
      set: function set(value) {
        flv.decoder.audio.muted = value;
      }
    });
    Object.defineProperty(player, 'volume', {
      get: function get() {
        try {
          return flv.decoder.audio.volume;
        } catch (error) {
          return 0;
        }
      },
      set: function set(value) {
        try {
          flv.decoder.audio.volume = clamp(value, 0, 1);
          return player.volume;
        } catch (error) {
          return value;
        }
      }
    });
    Object.defineProperty(player, 'loaded', {
      get: function get() {
        return flv.decoder.video.loaded;
      }
    });
    Object.defineProperty(player, 'playing', {
      get: function get() {
        return flv.decoder.playing;
      }
    });
    Object.defineProperty(player, 'ended', {
      get: function get() {
        return flv.decoder.ended;
      }
    });
    Object.defineProperty(player, 'play', {
      value: function value() {
        if (!player.playing) {
          flv.decoder.play();
        }
      }
    });
    Object.defineProperty(player, 'pause', {
      value: function value() {
        flv.decoder.pause();
      }
    });
    Object.defineProperty(player, 'toggle', {
      value: function value() {
        if (player.playing) {
          player.pause();
        } else {
          player.play();
        }
      }
    });
  }

  function events(flv, player) {
    var proxy = flv.events.proxy;
    flv.on('scripMeta', function (scripMeta) {
      var _scripMeta$amf2$metaD = scripMeta.amf2.metaData,
          width = _scripMeta$amf2$metaD.width,
          height = _scripMeta$amf2$metaD.height;

      if (width && height) {
        player.$canvas.width = width;
        player.$canvas.height = height;
      }
    });
    proxy(player.$canvas, 'click', function () {
      player.toggle();
    });
  }

  var Player = function Player(flv) {
    classCallCheck(this, Player);

    template(flv, this);
    property(flv, this);
    events(flv, this);
  };

  var dida = createCommonjsModule(function (module, exports) {
  /*!
   * Dida.js v1.0.0
   * Github: https://github.com/zhw2590582/dida.js#readme
   * (c) 2017-2019 Harvey Zack
   * Released under the MIT License.
   */

  !function(t,e){module.exports=e();}(commonjsGlobal,function(){var o=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t};var i=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")};function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r);}}var t=function(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t};var e,u=(function(t,e){function n(t){return (n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t){return t.constructor?t.constructor.name:null}function s(t,e){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:["option"];return c(t,e,n),f(t,e,n),function(i,u,a){var t=d(u),e=d(i);"object"===t&&"object"===e&&Object.keys(u).forEach(function(t){var e=i[t],n=u[t],r=a.slice();r.push(t),c(e,n,r),f(e,n,r),s(e,n,r);}),"array"===t&&"array"===e&&i.forEach(function(t,e){var n=i[e],r=u[e]||u[0],o=a.slice();o.push(e),c(n,r,o),f(n,r,o),s(n,r,o);});}(t,e,n),t}function c(t,e,n){if("string"===d(e)){var r=d(t);if(!(-1<e.indexOf("|")?e.split("|").map(function(t){return t.toLowerCase().trim()}).filter(Boolean).some(function(t){return r===t}):e.toLowerCase().trim()===r))throw new Error("[Type Error]: '".concat(n.join("."),"' require '").concat(e,"' type, but got '").concat(r,"'"))}}function f(t,e,n){if("function"===d(e)){var r=e(t,d(t),n);if(!0!==r){var o=d(r);throw"string"===o?new Error(r):"error"===o?r:new Error("[Validator Error]: The scheme for '".concat(n.join("."),"' validator require return true, but got '").concat(r,"'"))}}}var o,d;t.exports=(o=Object.prototype.toString,s.kindOf=d=function(t){if(void 0===t)return "undefined";if(null===t)return "null";var e=n(t);if("boolean"===e)return "boolean";if("string"===e)return "string";if("number"===e)return "number";if("symbol"===e)return "symbol";if("function"===e)return function(t){return "GeneratorFunction"===r(t)}(t)?"generatorfunction":"function";if(function(t){return Array.isArray?Array.isArray(t):t instanceof Array}(t))return "array";if(function(t){return !(!t.constructor||"function"!=typeof t.constructor.isBuffer)&&t.constructor.isBuffer(t)}(t))return "buffer";if(function(t){try{if("number"==typeof t.length&&"function"==typeof t.callee)return !0}catch(t){if(-1!==t.message.indexOf("callee"))return !0}return !1}(t))return "arguments";if(function(t){return t instanceof Date||"function"==typeof t.toDateString&&"function"==typeof t.getDate&&"function"==typeof t.setDate}(t))return "date";if(function(t){return t instanceof Error||"string"==typeof t.message&&t.constructor&&"number"==typeof t.constructor.stackTraceLimit}(t))return "error";if(function(t){return t instanceof RegExp||"string"==typeof t.flags&&"boolean"==typeof t.ignoreCase&&"boolean"==typeof t.multiline&&"boolean"==typeof t.global}(t))return "regexp";switch(r(t)){case"Symbol":return "symbol";case"Promise":return "promise";case"WeakMap":return "weakmap";case"WeakSet":return "weakset";case"Map":return "map";case"Set":return "set";case"Int8Array":return "int8array";case"Uint8Array":return "uint8array";case"Uint8ClampedArray":return "uint8clampedarray";case"Int16Array":return "int16array";case"Uint16Array":return "uint16array";case"Int32Array":return "int32array";case"Uint32Array":return "uint32array";case"Float32Array":return "float32array";case"Float64Array":return "float64array"}if(function(t){return "function"==typeof t.throw&&"function"==typeof t.return&&"function"==typeof t.next}(t))return "generator";switch(e=o.call(t)){case"[object Object]":return "object";case"[object Map Iterator]":return "mapiterator";case"[object Set Iterator]":return "setiterator";case"[object String Iterator]":return "stringiterator";case"[object Array Iterator]":return "arrayiterator"}return e.slice(8,-1).toLowerCase().replace(/\s/g,"")},s);}(e={exports:{}},e.exports),e.exports);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r);}return n}function s(t,e,n){return Math.max(Math.min(t,Math.max(e,n)),Math.min(e,n))}function c(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];var r=e[0].constructor;return e.reduce(function(t,e){var n=new r((0|t.byteLength)+(0|e.byteLength));return n.set(t,0),n.set(e,0|t.byteLength),n},new r)}return function(){function r(){var e=this,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};if(i(this,r),this.option=u(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(n,!0).forEach(function(t){o(e,t,n[t]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t));});}return e}({},r.option,{},t),r.scheme),this.option.volume=s(this.option.volume,0,1),this.option.chunk=s(this.option.chunk,0,1/0),this.option.maxTimeDiff=s(this.option.maxTimeDiff,0,1/0),this.option.autoEndTime=s(this.option.autoEndTime,0,1/0),this.context=new(window.AudioContext||window.webkitAudioContext),this.gainNode=this.context.createGain(),this.gainNode.gain.value=this.option.volume,this.source=null,this.decoding=!1,this.playing=!1,this.loadLength=0,this.loadByteSize=0,this.audioDuration=0,this.pcmLength=0,this.timestamps=[],this.audiobuffers=[],this.timestampTmp=[],this.decodeErrorBuffer=new Uint8Array,this.decodeWaitingBuffer=new Uint8Array,this.autoEndDebounce=function(r,o,i){var u;return function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];clearTimeout(u),u=setTimeout(function(){u=null,r.apply(i,e);},o);}}(function(){e.end();},this.option.autoEndTime),this.option.touchResume&&"suspended"===this.context.state&&"ontouchstart"in window){var n=function t(){e.context.resume(),e.volume=1,document.body.removeEventListener("touchstart",t,!1),document.body.removeEventListener("click",t,!1);};document.body.addEventListener("touchstart",n,!1),document.body.addEventListener("click",n,!1);}}return t(r,[{key:"destroy",value:function(){return this.stop(),this.context=null,this.gainNode=null,this.source=null,this.timestamps=[],this.audiobuffers=[],this.timestampTmp=[],this.decodeErrorBuffer=new Uint8Array,this.decodeWaitingBuffer=new Uint8Array,this.option.onDestroy(),this}},{key:"load",value:function(t,e){var n=this;if(this.decoding=!0,this.loadLength+=1,this.loadByteSize+=t.byteLength,this.option.onLoad(t,e),this.decodeWaitingBuffer.byteLength>=this.option.chunk){this.timestamps.push(this.timestampTmp[0]),this.timestampTmp=[];var r=c(this.decodeErrorBuffer,this.decodeWaitingBuffer).buffer;this.decodeWaitingBuffer=new Uint8Array,this.context.decodeAudioData(r,function(t){n.audioDuration+=t.duration,n.pcmLength+=t.length,n.audiobuffers.push(t),n.decodeErrorBuffer=new Uint8Array,n.option.onDecodeDone(t);},function(t){n.decodeErrorBuffer=c(n.decodeErrorBuffer,n.decodeWaitingBuffer),n.option.onDecodeError(t);});}else this.timestampTmp.push(e),this.decodeWaitingBuffer=c(this.decodeWaitingBuffer,t);return this.option.autoEnd&&this.autoEndDebounce(),this}},{key:"end",value:function(){var e=this;if(this.decodeWaitingBuffer.length){this.timestamps.push(this.timestampTmp[0]),this.timestampTmp=[];var t=this.decodeWaitingBuffer.buffer;this.decodeWaitingBuffer=new Uint8Array,this.decodeErrorBuffer=new Uint8Array,this.context.decodeAudioData(t,function(t){e.audioDuration+=t.duration,e.pcmLength+=t.length,e.audiobuffers.push(t),e.decoding=!1,e.option.onEnd();});}return this}},{key:"findIndex",value:function(r){var o=this;return this.timestamps.findIndex(function(t,e){var n=o.audiobuffers[e];return n&&t+1e3*n.duration>=r})}},{key:"play",value:function(t){var o=this,e=0<arguments.length&&void 0!==t?t:0;this.source&&(this.source.onended=null,this.source.stop(),this.source=null),e+=1,this.playing=!0;var i=this.findIndex(e),u=this.timestamps[i],n=this.audiobuffers[i];if(void 0===u||void 0===n)return this.stop(i,u);var r=Math.max(0,(e-u)/1e3);return this.source=this.context.createBufferSource(),this.source.connect(this.gainNode),this.gainNode.connect(this.context.destination),this.source.buffer=n,this.option.onPlay(n,e,r),this.source.start(0,r),this.source.onended=function(){var t=o.timestamps[i+1],e=o.audiobuffers[i+1];if(void 0!==t&&void 0!==e){var n=o.option.onNext(t),r=o.findIndex(n);!o.option.cache&&0<r&&(o.option.onFreeMemory({total:o.pcmLength,pcm:o.audiobuffers.reduce(function(t,e){return t+=e.length},0),index:r}),o.audiobuffers.splice(0,r),o.timestamps.splice(0,r)),o.play(n);}else o.stop(i,u);},this}},{key:"stop",value:function(t,e){return this.playing=!1,this.source&&(this.source.onended=null,this.source.stop(),this.source=null),this.option.onStop(t,e),this}},{key:"volume",get:function(){return this.gainNode.gain.value},set:function(t){this.gainNode.gain.value=s(t,0,1),this.option.onVolumeChange(t);}}],[{key:"option",get:function(){return {volume:.7,cache:!0,chunk:65536,maxTimeDiff:200,autoEnd:!0,autoEndTime:5e3,touchResume:!0,onNext:function(t){return t},onLoad:function(){return null},onStop:function(){return null},onPlay:function(){return null},onEnd:function(){return null},onDestroy:function(){return null},onDecodeDone:function(){return null},onDecodeError:function(){return null},onVolumeChange:function(){return null},onFreeMemory:function(){return null}}}},{key:"scheme",get:function(){return {volume:"number",cache:"boolean",chunk:"number",maxTimeDiff:"number",autoEnd:"boolean",autoEndTime:"number",touchResume:"boolean",onNext:"function",onLoad:"function",onStop:"function",onPlay:"function",onEnd:"function",onDestroy:"function",onDecodeDone:"function",onDecodeError:"function",onVolumeChange:"function",onFreeMemory:"function"}}}]),r}()});
  });

  var AudioDecoder =
  /*#__PURE__*/
  function () {
    function AudioDecoder(flv, decoder) {
      var _this = this;

      classCallCheck(this, AudioDecoder);

      this.flv = flv;
      this.dida = new dida({
        volume: flv.options.muted ? 0 : flv.options.volume,
        cache: flv.options.cache,
        maxTimeDiff: flv.options.maxTimeDiff,
        touchResume: flv.options.touchResume,
        onNext: function onNext(timestamp) {
          var currentTime = decoder.currentTime * 1000;
          var timeDiff = timestamp - currentTime;
          flv.debug.log('time-diff', timeDiff);

          if (Math.abs(timeDiff) >= flv.options.maxTimeDiff) {
            flv.debug.log('time-sync', timeDiff);
            decoder.currentTime = timestamp / 1000;
          }

          return timestamp;
        },
        onVolumeChange: function onVolumeChange(value) {
          flv.emit('volumechange', value);
        },
        onFreeMemory: function onFreeMemory(info) {
          flv.debug.log('free-audio-memory', info);
          flv.emit('freeAudioMemory', info);
        }
      });
      flv.on('audioData', function (uint8, timestamp) {
        _this.dida.load(uint8, timestamp);
      });
      flv.on('destroy', function () {
        _this.dida.destroy();
      });
    }

    createClass(AudioDecoder, [{
      key: "play",
      value: function play() {
        var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        this.dida.play(startTime * 1000);
      }
    }, {
      key: "stop",
      value: function stop() {
        this.dida.stop();
      }
    }, {
      key: "muted",
      get: function get() {
        return this.volume === 0;
      },
      set: function set(value) {
        if (value) {
          this.volume = 0;
        } else {
          this.volume = 0.7;
        }
      }
    }, {
      key: "volume",
      get: function get() {
        return this.dida.volume;
      },
      set: function set(volume) {
        this.dida.volume = volume;
      }
    }, {
      key: "decoding",
      get: function get() {
        return this.dida.decoding;
      }
    }, {
      key: "playing",
      get: function get() {
        return this.dida.playing;
      }
    }]);

    return AudioDecoder;
  }();

  var Decoder =
  /*#__PURE__*/
  function () {
    function Decoder(flv) {
      var _this = this;

      classCallCheck(this, Decoder);

      this.flv = flv;
      this.ended = false;
      this.playing = false;
      this.waiting = false;
      this.animationFrameTimer = null;
      this.waitingTimer = null;
      this.currentTime = 0;
      this.lastUpdateTime = 0;
      this.video = new window.FlvplayerDecoder(flv, this);

      if (flv.options.hasAudio) {
        this.audio = new AudioDecoder(flv, this);
      } else {
        this.audio = {
          play: function play() {
            return null;
          },
          stop: function stop() {
            return null;
          },
          playing: true,
          decoding: false
        };
      }

      flv.on('ready', function () {
        if (flv.options.autoPlay) {
          _this.play();
        } else {
          _this.video.draw(0);
        }
      });
      flv.on('destroy', function () {
        _this.pause();
      });
      flv.on('timeupdate', function (currentTime) {
        if (!flv.options.live && currentTime >= flv.player.duration) {
          _this.pause();
        }
      });
      var isPlaying = false;
      flv.events.proxy(document, 'visibilitychange', function () {
        if (document.hidden) {
          isPlaying = _this.playing;

          _this.pause();
        } else if (isPlaying) {
          _this.play();
        }
      });
    }

    createClass(Decoder, [{
      key: "play",
      value: function play() {
        this.lastUpdateTime = getNowTime();
        this.video.play(this.currentTime);
        this.audio.play(this.currentTime);
        this.animationFrame();
        this.flv.emit('play');
      }
    }, {
      key: "animationFrame",
      value: function animationFrame() {
        var _this2 = this;

        var _this$flv = this.flv,
            options = _this$flv.options,
            player = _this$flv.player,
            debug = _this$flv.debug;
        this.animationFrameTimer = requestAnimationFrame(function () {
          if (_this2.video.playing && _this2.audio.playing) {
            _this2.ended = false;
            _this2.playing = true;
            _this2.waiting = false;
            var updateTime = getNowTime();
            _this2.currentTime += (updateTime - _this2.lastUpdateTime) / 1000;
            _this2.lastUpdateTime = updateTime;

            _this2.flv.emit('timeupdate', _this2.currentTime);
          } else if (player.streaming || _this2.video.decoding || _this2.audio.decoding) {
            _this2.ended = false;
            _this2.playing = true;
            _this2.waiting = true;

            _this2.flv.emit('waiting', _this2.currentTime);

            _this2.waitingTimer = setTimeout(function () {
              debug.log('play-retry', {
                streaming: player.streaming,
                playing: {
                  video: _this2.video.playing,
                  audio: _this2.audio.playing
                },
                decoding: {
                  video: _this2.video.decoding,
                  audio: _this2.audio.decoding
                }
              });

              _this2.play();
            }, 1000);
            return;
          } else {
            _this2.ended = true;
            _this2.playing = false;
            _this2.waiting = false;

            _this2.pause();

            _this2.flv.emit('ended', _this2.currentTime);

            if (options.loop && options.cache && !options.live) {
              _this2.currentTime = 0;

              _this2.play();

              _this2.flv.emit('loop');
            }

            return;
          }

          _this2.animationFrame();
        });
      }
    }, {
      key: "pause",
      value: function pause() {
        cancelAnimationFrame(this.animationFrameTimer);
        clearTimeout(this.waitingTimer);
        this.animationFrameTimer = null;
        this.waitingTimer = null;
        this.video.stop();
        this.audio.stop();
        this.ended = false;
        this.playing = false;
        this.waiting = false;
        this.flv.emit('pause');
      }
    }, {
      key: "seeked",
      value: function seeked(time) {
        var _this$flv2 = this.flv,
            player = _this$flv2.player,
            options = _this$flv2.options;
        if (!options.cache || options.live) return;
        cancelAnimationFrame(this.animationFrameTimer);
        clearTimeout(this.waitingTimer);
        this.animationFrameTimer = null;
        this.waitingTimer = null;
        this.currentTime = time;
        this.video.draw(Math.floor(time * player.frameRate));

        if (this.playing) {
          this.play();
        }

        this.flv.emit('seeked', time);
      }
    }]);

    return Decoder;
  }();

  function getProfileString(profileIdc) {
    switch (profileIdc) {
      case 66:
        return 'Baseline';

      case 77:
        return 'Main';

      case 88:
        return 'Extended';

      case 100:
        return 'High';

      case 110:
        return 'High10';

      case 122:
        return 'High422';

      case 244:
        return 'High444';

      default:
        return 'Unknown';
    }
  }

  function getLevelString(levelIdc) {
    return (levelIdc / 10).toFixed(1);
  }

  function getAVCCodecs(record) {
    var AVCProfileIndication = record.AVCProfileIndication.toString(16);
    var profileCompatibility = record.profile_compatibility.toString(16);
    var AVCLevelIndication = record.AVCLevelIndication.toString(16);
    return "avc1.".concat(AVCProfileIndication).concat(profileCompatibility).concat(AVCLevelIndication);
  }

  function getAACCodecs(_ref) {
    var audioObjectType = _ref.audioObjectType;
    var objectTypeId = (audioObjectType - 1 << 6).toString(16);
    return "mp4a.".concat(objectTypeId, ".").concat(audioObjectType);
  }

  var Demuxer = function Demuxer(flv) {
    var _this = this;

    classCallCheck(this, Demuxer);

    var options = flv.options,
        debug = flv.debug;
    this.header = null;
    this.streaming = false;
    this.demuxed = false;
    this.videoDataSize = 0;
    this.audioDataSize = 0;
    this.videoDataLength = 0;
    this.audioDataLength = 0;
    this.streamStartTime = 0;
    this.streamEndTime = 0;
    this.scripMeta = null;
    this.AudioSpecificConfig = null;
    this.AVCDecoderConfigurationRecord = null;
    this.demuxWorker = new Worker(URL.createObjectURL(new Blob(["\"use strict\";function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError(\"Invalid attempt to spread non-iterable instance\")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||\"[object Arguments]\"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}function _typeof(a){return _typeof=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&\"function\"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?\"symbol\":typeof a},_typeof(a)}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError(\"Cannot call a class as a function\")}function _possibleConstructorReturn(a,b){return b&&(\"object\"===_typeof(b)||\"function\"==typeof b)?b:_assertThisInitialized(a)}function _assertThisInitialized(a){if(void 0===a)throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");return a}function _inherits(a,b){if(\"function\"!=typeof b&&null!==b)throw new TypeError(\"Super expression must either be null or a function\");a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,writable:!0,configurable:!0}}),b&&_setPrototypeOf(a,b)}function _wrapNativeSuper(a){var b=\"function\"==typeof Map?new Map:void 0;return _wrapNativeSuper=function(a){function c(){return _construct(a,arguments,_getPrototypeOf(this).constructor)}if(null===a||!_isNativeFunction(a))return a;if(\"function\"!=typeof a)throw new TypeError(\"Super expression must either be null or a function\");if(\"undefined\"!=typeof b){if(b.has(a))return b.get(a);b.set(a,c)}return c.prototype=Object.create(a.prototype,{constructor:{value:c,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(c,a)},_wrapNativeSuper(a)}function isNativeReflectConstruct(){if(\"undefined\"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if(\"function\"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(a){return!1}}function _construct(){return _construct=isNativeReflectConstruct()?Reflect.construct:function(b,c,d){var e=[null];e.push.apply(e,c);var a=Function.bind.apply(b,e),f=new a;return d&&_setPrototypeOf(f,d.prototype),f},_construct.apply(null,arguments)}function _isNativeFunction(a){return-1!==Function.toString.call(a).indexOf(\"[native code]\")}function _setPrototypeOf(a,b){return _setPrototypeOf=Object.setPrototypeOf||function(a,b){return a.__proto__=b,a},_setPrototypeOf(a,b)}function _getPrototypeOf(a){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)},_getPrototypeOf(a)}var FlvPlayerError=/*#__PURE__*/function(a){function b(a){var c;return _classCallCheck(this,b),c=_possibleConstructorReturn(this,_getPrototypeOf(b).call(this,a)),c.name=\"FlvPlayerError\",c}return _inherits(b,a),b}(_wrapNativeSuper(Error)),debug={warn:function warn(a){if(!a){for(var b,c=arguments.length,d=Array(1<c?c-1:0),e=1;e<c;e++)d[e-1]=arguments[e];(b=console).warn.apply(b,d)}},error:function error(a,b){if(!a)throw new FlvPlayerError(b)}};function mergeBuffer(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];var d=b[0].constructor;return b.reduce(function(a,b){var c=new d((0|a.byteLength)+(0|b.byteLength));return c.set(a,0),c.set(b,0|a.byteLength),c},new d)}function readBufferSum(a){var b=!(1<arguments.length&&arguments[1]!==void 0)||arguments[1];return a.reduce(function(c,d,e){return c+(b?d:d-128)*Math.pow(256,a.length-e-1)},0)}function readString(a){var b;return(b=String.fromCharCode).call.apply(b,[String].concat(_toConsumableArray(a)))}function readBuffer(a){function b(d){for(var e=new Uint8Array(d),f=0;f<d;f+=1)e[f]=a[c],c+=1;return b.index=c,e}var c=0;return b.index=0,b}function readDouble(a){var c=new DataView(new ArrayBuffer(a.length));return a.forEach(function(a,b){c.setUint8(b,a)}),c.getFloat64(0)}function readBoolean(a){return 0!==a[0]}var index=0,header=null,uint8=new Uint8Array,scripMeta=null,AudioSpecificConfig=null,AVCDecoderConfigurationRecord=null,nalStart=new Uint8Array([0,0,0,1]);function readable(a){return uint8.length-index>=a}function read(a){for(var b=new Uint8Array(a),c=0;c<a;c+=1)b[c]=uint8[index],index+=1;return b}function demuxerScripTag(a){function b(a){var d=null;if(a!==void 0)switch(a){case 0:d=readDouble(c(8));break;case 1:d=readBoolean(c(1));break;case 2:{var l=readBufferSum(c(2));d=readString(c(l));break}case 3:{d=Object.create(null);for(var m=-1;9!==m;){var e=readBufferSum(c(2)),f=readString(c(e)),g=c(1)[0];f&&(d[f]=b(g)),m=g}break}case 5:d=null;break;case 6:d=void 0;break;case 7:d=\"Reference #\".concat(c.index),c(2);break;case 8:{d=Object.create(null);for(var n=-1;9!==n;){var h=readBufferSum(c(2)),j=readString(c(h)),k=c(1)[0];j&&(d[j]=b(k)),n=k}break}case 10:{var o=readBufferSum(c(4));d=[];for(var p,q=0;q<o;q+=1)p=c(1)[0],d.push(b(p));break}case 11:d=readDouble(c(2));break;case 12:{var i=readBufferSum(c(4));d=readString(c(i));break}default:debug.error(!1,\"AMF: Unknown metaData type: \".concat(a));}return d}var c=readBuffer(a.body),d=Object.create(null),e=Object.create(null);for(d.type=c(1)[0],debug.error(2===d.type,\"AMF: [amf1] type expect 2, but got \".concat(d.type)),d.size=readBufferSum(c(2)),d.string=readString(c(d.size)),e.type=c(1)[0],debug.error(8===e.type||3===e.type,\"AMF: [amf2] type expect 8 or 3, but got \".concat(e.type)),e.size=readBufferSum(c(4)),e.metaData=Object.create(null);c.index<a.body.length;){var f=readBufferSum(c(2)),g=readString(c(f)),h=c(1)[0];g&&(e.metaData[g]=b(h))}debug.warn(c.index===a.body.length,\"[AMF] Seems to be incompletely parsed\"),debug.warn(e.size===Object.keys(e.metaData).length,\"[AMF] [amf2] length does not match\"),scripMeta={amf1:d,amf2:e},postMessage({type:\"scripMeta\",data:scripMeta})}function demuxerVideoTag(a){debug.error(1<a.body.length,\"Invalid video packet\");var b={frameType:(240&a.body[0])>>4,codecID:15&a.body[0]};debug.error(7===b.codecID,\"[videoTrack] Unsupported codec in video frame: \".concat(b.codecID));var c=a.body.slice(1,5);debug.error(4<=c.length,\"[H264] Invalid AVC packet, missing AVCPacketType or/and CompositionTime\");var d=new DataView(c.buffer),e=d.getUint8(0),f=(16777215&d.getUint32(0))<<8>>8,g=f+a.timestamp,h=a.body.subarray(5);if(0===e){debug.warn(!AVCDecoderConfigurationRecord,\"[h264] Find another one AVCDecoderConfigurationRecord\"),debug.error(7<=h.length,\"[H264] AVCDecoderConfigurationRecord parse length is not enough\");var j=readBuffer(h),k={};k.configurationVersion=j(1)[0],debug.error(1===k.configurationVersion,\"[H264] Invalid configurationVersion: \".concat(k.configurationVersion)),k.AVCProfileIndication=j(1)[0],debug.error(0!==k.AVCProfileIndication,\"[H264] Invalid AVCProfileIndication: \".concat(k.AVCProfileIndication)),k.profile_compatibility=j(1)[0],k.AVCLevelIndication=j(1)[0],k.lengthSizeMinusOne=(3&j(1)[0])+1,debug.error(4===k.lengthSizeMinusOne||3!==k.lengthSizeMinusOne,\"[H264] Invalid lengthSizeMinusOne: \".concat(k.lengthSizeMinusOne)),k.numOfSequenceParameterSets=31&j(1)[0],debug.error(0!==k.numOfSequenceParameterSets,\"[H264] Invalid numOfSequenceParameterSets: \".concat(k.numOfSequenceParameterSets)),debug.warn(1===k.numOfSequenceParameterSets,\"[H264] Strange numOfSequenceParameterSets: \".concat(k.numOfSequenceParameterSets));for(var p=0;p<k.numOfSequenceParameterSets;p+=1)if(k.sequenceParameterSetLength=readBufferSum(j(2)),0<k.sequenceParameterSetLength){var i=j(k.sequenceParameterSetLength);postMessage({type:\"videoData\",data:mergeBuffer(nalStart,i)})}k.numOfPictureParameterSets=j(1)[0],debug.error(0!==k.numOfPictureParameterSets,\"[H264] Invalid numOfPictureParameterSets: \".concat(k.numOfPictureParameterSets)),debug.warn(1===k.numOfPictureParameterSets,\"[H264] Strange numOfPictureParameterSets: \".concat(k.numOfPictureParameterSets));for(var q=0;q<k.numOfPictureParameterSets;q+=1)if(k.pictureParameterSetLength=readBufferSum(j(2)),0<k.pictureParameterSetLength){var r=j(k.pictureParameterSetLength);postMessage({type:\"videoData\",data:mergeBuffer(nalStart,r)})}AVCDecoderConfigurationRecord=k,postMessage({type:\"AVCDecoderConfigurationRecord\",data:k})}else if(1===e)for(var l,m=AVCDecoderConfigurationRecord,n=m.lengthSizeMinusOne,o=readBuffer(h);o.index<h.length;)l=readBufferSum(o(n)),postMessage({type:\"videoData\",data:mergeBuffer(nalStart,o(l)),timestamp:g});else debug.error(2===e,\"[H264] Invalid video packet type \".concat(e))}function demuxerAudioTag(a){debug.error(1<a.body.length,\"Invalid audio packet\");var b={soundFormat:(240&a.body[0])>>4,soundRate:(12&a.body[0])>>2,soundSize:(2&a.body[0])>>1,soundType:(1&a.body[0])>>0};debug.error(10===b.soundFormat,\"[audioTrack] unsupported audio format: \".concat(b.soundFormat));var c=a.body.subarray(1),d=c[0];if(0===d){var k=c.subarray(1);debug.warn(!AudioSpecificConfig,\"[AAC] Find another one AudioSpecificConfig\"),debug.error(2<=k.length,\"[AAC] AudioSpecificConfig parse length is not enough\");var l={};l.audioObjectType=(248&k[0])>>3,l.samplingFrequencyIndex=((7&k[0])<<1)+(1&(128&k[1])>>7),l.channelConfiguration=(127&k[1])>>3,AudioSpecificConfig=l,postMessage({type:\"AudioSpecificConfig\",data:l})}else{var e=AudioSpecificConfig,f=e.audioObjectType,g=e.samplingFrequencyIndex,h=e.channelConfiguration,i=a.dataSize-2+7,j=new Uint8Array(7);j[0]=255,j[1]=240,j[1]|=0,j[1]|=0,j[1]|=1,j[2]=f-1<<6,j[2]|=(15&g)<<2,j[2]|=0,j[2]|=(4&h)>>2,j[3]=(3&h)<<6,j[3]|=0,j[3]|=0,j[3]|=0,j[3]|=0,j[3]|=(6144&i)>>11,j[4]=(2040&i)>>3,j[5]=(7&i)<<5,j[5]|=31,j[6]=252;var m=a.body.subarray(2);postMessage({type:\"audioData\",data:mergeBuffer(j,m),timestamp:a.timestamp})}}onmessage=function onmessage(a){if(uint8=mergeBuffer(uint8,a.data),!header&&readable(13)){header=Object.create(null),header.signature=readString(read(3)),header.version=read(1)[0],debug.error(\"FLV\"===header.signature&&1===header.version,\"FLV header not found\"),header.flags=read(1)[0];var b=0!=(4&header.flags)>>>2,c=0!=(1&header.flags);debug.warn(c,\"[FLV header] flags not found video\"),debug.warn(b,\"[FLV header] flags not found audio\"),header.headersize=readBufferSum(read(4));var j=readBufferSum(read(4));debug.error(0===j,\"PrevTagSize0 should be equal to 0, but got \".concat(j)),postMessage({type:\"flvHeader\",data:header})}for(;index<uint8.length;){var d=Object.create(null),e=index;if(readable(11)){d.tagType=read(1)[0],d.dataSize=readBufferSum(read(3));var f=read(1)[0],g=read(1)[0],h=read(1)[0],i=read(1)[0];d.timestamp=h|g<<8|f<<16|i<<24,d.streamID=readBufferSum(read(3)),debug.error(0===d.streamID,\"streamID should be equal to 0, but got \".concat(d.streamID))}else return index=0,void(uint8=uint8.subarray(e));if(readable(d.dataSize+4)){d.body=read(d.dataSize);var k=readBufferSum(read(4));debug.error(k===d.dataSize+11,\"Invalid PrevTagSize: \".concat(k))}else return index=0,void(uint8=uint8.subarray(e));switch(d.tagType){case 18:demuxerScripTag(d);break;case 9:demuxerVideoTag(d);break;case 8:demuxerAudioTag(d);break;default:debug.error(!1,\"unknown tag type: \".concat(d.tagType));}}index=0,uint8=new Uint8Array};"])));
    this.demuxRate = calculationRate(function (rate) {
      flv.emit('demuxRate', rate);
    });
    flv.on('destroy', function () {
      _this.demuxWorker.terminate();

      _this.demuxWorker = null;
    });
    flv.on('streamStart', function () {
      _this.streaming = true;
      _this.streamStartTime = getNowTime();

      if (typeof options.url === 'string') {
        var url = Object.assign(document.createElement('a'), {
          href: options.url
        }).href;
        debug.log('stream-url', url);
      }
    });
    flv.on('streaming', function (uint8) {
      _this.demuxWorker.postMessage(uint8);
    });
    flv.on('streamEnd', function (uint8) {
      _this.streaming = false;
      _this.streamEndTime = getNowTime();

      if (uint8) {
        _this.index = 0;

        _this.demuxWorker.postMessage(uint8);
      }

      debug.log('stream-time', "".concat(_this.streamEndTime - _this.streamStartTime, " ms"));
      _this.demuxed = true;
      flv.emit('demuxDone');
      debug.log('demux-done');
    });
    var sps = new Uint8Array();
    var pps = new Uint8Array();

    this.demuxWorker.onmessage = function (event) {
      var message = event.data;

      switch (message.type) {
        case 'flvHeader':
          _this.header = message.data;
          flv.emit('flvHeader', _this.header);
          debug.log('flv-header', _this.header);
          break;

        case 'scripMeta':
          _this.scripMeta = message.data;
          flv.emit('scripMeta', _this.scripMeta);
          debug.log('scrip-meta', _this.scripMeta);
          break;

        case 'AVCDecoderConfigurationRecord':
          _this.AVCDecoderConfigurationRecord = message.data;
          flv.emit('AVCDecoderConfigurationRecord', _this.AVCDecoderConfigurationRecord);
          debug.log('AVCDecoderConfigurationRecord', _this.AVCDecoderConfigurationRecord);
          debug.log('AVC-codecs', getAVCCodecs(_this.AVCDecoderConfigurationRecord));
          debug.log('AVC-profile', getProfileString(_this.AVCDecoderConfigurationRecord.AVCProfileIndication));
          debug.log('AVC-level', getLevelString(_this.AVCDecoderConfigurationRecord.AVCLevelIndication));
          break;

        case 'AudioSpecificConfig':
          _this.AudioSpecificConfig = message.data;
          flv.emit('AudioSpecificConfig', _this.AudioSpecificConfig);
          debug.log('AudioSpecificConfig', _this.AudioSpecificConfig);
          debug.log('AAC-codecs', getAACCodecs(_this.AudioSpecificConfig));
          break;

        case 'videoData':
          {
            _this.demuxRate(1);

            _this.videoDataLength += 1;
            _this.videoDataSize += message.data.byteLength;
            var readNalu = readBuffer(message.data);
            readNalu(4);
            var naluType = readNalu(1)[0] & 31;

            switch (naluType) {
              case 1:
              case 5:
                {
                  flv.emit('videoData', mergeBuffer(sps, pps, message.data), message.timestamp);
                  break;
                }

              case 7:
                sps = message.data;
                break;

              case 8:
                pps = message.data;
                break;

              default:
                break;
            }

            break;
          }

        case 'audioData':
          _this.audioDataLength += 1;
          _this.audioDataSize += message.data.byteLength;
          flv.emit('audioData', message.data, message.timestamp);
          break;

        default:
          break;
      }
    };
  };

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  var FetchLoader =
  /*#__PURE__*/
  function () {
    function FetchLoader(flv) {
      var _this = this;

      classCallCheck(this, FetchLoader);

      this.flv = flv;
      var options = flv.options,
          debug = flv.debug,
          player = flv.player;
      this.byteLength = 0;
      this.reader = null;
      this.chunkStart = 0;
      this.contentLength = 0;
      this.data = new Uint8Array();
      this.readChunk = throttle(this.readChunk, 1000);
      this.streamRate = calculationRate(function (rate) {
        flv.emit('streamRate', rate);
      });
      flv.on('destroy', function () {
        _this.reader.cancel();

        _this.data = null;
      });
      flv.on('timeupdate', function (currentTime) {
        if (!options.live && player.loaded - currentTime <= 5) {
          _this.readChunk();
        }
      });

      if (checkReadableStream()) {
        this.initFetchStream();
      } else {
        fetch(options.url, {
          method: 'head',
          credentials: options.withCredentials ? 'include' : 'omit',
          mode: options.cors ? 'cors' : 'no-cors',
          headers: {
            range: 'bytes=0-1024'
          }
        }).then(function (response) {
          _this.contentLength = Number(response.headers.get('content-length')) || options.filesize;
          var acceptRanges = response.headers.get('accept-ranges');
          debug.error(typeof acceptRanges === 'string' && acceptRanges.includes('bytes'), "Unable to get response header 'accept-ranges'");

          _this.flv.emit('streamStart');

          _this.initFetchRange(0, options.chunkSize);
        }).catch(function (error) {
          flv.emit('streamError', error);
          throw error;
        });
      }
    }

    createClass(FetchLoader, [{
      key: "readChunk",
      value: function readChunk() {
        var options = this.flv.options;
        var chunkEnd = Math.min(this.chunkStart + options.chunkSize, this.data.length);

        if (chunkEnd > this.chunkStart) {
          var chunkData = this.data.subarray(this.chunkStart, chunkEnd);
          this.flv.emit('streaming', chunkData);
          this.chunkStart = chunkEnd;
        }
      }
    }, {
      key: "initFetchStream",
      value: function initFetchStream() {
        var _this$flv = this.flv,
            options = _this$flv.options,
            debug = _this$flv.debug;
        var self = this;
        this.flv.emit('streamStart');
        return fetch(options.url, {
          credentials: options.withCredentials ? 'include' : 'omit',
          mode: options.cors ? 'cors' : 'no-cors',
          headers: options.headers
        }).then(function (response) {
          self.reader = response.body.getReader();
          return function read() {
            return self.reader.read().then(function (_ref) {
              var done = _ref.done,
                  value = _ref.value;

              if (done) {
                self.flv.emit('streamEnd');
                debug.log('stream-end', "".concat(self.byteLength, " byte"));
                return;
              }

              var uint8 = new Uint8Array(value);
              self.byteLength += uint8.byteLength;
              self.streamRate(uint8.byteLength);

              if (options.live) {
                self.flv.emit('streaming', uint8);
              } else {
                self.data = mergeBuffer(self.data, uint8);

                if (self.chunkStart === 0) {
                  self.readChunk();
                }
              } // eslint-disable-next-line consistent-return


              return read();
            }).catch(function (error) {
              self.flv.emit('streamError', error);
              throw error;
            });
          }();
        }).catch(function (error) {
          self.flv.emit('streamError', error);
          throw error;
        });
      }
    }, {
      key: "initFetchRange",
      value: function initFetchRange(rangeStart, rangeEnd) {
        var options = this.flv.options;
        var self = this;
        return fetch(options.url, {
          credentials: options.withCredentials ? 'include' : 'omit',
          mode: options.cors ? 'cors' : 'no-cors',
          headers: _objectSpread({}, options.headers, {
            range: "bytes=".concat(rangeStart, "-").concat(rangeEnd)
          })
        }).then(function (response) {
          return response.arrayBuffer();
        }).then(function (value) {
          var uint8 = new Uint8Array(value);
          self.byteLength += uint8.byteLength;
          self.streamRate(uint8.byteLength);

          if (options.live) {
            self.flv.emit('streaming', uint8);
          } else {
            self.data = mergeBuffer(self.data, uint8);

            if (self.chunkStart === 0) {
              self.readChunk();
            }
          }

          var nextRangeStart = Math.min(self.contentLength, rangeEnd + 1);
          var nextRangeEnd = Math.min(self.contentLength, nextRangeStart + options.chunkSize);

          if (nextRangeEnd > nextRangeStart) {
            self.initFetchRange(nextRangeStart, nextRangeEnd);
          }
        }).catch(function (error) {
          self.flv.emit('streamError', error);
          throw error;
        });
      }
    }]);

    return FetchLoader;
  }();

  var WebsocketLoader = function WebsocketLoader(flv) {
    var _this = this;

    classCallCheck(this, WebsocketLoader);

    var debug = flv.debug,
        options = flv.options,
        proxy = flv.events.proxy;
    this.byteLength = 0;
    this.streamRate = calculationRate(function (rate) {
      flv.emit('streamRate', rate);
    });
    this.socket = new WebSocket(flv.options.url);
    this.socket.binaryType = 'arraybuffer';
    flv.emit('streamStart');
    proxy(this.socket, 'open', function () {
      _this.socket.send(options.socketSend);
    });
    proxy(this.socket, 'message', function (event) {
      var uint8 = new Uint8Array(event.data);
      _this.byteLength += uint8.byteLength;

      _this.streamRate(uint8.byteLength);

      flv.emit('streaming', uint8);
    });
    proxy(this.socket, 'close', function () {
      flv.emit('streamEnd');
      debug.log('stream-end', "".concat(_this.byteLength, " byte"));
    });
    proxy(this.socket, 'error', function (error) {
      flv.emit('streamError', error);
      throw error;
    });
    flv.on('destroy', function () {
      _this.socket.close();
    });
  };

  var FileLoader = function FileLoader(flv) {
    classCallCheck(this, FileLoader);

    var reader = new FileReader();
    var proxy = flv.events.proxy;
    proxy(reader, 'load', function (e) {
      var uint8 = new Uint8Array(e.target.result);
      flv.emit('streamEnd', uint8);
      flv.debug.log('stream-end', "".concat(uint8.byteLength, " byte"));
    });
    proxy(reader, 'error', function (error) {
      flv.emit('streamError', error);
    });
    flv.on('destroy', function () {
      reader.abort();
    });
    flv.emit('streamStart');
    reader.readAsArrayBuffer(flv.options.url);
  };

  var Stream =
  /*#__PURE__*/
  function () {
    function Stream(flv) {
      classCallCheck(this, Stream);

      var Loader = Stream.getLoaderFactory(flv.options.url);
      flv.debug.log('stream-loader', Loader.name);
      return new Loader(flv, this);
    }

    createClass(Stream, null, [{
      key: "getLoaderFactory",
      value: function getLoaderFactory(url) {
        if (url instanceof File) {
          return FileLoader;
        }

        if (/^ws{1,2}:\/\//i.test(url)) {
          return WebsocketLoader;
        }

        return FetchLoader;
      }
    }]);

    return Stream;
  }();

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  var id = 0;

  var FlvPlayer =
  /*#__PURE__*/
  function (_Emitter) {
    inherits(FlvPlayer, _Emitter);

    function FlvPlayer(options) {
      var _this;

      classCallCheck(this, FlvPlayer);

      _this = possibleConstructorReturn(this, getPrototypeOf(FlvPlayer).call(this));
      _this.options = optionValidator(_objectSpread$1({}, FlvPlayer.options, {}, options), FlvPlayer.scheme);

      if (_this.options.live) {
        _this.options.cache = false;
        _this.options.hasAudio = false;
      }

      if (typeof _this.options.container === 'string') {
        _this.options.container = document.querySelector(_this.options.container);
      }

      if (window.FlvplayerDecoder) {
        _this.init();
      } else {
        loadScript(_this.options.decoder, 'FlvplayerDecoder').then(function () {
          _this.init();
        });
      }

      console.log('%c FlvPlayer.js %c 1.1.1 %c https://flvplayer.js.org', 'color: #fff; background: #5f5f5f', 'color: #fff; background: #4bc729', '');
      return _this;
    }

    createClass(FlvPlayer, [{
      key: "init",
      value: function init() {
        this.isDestroy = false;
        this.isMobile = isMobile();
        this.isWechat = isWechat();
        this.debug = new Debug(this);
        this.events = new Events(this);
        this.player = new Player(this);
        this.decoder = new Decoder(this);
        this.demuxer = new Demuxer(this);
        this.stream = new Stream(this);
        proxyPropertys(this, this.player);

        if (window.FlvplayerControl && this.options.control) {
          this.control = new window.FlvplayerControl(this);
          proxyPropertys(this, this.control);
        }

        id += 1;
        this.id = id;
        FlvPlayer.instances.push(this);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.isDestroy = true;
        this.emit('destroy');
        FlvPlayer.instances.splice(FlvPlayer.instances.indexOf(this), 1);
      }
    }], [{
      key: "options",
      get: function get() {
        return {
          url: '',
          container: '',
          debug: false,
          live: false,
          loop: false,
          autoPlay: false,
          hasAudio: true,
          control: true,
          cache: true,
          muted: false,
          cors: true,
          touchResume: true,
          withCredentials: false,
          volume: 0.7,
          frameRate: 30,
          maxTimeDiff: 200,
          chunkSize: 1024 * 1024,
          freeMemory: 64 * 1024 * 1024,
          filesize: Infinity,
          width: 400,
          height: 300,
          socketSend: '',
          headers: {},
          decoder: './flvplayer-decoder-baseline.js'
        };
      }
    }, {
      key: "scheme",
      get: function get() {
        return {
          url: 'string|file',
          container: 'string|htmldivelement',
          debug: 'boolean',
          live: 'boolean',
          loop: 'boolean',
          autoPlay: 'boolean',
          hasAudio: 'boolean',
          control: 'boolean',
          cache: 'boolean',
          muted: 'boolean',
          cors: 'boolean',
          touchResume: 'boolean',
          withCredentials: 'boolean',
          volume: 'number',
          frameRate: 'number',
          maxTimeDiff: 'number',
          chunkSize: 'number',
          freeMemory: 'number',
          filesize: 'number',
          width: 'number',
          height: 'number',
          socketSend: 'string',
          headers: 'object',
          decoder: 'string'
        };
      }
    }, {
      key: "isSupported",
      get: function get() {
        return isSupported;
      }
    }, {
      key: "version",
      get: function get() {
        return '1.1.1';
      }
    }, {
      key: "env",
      get: function get() {
        return '"development"';
      }
    }, {
      key: "utils",
      get: function get() {
        return utils;
      }
    }]);

    return FlvPlayer;
  }(Emitter);

  Object.defineProperty(FlvPlayer, 'instances', {
    value: []
  });

  return FlvPlayer;

}));
//# sourceMappingURL=flvplayer.js.map
