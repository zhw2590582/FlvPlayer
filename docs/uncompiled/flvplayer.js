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
    function Events() {
      classCallCheck(this, Events);

      this.destroys = [];
      this.proxy = this.proxy.bind(this);
    }

    createClass(Events, [{
      key: "proxy",
      value: function proxy(target, name, callback) {
        var _this = this;

        var option = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        if (Array.isArray(name)) {
          return name.map(function (item) {
            return _this.proxy(target, item, callback, option);
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
  function getNowTime() {
    if (performance && typeof performance.now === 'function') {
      return performance.now();
    }

    return Date.now();
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

      $script.onerror = reject;
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
        }
      });
    });
  }

  function template(flv, player) {
    var options = flv.options;
    options.container.classList.add('flvplayer-container');
    setStyle(options.container, {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box'
    });
    options.container.innerHTML = "\n        <div class=\"flvplayer-inner\" style=\"position: relative;display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;\">\n            <canvas class=\"flvplayer-canvas\" width=\"".concat(options.width, "\" height=\"").concat(options.height, "\" style=\"cursor: pointer;width: 100%;height: 100%;background-color: #000;\"></canvas>\n        </div>\n    ");
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
  }

  function observer(flv, player) {
    var proxy = flv.events.proxy;
    var object = document.createElement('object');
    object.setAttribute('aria-hidden', 'true');
    object.setAttribute('tabindex', -1);
    object.type = 'text/html';
    object.data = 'about:blank';
    setStyle(object, {
      display: 'block',
      position: 'absolute',
      top: '0',
      left: '0',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: '-1'
    });
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
    var proxy = flv.events.proxy;
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
  }

  var Player = function Player(flv) {
    classCallCheck(this, Player);

    template(flv, this);
    property(flv, this);
    observer(flv, this);
    events(flv, this);
    proxyPropertys(flv, this);
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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  var id = 0;

  var FlvPlayer =
  /*#__PURE__*/
  function (_Emitter) {
    inherits(FlvPlayer, _Emitter);

    function FlvPlayer(options) {
      var _this;

      classCallCheck(this, FlvPlayer);

      _this = possibleConstructorReturn(this, getPrototypeOf(FlvPlayer).call(this));
      _this.options = _objectSpread({}, FlvPlayer.options, {}, options);

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
        this.userAgent = window.navigator.userAgent;
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(this.userAgent);
        this.debug = new Debug(this);
        this.events = new Events(this);
        this.player = new Player(this);
        this.decoder = new Decoder(this);
        this.demuxer = new Demuxer(this);
        this.stream = new Stream(this);

        if (window.FlvplayerControl) {
          this.control = new window.FlvplayerControl(this);
        }

        id += 1;
        this.id = id;
        FlvPlayer.instances.push(this);
      }
    }, {
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
          container: '',
          debug: false,
          live: false,
          loop: false,
          autoPlay: false,
          hasAudio: true,
          volume: 7,
          frameRate: 30,
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
        return '1.0.6';
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
