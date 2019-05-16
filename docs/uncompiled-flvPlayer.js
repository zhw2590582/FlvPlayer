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

  var SPSParser =
  /*#__PURE__*/
  function () {
    function SPSParser() {
      classCallCheck(this, SPSParser);
    }

    createClass(SPSParser, null, [{
      key: "getProfileString",
      value: function getProfileString(profileIdc) {
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
    }, {
      key: "parser",
      value: function parser(uint8) {
        var result = {};
        var readSPS = readBuffer(uint8);
        readSPS(1);

        var _readSPS = readSPS(1);

        var _readSPS2 = slicedToArray(_readSPS, 1);

        result.profile_idc = _readSPS2[0];
        readSPS(1);

        var _readSPS3 = readSPS(1);

        var _readSPS4 = slicedToArray(_readSPS3, 1);

        result.level_idc = _readSPS4[0];
        return result;
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
      this.mate = {};
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
          this.mate = {
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
            this.flv.emit('nalu', mergeBuffer(nalStart, SPS));

            if (index === 0) {
              result.sequenceParameterSetNALUnit = SPSParser.parser(SPS);
              var codecArray = SPS.subarray(1, 4);
              var codecString = 'avc1.';

              for (var j = 0; j < 3; j += 1) {
                var h = codecArray[j].toString(16);

                if (h.length < 2) {
                  h = "0".concat(h);
                }

                codecString += h;
              }

              this.mate.codec = codecString;
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
            this.flv.emit('nalu', mergeBuffer(nalStart, PPS));
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
          this.flv.emit('nalu', nalu);
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

  var Remuxer = function Remuxer(flv) {
    classCallCheck(this, Remuxer);

    var debug = flv.debug;
    flv.on('nalu', function (nalu) {
      var readNalu = readBuffer(nalu);
      readNalu(4);
      var nalHeader = readNalu(1)[0];
      var naluType = nalHeader & 31;

      switch (naluType) {
        case 1:
          //
          break;

        case 5:
          // IDR
          console.log(nalu);
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
      _this.remuxer = new Remuxer(assertThisInitialized(_this));
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
