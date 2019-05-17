(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.FlvPlayer = factory());
}(this, function () { 'use strict';

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

  function E () {
    // Keep this empty so it's easier to inherit from
    // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
  }

  E.prototype = {
    on: function (name, callback, ctx) {
      var e = this.e || (this.e = {});

      (e[name] || (e[name] = [])).push({
        fn: callback,
        ctx: ctx
      });

      return this;
    },

    once: function (name, callback, ctx) {
      var self = this;
      function listener () {
        self.off(name, listener);
        callback.apply(ctx, arguments);
      }
      listener._ = callback;
      return this.on(name, listener, ctx);
    },

    emit: function (name) {
      var data = [].slice.call(arguments, 1);
      var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
      var i = 0;
      var len = evtArr.length;

      for (i; i < len; i++) {
        evtArr[i].fn.apply(evtArr[i].ctx, data);
      }

      return this;
    },

    off: function (name, callback) {
      var e = this.e || (this.e = {});
      var evts = e[name];
      var liveEvents = [];

      if (evts && callback) {
        for (var i = 0, len = evts.length; i < len; i++) {
          if (evts[i].fn !== callback && evts[i].fn._ !== callback)
            liveEvents.push(evts[i]);
        }
      }

      // Remove event from queue to prevent memory leak
      // Suggested by https://github.com/lazd
      // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

      (liveEvents.length)
        ? e[name] = liveEvents
        : delete e[name];

      return this;
    }
  };

  var tinyEmitter = E;
  var TinyEmitter = E;
  tinyEmitter.TinyEmitter = TinyEmitter;

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

  var FlvplayerError =
  /*#__PURE__*/
  function (_Error) {
    inherits(FlvplayerError, _Error);

    function FlvplayerError(message, context) {
      var _this;

      classCallCheck(this, FlvplayerError);

      _this = possibleConstructorReturn(this, getPrototypeOf(FlvplayerError).call(this, message));

      if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(assertThisInitialized(_this), context || _this.constructor);
      }

      _this.name = 'FlvPlayerError';
      return _this;
    }

    return FlvplayerError;
  }(wrapNativeSuper(Error));

  function errorHandle(condition, msg) {
    if (!condition) {
      throw new FlvplayerError(msg);
    }

    return condition;
  }

  function checkSupport () {
    errorHandle(typeof window.Promise === 'function', "Unsupported 'Promise' method");
    errorHandle(typeof window.fetch === 'function', "Unsupported 'fetch' method");
  }

  function optionValidator (flv) {
    var _flv$options = flv.options,
        element = _flv$options.element,
        url = _flv$options.url;
    errorHandle(element instanceof HTMLDivElement, 'The \'element\' option is not a \'HTMLDivElement\'');
    errorHandle(flv.constructor.instances.every(function (item) {
      return item.options.element !== element;
    }), 'Cannot mount multiple instances on the same div element, please destroy the instance first');
    errorHandle(typeof url === 'string' || url instanceof File, 'The \'url\' option is not a string or file');
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
        throw new FlvplayerError(msg);
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
        var option = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
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

  var Workers =
  /*#__PURE__*/
  function () {
    function Workers() {
      classCallCheck(this, Workers);

      this.workers = new Map();
    }

    createClass(Workers, [{
      key: "add",
      value: function add(name, fn) {
        if (!this.workers.has(name)) {
          this.workers.set(name, Workers.create(fn));
        }
      }
    }, {
      key: "run",
      value: function run(name) {
        var worker = this.workers.get(name);

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return worker.post(args);
      }
    }, {
      key: "kill",
      value: function kill(name) {
        var worker = this.workers.get(name);
        worker.kill();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.workers.forEach(function (worker) {
          worker.kill();
        });
      }
    }], [{
      key: "fnToStr",
      value: function fnToStr(fn) {
        return "\n           self.onmessage = event => {\n               return self.postMessage((".concat(fn, ").apply(null, event.data));\n           }\n         ");
      }
    }, {
      key: "create",
      value: function create(fn) {
        var blob = new Blob([Workers.fnToStr(fn)], {
          type: 'application/javascript'
        });
        var objectURL = window.URL.createObjectURL(blob);
        var worker = new Worker(objectURL);

        worker.kill = function () {
          URL.revokeObjectURL(objectURL);
          worker.terminate();
        };

        worker.post = function (args) {
          return new Promise(function (resolve, reject) {
            worker.onmessage = function (event) {
              resolve(event.data);
            };

            worker.onerror = function (error) {
              reject(error);
            };

            worker.postMessage(args);
          });
        };

        return worker;
      }
    }]);

    return Workers;
  }();

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  var arrayWithHoles = _arrayWithHoles;

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  var iterableToArrayLimit = _iterableToArrayLimit;

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var nonIterableRest = _nonIterableRest;

  function _slicedToArray(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
  }

  var slicedToArray = _slicedToArray;

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  var arrayWithoutHoles = _arrayWithoutHoles;

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  var iterableToArray = _iterableToArray;

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var nonIterableSpread = _nonIterableSpread;

  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
  }

  var toConsumableArray = _toConsumableArray;

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

    var bufferLength = buffers.reduce(function (pre, val) {
      return pre + val.length;
    }, 0);
    var buffer = new buffers[0].constructor(bufferLength);
    var offset = 0;
    buffers.forEach(function (buf) {
      buffer.set(buf, offset);
      offset += buf.length;
    });
    return buffer;
  }
  function readDouble(array) {
    var view = new DataView(new ArrayBuffer(array.length));
    array.forEach(function (b, i) {
      view.setUint8(i, b);
    });
    return view.getFloat64(0);
  }
  function readBoolean(array) {
    return array[0] !== 0;
  }
  function readString(array) {
    var _String$fromCharCode;

    return (_String$fromCharCode = String.fromCharCode).call.apply(_String$fromCharCode, [String].concat(toConsumableArray(array)));
  }
  function readBufferSum(array) {
    var uint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return array.reduce(function (totle, num, index) {
      return totle + (uint ? num : num - 128) * Math.pow(256, array.length - index - 1);
    }, 0);
  }

  var Parse =
  /*#__PURE__*/
  function () {
    function Parse(flv) {
      var _this = this;

      classCallCheck(this, Parse);

      this.flv = flv;
      var options = flv.options,
          debug = flv.debug;
      this.uint8 = new Uint8Array(0);
      this.index = 0;
      this.header = null;
      this.loaded = false;
      flv.on('streamStart', function () {
        debug.log('stream-start', options.url);
      });
      flv.on('streaming', function (uint8) {
        _this.uint8 = mergeBuffer(_this.uint8, uint8);

        _this.parse();
      });
      flv.on('streamEnd', function (uint8) {
        debug.log('stream-end');

        if (uint8) {
          _this.uint8 = uint8;
          _this.index = 0;
          _this.header = null;

          _this.parse();
        }

        _this.loaded = true;
        flv.emit('parseDone');
        debug.log('parse-done');
      });
    }

    createClass(Parse, [{
      key: "parse",
      value: function parse() {
        var debug = this.flv.debug;

        if (!this.header && this.readable(13)) {
          var header = Object.create(null);
          header.signature = readString(this.read(3));

          var _this$read = this.read(1);

          var _this$read2 = slicedToArray(_this$read, 1);

          header.version = _this$read2[0];
          debug.error(header.signature === 'FLV' && header.version === 1, 'FLV header not found');

          var _this$read3 = this.read(1);

          var _this$read4 = slicedToArray(_this$read3, 1);

          header.flags = _this$read4[0];
          header.headersize = readBufferSum(this.read(4));
          this.header = header;
          var prevTagSize = readBufferSum(this.read(4));
          debug.error(prevTagSize === 0, "PrevTagSize0 should be equal to 0, but got ".concat(prevTagSize));
          this.flv.emit('parseHeader', this.header);
          debug.log('parse-header', this.header);
        }

        while (this.index < this.uint8.length) {
          var restIndex = this.index;
          var tag = Object.create(null);

          if (this.readable(11)) {
            var _this$read5 = this.read(1);

            var _this$read6 = slicedToArray(_this$read5, 1);

            tag.tagType = _this$read6[0];
            tag.dataSize = readBufferSum(this.read(3));
            var ts2 = this.read(1);
            var ts1 = this.read(1);
            var ts0 = this.read(1);
            var ts3 = this.read(1);
            tag.timestamp = ts0 | ts1 << 8 | ts2 << 16 | ts3 << 24;
            tag.streamID = readBufferSum(this.read(3));
            debug.error(tag.streamID === 0, "streamID should be equal to 0, but got ".concat(tag.streamID));
          } else {
            this.index = restIndex;
            break;
          }

          if (this.readable(tag.dataSize + 4)) {
            tag.body = this.read(tag.dataSize);

            var _prevTagSize = readBufferSum(this.read(4));

            debug.error(_prevTagSize === tag.dataSize + 11, "Invalid PrevTagSize: ".concat(_prevTagSize));
          } else {
            this.index = restIndex;
            break;
          }

          this.flv.emit('parseTag', tag);
        }
      }
    }, {
      key: "readable",
      value: function readable(length) {
        return this.uint8.length - this.index >= length;
      }
    }, {
      key: "read",
      value: function read(length) {
        var tempUint8 = new Uint8Array(length);

        for (var i = 0; i < length; i += 1) {
          tempUint8[i] = this.uint8[this.index];
          this.index += 1;
        }

        return tempUint8;
      }
    }]);

    return Parse;
  }();

  var AAC =
  /*#__PURE__*/
  function () {
    function AAC(flv) {
      classCallCheck(this, AAC);

      this.flv = flv;
      this.meta = null;
      this.AudioSpecificConfig = null;
    }

    createClass(AAC, [{
      key: "demuxer",
      value: function demuxer(tag) {
        var debug = this.flv.debug;
        var packet = tag.body.subarray(1);
        var packetType = packet[0];

        if (packetType === 0) {
          var packetData = packet.subarray(1);
          debug.warn(!this.AudioSpecificConfig, '[aac] Find another one AudioSpecificConfig');
          this.AudioSpecificConfig = this.getAudioSpecificConfig(packetData);
          this.flv.emit('AudioSpecificConfig', this.AudioSpecificConfig);
          debug.log('audio-specific-config', this.AudioSpecificConfig);
          this.meta = {
            format: 'aac',
            sampleRate: AAC.SAMPLERATES[this.AudioSpecificConfig.samplingFrequencyIndex],
            channels: AAC.CHANNELS[this.AudioSpecificConfig.channelConfiguration],
            codec: "mp4a.40.".concat(this.AudioSpecificConfig.audioObjectType)
          };
          this.flv.emit('audioMeta', this.meta);
          debug.log('audio-meta', this.meta);
        } else {
          var ADTSLen = tag.dataSize - 2 + 7;
          var ADTSHeader = this.getADTSHeader(ADTSLen);
          var ADTSBody = tag.body.subarray(2);
          var data = mergeBuffer(ADTSHeader, ADTSBody);
          this.flv.emit('audioData', data);
        }
      }
    }, {
      key: "getAudioSpecificConfig",
      value: function getAudioSpecificConfig(packetData) {
        var debug = this.flv.debug;
        debug.error(packetData.length >= 2, '[aac] AudioSpecificConfig parse length is not enough');
        var result = {};
        result.audioObjectType = (packetData[0] & 0xf8) >> 3;
        result.samplingFrequencyIndex = ((packetData[0] & 7) << 1) + ((packetData[1] & 0x80) >> 7 & 1);
        result.channelConfiguration = (packetData[1] & 0x7f) >> 3;
        return result;
      }
    }, {
      key: "getADTSHeader",
      value: function getADTSHeader(ADTSLen) {
        var _this$AudioSpecificCo = this.AudioSpecificConfig,
            audioObjectType = _this$AudioSpecificCo.audioObjectType,
            samplingFrequencyIndex = _this$AudioSpecificCo.samplingFrequencyIndex,
            channelConfiguration = _this$AudioSpecificCo.channelConfiguration;
        var ADTSHeader = new Uint8Array(7);
        ADTSHeader[0] = 0xff;
        ADTSHeader[1] = 0xf0;
        ADTSHeader[1] |= 0 << 3;
        ADTSHeader[1] |= 0 << 1;
        ADTSHeader[1] |= 1;
        ADTSHeader[2] = audioObjectType - 1 << 6;
        ADTSHeader[2] |= (samplingFrequencyIndex & 0x0f) << 2;
        ADTSHeader[2] |= 0 << 1;
        ADTSHeader[2] |= (channelConfiguration & 0x04) >> 2;
        ADTSHeader[3] = (channelConfiguration & 0x03) << 6;
        ADTSHeader[3] |= 0 << 5;
        ADTSHeader[3] |= 0 << 4;
        ADTSHeader[3] |= 0 << 3;
        ADTSHeader[3] |= 0 << 2;
        ADTSHeader[3] |= (ADTSLen & 0x1800) >> 11;
        ADTSHeader[4] = (ADTSLen & 0x7f8) >> 3;
        ADTSHeader[5] = (ADTSLen & 0x7) << 5;
        ADTSHeader[5] |= 0x1f;
        ADTSHeader[6] = 0xfc;
        return ADTSHeader;
      }
    }], [{
      key: "SAMPLERATES",
      get: function get() {
        return {
          0: 96000,
          1: 88200,
          2: 64000,
          3: 48000,
          4: 44100,
          5: 32000,
          6: 24000,
          7: 22050,
          8: 16000,
          9: 12000,
          10: 11025,
          11: 8000,
          12: 7350,
          13: 0,
          14: 0,
          15: 0
        };
      }
    }, {
      key: "CHANNELS",
      get: function get() {
        return {
          0: 0,
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 8
        };
      }
    }]);

    return AAC;
  }();

  var MP3 =
  /*#__PURE__*/
  function () {
    function MP3(flv) {
      classCallCheck(this, MP3);

      this.flv = flv;
      this.meta = null;
    }

    createClass(MP3, [{
      key: "demuxer",
      value: function demuxer(tag) {
        var debug = this.flv.debug;
        var packet = tag.body.subarray(1);
        this.flv.emit('audioData', packet);

        if (!this.meta) {
          debug.error(packet.length >= 4, 'MP3 header missing');
          debug.error(packet[0] === 0xff, 'MP3 header mismatch');
          var ver = packet[1] >>> 3 & 0x03;
          var layer = (packet[1] & 0x06) >> 1;
          var bitrateIndex = (packet[2] & 0xf0) >>> 4;
          var samplingFreqIndex = (packet[2] & 0x0c) >>> 2;
          var channelMode = packet[3] >>> 6 & 0x03;
          var channels = channelMode !== 3 ? 2 : 1;
          var sampleRate = 0;
          var bitRate = 0;

          switch (ver) {
            case 0:
              sampleRate = MP3.SAMPLERATES['25'][samplingFreqIndex];
              break;

            case 2:
              sampleRate = MP3.SAMPLERATES['20'][samplingFreqIndex];
              break;

            case 3:
              sampleRate = MP3.SAMPLERATES['10'][samplingFreqIndex];
              break;

            default:
              debug.warn(false, "[mp3] Unknown mp3 version: ".concat(ver));
              break;
          }

          switch (layer) {
            case 1:
              bitRate = MP3.BITRATES.L3[bitrateIndex];
              break;

            case 2:
              bitRate = MP3.BITRATES.L2[bitrateIndex];
              break;

            case 3:
              bitRate = MP3.BITRATES.L1[bitrateIndex];
              break;

            default:
              debug.warn(false, "[mp3] Unknown mp3 layer: ".concat(layer));
              break;
          }

          this.meta = {
            ver: ver,
            layer: layer,
            bitRate: bitRate,
            sampleRate: sampleRate,
            channels: channels,
            format: 'mp3',
            codec: 'mp3'
          };
          this.flv.emit('audioMeta', this.meta);
          debug.log('audio-meta', this.meta);
        }
      }
    }], [{
      key: "SAMPLERATES",
      get: function get() {
        return {
          25: [11025, 12000, 8000, 0],
          20: [22050, 24000, 16000, 0],
          10: [44100, 48000, 32000, 0]
        };
      }
    }, {
      key: "BITRATES",
      get: function get() {
        return {
          L1: [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, -1],
          L2: [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, -1],
          L3: [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1]
        };
      }
    }]);

    return MP3;
  }();

  var AudioTag =
  /*#__PURE__*/
  function () {
    function AudioTag(flv) {
      classCallCheck(this, AudioTag);

      this.flv = flv;
      this.aac = new AAC(flv);
      this.mp3 = new MP3(flv);
    }

    createClass(AudioTag, [{
      key: "demuxer",
      value: function demuxer(tag) {
        var debug = this.flv.debug;

        var _this$getAudioMeta = this.getAudioMeta(tag),
            soundFormat = _this$getAudioMeta.soundFormat;

        debug.error(soundFormat === 10 || soundFormat === 2, "[audioTrack] unsupported audio format: ".concat(soundFormat));
        var format = AudioTag.SOUND_FORMATS[soundFormat];
        this[format].demuxer(tag);
      }
    }, {
      key: "getAudioMeta",
      value: function getAudioMeta(tag) {
        var debug = this.flv.debug;
        debug.error(tag.body.length > 1, 'Invalid audio packet');
        var meta = tag.body[0];
        return {
          soundFormat: (meta & 0xf0) >> 4,
          soundRate: (meta & 0x0c) >> 2,
          soundSize: (meta & 0x02) >> 1,
          soundType: (meta & 0x01) >> 0
        };
      }
    }], [{
      key: "SOUND_FORMATS",
      get: function get() {
        return {
          10: 'aac',
          2: 'mp3'
        };
      }
    }]);

    return AudioTag;
  }();

  var ExpGolomb =
  /*#__PURE__*/
  function () {
    function ExpGolomb(uint8array) {
      classCallCheck(this, ExpGolomb);

      this.TAG = 'ExpGolomb';
      this._buffer = uint8array;
      this._buffer_index = 0;
      this._total_bytes = uint8array.byteLength;
      this._total_bits = uint8array.byteLength * 8;
      this._current_word = 0;
      this._current_word_bits_left = 0;
    }

    createClass(ExpGolomb, [{
      key: "destroy",
      value: function destroy() {
        this._buffer = null;
      }
    }, {
      key: "_fillCurrentWord",
      value: function _fillCurrentWord() {
        var buffer_bytes_left = this._total_bytes - this._buffer_index;
        if (buffer_bytes_left <= 0) throw new FlvplayerError('ExpGolomb: _fillCurrentWord() but no bytes available');
        var bytes_read = Math.min(4, buffer_bytes_left);
        var word = new Uint8Array(4);
        word.set(this._buffer.subarray(this._buffer_index, this._buffer_index + bytes_read));
        this._current_word = new DataView(word.buffer).getUint32(0, false);
        this._buffer_index += bytes_read;
        this._current_word_bits_left = bytes_read * 8;
      }
    }, {
      key: "readBits",
      value: function readBits(bits) {
        if (bits > 32) throw new FlvplayerError('ExpGolomb: readBits() bits exceeded max 32bits!');

        if (bits <= this._current_word_bits_left) {
          var _result = this._current_word >>> 32 - bits;

          this._current_word <<= bits;
          this._current_word_bits_left -= bits;
          return _result;
        }

        var result = this._current_word_bits_left ? this._current_word : 0;
        result = result >>> 32 - this._current_word_bits_left;
        var bits_need_left = bits - this._current_word_bits_left;

        this._fillCurrentWord();

        var bits_read_next = Math.min(bits_need_left, this._current_word_bits_left);
        var result2 = this._current_word >>> 32 - bits_read_next;
        this._current_word <<= bits_read_next;
        this._current_word_bits_left -= bits_read_next;
        result = result << bits_read_next | result2;
        return result;
      }
    }, {
      key: "readBool",
      value: function readBool() {
        return this.readBits(1) === 1;
      }
    }, {
      key: "readByte",
      value: function readByte() {
        return this.readBits(8);
      }
    }, {
      key: "_skipLeadingZero",
      value: function _skipLeadingZero() {
        var zero_count;

        for (zero_count = 0; zero_count < this._current_word_bits_left; zero_count++) {
          if (0 !== (this._current_word & 0x80000000 >>> zero_count)) {
            this._current_word <<= zero_count;
            this._current_word_bits_left -= zero_count;
            return zero_count;
          }
        }

        this._fillCurrentWord();

        return zero_count + this._skipLeadingZero();
      }
    }, {
      key: "readUEG",
      value: function readUEG() {
        // unsigned exponential golomb
        var leading_zeros = this._skipLeadingZero();

        return this.readBits(leading_zeros + 1) - 1;
      }
    }, {
      key: "readSEG",
      value: function readSEG() {
        // signed exponential golomb
        var value = this.readUEG();

        if (value & 0x01) {
          return value + 1 >>> 1;
        } else {
          return -1 * (value >>> 1);
        }
      }
    }]);

    return ExpGolomb;
  }();

  var SPSParser =
  /*#__PURE__*/
  function () {
    function SPSParser() {
      classCallCheck(this, SPSParser);
    }

    createClass(SPSParser, null, [{
      key: "_ebsp2rbsp",
      value: function _ebsp2rbsp(uint8array) {
        var src = uint8array;
        var src_length = src.byteLength;
        var dst = new Uint8Array(src_length);
        var dst_idx = 0;

        for (var i = 0; i < src_length; i++) {
          if (i >= 2) {
            // Unescape: Skip 0x03 after 00 00
            if (src[i] === 0x03 && src[i - 1] === 0x00 && src[i - 2] === 0x00) {
              continue;
            }
          }

          dst[dst_idx] = src[i];
          dst_idx++;
        }

        return new Uint8Array(dst.buffer, 0, dst_idx);
      }
    }, {
      key: "parseSPS",
      value: function parseSPS(uint8array) {
        var rbsp = SPSParser._ebsp2rbsp(uint8array);

        var gb = new ExpGolomb(rbsp);
        gb.readByte();
        var profile_idc = gb.readByte(); // profile_idc

        gb.readByte(); // constraint_set_flags[5] + reserved_zero[3]

        var level_idc = gb.readByte(); // level_idc

        gb.readUEG(); // seq_parameter_set_id

        var profile_string = SPSParser.getProfileString(profile_idc);
        var level_string = SPSParser.getLevelString(level_idc);
        var chroma_format_idc = 1;
        var chroma_format = 420;
        var chroma_format_table = [0, 420, 422, 444];
        var bit_depth = 8;

        if (profile_idc === 100 || profile_idc === 110 || profile_idc === 122 || profile_idc === 244 || profile_idc === 44 || profile_idc === 83 || profile_idc === 86 || profile_idc === 118 || profile_idc === 128 || profile_idc === 138 || profile_idc === 144) {
          chroma_format_idc = gb.readUEG();

          if (chroma_format_idc === 3) {
            gb.readBits(1); // separate_colour_plane_flag
          }

          if (chroma_format_idc <= 3) {
            chroma_format = chroma_format_table[chroma_format_idc];
          }

          bit_depth = gb.readUEG() + 8; // bit_depth_luma_minus8

          gb.readUEG(); // bit_depth_chroma_minus8

          gb.readBits(1); // qpprime_y_zero_transform_bypass_flag

          if (gb.readBool()) {
            // seq_scaling_matrix_present_flag
            var scaling_list_count = chroma_format_idc !== 3 ? 8 : 12;

            for (var i = 0; i < scaling_list_count; i++) {
              if (gb.readBool()) {
                // seq_scaling_list_present_flag
                if (i < 6) {
                  SPSParser._skipScalingList(gb, 16);
                } else {
                  SPSParser._skipScalingList(gb, 64);
                }
              }
            }
          }
        }

        gb.readUEG(); // log2_max_frame_num_minus4

        var pic_order_cnt_type = gb.readUEG();

        if (pic_order_cnt_type === 0) {
          gb.readUEG(); // log2_max_pic_order_cnt_lsb_minus_4
        } else if (pic_order_cnt_type === 1) {
          gb.readBits(1); // delta_pic_order_always_zero_flag

          gb.readSEG(); // offset_for_non_ref_pic

          gb.readSEG(); // offset_for_top_to_bottom_field

          var num_ref_frames_in_pic_order_cnt_cycle = gb.readUEG();

          for (var _i = 0; _i < num_ref_frames_in_pic_order_cnt_cycle; _i++) {
            gb.readSEG(); // offset_for_ref_frame
          }
        }

        var ref_frames = gb.readUEG(); // max_num_ref_frames

        gb.readBits(1); // gaps_in_frame_num_value_allowed_flag

        var pic_width_in_mbs_minus1 = gb.readUEG();
        var pic_height_in_map_units_minus1 = gb.readUEG();
        var frame_mbs_only_flag = gb.readBits(1);

        if (frame_mbs_only_flag === 0) {
          gb.readBits(1); // mb_adaptive_frame_field_flag
        }

        gb.readBits(1); // direct_8x8_inference_flag

        var frame_crop_left_offset = 0;
        var frame_crop_right_offset = 0;
        var frame_crop_top_offset = 0;
        var frame_crop_bottom_offset = 0;
        var frame_cropping_flag = gb.readBool();

        if (frame_cropping_flag) {
          frame_crop_left_offset = gb.readUEG();
          frame_crop_right_offset = gb.readUEG();
          frame_crop_top_offset = gb.readUEG();
          frame_crop_bottom_offset = gb.readUEG();
        }

        var sar_width = 1,
            sar_height = 1;
        var fps = 0,
            fps_fixed = true,
            fps_num = 0,
            fps_den = 0;
        var vui_parameters_present_flag = gb.readBool();

        if (vui_parameters_present_flag) {
          if (gb.readBool()) {
            // aspect_ratio_info_present_flag
            var aspect_ratio_idc = gb.readByte();
            var sar_w_table = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2];
            var sar_h_table = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];

            if (aspect_ratio_idc > 0 && aspect_ratio_idc < 16) {
              sar_width = sar_w_table[aspect_ratio_idc - 1];
              sar_height = sar_h_table[aspect_ratio_idc - 1];
            } else if (aspect_ratio_idc === 255) {
              sar_width = gb.readByte() << 8 | gb.readByte();
              sar_height = gb.readByte() << 8 | gb.readByte();
            }
          }

          if (gb.readBool()) {
            // overscan_info_present_flag
            gb.readBool(); // overscan_appropriate_flag
          }

          if (gb.readBool()) {
            // video_signal_type_present_flag
            gb.readBits(4); // video_format & video_full_range_flag

            if (gb.readBool()) {
              // colour_description_present_flag
              gb.readBits(24); // colour_primaries & transfer_characteristics & matrix_coefficients
            }
          }

          if (gb.readBool()) {
            // chroma_loc_info_present_flag
            gb.readUEG(); // chroma_sample_loc_type_top_field

            gb.readUEG(); // chroma_sample_loc_type_bottom_field
          }

          if (gb.readBool()) {
            // timing_info_present_flag
            var num_units_in_tick = gb.readBits(32);
            var time_scale = gb.readBits(32);
            fps_fixed = gb.readBool(); // fixed_frame_rate_flag

            fps_num = time_scale;
            fps_den = num_units_in_tick * 2;
            fps = fps_num / fps_den;
          }
        }

        var sarScale = 1;

        if (sar_width !== 1 || sar_height !== 1) {
          sarScale = sar_width / sar_height;
        }

        var crop_unit_x = 0,
            crop_unit_y = 0;

        if (chroma_format_idc === 0) {
          crop_unit_x = 1;
          crop_unit_y = 2 - frame_mbs_only_flag;
        } else {
          var sub_wc = chroma_format_idc === 3 ? 1 : 2;
          var sub_hc = chroma_format_idc === 1 ? 2 : 1;
          crop_unit_x = sub_wc;
          crop_unit_y = sub_hc * (2 - frame_mbs_only_flag);
        }

        var codec_width = (pic_width_in_mbs_minus1 + 1) * 16;
        var codec_height = (2 - frame_mbs_only_flag) * ((pic_height_in_map_units_minus1 + 1) * 16);
        codec_width -= (frame_crop_left_offset + frame_crop_right_offset) * crop_unit_x;
        codec_height -= (frame_crop_top_offset + frame_crop_bottom_offset) * crop_unit_y;
        var present_width = Math.ceil(codec_width * sarScale);
        gb.destroy();
        gb = null;
        return {
          profile_string: profile_string,
          // baseline, high, high10, ...
          level_string: level_string,
          // 3, 3.1, 4, 4.1, 5, 5.1, ...
          bit_depth: bit_depth,
          // 8bit, 10bit, ...
          ref_frames: ref_frames,
          chroma_format: chroma_format,
          // 4:2:0, 4:2:2, ...
          chroma_format_string: SPSParser.getChromaFormatString(chroma_format),
          frame_rate: {
            fixed: fps_fixed,
            fps: fps,
            fps_den: fps_den,
            fps_num: fps_num
          },
          sar_ratio: {
            width: sar_width,
            height: sar_height
          },
          codec_size: {
            width: codec_width,
            height: codec_height
          },
          present_size: {
            width: present_width,
            height: codec_height
          }
        };
      }
    }, {
      key: "_skipScalingList",
      value: function _skipScalingList(gb, count) {
        var last_scale = 8,
            next_scale = 8;
        var delta_scale = 0;

        for (var i = 0; i < count; i++) {
          if (next_scale !== 0) {
            delta_scale = gb.readSEG();
            next_scale = (last_scale + delta_scale + 256) % 256;
          }

          last_scale = next_scale === 0 ? last_scale : next_scale;
        }
      }
    }, {
      key: "getProfileString",
      value: function getProfileString(profile_idc) {
        switch (profile_idc) {
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
    }, {
      key: "getLevelString",
      value: function getLevelString(level_idc) {
        return (level_idc / 10).toFixed(1);
      }
    }, {
      key: "getChromaFormatString",
      value: function getChromaFormatString(chroma) {
        switch (chroma) {
          case 420:
            return '4:2:0';

          case 422:
            return '4:2:2';

          case 444:
            return '4:4:4';

          default:
            return 'Unknown';
        }
      }
    }]);

    return SPSParser;
  }();

  var nalStart = new Uint8Array([0x00, 0x00, 0x00, 0x01]);

  var H264 =
  /*#__PURE__*/
  function () {
    function H264(flv) {
      classCallCheck(this, H264);

      this.flv = flv;
      this.meta = {};
      this.AVCDecoderConfigurationRecord = null;
    }

    createClass(H264, [{
      key: "demuxer",
      value: function demuxer(tag) {
        var debug = this.flv.debug;
        var packet = tag.body.slice(1, 5);
        debug.error(packet.length >= 4, '[H264] Invalid AVC packet, missing AVCPacketType or/and CompositionTime');
        var view = new DataView(packet.buffer);
        var AVCPacketType = view.getUint8(0);
        var CompositionTime = (view.getUint32(0) & 0x00ffffff) << 8 >> 8;
        var packetData = tag.body.subarray(5);

        if (AVCPacketType === 0) {
          debug.warn(!this.AVCDecoderConfigurationRecord, '[h264] Find another one AVCDecoderConfigurationRecord');
          this.meta = {
            format: 'h264'
          };
          this.AVCDecoderConfigurationRecord = this.getAVCDecoderConfigurationRecord(packetData);
          this.flv.emit('AVCDecoderConfigurationRecord', this.AVCDecoderConfigurationRecord);
          debug.log('avc-decoder-configuration-record', this.AVCDecoderConfigurationRecord);
          this.flv.emit('videoMeta', this.meta);
          debug.log('video-meta', this.meta);
        } else if (AVCPacketType === 1) {
          this.getAVCVideoData(packetData, CompositionTime);
        } else {
          debug.error(AVCPacketType === 2, "[H264] Invalid video packet type ".concat(AVCPacketType));
        }
      }
    }, {
      key: "getAVCDecoderConfigurationRecord",
      value: function getAVCDecoderConfigurationRecord(packetData) {
        var debug = this.flv.debug;
        debug.error(packetData.length >= 7, '[H264] AVCDecoderConfigurationRecord parse length is not enough');
        var readDcr = readBuffer(packetData);
        var result = {};

        var _readDcr = readDcr(1);

        var _readDcr2 = slicedToArray(_readDcr, 1);

        result.configurationVersion = _readDcr2[0];

        var _readDcr3 = readDcr(1);

        var _readDcr4 = slicedToArray(_readDcr3, 1);

        result.AVCProfileIndication = _readDcr4[0];

        var _readDcr5 = readDcr(1);

        var _readDcr6 = slicedToArray(_readDcr5, 1);

        result.profile_compatibility = _readDcr6[0];

        var _readDcr7 = readDcr(1);

        var _readDcr8 = slicedToArray(_readDcr7, 1);

        result.AVCLevelIndication = _readDcr8[0];
        result.lengthSizeMinusOne = (readDcr(1)[0] & 3) + 1;
        result.numOfSequenceParameterSets = readDcr(1)[0] & 31;

        for (var index = 0; index < result.numOfSequenceParameterSets; index += 1) {
          result.sequenceParameterSetLength = readBufferSum(readDcr(2));

          if (result.sequenceParameterSetLength > 0) {
            var SPS = readDcr(result.sequenceParameterSetLength);
            this.flv.emit('videoData', mergeBuffer(nalStart, SPS));

            if (index === 0) {
              result.sequenceParameterSetNALUnit = SPSParser.parseSPS(SPS);
              var codecArray = SPS.subarray(1, 4);
              var codecString = 'avc1.';

              for (var j = 0; j < 3; j += 1) {
                var h = codecArray[j].toString(16);

                if (h.length < 2) {
                  h = "0".concat(h);
                }

                codecString += h;
              }

              this.meta.codec = codecString;
            }
          }
        }

        var _readDcr9 = readDcr(1);

        var _readDcr10 = slicedToArray(_readDcr9, 1);

        result.numOfPictureParameterSets = _readDcr10[0];

        for (var _index = 0; _index < result.numOfPictureParameterSets; _index += 1) {
          result.pictureParameterSetLength = readBufferSum(readDcr(2));

          if (result.pictureParameterSetLength > 0) {
            var PPS = readDcr(result.pictureParameterSetLength);
            this.flv.emit('videoData', mergeBuffer(nalStart, PPS));
          }
        }

        debug.error(result.configurationVersion === 1, "[H264] Invalid configurationVersion: ".concat(result.configurationVersion));
        debug.error(result.AVCProfileIndication !== 0, "[H264] Invalid AVCProfileIndication: ".concat(result.AVCProfileIndication));
        debug.error(result.lengthSizeMinusOne === 4 || result.lengthSizeMinusOne !== 3, "[H264] Invalid lengthSizeMinusOne: ".concat(result.lengthSizeMinusOne));
        debug.error(result.numOfSequenceParameterSets !== 0, "[H264] Invalid numOfSequenceParameterSets: ".concat(result.numOfSequenceParameterSets));
        debug.warn(result.numOfSequenceParameterSets === 1, "[H264] Strange numOfSequenceParameterSets: ".concat(result.numOfSequenceParameterSets));
        debug.error(result.numOfPictureParameterSets !== 0, "[H264] Invalid numOfPictureParameterSets: ".concat(result.numOfPictureParameterSets));
        debug.warn(result.numOfPictureParameterSets === 1, "[H264] Strange numOfPictureParameterSets: ".concat(result.numOfPictureParameterSets));
        return result;
      }
    }, {
      key: "getAVCVideoData",
      value: function getAVCVideoData(packetData) {
        var lengthSizeMinusOne = this.AVCDecoderConfigurationRecord.lengthSizeMinusOne;
        var readVideo = readBuffer(packetData);

        while (readVideo.index < packetData.length) {
          var length = readBufferSum(readVideo(lengthSizeMinusOne));
          var nalu = mergeBuffer(nalStart, readVideo(length));
          this.flv.emit('videoData', nalu);
        }
      }
    }]);

    return H264;
  }();

  var VideoTag =
  /*#__PURE__*/
  function () {
    function VideoTag(flv) {
      classCallCheck(this, VideoTag);

      this.flv = flv;
      this.h264 = new H264(flv);
    }

    createClass(VideoTag, [{
      key: "demuxer",
      value: function demuxer(tag) {
        var debug = this.flv.debug;

        var _this$getVideoMeta = this.getVideoMeta(tag),
            codecID = _this$getVideoMeta.codecID;

        debug.error(codecID === 7, "[videoTrack] Unsupported codec in video frame: ".concat(codecID));
        this.h264.demuxer(tag);
      }
    }, {
      key: "getVideoMeta",
      value: function getVideoMeta(tag) {
        var debug = this.flv.debug;
        debug.error(tag.body.length > 1, 'Invalid video packet');
        var meta = tag.body[0];
        return {
          frameType: (meta & 0xf0) >> 4,
          codecID: meta & 0x0f
        };
      }
    }]);

    return VideoTag;
  }();

  var ScripTag =
  /*#__PURE__*/
  function () {
    function ScripTag(flv) {
      classCallCheck(this, ScripTag);

      this.flv = flv;
      this.meta = null;
    }

    createClass(ScripTag, [{
      key: "demuxer",
      value: function demuxer(tag) {
        var debug = this.flv.debug;
        var readScripTag = readBuffer(tag.body);
        var amf1 = Object.create(null);
        var amf2 = Object.create(null);

        var _readScripTag = readScripTag(1);

        var _readScripTag2 = slicedToArray(_readScripTag, 1);

        amf1.type = _readScripTag2[0];
        debug.error(amf1.type === 2, "AMF: [amf1] type expect 2, but got ".concat(amf1.type));
        amf1.size = readBufferSum(readScripTag(2));
        amf1.string = readString(readScripTag(amf1.size));

        var _readScripTag3 = readScripTag(1);

        var _readScripTag4 = slicedToArray(_readScripTag3, 1);

        amf2.type = _readScripTag4[0];
        debug.error(amf2.type === 8, "AMF: [amf2] type expect 8, but got ".concat(amf2.type));
        amf2.size = readBufferSum(readScripTag(4));
        amf2.metaData = Object.create(null);

        function getValue(type) {
          var value = null;

          if (type !== undefined) {
            switch (type) {
              case 0:
                value = readDouble(readScripTag(8));
                break;

              case 1:
                value = readBoolean(readScripTag(1));
                break;

              case 2:
                {
                  var valueLength = readBufferSum(readScripTag(2));
                  value = readString(readScripTag(valueLength));
                  break;
                }

              case 3:
                {
                  value = Object.create(null);
                  var lastType = -1;

                  while (lastType !== 9) {
                    var nameLength = readBufferSum(readScripTag(2));
                    var name = readString(readScripTag(nameLength));
                    var itemType = readScripTag(1)[0];

                    if (name) {
                      value[name] = getValue(itemType);
                    }

                    lastType = itemType;
                  }

                  break;
                }

              case 5:
                value = null;
                break;

              case 6:
                value = undefined;
                break;

              case 7:
                value = "Reference #".concat(readScripTag.index);
                readScripTag(2);
                break;

              case 8:
                {
                  value = Object.create(null);

                  var _lastType = -1;

                  while (_lastType !== 9) {
                    var _nameLength = readBufferSum(readScripTag(2));

                    var _name = readString(readScripTag(_nameLength));

                    var _itemType = readScripTag(1)[0];

                    if (_name) {
                      value[_name] = getValue(_itemType);
                    }

                    _lastType = _itemType;
                  }

                  break;
                }

              case 10:
                {
                  var _valueLength = readBufferSum(readScripTag(4));

                  value = [];

                  for (var index = 0; index < _valueLength; index += 1) {
                    var _itemType2 = readScripTag(1)[0];
                    value.push(getValue(_itemType2));
                  }

                  break;
                }

              case 11:
                value = readDouble(readScripTag(2));
                break;

              case 12:
                {
                  var _valueLength2 = readBufferSum(readScripTag(4));

                  value = readString(readScripTag(_valueLength2));
                  break;
                }

              default:
                debug.error(false, "AMF: Unknown metaData type: ".concat(type));
                break;
            }
          }

          return value;
        }

        while (readScripTag.index < tag.body.length) {
          var nameLength = readBufferSum(readScripTag(2));
          var name = readString(readScripTag(nameLength));
          var type = readScripTag(1)[0];

          if (name) {
            amf2.metaData[name] = getValue(type);
          }
        }

        debug.error(readScripTag.index === tag.body.length, 'AMF: Seems to be incompletely parsed');
        debug.error(amf2.size === Object.keys(amf2.metaData).length, 'AMF: [amf2] length does not match');
        this.meta = {
          amf1: amf1,
          amf2: amf2
        };
        this.flv.emit('scripMeta', this.meta);
        debug.log('scrip-meta', this.meta);
      }
    }]);

    return ScripTag;
  }();

  var Demuxer = function Demuxer(flv) {
    var _this = this;

    classCallCheck(this, Demuxer);

    var debug = flv.debug;
    this.scripTag = new ScripTag(flv);
    this.videoTag = new VideoTag(flv);
    this.audioTag = new AudioTag(flv);
    flv.on('parseTag', function (tag) {
      switch (tag.tagType) {
        case 18:
          _this.scripTag.demuxer(tag);

          break;

        case 9:
          _this.videoTag.demuxer(tag);

          break;

        case 8:
          _this.audioTag.demuxer(tag);

          break;

        default:
          debug.error(false, "unknown tag type: ".concat(tag.tagType));
          break;
      }
    });
  };

  var Decoder = function Decoder(flv) {
    classCallCheck(this, Decoder);

    var debug = flv.debug;
    flv.on('videoData', function (nalu) {
      var readNalu = readBuffer(nalu);
      readNalu(4);
      var nalHeader = readNalu(1)[0];
      var naluType = nalHeader & 31;

      switch (naluType) {
        case 1:
        case 5:
          // console.log(++index);
          break;

        case 6: // SEI

        case 7: // SPS

        case 8:
          // PPS
          break;

        default:
          debug.warn(false, "[NALU]: Found extra nalu type ".concat(naluType));
          break;
      }
    });
  };

  function fetchRequest(flv, url) {
    flv.emit('streamStart');
    fetch(url, {
      headers: flv.options.headers
    }).then(function (response) {
      var reader = response.body.getReader();
      flv.on('destroy', function () {
        reader.cancel();
      });
      flv.on('streamCancel', function () {
        reader.cancel();
        flv.debug.log('stream-cancel');
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
        })["catch"](function (error) {
          throw error;
        });
      })();
    });
  }

  function mozXhrRequest(flv, url) {
    flv.emit('streamStart');
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
    flv.on('streamCancel', function () {
      xhr.abort();
      flv.debug.log('stream-cancel');
    });
    xhr.send();
  }

  function xhrRequest(flv, url) {
    flv.emit('streamStart');
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
    flv.on('streamCancel', function () {
      xhr.abort();
      flv.debug.log('stream-cancel');
    });
    xhr.send();
  }

  function readFile(flv, file) {
    flv.emit('streamStart');
    var proxy = flv.events.proxy;
    var reader = new FileReader();
    proxy(reader, 'load', function (e) {
      var buffer = e.target.result;
      flv.emit('streamEnd', new Uint8Array(buffer));
    });
    reader.readAsArrayBuffer(file);
  }

  function supportsXhrResponseType(type) {
    try {
      var tmpXhr = new XMLHttpRequest();
      tmpXhr.responseType = type;
      return tmpXhr.responseType === type;
    } catch (e) {
      return false;
    }
  }

  var Stream =
  /*#__PURE__*/
  function () {
    function Stream(flv) {
      classCallCheck(this, Stream);

      var url = flv.options.url;
      this.transportFactory = Stream.getStreamFactory(url);
      this.transportFactory(flv, url);
    }

    createClass(Stream, null, [{
      key: "getStreamFactory",
      value: function getStreamFactory(url) {
        if (url instanceof File) {
          return readFile;
        }

        if (typeof Response !== 'undefined' && Object.prototype.hasOwnProperty.call(Response.prototype, 'body') && typeof Headers === 'function') {
          return fetchRequest;
        }

        var mozChunked = 'moz-chunked-arraybuffer';

        if (supportsXhrResponseType(mozChunked)) {
          return mozXhrRequest;
        }

        return xhrRequest;
      }
    }]);

    return Stream;
  }();

  var Player = function Player(flv) {
    classCallCheck(this, Player);
    var canvas = document.createElement('canvas');
    var _flv$options = flv.options,
        element = _flv$options.element,
        width = _flv$options.width,
        height = _flv$options.height;
    canvas.width = width;
    canvas.style.width = "".concat(width, "px");
    canvas.height = height;
    canvas.style.height = "".concat(height, "px");
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    element.appendChild(canvas);
    this.canvas = canvas;
  };

  var Controls = function Controls(flv) {
    classCallCheck(this, Controls);

    this.flv = flv;
  };

  var id = 0;

  var FlvPlayer =
  /*#__PURE__*/
  function (_Emitter) {
    inherits(FlvPlayer, _Emitter);

    function FlvPlayer(options) {
      var _this;

      classCallCheck(this, FlvPlayer);

      _this = possibleConstructorReturn(this, getPrototypeOf(FlvPlayer).call(this));
      checkSupport();
      _this.options = Object.assign({}, FlvPlayer.options, options);
      optionValidator(assertThisInitialized(_this));
      _this.debug = new Debug(assertThisInitialized(_this));
      _this.events = new Events(assertThisInitialized(_this));
      _this.workers = new Workers(assertThisInitialized(_this));
      _this.player = new Player(assertThisInitialized(_this));
      _this.parse = new Parse(assertThisInitialized(_this));
      _this.demuxer = new Demuxer(assertThisInitialized(_this));
      _this.decoder = new Decoder(assertThisInitialized(_this));
      _this.stream = new Stream(assertThisInitialized(_this));
      _this.controls = new Controls(assertThisInitialized(_this));

      _this.le = function le() {
        var buf = new ArrayBuffer(2);
        new DataView(buf).setInt16(0, 256, true);
        return new Int16Array(buf)[0] === 256;
      }();

      id += 1;
      _this.id = id;
      FlvPlayer.instances.push(assertThisInitialized(_this));
      return _this;
    }

    createClass(FlvPlayer, [{
      key: "destroy",
      value: function destroy() {
        this.events.destroy();
        this.workers.destroy();
        FlvPlayer.instances.splice(FlvPlayer.instances.indexOf(this), 1);
        this.emit('destroy');
      }
    }], [{
      key: "options",
      get: function get() {
        return {
          url: '',
          element: null,
          debug: false,
          live: false,
          controls: true,
          width: 400,
          height: 300,
          header: {}
        };
      }
    }, {
      key: "version",
      get: function get() {
        return '1.0.0';
      }
    }, {
      key: "env",
      get: function get() {
        return '"development"';
      }
    }]);

    return FlvPlayer;
  }(tinyEmitter);

  Object.defineProperty(FlvPlayer, 'instances', {
    value: []
  });

  return FlvPlayer;

}));
//# sourceMappingURL=uncompiled-flvPlayer.js.map
