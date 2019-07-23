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

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  var objectSpread = _objectSpread;

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

    function FlvPlayerError(message, context) {
      var _this;

      classCallCheck(this, FlvPlayerError);

      _this = possibleConstructorReturn(this, getPrototypeOf(FlvPlayerError).call(this, message));

      if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(assertThisInitialized(_this), context || _this.constructor);
      }

      _this.name = 'FlvPlayerError';
      return _this;
    }

    return FlvPlayerError;
  }(wrapNativeSuper(Error));
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
    element.style[key] = value;
    return element;
  }
  function getStyle(element, key) {
    var numberType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var value = window.getComputedStyle(element, null).getPropertyValue(key);
    return numberType ? parseFloat(value) : value;
  }

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
    function Events() {
      classCallCheck(this, Events);

      this.destroyEvents = [];
      this.proxy = this.proxy.bind(this);
    }

    createClass(Events, [{
      key: "proxy",
      value: function proxy(target, name, callback) {
        var _this = this;

        var option = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        if (Array.isArray(name)) {
          name.forEach(function (item) {
            return _this.proxy(target, item, callback, option);
          });
          return;
        }

        target.addEventListener(name, callback, option);
        this.destroyEvents.push(function () {
          target.removeEventListener(name, callback, option);
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.destroyEvents.forEach(function (event) {
          return event();
        });
      }
    }]);

    return Events;
  }();

  var play = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"22\" width=\"22\" viewBox=\"0 0 22 22\">\n  <path d=\"M17.982 9.275L8.06 3.27A2.013 2.013 0 0 0 5 4.994v12.011a2.017 2.017 0 0 0 3.06 1.725l9.922-6.005a2.017 2.017 0 0 0 0-3.45z\"></path>\n</svg>";

  var pause = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"22\" width=\"22\" viewBox=\"0 0 22 22\">\n    <path d=\"M7 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2zM15 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2z\"></path>\n</svg>";

  var volume = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"22\" width=\"22\" viewBox=\"0 0 22 22\">\n    <path d=\"M10.188 4.65L6 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39V5.04a.498.498 0 0 0-.812-.39zM14.446 3.778a1 1 0 0 0-.862 1.804 6.002 6.002 0 0 1-.007 10.838 1 1 0 0 0 .86 1.806A8.001 8.001 0 0 0 19 11a8.001 8.001 0 0 0-4.554-7.222z\"></path>\n    <path d=\"M15 11a3.998 3.998 0 0 0-2-3.465v6.93A3.998 3.998 0 0 0 15 11z\"></path>\n</svg>";

  var volumeClose = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"22\" width=\"22\" viewBox=\"0 0 22 22\">\n    <path d=\"M15 11a3.998 3.998 0 0 0-2-3.465v2.636l1.865 1.865A4.02 4.02 0 0 0 15 11z\"></path>\n    <path d=\"M13.583 5.583A5.998 5.998 0 0 1 17 11a6 6 0 0 1-.585 2.587l1.477 1.477a8.001 8.001 0 0 0-3.446-11.286 1 1 0 0 0-.863 1.805zM18.778 18.778l-2.121-2.121-1.414-1.414-1.415-1.415L13 13l-2-2-3.889-3.889-3.889-3.889a.999.999 0 1 0-1.414 1.414L5.172 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39v-3.131l2.587 2.587-.01.005a1 1 0 0 0 .86 1.806c.215-.102.424-.214.627-.333l2.3 2.3a1.001 1.001 0 0 0 1.414-1.416zM11 5.04a.5.5 0 0 0-.813-.39L8.682 5.854 11 8.172V5.04z\"></path>\n</svg>";

  var fullscreen = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"36\" width=\"36\" viewBox=\"0 0 36 36\">\n\t<path d=\"m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z\"></path>\n\t<path d=\"m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z\"></path>\n\t<path d=\"m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z\"></path>\n\t<path d=\"M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z\"></path>\n</svg>";

  var loading = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"50px\" height=\"50px\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"uil-default\">\n  <rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"none\" class=\"bk\"/>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(0 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-1s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(30 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.9166666666666666s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(60 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.8333333333333334s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(90 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.75s\" repeatCount=\"indefinite\"/></rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(120 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.6666666666666666s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(150 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.5833333333333334s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(180 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.5s\" repeatCount=\"indefinite\"/></rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(210 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.4166666666666667s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(240 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.3333333333333333s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(270 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.25s\" repeatCount=\"indefinite\"/></rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(300 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.16666666666666666s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(330 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.08333333333333333s\" repeatCount=\"indefinite\"/>\n  </rect>\n</svg>";

  var iconsMap = {
    play: play,
    pause: pause,
    volume: volume,
    volumeClose: volumeClose,
    fullscreen: fullscreen,
    loading: loading
  };
  var icons = {};
  Object.keys(iconsMap).forEach(function (key) {
    icons[key] = "<i class=\"flv-player-icon flv-player-icon-".concat(key, "\">").concat(iconsMap[key], "</i>");
  });

  function template(flv, player) {
    var options = flv.options;
    options.container.classList.add('flv-player-container');
    options.container.innerHTML = "\n        <div class=\"flv-player-inner flv-player-controls-show ".concat(options.live ? 'flv-player-live' : '', " ").concat(options.debug ? 'flv-player-debug' : '', "\">\n            <canvas class=\"flv-player-canvas\" width=\"").concat(options.width, "\" height=\"").concat(options.height, "\"></canvas>\n            ").concat(options.poster ? "<div class=\"flv-player-poster\" style=\"background-image: url(".concat(options.poster, ")\"></div>") : '', "\n            <div class=\"flv-player-loading\">").concat(icons.loading, "</div>\n            ").concat(options.controls ? "\n                <div class=\"flv-player-controls\">\n                    ".concat(!options.live ? "\n                        <div class=\"flv-player-controls-progress\">\n                            <div class=\"flv-player-loaded\"></div>\n                            <div class=\"flv-player-played\">\n                                <div class=\"flv-player-indicator\"></div>\n                            </div>\n                        </div>\n                    " : '', "\n                    <div class=\"flv-player-controls-bottom\">\n                        <div class=\"flv-player-controls-left\">\n                            <div class=\"flv-player-controls-item flv-player-state\">\n                                <div class=\"flv-player-play\">").concat(icons.play, "</div>\n                                <div class=\"flv-player-pause\">").concat(icons.pause, "</div>\n                            </div>\n                            ").concat(options.hasAudio ? "\n                                <div class=\"flv-player-controls-item flv-player-volume\">\n                                    <div class=\"flv-player-volume-on\">".concat(icons.volume, "</div>\n                                    <div class=\"flv-player-volume-off\">").concat(icons.volumeClose, "</div>\n                                    <div class=\"flv-player-volume-panel\">\n                                        <div class=\"flv-player-volume-panel-handle\"></div>\n                                    </div>\n                                </div>\n                            ") : '', "\n                            ").concat(!options.live ? "\n                                <div class=\"flv-player-controls-item flv-player-time\">\n                                    <span class=\"flv-player-current\">00:00</span> / <span class=\"flv-player-duration\">00:00</span>\n                                </div>\n                            " : '', "\n                        </div>\n                        <div class=\"flv-player-controls-right\">\n                            <div class=\"flv-player-controls-item flv-player-fullscreen\">").concat(icons.fullscreen, "</div>\n                        </div>\n                    </div>\n                </div>\n            ") : '', "\n        </div>\n    ");
    Object.defineProperty(player, '$container', {
      value: options.container
    });
    Object.defineProperty(player, '$player', {
      value: options.container.querySelector('.flv-player-inner')
    });
    Object.defineProperty(player, '$canvas', {
      value: options.container.querySelector('.flv-player-canvas')
    });
    Object.defineProperty(player, '$poster', {
      value: options.container.querySelector('.flv-player-poster')
    });
    Object.defineProperty(player, '$loading', {
      value: options.container.querySelector('.flv-player-loading')
    });
    Object.defineProperty(player, '$controls', {
      value: options.container.querySelector('.flv-player-controls')
    });
    Object.defineProperty(player, '$state', {
      value: options.container.querySelector('.flv-player-state')
    });
    Object.defineProperty(player, '$play', {
      value: options.container.querySelector('.flv-player-play')
    });
    Object.defineProperty(player, '$pause', {
      value: options.container.querySelector('.flv-player-pause')
    });
    Object.defineProperty(player, '$current', {
      value: options.container.querySelector('.flv-player-current')
    });
    Object.defineProperty(player, '$duration', {
      value: options.container.querySelector('.flv-player-duration')
    });
    Object.defineProperty(player, '$volumeOn', {
      value: options.container.querySelector('.flv-player-volume-on')
    });
    Object.defineProperty(player, '$volumeOff', {
      value: options.container.querySelector('.flv-player-volume-off')
    });
    Object.defineProperty(player, '$volumePanel', {
      value: options.container.querySelector('.flv-player-volume-panel')
    });
    Object.defineProperty(player, '$volumeHandle', {
      value: options.container.querySelector('.flv-player-volume-panel-handle')
    });
    Object.defineProperty(player, '$fullscreen', {
      value: options.container.querySelector('.flv-player-fullscreen')
    });
    Object.defineProperty(player, '$progress', {
      value: options.container.querySelector('.flv-player-controls-progress')
    });
    Object.defineProperty(player, '$loaded', {
      value: options.container.querySelector('.flv-player-loaded')
    });
    Object.defineProperty(player, '$played', {
      value: options.container.querySelector('.flv-player-played')
    });
    Object.defineProperty(player, '$indicator', {
      value: options.container.querySelector('.flv-player-indicator')
    });
  }

  var screenfull = createCommonjsModule(function (module) {
  /*!
  * screenfull
  * v4.2.0 - 2019-04-01
  * (c) Sindre Sorhus; MIT License
  */
  (function () {

  	var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
  	var isCommonjs = module.exports;
  	var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

  	var fn = (function () {
  		var val;

  		var fnMap = [
  			[
  				'requestFullscreen',
  				'exitFullscreen',
  				'fullscreenElement',
  				'fullscreenEnabled',
  				'fullscreenchange',
  				'fullscreenerror'
  			],
  			// New WebKit
  			[
  				'webkitRequestFullscreen',
  				'webkitExitFullscreen',
  				'webkitFullscreenElement',
  				'webkitFullscreenEnabled',
  				'webkitfullscreenchange',
  				'webkitfullscreenerror'

  			],
  			// Old WebKit (Safari 5.1)
  			[
  				'webkitRequestFullScreen',
  				'webkitCancelFullScreen',
  				'webkitCurrentFullScreenElement',
  				'webkitCancelFullScreen',
  				'webkitfullscreenchange',
  				'webkitfullscreenerror'

  			],
  			[
  				'mozRequestFullScreen',
  				'mozCancelFullScreen',
  				'mozFullScreenElement',
  				'mozFullScreenEnabled',
  				'mozfullscreenchange',
  				'mozfullscreenerror'
  			],
  			[
  				'msRequestFullscreen',
  				'msExitFullscreen',
  				'msFullscreenElement',
  				'msFullscreenEnabled',
  				'MSFullscreenChange',
  				'MSFullscreenError'
  			]
  		];

  		var i = 0;
  		var l = fnMap.length;
  		var ret = {};

  		for (; i < l; i++) {
  			val = fnMap[i];
  			if (val && val[1] in document) {
  				for (i = 0; i < val.length; i++) {
  					ret[fnMap[0][i]] = val[i];
  				}
  				return ret;
  			}
  		}

  		return false;
  	})();

  	var eventNameMap = {
  		change: fn.fullscreenchange,
  		error: fn.fullscreenerror
  	};

  	var screenfull = {
  		request: function (elem) {
  			return new Promise(function (resolve) {
  				var request = fn.requestFullscreen;

  				var onFullScreenEntered = function () {
  					this.off('change', onFullScreenEntered);
  					resolve();
  				}.bind(this);

  				elem = elem || document.documentElement;

  				// Work around Safari 5.1 bug: reports support for
  				// keyboard in fullscreen even though it doesn't.
  				// Browser sniffing, since the alternative with
  				// setTimeout is even worse.
  				if (/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)) {
  					elem[request]();
  				} else {
  					elem[request](keyboardAllowed ? Element.ALLOW_KEYBOARD_INPUT : {});
  				}

  				this.on('change', onFullScreenEntered);
  			}.bind(this));
  		},
  		exit: function () {
  			return new Promise(function (resolve) {
  				if (!this.isFullscreen) {
  					resolve();
  					return;
  				}

  				var onFullScreenExit = function () {
  					this.off('change', onFullScreenExit);
  					resolve();
  				}.bind(this);

  				document[fn.exitFullscreen]();

  				this.on('change', onFullScreenExit);
  			}.bind(this));
  		},
  		toggle: function (elem) {
  			return this.isFullscreen ? this.exit() : this.request(elem);
  		},
  		onchange: function (callback) {
  			this.on('change', callback);
  		},
  		onerror: function (callback) {
  			this.on('error', callback);
  		},
  		on: function (event, callback) {
  			var eventName = eventNameMap[event];
  			if (eventName) {
  				document.addEventListener(eventName, callback, false);
  			}
  		},
  		off: function (event, callback) {
  			var eventName = eventNameMap[event];
  			if (eventName) {
  				document.removeEventListener(eventName, callback, false);
  			}
  		},
  		raw: fn
  	};

  	if (!fn) {
  		if (isCommonjs) {
  			module.exports = false;
  		} else {
  			window.screenfull = false;
  		}

  		return;
  	}

  	Object.defineProperties(screenfull, {
  		isFullscreen: {
  			get: function () {
  				return Boolean(document[fn.fullscreenElement]);
  			}
  		},
  		element: {
  			enumerable: true,
  			get: function () {
  				return document[fn.fullscreenElement];
  			}
  		},
  		enabled: {
  			enumerable: true,
  			get: function () {
  				// Coerce to boolean in case of old WebKit
  				return Boolean(document[fn.fullscreenEnabled]);
  			}
  		}
  	});

  	if (isCommonjs) {
  		module.exports = screenfull;
  		// TODO: remove this in the next major version
  		module.exports.default = screenfull;
  	} else {
  		window.screenfull = screenfull;
  	}
  })();
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
        if (!flv.options.live) {
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
    Object.defineProperty(player, 'isFocus', {
      value: false,
      writable: true
    });
    Object.defineProperty(player, 'volume', {
      get: function get() {
        try {
          return flv.decoder.audio.gainNode.gain.value;
        } catch (error) {
          return 0;
        }
      },
      set: function set(value) {
        try {
          flv.decoder.audio.gainNode.gain.value = clamp(value, 0, 10);
          flv.emit('volumechange', player.volume);
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
    Object.defineProperty(player, 'autoSize', {
      value: function value() {
        var playerWidth = player.width;
        var playerHeight = player.height;
        var playerRatio = playerWidth / playerHeight;
        var canvasWidth = player.$canvas.width;
        var canvasHeight = player.$canvas.height;
        var canvasRatio = canvasWidth / canvasHeight;

        if (playerRatio > canvasRatio) {
          var padding = (playerWidth - playerHeight * canvasRatio) / 2;
          player.$container.style.padding = "0 ".concat(padding, "px");
        } else {
          var _padding = (playerHeight - playerWidth / canvasRatio) / 2;

          player.$container.style.padding = "".concat(_padding, "px 0");
        }
      }
    });
    Object.defineProperty(player, 'controls', {
      get: function get() {
        return player.$player.classList.contains('flv-player-controls-show');
      },
      set: function set(type) {
        if (type) {
          player.$player.classList.add('flv-player-controls-show');
        } else {
          player.$player.classList.remove('flv-player-controls-show');
        }
      }
    });
    Object.defineProperty(player, 'loading', {
      get: function get() {
        return player.$player.classList.contains('flv-player-loading-show');
      },
      set: function set(type) {
        if (type) {
          player.$player.classList.add('flv-player-loading-show');
        } else {
          player.$player.classList.remove('flv-player-loading-show');
        }
      }
    });

    try {
      var screenfullChange = function screenfullChange() {
        if (player.fullscreen) {
          player.$container.classList.add('flv-player-fullscreen');
        } else {
          player.$container.classList.remove('flv-player-fullscreen');
        }

        player.autoSize();
      };

      screenfull.on('change', screenfullChange);
      flv.events.destroyEvents.push(function () {
        screenfull.off('change', screenfullChange);
      });
    } catch (error) {
      flv.debug.warn(false, 'Does not seem to support full screen events');
    }

    Object.defineProperty(player, 'fullscreen', {
      get: function get() {
        return screenfull.isFullscreen || player.$container.classList.contains('flv-player-fullscreen-web');
      },
      set: function set(type) {
        if (type) {
          try {
            screenfull.request(player.$container);
          } catch (error) {
            player.$container.classList.add('flv-player-fullscreen-web');
          }
        } else {
          try {
            screenfull.exit();
          } catch (error) {
            player.$container.classList.remove('flv-player-fullscreen-web');
          }
        }
      }
    });
  }

  function observer(flv, player) {
    var proxy = flv.events.proxy;
    var object = document.createElement('object');
    object.setAttribute('aria-hidden', 'true');
    object.setAttribute('tabindex', -1);
    object.type = 'text/html';
    object.data = 'about:blank';
    var playerWidth = player.width;
    var playerHeight = player.height;
    proxy(object, 'load', function () {
      proxy(object.contentDocument.defaultView, 'resize', function () {
        if (player.width !== playerWidth || player.height !== playerHeight) {
          playerWidth = player.width;
          playerHeight = player.height;
          flv.emit('resize');
        }
      });
    });
    player.$container.appendChild(object);
  }

  function events(flv, player) {
    var poster = flv.options.poster,
        proxy = flv.events.proxy;
    player.autoSize();
    flv.on('scripMeta', function (scripMeta) {
      var _scripMeta$amf2$metaD = scripMeta.amf2.metaData,
          width = _scripMeta$amf2$metaD.width,
          height = _scripMeta$amf2$metaD.height;
      player.$canvas.width = width;
      player.$canvas.height = height;
      player.autoSize();
    });
    flv.on('resize', function () {
      player.autoSize();
    });
    proxy(window, ['click', 'contextmenu'], function (event) {
      if (event.composedPath().indexOf(player.$container) > -1) {
        player.isFocus = true;
      } else {
        player.isFocus = false;
      }
    });
    proxy(player.$canvas, 'click', function () {
      player.toggle();
    });

    if (poster) {
      flv.on('play', function () {
        player.$poster.style.display = 'none';
      });
      flv.on('seeked', function () {
        player.$poster.style.display = 'none';
      });
    }

    flv.on('waiting', function () {
      player.loading = true;
    });
    flv.on('ended', function () {
      player.loading = false;
    });
    flv.on('timeupdate', function () {
      player.loading = false;
    });
  }

  function hotkey(flv, player) {
    var proxy = flv.events.proxy;
    var keys = {};

    function addHotkey(key, event) {
      if (keys[key]) {
        keys[key].push(event);
      } else {
        keys[key] = [event];
      }
    }

    addHotkey(27, function () {
      if (player.fullscreen) {
        player.fullscreen = false;
      }
    });
    addHotkey(32, function () {
      player.toggle();
    });
    addHotkey(37, function () {
      player.currentTime -= 10;
    });
    addHotkey(38, function () {
      player.volume += 1;
    });
    addHotkey(39, function () {
      player.currentTime += 10;
    });
    addHotkey(40, function () {
      player.volume -= 1;
    });
    proxy(window, 'keydown', function (event) {
      if (player.isFocus) {
        var tag = document.activeElement.tagName.toUpperCase();
        var editable = document.activeElement.getAttribute('contenteditable');

        if (tag !== 'INPUT' && tag !== 'TEXTAREA' && editable !== '' && editable !== 'true') {
          var events = keys[event.keyCode];

          if (events) {
            event.preventDefault();
            events.forEach(function (fn) {
              return fn();
            });
          }
        }
      }
    });
  }

  function controls(flv, player) {
    var proxy = flv.events.proxy;
    proxy(player.$play, 'click', function () {
      player.play();
    });
    proxy(player.$pause, 'click', function () {
      player.pause();
    });
    var loadedFn = throttle(function (timestamp) {
      var time = clamp(timestamp / player.duration, 0, 1);
      player.$loaded.style.width = "".concat(time * 100, "%");
    }, 500);
    flv.on('videoLoaded', function (timestamp) {
      if (!flv.options.live) {
        loadedFn(timestamp);
      }
    });
    var timeupdateFn = throttle(function (currentTime) {
      player.$played.style.width = "".concat(currentTime / player.duration * 100, "%");
      player.$current.innerText = secondToTime(currentTime);
    }, 500);
    flv.on('timeupdate', function (currentTime) {
      if (!flv.options.live) {
        timeupdateFn(currentTime);
      }
    });
    flv.on('seeked', function (currentTime) {
      if (!flv.options.live) {
        timeupdateFn(currentTime);
      }
    });
    flv.on('play', function () {
      player.$play.style.display = 'none';
      player.$pause.style.display = 'block';
    });
    flv.on('ended', function () {
      player.controls = true;
      player.$play.style.display = 'block';
      player.$pause.style.display = 'none';
    });
    flv.on('pause', function () {
      player.$play.style.display = 'block';
      player.$pause.style.display = 'none';
    });
    flv.on('scripMeta', function () {
      if (!flv.options.live) {
        player.$duration.innerText = secondToTime(player.duration);
      }
    });
    proxy(player.$fullscreen, 'click', function () {
      if (player.fullscreen) {
        player.fullscreen = false;
      } else {
        player.fullscreen = true;
      }
    });
    var autoHide = debounce(function () {
      player.$player.classList.add('flv-player-hide-cursor');
      player.controls = false;
    }, 5000);
    proxy(player.$player, 'mousemove', function () {
      autoHide.clearTimeout();
      player.$player.classList.remove('flv-player-hide-cursor');
      player.controls = true;

      if (player.playing) {
        autoHide();
      }
    });

    function volumeChangeFromEvent(event) {
      var _player$$volumePanel$ = player.$volumePanel.getBoundingClientRect(),
          panelLeft = _player$$volumePanel$.left,
          panelWidth = _player$$volumePanel$.width;

      var _player$$volumeHandle = player.$volumeHandle.getBoundingClientRect(),
          handleWidth = _player$$volumeHandle.width;

      var percentage = clamp(event.x - panelLeft - handleWidth / 2, 0, panelWidth - handleWidth / 2) / (panelWidth - handleWidth);
      return percentage * 10;
    }

    function setVolumeHandle(percentage) {
      if (percentage === 0) {
        setStyle(player.$volumeOn, 'display', 'none');
        setStyle(player.$volumeOff, 'display', 'flex');
        setStyle(player.$volumeHandle, 'left', '0');
      } else {
        var panelWidth = getStyle(player.$volumePanel, 'width') || 60;
        var handleWidth = getStyle(player.$volumeHandle, 'width');
        var width = (panelWidth - handleWidth) * percentage / 10;
        setStyle(player.$volumeOn, 'display', 'flex');
        setStyle(player.$volumeOff, 'display', 'none');
        setStyle(player.$volumeHandle, 'left', "".concat(width, "px"));
      }
    }

    if (flv.options.hasAudio) {
      var lastVolume = 0;
      var isVolumeDroging = false;
      setVolumeHandle(flv.options.volume);
      flv.on('volumechange', function () {
        setVolumeHandle(player.volume);
      });
      proxy(player.$volumeOn, 'click', function () {
        player.$volumeOn.style.display = 'none';
        player.$volumeOff.style.display = 'block';
        lastVolume = player.volume;
        player.volume = 0;
      });
      proxy(player.$volumeOff, 'click', function () {
        player.$volumeOn.style.display = 'block';
        player.$volumeOff.style.display = 'none';
        player.volume = lastVolume || 7;
      });
      proxy(player.$volumePanel, 'click', function (event) {
        player.volume = volumeChangeFromEvent(event);
      });
      proxy(player.$volumeHandle, 'mousedown', function () {
        isVolumeDroging = true;
      });
      proxy(player.$volumeHandle, 'mousemove', function (event) {
        if (isVolumeDroging) {
          player.volume = volumeChangeFromEvent(event);
        }
      });
      proxy(document, 'mouseup', function () {
        if (isVolumeDroging) {
          isVolumeDroging = false;
        }
      });
    }

    function getPosFromEvent(event) {
      var $progress = player.$progress;

      var _$progress$getBoundin = $progress.getBoundingClientRect(),
          left = _$progress$getBoundin.left;

      var width = clamp(event.x - left, 0, $progress.clientWidth);
      var second = width / $progress.clientWidth * player.duration;
      var time = secondToTime(second);
      var percentage = clamp(width / $progress.clientWidth, 0, 1);
      return {
        second: second,
        time: time,
        width: width,
        percentage: percentage
      };
    }

    if (!flv.options.live) {
      proxy(player.$progress, 'click', function (event) {
        if (event.target !== player.$indicator) {
          var _getPosFromEvent = getPosFromEvent(event),
              second = _getPosFromEvent.second,
              percentage = _getPosFromEvent.percentage;

          if (second <= player.loaded) {
            player.$played.style.width = "".concat(percentage * 100, "%");
            player.currentTime = second;
          }
        }
      });
      var isIndicatorDroging = false;
      proxy(player.$indicator, 'mousedown', function () {
        isIndicatorDroging = true;
      });
      proxy(document, 'mousemove', function (event) {
        if (isIndicatorDroging) {
          var _getPosFromEvent2 = getPosFromEvent(event),
              second = _getPosFromEvent2.second,
              percentage = _getPosFromEvent2.percentage;

          if (second <= player.loaded) {
            player.$played.style.width = "".concat(percentage * 100, "%");
            player.currentTime = second;
          }
        }
      });
      proxy(document, 'mouseup', function () {
        if (isIndicatorDroging) {
          isIndicatorDroging = false;
        }
      });
      var isCanvasDroging = false;
      var touchstartX = 0;
      var touchSecond = 0;
      proxy(player.$canvas, 'touchstart', function (event) {
        isCanvasDroging = true;
        touchstartX = event.targetTouches[0].clientX;
      });
      proxy(player.$canvas, 'touchmove', function (event) {
        if (isCanvasDroging) {
          var $progress = player.$progress;
          var moveWidth = event.targetTouches[0].clientX - touchstartX;
          touchSecond = moveWidth / $progress.clientWidth * player.duration;
        }
      });
      proxy(player.$canvas, 'touchend', function () {
        if (isCanvasDroging) {
          isCanvasDroging = false;

          if (touchSecond <= player.loaded) {
            player.currentTime += touchSecond;
          }

          touchstartX = 0;
          touchSecond = 0;
        }
      });
    }
  }

  var Player = function Player(flv) {
    classCallCheck(this, Player);

    template(flv, this);
    property(flv, this);
    observer(flv, this);
    events(flv, this);

    if (flv.options.hotkey) {
      hotkey(flv, this);
    }

    if (flv.options.controls) {
      controls(flv, this);
    }
  };

  var AudioDecoder =
  /*#__PURE__*/
  function () {
    function AudioDecoder(flv) {
      var _this = this;

      classCallCheck(this, AudioDecoder);

      this.flv = flv;
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      this.gainNode = this.context.createGain();
      this.gainNode.gain.value = flv.options.volume;
      this.playing = false;
      this.playIndex = 0;
      this.audiobuffers = [];
      this.timestamps = [];
      this.audioInputLength = 0;
      this.decoding = false;
      this.byteSize = 0;
      this.loaded = 0;
      flv.on('destroy', function () {
        _this.audiobuffers = [];

        _this.stop();
      });
      var timestampTmp = [];
      this.decodeErrorBuffer = new Uint8Array();
      this.decodeWaitingBuffer = new Uint8Array();
      flv.on('audioData', function (uint8, timestamp) {
        _this.decoding = true;
        _this.audioInputLength += 1;

        if (_this.decodeWaitingBuffer.byteLength >= 1024 * 128) {
          _this.timestamps.push(timestampTmp[0]);

          timestampTmp = [];
          var buffer = mergeBuffer(_this.decodeErrorBuffer, _this.decodeWaitingBuffer).buffer;
          _this.decodeWaitingBuffer = new Uint8Array();

          _this.context.decodeAudioData(buffer, function (audiobuffer) {
            _this.loaded += audiobuffer.duration;
            _this.byteSize += audiobuffer.length;

            _this.audiobuffers.push(audiobuffer);

            flv.emit('audioLoaded', _this.loaded);
            _this.decodeErrorBuffer = new Uint8Array();
          }).catch(function () {
            _this.decodeErrorBuffer = mergeBuffer(_this.decodeErrorBuffer, _this.decodeWaitingBuffer);
          });
        } else {
          timestampTmp.push(timestamp);
          _this.decodeWaitingBuffer = mergeBuffer(_this.decodeWaitingBuffer, uint8);
        }
      });
      flv.on('timeupdate', function (currentTime) {
        if (_this.flv.demuxer.demuxed && _this.decodeWaitingBuffer.length) {
          _this.timestamps.push(timestampTmp[0]);

          timestampTmp = [];

          _this.context.decodeAudioData(_this.decodeWaitingBuffer.buffer, function (audiobuffer) {
            _this.decodeWaitingBuffer = new Uint8Array();
            _this.decodeErrorBuffer = new Uint8Array();
            _this.loaded += audiobuffer.duration;
            _this.byteSize += audiobuffer.length;

            _this.audiobuffers.push(audiobuffer);

            flv.emit('audioLoaded', _this.loaded);
            _this.decoding = false;
          });
        }

        var timestamp = _this.timestamps[_this.playIndex];

        if (timestamp && currentTime * 1000 >= timestamp) {
          var state = _this.queue(_this.playIndex);

          if (state) {
            _this.playIndex += 1;
          } else {
            _this.stop();
          }
        }
      });
    }

    createClass(AudioDecoder, [{
      key: "queue",
      value: function queue(index) {
        var _this2 = this;

        var audiobuffer = this.audiobuffers[index];
        if (!audiobuffer) return false;
        this.source = this.context.createBufferSource();
        this.source.buffer = audiobuffer;
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);

        this.source.onended = function () {
          if (_this2.flv.options.live) {
            _this2.audiobuffers[index] = null;
          }
        };

        this.playing = true;
        this.source.start();
        return true;
      }
    }, {
      key: "play",
      value: function play() {
        var _this3 = this;

        var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        this.stop();
        var time = 0;
        var index = this.audiobuffers.findIndex(function (item) {
          time += item.duration;
          return startTime <= time;
        });
        var audiobuffer = this.audiobuffers[index];

        if (!audiobuffer) {
          this.stop();
          return;
        }

        var offset = startTime - (time - audiobuffer.duration);
        this.source = this.context.createBufferSource();
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.source.buffer = audiobuffer;

        this.source.onended = function () {
          if (_this3.flv.options.live) {
            _this3.audiobuffers[index] = null;
          }
        };

        this.playing = true;
        this.source.start(0, offset);
        this.playIndex = index + 1;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.playing = false;

        if (this.source) {
          this.source.onended = null;
          this.source.stop();
        }
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
      this.endedTimer = null;
      this.currentTime = 0;
      this.lastUpdateTime = 0;
      this.video = new window.VideoDecoder(flv, this);

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
        }

        if (!document.hidden && isPlaying) {
          isPlaying = _this.playing;

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
            player = _this$flv.player;
        this.animationFrameTimer = window.requestAnimationFrame(function () {
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
            _this2.playing = false;
            _this2.waiting = true;

            _this2.flv.emit('waiting', _this2.currentTime);

            _this2.waitingTimer = setTimeout(function () {
              _this2.play();
            }, 1000);
            return;
          } else {
            _this2.ended = true;
            _this2.playing = false;
            _this2.waiting = false;

            _this2.flv.emit('ended', _this2.currentTime);

            if (options.loop && !options.live) {
              _this2.currentTime = 0;
              _this2.endedTimer = setTimeout(function () {
                _this2.play();

                _this2.flv.emit('loop');
              }, 1000);
              return;
            }

            _this2.pause();
          }

          _this2.animationFrame();
        });
      }
    }, {
      key: "pause",
      value: function pause() {
        window.cancelAnimationFrame(this.animationFrameTimer);
        window.clearTimeout(this.waitingTimer);
        window.clearTimeout(this.endedTimer);
        this.animationFrameTimer = null;
        this.waitingTimer = null;
        this.endedTimer = null;
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
        var player = this.flv.player;
        window.cancelAnimationFrame(this.animationFrameTimer);
        window.clearTimeout(this.waitingTimer);
        window.clearTimeout(this.endedTimer);
        this.animationFrameTimer = null;
        this.waitingTimer = null;
        this.endedTimer = null;
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

  var workerString = "\"use strict\";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError(\"Invalid attempt to spread non-iterable instance\")}function _iterableToArray(e){if(Symbol.iterator in Object(e)||\"[object Arguments]\"===Object.prototype.toString.call(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var r=0,t=new Array(e.length);r<e.length;r++)t[r]=e[r];return t}}function _instanceof(e,r){return null!=r&&\"undefined\"!=typeof Symbol&&r[Symbol.hasInstance]?r[Symbol.hasInstance](e):e instanceof r}function _typeof(e){return(_typeof=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&\"function\"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?\"symbol\":typeof e})(e)}function _classCallCheck(e,r){if(!_instanceof(e,r))throw new TypeError(\"Cannot call a class as a function\")}function _possibleConstructorReturn(e,r){return!r||\"object\"!==_typeof(r)&&\"function\"!=typeof r?_assertThisInitialized(e):r}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");return e}function _inherits(e,r){if(\"function\"!=typeof r&&null!==r)throw new TypeError(\"Super expression must either be null or a function\");e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),r&&_setPrototypeOf(e,r)}function _wrapNativeSuper(e){var r=\"function\"==typeof Map?new Map:void 0;return(_wrapNativeSuper=function(e){if(null===e||!_isNativeFunction(e))return e;if(\"function\"!=typeof e)throw new TypeError(\"Super expression must either be null or a function\");if(void 0!==r){if(r.has(e))return r.get(e);r.set(e,t)}function t(){return _construct(e,arguments,_getPrototypeOf(this).constructor)}return t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(t,e)})(e)}function isNativeReflectConstruct(){if(\"undefined\"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if(\"function\"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function _construct(e,r,t){return(_construct=isNativeReflectConstruct()?Reflect.construct:function(e,r,t){var n=[null];n.push.apply(n,r);var a=new(Function.bind.apply(e,n));return t&&_setPrototypeOf(a,t.prototype),a}).apply(null,arguments)}function _isNativeFunction(e){return-1!==Function.toString.call(e).indexOf(\"[native code]\")}function _setPrototypeOf(e,r){return(_setPrototypeOf=Object.setPrototypeOf||function(e,r){return e.__proto__=r,e})(e,r)}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var FlvPlayerError=function(e){function r(e,t){var n;return _classCallCheck(this,r),n=_possibleConstructorReturn(this,_getPrototypeOf(r).call(this,e)),\"function\"==typeof Error.captureStackTrace&&Error.captureStackTrace(_assertThisInitialized(n),t||n.constructor),n.name=\"FlvPlayerError\",n}return _inherits(r,_wrapNativeSuper(Error)),r}(),debug={warn:function(e){if(!e){for(var r,t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];(r=console).warn.apply(r,n)}},error:function(e,r){if(!e)throw new FlvPlayerError(r)}};function mergeBuffer(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];var n=r[0].constructor;return r.reduce(function(e,r){var t=new n((0|e.byteLength)+(0|r.byteLength));return t.set(e,0),t.set(r,0|e.byteLength),t},new n)}function readBufferSum(e){var r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return e.reduce(function(t,n,a){return t+(r?n:n-128)*256**(e.length-a-1)},0)}function readString(e){var r;return(r=String.fromCharCode).call.apply(r,[String].concat(_toConsumableArray(e)))}function readBuffer(e){var r=0;function t(n){for(var a=new Uint8Array(n),o=0;o<n;o+=1)a[o]=e[r],r+=1;return t.index=r,a}return t.index=0,t}function readDouble(e){var r=new DataView(new ArrayBuffer(e.length));return e.forEach(function(e,t){r.setUint8(t,e)}),r.getFloat64(0)}function readBoolean(e){return 0!==e[0]}var index=0,header=null,uint8=new Uint8Array,scripMeta=null,AudioSpecificConfig=null,AVCDecoderConfigurationRecord=null,nalStart=new Uint8Array([0,0,0,1]);function readable(e){return uint8.length-index>=e}function read(e){for(var r=new Uint8Array(e),t=0;t<e;t+=1)r[t]=uint8[index],index+=1;return r}function demuxerScripTag(e){var r=readBuffer(e.body),t=Object.create(null),n=Object.create(null);function a(e){var t=null;if(void 0!==e)switch(e){case 0:t=readDouble(r(8));break;case 1:t=readBoolean(r(1));break;case 2:var n=readBufferSum(r(2));t=readString(r(n));break;case 3:t=Object.create(null);for(var o=-1;9!==o;){var i=readBufferSum(r(2)),u=readString(r(i)),c=r(1)[0];u&&(t[u]=a(c)),o=c}break;case 5:t=null;break;case 6:t=void 0;break;case 7:t=\"Reference #\".concat(r.index),r(2);break;case 8:t=Object.create(null);for(var f=-1;9!==f;){var d=readBufferSum(r(2)),s=readString(r(d)),l=r(1)[0];s&&(t[s]=a(l)),f=l}break;case 10:var p=readBufferSum(r(4));t=[];for(var g=0;g<p;g+=1){var y=r(1)[0];t.push(a(y))}break;case 11:t=readDouble(r(2));break;case 12:var b=readBufferSum(r(4));t=readString(r(b));break;default:debug.error(!1,\"AMF: Unknown metaData type: \".concat(e))}return t}for(t.type=r(1)[0],debug.error(2===t.type,\"AMF: [amf1] type expect 2, but got \".concat(t.type)),t.size=readBufferSum(r(2)),t.string=readString(r(t.size)),n.type=r(1)[0],debug.error(8===n.type||3===n.type,\"AMF: [amf2] type expect 8 or 3, but got \".concat(n.type)),n.size=readBufferSum(r(4)),n.metaData=Object.create(null);r.index<e.body.length;){var o=readBufferSum(r(2)),i=readString(r(o)),u=r(1)[0];i&&(n.metaData[i]=a(u))}debug.error(r.index===e.body.length,\"AMF: Seems to be incompletely parsed\"),debug.error(n.size===Object.keys(n.metaData).length,\"AMF: [amf2] length does not match\"),postMessage({type:\"scripMeta\",data:scripMeta={amf1:t,amf2:n}})}function demuxerVideoTag(e){debug.error(e.body.length>1,\"Invalid video packet\");var r={frameType:(240&e.body[0])>>4,codecID:15&e.body[0]};debug.error(7===r.codecID,\"[videoTrack] Unsupported codec in video frame: \".concat(r.codecID));var t=e.body.slice(1,5);debug.error(t.length>=4,\"[H264] Invalid AVC packet, missing AVCPacketType or/and CompositionTime\");var n=new DataView(t.buffer),a=n.getUint8(0),o=((16777215&n.getUint32(0))<<8>>8)+e.timestamp,i=e.body.subarray(5);if(0===a){debug.warn(!AVCDecoderConfigurationRecord,\"[h264] Find another one AVCDecoderConfigurationRecord\"),debug.error(i.length>=7,\"[H264] AVCDecoderConfigurationRecord parse length is not enough\");var u=readBuffer(i),c={};c.configurationVersion=u(1)[0],debug.error(1===c.configurationVersion,\"[H264] Invalid configurationVersion: \".concat(c.configurationVersion)),c.AVCProfileIndication=u(1)[0],debug.error(0!==c.AVCProfileIndication,\"[H264] Invalid AVCProfileIndication: \".concat(c.AVCProfileIndication)),c.profile_compatibility=u(1)[0],c.AVCLevelIndication=u(1)[0],c.lengthSizeMinusOne=1+(3&u(1)[0]),debug.error(4===c.lengthSizeMinusOne||3!==c.lengthSizeMinusOne,\"[H264] Invalid lengthSizeMinusOne: \".concat(c.lengthSizeMinusOne)),c.numOfSequenceParameterSets=31&u(1)[0],debug.error(0!==c.numOfSequenceParameterSets,\"[H264] Invalid numOfSequenceParameterSets: \".concat(c.numOfSequenceParameterSets)),debug.warn(1===c.numOfSequenceParameterSets,\"[H264] Strange numOfSequenceParameterSets: \".concat(c.numOfSequenceParameterSets));for(var f=0;f<c.numOfSequenceParameterSets;f+=1)if(c.sequenceParameterSetLength=readBufferSum(u(2)),c.sequenceParameterSetLength>0){var d=u(c.sequenceParameterSetLength);postMessage({type:\"videoData\",data:mergeBuffer(nalStart,d)})}c.numOfPictureParameterSets=u(1)[0],debug.error(0!==c.numOfPictureParameterSets,\"[H264] Invalid numOfPictureParameterSets: \".concat(c.numOfPictureParameterSets)),debug.warn(1===c.numOfPictureParameterSets,\"[H264] Strange numOfPictureParameterSets: \".concat(c.numOfPictureParameterSets));for(var s=0;s<c.numOfPictureParameterSets;s+=1)if(c.pictureParameterSetLength=readBufferSum(u(2)),c.pictureParameterSetLength>0){var l=u(c.pictureParameterSetLength);postMessage({type:\"videoData\",data:mergeBuffer(nalStart,l)})}AVCDecoderConfigurationRecord=c,postMessage({type:\"AVCDecoderConfigurationRecord\",data:c})}else if(1===a)for(var p=AVCDecoderConfigurationRecord.lengthSizeMinusOne,g=readBuffer(i);g.index<i.length;){var y=readBufferSum(g(p));postMessage({type:\"videoData\",data:mergeBuffer(nalStart,g(y)),timestamp:o})}else debug.error(2===a,\"[H264] Invalid video packet type \".concat(a))}function demuxerAudioTag(e){debug.error(e.body.length>1,\"Invalid audio packet\");var r={soundFormat:(240&e.body[0])>>4,soundRate:(12&e.body[0])>>2,soundSize:(2&e.body[0])>>1,soundType:(1&e.body[0])>>0};debug.error(10===r.soundFormat,\"[audioTrack] unsupported audio format: \".concat(r.soundFormat));var t=e.body.subarray(1);if(0===t[0]){var n=t.subarray(1);debug.warn(!AudioSpecificConfig,\"[aac] Find another one AudioSpecificConfig\"),debug.error(n.length>=2,\"[aac] AudioSpecificConfig parse length is not enough\");var a={};a.audioObjectType=(248&n[0])>>3,a.samplingFrequencyIndex=((7&n[0])<<1)+((128&n[1])>>7&1),a.channelConfiguration=(127&n[1])>>3,AudioSpecificConfig=a,postMessage({type:\"AudioSpecificConfig\",data:a})}else{var o=AudioSpecificConfig,i=o.audioObjectType,u=o.samplingFrequencyIndex,c=o.channelConfiguration,f=e.dataSize-2+7,d=new Uint8Array(7);d[0]=255,d[1]=240,d[1]|=0,d[1]|=0,d[1]|=1,d[2]=i-1<<6,d[2]|=(15&u)<<2,d[2]|=0,d[2]|=(4&c)>>2,d[3]=(3&c)<<6,d[3]|=0,d[3]|=0,d[3]|=0,d[3]|=0,d[3]|=(6144&f)>>11,d[4]=(2040&f)>>3,d[5]=(7&f)<<5,d[5]|=31,d[6]=252;var s=e.body.subarray(2);postMessage({type:\"audioData\",data:mergeBuffer(d,s),timestamp:e.timestamp})}}onmessage=function(e){if(uint8=mergeBuffer(uint8,e.data),!header&&readable(13)){(header=Object.create(null)).signature=readString(read(3)),header.version=read(1)[0],debug.error(\"FLV\"===header.signature&&1===header.version,\"FLV header not found\"),header.flags=read(1)[0],header.headersize=readBufferSum(read(4));var r=readBufferSum(read(4));debug.error(0===r,\"PrevTagSize0 should be equal to 0, but got \".concat(r)),postMessage({type:\"flvHeader\",data:header})}for(;index<uint8.length;){var t=Object.create(null),n=index;if(!readable(11))return index=0,void(uint8=uint8.subarray(n));t.tagType=read(1)[0],t.dataSize=readBufferSum(read(3));var a=read(1),o=read(1),i=read(1),u=read(1);if(t.timestamp=i|o<<8|a<<16|u<<24,t.streamID=readBufferSum(read(3)),debug.error(0===t.streamID,\"streamID should be equal to 0, but got \".concat(t.streamID)),!readable(t.dataSize+4))return index=0,void(uint8=uint8.subarray(n));t.body=read(t.dataSize);var c=readBufferSum(read(4));switch(debug.error(c===t.dataSize+11,\"Invalid PrevTagSize: \".concat(c)),t.tagType){case 18:demuxerScripTag(t);break;case 9:demuxerVideoTag(t);break;case 8:demuxerAudioTag(t);break;default:debug.error(!1,\"unknown tag type: \".concat(t.tagType))}}index=0,uint8=new Uint8Array};";

  var Demuxer = function Demuxer(flv) {
    var _this = this;

    classCallCheck(this, Demuxer);

    var options = flv.options,
        debug = flv.debug;
    this.size = 0;
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
    this.demuxWorker = createWorker(workerString);
    flv.on('destroy', function () {
      _this.demuxWorker.terminate();
    });
    flv.on('streamStart', function (requestType) {
      _this.streamStartTime = getNowTime();
      debug.log('stream-url', options.url);
      debug.log('stream-request', requestType);
    });
    flv.on('streaming', function (uint8) {
      _this.streaming = true;
      _this.size += uint8.byteLength;

      _this.demuxWorker.postMessage(uint8);
    });
    flv.on('streamEnd', function (uint8) {
      _this.streaming = false;
      _this.streamEndTime = getNowTime();

      if (uint8) {
        _this.index = 0;
        _this.size = uint8.byteLength;

        _this.demuxWorker.postMessage(uint8);
      }

      debug.log('stream-size', "".concat(_this.size, " byte"));
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
          break;

        case 'AudioSpecificConfig':
          _this.AudioSpecificConfig = message.data;
          flv.emit('AudioSpecificConfig', _this.AudioSpecificConfig);
          debug.log('AudioSpecificConfig', _this.AudioSpecificConfig);
          break;

        case 'videoData':
          {
            _this.videoDataLength += 1;
            _this.videoDataSize += message.data.byteLength;
            var readNalu = readBuffer(message.data);
            readNalu(4);
            var nalHeader = readNalu(1)[0];
            var naluType = nalHeader & 31;

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

  function fetchRequest(flv, url) {
    flv.emit('streamStart', 'fetch-request');
    return fetch(url, {
      headers: flv.options.headers
    }).then(function (response) {
      var reader = response.body.getReader();
      flv.on('destroy', function () {
        reader.cancel();
      });

      (function read() {
        reader.read().then(function (_ref) {
          var done = _ref.done,
              value = _ref.value;

          if (done) {
            flv.emit('streamEnd');
            return;
          }

          flv.emit('streaming', new Uint8Array(value));
          read();
        }).catch(function (error) {
          throw error;
        });
      })();

      return reader;
    });
  }

  function mozXhrRequest(flv, url) {
    flv.emit('streamStart', 'moz-xhr-request');
    var proxy = flv.events.proxy,
        headers = flv.options.headers;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'moz-chunked-arraybuffer';
    Object.keys(headers).forEach(function (key) {
      xhr.setRequestHeader(key, headers[key]);
    });
    proxy(xhr, 'readystatechange', function () {
      flv.emit('readystatechange', xhr);
    });
    proxy(xhr, 'progress', function () {
      flv.emit('streaming', new Uint8Array(xhr.response));
    });
    proxy(xhr, 'loadend', function () {
      flv.emit('streamEnd');
    });
    proxy(xhr, 'error', function (error) {
      throw error;
    });
    flv.on('destroy', function () {
      xhr.abort();
    });
    xhr.send();
    return xhr;
  }

  function xhrRequest(flv, url) {
    flv.emit('streamStart', 'xhr-request');
    var proxy = flv.events.proxy,
        headers = flv.options.headers;
    var textEncoder = new TextEncoder();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'text';
    Object.keys(headers).forEach(function (key) {
      xhr.setRequestHeader(key, headers[key]);
    });
    var index = 0;
    proxy(xhr, 'readystatechange', function () {
      flv.emit('readystatechange', xhr);
    });
    proxy(xhr, 'progress', function () {
      var rawText = xhr.responseText.substr(index);
      index = xhr.responseText.length;
      flv.emit('streaming', textEncoder.encode(rawText, {
        stream: true
      }));
    });
    proxy(xhr, 'loadend', function () {
      flv.emit('streaming', textEncoder.encode('', {
        stream: false
      }));
      flv.emit('streamEnd');
    });
    proxy(xhr, 'error', function (error) {
      throw error;
    });
    flv.on('destroy', function () {
      xhr.abort();
    });
    xhr.send();
    return xhr;
  }

  function websocketRequest(flv, url) {
    flv.emit('streamStart', 'websocket-request');
    var options = flv.options,
        proxy = flv.events.proxy;
    var socket = new WebSocket(url);
    socket.binaryType = 'arraybuffer';
    proxy(socket, 'open', function () {
      socket.send(options.socketSend);
    });
    proxy(socket, 'message', function (event) {
      flv.emit('streaming', new Uint8Array(event.data));
    });
    proxy(socket, 'close', function () {
      flv.emit('streamEnd');
    });
    proxy(socket, 'error', function (error) {
      throw error;
    });
    flv.on('destroy', function () {
      socket.close();
    });
    return socket;
  }

  function readFile(flv, file) {
    flv.emit('streamStart', 'FileReader');
    var proxy = flv.events.proxy;
    var reader = new FileReader();
    proxy(reader, 'load', function (e) {
      var buffer = e.target.result;
      flv.emit('streamEnd', new Uint8Array(buffer));
    });
    reader.readAsArrayBuffer(file);
    return reader;
  }

  var Stream =
  /*#__PURE__*/
  function () {
    function Stream(flv) {
      classCallCheck(this, Stream);

      var url = flv.options.url;
      this.transportFactory = Stream.getStreamFactory(url);
      this.transport = this.transportFactory(flv, url);
    }

    createClass(Stream, null, [{
      key: "supportsXhrResponseType",
      value: function supportsXhrResponseType(type) {
        try {
          var tmpXhr = new XMLHttpRequest();
          tmpXhr.responseType = type;
          return tmpXhr.responseType === type;
        } catch (e) {
          return false;
        }
      }
    }, {
      key: "getStreamFactory",
      value: function getStreamFactory(url) {
        if (url instanceof File) {
          return readFile;
        }

        if (url.startsWith('ws://')) {
          return websocketRequest;
        }

        if (typeof Response !== 'undefined' && Object.prototype.hasOwnProperty.call(Response.prototype, 'body') && typeof Headers === 'function') {
          return fetchRequest;
        }

        var mozChunked = 'moz-chunked-arraybuffer';

        if (Stream.supportsXhrResponseType(mozChunked)) {
          return mozXhrRequest;
        }

        return xhrRequest;
      }
    }]);

    return Stream;
  }();

  var id = 0;

  var FlvPlayer =
  /*#__PURE__*/
  function (_Emitter) {
    inherits(FlvPlayer, _Emitter);

    function FlvPlayer(options) {
      var _this;

      classCallCheck(this, FlvPlayer);

      _this = possibleConstructorReturn(this, getPrototypeOf(FlvPlayer).call(this));
      _this.options = objectSpread({}, FlvPlayer.options, options);

      if (typeof _this.options.container === 'string') {
        _this.options.container = document.querySelector(_this.options.container);
      }

      _this.debug = new Debug(assertThisInitialized(_this));
      _this.events = new Events(assertThisInitialized(_this));
      _this.player = new Player(assertThisInitialized(_this));

      if (window.VideoDecoder) {
        _this.decoder = new Decoder(assertThisInitialized(_this));
        _this.demuxer = new Demuxer(assertThisInitialized(_this));
        _this.stream = new Stream(assertThisInitialized(_this));
      } else {
        var videoDecoderScript = document.createElement('script');
        videoDecoderScript.src = _this.options.videoDecoder;
        document.body.appendChild(videoDecoderScript);

        _this.events.proxy(videoDecoderScript, 'load', function () {
          _this.decoder = new Decoder(assertThisInitialized(_this));
          _this.demuxer = new Demuxer(assertThisInitialized(_this));
          _this.stream = new Stream(assertThisInitialized(_this));
        });

        _this.events.proxy(videoDecoderScript, 'error', function () {
          var path = new URL(_this.options.videoDecoder, window.location.href).href;

          _this.debug.error(false, "It seems that the path of the video decoder(options.videoDecoder) introduces an error: ".concat(path));
        });
      }

      id += 1;
      _this.id = id;
      _this.isDestroy = false;
      _this.userAgent = window.navigator.userAgent;
      _this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(_this.userAgent);
      FlvPlayer.instances.push(assertThisInitialized(_this));
      return _this;
    }

    createClass(FlvPlayer, [{
      key: "destroy",
      value: function destroy() {
        this.events.destroy();
        this.isDestroy = true;
        this.options.container.innerHTML = '';
        FlvPlayer.instances.splice(FlvPlayer.instances.indexOf(this), 1);
        this.emit('destroy');
      }
    }], [{
      key: "options",
      get: function get() {
        return {
          url: '',
          poster: '',
          container: '',
          debug: false,
          live: false,
          loop: false,
          hotkey: true,
          controls: true,
          hasAudio: true,
          volume: 7,
          frameRate: 30,
          width: 400,
          height: 300,
          socketSend: '',
          headers: {},
          videoDecoder: './baselineProfileDecoder.js'
        };
      }
    }, {
      key: "version",
      get: function get() {
        return '1.0.4';
      }
    }, {
      key: "env",
      get: function get() {
        return '"development"';
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
