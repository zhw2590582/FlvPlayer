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

    sources.forEach(function (source) {
      Object.getOwnPropertyNames(source).forEach(function (key) {
        if (!hasOwnProperty(target, key)) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        } else {
          throw new Error("Target attribute name is duplicated: ".concat(key));
        }
      });
    });
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

  function template(flv, player) {
    var options = flv.options;
    var cacheCss = options.container.style.cssText;
    options.container.classList.add('flvplayer-container');
    setStyle(options.container, {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box'
    });
    options.container.innerHTML = "\n        <div class=\"flvplayer-inner\" style=\"position: relative;display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;\">\n            <canvas class=\"flvplayer-canvas\" width=\"".concat(options.width, "\" height=\"").concat(options.height, "\" style=\"cursor: pointer;width: 100%;height: 100%;background-color: #000;\"></canvas>\n        </div>\n    ");
    flv.on('destroy', function () {
      options.container.innerHTML = '';
      options.container.style.cssText = cacheCss;
      options.container.classList.remove('flvplayer-container');
    });
    Object.defineProperty(player, '$container', {
      value: options.container
    });
    Object.defineProperty(player, '$player', {
      value: options.container.querySelector('.flvplayer-inner')
    });
    Object.defineProperty(player, '$canvas', {
      value: options.container.querySelector('.flvplayer-canvas')
    });
  }

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
          flv.decoder.audio.volume = clamp(value, 0, 10);
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
    proxyPropertys(flv, this);
  };

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function mergeBuffer$1() {
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

  function debounce$1(func, wait, context) {
    var timeout;
    return function fn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var later = function later() {
        timeout = null;
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  var Dida =
  /*#__PURE__*/
  function () {
    function Dida() {
      var _this = this;

      var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      classCallCheck(this, Dida);

      this.option = _objectSpread({}, Dida.option, {}, option);
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      this.gainNode = this.context.createGain();
      this.gainNode.gain.value = this.option.volume;
      this.source = null;
      this.decoding = false;
      this.playing = false;
      this.loadLength = 0;
      this.loadByteSize = 0;
      this.audioDuration = 0;
      this.audioLength = 0;
      this.timestamps = [];
      this.audiobuffers = [];
      this.timestampTmp = [];
      this.decodeErrorBuffer = new Uint8Array();
      this.decodeWaitingBuffer = new Uint8Array();
      this.autoEndDebounce = debounce$1(function () {
        _this.end();
      }, this.option.autoEndTime);
    }

    createClass(Dida, [{
      key: "destroy",
      value: function destroy() {
        this.stop();
        this.context = null;
        this.gainNode = null;
        this.source = null;
        this.timestamps = [];
        this.audiobuffers = [];
        this.timestampTmp = [];
        this.decodeErrorBuffer = new Uint8Array();
        this.decodeWaitingBuffer = new Uint8Array();
        this.option.onDestroy();
        return this;
      }
    }, {
      key: "load",
      value: function load(uint8, timestamp) {
        var _this2 = this;

        this.decoding = true;
        this.loadLength += 1;
        this.loadByteSize += uint8.byteLength;
        this.option.onLoad(uint8, timestamp);

        if (this.decodeWaitingBuffer.byteLength >= this.option.chunk) {
          this.timestamps.push(this.timestampTmp[0]);
          this.timestampTmp = [];

          var _mergeBuffer = mergeBuffer$1(this.decodeErrorBuffer, this.decodeWaitingBuffer),
              buffer = _mergeBuffer.buffer;

          this.decodeWaitingBuffer = new Uint8Array();
          this.context.decodeAudioData(buffer, function (audiobuffer) {
            _this2.audioDuration += audiobuffer.duration;
            _this2.audioLength += audiobuffer.length;

            _this2.audiobuffers.push(audiobuffer);

            _this2.decodeErrorBuffer = new Uint8Array();

            _this2.option.onDecodeDone(audiobuffer);
          }).catch(function (error) {
            _this2.decodeErrorBuffer = mergeBuffer$1(_this2.decodeErrorBuffer, _this2.decodeWaitingBuffer);

            _this2.option.onDecodeError(error);
          });
        } else {
          this.timestampTmp.push(timestamp);
          this.decodeWaitingBuffer = mergeBuffer$1(this.decodeWaitingBuffer, uint8);
        }

        if (this.option.autoEnd) {
          this.autoEndDebounce();
        }

        return this;
      }
    }, {
      key: "end",
      value: function end() {
        var _this3 = this;

        if (this.decodeWaitingBuffer.length) {
          this.timestamps.push(this.timestampTmp[0]);
          this.timestampTmp = [];
          var buffer = this.decodeWaitingBuffer.buffer;
          this.decodeWaitingBuffer = new Uint8Array();
          this.decodeErrorBuffer = new Uint8Array();
          this.context.decodeAudioData(buffer, function (audiobuffer) {
            _this3.audioDuration += audiobuffer.duration;
            _this3.audioLength += audiobuffer.length;

            _this3.audiobuffers.push(audiobuffer);

            _this3.decoding = false;

            _this3.option.onEnd();
          });
        }

        return this;
      }
    }, {
      key: "play",
      value: function play() {
        var _this4 = this;

        var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        if (this.source) {
          this.source.onended = null;
          this.source.stop();
          this.source = null;
        }

        this.playing = true;
        var index = this.timestamps.findIndex(function (timestamp, i) {
          var audiobuffer = _this4.audiobuffers[i];
          return audiobuffer && timestamp + audiobuffer.duration * 1000 >= startTime;
        });
        var timestamp = this.timestamps[index];
        var audiobuffer = this.audiobuffers[index];
        if (timestamp === undefined || audiobuffer === undefined) return this.stop();
        var offset = Math.max(0, (startTime - timestamp) / 1000);
        this.source = this.context.createBufferSource();
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.source.buffer = audiobuffer;
        this.option.onPlay(audiobuffer, startTime, offset);
        this.source.start(0, offset);

        this.source.onended = function () {
          var nextTimestamp = _this4.timestamps[index + 1];
          var nextAudiobuffer = _this4.audiobuffers[index + 1];

          if (nextTimestamp && nextAudiobuffer) {
            if (!_this4.option.cache) {
              _this4.audiobuffers.splice(0, index + 1);

              _this4.timestamps.splice(0, index + 1);
            }

            _this4.play(_this4.option.onNext(nextTimestamp));
          } else {
            _this4.stop();
          }
        };

        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.playing = false;

        if (this.source) {
          this.source.onended = null;
          this.source.stop();
          this.source = null;
        }

        this.option.onStop();
        return this;
      }
    }, {
      key: "volume",
      get: function get() {
        return this.gainNode.gain.value;
      },
      set: function set(value) {
        this.gainNode.gain.value = value;
      }
    }], [{
      key: "option",
      get: function get() {
        return {
          volume: 0.7,
          cache: true,
          chunk: 64 * 1024,
          autoEnd: true,
          autoEndTime: 5000,
          onLoad: function onLoad() {
            return null;
          },
          onStop: function onStop() {
            return null;
          },
          onPlay: function onPlay() {
            return null;
          },
          onNext: function onNext(t) {
            return t;
          },
          onEnd: function onEnd() {
            return null;
          },
          onDestroy: function onDestroy() {
            return null;
          },
          onDecodeDone: function onDecodeDone() {
            return null;
          },
          onDecodeError: function onDecodeError() {
            return null;
          }
        };
      }
    }]);

    return Dida;
  }();

  var AudioDecoder =
  /*#__PURE__*/
  function () {
    function AudioDecoder(flv, decoder) {
      var _this = this;

      classCallCheck(this, AudioDecoder);

      this.flv = flv;
      this.dida = new Dida({
        volume: flv.options.muted ? 0 : flv.options.volume,
        cache: !flv.options.live,
        onNext: function onNext(timestamp) {
          var currentTime = decoder.currentTime * 1000;
          var timeDiff = Math.abs(timestamp - currentTime);
          return timeDiff >= flv.options.maxTimeDiff ? currentTime : timestamp;
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
          this.volume = 7;
        }
      }
    }, {
      key: "volume",
      get: function get() {
        return this.dida.volume;
      },
      set: function set(volume) {
        this.dida.volume = volume;
        this.flv.emit('volumechange', volume);
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

      flv.on('noAudio', function () {
        flv.options.hasAudio = false;
        _this.audio = {
          play: function play() {
            return null;
          },
          stop: function stop() {
            return null;
          },
          playing: true,
          decoding: false
        };
      });
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
            player = _this$flv.player;
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

              _this2.play();

              _this2.flv.emit('loop');

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
        var player = this.flv.player;
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

  var workerString = "class FlvPlayerError extends Error {\n    constructor(message) {\n        super(message);\n        this.name = 'FlvPlayerError';\n    }\n}\n\nconst debug = {\n    warn: (condition, ...args) => {\n        if (!condition) {\n            console.warn(...args);\n        }\n    },\n    error: (condition, msg) => {\n        if (!condition) {\n            throw new FlvPlayerError(msg);\n        }\n    },\n};\n\nfunction mergeBuffer(...buffers) {\n    const Cons = buffers[0].constructor;\n    return buffers.reduce((pre, val) => {\n        const merge = new Cons((pre.byteLength | 0) + (val.byteLength | 0));\n        merge.set(pre, 0);\n        merge.set(val, pre.byteLength | 0);\n        return merge;\n    }, new Cons());\n}\n\nfunction readBufferSum(array, uint = true) {\n    return array.reduce((totle, num, index) => totle + (uint ? num : num - 128) * 256 ** (array.length - index - 1), 0);\n}\n\nfunction readString(array) {\n    return String.fromCharCode.call(String, ...array);\n}\n\nfunction readBuffer(buffer) {\n    let index = 0;\n    function read(length) {\n        const tempUint8 = new Uint8Array(length);\n        for (let i = 0; i < length; i += 1) {\n            tempUint8[i] = buffer[index];\n            index += 1;\n        }\n        read.index = index;\n        return tempUint8;\n    }\n    read.index = 0;\n    return read;\n}\n\nfunction readDouble(array) {\n    const view = new DataView(new ArrayBuffer(array.length));\n    array.forEach((b, i) => {\n        view.setUint8(i, b);\n    });\n    return view.getFloat64(0);\n}\n\nfunction readBoolean(array) {\n    return array[0] !== 0;\n}\n\nlet index = 0;\nlet header = null;\nlet uint8 = new Uint8Array();\nlet scripMeta = null;\nlet AudioSpecificConfig = null;\nlet AVCDecoderConfigurationRecord = null;\nconst nalStart = new Uint8Array([0x00, 0x00, 0x00, 0x01]);\n\nfunction readable(length) {\n    return uint8.length - index >= length;\n}\n\nfunction read(length) {\n    const tempUint8 = new Uint8Array(length);\n    for (let i = 0; i < length; i += 1) {\n        tempUint8[i] = uint8[index];\n        index += 1;\n    }\n    return tempUint8;\n}\n\nfunction demuxerScripTag(tag) {\n    const readScripTag = readBuffer(tag.body);\n    const amf1 = Object.create(null);\n    const amf2 = Object.create(null);\n\n    amf1.type = readScripTag(1)[0];\n    debug.error(amf1.type === 2, `AMF: [amf1] type expect 2, but got ${amf1.type}`);\n    amf1.size = readBufferSum(readScripTag(2));\n    amf1.string = readString(readScripTag(amf1.size));\n\n    amf2.type = readScripTag(1)[0];\n    debug.error(amf2.type === 8 || amf2.type === 3, `AMF: [amf2] type expect 8 or 3, but got ${amf2.type}`);\n    amf2.size = readBufferSum(readScripTag(4));\n    amf2.metaData = Object.create(null);\n\n    function getValue(type) {\n        let value = null;\n        if (type !== undefined) {\n            switch (type) {\n                case 0:\n                    value = readDouble(readScripTag(8));\n                    break;\n                case 1:\n                    value = readBoolean(readScripTag(1));\n                    break;\n                case 2: {\n                    const valueLength = readBufferSum(readScripTag(2));\n                    value = readString(readScripTag(valueLength));\n                    break;\n                }\n                case 3: {\n                    value = Object.create(null);\n                    let lastType = -1;\n                    while (lastType !== 9) {\n                        const nameLength = readBufferSum(readScripTag(2));\n                        const name = readString(readScripTag(nameLength));\n                        const itemType = readScripTag(1)[0];\n                        if (name) {\n                            value[name] = getValue(itemType);\n                        }\n                        lastType = itemType;\n                    }\n                    break;\n                }\n                case 5:\n                    value = null;\n                    break;\n                case 6:\n                    value = undefined;\n                    break;\n                case 7:\n                    value = `Reference #${readScripTag.index}`;\n                    readScripTag(2);\n                    break;\n                case 8: {\n                    value = Object.create(null);\n                    let lastType = -1;\n                    while (lastType !== 9) {\n                        const nameLength = readBufferSum(readScripTag(2));\n                        const name = readString(readScripTag(nameLength));\n                        const itemType = readScripTag(1)[0];\n                        if (name) {\n                            value[name] = getValue(itemType);\n                        }\n                        lastType = itemType;\n                    }\n                    break;\n                }\n                case 10: {\n                    const valueLength = readBufferSum(readScripTag(4));\n                    value = [];\n                    for (let index = 0; index < valueLength; index += 1) {\n                        const itemType = readScripTag(1)[0];\n                        value.push(getValue(itemType));\n                    }\n                    break;\n                }\n                case 11:\n                    value = readDouble(readScripTag(2));\n                    break;\n                case 12: {\n                    const valueLength = readBufferSum(readScripTag(4));\n                    value = readString(readScripTag(valueLength));\n                    break;\n                }\n                default:\n                    debug.error(false, `AMF: Unknown metaData type: ${type}`);\n                    break;\n            }\n        }\n        return value;\n    }\n\n    while (readScripTag.index < tag.body.length) {\n        const nameLength = readBufferSum(readScripTag(2));\n        const name = readString(readScripTag(nameLength));\n        const type = readScripTag(1)[0];\n        if (name) {\n            amf2.metaData[name] = getValue(type);\n        }\n    }\n\n    debug.warn(readScripTag.index === tag.body.length, '[AMF] Seems to be incompletely parsed');\n    debug.warn(amf2.size === Object.keys(amf2.metaData).length, '[AMF] [amf2] length does not match');\n\n    scripMeta = { amf1, amf2 };\n    postMessage({\n        type: 'scripMeta',\n        data: scripMeta,\n    });\n}\n\nfunction demuxerVideoTag(tag) {\n    debug.error(tag.body.length > 1, 'Invalid video packet');\n    const header = {\n        frameType: (tag.body[0] & 0xf0) >> 4,\n        codecID: tag.body[0] & 0x0f,\n    };\n    debug.error(header.codecID === 7, `[videoTrack] Unsupported codec in video frame: ${header.codecID}`);\n    const packet = tag.body.slice(1, 5);\n    debug.error(packet.length >= 4, '[H264] Invalid AVC packet, missing AVCPacketType or/and CompositionTime');\n    const view = new DataView(packet.buffer);\n    const AVCPacketType = view.getUint8(0);\n    const CompositionTime = ((view.getUint32(0) & 0x00ffffff) << 8) >> 8;\n    const pts = CompositionTime + tag.timestamp;\n    const packetData = tag.body.subarray(5);\n\n    if (AVCPacketType === 0) {\n        debug.warn(!AVCDecoderConfigurationRecord, '[h264] Find another one AVCDecoderConfigurationRecord');\n        debug.error(packetData.length >= 7, '[H264] AVCDecoderConfigurationRecord parse length is not enough');\n        const readDcr = readBuffer(packetData);\n        const result = {};\n        result.configurationVersion = readDcr(1)[0];\n        debug.error(\n            result.configurationVersion === 1,\n            `[H264] Invalid configurationVersion: ${result.configurationVersion}`,\n        );\n        result.AVCProfileIndication = readDcr(1)[0];\n        debug.error(\n            result.AVCProfileIndication !== 0,\n            `[H264] Invalid AVCProfileIndication: ${result.AVCProfileIndication}`,\n        );\n        result.profile_compatibility = readDcr(1)[0];\n        result.AVCLevelIndication = readDcr(1)[0];\n        result.lengthSizeMinusOne = (readDcr(1)[0] & 3) + 1;\n        debug.error(\n            result.lengthSizeMinusOne === 4 || result.lengthSizeMinusOne !== 3,\n            `[H264] Invalid lengthSizeMinusOne: ${result.lengthSizeMinusOne}`,\n        );\n        result.numOfSequenceParameterSets = readDcr(1)[0] & 31;\n        debug.error(\n            result.numOfSequenceParameterSets !== 0,\n            `[H264] Invalid numOfSequenceParameterSets: ${result.numOfSequenceParameterSets}`,\n        );\n        debug.warn(\n            result.numOfSequenceParameterSets === 1,\n            `[H264] Strange numOfSequenceParameterSets: ${result.numOfSequenceParameterSets}`,\n        );\n        for (let index = 0; index < result.numOfSequenceParameterSets; index += 1) {\n            result.sequenceParameterSetLength = readBufferSum(readDcr(2));\n            if (result.sequenceParameterSetLength > 0) {\n                const SPS = readDcr(result.sequenceParameterSetLength);\n                postMessage({\n                    type: 'videoData',\n                    data: mergeBuffer(nalStart, SPS),\n                });\n            }\n        }\n        result.numOfPictureParameterSets = readDcr(1)[0];\n        debug.error(\n            result.numOfPictureParameterSets !== 0,\n            `[H264] Invalid numOfPictureParameterSets: ${result.numOfPictureParameterSets}`,\n        );\n        debug.warn(\n            result.numOfPictureParameterSets === 1,\n            `[H264] Strange numOfPictureParameterSets: ${result.numOfPictureParameterSets}`,\n        );\n        for (let index = 0; index < result.numOfPictureParameterSets; index += 1) {\n            result.pictureParameterSetLength = readBufferSum(readDcr(2));\n            if (result.pictureParameterSetLength > 0) {\n                const PPS = readDcr(result.pictureParameterSetLength);\n                postMessage({\n                    type: 'videoData',\n                    data: mergeBuffer(nalStart, PPS),\n                });\n            }\n        }\n        AVCDecoderConfigurationRecord = result;\n        postMessage({\n            type: 'AVCDecoderConfigurationRecord',\n            data: result,\n        });\n    } else if (AVCPacketType === 1) {\n        const { lengthSizeMinusOne } = AVCDecoderConfigurationRecord;\n        const readVideo = readBuffer(packetData);\n        while (readVideo.index < packetData.length) {\n            const length = readBufferSum(readVideo(lengthSizeMinusOne));\n            postMessage({\n                type: 'videoData',\n                data: mergeBuffer(nalStart, readVideo(length)),\n                timestamp: pts,\n            });\n        }\n    } else {\n        debug.error(AVCPacketType === 2, `[H264] Invalid video packet type ${AVCPacketType}`);\n    }\n}\n\nfunction demuxerAudioTag(tag) {\n    debug.error(tag.body.length > 1, 'Invalid audio packet');\n    const header = {\n        soundFormat: (tag.body[0] & 0xf0) >> 4,\n        soundRate: (tag.body[0] & 0x0c) >> 2,\n        soundSize: (tag.body[0] & 0x02) >> 1,\n        soundType: (tag.body[0] & 0x01) >> 0,\n    };\n    debug.error(header.soundFormat === 10, `[audioTrack] unsupported audio format: ${header.soundFormat}`);\n    const packet = tag.body.subarray(1);\n    const packetType = packet[0];\n    if (packetType === 0) {\n        const packetData = packet.subarray(1);\n        debug.warn(!AudioSpecificConfig, '[AAC] Find another one AudioSpecificConfig');\n        debug.error(packetData.length >= 2, '[AAC] AudioSpecificConfig parse length is not enough');\n        const result = {};\n        result.audioObjectType = (packetData[0] & 0xf8) >> 3;\n        result.samplingFrequencyIndex = ((packetData[0] & 7) << 1) + (((packetData[1] & 0x80) >> 7) & 1);\n        result.channelConfiguration = (packetData[1] & 0x7f) >> 3;\n        AudioSpecificConfig = result;\n        postMessage({\n            type: 'AudioSpecificConfig',\n            data: result,\n        });\n    } else {\n        const { audioObjectType, samplingFrequencyIndex, channelConfiguration } = AudioSpecificConfig;\n        const ADTSLen = tag.dataSize - 2 + 7;\n        const ADTSHeader = new Uint8Array(7);\n        ADTSHeader[0] = 0xff;\n        ADTSHeader[1] = 0xf0;\n        ADTSHeader[1] |= 0 << 3;\n        ADTSHeader[1] |= 0 << 1;\n        ADTSHeader[1] |= 1;\n        ADTSHeader[2] = (audioObjectType - 1) << 6;\n        ADTSHeader[2] |= (samplingFrequencyIndex & 0x0f) << 2;\n        ADTSHeader[2] |= 0 << 1;\n        ADTSHeader[2] |= (channelConfiguration & 0x04) >> 2;\n        ADTSHeader[3] = (channelConfiguration & 0x03) << 6;\n        ADTSHeader[3] |= 0 << 5;\n        ADTSHeader[3] |= 0 << 4;\n        ADTSHeader[3] |= 0 << 3;\n        ADTSHeader[3] |= 0 << 2;\n        ADTSHeader[3] |= (ADTSLen & 0x1800) >> 11;\n        ADTSHeader[4] = (ADTSLen & 0x7f8) >> 3;\n        ADTSHeader[5] = (ADTSLen & 0x7) << 5;\n        ADTSHeader[5] |= 0x1f;\n        ADTSHeader[6] = 0xfc;\n        const ADTSBody = tag.body.subarray(2);\n        postMessage({\n            type: 'audioData',\n            data: mergeBuffer(ADTSHeader, ADTSBody),\n            timestamp: tag.timestamp,\n        });\n    }\n}\n\nonmessage = event => {\n    uint8 = mergeBuffer(uint8, event.data);\n    if (!header && readable(13)) {\n        header = Object.create(null);\n        header.signature = readString(read(3));\n        header.version = read(1)[0];\n        debug.error(header.signature === 'FLV' && header.version === 1, 'FLV header not found');\n        header.flags = read(1)[0];\n        const hasAudio = ((header.flags & 4) >>> 2) !== 0;\n        const hasVideo = (header.flags & 1) !== 0;\n        debug.warn(hasVideo, '[FLV header] flags not found video');\n        debug.warn(hasAudio, '[FLV header] flags not found audio');\n        if (!hasAudio) {\n            postMessage({\n                type: 'noAudio',\n            });\n        }\n        header.headersize = readBufferSum(read(4));\n        const prevTagSize = readBufferSum(read(4));\n        debug.error(prevTagSize === 0, `PrevTagSize0 should be equal to 0, but got ${prevTagSize}`);\n        postMessage({\n            type: 'flvHeader',\n            data: header,\n        });\n    }\n\n    while (index < uint8.length) {\n        const tag = Object.create(null);\n        const restIndex = index;\n\n        if (readable(11)) {\n            tag.tagType = read(1)[0];\n            tag.dataSize = readBufferSum(read(3));\n            const ts2 = read(1)[0];\n            const ts1 = read(1)[0];\n            const ts0 = read(1)[0];\n            const ts3 = read(1)[0];\n            tag.timestamp = ts0 | (ts1 << 8) | (ts2 << 16) | (ts3 << 24);\n            tag.streamID = readBufferSum(read(3));\n            debug.error(tag.streamID === 0, `streamID should be equal to 0, but got ${tag.streamID}`);\n        } else {\n            index = 0;\n            uint8 = uint8.subarray(restIndex);\n            return;\n        }\n\n        if (readable(tag.dataSize + 4)) {\n            tag.body = read(tag.dataSize);\n            const prevTagSize = readBufferSum(read(4));\n            debug.error(prevTagSize === tag.dataSize + 11, `Invalid PrevTagSize: ${prevTagSize}`);\n        } else {\n            index = 0;\n            uint8 = uint8.subarray(restIndex);\n            return;\n        }\n\n        switch (tag.tagType) {\n            case 18:\n                demuxerScripTag(tag);\n                break;\n            case 9:\n                demuxerVideoTag(tag);\n                break;\n            case 8:\n                demuxerAudioTag(tag);\n                break;\n            default:\n                debug.error(false, `unknown tag type: ${tag.tagType}`);\n                break;\n        }\n    }\n\n    index = 0;\n    uint8 = new Uint8Array();\n};\n";

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
    this.streamRate = calculationRate(function (rate) {
      flv.emit('streamRate', rate);
    });
    this.demuxRate = calculationRate(function (rate) {
      flv.emit('demuxRate', rate);
    });
    flv.on('destroy', function () {
      _this.demuxWorker.terminate();
    });
    flv.on('streamStart', function () {
      _this.streamStartTime = getNowTime();

      if (typeof options.url === 'string') {
        var url = Object.assign(document.createElement('a'), {
          href: options.url
        }).href;
        debug.log('stream-url', url);
      }
    });
    flv.on('streaming', function (uint8) {
      _this.streaming = true;
      _this.size += uint8.byteLength;

      _this.streamRate(uint8.byteLength);

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

        case 'noAudio':
          flv.emit('noAudio');
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
          debug.log('AVC-profile', getProfileString(_this.AVCDecoderConfigurationRecord.AVCProfileIndication));
          debug.log('AVC-level', getLevelString(_this.AVCDecoderConfigurationRecord.AVCLevelIndication));
          break;

        case 'AudioSpecificConfig':
          _this.AudioSpecificConfig = message.data;
          flv.emit('AudioSpecificConfig', _this.AudioSpecificConfig);
          debug.log('AudioSpecificConfig', _this.AudioSpecificConfig);
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

  function fetchRequest(flv, stream) {
    flv.emit('streamStart');
    return fetch(flv.options.url, {
      headers: flv.options.headers
    }).then(function (response) {
      var reader = response.body.getReader();
      flv.on('streamCancel', function () {
        reader.cancel();
      });

      function read() {
        return reader.read().then(function (_ref) {
          var done = _ref.done,
              value = _ref.value;

          if (done) {
            flv.emit('streamEnd');
            return;
          }

          flv.emit('streaming', new Uint8Array(value)); // eslint-disable-next-line consistent-return

          return read();
        }).catch(function (error) {
          throw error;
        });
      }

      return read();
    }).catch(function (error) {
      stream.reconnect(error);
      throw error;
    });
  }

  function mozXhrRequest(flv, stream) {
    flv.emit('streamStart');
    var proxy = flv.events.proxy,
        headers = flv.options.headers;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', flv.options.url, true);
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
      stream.reconnect(error);
      throw error;
    });
    xhr.send();
    flv.on('streamCancel', function () {
      xhr.abort();
    });
    return xhr;
  }

  function xhrRequest(flv, stream) {
    flv.emit('streamStart');
    var proxy = flv.events.proxy,
        headers = flv.options.headers;
    var textEncoder = new TextEncoder();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', flv.options.url, true);
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
      stream.reconnect(error);
      throw error;
    });
    xhr.send();
    flv.on('streamCancel', function () {
      xhr.abort();
    });
    return xhr;
  }

  function websocketRequest(flv, stream) {
    flv.emit('streamStart');
    var options = flv.options,
        proxy = flv.events.proxy;
    var socket = new WebSocket(flv.options.url);
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
      stream.reconnect(error);
      throw error;
    });
    flv.on('streamCancel', function () {
      socket.close();
    });
    return socket;
  }

  function readFile(flv) {
    flv.emit('streamStart');
    var proxy = flv.events.proxy;
    var reader = new FileReader();
    proxy(reader, 'load', function (e) {
      var buffer = e.target.result;
      flv.emit('streamEnd', new Uint8Array(buffer));
    });
    reader.readAsArrayBuffer(flv.options.url);
    return reader;
  }

  var Stream =
  /*#__PURE__*/
  function () {
    function Stream(flv) {
      var _this = this;

      classCallCheck(this, Stream);

      this.flv = flv;
      this.reconnectTime = 0;
      this.maxReconnectTime = 10;
      this.transportFactory = Stream.getStreamFactory(flv.options.url);
      this.flv.debug.log('stream-type', this.transportFactory.name);
      this.transport = this.transportFactory(flv, this);
      flv.on('destroy', function () {
        _this.flv.emit('streamCancel');
      });
      flv.on('reconnect', function () {
        _this.reconnect();
      });
    }

    createClass(Stream, [{
      key: "reconnect",
      value: function reconnect() {
        var _this2 = this;

        if (this.reconnectTime < this.maxReconnectTime && !this.flv.isDestroy && this.flv.options.live) {
          setTimeout(function () {
            _this2.reconnectTime += 1;

            _this2.flv.emit('streamCancel');

            _this2.transport = _this2.transportFactory(_this2.flv, _this2);

            _this2.flv.debug.warn(false, "[stream]: reconnect ".concat(_this2.reconnectTime));

            _this2.flv.emit('streamReconnect');
          }, 1000);
        }
      }
    }], [{
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
      _this.options = _objectSpread$1({}, FlvPlayer.options, {}, options);

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

      return _this;
    }

    createClass(FlvPlayer, [{
      key: "init",
      value: function init() {
        this.isDestroy = false;
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.debug = new Debug(this);
        this.events = new Events(this);
        this.player = new Player(this);
        this.decoder = new Decoder(this);
        this.demuxer = new Demuxer(this);
        this.stream = new Stream(this);

        if (window.FlvplayerControl && this.options.control) {
          this.control = new window.FlvplayerControl(this);
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
          muted: false,
          volume: 7,
          frameRate: 30,
          maxTimeDiff: 200,
          freeMemory: 64 * 1024 * 1024,
          width: 400,
          height: 300,
          socketSend: '',
          headers: {},
          decoder: './flvplayer-decoder-baseline.js'
        };
      }
    }, {
      key: "version",
      get: function get() {
        return '1.0.8';
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
