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
  function download(url, name) {
    var elink = document.createElement('a');
    elink.style.display = 'none';
    elink.href = url;
    elink.download = name;
    document.body.appendChild(elink);
    elink.click();
    document.body.removeChild(elink);
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
      this.tags = [];
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
          _this.tags = [];

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

          this.tags.push(tag);
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
      this.AudioSpecificConfig = null;
    }

    createClass(AAC, [{
      key: "demuxer",
      value: function demuxer(tag, requestMeta) {
        var debug = this.flv.debug;
        var packet = tag.body.subarray(1);
        var packetType = packet[0];
        var data = null;
        var meta = null;

        if (packetType === 0) {
          var packetData = packet.subarray(1);
          debug.warn(!this.AudioSpecificConfig, '[aac] Find another one AudioSpecificConfig');
          this.AudioSpecificConfig = this.getAudioSpecificConfig(packetData);
          this.flv.emit('AudioSpecificConfig', this.AudioSpecificConfig);
          debug.log('audio-specific-config', this.AudioSpecificConfig);
        } else {
          var ADTSLen = tag.dataSize - 2 + 7;
          var ADTSHeader = this.getADTSHeader(ADTSLen);
          var ADTSBody = tag.body.subarray(2);
          data = mergeBuffer(ADTSHeader, ADTSBody);
        }

        if (requestMeta) {
          meta = {
            format: 'aac',
            sampleRate: AAC.SAMPLERATES[this.AudioSpecificConfig.samplingFrequencyIndex],
            channels: AAC.CHANNELS[this.AudioSpecificConfig.channelConfiguration],
            codec: "mp4a.40.".concat(this.AudioSpecificConfig.audioObjectType)
          };
        }

        return {
          meta: meta,
          data: data
        };
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
    }

    createClass(MP3, [{
      key: "demuxer",
      value: function demuxer(tag, requestMeta) {
        var debug = this.flv.debug;
        var packet = tag.body.subarray(1);
        var meta = null;

        if (requestMeta) {
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

          meta = {
            ver: ver,
            layer: layer,
            bitRate: bitRate,
            sampleRate: sampleRate,
            channels: channels,
            format: 'mp3',
            codec: 'mp3'
          };
        }

        return {
          meta: meta,
          data: packet
        };
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
      value: function demuxer(tag, requestMeta) {
        var debug = this.flv.debug;

        var _this$getAudioMeta = this.getAudioMeta(tag),
            soundFormat = _this$getAudioMeta.soundFormat;

        debug.error(soundFormat === 10 || soundFormat === 2, "[audioTrack] unsupported audio format: ".concat(soundFormat));
        var format = AudioTag.SOUND_FORMATS[soundFormat];

        var _this$format$demuxer = this[format].demuxer(tag, requestMeta),
            data = _this$format$demuxer.data,
            meta = _this$format$demuxer.meta;

        return {
          meta: meta,
          data: data
        };
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

  var H264 =
  /*#__PURE__*/
  function () {
    function H264(flv) {
      classCallCheck(this, H264);

      this.flv = flv;
      this.nalStart = new Uint8Array([0x00, 0x00, 0x00, 0x01]);
      this.mate = {};
      this.SPS = new Uint8Array(0);
      this.PPS = new Uint8Array(0);
      this.AVCDecoderConfigurationRecord = null;
    }

    createClass(H264, [{
      key: "demuxer",
      value: function demuxer(tag, requestMeta) {
        var debug = this.flv.debug;
        var packet = tag.body.slice(1, 5);
        debug.error(packet.length >= 4, '[H264] Invalid AVC packet, missing AVCPacketType or/and CompositionTime');
        var data = null;
        var meta = null;
        var view = new DataView(packet.buffer);
        var AVCPacketType = view.getUint8(0);
        var CompositionTime = (view.getUint32(0) & 0x00ffffff) << 8 >> 8;
        var packetData = tag.body.subarray(5);

        if (AVCPacketType === 0) {
          debug.warn(!this.AVCDecoderConfigurationRecord, '[h264] Find another one AVCDecoderConfigurationRecord');
          this.AVCDecoderConfigurationRecord = this.getAVCDecoderConfigurationRecord(packetData);
          this.flv.emit('AVCDecoderConfigurationRecord', this.AVCDecoderConfigurationRecord);
          debug.log('avc-decoder-configuration-record', this.AVCDecoderConfigurationRecord);
          data = mergeBuffer(this.nalStart, this.SPS, this.nalStart, this.PPS);
        } else if (AVCPacketType === 1) {
          data = this.getAVCVideoData(packetData, CompositionTime);
        } else {
          debug.error(AVCPacketType === 2, "[H264] Invalid video packet type ".concat(AVCPacketType));
        }

        if (requestMeta) {
          meta = objectSpread({
            format: 'h264'
          }, this.mate);
        }

        return {
          meta: meta,
          data: data
        };
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
            this.SPS = readDcr(result.sequenceParameterSetLength);

            if (index === 0) {
              result.sequenceParameterSetNALUnit = SPSParser.parser(this.SPS);
              var codecArray = this.SPS.subarray(1, 4);
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
            this.PPS = readDcr(result.pictureParameterSetLength);
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
        var frame = new Uint8Array(0);

        while (readVideo.index < packetData.length) {
          var length = readBufferSum(readVideo(lengthSizeMinusOne));
          frame = mergeBuffer(frame, this.nalStart, readVideo(length));
        }

        return frame;
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
      value: function demuxer(tag, requestMeta) {
        var debug = this.flv.debug;

        var _this$getVideoMeta = this.getVideoMeta(tag),
            codecID = _this$getVideoMeta.codecID;

        debug.error(codecID === 7, "[videoTrack] Unsupported codec in video frame: ".concat(codecID));

        var _this$h264$demuxer = this.h264.demuxer(tag, requestMeta),
            data = _this$h264$demuxer.data,
            meta = _this$h264$demuxer.meta;

        return {
          meta: meta,
          data: data
        };
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
        return {
          amf1: amf1,
          amf2: amf2
        };
      }
    }]);

    return ScripTag;
  }();

  var Demuxer =
  /*#__PURE__*/
  function () {
    function Demuxer(flv) {
      var _this = this;

      classCallCheck(this, Demuxer);

      this.flv = flv;
      var debug = flv.debug;
      this.scripMeta = null;
      this.audioMeta = null;
      this.videoMeta = null;
      this.audioTrack = [];
      this.videoTrack = [];
      this.scripTag = new ScripTag(flv);
      this.videoTag = new VideoTag(flv);
      this.audioTag = new AudioTag(flv);
      flv.on('parseTag', function (tag) {
        switch (tag.tagType) {
          case 18:
            _this.scripMeta = _this.scripTag.demuxer(tag);
            flv.emit('scripMeta', _this.scripMeta);
            debug.log('scrip-meta', _this.scripMeta);
            break;

          case 9:
            {
              var _this$videoTag$demuxe = _this.videoTag.demuxer(tag, !_this.videoMeta),
                  data = _this$videoTag$demuxe.data,
                  meta = _this$videoTag$demuxe.meta;

              if (data) {
                var result = {
                  timestamp: tag.timestamp,
                  data: data
                };

                _this.videoTrack.push(result);

                flv.emit('videoTrack', result);
              }

              if (!_this.videoMeta && meta) {
                _this.videoMeta = meta;
                flv.emit('videoMeta', meta);
                debug.log('video-meta', meta);
              }

              break;
            }

          case 8:
            {
              var _this$audioTag$demuxe = _this.audioTag.demuxer(tag, !_this.audioMeta),
                  _data = _this$audioTag$demuxe.data,
                  _meta = _this$audioTag$demuxe.meta;

              if (_data) {
                var _result = {
                  timestamp: tag.timestamp,
                  data: _data
                };

                _this.audioTrack.push(_result);

                flv.emit('audioTrack', _result);
              }

              if (!_this.audioMeta && _meta) {
                _this.audioMeta = _meta;
                flv.emit('audioMeta', _meta);
                debug.log('audio-meta', _meta);
              }

              break;
            }

          default:
            debug.error(false, "unknown tag type: ".concat(tag.tagType));
            break;
        }
      });
    }

    createClass(Demuxer, [{
      key: "downloadAudio",
      value: function downloadAudio() {
        var _this$flv = this.flv,
            parse = _this$flv.parse,
            debug = _this$flv.debug;
        debug.error(parse.loaded, 'Stream not loaded yet complete');
        var url = URL.createObjectURL(new Blob([mergeBuffer.apply(void 0, toConsumableArray(this.audioTrack.map(function (item) {
          return item.data;
        })))]));
        download(url, "audioTrack.".concat(this.audioMeta.format));
      }
    }, {
      key: "downloadVideo",
      value: function downloadVideo() {
        var _this$flv2 = this.flv,
            parse = _this$flv2.parse,
            debug = _this$flv2.debug;
        debug.error(parse.loaded, 'Stream not loaded yet complete');
        var url = URL.createObjectURL(new Blob([mergeBuffer.apply(void 0, toConsumableArray(this.videoTrack.map(function (item) {
          return item.data;
        })))]));
        download(url, "videoTrack.".concat(this.videoMeta.format));
      }
    }]);

    return Demuxer;
  }();

  var Remuxer = function Remuxer(flv) {
    classCallCheck(this, Remuxer);

    this.flv = flv;
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

  var global;

  function initglobal() {
    global = this;

    if (!global) {
      if (typeof window != 'undefined') {
        global = window;
      } else if (typeof self != 'undefined') {
        global = self;
      }
    }
  }

  initglobal();

  var getModule = function getModule(par_broadwayOnHeadersDecoded, par_broadwayOnPictureDecoded) {
    /*var ModuleX = {
    'print': function(text) { console.log('stdout: ' + text); },
    'printErr': function(text) { console.log('stderr: ' + text); }
    };*/

    /*
       The reason why this is all packed into one file is that this file can also function as worker.
    you can integrate the file into your build system and provide the original file to be loaded into a worker.
     */
    //var Module = (function(){
    var Module = typeof Module !== 'undefined' ? Module : {};
    var moduleOverrides = {};
    var key;

    for (key in Module) {
      if (Module.hasOwnProperty(key)) {
        moduleOverrides[key] = Module[key];
      }
    }

    Module['arguments'] = [];
    Module['thisProgram'] = './this.program';

    Module['quit'] = function (status, toThrow) {
      throw toThrow;
    };

    Module['preRun'] = [];
    Module['postRun'] = [];
    var ENVIRONMENT_IS_WEB = false;
    var ENVIRONMENT_IS_WORKER = false;
    var ENVIRONMENT_IS_NODE = false;
    var ENVIRONMENT_IS_SHELL = false;

    if (Module['ENVIRONMENT']) {
      if (Module['ENVIRONMENT'] === 'WEB') {
        ENVIRONMENT_IS_WEB = true;
      } else if (Module['ENVIRONMENT'] === 'WORKER') {
        ENVIRONMENT_IS_WORKER = true;
      } else if (Module['ENVIRONMENT'] === 'NODE') {
        ENVIRONMENT_IS_NODE = true;
      } else if (Module['ENVIRONMENT'] === 'SHELL') {
        ENVIRONMENT_IS_SHELL = true;
      } else {
        throw new Error("Module['ENVIRONMENT'] value is not valid. must be one of: WEB|WORKER|NODE|SHELL.");
      }
    } else {
      ENVIRONMENT_IS_WEB = (typeof window === "undefined" ? "undefined" : _typeof_1(window)) === 'object';
      ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
      ENVIRONMENT_IS_NODE = (typeof process === "undefined" ? "undefined" : _typeof_1(process)) === 'object' && typeof null === 'function' && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
      ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
    }

    if (ENVIRONMENT_IS_NODE) {
      var nodeFS;
      var nodePath;

      Module['read'] = function shell_read(filename, binary) {
        var ret;
        if (!nodeFS) nodeFS = null('fs');
        if (!nodePath) nodePath = null('path');
        filename = nodePath['normalize'](filename);
        ret = nodeFS['readFileSync'](filename);
        return binary ? ret : ret.toString();
      };

      Module['readBinary'] = function readBinary(filename) {
        var ret = Module['read'](filename, true);

        if (!ret.buffer) {
          ret = new Uint8Array(ret);
        }

        assert(ret.buffer);
        return ret;
      };

      if (process['argv'].length > 1) {
        Module['thisProgram'] = process['argv'][1].replace(/\\/g, '/');
      }

      Module['arguments'] = process['argv'].slice(2);

      if (typeof module !== 'undefined') {
        module['exports'] = Module;
      }

      process['on']('uncaughtException', function (ex) {
        if (!(ex instanceof ExitStatus)) {
          throw ex;
        }
      });
      process['on']('unhandledRejection', function (reason, p) {
        process['exit'](1);
      });

      Module['inspect'] = function () {
        return '[Emscripten Module object]';
      };
    } else if (ENVIRONMENT_IS_SHELL) {
      if (typeof read != 'undefined') {
        Module['read'] = function shell_read(f) {
          return read(f);
        };
      }

      Module['readBinary'] = function readBinary(f) {
        var data;

        if (typeof readbuffer === 'function') {
          return new Uint8Array(readbuffer(f));
        }

        data = read(f, 'binary');
        assert(_typeof_1(data) === 'object');
        return data;
      };

      if (typeof scriptArgs != 'undefined') {
        Module['arguments'] = scriptArgs;
      } else if (typeof arguments != 'undefined') {
        Module['arguments'] = arguments;
      }

      if (typeof quit === 'function') {
        Module['quit'] = function (status, toThrow) {
          quit(status);
        };
      }
    } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
      Module['read'] = function shell_read(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);
        return xhr.responseText;
      };

      if (ENVIRONMENT_IS_WORKER) {
        Module['readBinary'] = function readBinary(url) {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, false);
          xhr.responseType = 'arraybuffer';
          xhr.send(null);
          return new Uint8Array(xhr.response);
        };
      }

      Module['readAsync'] = function readAsync(url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function xhr_onload() {
          if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
            onload(xhr.response);
            return;
          }

          onerror();
        };

        xhr.onerror = onerror;
        xhr.send(null);
      };

      Module['setWindowTitle'] = function (title) {
        document.title = title;
      };
    } else {
      throw new Error('not compiled for this environment');
    }

    Module['print'] = typeof console !== 'undefined' ? console.log.bind(console) : typeof print !== 'undefined' ? print : null;
    Module['printErr'] = typeof printErr !== 'undefined' ? printErr : typeof console !== 'undefined' && console.warn.bind(console) || Module['print'];
    Module.print = Module['print'];
    Module.printErr = Module['printErr'];

    for (key in moduleOverrides) {
      if (moduleOverrides.hasOwnProperty(key)) {
        Module[key] = moduleOverrides[key];
      }
    }

    moduleOverrides = undefined;
    var STACK_ALIGN = 16;

    function staticAlloc(size) {
      assert(!staticSealed);
      var ret = STATICTOP;
      STATICTOP = STATICTOP + size + 15 & -16;
      return ret;
    }

    function alignMemory(size, factor) {
      if (!factor) factor = STACK_ALIGN;
      var ret = size = Math.ceil(size / factor) * factor;
      return ret;
    }

    var asm2wasmImports = {
      'f64-rem': function f64Rem(x, y) {
        return x % y;
      },
      "debugger": function _debugger() {
        debugger;
      }
    };
    var GLOBAL_BASE = 1024;
    var ABORT = 0;

    function assert(condition, text) {
      if (!condition) {
        abort('Assertion failed: ' + text);
      }
    }

    function Pointer_stringify(ptr, length) {
      if (length === 0 || !ptr) return '';
      var hasUtf = 0;
      var t;
      var i = 0;

      while (1) {
        t = HEAPU8[ptr + i >> 0];
        hasUtf |= t;
        if (t == 0 && !length) break;
        i++;
        if (length && i == length) break;
      }

      if (!length) length = i;
      var ret = '';

      if (hasUtf < 128) {
        var MAX_CHUNK = 1024;
        var curr;

        while (length > 0) {
          curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
          ret = ret ? ret + curr : curr;
          ptr += MAX_CHUNK;
          length -= MAX_CHUNK;
        }

        return ret;
      }

      return UTF8ToString(ptr);
    }

    var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;

    function UTF8ArrayToString(u8Array, idx) {
      var endPtr = idx;

      while (u8Array[endPtr]) {
        ++endPtr;
      }

      if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
        return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
      } else {
        var u0, u1, u2, u3, u4, u5;
        var str = '';

        while (1) {
          u0 = u8Array[idx++];
          if (!u0) return str;

          if (!(u0 & 128)) {
            str += String.fromCharCode(u0);
            continue;
          }

          u1 = u8Array[idx++] & 63;

          if ((u0 & 224) == 192) {
            str += String.fromCharCode((u0 & 31) << 6 | u1);
            continue;
          }

          u2 = u8Array[idx++] & 63;

          if ((u0 & 240) == 224) {
            u0 = (u0 & 15) << 12 | u1 << 6 | u2;
          } else {
            u3 = u8Array[idx++] & 63;

            if ((u0 & 248) == 240) {
              u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u3;
            } else {
              u4 = u8Array[idx++] & 63;

              if ((u0 & 252) == 248) {
                u0 = (u0 & 3) << 24 | u1 << 18 | u2 << 12 | u3 << 6 | u4;
              } else {
                u5 = u8Array[idx++] & 63;
                u0 = (u0 & 1) << 30 | u1 << 24 | u2 << 18 | u3 << 12 | u4 << 6 | u5;
              }
            }
          }

          if (u0 < 65536) {
            str += String.fromCharCode(u0);
          } else {
            var ch = u0 - 65536;
            str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
          }
        }
      }
    }

    function UTF8ToString(ptr) {
      return UTF8ArrayToString(HEAPU8, ptr);
    }

    var UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined;
    var WASM_PAGE_SIZE = 65536;
    var ASMJS_PAGE_SIZE = 16777216;

    function alignUp(x, multiple) {
      if (x % multiple > 0) {
        x += multiple - x % multiple;
      }

      return x;
    }

    var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

    function updateGlobalBuffer(buf) {
      Module['buffer'] = buffer = buf;
    }

    function updateGlobalBufferViews() {
      Module['HEAP8'] = HEAP8 = new Int8Array(buffer);
      Module['HEAP16'] = HEAP16 = new Int16Array(buffer);
      Module['HEAP32'] = HEAP32 = new Int32Array(buffer);
      Module['HEAPU8'] = HEAPU8 = new Uint8Array(buffer);
      Module['HEAPU16'] = HEAPU16 = new Uint16Array(buffer);
      Module['HEAPU32'] = HEAPU32 = new Uint32Array(buffer);
      Module['HEAPF32'] = HEAPF32 = new Float32Array(buffer);
      Module['HEAPF64'] = HEAPF64 = new Float64Array(buffer);
    }

    var STATIC_BASE, STATICTOP, staticSealed;
    var STACK_BASE, STACKTOP, STACK_MAX;
    var DYNAMIC_BASE, DYNAMICTOP_PTR;
    STATIC_BASE = STATICTOP = STACK_BASE = STACKTOP = STACK_MAX = DYNAMIC_BASE = DYNAMICTOP_PTR = 0;
    staticSealed = false;

    function abortOnCannotGrowMemory() {
      abort('Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value ' + TOTAL_MEMORY + ', (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ');
    }

    function enlargeMemory() {
      abortOnCannotGrowMemory();
    }

    var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
    var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 52428800;
    if (TOTAL_MEMORY < TOTAL_STACK) Module.printErr('TOTAL_MEMORY should be larger than TOTAL_STACK, was ' + TOTAL_MEMORY + '! (TOTAL_STACK=' + TOTAL_STACK + ')');

    if (Module['buffer']) {
      buffer = Module['buffer'];
    } else {
      if ((typeof WebAssembly === "undefined" ? "undefined" : _typeof_1(WebAssembly)) === 'object' && typeof WebAssembly.Memory === 'function') {
        Module['wasmMemory'] = new WebAssembly.Memory({
          initial: TOTAL_MEMORY / WASM_PAGE_SIZE,
          maximum: TOTAL_MEMORY / WASM_PAGE_SIZE
        });
        buffer = Module['wasmMemory'].buffer;
      } else {
        buffer = new ArrayBuffer(TOTAL_MEMORY);
      }

      Module['buffer'] = buffer;
    }

    updateGlobalBufferViews();

    function getTotalMemory() {
      return TOTAL_MEMORY;
    }

    HEAP32[0] = 1668509029;
    HEAP16[1] = 25459;
    if (HEAPU8[2] !== 115 || HEAPU8[3] !== 99) throw 'Runtime error: expected the system to be little-endian!';

    function callRuntimeCallbacks(callbacks) {
      while (callbacks.length > 0) {
        var callback = callbacks.shift();

        if (typeof callback == 'function') {
          callback();
          continue;
        }

        var func = callback.func;

        if (typeof func === 'number') {
          if (callback.arg === undefined) {
            Module['dynCall_v'](func);
          } else {
            Module['dynCall_vi'](func, callback.arg);
          }
        } else {
          func(callback.arg === undefined ? null : callback.arg);
        }
      }
    }

    var __ATPRERUN__ = [];
    var __ATINIT__ = [];
    var __ATMAIN__ = [];
    var __ATEXIT__ = [];
    var __ATPOSTRUN__ = [];
    var runtimeInitialized = false;

    function preRun() {
      if (Module['preRun']) {
        if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];

        while (Module['preRun'].length) {
          addOnPreRun(Module['preRun'].shift());
        }
      }

      callRuntimeCallbacks(__ATPRERUN__);
    }

    function ensureInitRuntime() {
      if (runtimeInitialized) return;
      runtimeInitialized = true;
      callRuntimeCallbacks(__ATINIT__);
    }

    function preMain() {
      callRuntimeCallbacks(__ATMAIN__);
    }

    function exitRuntime() {
      callRuntimeCallbacks(__ATEXIT__);
    }

    function postRun() {
      if (Module['postRun']) {
        if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];

        while (Module['postRun'].length) {
          addOnPostRun(Module['postRun'].shift());
        }
      }

      callRuntimeCallbacks(__ATPOSTRUN__);
    }

    function addOnPreRun(cb) {
      __ATPRERUN__.unshift(cb);
    }

    function addOnPostRun(cb) {
      __ATPOSTRUN__.unshift(cb);
    }
    var runDependencies = 0;
    var runDependencyWatcher = null;
    var dependenciesFulfilled = null;

    function addRunDependency(id) {
      runDependencies++;

      if (Module['monitorRunDependencies']) {
        Module['monitorRunDependencies'](runDependencies);
      }
    }

    function removeRunDependency(id) {
      runDependencies--;

      if (Module['monitorRunDependencies']) {
        Module['monitorRunDependencies'](runDependencies);
      }

      if (runDependencies == 0) {
        if (runDependencyWatcher !== null) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
        }

        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback();
        }
      }
    }

    Module['preloadedImages'] = {};
    Module['preloadedAudios'] = {};
    var dataURIPrefix = 'data:application/octet-stream;base64,';

    function isDataURI(filename) {
      return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0;
    }

    function integrateWasmJS() {
      var wasmTextFile = 'avc.wast';
      var wasmBinaryFile = 'avc.wasm';
      var asmjsCodeFile = 'avc.temp.asm.js';

      if (typeof Module['locateFile'] === 'function') {
        if (!isDataURI(wasmTextFile)) {
          wasmTextFile = Module['locateFile'](wasmTextFile);
        }

        if (!isDataURI(wasmBinaryFile)) {
          wasmBinaryFile = Module['locateFile'](wasmBinaryFile);
        }

        if (!isDataURI(asmjsCodeFile)) {
          asmjsCodeFile = Module['locateFile'](asmjsCodeFile);
        }
      }

      var wasmPageSize = 64 * 1024;
      var info = {
        global: null,
        env: null,
        asm2wasm: asm2wasmImports,
        parent: Module
      };
      var exports = null;

      function mergeMemory(newBuffer) {
        var oldBuffer = Module['buffer'];

        if (newBuffer.byteLength < oldBuffer.byteLength) {
          Module['printErr']('the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here');
        }

        var oldView = new Int8Array(oldBuffer);
        var newView = new Int8Array(newBuffer);
        newView.set(oldView);
        updateGlobalBuffer(newBuffer);
        updateGlobalBufferViews();
      }

      function fixImports(imports) {
        return imports;
      }

      function getBinary() {
        try {
          if (Module['wasmBinary']) {
            return new Uint8Array(Module['wasmBinary']);
          }

          if (Module['readBinary']) {
            return Module['readBinary'](wasmBinaryFile);
          } else {
            throw "on the web, we need the wasm binary to be preloaded and set on Module['wasmBinary']. emcc.py will do that for you when generating HTML (but not JS)";
          }
        } catch (err) {
          abort(err);
        }
      }

      function getBinaryPromise() {
        if (!Module['wasmBinary'] && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === 'function') {
          return fetch(wasmBinaryFile, {
            credentials: 'same-origin'
          }).then(function (response) {
            if (!response['ok']) {
              throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
            }

            return response['arrayBuffer']();
          })["catch"](function () {
            return getBinary();
          });
        }

        return new Promise(function (resolve, reject) {
          resolve(getBinary());
        });
      }

      function doNativeWasm(global, env, providedBuffer) {
        if ((typeof WebAssembly === "undefined" ? "undefined" : _typeof_1(WebAssembly)) !== 'object') {
          Module['printErr']('no native wasm support detected');
          return false;
        }

        if (!(Module['wasmMemory'] instanceof WebAssembly.Memory)) {
          Module['printErr']('no native wasm Memory in use');
          return false;
        }

        env['memory'] = Module['wasmMemory'];
        info['global'] = {
          NaN: NaN,
          Infinity: Infinity
        };
        info['global.Math'] = Math;
        info['env'] = env;

        function receiveInstance(instance, module) {
          exports = instance.exports;
          if (exports.memory) mergeMemory(exports.memory);
          Module['asm'] = exports;
          Module['usingWasm'] = true;
          removeRunDependency('wasm-instantiate');
        }

        addRunDependency('wasm-instantiate');

        if (Module['instantiateWasm']) {
          try {
            return Module['instantiateWasm'](info, receiveInstance);
          } catch (e) {
            Module['printErr']('Module.instantiateWasm callback failed with error: ' + e);
            return false;
          }
        }

        function receiveInstantiatedSource(output) {
          receiveInstance(output['instance'], output['module']);
        }

        function instantiateArrayBuffer(receiver) {
          getBinaryPromise().then(function (binary) {
            return WebAssembly.instantiate(binary, info);
          }).then(receiver)["catch"](function (reason) {
            Module['printErr']('failed to asynchronously prepare wasm: ' + reason);
            abort(reason);
          });
        }

        if (!Module['wasmBinary'] && typeof WebAssembly.instantiateStreaming === 'function' && !isDataURI(wasmBinaryFile) && typeof fetch === 'function') {
          WebAssembly.instantiateStreaming(fetch(wasmBinaryFile, {
            credentials: 'same-origin'
          }), info).then(receiveInstantiatedSource)["catch"](function (reason) {
            Module['printErr']('wasm streaming compile failed: ' + reason);
            Module['printErr']('falling back to ArrayBuffer instantiation');
            instantiateArrayBuffer(receiveInstantiatedSource);
          });
        } else {
          instantiateArrayBuffer(receiveInstantiatedSource);
        }

        return {};
      }

      Module['asmPreload'] = Module['asm'];

      var wasmReallocBuffer = function wasmReallocBuffer(size) {
        var PAGE_MULTIPLE = Module['usingWasm'] ? WASM_PAGE_SIZE : ASMJS_PAGE_SIZE;
        size = alignUp(size, PAGE_MULTIPLE);
        var old = Module['buffer'];
        var oldSize = old.byteLength;

        if (Module['usingWasm']) {
          try {
            var result = Module['wasmMemory'].grow((size - oldSize) / wasmPageSize);

            if (result !== (-1 | 0)) {
              return Module['buffer'] = Module['wasmMemory'].buffer;
            } else {
              return null;
            }
          } catch (e) {
            return null;
          }
        }
      };

      Module['reallocBuffer'] = function (size) {
        {
          return wasmReallocBuffer(size);
        }
      };

      Module['asm'] = function (global, env, providedBuffer) {
        env = fixImports(env);

        if (!env['table']) {
          var TABLE_SIZE = Module['wasmTableSize'];
          if (TABLE_SIZE === undefined) TABLE_SIZE = 1024;
          var MAX_TABLE_SIZE = Module['wasmMaxTableSize'];

          if ((typeof WebAssembly === "undefined" ? "undefined" : _typeof_1(WebAssembly)) === 'object' && typeof WebAssembly.Table === 'function') {
            if (MAX_TABLE_SIZE !== undefined) {
              env['table'] = new WebAssembly.Table({
                initial: TABLE_SIZE,
                maximum: MAX_TABLE_SIZE,
                element: 'anyfunc'
              });
            } else {
              env['table'] = new WebAssembly.Table({
                initial: TABLE_SIZE,
                element: 'anyfunc'
              });
            }
          } else {
            env['table'] = new Array(TABLE_SIZE);
          }

          Module['wasmTable'] = env['table'];
        }

        if (!env['memoryBase']) {
          env['memoryBase'] = Module['STATIC_BASE'];
        }

        if (!env['tableBase']) {
          env['tableBase'] = 0;
        }

        var exports;
        exports = doNativeWasm(global, env, providedBuffer);
        assert(exports, 'no binaryen method succeeded.');
        return exports;
      };
    }

    integrateWasmJS();
    STATIC_BASE = GLOBAL_BASE;
    STATICTOP = STATIC_BASE + 9888;

    __ATINIT__.push();

    var STATIC_BUMP = 9888;
    Module['STATIC_BASE'] = STATIC_BASE;
    Module['STATIC_BUMP'] = STATIC_BUMP;
    STATICTOP += 16;
    var SYSCALLS = {
      varargs: 0,
      get: function get(varargs) {
        SYSCALLS.varargs += 4;
        var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
        return ret;
      },
      getStr: function getStr() {
        var ret = Pointer_stringify(SYSCALLS.get());
        return ret;
      },
      get64: function get64() {
        var low = SYSCALLS.get(),
            high = SYSCALLS.get();
        if (low >= 0) assert(high === 0);else assert(high === -1);
        return low;
      },
      getZero: function getZero() {
        assert(SYSCALLS.get() === 0);
      }
    };

    function ___syscall140(which, varargs) {
      SYSCALLS.varargs = varargs;

      try {
        var stream = SYSCALLS.getStreamFromFD(),
            offset_high = SYSCALLS.get(),
            offset_low = SYSCALLS.get(),
            result = SYSCALLS.get(),
            whence = SYSCALLS.get();
        var offset = offset_low;
        FS.llseek(stream, offset, whence);
        HEAP32[result >> 2] = stream.position;
        if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
        return 0;
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
      }
    }

    function ___syscall146(which, varargs) {
      SYSCALLS.varargs = varargs;

      try {
        var stream = SYSCALLS.get(),
            iov = SYSCALLS.get(),
            iovcnt = SYSCALLS.get();
        var ret = 0;

        if (!___syscall146.buffers) {
          ___syscall146.buffers = [null, [], []];

          ___syscall146.printChar = function (stream, curr) {
            var buffer = ___syscall146.buffers[stream];
            assert(buffer);

            if (curr === 0 || curr === 10) {
              (stream === 1 ? Module['print'] : Module['printErr'])(UTF8ArrayToString(buffer, 0));
              buffer.length = 0;
            } else {
              buffer.push(curr);
            }
          };
        }

        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[iov + i * 8 >> 2];
          var len = HEAP32[iov + (i * 8 + 4) >> 2];

          for (var j = 0; j < len; j++) {
            ___syscall146.printChar(stream, HEAPU8[ptr + j]);
          }

          ret += len;
        }

        return ret;
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
      }
    }

    function ___syscall54(which, varargs) {
      SYSCALLS.varargs = varargs;

      try {
        return 0;
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
      }
    }

    function ___syscall6(which, varargs) {
      SYSCALLS.varargs = varargs;

      try {
        var stream = SYSCALLS.getStreamFromFD();
        FS.close(stream);
        return 0;
      } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
      }
    }

    function _broadwayOnHeadersDecoded() {
      par_broadwayOnHeadersDecoded();
    }

    Module['_broadwayOnHeadersDecoded'] = _broadwayOnHeadersDecoded;

    function _broadwayOnPictureDecoded($buffer, width, height) {
      par_broadwayOnPictureDecoded($buffer, width, height);
    }

    Module['_broadwayOnPictureDecoded'] = _broadwayOnPictureDecoded;

    function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.set(HEAPU8.subarray(src, src + num), dest);
      return dest;
    }

    function ___setErrNo(value) {
      if (Module['___errno_location']) HEAP32[Module['___errno_location']() >> 2] = value;
      return value;
    }

    DYNAMICTOP_PTR = staticAlloc(4);
    STACK_BASE = STACKTOP = alignMemory(STATICTOP);
    STACK_MAX = STACK_BASE + TOTAL_STACK;
    DYNAMIC_BASE = alignMemory(STACK_MAX);
    HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;
    staticSealed = true;
    Module['wasmTableSize'] = 10;
    Module['wasmMaxTableSize'] = 10;
    Module.asmGlobalArg = {};
    Module.asmLibraryArg = {
      abort: abort,
      enlargeMemory: enlargeMemory,
      getTotalMemory: getTotalMemory,
      abortOnCannotGrowMemory: abortOnCannotGrowMemory,
      ___setErrNo: ___setErrNo,
      ___syscall140: ___syscall140,
      ___syscall146: ___syscall146,
      ___syscall54: ___syscall54,
      ___syscall6: ___syscall6,
      _broadwayOnHeadersDecoded: _broadwayOnHeadersDecoded,
      _broadwayOnPictureDecoded: _broadwayOnPictureDecoded,
      _emscripten_memcpy_big: _emscripten_memcpy_big,
      DYNAMICTOP_PTR: DYNAMICTOP_PTR,
      STACKTOP: STACKTOP
    };
    var asm = Module['asm'](Module.asmGlobalArg, Module.asmLibraryArg, buffer);
    Module['asm'] = asm;

    var _broadwayCreateStream = Module['_broadwayCreateStream'] = function () {
      return Module['asm']['_broadwayCreateStream'].apply(null, arguments);
    };

    var _broadwayExit = Module['_broadwayExit'] = function () {
      return Module['asm']['_broadwayExit'].apply(null, arguments);
    };

    var _broadwayGetMajorVersion = Module['_broadwayGetMajorVersion'] = function () {
      return Module['asm']['_broadwayGetMajorVersion'].apply(null, arguments);
    };

    var _broadwayGetMinorVersion = Module['_broadwayGetMinorVersion'] = function () {
      return Module['asm']['_broadwayGetMinorVersion'].apply(null, arguments);
    };

    var _broadwayInit = Module['_broadwayInit'] = function () {
      return Module['asm']['_broadwayInit'].apply(null, arguments);
    };

    var _broadwayPlayStream = Module['_broadwayPlayStream'] = function () {
      return Module['asm']['_broadwayPlayStream'].apply(null, arguments);
    };

    Module['asm'] = asm;

    function ExitStatus(status) {
      this.name = 'ExitStatus';
      this.message = 'Program terminated with exit(' + status + ')';
      this.status = status;
    }

    ExitStatus.prototype = new Error();
    ExitStatus.prototype.constructor = ExitStatus;
    var initialStackTop;

    dependenciesFulfilled = function runCaller() {
      if (!Module['calledRun']) run();
      if (!Module['calledRun']) dependenciesFulfilled = runCaller;
    };

    function run(args) {
      args = args || Module['arguments'];

      if (runDependencies > 0) {
        return;
      }

      preRun();
      if (runDependencies > 0) return;
      if (Module['calledRun']) return;

      function doRun() {
        if (Module['calledRun']) return;
        Module['calledRun'] = true;
        if (ABORT) return;
        ensureInitRuntime();
        preMain();
        if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();
        postRun();
      }

      if (Module['setStatus']) {
        Module['setStatus']('Running...');
        setTimeout(function () {
          setTimeout(function () {
            Module['setStatus']('');
          }, 1);
          doRun();
        }, 1);
      } else {
        doRun();
      }
    }

    Module['run'] = run;

    function exit(status, implicit) {
      if (implicit && Module['noExitRuntime'] && status === 0) {
        return;
      }

      if (Module['noExitRuntime']) ; else {
        ABORT = true;
        STACKTOP = initialStackTop;
        exitRuntime();
        if (Module['onExit']) Module['onExit'](status);
      }

      if (ENVIRONMENT_IS_NODE) {
        process['exit'](status);
      }

      Module['quit'](status, new ExitStatus(status));
    }

    Module['exit'] = exit;

    function abort(what) {
      if (Module['onAbort']) {
        Module['onAbort'](what);
      }

      if (what !== undefined) {
        Module.print(what);
        Module.printErr(what);
        what = JSON.stringify(what);
      } else {
        what = '';
      }

      ABORT = true;
      throw 'abort(' + what + '). Build with -s ASSERTIONS=1 for more info.';
    }

    Module['abort'] = abort;

    if (Module['preInit']) {
      if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];

      while (Module['preInit'].length > 0) {
        Module['preInit'].pop()();
      }
    }

    Module['noExitRuntime'] = true;
    run(); //   return Module;
    //})();

    var resultModule;

    if (typeof global !== 'undefined') {
      if (global.Module) {
        resultModule = global.Module;
      }
    }

    if (typeof Module != 'undefined') {
      resultModule = Module;
    }

    resultModule._broadwayOnHeadersDecoded = par_broadwayOnHeadersDecoded;
    resultModule._broadwayOnPictureDecoded = par_broadwayOnPictureDecoded;
    var moduleIsReady = false;
    var cbFun;

    var moduleReady = function moduleReady() {
      moduleIsReady = true;

      if (cbFun) {
        cbFun(resultModule);
      }
    };

    resultModule.onRuntimeInitialized = function () {
      moduleReady(resultModule);
    };

    return function (callback) {
      if (moduleIsReady) {
        callback(resultModule);
      } else {
        cbFun = callback;
      }
    };
  };

  var Decoder = (function () {

    var nowValue = function nowValue() {
      return new Date().getTime();
    };

    if (typeof performance != 'undefined') {
      if (performance.now) {
        nowValue = function nowValue() {
          return performance.now();
        };
      }
    }

    var Decoder = function Decoder(parOptions) {
      this.options = parOptions || {};
      this.now = nowValue;
      var asmInstance;
      var fakeWindow = {};
      var toU8Array;
      var toU32Array;

      var onPicFun = function ($buffer, width, height) {
        var buffer = this.pictureBuffers[$buffer];

        if (!buffer) {
          buffer = this.pictureBuffers[$buffer] = toU8Array($buffer, width * height * 3 / 2);
        }

        var infos;
        var doInfo = false;

        if (this.infoAr.length) {
          doInfo = true;
          infos = this.infoAr;
        }

        this.infoAr = [];

        if (this.options.rgb) {
          if (!asmInstance) {
            asmInstance = getAsm(width, height);
          }

          asmInstance.inp.set(buffer);
          asmInstance.doit();
          var copyU8 = new Uint8Array(asmInstance.outSize);
          copyU8.set(asmInstance.out);

          if (doInfo) {
            infos[0].finishDecoding = nowValue();
          }

          this.onPictureDecoded(copyU8, width, height, infos);
          return;
        }

        if (doInfo) {
          infos[0].finishDecoding = nowValue();
        }

        this.onPictureDecoded(buffer, width, height, infos);
      }.bind(this);

      if (this.options.sliceMode) {
        onPicFun = function ($buffer, width, height, $sliceInfo) {

          var buffer = this.pictureBuffers[$buffer];

          if (!buffer) {
            buffer = this.pictureBuffers[$buffer] = toU8Array($buffer, width * height * 3 / 2);
          }

          var sliceInfo = this.pictureBuffers[$sliceInfo];

          if (!sliceInfo) {
            sliceInfo = this.pictureBuffers[$sliceInfo] = toU32Array($sliceInfo, 18);
          }

          var infos;

          if (this.infoAr.length) {
            infos = this.infoAr;
          }

          this.infoAr = [];
          /*if (this.options.rgb){
          no rgb in slice mode
          };*/

          infos[0].finishDecoding = nowValue();
          var sliceInfoAr = [];

          for (var i = 0; i < 20; ++i) {
            sliceInfoAr.push(sliceInfo[i]);
          }

          infos[0].sliceInfoAr = sliceInfoAr;
          this.onPictureDecoded(buffer, width, height, infos);
        }.bind(this);
      }

      var ModuleCallback = getModule.apply(fakeWindow, [function () {}, onPicFun]);
      var MAX_STREAM_BUFFER_LENGTH = 1024 * 1024;
      var instance = this;

      this.onPictureDecoded = function (buffer, width, height, infos) {};

      this.onDecoderReady = function () {};

      var bufferedCalls = [];

      this.decode = function decode(typedAr, parInfo, copyDoneFun) {
        bufferedCalls.push([typedAr, parInfo, copyDoneFun]);
      };

      ModuleCallback(function (Module) {
        var HEAP8 = Module.HEAP8;
        var HEAPU8 = Module.HEAPU8;
        var HEAP16 = Module.HEAP16;
        var HEAP32 = Module.HEAP32; // from old constructor

        Module._broadwayInit();
        /**
         * Creates a typed array from a HEAP8 pointer.
         */


        toU8Array = function toU8Array(ptr, length) {
          return HEAPU8.subarray(ptr, ptr + length);
        };

        toU32Array = function toU32Array(ptr, length) {
          //var tmp = HEAPU8.subarray(ptr, ptr + (length * 4));
          return new Uint32Array(HEAPU8.buffer, ptr, length);
        };

        instance.streamBuffer = toU8Array(Module._broadwayCreateStream(MAX_STREAM_BUFFER_LENGTH), MAX_STREAM_BUFFER_LENGTH);
        instance.pictureBuffers = {}; // collect extra infos that are provided with the nal units

        instance.infoAr = [];
        /**
         * Decodes a stream buffer. This may be one single (unframed) NAL unit without the
         * start code, or a sequence of NAL units with framing start code prefixes. This
         * function overwrites stream buffer allocated by the codec with the supplied buffer.
         */

        var sliceNum = 0;

        if (instance.options.sliceMode) {
          sliceNum = instance.options.sliceNum;

          instance.decode = function decode(typedAr, parInfo, copyDoneFun) {
            instance.infoAr.push(parInfo);
            parInfo.startDecoding = nowValue();
            var nals = parInfo.nals;
            var i;

            if (!nals) {
              nals = [];
              parInfo.nals = nals;
              var l = typedAr.length;
              var foundSomething = false;
              var lastFound = 0;
              var lastStart = 0;

              for (i = 0; i < l; ++i) {
                if (typedAr[i] === 1) {
                  if (typedAr[i - 1] === 0 && typedAr[i - 2] === 0) {
                    var startPos = i - 2;

                    if (typedAr[i - 3] === 0) {
                      startPos = i - 3;
                    } // its a nal;


                    if (foundSomething) {
                      nals.push({
                        offset: lastFound,
                        end: startPos,
                        type: typedAr[lastStart] & 31
                      });
                    }

                    lastFound = startPos;
                    lastStart = startPos + 3;

                    if (typedAr[i - 3] === 0) {
                      lastStart = startPos + 4;
                    }

                    foundSomething = true;
                  }
                }
              }

              if (foundSomething) {
                nals.push({
                  offset: lastFound,
                  end: i,
                  type: typedAr[lastStart] & 31
                });
              }
            }

            var currentSlice = 0;
            var playAr;
            var offset = 0;

            for (i = 0; i < nals.length; ++i) {
              if (nals[i].type === 1 || nals[i].type === 5) {
                if (currentSlice === sliceNum) {
                  playAr = typedAr.subarray(nals[i].offset, nals[i].end);
                  instance.streamBuffer[offset] = 0;
                  offset += 1;
                  instance.streamBuffer.set(playAr, offset);
                  offset += playAr.length;
                }

                currentSlice += 1;
              } else {
                playAr = typedAr.subarray(nals[i].offset, nals[i].end);
                instance.streamBuffer[offset] = 0;
                offset += 1;
                instance.streamBuffer.set(playAr, offset);
                offset += playAr.length;

                Module._broadwayPlayStream(offset);

                offset = 0;
              }
            }

            copyDoneFun();

            Module._broadwayPlayStream(offset);
          };
        } else {
          instance.decode = function decode(typedAr, parInfo) {
            // console.info("Decoding: " + buffer.length);
            // collect infos
            if (parInfo) {
              instance.infoAr.push(parInfo);
              parInfo.startDecoding = nowValue();
            }

            instance.streamBuffer.set(typedAr);

            Module._broadwayPlayStream(typedAr.length);
          };
        }

        if (bufferedCalls.length) {
          var bi = 0;

          for (bi = 0; bi < bufferedCalls.length; ++bi) {
            instance.decode(bufferedCalls[bi][0], bufferedCalls[bi][1], bufferedCalls[bi][2]);
          }

          bufferedCalls = [];
        }

        instance.onDecoderReady(instance);
      });
    };

    Decoder.prototype = {};
    /*
    asm.js implementation of a yuv to rgb convertor
    provided by @soliton4
     based on 
    http://www.wordsaretoys.com/2013/10/18/making-yuv-conversion-a-little-faster/
    */
    // factory to create asm.js yuv -> rgb convertor for a given resolution

    var asmInstances = {};

    var getAsm = function getAsm(parWidth, parHeight) {
      var idStr = '' + parWidth + 'x' + parHeight;

      if (asmInstances[idStr]) {
        return asmInstances[idStr];
      }

      var lumaSize = parWidth * parHeight;
      var chromaSize = (lumaSize | 0) >> 2;
      var inpSize = lumaSize + chromaSize + chromaSize;
      var outSize = parWidth * parHeight * 4;
      var cacheSize = Math.pow(2, 24) * 4;
      var size = inpSize + outSize + cacheSize;
      var chunkSize = Math.pow(2, 24);
      var heapSize = chunkSize;

      while (heapSize < size) {
        heapSize += chunkSize;
      }

      var heap = new ArrayBuffer(heapSize);
      var res = asmFactory(global, {}, heap);
      res.init(parWidth, parHeight);
      asmInstances[idStr] = res;
      res.heap = heap;
      res.out = new Uint8Array(heap, 0, outSize);
      res.inp = new Uint8Array(heap, outSize, inpSize);
      res.outSize = outSize;
      return res;
    };

    function asmFactory(stdlib, foreign, heap) {
      'use asm';

      var imul = stdlib.Math.imul;
      var min = stdlib.Math.min;
      var max = stdlib.Math.max;
      var pow = stdlib.Math.pow;
      var out = new stdlib.Uint8Array(heap);
      var out32 = new stdlib.Uint32Array(heap);
      var inp = new stdlib.Uint8Array(heap);
      var mem = new stdlib.Uint8Array(heap);
      var mem32 = new stdlib.Uint32Array(heap); // for double algo

      /*var vt = 1.370705;
      var gt = 0.698001;
      var gt2 = 0.337633;
      var bt = 1.732446;*/

      var width = 0;
      var height = 0;
      var lumaSize = 0;
      var chromaSize = 0;
      var inpSize = 0;
      var outSize = 0;
      var inpStart = 0;
      var outStart = 0;
      var widthFour = 0;
      var cacheStart = 0;

      function init(parWidth, parHeight) {
        parWidth = parWidth | 0;
        parHeight = parHeight | 0;
        var i = 0;
        var s = 0;
        width = parWidth;
        widthFour = imul(parWidth, 4) | 0;
        height = parHeight;
        lumaSize = imul(width | 0, height | 0) | 0;
        chromaSize = (lumaSize | 0) >> 2;
        outSize = imul(imul(width, height) | 0, 4) | 0;
        inpSize = lumaSize + chromaSize | 0 + chromaSize | 0;
        outStart = 0;
        inpStart = outStart + outSize | 0;
        cacheStart = inpStart + inpSize | 0; // initializing memory (to be on the safe side)

        s = ~~+pow(+2, +24);
        s = imul(s, 4) | 0;

        for (i = 0 | 0; (i | 0) < (s | 0) | 0; i = i + 4 | 0) {
          mem32[(cacheStart + i | 0) >> 2] = 0;
        }
      }

      function doit() {
        var ystart = 0;
        var ustart = 0;
        var vstart = 0;
        var y = 0;
        var yn = 0;
        var u = 0;
        var v = 0;
        var o = 0;
        var line = 0;
        var col = 0;
        var ostart = 0;
        var cacheAdr = 0;
        ostart = outStart | 0;
        ystart = inpStart | 0;
        ustart = ystart + lumaSize | 0 | 0;
        vstart = ustart + chromaSize | 0;

        for (line = 0; (line | 0) < (height | 0); line = line + 2 | 0) {

          for (col = 0; (col | 0) < (width | 0); col = col + 2 | 0) {
            y = inp[ystart >> 0] | 0;
            yn = inp[(ystart + width | 0) >> 0] | 0;
            u = inp[ustart >> 0] | 0;
            v = inp[vstart >> 0] | 0;
            cacheAdr = ((y << 16 | 0) + (u << 8 | 0) | 0) + v | 0;
            o = mem32[(cacheStart + cacheAdr | 0) >> 2] | 0;

            if (o) ; else {
              o = yuv2rgbcalc(y, u, v) | 0;
              mem32[(cacheStart + cacheAdr | 0) >> 2] = o | 0;
            }

            mem32[ostart >> 2] = o;
            cacheAdr = ((yn << 16 | 0) + (u << 8 | 0) | 0) + v | 0;
            o = mem32[(cacheStart + cacheAdr | 0) >> 2] | 0;

            if (o) ; else {
              o = yuv2rgbcalc(yn, u, v) | 0;
              mem32[(cacheStart + cacheAdr | 0) >> 2] = o | 0;
            }

            mem32[(ostart + widthFour | 0) >> 2] = o; //yuv2rgb5(y, u, v, ostart);
            //yuv2rgb5(yn, u, v, (ostart + widthFour)|0);

            ostart = ostart + 4 | 0; // next step only for y. u and v stay the same

            ystart = ystart + 1 | 0;
            y = inp[ystart >> 0] | 0;
            yn = inp[(ystart + width | 0) >> 0] | 0; //yuv2rgb5(y, u, v, ostart);

            cacheAdr = ((y << 16 | 0) + (u << 8 | 0) | 0) + v | 0;
            o = mem32[(cacheStart + cacheAdr | 0) >> 2] | 0;

            if (o) ; else {
              o = yuv2rgbcalc(y, u, v) | 0;
              mem32[(cacheStart + cacheAdr | 0) >> 2] = o | 0;
            }

            mem32[ostart >> 2] = o; //yuv2rgb5(yn, u, v, (ostart + widthFour)|0);

            cacheAdr = ((yn << 16 | 0) + (u << 8 | 0) | 0) + v | 0;
            o = mem32[(cacheStart + cacheAdr | 0) >> 2] | 0;

            if (o) ; else {
              o = yuv2rgbcalc(yn, u, v) | 0;
              mem32[(cacheStart + cacheAdr | 0) >> 2] = o | 0;
            }

            mem32[(ostart + widthFour | 0) >> 2] = o;
            ostart = ostart + 4 | 0; //all positions inc 1

            ystart = ystart + 1 | 0;
            ustart = ustart + 1 | 0;
            vstart = vstart + 1 | 0;
          }

          ostart = ostart + widthFour | 0;
          ystart = ystart + width | 0;
        }
      }

      function yuv2rgbcalc(y, u, v) {
        y = y | 0;
        u = u | 0;
        v = v | 0;
        var r = 0;
        var g = 0;
        var b = 0;
        var o = 0;
        var a0 = 0;
        var a1 = 0;
        var a2 = 0;
        var a3 = 0;
        var a4 = 0;
        a0 = imul(1192, y - 16 | 0) | 0;
        a1 = imul(1634, v - 128 | 0) | 0;
        a2 = imul(832, v - 128 | 0) | 0;
        a3 = imul(400, u - 128 | 0) | 0;
        a4 = imul(2066, u - 128 | 0) | 0;
        r = (a0 + a1 | 0) >> 10 | 0;
        g = ((a0 - a2 | 0) - a3 | 0) >> 10 | 0;
        b = (a0 + a4 | 0) >> 10 | 0;

        if ((r & 255 | 0) != (r | 0) | 0) {
          r = min(255, max(0, r | 0) | 0) | 0;
        }

        if ((g & 255 | 0) != (g | 0) | 0) {
          g = min(255, max(0, g | 0) | 0) | 0;
        }

        if ((b & 255 | 0) != (b | 0) | 0) {
          b = min(255, max(0, b | 0) | 0) | 0;
        }

        o = 255;
        o = o << 8 | 0;
        o = o + b | 0;
        o = o << 8 | 0;
        o = o + g | 0;
        o = o << 8 | 0;
        o = o + r | 0;
        return o | 0;
      }

      return {
        init: init,
        doit: doit
      };
    }
    /*
    potential worker initialization
    */


    if (typeof self != 'undefined') {
      var isWorker = false;
      var decoder;
      var reuseMemory = false;
      var sliceMode = false;
      var sliceNum = 0;
      var sliceCnt = 0;
      var lastSliceNum = 0;
      var sliceInfoAr;
      var lastBuf;
      var awaiting = 0;
      var pile = [];
      var startDecoding;
      var finishDecoding;
      var timeDecoding;
      var memAr = [];

      var getMem = function getMem(length) {
        if (memAr.length) {
          var u = memAr.shift();

          while (u && u.byteLength !== length) {
            u = memAr.shift();
          }

          if (u) {
            return u;
          }
        }

        return new ArrayBuffer(length);
      };

      var copySlice = function copySlice(source, target, infoAr, width, height) {

        var copy16 = function copy16(parBegin, parEnd) {
          var i = 0;

          for (i = 0; i < 16; ++i) {
            var begin = parBegin + width * i;
            var end = parEnd + width * i;
            target.set(source.subarray(begin, end), begin);
          }
        };

        var copy8 = function copy8(parBegin, parEnd) {
          var i = 0;

          for (i = 0; i < 8; ++i) {
            var begin = parBegin + width / 2 * i;
            var end = parEnd + width / 2 * i;
            target.set(source.subarray(begin, end), begin);
          }
        };

        var copyChunk = function copyChunk(begin, end) {
          target.set(source.subarray(begin, end), begin);
        };

        var begin = infoAr[0];
        var end = infoAr[1];

        if (end > 0) {
          copy16(begin, end);
          copy8(infoAr[2], infoAr[3]);
          copy8(infoAr[4], infoAr[5]);
        }

        begin = infoAr[6];
        end = infoAr[7];

        if (end > 0) {
          copy16(begin, end);
          copy8(infoAr[8], infoAr[9]);
          copy8(infoAr[10], infoAr[11]);
        }

        begin = infoAr[12];
        end = infoAr[15];

        if (end > 0) {
          copyChunk(begin, end);
          copyChunk(infoAr[13], infoAr[16]);
          copyChunk(infoAr[14], infoAr[17]);
        }
      };

      var setSliceCnt = function setSliceCnt(parSliceCnt) {
        sliceCnt = parSliceCnt;
        lastSliceNum = sliceCnt - 1;
      };

      self.addEventListener('message', function (e) {
        if (isWorker) {
          if (reuseMemory) {
            if (e.data.reuse) {
              memAr.push(e.data.reuse);
            }
          }

          if (e.data.buf) {
            if (sliceMode && awaiting !== 0) {
              pile.push(e.data);
            } else {
              decoder.decode(new Uint8Array(e.data.buf, e.data.offset || 0, e.data.length), e.data.info, function () {
                if (sliceMode && sliceNum !== lastSliceNum) {
                  postMessage(e.data, [e.data.buf]);
                }
              });
            }

            return;
          }

          if (e.data.slice) {
            // update ref pic
            var copyStart = nowValue();
            copySlice(new Uint8Array(e.data.slice), lastBuf, e.data.infos[0].sliceInfoAr, e.data.width, e.data.height); // is it the one? then we need to update it

            if (e.data.theOne) {
              copySlice(lastBuf, new Uint8Array(e.data.slice), sliceInfoAr, e.data.width, e.data.height);

              if (timeDecoding > e.data.infos[0].timeDecoding) {
                e.data.infos[0].timeDecoding = timeDecoding;
              }

              e.data.infos[0].timeCopy += nowValue() - copyStart;
            } // move on


            postMessage(e.data, [e.data.slice]); // next frame in the pipe?

            awaiting -= 1;

            if (awaiting === 0 && pile.length) {
              var data = pile.shift();
              decoder.decode(new Uint8Array(data.buf, data.offset || 0, data.length), data.info, function () {
                if (sliceMode && sliceNum !== lastSliceNum) {
                  postMessage(data, [data.buf]);
                }
              });
            }

            return;
          }

          if (e.data.setSliceCnt) {
            setSliceCnt(e.data.sliceCnt);
            return;
          }
        } else {
          if (e.data && e.data.type === 'Broadway.js - Worker init') {
            isWorker = true;
            decoder = new Decoder(e.data.options);

            if (e.data.options.sliceMode) {
              reuseMemory = true;
              sliceMode = true;
              sliceNum = e.data.options.sliceNum;
              setSliceCnt(e.data.options.sliceCnt);

              decoder.onPictureDecoded = function (buffer, width, height, infos) {
                // buffer needs to be copied because we give up ownership
                var copyU8 = new Uint8Array(getMem(buffer.length));
                copySlice(buffer, copyU8, infos[0].sliceInfoAr, width, height);
                startDecoding = infos[0].startDecoding;
                finishDecoding = infos[0].finishDecoding;
                timeDecoding = finishDecoding - startDecoding;
                infos[0].timeDecoding = timeDecoding;
                infos[0].timeCopy = 0;
                postMessage({
                  slice: copyU8.buffer,
                  sliceNum: sliceNum,
                  width: width,
                  height: height,
                  infos: infos
                }, [copyU8.buffer]); // 2nd parameter is used to indicate transfer of ownership

                awaiting = sliceCnt - 1;
                lastBuf = buffer;
                sliceInfoAr = infos[0].sliceInfoAr;
              };
            } else if (e.data.options.reuseMemory) {
              reuseMemory = true;

              decoder.onPictureDecoded = function (buffer, width, height, infos) {
                // buffer needs to be copied because we give up ownership
                var copyU8 = new Uint8Array(getMem(buffer.length));
                copyU8.set(buffer, 0, buffer.length);
                postMessage({
                  buf: copyU8.buffer,
                  length: buffer.length,
                  width: width,
                  height: height,
                  infos: infos
                }, [copyU8.buffer]); // 2nd parameter is used to indicate transfer of ownership
              };
            } else {
              decoder.onPictureDecoded = function (buffer, width, height, infos) {
                if (buffer) {
                  buffer = new Uint8Array(buffer);
                } // buffer needs to be copied because we give up ownership


                var copyU8 = new Uint8Array(buffer.length);
                copyU8.set(buffer, 0, buffer.length);
                postMessage({
                  buf: copyU8.buffer,
                  length: buffer.length,
                  width: width,
                  height: height,
                  infos: infos
                }, [copyU8.buffer]); // 2nd parameter is used to indicate transfer of ownership
              };
            }

            postMessage({
              consoleLog: 'broadway worker initialized'
            });
          }
        }
      }, false);
    }

    Decoder.nowValue = nowValue;
    return Decoder;
  })();

  function YUVCanvas(parOptions) {
    parOptions = parOptions || {};
    this.canvasElement = parOptions.canvas || document.createElement('canvas');
    this.contextOptions = parOptions.contextOptions;
    this.type = parOptions.type || 'yuv420';
    this.customYUV444 = parOptions.customYUV444;
    this.conversionType = parOptions.conversionType || 'rec601';
    this.width = parOptions.width || 640;
    this.height = parOptions.height || 320;
    this.animationTime = parOptions.animationTime || 0;
    this.canvasElement.width = this.width;
    this.canvasElement.height = this.height;
    this.initContextGL();

    if (this.contextGL) {
      this.initProgram();
      this.initBuffers();
      this.initTextures();
    }
    /**
     * Draw the next output picture using WebGL
     */


    if (this.type === 'yuv420') {
      this.drawNextOuptutPictureGL = function (par) {
        var gl = this.contextGL;
        var texturePosBuffer = this.texturePosBuffer;
        var uTexturePosBuffer = this.uTexturePosBuffer;
        var vTexturePosBuffer = this.vTexturePosBuffer;
        var yTextureRef = this.yTextureRef;
        var uTextureRef = this.uTextureRef;
        var vTextureRef = this.vTextureRef;
        var yData = par.yData;
        var uData = par.uData;
        var vData = par.vData;
        var width = this.width;
        var height = this.height;
        var yDataPerRow = par.yDataPerRow || width;
        var yRowCnt = par.yRowCnt || height;
        var uDataPerRow = par.uDataPerRow || width / 2;
        var uRowCnt = par.uRowCnt || height / 2;
        var vDataPerRow = par.vDataPerRow || uDataPerRow;
        var vRowCnt = par.vRowCnt || uRowCnt;
        gl.viewport(0, 0, width, height);
        var tTop = 0;
        var tLeft = 0;
        var tBottom = height / yRowCnt;
        var tRight = width / yDataPerRow;
        var texturePosValues = new Float32Array([tRight, tTop, tLeft, tTop, tRight, tBottom, tLeft, tBottom]);
        gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, texturePosValues, gl.DYNAMIC_DRAW);

        if (this.customYUV444) {
          tBottom = height / uRowCnt;
          tRight = width / uDataPerRow;
        } else {
          tBottom = height / 2 / uRowCnt;
          tRight = width / 2 / uDataPerRow;
        }

        var uTexturePosValues = new Float32Array([tRight, tTop, tLeft, tTop, tRight, tBottom, tLeft, tBottom]);
        gl.bindBuffer(gl.ARRAY_BUFFER, uTexturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, uTexturePosValues, gl.DYNAMIC_DRAW);

        if (this.customYUV444) {
          tBottom = height / vRowCnt;
          tRight = width / vDataPerRow;
        } else {
          tBottom = height / 2 / vRowCnt;
          tRight = width / 2 / vDataPerRow;
        }

        var vTexturePosValues = new Float32Array([tRight, tTop, tLeft, tTop, tRight, tBottom, tLeft, tBottom]);
        gl.bindBuffer(gl.ARRAY_BUFFER, vTexturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vTexturePosValues, gl.DYNAMIC_DRAW);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, yTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, yDataPerRow, yRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, yData);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, uTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, uDataPerRow, uRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uData);
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, vTextureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, vDataPerRow, vRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, vData);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };
    } else if (this.type === 'yuv422') {
      this.drawNextOuptutPictureGL = function (par) {
        var gl = this.contextGL;
        var texturePosBuffer = this.texturePosBuffer;
        var textureRef = this.textureRef;
        var data = par.data;
        var width = this.width;
        var height = this.height;
        var dataPerRow = par.dataPerRow || width * 2;
        var rowCnt = par.rowCnt || height;
        gl.viewport(0, 0, width, height);
        var tTop = 0;
        var tLeft = 0;
        var tBottom = height / rowCnt;
        var tRight = width / (dataPerRow / 2);
        var texturePosValues = new Float32Array([tRight, tTop, tLeft, tTop, tRight, tBottom, tLeft, tBottom]);
        gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, texturePosValues, gl.DYNAMIC_DRAW);
        gl.uniform2f(gl.getUniformLocation(this.shaderProgram, 'resolution'), dataPerRow, height);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureRef);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, dataPerRow, rowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, data);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };
    }
  }
  /**
   * Returns true if the canvas supports WebGL
   */


  YUVCanvas.prototype.isWebGL = function () {
    return this.contextGL;
  };
  /**
   * Create the GL context from the canvas element
   */


  YUVCanvas.prototype.initContextGL = function () {
    var canvas = this.canvasElement;
    var gl = null;
    var validContextNames = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
    var nameIndex = 0;

    while (!gl && nameIndex < validContextNames.length) {
      var contextName = validContextNames[nameIndex];

      try {
        if (this.contextOptions) {
          gl = canvas.getContext(contextName, this.contextOptions);
        } else {
          gl = canvas.getContext(contextName);
        }
      } catch (e) {
        gl = null;
      }

      if (!gl || typeof gl.getParameter !== 'function') {
        gl = null;
      }

      ++nameIndex;
    }

    this.contextGL = gl;
  };
  /**
   * Initialize GL shader program
   */


  YUVCanvas.prototype.initProgram = function () {
    var gl = this.contextGL; // vertex shader is the same for all types

    var vertexShaderScript;
    var fragmentShaderScript;

    if (this.type === 'yuv420') {
      vertexShaderScript = ['attribute vec4 vertexPos;', 'attribute vec4 texturePos;', 'attribute vec4 uTexturePos;', 'attribute vec4 vTexturePos;', 'varying vec2 textureCoord;', 'varying vec2 uTextureCoord;', 'varying vec2 vTextureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos.xy;', '  uTextureCoord = uTexturePos.xy;', '  vTextureCoord = vTexturePos.xy;', '}'].join('\n');
      fragmentShaderScript = ['precision highp float;', 'varying highp vec2 textureCoord;', 'varying highp vec2 uTextureCoord;', 'varying highp vec2 vTextureCoord;', 'uniform sampler2D ySampler;', 'uniform sampler2D uSampler;', 'uniform sampler2D vSampler;', 'uniform mat4 YUV2RGB;', 'void main(void) {', '  highp float y = texture2D(ySampler,  textureCoord).r;', '  highp float u = texture2D(uSampler,  uTextureCoord).r;', '  highp float v = texture2D(vSampler,  vTextureCoord).r;', '  gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;', '}'].join('\n');
    } else if (this.type === 'yuv422') {
      vertexShaderScript = ['attribute vec4 vertexPos;', 'attribute vec4 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos.xy;', '}'].join('\n');
      fragmentShaderScript = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'uniform highp vec2 resolution;', 'uniform mat4 YUV2RGB;', 'void main(void) {', '  highp float texPixX = 1.0 / resolution.x;', '  highp float logPixX = 2.0 / resolution.x;', // half the resolution of the texture
      '  highp float logHalfPixX = 4.0 / resolution.x;', // half of the logical resolution so every 4th pixel
      '  highp float steps = floor(textureCoord.x / logPixX);', '  highp float uvSteps = floor(textureCoord.x / logHalfPixX);', '  highp float y = texture2D(sampler, vec2((logPixX * steps) + texPixX, textureCoord.y)).r;', '  highp float u = texture2D(sampler, vec2((logHalfPixX * uvSteps), textureCoord.y)).r;', '  highp float v = texture2D(sampler, vec2((logHalfPixX * uvSteps) + texPixX + texPixX, textureCoord.y)).r;', //'  highp float y = texture2D(sampler,  textureCoord).r;',
      //'  gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;',
      '  gl_FragColor = vec4(y, u, v, 1.0) * YUV2RGB;', '}'].join('\n');
    }

    var YUV2RGB = [];

    if (this.conversionType == 'rec709') {
      // ITU-T Rec. 709
      YUV2RGB = [1.16438, 0.0, 1.79274, -0.97295, 1.16438, -0.21325, -0.53291, 0.30148, 1.16438, 2.1124, 0.0, -1.1334, 0, 0, 0, 1];
    } else {
      // assume ITU-T Rec. 601
      YUV2RGB = [1.16438, 0.0, 1.59603, -0.87079, 1.16438, -0.39176, -0.81297, 0.52959, 1.16438, 2.01723, 0.0, -1.08139, 0, 0, 0, 1];
    }

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderScript);
    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.log('Vertex shader failed to compile: ' + gl.getShaderInfoLog(vertexShader));
    }

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderScript);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.log('Fragment shader failed to compile: ' + gl.getShaderInfoLog(fragmentShader));
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.log('Program failed to compile: ' + gl.getProgramInfoLog(program));
    }

    gl.useProgram(program);
    var YUV2RGBRef = gl.getUniformLocation(program, 'YUV2RGB');
    gl.uniformMatrix4fv(YUV2RGBRef, false, YUV2RGB);
    this.shaderProgram = program;
  };
  /**
   * Initialize vertex buffers and attach to shader program
   */


  YUVCanvas.prototype.initBuffers = function () {
    var gl = this.contextGL;
    var program = this.shaderProgram;
    var vertexPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]), gl.STATIC_DRAW);
    var vertexPosRef = gl.getAttribLocation(program, 'vertexPos');
    gl.enableVertexAttribArray(vertexPosRef);
    gl.vertexAttribPointer(vertexPosRef, 2, gl.FLOAT, false, 0, 0);

    if (this.animationTime) {
      var animationTime = this.animationTime;
      var timePassed = 0;
      var stepTime = 15;

      var aniFun = function aniFun() {
        timePassed += stepTime;
        var mul = 1 * timePassed / animationTime;

        if (timePassed >= animationTime) {
          mul = 1;
        } else {
          setTimeout(aniFun, stepTime);
        }

        var neg = -1 * mul;
        var pos = 1 * mul;
        var vertexPosBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([pos, pos, neg, pos, pos, neg, neg, neg]), gl.STATIC_DRAW);
        var vertexPosRef = gl.getAttribLocation(program, 'vertexPos');
        gl.enableVertexAttribArray(vertexPosRef);
        gl.vertexAttribPointer(vertexPosRef, 2, gl.FLOAT, false, 0, 0);

        try {
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        } catch (e) {}
      };

      aniFun();
    }

    var texturePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);
    var texturePosRef = gl.getAttribLocation(program, 'texturePos');
    gl.enableVertexAttribArray(texturePosRef);
    gl.vertexAttribPointer(texturePosRef, 2, gl.FLOAT, false, 0, 0);
    this.texturePosBuffer = texturePosBuffer;

    if (this.type === 'yuv420') {
      var uTexturePosBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, uTexturePosBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);
      var uTexturePosRef = gl.getAttribLocation(program, 'uTexturePos');
      gl.enableVertexAttribArray(uTexturePosRef);
      gl.vertexAttribPointer(uTexturePosRef, 2, gl.FLOAT, false, 0, 0);
      this.uTexturePosBuffer = uTexturePosBuffer;
      var vTexturePosBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vTexturePosBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);
      var vTexturePosRef = gl.getAttribLocation(program, 'vTexturePos');
      gl.enableVertexAttribArray(vTexturePosRef);
      gl.vertexAttribPointer(vTexturePosRef, 2, gl.FLOAT, false, 0, 0);
      this.vTexturePosBuffer = vTexturePosBuffer;
    }
  };
  /**
   * Initialize GL textures and attach to shader program
   */


  YUVCanvas.prototype.initTextures = function () {
    var gl = this.contextGL;
    var program = this.shaderProgram;

    if (this.type === 'yuv420') {
      var yTextureRef = this.initTexture();
      var ySamplerRef = gl.getUniformLocation(program, 'ySampler');
      gl.uniform1i(ySamplerRef, 0);
      this.yTextureRef = yTextureRef;
      var uTextureRef = this.initTexture();
      var uSamplerRef = gl.getUniformLocation(program, 'uSampler');
      gl.uniform1i(uSamplerRef, 1);
      this.uTextureRef = uTextureRef;
      var vTextureRef = this.initTexture();
      var vSamplerRef = gl.getUniformLocation(program, 'vSampler');
      gl.uniform1i(vSamplerRef, 2);
      this.vTextureRef = vTextureRef;
    } else if (this.type === 'yuv422') {
      // only one texture for 422
      var textureRef = this.initTexture();
      var samplerRef = gl.getUniformLocation(program, 'sampler');
      gl.uniform1i(samplerRef, 0);
      this.textureRef = textureRef;
    }
  };
  /**
   * Create and configure a single texture
   */


  YUVCanvas.prototype.initTexture = function () {
    var gl = this.contextGL;
    var textureRef = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textureRef);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return textureRef;
  };
  /**
   * Draw picture data to the canvas.
   * If this object is using WebGL, the data must be an I420 formatted ArrayBuffer,
   * Otherwise, data must be an RGBA formatted ArrayBuffer.
   */


  YUVCanvas.prototype.drawNextOutputPicture = function (width, height, croppingParams, data) {
    var gl = this.contextGL;

    if (gl) {
      this.drawNextOuptutPictureGL(width, height, croppingParams, data);
    } else {
      this.drawNextOuptutPictureRGBA(width, height, croppingParams, data);
    }
  };
  /**
   * Draw next output picture using ARGB data on a 2d canvas.
   */


  YUVCanvas.prototype.drawNextOuptutPictureRGBA = function (width, height, croppingParams, data) {
    var canvas = this.canvasElement;
    var croppingParams = null;
    var argbData = data;
    var ctx = canvas.getContext('2d');
    var imageData = ctx.getImageData(0, 0, width, height);
    imageData.data.set(argbData);

    if (croppingParams === null) {
      ctx.putImageData(imageData, 0, 0);
    } else {
      ctx.putImageData(imageData, -croppingParams.left, -croppingParams.top, 0, 0, croppingParams.width, croppingParams.height);
    }
  };

  function player(Decoder, WebGLCanvas) {

    var nowValue = Decoder.nowValue;

    var Player = function Player(parOptions) {
      var self = this;
      this._config = parOptions || {};
      this.render = true;

      if (this._config.render === false) {
        this.render = false;
      }

      this.nowValue = nowValue;
      this._config.workerFile = this._config.workerFile || 'Decoder.js';

      if (this._config.preserveDrawingBuffer) {
        this._config.contextOptions = this._config.contextOptions || {};
        this._config.contextOptions.preserveDrawingBuffer = true;
      }

      var webgl = 'auto';

      if (this._config.webgl === true) {
        webgl = true;
      } else if (this._config.webgl === false) {
        webgl = false;
      }

      if (webgl == 'auto') {
        webgl = true;

        try {
          if (!window.WebGLRenderingContext) {
            // the browser doesn't even know what WebGL is
            webgl = false;
          } else {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('webgl');

            if (!ctx) {
              // browser supports WebGL but initialization failed.
              webgl = false;
            }
          }
        } catch (e) {
          webgl = false;
        }
      }

      this.webgl = webgl; // choose functions

      if (this.webgl) {
        this.createCanvasObj = this.createCanvasWebGL;
        this.renderFrame = this.renderFrameWebGL;
      } else {
        this.createCanvasObj = this.createCanvasRGB;
        this.renderFrame = this.renderFrameRGB;
      }

      var lastWidth;
      var lastHeight;

      var onPictureDecoded = function onPictureDecoded(buffer, width, height, infos) {
        self.onPictureDecoded(buffer, width, height, infos);
        var startTime = nowValue();

        if (!buffer || !self.render) {
          return;
        }

        self.renderFrame({
          canvasObj: self.canvasObj,
          data: buffer,
          width: width,
          height: height
        });

        if (self.onRenderFrameComplete) {
          self.onRenderFrameComplete({
            data: buffer,
            width: width,
            height: height,
            infos: infos,
            canvasObj: self.canvasObj
          });
        }
      }; // provide size


      if (!this._config.size) {
        this._config.size = {};
      }

      this._config.size.width = this._config.size.width || 200;
      this._config.size.height = this._config.size.height || 200;

      if (this._config.useWorker) {
        var worker = new Worker(this._config.workerFile);
        this.worker = worker;
        worker.addEventListener('message', function (e) {
          var data = e.data;

          if (data.consoleLog) {
            console.log(data.consoleLog);
            return;
          }

          onPictureDecoded.call(self, new Uint8Array(data.buf, 0, data.length), data.width, data.height, data.infos);
        }, false);
        worker.postMessage({
          type: 'Broadway.js - Worker init',
          options: {
            rgb: !webgl,
            memsize: this.memsize,
            reuseMemory: this._config.reuseMemory ? true : false
          }
        });

        if (this._config.transferMemory) {
          this.decode = function (parData, parInfo) {
            // no copy
            // instead we are transfering the ownership of the buffer
            // dangerous!!!
            worker.postMessage({
              buf: parData.buffer,
              offset: parData.byteOffset,
              length: parData.length,
              info: parInfo
            }, [parData.buffer]); // Send data to our worker.
          };
        } else {
          this.decode = function (parData, parInfo) {
            // Copy the sample so that we only do a structured clone of the
            // region of interest
            var copyU8 = new Uint8Array(parData.length);
            copyU8.set(parData, 0, parData.length);
            worker.postMessage({
              buf: copyU8.buffer,
              offset: 0,
              length: parData.length,
              info: parInfo
            }, [copyU8.buffer]); // Send data to our worker.
          };
        }

        if (this._config.reuseMemory) {
          this.recycleMemory = function (parArray) {
            //this.beforeRecycle();
            worker.postMessage({
              reuse: parArray.buffer
            }, [parArray.buffer]); // Send data to our worker.
            //this.afterRecycle();
          };
        }
      } else {
        this.decoder = new Decoder({
          rgb: !webgl
        });
        this.decoder.onPictureDecoded = onPictureDecoded;

        this.decode = function (parData, parInfo) {
          self.decoder.decode(parData, parInfo);
        };
      }

      if (this.render) {
        this.canvasObj = this.createCanvasObj({
          contextOptions: this._config.contextOptions
        });
        this.canvas = this.canvasObj.canvas;
      }

      this.domNode = this.canvas;
      lastWidth = this._config.size.width;
      lastHeight = this._config.size.height;
    };

    Player.prototype = {
      onPictureDecoded: function onPictureDecoded(buffer, width, height, infos) {},
      // call when memory of decoded frames is not used anymore
      recycleMemory: function recycleMemory(buf) {},

      /*beforeRecycle: function(){},
      afterRecycle: function(){},*/
      // for both functions options is:
      //
      //  width
      //  height
      //  enableScreenshot
      //
      // returns a object that has a property canvas which is a html5 canvas
      createCanvasWebGL: function createCanvasWebGL(options) {
        var canvasObj = this._createBasicCanvasObj(options);

        canvasObj.contextOptions = options.contextOptions;
        return canvasObj;
      },
      createCanvasRGB: function createCanvasRGB(options) {
        var canvasObj = this._createBasicCanvasObj(options);

        return canvasObj;
      },
      // part that is the same for webGL and RGB
      _createBasicCanvasObj: function _createBasicCanvasObj(options) {
        options = options || {};
        var obj = {};
        var width = options.width;

        if (!width) {
          width = this._config.size.width;
        }

        var height = options.height;

        if (!height) {
          height = this._config.size.height;
        }

        obj.canvas = document.createElement('canvas');
        obj.canvas.width = width;
        obj.canvas.height = height;
        obj.canvas.style.backgroundColor = '#0D0E1B';
        return obj;
      },
      // options:
      //
      // canvas
      // data
      renderFrameWebGL: function renderFrameWebGL(options) {
        var canvasObj = options.canvasObj;
        var width = options.width || canvasObj.canvas.width;
        var height = options.height || canvasObj.canvas.height;

        if (canvasObj.canvas.width !== width || canvasObj.canvas.height !== height || !canvasObj.webGLCanvas) {
          canvasObj.canvas.width = width;
          canvasObj.canvas.height = height;
          canvasObj.webGLCanvas = new WebGLCanvas({
            canvas: canvasObj.canvas,
            contextOptions: canvasObj.contextOptions,
            width: width,
            height: height
          });
        }

        var ylen = width * height;
        var uvlen = width / 2 * (height / 2);
        canvasObj.webGLCanvas.drawNextOutputPicture({
          yData: options.data.subarray(0, ylen),
          uData: options.data.subarray(ylen, ylen + uvlen),
          vData: options.data.subarray(ylen + uvlen, ylen + uvlen + uvlen)
        });
        var self = this;
        self.recycleMemory(options.data);
      },
      renderFrameRGB: function renderFrameRGB(options) {
        var canvasObj = options.canvasObj;
        var width = options.width || canvasObj.canvas.width;
        var height = options.height || canvasObj.canvas.height;

        if (canvasObj.canvas.width !== width || canvasObj.canvas.height !== height) {
          canvasObj.canvas.width = width;
          canvasObj.canvas.height = height;
        }

        var ctx = canvasObj.ctx;
        var imgData = canvasObj.imgData;

        if (!ctx) {
          canvasObj.ctx = canvasObj.canvas.getContext('2d');
          ctx = canvasObj.ctx;
          canvasObj.imgData = ctx.createImageData(width, height);
          imgData = canvasObj.imgData;
        }

        imgData.data.set(options.data);
        ctx.putImageData(imgData, 0, 0);
        var self = this;
        self.recycleMemory(options.data);
      }
    };
    return Player;
  }

  var BroadwayPlayer = player(Decoder, YUVCanvas);

  var Player = function Player(flv) {
    var _this = this;

    classCallCheck(this, Player);

    var _flv$options = flv.options,
        element = _flv$options.element,
        width = _flv$options.width,
        height = _flv$options.height;
    this.broadwayPlayer = new BroadwayPlayer({
      useWorker: false,
      reuseMemory: true,
      webgl: true,
      size: {
        width: width,
        height: height
      }
    });
    this.canvas = this.broadwayPlayer.canvas;
    element.appendChild(this.canvas);
    flv.on('videoTrack', function (videoTrack) {
      _this.broadwayPlayer.decode(videoTrack);
    });
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
