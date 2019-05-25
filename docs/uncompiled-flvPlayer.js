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
  function errorHandle(condition, msg) {
    if (!condition) {
      throw new FlvPlayerError(msg);
    }

    return condition;
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

  function optionValidator (flv) {
    var _flv$options = flv.options,
        container = _flv$options.container,
        url = _flv$options.url;
    errorHandle(container instanceof HTMLDivElement, 'The \'container\' option is not a \'HTMLDivElement\'');
    errorHandle(flv.constructor.instances.every(function (item) {
      return item.options.container !== container;
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
        throw new FlvPlayerError(msg);
      }
    };
  };

  var Player = function Player(flv) {
    var _this = this;

    classCallCheck(this, Player);

    this.flv = flv;
    var options = flv.options;
    options.container.classList.add('flv-player-container');
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('flv-player-canvas');
    this.canvas.width = options.width;
    this.canvas.height = options.height;
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, options.width, options.height);
    options.container.appendChild(this.canvas);
    flv.on('scripMeta', function (_ref) {
      var amf2 = _ref.amf2;
      var _amf2$metaData = amf2.metaData,
          width = _amf2$metaData.width,
          height = _amf2$metaData.height;
      flv.debug.error(width && height, '[amf2]: Missing length or height');
      _this.canvas.width = width;
      _this.canvas.height = height;
      _this.context = _this.canvas.getContext('2d');
      _this.context.fillStyle = '#000';

      _this.context.fillRect(0, 0, width, height);
    });
    this.videoFrames = [];
    flv.on('videoFrame', function (videoFrame) {
      _this.videoFrames.push(videoFrame);
    });
  };

  var nalStart = new Uint8Array([0x00, 0x00, 0x00, 0x01]);

  var Demuxer =
  /*#__PURE__*/
  function () {
    function Demuxer(flv) {
      var _this = this;

      classCallCheck(this, Demuxer);

      this.flv = flv;
      var options = flv.options,
          debug = flv.debug;
      this.scripMeta = null;
      this.AVCDecoderConfigurationRecord = null;
      this.AudioSpecificConfig = null;
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

    createClass(Demuxer, [{
      key: "parse",
      value: function parse() {
        var debug = this.flv.debug;

        if (!this.header && this.readable(13)) {
          var header = Object.create(null);
          header.signature = readString(this.read(3));
          header.version = this.read(1)[0];
          debug.error(header.signature === 'FLV' && header.version === 1, 'FLV header not found');
          header.flags = this.read(1)[0];
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
            tag.tagType = this.read(1)[0];
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

          switch (tag.tagType) {
            case 18:
              this.demuxerScripTag(tag);
              break;

            case 9:
              this.demuxerVideoTag(tag);
              break;

            case 8:
              this.demuxerAudioTag(tag);
              break;

            default:
              debug.error(false, "unknown tag type: ".concat(tag.tagType));
              break;
          }
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
    }, {
      key: "demuxerScripTag",
      value: function demuxerScripTag(tag) {
        var debug = this.flv.debug;
        var readScripTag = readBuffer(tag.body);
        var amf1 = Object.create(null);
        var amf2 = Object.create(null);
        amf1.type = readScripTag(1)[0];
        debug.error(amf1.type === 2, "AMF: [amf1] type expect 2, but got ".concat(amf1.type));
        amf1.size = readBufferSum(readScripTag(2));
        amf1.string = readString(readScripTag(amf1.size));
        amf2.type = readScripTag(1)[0];
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
        this.scripMeta = {
          amf1: amf1,
          amf2: amf2
        };
        this.flv.emit('scripMeta', this.scripMeta);
        debug.log('scrip-meta', this.scripMeta);
      }
    }, {
      key: "demuxerVideoTag",
      value: function demuxerVideoTag(tag) {
        var debug = this.flv.debug;
        debug.error(tag.body.length > 1, 'Invalid video packet');
        var header = {
          frameType: (tag.body[0] & 0xf0) >> 4,
          codecID: tag.body[0] & 0x0f
        };
        debug.error(header.codecID === 7, "[videoTrack] Unsupported codec in video frame: ".concat(header.codecID));
        var packet = tag.body.slice(1, 5);
        debug.error(packet.length >= 4, '[H264] Invalid AVC packet, missing AVCPacketType or/and CompositionTime');
        var view = new DataView(packet.buffer);
        var AVCPacketType = view.getUint8(0);
        var CompositionTime = (view.getUint32(0) & 0x00ffffff) << 8 >> 8;
        var pts = CompositionTime + tag.timestamp;
        var packetData = tag.body.subarray(5);

        if (AVCPacketType === 0) {
          debug.warn(!this.AVCDecoderConfigurationRecord, '[h264] Find another one AVCDecoderConfigurationRecord');
          debug.error(packetData.length >= 7, '[H264] AVCDecoderConfigurationRecord parse length is not enough');
          var readDcr = readBuffer(packetData);
          var result = {};
          result.configurationVersion = readDcr(1)[0];
          debug.error(result.configurationVersion === 1, "[H264] Invalid configurationVersion: ".concat(result.configurationVersion));
          result.AVCProfileIndication = readDcr(1)[0];
          debug.error(result.AVCProfileIndication !== 0, "[H264] Invalid AVCProfileIndication: ".concat(result.AVCProfileIndication));
          result.profile_compatibility = readDcr(1)[0];
          result.AVCLevelIndication = readDcr(1)[0];
          result.lengthSizeMinusOne = (readDcr(1)[0] & 3) + 1;
          debug.error(result.lengthSizeMinusOne === 4 || result.lengthSizeMinusOne !== 3, "[H264] Invalid lengthSizeMinusOne: ".concat(result.lengthSizeMinusOne));
          result.numOfSequenceParameterSets = readDcr(1)[0] & 31;
          debug.error(result.numOfSequenceParameterSets !== 0, "[H264] Invalid numOfSequenceParameterSets: ".concat(result.numOfSequenceParameterSets));
          debug.warn(result.numOfSequenceParameterSets === 1, "[H264] Strange numOfSequenceParameterSets: ".concat(result.numOfSequenceParameterSets));

          for (var index = 0; index < result.numOfSequenceParameterSets; index += 1) {
            result.sequenceParameterSetLength = readBufferSum(readDcr(2));

            if (result.sequenceParameterSetLength > 0) {
              var SPS = readDcr(result.sequenceParameterSetLength);
              this.flv.emit('videoData', mergeBuffer(nalStart, SPS));
            }
          }

          result.numOfPictureParameterSets = readDcr(1)[0];
          debug.error(result.numOfPictureParameterSets !== 0, "[H264] Invalid numOfPictureParameterSets: ".concat(result.numOfPictureParameterSets));
          debug.warn(result.numOfPictureParameterSets === 1, "[H264] Strange numOfPictureParameterSets: ".concat(result.numOfPictureParameterSets));

          for (var _index = 0; _index < result.numOfPictureParameterSets; _index += 1) {
            result.pictureParameterSetLength = readBufferSum(readDcr(2));

            if (result.pictureParameterSetLength > 0) {
              var PPS = readDcr(result.pictureParameterSetLength);
              this.flv.emit('videoData', mergeBuffer(nalStart, PPS), pts);
            }
          }

          this.AVCDecoderConfigurationRecord = result;
          this.flv.emit('AVCDecoderConfigurationRecord', result);
          debug.log('avc-decoder-configuration-record', result);
        } else if (AVCPacketType === 1) {
          var lengthSizeMinusOne = this.AVCDecoderConfigurationRecord.lengthSizeMinusOne;
          var readVideo = readBuffer(packetData);

          while (readVideo.index < packetData.length) {
            var length = readBufferSum(readVideo(lengthSizeMinusOne));
            this.flv.emit('videoData', mergeBuffer(nalStart, readVideo(length)), pts);
          }
        } else {
          debug.error(AVCPacketType === 2, "[H264] Invalid video packet type ".concat(AVCPacketType));
        }
      }
    }, {
      key: "demuxerAudioTag",
      value: function demuxerAudioTag(tag) {
        var debug = this.flv.debug;
        debug.error(tag.body.length > 1, 'Invalid audio packet');
        var header = {
          soundFormat: (tag.body[0] & 0xf0) >> 4,
          soundRate: (tag.body[0] & 0x0c) >> 2,
          soundSize: (tag.body[0] & 0x02) >> 1,
          soundType: (tag.body[0] & 0x01) >> 0
        };
        debug.error(header.soundFormat === 10, "[audioTrack] unsupported audio format: ".concat(header.soundFormat));
        var packet = tag.body.subarray(1);
        var packetType = packet[0];

        if (packetType === 0) {
          var packetData = packet.subarray(1);
          debug.warn(!this.AudioSpecificConfig, '[aac] Find another one AudioSpecificConfig');
          debug.error(packetData.length >= 2, '[aac] AudioSpecificConfig parse length is not enough');
          var result = {};
          result.audioObjectType = (packetData[0] & 0xf8) >> 3;
          result.samplingFrequencyIndex = ((packetData[0] & 7) << 1) + ((packetData[1] & 0x80) >> 7 & 1);
          result.channelConfiguration = (packetData[1] & 0x7f) >> 3;
          this.AudioSpecificConfig = result;
          this.flv.emit('AudioSpecificConfig', result);
          debug.log('audio-specific-config', result);
        } else {
          var _this$AudioSpecificCo = this.AudioSpecificConfig,
              audioObjectType = _this$AudioSpecificCo.audioObjectType,
              samplingFrequencyIndex = _this$AudioSpecificCo.samplingFrequencyIndex,
              channelConfiguration = _this$AudioSpecificCo.channelConfiguration;
          var ADTSLen = tag.dataSize - 2 + 7;
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
          var ADTSBody = tag.body.subarray(2);
          var data = mergeBuffer(ADTSHeader, ADTSBody);
          this.flv.emit('audioData', data, tag.timestamp);
        }
      }
    }]);

    return Demuxer;
  }();

  var g_headers = []; //exports.create_parser = function(fmt) {

  function create_parser(fmt) {
    if (fmt == 'ivf') {
      return new file_parser_ivf();
    } else if (['264', 'h264', 'avc'].indexOf(fmt) >= 0) {
      return new file_parser_annexb('H264');
    } else if (['265', 'h265', 'hevc', 'bin'].indexOf(fmt) >= 0) {
      return new file_parser_annexb('H265');
    }

    return null;
  }

  function bitstream(buffer) {
    this.buffer = buffer;
    this.length = buffer instanceof Array ? buffer.length : buffer.byteLength;
    this.bytepos = 0;
    this.bits = 0;
    this.nbits = 0;
    var trailing_zero_bytes = 0;

    while (0 == this.buffer[this.length - 1 - trailing_zero_bytes]) {
      trailing_zero_bytes++;
    }

    var trailing_zero_bits = 0;

    while ((this.buffer[this.length - 1 - trailing_zero_bytes] & 1 << trailing_zero_bits) == 0 && trailing_zero_bits < 8) {
      trailing_zero_bits++;
    }

    this.stopbit = 8 * (this.length - trailing_zero_bytes) - trailing_zero_bits;

    this.load = function () {
      while (this.nbits <= 24 && this.bytepos < this.length) {
        var onebyte = this.buffer[this.bytepos++];
        this.bits |= onebyte << 24 - this.nbits;
        this.nbits += 8;
      }
    };

    this.bitpos = function () {
      return 8 * this.bytepos - this.nbits;
    };

    this.bitsleft = function () {
      return this.length * 8 - this.bitpos();
    };

    this.u = function (n) {
      var bits = 0;

      while (n) {
        bits <<= n;
        var r = n > 24 ? 24 : n;
        this.load();
        bits |= this.bits >>> 32 - r;
        this.bits <<= r;
        this.nbits -= r;
        n -= r;
      } // To unsigned.


      return bits >>> 0;
    };

    this.s = function (n) {
      var val = this.u(n);
      var sign = this.u(1);
      return sign ? -val : val;
    };

    this.ue = function () {
      this.load();
      var bits = this.bits | 1;
      var leadingzeros = 0;

      while (!(bits & 1 << 31)) {
        bits <<= 1;
        leadingzeros++;
      }

      this.bits <<= leadingzeros;
      this.nbits -= leadingzeros;
      return this.u(leadingzeros + 1) - 1;
    };

    this.se = function () {
      var codenum = this.ue();
      var codeval = codenum + 1 >> 1;
      return codenum & 1 ? codeval : -codeval;
    };

    this.uvlc = function () {
      var leading_zeros = 0;

      while (!this.u(1)) {
        ++leading_zeros;
      }

      if (leading_zeros >= 32) {
        return (1 << 32) - 1;
      }

      return this.u(leading_zeros) + (1 << leading_zeros) - 1;
    };

    this.le = function (n) {
      var val = 0;

      for (var i = 0; i < n; ++i) {
        val += bs.u(8) << i * 8;
      }

      return val;
    };

    this.leb128 = function () {
      var val = 0;

      for (var i = 0; i < 8; ++i) {
        var _byte = this.u(8);

        val |= (_byte & 0x7f) << i * 7;
        if (!(_byte & 0x80)) break;
      }

      return val;
    };

    this.ns = function (n) {
      var w = cntbits(n);
      var m = (1 << w) - n;
      var v = this.u(w - 1);
      if (v < m) return v;
      var extra_bit = this.u(1);
      return (v << 1) - m + extra_bit;
    };

    this.su = function (n) {
      var v = this.u(n);
      var s = 1 << n - 1;
      if (v & s) return v - 2 * s;
      return v;
    };
  }

  function int2str(x, base, length, padding, padend) {
    var str = x.toString(base);
    var pad = Array(length - str.length + 1).join(padding);
    return padend ? str + pad : pad + str;
  }

  function cntbits(x) {
    var nbits = 1;

    while (1 << nbits < x) {
      nbits++;
    }

    return nbits;
  }

  function more_rbsp_data(bs) {
    return bs.bitpos() + 1 < bs.stopbit;
  }

  function bytes2str(bytes) {
    var str = '';

    for (var i = 0; i < bytes.length; i++) {
      str += String.fromCharCode(bytes[i]);
    }

    return str;
  }

  function bytes2word(buffer, offset) {
    return buffer[offset + 1] << 8 | buffer[offset + 0];
  }

  function bytes2dword(buffer, offset) {
    return buffer[offset + 3] << 24 | buffer[offset + 2] << 16 | buffer[offset + 1] << 8 | buffer[offset];
  }

  function in_range(x, array) {
    return array.indexOf(x) > -1 ? 1 : 0;
  }

  function clip(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
  }

  function store_header(h) {
    h['@id'] = g_headers.length;
    g_headers.push(h);
  }

  function file_parser_base() {
    this.parser = null;
    this.buffer = new Uint8Array(1024 * 1024);
    this.recv = 0;
    this.addr = 0;
    this.next_header_idx = 0;

    this.next = function () {
      if (this.next_header_idx < g_headers.length) {
        return g_headers[this.next_header_idx++];
      }

      return null;
    };

    this.get = function (id) {
      return id < g_headers.length ? g_headers[id] : null;
    };
  }

  function file_parser_ivf() {
    file_parser_base.call(this);
    this.ivf_header_length = null;
    this.ivf_header = null;
    this.frame_size = null;
    this.num_needed_bytes = 8;
  }

  file_parser_ivf.prototype = new file_parser_base();

  file_parser_ivf.prototype.parse = function (buffer) {
    if (buffer == null) {
      return;
    }

    var pos = 0;

    while (pos < buffer.length) {
      var num_read_bytes = Math.min(this.num_needed_bytes, buffer.length - pos);

      for (var i = 0; i < num_read_bytes; ++i) {
        this.buffer[this.recv++] = buffer[pos++];
      }

      this.num_needed_bytes -= num_read_bytes;

      if (this.num_needed_bytes) {
        continue;
      }

      if (this.ivf_header_length == null) {
        this.ivf_header_length = this.buffer[7] << 8 | this.buffer[6];
        this.num_needed_bytes = this.ivf_header_length - this.recv;
        continue;
      }

      if (this.ivf_header == null) {
        this.ivf_header = this.parse_ivf_header(this.buffer, this.addr);
        var fourcc = this.ivf_header['fourcc'];

        if (fourcc == 'VP80') {
          this.parser = new bitstream_parser_vp8();
        } else if (fourcc == 'VP90') {
          this.parser = new bitstream_parser_vp9();
        } else if (fourcc == 'AV01') {
          this.parser = new bitstream_parser_av1();
        } else if (fourcc == 'H264') {
          this.parser = new file_parser_annexb('H264');
        } else if (['H265', 'HEVC'].indexOf(fourcc) >= 0) {
          this.parser = new file_parser_annexb('H265');
        } else {
          alert('Unknown FourCC ' + fourcc);
        }

        store_header(this.ivf_header);
        this.num_needed_bytes = 12;
      } else if (this.frame_size == null) {
        this.frame_size = this.num_needed_bytes = this.buffer[3] << 24 | this.buffer[2] << 16 | this.buffer[1] << 8 | this.buffer[0];
      } else if (this.parser != null) {
        this.parser.parse(this.buffer.slice(0, this.recv), this.addr);
        this.num_needed_bytes = 12;
        this.frame_size = null;
      }

      this.addr += this.recv;
      this.recv = 0;
    }
  };

  file_parser_ivf.prototype.parse_ivf_header = function (buffer, addr) {
    var h = {};
    h['signature'] = bytes2str(buffer.slice(0, 4));
    h['version'] = bytes2word(buffer, 4);
    h['length'] = bytes2word(buffer, 6);
    h['fourcc'] = bytes2str(buffer.slice(8, 12));
    h['width'] = bytes2word(buffer, 12);
    h['height'] = bytes2word(buffer, 14);
    h['frame rate'] = bytes2dword(buffer, 16);
    h['time scale'] = bytes2dword(buffer, 20);
    h['num frames'] = bytes2dword(buffer, 24);
    h['@addr'] = addr;
    h['@type'] = 'IVF';
    h['@length'] = h['length'];
    h['@extra'] = h['fourcc'] + ' ' + h['width'] + 'x' + h['height'];
    return h;
  };

  function file_parser_annexb(fourcc) {
    file_parser_base.call(this);
    this.code = 0xffffffff;
    this.first = true;

    if (fourcc == 'H264') {
      this.parser = new bitstream_parser_h264();
    } else if (fourcc == 'H265') {
      this.parser = new bitstream_parser_h265();
    }
  }

  file_parser_annexb.prototype = new file_parser_base();

  file_parser_annexb.prototype.parse = function (buffer, addr) {
    if (buffer == null) {
      if (!this.first && this.recv > 0) {
        this.parser.parse(this.buffer.slice(0, this.recv), this.addr);
        this.code = 0xffffffff;
        this.first = true;
        this.recv = 0;
      }
    } else {
      var pos = 0;

      if (this.first) {
        while (pos < buffer.length) {
          var _byte2 = buffer[pos++];
          this.addr++;
          this.code = (this.code << 8 | _byte2) & 0x00ffffff;

          if (this.code == 1) {
            this.first = false;
            break;
          }
        }
      }

      var cnt3 = 0;

      while (pos < buffer.length) {
        if (this.code == 1 && addr !== undefined) {
          this.addr = addr + pos;
        }

        var _byte2 = buffer[pos++];
        this.code = (this.code << 8 | _byte2) & 0x00ffffff;

        if (this.code == 3) {
          cnt3++;
        } else {
          this.buffer[this.recv++] = _byte2;

          if (this.code == 1) {
            this.recv -= 3;
            this.parser.parse(this.buffer.slice(0, this.recv), this.addr);
            this.addr += this.recv + cnt3;
            this.recv = 0;
            cnt3 = 0;
          }
        }
      }
    }
  };

  function bitstream_parser_vp8() {
    this.frame_num = 0;
  }

  bitstream_parser_vp8.prototype.parse = function (buffer, addr) {
    var bs = new bitstream(buffer);
    var h = {};

    var _byte3 = bs.u(8);

    h['frame_type'] = _byte3 & 1;
    h['version'] = _byte3 >> 1 & 7;
    h['show_frame'] = _byte3 >> 4 & 1;
    h['partition_length'] = (_byte3 | bs.u(8) << 8 | bs.u(8) << 16) >> 5;

    if (h['frame_type'] == 0) {
      h['sync_code'] = '0x' + int2str(bs.u(24), 16, 6, 0, 0);
      h['width'] = (bs.u(8) | bs.u(8) << 8) & 0x3fff;
      h['height'] = (bs.u(8) | bs.u(8) << 8) & 0x3fff;
    }

    h['@addr'] = addr;
    h['@type'] = h['frame_type'] == 0 ? 'I' : 'P';
    h['@length'] = buffer.length;
    h['@keyframe'] = 1 - h['frame_type'];
    h['@frame_num'] = this.frame_num++;
    store_header(h);
  };

  function bitstream_parser_vp9() {
    this.frame_num = 0;
  }

  bitstream_parser_vp9.prototype.parse = function (buffer, addr) {
    var bs = new bitstream(buffer);
    var h = {};
    var ref_idx = 0;
    h['frame_marker'] = bs.u(2);
    h['profile'] = bs.u(1) + (bs.u(1) << 1);
    if (h['profile'] == 3) h['reserved_zero'] = bs.u(1);
    h['show_existing_frames'] = bs.u(1);
    if (h['show_existing_frames']) h['frame_to_show_map_idx'] = bs.u(3);
    h['frame_type'] = bs.u(1);
    h['show_frame'] = bs.u(1);
    h['error_resilient_mode'] = bs.u(1);

    if (h['frame_type'] == 0) {
      h['frame_sync_bytes'] = bs.u(8) + ', ' + bs.u(8) + ', ' + bs.u(8);
      this.color_config(h, bs);
      h['frame_width_minus_1'] = bs.u(16);
      h['frame_height_minus_1'] = bs.u(16);
      h['render_and_frame_size_different'] = bs.u(1);

      if (h['render_and_frame_size_different'] == 1) {
        h['render_width_minus_1'] = bs.u(16);
        h['render_height_minus_1'] = bs.u(16);
      }
    } else {
      if (h['show_frame'] == 0) h['intra_only'] = bs.u(1);
      if (h['error_resilient_mode'] == 0) h['reset_frame_context'] = bs.u(2);

      if (h['intra_only'] || 0) {
        h['frame_sync_bytes'] = bs.u(8) + ', ' + bs.u(8) + ', ' + bs.u(8);

        if (h['profile'] > 0) {
          this.color_config(h, bs);
          h['refresh_frame_flags'] = bs.u(8);
          h['frame_width_minus_1'] = bs.u(16);
          h['frame_height_minus_1'] = bs.u(16);
          h['render_and_frame_size_different'] = bs.u(1);

          if (h['render_and_frame_size_different'] == 1) {
            h['render_width_minus_1'] = bs.u(16);
            h['render_height_minus_1'] = bs.u(16);
          }
        }
      } else {
        h['refresh_frame_flags'] = bs.u(8);

        for (var i = 0; i < 3; i++) {
          h['ref_frame_idx[' + i + ']'] = bs.u(3);
          h['ref_frame_sign_bias[' + i + ']'] = bs.u(1);
        }

        for (ref_idx = 0; ref_idx < 3; ref_idx++) {
          h['size_in_refs'] = bs.u(1);
          if (h['size_in_refs']) break;
        }

        if (h['size_in_refs'] == 0) {
          h['frame_width_minus_1'] = bs.u(16);
          h['frame_height_minus_1'] = bs.u(16);
        }

        h['render_and_frame_size_different'] = bs.u(1);

        if (h['render_and_frame_size_different'] == 1) {
          h['render_width_minus_1'] = bs.u(16);
          h['render_height_minus_1'] = bs.u(16);
        }

        h['allow_high_precision_mv'] = bs.u(1);
        h['is_filter_switchable'] = bs.u(1);
        if (h['is_filter_switchable'] == 0) h['raw_interpolation_filter'] = bs.u(2);
      }
    }

    if (h['error_resilient_mode'] == 0) {
      h['refresh_frame_context'] = bs.u(1);
      h['frame_parallel_decoding_mode'] = bs.u(1);
    }

    h['frame_context_idx'] = bs.u(2);
    h['loop_filter_level'] = bs.u(6);
    h['loop_filter_sharpness'] = bs.u(3);
    h['loop_filter_delta_enabled'] = bs.u(1);

    if (h['loop_filter_delta_enabled'] == 1) {
      h['loop_filter_delta_update'] = bs.u(1);

      if (h['loop_filter_delta_update'] == 1) {
        for (var i = 0; i < 4; i++) {
          h['update_ref_delta[' + i + ']'] = bs.u(1);
          if (h['update_ref_delta[' + i + ']'] == 1) h['loop_filter_ref_deltas[' + i + ']'] = bs.s(6);
        }

        for (var i = 0; i < 2; i++) {
          h['update_mode_delta[' + i + ']'] = bs.u(1);
          if (h['update_mode_delta[' + i + ']'] == 1) h['loop_filter_mode_deltas[[' + i + ']'] = bs.s(6);
        }
      }
    }

    h['base_q_idx'] = bs.u(8);

    for (var i = 0; i < 3; i++) {
      h['delta_coded[' + i + ']'] = bs.u(1);
      if (h['delta_coded[' + i + ']']) h['delta_q[' + i + ']'] = bs.s(4);
    }

    if ('frame_width_minus_1' in h) {
      h['#FrameWidth'] = h['frame_width_minus_1'] + 1;
      h['#FrameHeight'] = h['frame_height_minus_1'] + 1;
    } else {
      var ref = this.find_ref(h['ref_frame_idx[' + ref_idx + ']']);
      h['#FrameWidth'] = ref['#FrameWidth'];
      h['#FrameHeight'] = ref['#FrameHeight'];
    }

    var MiCols = h['#FrameWidth'] + 7 >> 3;
    var Sb64Cols = MiCols + 7 >> 3;
    var minLog2TileCols = 0;

    while (64 << minLog2TileCols < Sb64Cols) {
      minLog2TileCols++;
    }

    var maxLog2TileCols = 0;

    while (Sb64Cols >> maxLog2TileCols + 1 >= 4) {
      maxLog2TileCols++;
    }

    var tile_cols_log2 = minLog2TileCols;

    for (var i = 0; tile_cols_log2 < maxLog2TileCols; i++) {
      h['increment_tile_cols_log2[' + i + ']'] = bs.u(1);
      if (h['increment_tile_cols_log2[' + i + ']']) tile_cols_log2++;else break;
    }

    h['tile_rows_log2'] = bs.u(1);
    if (h['tile_rows_log2']) h['increment_tile_rows_log2'] = bs.u(1);
    h['header_size_in_bytes'] = bs.u(16);
    h['@addr'] = addr;
    h['@type'] = h['frame_type'] == 0 ? 'I' : 'P';
    h['@length'] = buffer.length;
    h['@keyframe'] = 1 - h['frame_type'];
    h['@extra'] = int2str(h['#FrameWidth'], 10, 4, ' ', 0) + 'x' + int2str(h['#FrameHeight'], 10, 4, ' ', 1) + ' QP ' + int2str(h['base_q_idx'], 10, 3, ' ', 0);
    h['@extra'] += ' upd ' + ('refresh_frame_flags' in h ? int2str(h['refresh_frame_flags'], 2, 8, '0', 0) : '11111111');

    if ('ref_frame_idx[0]' in h) {
      var ref_mask = 1 << h['ref_frame_idx[0]'] | 1 << h['ref_frame_idx[1]'] | 1 << h['ref_frame_idx[2]'];
      h['@extra'] += ' ref ' + int2str(ref_mask, 2, 8, '0', 0);
    }

    h['@frame_num'] = this.frame_num++;
    store_header(h);
  };

  bitstream_parser_vp9.prototype.color_config = function (h, bs) {
    var color_space = {
      0: 'CS_UNKNOWN',
      1: 'CS_BT_601',
      2: 'CS_BT_709',
      3: 'CS_SMPTE_170',
      4: 'CS_SMPTE_240',
      5: 'CS_BT_2020',
      6: 'CS_RESERVED',
      7: 'CS_BT_601'
    };
    if (h['profile'] >= 2) h['ten_or_twelve_bit'] = bs.u(1);
    h['color_space'] = color_space[bs.u(3)];
    if (h['color_space'] != 'CS_RGB') h['color_range'] = bs.u(1);

    if (h['profile'] == 1 || h['profile'] == 3) {
      if (h['color_space'] != 'CS_RGB') {
        h['subsampling_x'] = bs.u(1);
        h['subsampling_y'] = bs.u(1);
      }

      h['reserved_zero'] = bs.u(1);
    }
  };

  bitstream_parser_vp9.prototype.find_ref = function (idx) {
    for (var i = g_headers.length - 1; i >= 0; i--) {
      var h = g_headers[i];

      if (!('refresh_frame_flags' in h) || h['refresh_frame_flags'] & 1 << idx) {
        return g_headers[i];
      }
    }

    return null;
  };

  function bitstream_parser_av1() {
    this.obu_types = ['Reserved', 'OBU_SEQUENCE_HEADER', 'OBU_TEMPORAL_DELIMITER', 'OBU_FRAME_HEADER', 'OBU_TILE_GROUP', 'OBU_METADATA', 'OBU_FRAME', 'OBU_REDUNDANT_FRAME_HEADER', 'OBU_TILE_LIST', 'Reserved', 'Reserved', 'Reserved', 'Reserved', 'Reserved', 'Reserved', 'OBU_PADDING'];
    this.frame_type = {
      KEY_FRAME: 0,
      INTER_FRAME: 1,
      INTRA_ONLY_FRAME: 2,
      SWITCH_FRAME: 3
    };
    this.ref_frame_type = {
      NONE: -1,
      INTRA_FRAME: 0,
      LAST_FRAME: 1,
      LAST2_FRAME: 2,
      LAST3_FRAME: 3,
      GOLDEN_FRAME: 4,
      BWDREF_FRAME: 5,
      ALTREF2_FRAME: 6,
      ALTREF_FRAME: 7
    };
    this.NUM_REF_FRAMES = 8;
    this.REFS_PER_FRAME = 7;
    this.SELECT_SCREEN_CONTENT_TOOLS = 2;
    this.SELECT_INTEGER_MV = 2;
    this.PRIMARY_REF_NONE = 7;
    this.MAX_SEGMENTS = 8;
    this.IDENTITY = 0;
    this.TRANSLATION = 1;
    this.ROTZOOM = 2;
    this.AFFINE = 3;
    this.WARPEDMODEL_PREC_BITS = 16;
    this.SeenFrameHeader = 0;
    this.FeatureEnabled = Array.from(Array(8), function () {
      return new Array(8).fill(0);
    });
    this.FeatureData = Array.from(Array(8), function () {
      return new Array(8).fill(0);
    });
    this.frame_num = 0;
    this.seq_header = null;
  }

  bitstream_parser_av1.prototype.parse = function (buffer, addr) {
    var bs = new bitstream(buffer);

    while (bs.bitsleft() >> 3) {
      var obu_header_bitpos = bs.bitpos();
      var h = this.parse_obu_header(bs);
      var payload_bitpos = bs.bitpos();

      if (h['obu_type'] == 1) {
        this.sequence_header_obu(bs, h);
        this.seq_header = h;
        h['@extra'] = h['max_frame_width_minus_1'] + 1 + 'x' + (h['max_frame_height_minus_1'] + 1);
      } else if (h['obu_type'] == 2) {
        this.SeenFrameHeader = 0;
      } else if (h['obu_type'] == 6) {
        this.frame_obu(bs, h);
        h['@keyframe'] = h['#FrameIsIntra'];
        h['@frame_num'] = this.frame_num++;
      }

      h['@addr'] = addr + (obu_header_bitpos >> 3);
      h['@type'] = this.obu_types[h['obu_type']];

      if ('obu_size' in h) {
        var payload_bits = bs.bitpos() - payload_bitpos;
        var trailing_bits = h['obu_size'] * 8 - payload_bits;
        if (trailing_bits > 0) bs.u(trailing_bits);
        h['@length'] = h['obu_size'] + (payload_bitpos - obu_header_bitpos >> 3);
      } else {
        h['@length'] = buffer.length;
      }

      store_header(h);
      if (!('obu_size' in h)) break;
    }
  };

  bitstream_parser_av1.prototype.find_ref = function (idx) {
    for (var i = g_headers.length - 1; i >= 0; i--) {
      var h = g_headers[i];

      if (!('refresh_frame_flags' in h) || h['refresh_frame_flags'] & 1 << idx) {
        return g_headers[i];
      }
    }

    return null;
  };

  bitstream_parser_av1.prototype.parse_obu_header = function (bs) {
    var h = {};
    h['obu_forbidden_bit'] = bs.u(1);
    h['obu_type'] = bs.u(4);
    h['obu_extension_flag'] = bs.u(1);
    h['obu_has_size_field'] = bs.u(1);
    h['obu_reserved_1bit'] = bs.u(1);

    if (h['obu_extension_flag']) {
      h['temporal_id'] = bs.u(3);
      h['spatial_id'] = bs.u(2);
      h['extension_header_reserved_3bits'] = bs.u(3);
    }

    if (h['obu_has_size_field']) {
      h['obu_size'] = bs.leb128();
    }

    return h;
  };

  bitstream_parser_av1.prototype.sequence_header_obu = function (bs, h) {
    h['seq_profile'] = bs.u(3);
    h['still_picture'] = bs.u(1);
    h['reduced_still_picture_header'] = bs.u(1);

    if (h['reduced_still_picture_header']) {
      h['timing_info_present_flag'] = 0;
      h['decoder_model_info_present_flag'] = 0;
      h['initial_display_delay_present_flag'] = 0;
      h['operating_points_cnt_minus_1'] = 0;
      h['operating_point_idc[0]'] = 0;
      h['seq_level_idx[0]'] = bs.u(5);
      h['seq_tier[0]'] = 0;
      h['decoder_model_present_for_this_op[0]'] = 0;
      h['initial_display_delay_present_for_this_op[0]'] = 0;
    } else {
      h['timing_info_present_flag'] = bs.u(1);

      if (h['timing_info_present_flag']) {
        h['num_units_in_display_tick'] = bs.u(32);
        h['time_scale'] = bs.u(32);
        h['equal_picture_interval'] = bs.u(1);

        if (h['equal_picture_interval']) {
          h['num_ticks_per_picture_minus_1'] = bs.uvlc();
        }

        h['decoder_model_info_present_flag'] = bs.u(1);

        if (h['decoder_model_info_present_flag']) {
          h['buffer_delay_length_minus_1'] = bs.u(5);
          h['num_units_in_decoding_tick'] = bs.u(32);
          h['buffer_removal_time_length_minus_1'] = bs.u(5);
          h['frame_presentation_time_length_minus_1'] = bs.u(5);
        }
      } else {
        h['decoder_model_info_present_flag'] = 0;
      }

      h['initial_display_delay_present_flag'] = bs.u(1);
      h['operating_points_cnt_minus_1'] = bs.u(5);

      for (var i = 0; i <= h['operating_points_cnt_minus_1']; i++) {
        h['operating_point_idc[' + i + ']'] = bs.u(12);
        h['seq_level_idx[' + i + ']'] = bs.u(5);

        if (h['seq_level_idx[' + i + ']'] > 7) {
          h['seq_tier[' + i + ']'] = bs.u(1);
        } else {
          h['seq_tier[' + i + ']'] = 0;
        }

        if (h['decoder_model_info_present_flag']) {
          h['decoder_model_present_for_this_op[' + i + ']'] = bs.u(1);

          if (h['decoder_model_present_for_this_op[' + i + ']']) {
            var n = h['buffer_delay_length_minus_1'] + 1;
            h['decoder_buffer_delay[' + i + ']'] = bs.u(n);
            h['encoder_buffer_delay[' + i + ']'] = bs.u(n);
            h['low_delay_mode_flag[' + i + ']'] = bs.u(1);
          }
        } else {
          h['decoder_model_present_for_this_op[' + i + ']'] = 0;
        }

        if (h['initial_display_delay_present_flag']) {
          h['initial_display_delay_present_for_this_op[' + i + ']'] = bs.u(1);

          if (h['initial_display_delay_present_for_this_op[' + i + ']']) {
            h['initial_display_delay_minus_1[' + i + ']'] = bs.u(4);
          }
        }
      }
    }

    h['frame_width_bits_minus_1'] = bs.u(4);
    h['frame_height_bits_minus_1'] = bs.u(4);
    h['max_frame_width_minus_1'] = bs.u(h['frame_width_bits_minus_1'] + 1);
    h['max_frame_height_minus_1'] = bs.u(h['frame_height_bits_minus_1'] + 1);

    if (h['reduced_still_picture_header']) {
      h['frame_id_numbers_present_flag'] = 0;
    } else {
      h['frame_id_numbers_present_flag'] = bs.u(1);
    }

    if (h['frame_id_numbers_present_flag']) {
      h['delta_frame_id_length_minus_2'] = bs.u(4);
      h['additional_frame_id_length_minus_1'] = bs.u(3);
    }

    h['use_128x128_superblock'] = bs.u(1);
    h['enable_filter_intra'] = bs.u(1);
    h['enable_intra_edge_filter'] = bs.u(1);

    if (h['reduced_still_picture_header']) {
      h['enable_interintra_compound'] = 0;
      h['enable_masked_compound'] = 0;
      h['enable_warped_motion'] = 0;
      h['enable_dual_filter'] = 0;
      h['enable_order_hint'] = 0;
      h['enable_jnt_comp'] = 0;
      h['enable_ref_frame_mvs'] = 0;
      h['seq_force_screen_content_tools'] = this.SELECT_SCREEN_CONTENT_TOOLS;
      h['seq_force_integer_mv'] = 1;
      h['#OrderHintBits'] = 0;
    } else {
      h['enable_interintra_compound'] = bs.u(1);
      h['enable_masked_compound'] = bs.u(1);
      h['enable_warped_motion'] = bs.u(1);
      h['enable_dual_filter'] = bs.u(1);
      h['enable_order_hint'] = bs.u(1);

      if (h['enable_order_hint']) {
        h['enable_jnt_comp'] = bs.u(1);
        h['enable_ref_frame_mvs'] = bs.u(1);
      }

      h['seq_choose_screen_content_tools'] = bs.u(1);

      if (h['seq_choose_screen_content_tools']) {
        h['seq_force_screen_content_tools'] = this.SELECT_SCREEN_CONTENT_TOOLS;
      } else {
        h['seq_force_screen_content_tools'] = bs.u(1);
      }

      if (h['seq_force_screen_content_tools'] > 0) {
        h['seq_choose_integer_mv'] = bs.u(1);

        if (h['seq_choose_integer_mv']) {
          h['seq_force_integer_mv'] = 1;
        } else {
          h['seq_force_integer_mv'] = bs.u(1);
        }
      }

      if (h['enable_order_hint']) {
        h['order_hint_bits_minus_1'] = bs.u(3);
        h['#OrderHintBits'] = h['order_hint_bits_minus_1'] + 1;
      } else {
        h['#OrderHintBits'] = 0;
      }
    }

    h['enable_superres'] = bs.u(1);
    h['enable_cdef'] = bs.u(1);
    h['enable_restoration'] = bs.u(1);
    this.color_config(bs, h);
    h['film_grain_params_present'] = bs.u(1);
    return h;
  };

  bitstream_parser_av1.prototype.color_config = function (bs, h) {
    h['high_bitdepth'] = bs.u(1);

    if (h['seq_profile'] == 2 && h['high_bitdepth']) {
      h['twelve_bit'] = bs.u(1);
    }

    if (h['seq_profile'] == 1) {
      h['mono_chrome'] = 0;
    } else {
      h['mono_chrome'] = bs.u(1);
    }

    h['color_description_present_flag'] = bs.u(1);

    if (h['color_description_present_flag']) {
      h['color_primaries'] = bs.u(8);
      h['transfer_characteristics'] = bs.u(8);
      h['matrix_coefficients'] = bs.u(8);
    } else {
      h['color_primaries'] = 2;
      h['transfer_characteristics'] = 2;
      h['matrix_coefficients'] = 2;
    }

    if (h['mono_chrome']) {
      h['color_range'] = bs.u(1);
      h['subsampling_x'] = 0;
      h['subsampling_y'] = 0;
      h['separate_uv_delta_q'] = 0;
      return;
    } else if (h['color_primaries'] == 1 && h['transfer_characteristics'] == 13 && h['matrix_coefficients'] == 0) {
      h['color_range'] = 1;
      h['subsampling_x'] = 0;
      h['subsampling_y'] = 0;
    } else {
      h['color_range'] = bs.u(1);

      if (h['seq_profile'] == 0) {
        h['subsampling_x'] = 1;
        h['subsampling_y'] = 1;
      } else if (h['seq_profile'] == 1) {
        h['subsampling_x'] = 0;
        h['subsampling_y'] = 0;
      } else {
        if ('twelve_bit' in h && h['twelve_bit']) {
          h['subsampling_x'] = bs.u(1);
          if (h['subsampling_x']) h['subsampling_y'] = bs.u(1);
        } else {
          h['subsampling_x'] = 1;
          h['subsampling_y'] = 0;
        }
      }

      if (h['subsampling_x'] && h['subsampling_y']) {
        h['chroma_sample_position'] = bs.u(2);
      }
    }

    h['separate_uv_delta_q'] = bs.u(1);
  };

  bitstream_parser_av1.prototype.frame_header_obu = function (bs, h) {
    this.uncompressed_header(bs, h);
  };

  bitstream_parser_av1.prototype.frame_obu = function (bs, h) {
    this.frame_header_obu(bs, h);
  };

  bitstream_parser_av1.prototype.uncompressed_header = function (bs, h) {
    var idLen;

    if (this.seq_header['frame_id_numbers_present_flag']) {
      idLen = this.seq_header['additional_frame_id_length_minus_1'] + this.seq_header['delta_frame_id_length_minus_2'] + 3;
    }

    var allFrames = (1 << this.NUM_REF_FRAMES) - 1;

    if (this.seq_header['reduced_still_picture_header']) {
      h['show_existing_frame'] = 0;
      h['frame_type'] = this.frame_type.KEY_FRAME;
      h['#FrameIsIntra'] = 1;
      h['show_frame'] = 1;
      h['showable_frame'] = 0;
    } else {
      h['show_existing_frame'] = bs.u(1);

      if (h['show_existing_frame'] == 1) {
        h['frame_to_show_map_idx'] = bs.u(3);

        if (this.seq_header['decoder_model_info_present_flag'] && !this.seq_header['equal_picture_interval']) {
          var n = frame_presentation_time_length_minus_1 + 1;
          h['frame_presentation_time'] = bs.u(n);
        }

        h['refresh_frame_flags'] = 0;

        if (this.seq_header['frame_id_numbers_present_flag']) {
          h['display_frame_id'] = bs.u(idLen);
        }

        var ref_frame = this.find_ref(h['frame_to_show_map_idx[' + ref_idx + ']']);
        h['frame_type'] = ref_frame['frame_type'];

        if (h['frame_type'] == this.frame_type.KEY_FRAME) {
          h['refresh_frame_flags'] = allFrames;
        }

        return;
      }

      h['frame_type'] = bs.u(2);
      h['#FrameIsIntra'] = h['frame_type'] == this.frame_type.INTRA_ONLY_FRAME || h['frame_type'] == this.frame_type.KEY_FRAME;
      h['show_frame'] = bs.u(1);

      if (h['show_frame'] && this.seq_header['decoder_model_info_present_flag'] && !equal_picture_interval) {
        var n = this.seq_header['frame_presentation_time_length_minus_1'] + 1;
        h['frame_presentation_time'] = bs.u(n);
      }

      if (h['show_frame']) {
        h['showable_frame'] = h['frame_type'] != this.frame_type.KEY_FRAME;
      } else {
        h['showable_frame'] = bs.u(1);
      }

      if (h['frame_type'] == this.frame_type.SWITCH_FRAME || h['frame_type'] == this.frame_type.KEY_FRAME && h['show_frame']) h['error_resilient_mode'] = 1;else h['error_resilient_mode'] = bs.u(1);
    }

    h['disable_cdf_update'] = bs.u(1);

    if (this.seq_header['seq_force_screen_content_tools'] == this.SELECT_SCREEN_CONTENT_TOOLS) {
      h['allow_screen_content_tools'] = bs.u(1);
    } else {
      h['allow_screen_content_tools'] = this.seq_header['seq_force_screen_content_tools'];
    }

    if (this.seq_header['allow_screen_content_tools']) {
      if (this.seq_header['seq_force_integer_mv'] == this.SELECT_INTEGER_MV) {
        h['force_integer_mv'] = bs.u(1);
      } else {
        h['force_integer_mv'] = this.seq_header['seq_force_integer_mv'];
      }
    } else {
      h['force_integer_mv'] = 0;
    }

    if (h['#FrameIsIntra']) {
      h['force_integer_mv'] = 1;
    }

    if (this.seq_header['frame_id_numbers_present_flag']) {
      h['current_frame_id'] = bs.u(idLen);
    } else {
      h['current_frame_id'] = 0;
    }

    if (h['frame_type'] == this.frame_type.SWITCH_FRAME) h['frame_size_override_flag'] = 1;else if (this.seq_header['reduced_still_picture_header']) h['frame_size_override_flag'] = 0;else h['frame_size_override_flag'] = bs.u(1);
    h['order_hint'] = bs.u(this.seq_header['#OrderHintBits']);

    if (h['#FrameIsIntra'] || this.seq_header['error_resilient_mode']) {
      h['primary_ref_frame'] = this.PRIMARY_REF_NONE;
    } else {
      h['primary_ref_frame'] = bs.u(3);
    }

    if (this.seq_header['decoder_model_info_present_flag']) {
      h['buffer_removal_time_present_flag'] = bs.u(1);

      if (h['buffer_removal_time_present_flag']) {
        for (var i = 0; i <= this.seq_header['operating_points_cnt_minus_1']; i++) {
          if (this.seq_header['decoder_model_present_for_this_op[' + i + ']']) {
            var opPtIdc = this.seq_header['operating_point_idc[' + i + ' ]'];
            var inTemporalLayer = opPtIdc >> h['temporal_id'] & 1;
            var inSpatialLayer = opPtIdc >> h['spatial_id'] + 8 & 1;

            if (opPtIdc == 0 || inTemporalLayer && inSpatialLayer) {
              var n = this.seq_header['buffer_removal_time_length_minus_1'] + 1;
              h['buffer_removal_time[' + i + ']'] = bs.u(n);
            }
          }
        }
      }
    }

    h['allow_high_precision_mv'] = 0;
    h['use_ref_frame_mvs'] = 0;
    h['allow_intrabc'] = 0;

    if (h['frame_type'] == this.frame_type.SWITCH_FRAME || h['frame_type'] == this.frame_type.KEY_FRAME && h['show_frame']) {
      h['refresh_frame_flags'] = allFrames;
    } else {
      h['refresh_frame_flags'] = bs.u(8);
    }

    if (!h['#FrameIsIntra'] || h['refresh_frame_flags'] != allFrames) {
      if (this.seq_header['error_resilient_mode'] && this.seq_header['enable_order_hint']) {
        for (var i = 0; i < this.NUM_REF_FRAMES; i++) {
          h['ref_order_hint[' + i + ']'] = bs.u(this.seq_header['#OrderHintBits']);
        }
      }
    }

    if (h['frame_type'] == this.frame_type.KEY_FRAME || h['frame_type'] == this.frame_type.INTRA_ONLY_FRAME) {
      this.frame_size(bs, h);
      this.render_size(bs, h);

      if (this.seq_header['allow_screen_content_tools'] && h['#UpscaledWidth'] == h['#FrameWidth']) {
        h['allow_intrabc'] = bs.u(1);
      }
    } else {
      if (!h['enable_order_hint']) {
        h['frame_refs_short_signaling'] = 0;
      } else {
        h['frame_refs_short_signaling'] = bs.u(1);

        if (h['frame_refs_short_signaling']) {
          h['last_frame_idx'] = bs.u(3);
          h['gold_frame_idx'] = bs.u(3);
        }
      }

      for (i = 0; i < this.REFS_PER_FRAME; i++) {
        if (!h['frame_refs_short_signaling']) h['ref_frame_idx[' + i + ']'] = bs.u(3);

        if (this.seq_header['frame_id_numbers_present_flag']) {
          var n = this.seq_header['delta_frame_id_length_minus_2'] + 2;
          h['delta_frame_id_minus_1'] = bs.u(n);
        }
      }

      if (this.seq_header['frame_size_override_flag'] && !this.seq_header['error_resilient_mode']) {
        for (var i = 0; i < this.REFS_PER_FRAME; i++) {
          h['found_ref[' + i + ']'] = bs.u(1);

          if (h['found_ref[' + i + ']']) {
            var find_ref = this.find_ref(h['ref_frame_idx[' + i + ']']);
            h['#UpscaledWidth'] = find_ref['#UpscaledWidth'];
            h['#FrameWidth'] = h['#UpscaledWidth'];
            h['#FrameHeight'] = find_ref['#FrameHeight'];
            h['#RenderWidth'] = find_ref['#RenderWidth'];
            h['#RenderHeight'] = find_ref['#RenderHeight'];
            this.superres_params(bs, h);
            break;
          }
        }
      }

      if (!('#FrameWidth' in h)) {
        this.frame_size(bs, h);
        this.render_size(bs, h);
      }

      if (h['force_integer_mv']) {
        h['allow_high_precision_mv'] = 0;
      } else {
        h['allow_high_precision_mv'] = bs.u(1);
      }

      h['is_filter_switchable'] = bs.u(1);

      if (h['is_filter_switchable'] == 1) {
        h['interpolation_filter'] = 4;
      } else {
        h['interpolation_filter'] = bs.u(2);
      }

      h['is_motion_mode_switchable'] = bs.u(1);

      if (this.seq_header['error_resilient_mode'] || !this.seq_header['enable_ref_frame_mvs']) {
        h['use_ref_frame_mvs'] = 0;
      } else {
        h['use_ref_frame_mvs'] = bs.u(1);
      }
    }

    if (this.seq_header['reduced_still_picture_header'] || h['disable_cdf_update']) h['disable_frame_end_update_cdf'] = 1;else h['disable_frame_end_update_cdf'] = bs.u(1);

    if (h['primary_ref_frame'] == this.PRIMARY_REF_NONE) {
      this.setup_past_independence(h);
    } else {
      this.load_previous(h);
    }

    this.tile_info(bs, h);
    this.quantization_params(bs, h);
    this.segmentation_params(bs, h);
    this.delta_q_params(bs, h);
    this.delta_lf_params(bs, h);
    h['#CodedLossless'] = 1;

    for (var sid = 0; sid < this.MAX_SEGMENTS; sid++) {
      h['qindex[' + sid + ']'] = this.get_qindex(h, 1, sid);
      h['#LosslessArray[' + sid + ']'] = h['qindex[' + sid + ']'] == 0 && h['#DeltaQYDc'] == 0 && h['#DeltaQUAc'] == 0 && h['#DeltaQUDc'] == 0 && h['#DeltaQVAc'] == 0 && h['#DeltaQVDc'] == 0;

      if (!h['#LosslessArray[' + sid + ']']) {
        h['#CodedLossless'] = 0;
      }
    }

    h['#AllLossless'] = h['#CodedLossless'] && h['#FrameWidth'] == h['#UpscaledWidth'];
    this.loop_filter_params(bs, h);
    this.cdef_params(bs, h);
    this.lr_params(bs, h);
    h['tx_mode_select'] = h['#CodedLossless'] ? 0 : bs.u(1);
    h['reference_select'] = h['#FrameIsIntra'] ? 0 : bs.u(1);
    this.skip_mode_params(bs, h);
    if (h['#FrameIsIntra'] || this.seq_header['error_resilient_mode'] || !this.seq_header['enable_warped_motion']) h['allow_warped_motion'] = 0;else h['allow_warped_motion'] = bs.u(1);
    h['reduced_tx_set'] = bs.u(1);
    this.global_motion_params(bs, h);
    this.film_grain_params(bs, h);
  };

  bitstream_parser_av1.prototype.frame_size = function (bs, h) {
    if (h['frame_size_override_flag']) {
      var n = frame_width_bits_minus_1 + 1;
      h['frame_width_minus_1'] = bs.u(n);
      n = frame_height_bits_minus_1 + 1;
      h['frame_height_minus_1'] = bs.u(n);
      h['#FrameWidth'] = h['frame_width_minus_1'] + 1;
      h['#FrameHeight'] = h['frame_height_minus_1'] + 1;
    } else {
      h['#FrameWidth'] = this.seq_header['max_frame_width_minus_1'] + 1;
      h['#FrameHeight'] = this.seq_header['max_frame_height_minus_1'] + 1;
    }

    this.superres_params(bs, h);
  };

  bitstream_parser_av1.prototype.superres_params = function (bs, h) {
    if (this.seq_header['enable_superres']) h['use_superres'] = bs.u(1);else h['use_superres'] = 0;

    if (h['use_superres']) {
      h['coded_denom'] = bs.u(3);
      h['#SuperresDenom'] = h['coded_denom'] + 9;
    } else {
      h['#SuperresDenom'] = 8;
    }

    h['#UpscaledWidth'] = h['#FrameWidth'];
    h['#FrameWidth'] = (h['#UpscaledWidth'] * 8 + (h['#SuperresDenom'] >> 1)) / h['#SuperresDenom'] >>> 0;
  };

  bitstream_parser_av1.prototype.render_size = function (bs, h) {
    h['render_and_frame_size_different'] = bs.u(1);

    if (h['render_and_frame_size_different'] == 1) {
      h['render_width_minus_1'] = bs.u(16);
      h['render_height_minus_1'] = bs.u(16);
      h['#RenderWidth'] = h['render_width_minus_1'] + 1;
      h['#RenderHeight'] = h['render_height_minus_1'] + 1;
    } else {
      h['#RenderWidth'] = h['#UpscaledWidth'];
      h['#RenderHeight'] = h['#FrameHeight'];
    }
  };

  bitstream_parser_av1.prototype.get_relative_dist = function (a, b) {
    if (!this.seq_header['enable_order_hint']) return 0;
    var diff = a - b;
    var m = 1 << this.seq_header['#OrderHintBits'] - 1;
    diff = (diff & m - 1) - (diff & m);
    return diff;
  };

  bitstream_parser_av1.prototype.setup_past_independence = function (h) {
    for (var ref = this.ref_frame_type.LAST_FRAME; ref <= this.ref_frame_type.ALTREF_FRAME; ++ref) {
      for (var i = 0; i <= 5; ++i) {
        h['#PrevGmParams[' + ref + '][' + i + ']'] = i % 3 == 2 ? 1 << 16 : 8;
      }
    }
  };

  bitstream_parser_av1.prototype.load_previous = function (h) {
    var ref_frame = this.find_ref(h['ref_frame_idx[' + h['primary_ref_frame'] + ']']);

    for (var ref = this.ref_frame_type.LAST_FRAME; ref <= this.ref_frame_type.ALTREF_FRAME; ++ref) {
      for (var i = 0; i <= 5; ++i) {
        h['#PrevGmParams[' + ref + '][' + i + ']'] = ref_frame['#gm_params[' + ref + '][' + i + ']'];
      }
    }
  };

  bitstream_parser_av1.prototype.tile_info = function (bs, h) {
    var MiCols = 2 * (h['#FrameWidth'] + 7 >> 3);
    var MiRows = 2 * (h['#FrameHeight'] + 7 >> 3);
    var sbCols = this.seq_header['use_128x128_superblock'] ? MiCols + 31 >> 5 : MiCols + 15 >> 4;
    var sbRows = this.seq_header['use_128x128_superblock'] ? MiRows + 31 >> 5 : MiRows + 15 >> 4;
    var sbShift = this.seq_header['use_128x128_superblock'] ? 5 : 4;
    var sbSize = sbShift + 2;
    var maxTileWidthSb = 4096 >> sbSize;
    var maxTileAreaSb = 4096 * 2304 >> 2 * sbSize;
    var minLog2TileCols = this.tile_log2(maxTileWidthSb, sbCols);
    var maxLog2TileCols = this.tile_log2(1, Math.min(sbCols, 64));
    var maxLog2TileRows = this.tile_log2(1, Math.min(sbRows, 64));
    var minLog2Tiles = Math.max(minLog2TileCols, this.tile_log2(maxTileAreaSb, sbRows * sbCols));
    h['uniform_tile_spacing_flag'] = bs.u(1);

    if (h['uniform_tile_spacing_flag']) {
      h['tile_cols_log2'] = minLog2TileCols;

      while (h['tile_cols_log2'] < maxLog2TileCols) {
        if (!bs.u(1)) break;
        h['tile_cols_log2']++;
      }

      h['tile_rows_log2'] = Math.max(minLog2Tiles - h['tile_cols_log2'], 0);

      while (h['tile_rows_log2'] < maxLog2TileRows) {
        if (!bs.u(1)) break;
        h['tile_rows_log2']++;
      }
    } else {
      var widestTileSb = 0;
      var startSb = 0;
      var i;

      for (i = 0; startSb < sbCols; i++) {
        var maxWidth = Math.min(sbCols - startSb, maxTileWidthSb);
        h['width_in_sbs_minus_1'] = bs.ns(maxWidth);
        var sizeSb = h['width_in_sbs_minus_1'] + 1;
        widestTileSb = Math.max(sizeSb, widestTileSb);
        startSb += sizeSb;
      }

      h['tile_cols_log2'] = this.tile_log2(1, i);
      var maxTileAreaSb;
      if (minLog2Tiles > 0) maxTileAreaSb = sbRows * sbCols >> minLog2Tiles + 1;else maxTileAreaSb = sbRows * sbCols;
      var maxTileHeightSb = Math.max(maxTileAreaSb / widestTileSb >>> 0, 1);
      var startSb = 0;
      var i;

      for (i = 0; startSb < sbRows; i++) {
        var maxHeight = Math.min(sbRows - startSb, maxTileHeightSb);
        h['height_in_sbs_minus_1'] = bs.ns(maxHeight);
        startSb += h['height_in_sbs_minus_1'] + 1;
      }

      h['tile_rows_log2'] = this.tile_log2(1, i);
    }

    if (h['tile_cols_log2'] > 0 || h['tile_rows_log2'] > 0) {
      h['context_update_tile_id'] = bs.u(h['tile_rows_log2'] + h['tile_cols_log2']);
      h['tile_size_bytes_minus_1'] = bs.u(2);
    } else {
      h['context_update_tile_id'] = 0;
    }
  };

  bitstream_parser_av1.prototype.tile_log2 = function (blkSize, target) {
    var k = 0;

    while (blkSize << k < target) {
      k++;
    }

    return k;
  };

  bitstream_parser_av1.prototype.quantization_params = function (bs, h) {
    h['base_q_idx'] = bs.u(8);
    h['#DeltaQYDc'] = this.read_delta_q(bs, h);

    if (!this.seq_header['mono_chrome']) {
      if (this.seq_header['separate_uv_delta_q']) h['diff_uv_delta'] = bs.u(1);else h['diff_uv_delta'] = 0;
      h['#DeltaQUDc'] = this.read_delta_q(bs, h);
      h['#DeltaQUAc'] = this.read_delta_q(bs, h);

      if (h['diff_uv_delta']) {
        h['#DeltaQVAc'] = this.read_delta_q(bs, h);
        h['#DeltaQVDc'] = this.read_delta_q(bs, h);
      } else {
        h['#DeltaQVAa'] = h['#DeltaQUDc'];
        h['#DeltaQVAc'] = h['#DeltaQUAc'];
      }
    } else {
      h['#DeltaQUDc'] = 0;
      h['#DeltaQUAc'] = 0;
      h['#DeltaQVDc'] = 0;
      h['#DeltaQVAc'] = 0;
    }

    h['using_qmatrix'] = bs.u(1);

    if (h['using_qmatrix']) {
      h['qm_y'] = bs.u(4);
      h['qm_u'] = bs.u(4);
      if (!this.seq_header['separate_uv_delta_q']) h['qm_v'] = h['qm_u'];else h['qm_v'] = bs.u(4);
    }
  };

  bitstream_parser_av1.prototype.read_delta_q = function (bs, h) {
    var delta_q = 0;
    var delta_coded = bs.u(1);
    if (delta_coded) delta_q = bs.su(1 + 6);
    return delta_q;
  };

  bitstream_parser_av1.prototype.segmentation_params = function (bs, h) {
    var Segmentation_Feature_Bits = [8, 6, 6, 6, 6, 3, 0, 0];
    var Segmentation_Feature_Signed = [1, 1, 1, 1, 1, 0, 0, 0];
    var Segmentation_Feature_Max = [255, 63, 63, 63, 63, 7, 0, 0];
    h['segmentation_enabled'] = bs.u(1);

    if (h['segmentation_enabled'] == 1) {
      if (h['primary_ref_frame'] == this.PRIMARY_REF_NONE) {
        h['segmentation_update_map'] = 1;
        h['segmentation_temporal_update'] = 0;
        h['segmentation_update_data'] = 1;
      } else {
        h['segmentation_update_map'] = bs.u(1);
        if (h['segmentation_update_map'] == 1) h['segmentation_temporal_update'] = bs.u(1);
        h['segmentation_update_data'] = bs.u(1);
      }

      if (h['segmentation_update_data'] == 1) {
        for (i = 0; i < 8; i++) {
          for (j = 0; j < 8; j++) {
            var enabled = h['feature_enabled[' + i + '][' + j + ']'] = bs.u(1);
            this.FeatureEnabled[i][j] = enabled;

            if (enabled) {
              var bitsToRead = Segmentation_Feature_Bits[j];
              var limit = Segmentation_Feature_Max[j];
              var clippedValue = 0;

              if (Segmentation_Feature_Signed[j] == 1) {
                h['feature_value[' + i + '][' + j + ']'] = bs.su(1 + bitsToRead);
                clippedValue = clip(h['feature_value[' + i + '][' + j + ']'], -limit, limit);
              } else {
                h['feature_value[' + i + '][' + j + ']'] = bs.u(bitsToRead);
                clippedValue = clip(h['feature_value[' + i + '][' + j + ']'], 0, h['feature_value[' + i + '][' + j + ']']);
              }

              this.FeatureData[i][j] = clippedValue;
            }
          }
        }
      }
    } else {
      this.FeatureEnabled.fill(0);
      this.FeatureData.fill(0);
    }
  };

  bitstream_parser_av1.prototype.delta_q_params = function (bs, h) {
    h['delta_q_res'] = 0;
    h['delta_q_present'] = 0;

    if (h['base_q_idx'] > 0) {
      h['delta_q_present'] = bs.u(1);
    }

    if (h['delta_q_present']) {
      h['delta_q_res'] = bs.u(2);
    }
  };

  bitstream_parser_av1.prototype.delta_lf_params = function (bs, h) {
    h['delta_lf_present'] = 0;
    h['delta_lf_res'] = 0;
    h['delta_lf_multi'] = 0;

    if (h['delta_q_present']) {
      if (!h['allow_intrabc']) {
        h['delta_lf_present'] = bs.u(1);
      }

      if (h['delta_lf_present']) {
        h['delta_lf_res'] = bs.u(2);
        h['delta_lf_multi'] = bs.u(1);
      }
    }
  };

  bitstream_parser_av1.prototype.get_qindex = function (h, ignoreDeltaQ, segmentId) {
    var qindex = h['base_q_idx'];
    if (h['segmentation_enabled'] && this.FeatureEnabled[segmentId][0]) qindex += this.FeatureData[segmentId][0];
    return clip(qindex, 0, 255);
  };

  bitstream_parser_av1.prototype.loop_filter_params = function (bs, h) {
    if (h['#CodedLossless'] || h['allow_intrabc']) {
      return;
    }

    h['loop_filter_level[0]'] = bs.u(6);
    h['loop_filter_level[1]'] = bs.u(6);

    if (!this.seq_header['mono_chrome']) {
      if (h['loop_filter_level[0]'] || h['loop_filter_level[1]']) {
        h['loop_filter_level[2]'] = bs.u(6);
        h['loop_filter_level[3]'] = bs.u(6);
      }
    }

    h['loop_filter_sharpness'] = bs.u(3);
    h['loop_filter_delta_enabled'] = bs.u(1);

    if (h['loop_filter_delta_enabled']) {
      h['loop_filter_delta_update'] = bs.u(1);

      if (h['loop_filter_delta_update']) {
        for (var i = 0; i < 8; i++) {
          h['update_ref_delta'] = bs.u(1);

          if (h['update_ref_delta']) {
            h['loop_filter_ref_deltas[' + i + ']'] = bs.su(1 + 6);
          }
        }

        for (var i = 0; i < 2; i++) {
          h['update_mode_delta'] = bs.u(1);

          if (h['update_mode_delta']) {
            h['loop_filter_mode_deltas[' + i + ']'] = bs.su(1 + 6);
          }
        }
      }
    }
  };

  bitstream_parser_av1.prototype.cdef_params = function (bs, h) {
    if (h['#CodedLossless'] || h['allow_intrabc'] || !this.seq_header['enable_cdef']) {
      return;
    }

    h['cdef_damping_minus_3'] = bs.u(2);
    h['cdef_bits'] = bs.u(2);

    for (var i = 0; i < 1 << h['cdef_bits']; i++) {
      h['cdef_y_pri_strength[' + i + ']'] = bs.u(4);
      h['cdef_y_sec_strength[' + i + ']'] = bs.u(2);

      if (h['cdef_y_sec_strength[' + i + ']'] == 3) {
        h['cdef_y_sec_strength[' + i + ']'] += 1;
      }

      if (!this.seq_header['mono_chrome']) {
        h['cdef_uv_pri_strength[' + i + ']'] = bs.u(4);
        h['cdef_uv_sec_strength[' + i + ']'] = bs.u(2);

        if (h['cdef_uv_sec_strength[' + i + ']'] == 3) {
          h['cdef_uv_sec_strength[' + i + ']'] += 1;
        }
      }
    }
  };

  bitstream_parser_av1.prototype.lr_params = function (bs, h) {
    if (h['#AllLossless'] || h['allow_intrabc'] || !this.seq_header['enable_restoration']) {
      return;
    }
    var usesChromaLr = 0;
    var NumPlanes = this.seq_header['mono_chrome'] ? 1 : 3;

    for (var i = 0; i < NumPlanes; i++) {
      h['lr_type[' + i + ']'] = bs.u(2);
    }

    if (h['lr_type[0]']) {
      if (this.seq_header['use_128x128_superblock']) {
        h['lr_unit_shift'] = bs.u(1);
      } else {
        h['lr_unit_shift'] = bs.u(1);

        if (h['lr_unit_shift']) {
          h['lr_unit_extra_shift'] = bs.u(1);
        }
      }

      if (this.seq_header['subsampling_x'] && this.seq_header['subsampling_y'] && usesChromaLr) {
        h['lr_uv_shift'] = bs.u(1);
      }
    }
  };

  bitstream_parser_av1.prototype.skip_mode_params = function (bs, h) {
    var skipModeAllowed;

    if (h['#FrameIsIntra'] || !h['reference_select'] || !h['enable_order_hint']) {
      skipModeAllowed = 0;
    } else {
      var forwardIdx = -1;
      var backwardIdx = -1;
      var forwardHint = -1;
      var backwardHint = Math.pow(2, 32) - 1;

      for (var i = 0; i < this.NUM_REF_FRAMES; i++) {
        var ref_frame = this.find_ref(h['ref_frame_idx[' + i + ']']);
        var refHint = ref_frame['order_hint'];

        if (this.get_relative_dist(refHint, h['order_hint']) < 0) {
          if (forwardIdx < 0 || this.get_relative_dist(refHint, forwardHint) > 0) {
            forwardIdx = i;
            forwardHint = refHint;
          }
        } else if (this.get_relative_dist(refHint, h['order_hint']) > 0) {
          if (backwardIdx < 0 || this.get_relative_dist(refHint, backwardHint) < 0) {
            backwardIdx = i;
            backwardHint = refHint;
          }
        }
      }

      if (forwardIdx < 0) {
        skipModeAllowed = 0;
      } else if (backwardIdx >= 0) {
        skipModeAllowed = 1;
      } else {
        var secondForwardIdx = -1;
        var secondForwardHint = -1;

        for (var i = 0; i < this.NUM_REF_FRAMES; i++) {
          var ref_frame = this.find_ref(h['ref_frame_idx[' + i + ']']);
          var refHint = ref_frame['order_hint'];

          if (this.get_relative_dist(refHint, forwardHint) < 0) {
            if (secondForwardIdx < 0 || this.get_relative_dist(refHint, secondForwardHint) > 0) {
              secondForwardIdx = i;
              secondForwardHint = refHint;
            }
          }
        }

        if (secondForwardIdx < 0) {
          skipModeAllowed = 0;
        } else {
          skipModeAllowed = 1;
        }
      }
    }

    if (skipModeAllowed) {
      h['skip_mode_present'] = bs.u(1);
    } else {
      h['skip_mode_present'] = 0;
    }
  };

  bitstream_parser_av1.prototype.global_motion_params = function (bs, h) {
    for (var ref = this.ref_frame_type.LAST_FRAME; ref <= this.ref_frame_type.ALTREF_FRAME; ref++) {
      for (i = 0; i < 6; i++) {
        h['#gm_params[' + ref + '][' + i + ']'] = i % 3 == 2 ? 1 << 16 : 0;
      }
    }

    if (h['#FrameIsIntra']) {
      return;
    }

    for (var ref = this.ref_frame_type.LAST_FRAME; ref <= this.ref_frame_type.ALTREF_FRAME; ref++) {
      h['is_global[' + ref + ']'] = bs.u(1);
      var type;

      if (h['is_global[' + ref + ']']) {
        h['is_rot_zoom[' + ref + ']'] = bs.u(1);

        if (h['is_rot_zoom[' + ref + ']']) {
          type = this.ROTZOOM;
        } else {
          h['is_translation[' + ref + ']'] = bs.u(1);
          type = h['is_translation[' + ref + ']'] ? this.TRANSLATION : this.AFFINE;
        }
      } else {
        type = this.IDENTITY;
      }

      if (type >= this.ROTZOOM) {
        this.read_global_param(bs, h, type, ref, 2);
        this.read_global_param(bs, h, type, ref, 3);

        if (type == this.AFFINE) {
          this.read_global_param(bs, h, type, ref, 4);
          this.read_global_param(bs, h, type, ref, 5);
        } else {
          h['#gm_params[' + ref + '][4]'] = -h['#gm_params[' + ref + '][3]'];
          h['#gm_params[' + ref + '][5]'] = h['#gm_params[' + ref + '][2]'];
        }
      }

      if (type >= this.TRANSLATION) {
        this.read_global_param(bs, h, type, ref, 0);
        this.read_global_param(bs, h, type, ref, 1);
      }
    }
  };

  bitstream_parser_av1.prototype.read_global_param = function (bs, h, type, ref, idx) {
    var GM_ABS_ALPHA_BITS = 12;
    var GM_ALPHA_PREC_BITS = 15;
    var GM_ABS_TRANS_ONLY_BITS = 9;
    var GM_ABS_TRANS_BITS = 12;
    var GM_TRANS_PREC_BITS = 6;
    var GM_TRANS_ONLY_PREC_BITS = 3;
    var absBits = GM_ABS_ALPHA_BITS;
    var precBits = GM_ALPHA_PREC_BITS;

    if (idx < 2) {
      if (type == this.TRANSLATION) {
        absBits = GM_ABS_TRANS_ONLY_BITS - !h['allow_high_precision_mv'];
        precBits = GM_TRANS_ONLY_PREC_BITS - !h['allow_high_precision_mv'];
      } else {
        absBits = GM_ABS_TRANS_BITS;
        precBits = GM_TRANS_PREC_BITS;
      }
    }

    var precDiff = 16 - precBits;
    var round = idx % 3 == 2 ? 1 << 16 : 0;
    var sub = idx % 3 == 2 ? 1 << precBits : 0;
    var mx = 1 << absBits;
    var r = (h['#PrevGmParams[' + ref + '][' + idx + ']'] >> precDiff) - sub;
    h['#gm_params[' + ref + '][' + idx + ']'] = (this.decode_signed_subexp_with_ref(bs, h, -mx, mx + 1, r) << precDiff) + round;
  };

  bitstream_parser_av1.prototype.decode_signed_subexp_with_ref = function (bs, h, low, high, r) {
    var x = this.decode_unsigned_subexp_with_ref(bs, h, high - low, r - low);
    return x + low;
  };

  bitstream_parser_av1.prototype.decode_unsigned_subexp_with_ref = function (bs, h, mx, r) {
    v = this.decode_subexp(bs, h, mx);

    if (r << 1 <= mx) {
      return this.inverse_recenter(r, v);
    } else {
      return mx - 1 - this.inverse_recenter(mx - 1 - r, v);
    }
  };

  bitstream_parser_av1.prototype.decode_subexp = function (bs, h, numSyms) {
    var i = 0;
    var mk = 0;
    var k = 3;
    var n = 0;

    while (1) {
      var b2 = i ? k + i - 1 : k;
      var a = 1 << b2;

      if (numSyms <= mk + 3 * a) {
        h['subexp_final_bits[' + n + ']'] = bs.ns(numSyms - mk);
        return subexp_final_bits + mk;
      } else {
        h['subexp_more_bits[' + n + ']'] = bs.u(1);

        if (h['subexp_more_bits[' + n + ']']) {
          i++;
          mk += a;
        } else {
          h['subexp_bits[' + n + ']'] = bs.u(b2);
          return h['subexp_bits[' + n + ']'] + mk;
        }
      }

      ++n;
    }
  };

  bitstream_parser_av1.prototype.inverse_recenter = function (r, v) {
    if (v > 2 * r) return v;else if (v & 1) return r - (v + 1 >> 1);else return r + (v >> 1);
  };

  bitstream_parser_av1.prototype.film_grain_params = function (bs, h) {
    if (!this.seq_header['film_grain_params_present'] || !h['show_frame'] && !h['showable_frame']) {
      return;
    }

    h['apply_grain'] = bs.u(1);

    if (!h['apply_grain']) {
      return;
    }

    h['grain_seed'] = bs.u(16);
    if (h['frame_type'] == this.frame_type.INTER_FRAME) h['update_grain'] = bs.u(1);else h['update_grain'] = 1;

    if (!h['update_grain']) {
      h['film_grain_params_ref_idx'] = bs.u(3);
      return;
    }

    h['num_y_points'] = bs.u(4);

    for (i = 0; i < num_y_points; i++) {
      h['point_y_value[ i ]'] = bs.u(8);
      h['point_y_scaling[ i ]'] = bs.u(8);
    }

    if (this.seq_header['mono_chrome']) {
      h['chroma_scaling_from_luma'] = 0;
    } else {
      h['chroma_scaling_from_luma'] = bs.u(1);
    }

    if (this.seq_header['mono_chrome'] || this.seq_header['chroma_scaling_from_luma'] || this.seq_header['subsampling_x'] == 1 && this.seq_header['subsampling_y'] == 1 && h['num_y_points'] == 0) {
      h['num_cb_points'] = 0;
      h['num_cr_points'] = 0;
    } else {
      h['num_cb_points'] = bs.u(4);

      for (var i = 0; i < num_cb_points; i++) {
        h['point_cb_value[ i ]'] = bs.u(8);
        h['point_cb_scaling[ i ]'] = bs.u(8);
      }

      h['num_cr_points'] = bs.u(4);

      for (var i = 0; i < num_cr_points; i++) {
        h['point_cr_value[ i ]'] = bs.u(8);
        h['point_cr_scaling[ i ]'] = bs.u(8);
      }
    }

    h['grain_scaling_minus_8'] = bs.u(2);
    h['ar_coeff_lag'] = bs.u(2);
    var numPosLuma = 2 * h['ar_coeff_lag'] * (h['ar_coeff_lag'] + 1);
    var numPosChroma = numPosLuma;

    if (h['num_y_points']) {
      numPosChroma = numPosLuma + 1;

      for (var i = 0; i < numPosLuma; i++) {
        h['ar_coeffs_y_plus_128[' + i + ']'] = bs.u(8);
      }
    }

    if (h['chroma_scaling_from_luma'] || h['num_cb_points']) {
      for (var i = 0; i < numPosChroma; i++) {
        h['ar_coeffs_cb_plus_128[' + i + ']'] = bs.u(8);
      }
    }

    if (h['chroma_scaling_from_luma'] || h['num_cr_points']) {
      for (var i = 0; i < numPosChroma; i++) {
        h['ar_coeffs_cr_plus_128[' + i + ']'] = bs.u(8);
      }
    }

    h['ar_coeff_shift_minus_6'] = bs.u(2);
    h['grain_scale_shift'] = bs.u(2);

    if (h['num_cb_points']) {
      h['cb_mult'] = bs.u(8);
      h['cb_luma_mult'] = bs.u(8);
      h['cb_offset'] = bs.u(9);
    }

    if (h['num_cr_points']) {
      h['cr_mult'] = bs.u(8);
      h['cr_luma_mult'] = bs.u(8);
      h['cr_offset'] = bs.u(9);
    }

    h['overlap_flag'] = bs.u(1);
    h['clip_to_restricted_range'] = bs.u(1);
  };

  function bitstream_parser_h264() {
    this.nal_unit_type = ['Unknown', 'Slice', 'DP A', 'DP B', 'DP C', 'IDR', 'SEI', 'SPS', 'PPS', 'AUD', 'End of sequence', 'End of stream', 'Filler data', 'SPS extension', 'Prefix NAL unit', 'Subset SPS', 'Reserved', 'Reserved', 'Reserved', 'Auxiliary slice', 'Slice extension', 'Slice multiview', 'Reserved', 'Reserved', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown'];
    this.sei_payload_type = ['buffering_period', 'pic_timing', 'pan_scan_rect', 'filler_payload', 'user_data_registered_itu_t_t35', 'user_data_unregistered', 'recovery_point', 'dec_ref_pic_marking_repetition'];
    this.frame_num = 0;
  }

  bitstream_parser_h264.prototype.parse = function (buffer, addr) {
    var bs = new bitstream(buffer);
    var h = this.parse_nalu(bs);

    if (h['nal_unit_type'] == 6) {
      this.parse_sei(bs, h);
    } else if (h['nal_unit_type'] == 7) {
      this.parse_sps(bs, h);
      h['@extra'] = (h['pic_width_in_mbs_minus1'] + 1) * 16 + 'x' + (2 - h['frame_mbs_only_flag']) * (h['pic_height_in_map_units_minus1'] + 1) * 16;
      h['@extra'] += ' ' + this.profile(h);
      h['@extra'] += ' ' + h['level_idc'] / 10;
    } else if (h['nal_unit_type'] == 8) {
      this.parse_pps(bs, h);
      h['@extra'] = h['entropy_coding_mode_flag'] ? 'CABAC' : 'CAVLC';
    } else if (in_range(h['nal_unit_type'], [1, 5, 20])) {
      this.parse_slice(bs, h);
      h['@keyframe'] = h['nal_unit_type'] == 5 || h['idr_flag'] || 0;

      if (h['@keyframe']) {
        h['@type'] = 'IDR';
      } else {
        h['@type'] = ['P', 'B', 'I', 'SP', 'SI'][h['slice_type'] % 5];
      }

      h['@extra'] = 'frame_num ' + h['frame_num'];

      if (h['first_mb_in_slice'] == 0) {
        h['@frame_num'] = this.frame_num++;
      }
    }

    if (!('@type' in h)) {
      h['@type'] = this.nal_unit_type[h['nal_unit_type']];
    }

    h['@addr'] = addr;
    h['@length'] = buffer.length;
    h['@data'] = buffer;
    store_header(h);
  };

  bitstream_parser_h264.prototype.find_nalu = function (type, key, value) {
    for (var i = g_headers.length - 1; i >= 0; i--) {
      var h = g_headers[i];

      if ('nal_unit_type' in h && in_range(h['nal_unit_type'], type)) {
        if (key == null || h[key] == value) {
          return h;
        }
      }
    }

    return null;
  };

  bitstream_parser_h264.prototype.profile = function (sps) {
    var profile_idc = {
      66: 'Baseline',
      77: 'Main',
      88: 'Extended',
      100: 'High',
      110: 'High 10',
      122: 'High 4:2:2',
      244: 'High 4:4:4 Predictive',
      83: 'Scalable Baseline',
      86: 'Scalable High'
    };
    var profile = sps['profile_idc'] in profile_idc ? profile_idc[sps['profile_idc']] : 'Unknown';

    if (sps['profile_idc'] == 66) {
      if (sps['constraint_set0_flag'] == 1) profile = 'Constrained ' + profile;
    } else if (sps['profile_idc'] == 100) {
      if (sps['constraint_set4_flag'] == 1 && sps['constraint_set5_flag'] == 1) profile = 'Constrained ' + profile;
    } else if (sps['profile_idc'] == 110) {
      if (sps['constraint_set3_flag'] == 1) profile += ' Intra';
    } else if (sps['profile_idc'] == 83) {
      if (sps['constraint_set5_flag'] == 1) profile = 'Scalable Constrained Baseline';
    } else if (sps['profile_idc'] == 86) {
      if (sps['constraint_set5_flag'] == 1) profile = 'Scalable Constrained High';
    }

    return profile;
  };

  bitstream_parser_h264.prototype.parse_nalu = function (bs) {
    var nalu = {};
    nalu['forbidden_zero_bit'] = bs.u(1);
    nalu['nal_ref_idc'] = bs.u(2);
    nalu['nal_unit_type'] = bs.u(5);

    if (in_range(nalu['nal_unit_type'], [14, 20, 30])) {
      nalu['svc_extension_flag'] = bs.u(1);

      if (nalu['svc_extension_flag']) {
        nalu['idr_flag'] = bs.u(1);
        nalu['priority_id'] = bs.u(6);
        nalu['no_inter_layer_pred_flag'] = bs.u(1);
        nalu['dependency_id'] = bs.u(3);
        nalu['quality_id'] = bs.u(4);
        nalu['temporal_id'] = bs.u(3);
        nalu['use_ref_base_pic_flag'] = bs.u(1);
        nalu['discardable_flag'] = bs.u(1);
        nalu['output_flag'] = bs.u(1);
        nalu['reserved_three_2bits'] = int2str(bs.u(2), 2, 2, '0', 0);
      }
    }

    return nalu;
  };

  bitstream_parser_h264.prototype.parse_sps = function (bs, sps) {
    sps['profile_idc'] = bs.u(8);
    sps['constraint_set0_flag'] = bs.u(1);
    sps['constraint_set1_flag'] = bs.u(1);
    sps['constraint_set2_flag'] = bs.u(1);
    sps['constraint_set3_flag'] = bs.u(1);
    sps['constraint_set4_flag'] = bs.u(1);
    sps['constraint_set5_flag'] = bs.u(1);
    sps['reserved_zero_2bits'] = int2str(bs.u(2), 2, 2, '0', 0);
    sps['level_idc'] = bs.u(8);
    sps['seq_parameter_set_id'] = bs.ue();

    if (in_range(sps['profile_idc'], [100, 110, 122, 244, 44, 83, 86, 118, 128])) {
      sps['chroma_format_idc'] = bs.ue();
      if (sps['chroma_format_idc'] == 3) sps['separate_colour_plane_flag'] = bs.u(1);
      sps['bit_depth_luma_minus8'] = bs.ue();
      sps['bit_depth_chroma_minus8'] = bs.ue();
      sps['qpprime_y_zero_transform_bypass_flag'] = bs.u(1);
      sps['seq_scaling_matrix_present_flag'] = bs.u(1);

      if (sps['seq_scaling_matrix_present_flag']) {
        for (var i = 0; i < (sps['chroma_format_idc'] != 3 ? 8 : 12); i++) {
          sps['seq_scaling_list_present_flag[' + i + ']'] = bs.u(1);

          if (sps['seq_scaling_list_present_flag[' + i + ']']) {
            var n = i < 6 ? 4 : 8;
            sps['seq_scaling_list_present_flag[' + i + ']'] = this.scaling_list(bs, n * n);
          }
        }
      }
    }

    sps['log2_max_frame_num_minus4'] = bs.ue();
    sps['pic_order_cnt_type'] = bs.ue();

    if (sps['pic_order_cnt_type'] == 0) {
      sps['log2_max_pic_order_cnt_lsb_minus4'] = bs.ue();
    } else if (sps['pic_order_cnt_type'] == 1) {
      sps['delta_pic_order_always_zero_flag'] = bs.u(1);
      sps['offset_for_non_ref_pic'] = bs.se();
      sps['offset_for_top_to_bottom_field'] = bs.se();
      sps['num_ref_frames_in_pic_order_cnt_cycle'] = bs.ue();

      for (var i = 0; i < sps['num_ref_frames_in_pic_order_cnt_cycle']; i++) {
        sps['offset_for_ref_frame[' + i + ']'] = bs.se();
      }
    }

    sps['max_num_ref_frames'] = bs.ue();
    sps['gaps_in_frame_num_value_allowed_flag'] = bs.u(1);
    sps['pic_width_in_mbs_minus1'] = bs.ue();
    sps['pic_height_in_map_units_minus1'] = bs.ue();
    sps['frame_mbs_only_flag'] = bs.u(1);
    if (sps['frame_mbs_only_flag'] == 0) sps['mb_adaptive_frame_field_flag'] = bs.u(1);
    sps['direct_8x8_inference_flag'] = bs.u(1);
    sps['frame_cropping_flag'] = bs.u(1);

    if (sps['frame_cropping_flag']) {
      sps['frame_crop_left_offset'] = bs.ue();
      sps['frame_crop_right_offset'] = bs.ue();
      sps['frame_crop_top_offset'] = bs.ue();
      sps['frame_crop_bottom_offset'] = bs.ue();
    }

    sps['vui_parameters_present_flag'] = bs.u(1);

    if (sps['vui_parameters_present_flag']) {
      sps['aspect_ratio_info_present_flag'] = bs.u(1);

      if (sps['aspect_ratio_info_present_flag']) {
        sps['aspect_ratio_idc'] = bs.u(8);

        if (sps['aspect_ratio_idc'] == 255) {
          sps['sar_width'] = bs.u(16);
          sps['sar_height'] = bs.u(16);
        }
      }

      sps['overscan_info_present_flag'] = bs.u(1);
      if (sps['overscan_info_present_flag']) sps['overscan_appropriate_flag'] = bs.u(1);
      sps['video_signal_type_present_flag'] = bs.u(1);

      if (sps['video_signal_type_present_flag']) {
        sps['video_format'] = bs.u(3);
        sps['video_full_range_flag'] = bs.u(1);
        sps['colour_description_present_flag'] = bs.u(1);

        if (sps['colour_description_present_flag']) {
          sps['colour_primaries'] = bs.u(8);
          sps['transfer_characteristics'] = bs.u(8);
          sps['matrix_coefficients'] = bs.u(8);
        }
      }

      sps['chroma_loc_info_present_flag'] = bs.u(1);

      if (sps['chroma_loc_info_present_flag']) {
        sps['chroma_sample_loc_type_top_field'] = bs.ue();
        sps['chroma_sample_loc_type_bottom_field'] = bs.ue();
      }

      sps['timing_info_present_flag'] = bs.u(1);

      if (sps['timing_info_present_flag']) {
        sps['num_units_in_tick'] = bs.u(32);
        sps['time_scale'] = bs.u(32);
        sps['fixed_frame_rate_flag'] = bs.u(1);
      }

      sps['nal_hrd_parameters_present_flag'] = bs.u(1);
      if (sps['nal_hrd_parameters_present_flag']) sps['nal_hrd'] = this.parse_hrd(bs);
      sps['vcl_hrd_parameters_present_flag'] = bs.u(1);
      if (sps['vcl_hrd_parameters_present_flag']) sps['vlc_hrd'] = this.parse_hrd(bs);
      if (sps['nal_hrd_parameters_present_flag'] || sps['vcl_hrd_parameters_present_flag']) sps['low_delay_hrd_flag'] = bs.u(1);
      sps['pic_struct_present_flag'] = bs.u(1);
      sps['bitstream_restriction_flag'] = bs.u(1);

      if (sps['bitstream_restriction_flag']) {
        sps['motion_vectors_over_pic_boundaries_flag'] = bs.u(1);
        sps['max_bytes_per_pic_denom'] = bs.ue();
        sps['max_bits_per_mb_denom'] = bs.ue();
        sps['log2_max_mv_length_horizontal'] = bs.ue();
        sps['log2_max_mv_length_vertical'] = bs.ue();
        sps['max_num_reorder_frames'] = bs.ue();
        sps['max_dec_frame_buffering'] = bs.ue();
      }
    }
  };

  bitstream_parser_h264.prototype.parse_hrd = function (bs) {
    var hrd = {};
    hrd['cpb_cnt_minus1'] = bs.ue();
    hrd['bit_rate_scale'] = bs.u(4);
    hrd['cpb_size_scale'] = bs.u(4);

    for (var i = 0; i < hrd['cpb_cnt_minus1'] + 1; i++) {
      hrd['bit_rate_value_minus1[' + i + ']'] = bs.ue();
      hrd['cpb_size_value_minus1[' + i + ']'] = bs.ue();
      hrd['cbr_flag[' + i + ']'] = bs.u(1);
    }

    hrd['initial_cpb_removal_delay_length_minus1'] = bs.u(5);
    hrd['cpb_removal_delay_length_minus1'] = bs.u(5);
    hrd['dpb_output_delay_length_minus1'] = bs.u(5);
    hrd['time_offset_length'] = bs.u(5);
    return hrd;
  };

  bitstream_parser_h264.prototype.parse_pps = function (bs, pps) {
    pps['pic_parameter_set_id'] = bs.ue();
    pps['seq_parameter_set_id'] = bs.ue();
    pps['entropy_coding_mode_flag'] = bs.u(1);
    pps['bottom_field_pic_order_in_frame_present_flag'] = bs.u(1);
    pps['num_slice_groups_minus1'] = bs.ue();
    pps['num_ref_idx_l0_default_active_minus1'] = bs.ue();
    pps['num_ref_idx_l1_default_active_minus1'] = bs.ue();
    pps['weighted_pred_flag'] = bs.u(1);
    pps['weighted_bipred_idc'] = bs.u(2);
    pps['pic_init_qp_minus26'] = bs.se();
    pps['pic_init_qs_minus26'] = bs.se();
    pps['chroma_qp_index_offset'] = bs.se();
    pps['deblocking_filter_control_present_flag'] = bs.u(1);
    pps['constrained_intra_pred_flag'] = bs.u(1);
    pps['redundant_pic_cnt_present_flag'] = bs.u(1);

    if (more_rbsp_data(bs)) {
      pps['transform_8x8_mode_flag'] = bs.u(1);
      pps['pic_scaling_matrix_present_flag'] = bs.u(1);

      if (pps['pic_scaling_matrix_present_flag']) {
        sps = this.find_nalu([7, 15], 'seq_parameter_set_id', pps['seq_parameter_set_id']);
        nlists = 6;
        if (sps) nlists += 'chroma_format_idc' in sps && sps['chroma_format_idc'] == 3 ? 6 * pps['transform_8x8_mode_flag'] : 2 * pps['transform_8x8_mode_flag'];

        for (var i = 0; i < nlists; i++) {
          pps['pic_scaling_list_present_flag[' + i + ']'] = bs.u(1);

          if (pps['pic_scaling_list_present_flag[' + i + ']']) {
            var n = i < 6 ? 4 : 8;
            pps['pic_scaling_list_present_flag[' + i + ']'] = this.scaling_list(bs, n * n);
          }
        }
      }
    }
  };

  bitstream_parser_h264.prototype.parse_slice = function (bs, sh) {
    sh['first_mb_in_slice'] = bs.ue();
    sh['slice_type'] = bs.ue();
    sh['pic_parameter_set_id'] = bs.ue();
    var pps = this.find_nalu([8], 'pic_parameter_set_id', sh['pic_parameter_set_id']);
    if (pps == null) return sh;
    var sps = this.find_nalu(sh['nal_unit_type'] == 20 ? [15] : [7], 'seq_parameter_set_id', pps['seq_parameter_set_id']);
    if (sps == null) return sh;
    if ('separate_colour_plane_flag' in sps && sps['separate_colour_plane_flag'] == 1) sh['colour_plane_id'] = bs.u(2);
    sh['frame_num'] = bs.u(sps['log2_max_frame_num_minus4'] + 4);

    if (sps['frame_mbs_only_flag'] == 0) {
      sh['field_pic_flag'] = bs.u(1);
      if (sh['field_pic_flag']) sh['bottom_field_flag'] = bs.u(1);
    }

    if (sh['nal_unit_type'] == 5 || 'idr_flag' in sh && sh['idr_flag'] == 1) sh['idr_pic_id'] = bs.ue();

    if (sps['pic_order_cnt_type'] == 0) {
      sh['pic_order_cnt_lsb'] = bs.u(sps['log2_max_pic_order_cnt_lsb_minus4'] + 4);
      if (pps['bottom_field_pic_order_in_frame_present_flag'] == 1 && (!('field_pic_flag' in sh) || sh['field_pic_flag'] == 0)) sh['delta_pic_order_cnt_bottom'] = bs.se();
    } else if (sps['pic_order_cnt_type'] == 1 && sps['delta_pic_order_always_zero_flag'] == 0) {
      sh['delta_pic_order_cnt[0]'] = bs.se();
      if (pps['bottom_field_pic_order_in_frame_present_flag'] && 'field_pic_flag' in sh && sh['field_pic_flag'] == 0) sh['delta_pic_order_cnt[1]'] = bs.se();
    }

    if (pps['redundant_pic_cnt_present_flag'] == 1) sh['redundant_pic_cnt'] = bs.ue();

    if (!('quality_id' in sh) || sh['quality_id'] == 0) {
      if (sh['slice_type'] % 5 == 1) sh['direct_spatial_mv_pred_flag'] = bs.u(1);

      if (in_range(sh['slice_type'] % 5, [0, 1, 3])) {
        sh['num_ref_idx_active_override_flag'] = bs.u(1);

        if (sh['num_ref_idx_active_override_flag']) {
          sh['num_ref_idx_l0_active_minus1'] = bs.ue();
          if (sh['slice_type'] % 5 == 1) sh['num_ref_idx_l1_active_minus1'] = bs.ue();
        }
      }

      if (!in_range(sh['slice_type'] % 5, [2, 4])) {
        for (var list = 0; list < (sh['slice_type'] % 5 == 1 ? 2 : 1); list++) {
          sh['ref_pic_list_modification_flag_l' + list] = bs.u(1);

          if (sh['ref_pic_list_modification_flag_l' + list]) {
            var i = 0;
            var modification_of_pic_nums_idc = 0;

            while (modification_of_pic_nums_idc != 3) {
              modification_of_pic_nums_idc = bs.ue(); // todo: add command name

              sh['modification_of_pic_nums_idc_l' + list + '[' + i + ']'] = modification_of_pic_nums_idc;
              if (in_range(modification_of_pic_nums_idc, [0, 1])) sh['abs_diff_pic_num_minus1_l' + list + '[' + i + ']'] = bs.ue();else if (modification_of_pic_nums_idc == 2) sh['long_term_pic_num_l' + list + '[' + i + ']'] = bs.ue();
              i += 1;
            }
          }
        }
      }

      if (pps['weighted_pred_flag'] && in_range(sh['slice_type'] % 5, [0, 3]) || pps['weighted_bipred_idc'] == 1 && sh['slice_type'] % 5 == 1) {
        sh['luma_log2_weight_denom'] = bs.ue();
        if (!('chroma_format_idc' in sps) || sps['chroma_format_idc'] != 0) sh['chroma_log2_weight_denom'] = bs.ue();

        for (var list = 0; list < (sh['slice_type'] % 5 == 1 ? 2 : 1); list++) {
          var num_ref_idx_active_minus1 = pps['num_ref_idx_l' + list + '_default_active_minus1'];
          if ('num_ref_idx_l' + list + '_active_minus1' in sh) var num_ref_idx_active_minus1 = sh['num_ref_idx_l' + list + '_active_minus1'];

          for (var i = 0; i <= num_ref_idx_active_minus1; i++) {
            sh['luma_weight_l' + list + '_flag'] = bs.u(1);

            if (sh['luma_weight_l' + list + '_flag']) {
              sh['luma_weight_l' + list + '[' + i + ']'] = bs.se();
              sh['luma_offset_l' + list + '[' + i + ']'] = bs.se();
            }

            if ('chroma_log2_weight_denom' in sh) {
              sh['chroma_weight_l' + list + '_flag'] = bs.u(1);

              if (sh['chroma_weight_l' + list + '_flag']) {
                for (var j = 0; j < 2; j++) {
                  sh['chroma_weight_l' + list + '[' + i + ']' + '[' + j + ']'] = bs.se();
                  sh['chroma_offset_l' + list + '[' + i + ']' + '[' + j + ']'] = bs.se();
                }
              }
            }
          }
        }
      }

      if (sh['nal_ref_idc'] != 0) {
        if (sh['nal_unit_type'] == 5 || 'idr_flag' in sh && sh['idr_flag'] == 1) {
          sh['no_output_of_prior_pics_flag'] = bs.u(1);
          sh['long_term_reference_flag'] = bs.u(1);
        } else {
          sh['adaptive_ref_pic_marking_mode_flag'] = bs.u(1);

          if (sh['adaptive_ref_pic_marking_mode_flag']) {
            var i = 0;
            var memory_management_control_operation = 1;

            while (memory_management_control_operation != 0) {
              memory_management_control_operation = bs.ue();
              sh['memory_management_control_operation[' + i + ']'] = memory_management_control_operation;
              if (in_range(memory_management_control_operation, [1, 3])) sh['difference_of_pic_nums_minus1[' + i + ']'] = bs.ue();
              if (memory_management_control_operation == 2) sh['long_term_pic_num[' + i + ']'] = bs.ue();
              if (in_range(memory_management_control_operation, [3, 6])) sh['long_term_frame_idx[' + i + ']'] = bs.ue();
              if (memory_management_control_operation == 4) sh['max_long_term_frame_idx_plus1[' + i + ']'] = bs.ue();
              i += 1;
            }
          }
        }

        if ('slice_header_restriction_flag' in sps && sps['slice_header_restriction_flag'] == 0) {
          sh['store_ref_base_pic_flag'] = bs.u(1);

          if (sh['use_ref_base_pic_flag'] || sh['store_ref_base_pic_flag'] && sh['idr_flag'] == 0) {
            sh['adaptive_ref_base_pic_marking_mode_flag'] = bs.u(1);

            if (sh['adaptive_ref_base_pic_marking_mode_flag']) {
              var i = 0;
              var memory_management_base_control_operation = 1;

              while (memory_management_base_control_operation != 0) {
                memory_management_base_control_operation = bs.ue(); // todo: describe command

                sh['memory_management_base_control_operation[' + i + ']'] = memory_management_control_operation;
                if (memory_management_control_operation == 1) sh['difference_of_base_pic_nums_minus1[' + i + ']'] = bs.ue();
                if (memory_management_control_operation == 2) sh['long_term_base_pic_num[' + i + ']'] = bs.ue();
                i += 1;
              }
            }
          }
        }
      }
    }

    if (pps['entropy_coding_mode_flag'] && !in_range(sh['slice_type'] % 5, [2, 4])) sh['cabac_init_idc'] = bs.ue();
    sh['slice_qp_delta'] = bs.se();

    if (in_range(sh['slice_type'], [3, 4])) {
      if (sh['slice_type'] == 3) sh['sp_for_switch_flag'] = bs.u(1);
      sh['slice_qs_delta'] = bs.se();
    }

    if (pps['deblocking_filter_control_present_flag']) {
      sh['disable_deblocking_filter_idc'] = bs.ue();

      if (sh['disable_deblocking_filter_idc'] != 1) {
        sh['slice_alpha_c0_offset_div2'] = bs.se();
        sh['slice_beta_offset_div2'] = bs.se();
      }
    }

    if (sh['nal_unit_type'] == 20) {
      if (sh['no_inter_layer_pred_flag'] == 0 && sh['quality_id'] == 0) {
        sh['ref_layer_dq_id'] = bs.ue();

        if (sps['inter_layer_deblocking_filter_control_present_flag']) {
          sh['disable_inter_layer_deblocking_filter_idc'] = bs.ue();

          if (sh['disable_inter_layer_deblocking_filter_idc'] != 1) {
            sh['inter_layer_slice_alpha_c0_offset_div2'] = bs.se();
            sh['inter_layer_slice_beta_offset_div2'] = bs.se();
          }
        }

        sh['constrained_intra_resampling_flag'] = bs.u(1);

        if (sps['extended_spatial_scalability_idc'] == 2) {
          if ('chroma_format_idc' in sps && sps['chroma_format_idc'] > 0) {
            sh['ref_layer_chroma_phase_x_plus1_flag'] = bs.u(1);
            sh['ref_layer_chroma_phase_y_plus1'] = bs.u(2);
          }

          sh['scaled_ref_layer_left_offset'] = bs.se();
          sh['scaled_ref_layer_top_offset'] = bs.se();
          sh['scaled_ref_layer_right_offset'] = bs.se();
          sh['scaled_ref_layer_bottom_offset'] = bs.se();
        }
      }

      if (sh['no_inter_layer_pred_flag'] == 0) {
        sh['slice_skip_flag'] = bs.u(1);
        if (sh['slice_skip_flag']) sh['num_mbs_in_slice_minus1'] = bs.ue();else {
          sh['adaptive_base_mode_flag'] = bs.u(1);
          if (sh['adaptive_base_mode_flag'] == 0) sh['default_base_mode_flag'] = bs.u(1);
          sh['adaptive_motion_prediction_flag'] = bs.u(1);
          if (sh['adaptive_motion_prediction_flag'] == 0) sh['default_motion_prediction_flag'] = bs.u(1);
          sh['adaptive_residual_prediction_flag'] = bs.u(1);
          if (sh['adaptive_residual_prediction_flag'] == 0) sh['default_residual_prediction_flag'] = bs.u(1);
        }
        if ('adaptive_tcoeff_level_prediction_flag' in sps && sps['adaptive_tcoeff_level_prediction_flag'] == 1) sh['default_residual_prediction_flag'] = bs.u(1);
      }

      if (sps['slice_header_restriction_flag'] == 0 && (!('slice_skip_flag' in sh) || sh['slice_skip_flag'] == 0)) {
        sh['scan_idx_start'] = bs.u(4);
        sh['scan_idx_end'] = bs.u(4);
      }
    }
  };

  bitstream_parser_h264.prototype.parse_sei = function (bs, h) {
    var i = 0;

    do {
      var payload_type = 0;

      do {
        payload_type += bs.u(8);
      } while (payload_type != 0 && payload_type % 255 == 0);

      var payload_size = 0;

      do {
        payload_size += bs.u(8);
      } while (payload_size != 0 && payload_size % 255 == 0);

      h['payload_type[' + i + ']'] = payload_type;
      h['payload_size[' + i + ']'] = payload_size;

      if (payload_type < this.sei_payload_type.length) {
        h['payload_type[' + i + ']'] += ' ' + this.sei_payload_type[payload_type];
      }

      bs.u(8 * payload_size);
      ++i;
    } while (more_rbsp_data(bs));
  };

  function bitstream_parser_h265() {
    this.nal_unit_type = ['TRAIL_N', 'TRAIL_R', 'TSA_N', 'TSA_R', 'STSA_N', 'STSA_R', 'RADL_N', 'RADL_R', 'RASL_N', 'RASL_R', 'RSV_VCL_N10', 'RSV_VCL_N12', 'RSV_VCL_N14', 'RSV_VCL_R11', 'RSV_VCL_R13', 'RSV_VCL_R15', 'BLA_W_LP', 'BLA_W_RADL', 'BLA_N_LP', 'IDR_W_RADL', 'IDR_N_LP', 'CRA_NUT', 'RSV_IRAP_VCL22', 'RSV_IRAP_VCL23', 'RSV_VCL24', 'RSV_VCL25', 'RSV_VCL26', 'RSV_VCL27', 'RSV_VCL28', 'RSV_VCL29', 'RSV_VCL30', 'RSV_VCL31', 'VPS', 'SPS', 'PPS', 'AUD', 'EOS', 'EOB', 'FD_NUT', 'PREFIX SEI', 'SUFFIX SEI', 'RSV_NVCL41', 'RSV_NVCL47', 'UNSPEC48', 'UNSPEC63'];
    this.frame_num = 0;
  }

  bitstream_parser_h265.prototype.parse = function (buffer, addr) {
    var bs = new bitstream(buffer);
    var h = this.parse_nalu(bs);

    if (h['nal_unit_type'] == 32) {
      this.parse_vps(bs, h);
    } else if (h['nal_unit_type'] == 33) {
      this.parse_sps(bs, h);
      h['@extra'] = h['pic_width_in_luma_samples'] + 'x' + h['pic_height_in_luma_samples'];
      h['@extra'] += ' ' + this.profile(h);
      h['@extra'] += ' ' + h['general_level_idc'];
    } else if (h['nal_unit_type'] == 34) {
      this.parse_pps(bs, h);
    } else if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 16, 17, 18, 19, 20, 21].indexOf(h['nal_unit_type']) >= 0) {
      this.slice_segment_header(bs, h);
      h['@keyframe'] = [19, 20].indexOf(h['nal_unit_type']) >= 0 ? 1 : 0;

      if (h['@keyframe']) {
        h['@type'] = 'IDR';
      } else {
        h['@type'] = ['B', 'P', 'I'][h['slice_type']];
      }

      h['@extra'] = this.nal_unit_type[h['nal_unit_type']];
      h['@extra'] += ' ' + (h['@keyframe'] ? 0 : h['slice_pic_order_cnt_lsb']);
      h['@poc'] = h['@keyframe'] ? 0 : h['slice_pic_order_cnt_lsb'];

      if (h['first_slice_segment_in_pic_flag']) {
        h['@frame_num'] = this.frame_num++;
      }
    }

    h['@addr'] = addr;
    if (!('@type' in h)) h['@type'] = this.nal_unit_type[h['nal_unit_type']];
    h['@length'] = buffer.length;
    store_header(h);
  };

  bitstream_parser_h265.prototype.find_nalu = function (type, key, value) {
    for (var i = g_headers.length - 1; i >= 0; i--) {
      var h = g_headers[i];

      if ('nal_unit_type' in h && in_range(h['nal_unit_type'], type)) {
        if (key == null || h[key] == value) {
          return h;
        }
      }
    }

    return null;
  };

  bitstream_parser_h265.prototype.parse_nalu = function (bs) {
    var nalu = {};
    nalu['forbidden_zero_bit'] = bs.u(1);
    nalu['nal_unit_type'] = bs.u(6);
    nalu['nuh_layer_id'] = bs.u(6);
    nalu['nuh_temporal_id_plus1'] = bs.u(3);
    return nalu;
  };

  bitstream_parser_h265.prototype.profile = function (sps) {
    if (sps['general_profile_idc'] == 1 || sps['general_profile_compatibility_flag[1]']) return 'Main';
    if (sps['general_profile_idc'] == 2 || sps['general_profile_compatibility_flag[2]']) return 'Main 10';
    if (sps['general_profile_idc'] == 3 || sps['general_profile_compatibility_flag[3]']) return 'Main Still Picture';
  };

  bitstream_parser_h265.prototype.profile_tier_level = function (bs, idx, profilePresentFlag, maxNumSubLayersMinus1, h) {
    if (profilePresentFlag) {
      h['general_profile_space' + idx] = bs.u(2);
      h['general_tier_flag' + idx] = bs.u(1);
      h['general_profile_idc' + idx] = bs.u(5);
      h['general_profile_compatibility_flags' + idx] = int2str(bs.u(32), 2, 32, '0', 0);
      h['general_progressive_source_flag' + idx] = bs.u(1);
      h['general_interlaced_source_flag' + idx] = bs.u(1);
      h['general_non_packed_constraint_flag' + idx] = bs.u(1);
      h['general_frame_only_constraint_flag' + idx] = bs.u(1);

      if (in_range(h['general_profile_idc' + idx], [4, 5, 6, 7]) || h['general_profile_compatibility_flags' + idx] & 0xf0) {
        h['general_max_12bit_constraint_flag' + idx] = bs.u(1);
        h['general_max_10bit_constraint_flag' + idx] = bs.u(1);
        h['general_max_8bit_constraint_flag' + idx] = bs.u(1);
        h['general_max_422chroma_constraint_flag' + idx] = bs.u(1);
        h['general_max_420chroma_constraint_flag' + idx] = bs.u(1);
        h['general_max_monochrome_constraint_flag' + idx] = bs.u(1);
        h['general_intra_constraint_flag' + idx] = bs.u(1);
        h['general_one_picture_only_constraint_flag' + idx] = bs.u(1);
        h['general_lower_bit_rate_constraint_flag' + idx] = bs.u(1);
        h['general_reserved_zero_34bits' + idx] = bs.u(34);
      } else h['general_reserved_zero_43bits' + idx] = bs.u(43);

      if (h['general_profile_idc' + idx] >= 1 && h['general_profile_idc' + idx] <= 5 || h['general_profile_compatibility_flags' + idx] & 0x3e) h['general_inbld_flag' + idx] = bs.u(1);else h['general_reserved_zero_bit' + idx] = bs.u(1);
    }

    h['general_level_idc' + idx] = bs.u(8);

    for (var i = 0; i < maxNumSubLayersMinus1; i++) {
      h['sub_layer_profile_present_flag' + idx + '[' + i + ']'] = bs.u(1);
      h['sub_layer_level_present_flag' + idx + '[' + i + ']'] = bs.u(1);
    }

    if (maxNumSubLayersMinus1 > 0) for (var i = maxNumSubLayersMinus1; i < 8; i++) {
      h['reserved_zero_2bits' + idx + '[' + i + ']'] = bs.u(2);
    }

    for (var i = 0; i < maxNumSubLayersMinus1; i++) {
      if (h['sub_layer_profile_present_flag' + idx + '[' + i + ']']) {
        h['sub_layer_profile_space' + idx + '[' + i + ']'] = bs.u(2);
        h['sub_layer_tier_flag' + idx + '[' + i + ']'] = bs.u(1);
        h['sub_layer_profile_idc' + idx + '[' + i + ']'] = bs.u(5);
        h['sub_layer_profile_compatibility_flag' + idx + '[' + i + ']'] = bs.u(32);
        h['sub_layer_progressive_source_flag' + idx + '[' + i + ']'] = bs.u(1);
        h['sub_layer_interlaced_source_flag' + idx + '[' + i + ']'] = bs.u(1);
        h['sub_layer_non_packed_constraint_flag' + idx + '[' + i + ']'] = bs.u(1);
        h['sub_layer_frame_only_constraint_flag' + idx + '[' + i + ']'] = bs.u(1);

        if (in_range(h['sub_layer_profile_idc' + idx + '[' + i + ']'], [4, 5, 6, 7]) || h['sub_layer_profile_compatibility_flag' + idx + '[' + i + ']'] & 0xf0) {
          h['sub_layer_max_12bit_constraint_flag' + idx + '[' + i + ']'] = bs.u(1);
          h['sub_layer_max_10bit_constraint_flag' + idx + '[' + i + ']'] = bs.u(1);
          h['sub_layer_max_8bit_constraint_flag' + idx + '[' + i + ']'] = bs.u(1);
          h['sub_layer_max_422chroma_constraint_flag' + idx + '[' + i + ']'] = bs.u(1);
          h['sub_layer_max_420chroma_constraint_flag' + idx + '[' + i + ']'] = bs.u(1);
          h['sub_layer_max_monochrome_constraint_flag' + idx + '[' + i + ']'] = bs.u(1);
          h['sub_layer_intra_constraint_flag' + idx + '[' + i + ']'] = bs.u(1);
          h['sub_layer_one_picture_only_constraint_flag' + idx + '[' + i + ']'] = bs.u(1);
          h['sub_layer_lower_bit_rate_constraint_flag' + idx + '[' + i + ']'] = bs.u(1);
          h['sub_layer_reserved_zero_34bits' + idx + '[' + i + ']'] = bs.u(34);
        } else h['sub_layer_reserved_zero_43bits' + idx + '[' + i + ']'] = bs.u(43);

        if (h['sub_layer_profile_idc' + idx + '[' + i + ']'] >= 1 && h['sub_layer_profile_idc' + idx + '[' + i + ']'] <= 5 || h['sub_layer_profile_idc' + idx + '[' + i + ']'] & 0x3e) h['sub_layer_inbld_flag' + idx + '[' + i + ']'] = bs.u(1);else h['sub_layer_reserved_zero_bit' + idx + '[' + i + ']'] = bs.u(1);
      }

      if (h['sub_layer_level_present_flag' + idx + '[' + i + ']']) h['sub_layer_level_idc' + idx + '[' + i + ']'] = bs.u(8);
    }
  };

  bitstream_parser_h265.prototype.hrd_parameters = function (bs, idx, commonInfPresentFlag, maxNumSubLayersMinus1, hrd) {
    var suffix = idx == '' ? '' : '[' + idx + ']';

    if (commonInfPresentFlag) {
      hrd['nal_hrd_parameters_present_flag' + suffix] = bs.u(1);
      hrd['vcl_hrd_parameters_present_flag' + suffix] = bs.u(1);

      if (hrd['nal_hrd_parameters_present_flag' + suffix] || hrd['vcl_hrd_parameters_present_flag' + suffix]) {
        hrd['sub_pic_hrd_params_present_flag' + suffix] = bs.u(1);

        if (hrd['sub_pic_hrd_params_present_flag' + suffix]) {
          hrd['tick_divisor_minus2' + suffix] = bs.u(8);
          hrd['du_cpb_removal_delay_increment_length_minus1' + suffix] = bs.u(5);
          hrd['sub_pic_cpb_params_in_pic_timing_sei_flag' + suffix] = bs.u(1);
          hrd['dpb_output_delay_du_length_minus1' + suffix] = bs.u(5);
        }

        hrd['bit_rate_scale' + suffix] = bs.u(4);
        hrd['cpb_size_scale' + suffix] = bs.u(4);
        if (hrd['sub_pic_hrd_params_present_flag' + suffix]) hrd['cpb_size_du_scale' + suffix] = bs.u(4);
        hrd['initial_cpb_removal_delay_length_minus1' + suffix] = bs.u(5);
        hrd['au_cpb_removal_delay_length_minus1' + suffix] = bs.u(5);
        hrd['dpb_output_delay_length_minus1' + suffix] = bs.u(5);
      }
    }

    for (i = 0; i <= maxNumSubLayersMinus1; i++) {
      hrd['fixed_pic_rate_general_flag' + suffix + '[' + i + ']'] = bs.u(1);
      if (!hrd['fixed_pic_rate_general_flag' + suffix + '[' + i + ']']) hrd['fixed_pic_rate_within_cvs_flag' + suffix + '[' + i + ']'] = bs.u(1);
      if (hrd['fixed_pic_rate_within_cvs_flag' + suffix + '[' + i + ']']) hrd['elemental_duration_in_tc_minus1' + suffix + '[' + i + ']'] = bs.ue();else hrd['low_delay_hrd_flag' + suffix + '[' + i + ']'] = bs.u(1);
      if (!hrd['low_delay_hrd_flag' + suffix + '[' + i + ']']) hrd['cpb_cnt_minus1' + suffix + '[' + i + ']'] = bs.ue();

      if (hrd['nal_hrd_parameters_present_flag' + suffix]) {
        for (var j = 0; j <= i; j++) {
          hrd['nal_bit_rate_value_minus1' + suffix + '[' + i + '][' + j + ']'] = bs.ue();
          hrd['nal_cpb_size_value_minus1' + suffix + '[' + i + '][' + j + ']'] = bs.ue();

          if (hrd['nal_sub_pic_hrd_params_present_flag' + suffix]) {
            hrd['nal_cpb_size_du_value_minus1' + suffix + '[' + i + '][' + j + ']'] = bs.ue();
            hrd['nal_bit_rate_du_value_minus1' + suffix + '[' + i + '][' + j + ']'] = bs.ue();
          }

          hrd['nal_cbr_flag' + suffix + '[' + i + '][' + j + ']'] = bs.u(1);
        }
      }

      if (hrd['vcl_hrd_parameters_present_flag' + suffix]) {
        for (var j = 0; j <= i; j++) {
          hrd['vlc_bit_rate_value_minus1' + suffix + '[' + i + '][' + j + ']'] = bs.ue();
          hrd['vlc_cpb_size_value_minus1' + suffix + '[' + i + '][' + j + ']'] = bs.ue();

          if (hrd['vlc_sub_pic_hrd_params_present_flag' + suffix]) {
            hrd['vlc_cpb_size_du_value_minus1' + suffix + '[' + i + '][' + j + ']'] = bs.ue();
            hrd['vlc_bit_rate_du_value_minus1' + suffix + '[' + i + '][' + j + ']'] = bs.ue();
          }

          hrd['vlc_cbr_flag' + suffix + '[' + i + '][' + j + ']'] = bs.u(1);
        }
      }
    }
  };

  bitstream_parser_h265.prototype.rep_format = function (bs, i, vps) {
    var suffix = '[' + i + ']';
    vps['pic_width_vps_in_luma_samples' + suffix] = bs.u(16);
    vps['pic_height_vps_in_luma_samples' + suffix] = bs.u(16);
    vps['chroma_and_bit_depth_vps_present_flag' + suffix] = bs.u(1);

    if (vps['chroma_and_bit_depth_vps_present_flag' + suffix]) {
      vps['chroma_format_vps_idc' + suffix] = bs.u(2);
      if (vps['chroma_format_vps_idc' + suffix] == 3) vps['separate_colour_plane_vps_flag' + suffix] = bs.u(1);
      vps['bit_depth_vps_luma_minus8' + suffix] = bs.u(4);
      vps['bit_depth_vps_chroma_minus8' + suffix] = bs.u(4);
    }

    vps['conformance_window_vps_flag' + suffix] = bs.u(1);

    if (vps['conformance_window_vps_flag' + suffix]) {
      vps['conf_win_vps_left_offset' + suffix] = bs.ue();
      vps['conf_win_vps_right_offset' + suffix] = bs.ue();
      vps['conf_win_vps_top_offset' + suffix] = bs.ue();
      vps['conf_win_vps_bottom_offset' + suffix] = bs.ue();
    }
  };

  bitstream_parser_h265.prototype.dpb_size = function (bs, i, vps) {
    for (var i = 1; i < vps['#NumOutputLayerSets']; i++) {
      currLsIdx = vps['#OlsIdxToLsIdx[' + i + ']'];
      vps['sub_layer_flag_info_present_flag[' + i + ']'] = bs.u(1);

      for (var j = 0; j <= vps['#MaxSubLayersInLayerSetMinus1[' + currLsIdx + ']']; j++) {
        if (j > 0 && vps['sub_layer_flag_info_present_flag[' + i + ']']) vps['sub_layer_dpb_info_present_flag[' + i + '][' + j + ']'] = bs.u(1);

        if (vps['sub_layer_dpb_info_present_flag[' + i + '][' + j + ']']) {
          for (k = 0; k < vps['#NumLayersInIdList[' + currLsIdx + ']']; k++) {
            if (vps['#NecessaryLayerFlag[' + i + '][' + k + ']'] && (vps['vps_base_layer_internal_flag'] || vps['#LayerSetLayerIdList[' + currLsIdx + '][' + k + ']'] != 0)) vps['max_vps_dec_pic_buffering_minus1[' + i + '][' + k + '][' + j + ']'] = bs.ue();
          }

          vps['max_vps_num_reorder_pics[' + i + '][' + j + ']'] = bs.ue();
          vps['max_vps_latency_increase_plus1[' + i + '][' + j + ']'] = bs.ue();
        }
      }
    }
  };

  bitstream_parser_h265.prototype.vps_vui_bsp_hrd_params = function (bs, vps) {
    vps['vps_num_add_hrd_params'] = bs.ue();

    for (var i = vps['vps_num_hrd_parameters']; i < vps['vps_num_hrd_parameters'] + vps['vps_num_add_hrd_params']; i++) {
      if (i > 0) vps['cprms_add_present_flag[' + i + ']'] = bs.u(1);
      vps['num_sub_layer_hrd_minus1[' + i + ']'] = bs.ue();
      this.hrd_parameters(bs, i, vps['cprms_add_present_flag[' + i + ']'], vps['num_sub_layer_hrd_minus1[' + i + ']'], vps);
    }

    if (vps['vps_num_hrd_parameters'] + vps['vps_num_add_hrd_params'] > 0) {
      for (var h = 1; h < vps['#NumOutputLayerSets']; h++) {
        vps['num_signalled_partitioning_schemes[' + h + ']'] = bs.ue();

        for (var j = 1; j < vps['num_signalled_partitioning_schemes[' + h + ']'] + 1; j++) {
          vps['num_partitions_in_scheme_minus1[' + h + '][' + j + ']'] = bs.ue();

          for (var k = 0; k <= vps['num_partitions_in_scheme_minus1[' + h + '][' + j + ']']; k++) {
            for (var r = 0; r < vps['#NumLayersInIdList[' + vps['#OlsIdxToLsIdx[' + h + ']'] + ']']; r++) {
              vps['layer_included_in_partition_flag[' + h + '][' + j + '][' + k + '][' + r + ']'] = bs.u(1);
            }
          }
        }

        for (var i = 0; i < vps['num_signalled_partitioning_schemes[' + h + ']'] + 1; i++) {
          for (var t = 0; t <= vps['#MaxSubLayersInLayerSetMinus1[' + vps['#OlsIdxToLsIdx[' + h + ']'] + ']']; t++) {
            vps['num_bsp_schedules_minus1[' + h + '][' + i + '][' + t + ']'] = bs.ue();

            for (var j = 0; j <= vps['num_bsp_schedules_minus1[' + h + '][' + i + '][' + t + ']']; j++) {
              for (var k = 0; k <= vps['num_partitions_in_scheme_minus1[' + h + '][' + i + ']']; k++) {
                if (vps['vps_num_hrd_parameters'] + vps['vps_num_add_hrd_params'] > 1) vps['bsp_hrd_idx[' + h + '][' + i + '][' + t + '][' + j + '][' + k + ']'] = bs.u(this.cntbits(vps['vps_num_hrd_parameters'] + vps['vps_num_add_hrd_params']));
                vps['bsp_sched_idx[' + h + '][' + i + '][' + t + '][' + j + '][' + k + ']'] = bs.ue();
              }
            }
          }
        }
      }
    }
  };

  bitstream_parser_h265.prototype.vps_vui = function (bs, vps) {
    vps['cross_layer_pic_type_aligned_flag'] = bs.u(1);
    if (!vps['cross_layer_pic_type_aligned_flag']) vps['cross_layer_irap_aligned_flag'] = bs.u(1);
    if (vps['cross_layer_irap_aligned_flag']) vps['all_layers_idr_aligned_flag'] = bs.u(1);
    vps['bit_rate_present_vps_flag'] = bs.u(1);
    vps['pic_rate_present_vps_flag'] = bs.u(1);
    if (vps['bit_rate_present_vps_flag'] || vps['pic_rate_present_vps_flag']) for (var i = vps['vps_base_layer_internal_flag'] ? 0 : 1; i < vps['#NumLayerSets']; i++) {
      for (var j = 0; j <= vps['#MaxSubLayersInLayerSetMinus1[' + i + ']']; j++) {
        if (vps['bit_rate_present_vps_flag']) vps['bit_rate_present_flag[' + i + '][' + j + ']'] = bs.u(1);
        if (vps['pic_rate_present_vps_flag']) vps['pic_rate_present_flag[' + i + '][' + j + ']'] = bs.u(1);

        if (vps['bit_rate_present_flag[' + i + '][' + j + ']']) {
          vps['avg_bit_rate[' + i + '][' + j + ']'] = bs.u(16);
          vps['max_bit_rate[' + i + '][' + j + ']'] = bs.u(16);
        }

        if (vps['pic_rate_present_flag[' + i + '][' + j + ']']) {
          vps['constant_pic_rate_idc[' + i + '][' + j + ']'] = bs.u(2);
          vps['avg_pic_rate[' + i + '][' + j + ']'] = bs.u(16);
        }
      }
    }
    vps['video_signal_info_idx_present_flag'] = bs.u(1);
    if (vps['video_signal_info_idx_present_flag']) vps['vps_num_video_signal_info_minus1'] = bs.u(4);

    for (var i = 0; i <= vps['vps_num_video_signal_info_minus1']; i++) {
      vps['video_vps_format[' + i + ']'] = bs.u(3);
      vps['video_full_range_vps_flag[' + i + ']'] = bs.u(1);
      vps['colour_primaries_vps[' + i + ']'] = bs.u(8);
      vps['transfer_characteristics_vps[' + i + ']'] = bs.u(8);
      vps['matrix_coeffs_vps[' + i + ']'] = bs.u(8);
    }

    if (vps['video_signal_info_idx_present_flag'] && vps['vps_num_video_signal_info_minus1'] > 0) for (var i = vps['vps_base_layer_internal_flag'] ? 0 : 1; i <= vps['vps_max_layers_minus1']; i++) {
      vps['vps_video_signal_info_idx[' + i + ']'] = bs.u(4);
    }
    vps['tiles_not_in_use_flag'] = bs.u(1);

    if (!vps['tiles_not_in_use_flag']) {
      for (var i = vps['vps_base_layer_internal_flag'] ? 0 : 1; i <= vps['vps_max_layers_minus1']; i++) {
        vps['tiles_in_use_flag[' + i + ']'] = bs.u(1);
        if (vps['tiles_in_use_flag[' + i + ']']) vps['loop_filter_not_across_tiles_flag[' + i + ']'] = bs.u(1);
      }

      for (var i = vps['vps_base_layer_internal_flag'] ? 1 : 2; i <= vps['vps_max_layers_minus1']; i++) {
        for (var j = 0; j < vps['#NumDirectRefLayers[' + vps['layer_id_in_nuh[' + i + ']'] + ']']; j++) {
          var layerIdx = vps['#LayerIdxInVps[' + vps['#IdDirectRefLayer[' + vps['layer_id_in_nuh[' + i + ']']] + '][' + j + ']'];
          if (vps['tiles_in_use_flag[' + i + ']'] && vps['tiles_in_use_flag[' + layerIdx + ']']) vps['tile_boundaries_aligned_flag[' + i + '][' + j + ']'] = bs.u(1);
        }
      }
    }

    vps['wpp_not_in_use_flag'] = bs.u(1);
    if (!vps['wpp_not_in_use_flag']) for (var i = vps['vps_base_layer_internal_flag'] ? 0 : 1; i <= vps['vps_max_layers_minus1']; i++) {
      vps['wpp_in_use_flag[' + i + ']'] = bs.u(1);
    }
    vps['single_layer_for_non_irap_flag'] = bs.u(1);
    vps['higher_layer_irap_skip_flag'] = bs.u(1);
    vps['ilp_restricted_ref_layers_flag'] = bs.u(1);
    if (vps['ilp_restricted_ref_layers_flag']) for (var i = 1; i <= vps['vps_max_layers_minus1']; i++) {
      for (var j = 0; j < vps['#NumDirectRefLayers[' + vps['layer_id_in_nuh[' + i + ']'] + ']']; j++) {
        if (vps['vps_base_layer_internal_flag'] || vps['#IdDirectRefLayer[' + vps['layer_id_in_nuh[' + i + ']'] + '][' + j + ']'] > 0) {
          vps['min_spatial_segment_offset_plus1[' + i + '][' + j + ']'] = bs.ue();

          if (vps['min_spatial_segment_offset_plus1[' + i + '][' + j + ']'] > 0) {
            vps['ctu_based_offset_enabled_flag[' + i + '][' + j + ']'] = bs.u(1);
            if (vps['ctu_based_offset_enabled_flag[' + i + '][' + j + ']']) vps['min_horizontal_ctu_offset_plus1[' + i + '][' + j + ']'] = bs.ue();
          }
        }
      }
    }
    vps['vps_vui_bsp_hrd_present_flag'] = bs.u(1);
    if (vps['vps_vui_bsp_hrd_present_flag']) this.vps_vui_bsp_hrd_params(bs, vps);

    for (var i = 1; i <= vps['vps_max_layers_minus1']; i++) {
      if (vps['#NumDirectRefLayers[' + vps['layer_id_in_nuh[' + i + ']'] + ']'] == 0) vps['base_layer_parameter_set_compatibility_flag[' + i + ']'] = bs.u(1);
    }
  };

  bitstream_parser_h265.prototype.vps_extension = function (bs, vps) {
    if (vps['vps_max_layers_minus1'] > 0 && vps['vps_base_layer_internal_flag']) this.profile_tier_level(bs, 1, 0, vps['vps_max_sub_layers_minus1'], vps);
    vps['splitting_flag'] = bs.u(1);
    var NumScalabilityTypes = 0;

    for (var i = 0; i < 16; i++) {
      vps['scalability_mask_flag[' + i + ']'] = bs.u(1);
      NumScalabilityTypes += vps['scalability_mask_flag[' + i + ']'];
    }

    for (var j = 0; j < NumScalabilityTypes - vps['splitting_flag']; j++) {
      vps['dimension_id_len_minus1[' + j + ']'] = bs.u(3);
    }

    vps['vps_nuh_layer_id_present_flag'] = bs.u(1);

    for (var i = 1; i <= vps['vps_max_layers_minus1']; i++) {
      if (vps['vps_nuh_layer_id_present_flag']) vps['layer_id_in_nuh[' + i + ']'] = bs.u(6);
      if (!vps['splitting_flag']) for (var j = 0; j < NumScalabilityTypes; j++) {
        vps['dimension_id[' + i + '][' + j + ']'] = bs.u(vps['dimension_id_len_minus1[' + j + ']'] + 1);
      }
    }

    vps['#NumViews'] = 1;

    for (var i = 0; i <= vps['vps_max_layers_minus1']; i++) {
      var lId = vps['layer_id_in_nuh[' + i + ']'];

      for (var smIdx = 0, j = 0; smIdx < 16; smIdx++) {
        if (vps['scalability_mask_flag[' + smIdx + ']']) {
          vps['#ScalabilityId[' + i + '][' + smIdx + ']'] = vps['dimension_id[' + i + '][' + j + ']'];
          j++;
        } else vps['#ScalabilityId[' + i + '][' + smIdx + ']'] = 0;
      }

      vps['#DepthLayerFlag[' + lId + ']'] = vps['#ScalabilityId[' + i + '][' + 0 + ']'];
      vps['#ViewOrderIdx[' + lId + ']'] = vps['#ScalabilityId[' + i + '][' + 1 + ']'];
      vps['#DependencyId[' + lId + ']'] = vps['#ScalabilityId[' + i + '][' + 2 + ']'];
      vps['#AuxId[' + lId + ']'] = vps['#ScalabilityId[' + i + '][' + 3 + ']'];

      if (i > 0) {
        var newViewFlag = 1;

        for (var j = 0; j < i; j++) {
          if (vps['#ViewOrderIdx[' + lId + ']'] == vps['#ViewOrderIdx[' + vps['layer_id_in_nuh[' + j + ']'] + ']']) newViewFlag = 0;
        }

        vps['#NumViews'] += newViewFlag;
      }
    }

    vps['view_id_len'] = bs.u(4);
    if (vps['view_id_len'] > 0) for (var i = 0; i < NumViews; i++) {
      vps['view_id_val[' + i + ']'] = bs.u(vps['view_id_len']);
    }
    var NumDirectRefLayers = new Uint8Array(63);

    for (var i = 1; i <= vps['vps_max_layers_minus1']; i++) {
      NumDirectRefLayers[i] = 0;
    }

    for (var j = 0; j < i; j++) {
      vps['direct_dependency_flag[' + i + '][' + j + ']'] = bs.u(1);
    }

    NumDirectRefLayers[j] += vps['direct_dependency_flag[' + i + '][' + j + ']'];

    for (i = 0; i <= vps['vps_max_layers_minus1']; i++) {
      for (j = 0; j <= vps['vps_max_layers_minus1']; j++) {
        vps['#DependencyFlag[' + i + '][' + j + ']'] = vps['direct_dependency_flag[' + i + '][' + j + ']'];

        for (k = 0; k < i; k++) {
          if (vps['direct_dependency_flag[' + i + '][' + k + ']'] && vps['#DependencyFlag[' + k + '][' + j + ']']) vps['#DependencyFlag[' + i + '][' + j + ']'] = 1;
        }
      }
    }

    for (i = 0; i <= vps['vps_max_layers_minus1']; i++) {
      var iNuhLId = vps['layer_id_in_nuh[' + i + ']'];
      var d = 0,
          r = 0,
          p = 0;

      for (var j = 0; j <= vps['vps_max_layers_minus1']; j++) {
        var jNuhLid = vps['layer_id_in_nuh[' + j + ']'];
        if (vps['direct_dependency_flag[' + i + '][' + j + ']']) vps['#IdDirectRefLayer[' + iNuhLId + '][' + d + ']'] = jNuhLid;
        d++;
        if (vps['#DependencyFlag[' + i + '][' + j + ']']) vps['#IdRefLayer[' + iNuhLId + '][' + r + ']'] = jNuhLid;
        r++;
        if (vps['#DependencyFlag[' + j + '][' + i + ']']) vps['#IdPredictedLayerr[' + iNuhLId + '][' + p + ']'] = jNuhLid;
        p++;
      }

      vps['#NumDirectRefLayers[' + iNuhLId + ']'] = d;
      vps['#NumRefLayers[' + iNuhLId + ']'] = r;
      vps['#NumPredictedLayers[' + iNuhLId + ']'] = p;
      vps['#LayerIdxInVps[' + iNuhLId + ']'] = i;
    }

    for (var i = 0; i <= 63; i++) {
      vps['#layerIdInListFlag[' + i + ']'] = 0;
    }

    var k = 0;

    for (var i = 0; i <= vps['vps_max_layers_minus1']; i++) {
      var iNuhLId = vps['layer_id_in_nuh[' + i + ']'];

      if (vps['#NumDirectRefLayers[' + iNuhLId + ']'] == 0) {
        vps['#TreePartitionLayerIdList[' + k + '][' + 0 + ']'] = iNuhLId;

        for (var j = 0, h = 1; j < vps['#NumPredictedLayers[' + iNuhLId + ']']; j++) {
          var predLId = vps['#IdPredictedLayer[' + iNuhLId + '][' + j + ']'];

          if (!vps['#layerIdInListFlag[' + predLId + ']']) {
            vps['#TreePartitionLayerIdList[' + k + '][' + h + ']'] = predLId;
            h++;
            vps['#layerIdInListFlag[' + predLId + ']'] = 1;
          }
        }

        vps['#NumLayersInTreePartition[' + k + ']'] = h;
        k++;
      }
    }

    vps['#NumIndependentLayers'] = k;
    if (vps['#NumIndependentLayers'] > 1) vps['num_add_layer_sets'] = bs.ue();
    vps['#NumLayerSets'] = vps['vps_num_layer_sets_minus1'] + 1 + (vps['num_add_layer_sets'] || 0);
    var nuhLayerIdA = 0;

    for (var i = 0; i < (vps['num_add_layer_sets'] || 0); i++) {
      for (var j = 1; j < vps['#NumIndependentLayers']; j++) {
        vps['highest_layer_idx_plus1[' + i + '][' + j + ']'] = bs.u(this.cntbits(vps['#NumLayersInTreePartition[' + j + ']'] + 1));
      }

      var layerNum = 0;
      var lsIdx = vps['vps_num_layer_sets_minus1'] + 1 + i;

      for (var treeIdx = 1; treeIdx < vps['#NumIndependentLayers']; treeIdx++) {
        for (var layerCnt = 0; layerCnt < vps['highest_layer_idx_plus1[' + i + '][' + treeIdx + ']']; layerCnt++) {
          vps['#LayerSetLayerIdList[' + lsIdx + '][' + layerNum + ']'] = vps['#TreePartitionLayerIdList[' + treeIdx + '][' + layerCnt + ']'];
          layerNum++;
          if (vps['#LayerSetLayerIdList[' + lsIdx + '][' + layerNum + ']'] > nuhLayerIdA) nuhLayerIdA = vps['#LayerSetLayerIdList[' + lsIdx + '][' + layerNum + ']'];
        }
      }

      vps['#NumLayersInIdList[' + lsIdx + ']'] = layerNum;
    }

    vps['vps_sub_layers_max_minus1_present_flag'] = bs.u(1);
    if (vps['vps_sub_layers_max_minus1_present_flag']) for (var i = 0; i <= vps['vps_max_layers_minus1']; i++) {
      vps['sub_layers_vps_max_minus1[' + i + ']'] = bs.u(3);
    }
    vps['max_tid_ref_present_flag'] = bs.u(1);
    if (vps['max_tid_ref_present_flag']) for (var i = 0; i < vps['vps_max_layers_minus1']; i++) {
      for (var j = i + 1; j <= vps['vps_max_layers_minus1']; j++) {
        if (vps['direct_dependency_flag[' + j + '][' + i + ']']) vps['max_tid_il_ref_pics_plus1[' + i + '][' + j + ']'] = bs.u(3);
      }
    }
    vps['default_ref_layers_active_flag'] = bs.u(1);
    vps['vps_num_profile_tier_level_minus1'] = bs.ue();

    for (var i = vps['vps_base_layer_internal_flag'] ? 2 : 1; i <= vps['vps_num_profile_tier_level_minus1']; i++) {
      vps['vps_profile_present_flag[' + i + ']'] = bs.u(1);
      this.profile_tier_level(bs, i, vps['vps_profile_present_flag[' + i + ']'], vps['vps_max_sub_layers_minus1'], vps);
    }

    if (vps['#NumLayerSets'] > 1) {
      vps['num_add_olss'] = bs.ue();
      vps['default_output_layer_idc'] = bs.u(2);
    }

    for (var i = 0; i < vps['#NumLayerSets']; i++) {
      var maxSlMinus1 = 0;

      for (k = 0; k < NumLayersInIdList[i]; k++) {
        lId = vps['#LayerSetLayerIdList[' + i + '][' + k + ']'];
        maxSlMinus1 = Math.max(maxSLMinus1, vps['sub_layers_vps_max_minus1[' + vps['#LayerIdxInVps[' + lId + ']'] + ']']);
      }

      vps['#MaxSubLayersInLayerSetMinus1[' + i + ']'] = maxSlMinus1;
    }

    vps['#NumOutputLayerSets'] = (vps['num_add_olss'] || 0) + vps['#NumLayerSets'];

    for (var i = 1; i < vps['#NumOutputLayerSets']; i++) {
      if (vps['#NumLayerSets'] > 2 && i >= vps['#NumLayerSets']) vps['layer_set_idx_for_ols_minus1[' + i + ']'] = bs.u(this.cntbits(vps['#NumLayerSets'] - 1));
      var OlsIdxToLsIdx = vps['#OlsIdxToLsIdx[' + i + ']'] = i < vps['#NumLayerSets'] ? i : (vps['layer_set_idx_for_ols_minus1[' + i + ']'] || 0) + 1;
      if (i > vps['vps_num_layer_sets_minus1'] || (vps['default_output_layer_idc'] || 0) == 2) for (var j = 0; j < vps['#NumLayersInIdList[' + OlsIdxToLsIdx + ']']; j++) {
        vps['#OutputLayerFlag[' + i + '][' + j + ']'] = vps['output_layer_flag[' + i + '][' + j + ']'] = bs.u(1);
      } else for (var j = 0; j < vps['#NumLayersInIdList[' + OlsIdxToLsIdx + ']']; j++) {
        var defaultOutputLayerIdc = vps['default_output_layer_idc'] || 0;
        if (defaultOutputLayerIdc == 0 || defaultOutputLayerIdc == 1 && vps['#LayerSetLayerIdList[' + OlsIdxToLsIdx + '][' + j + ']'] == nuhLayerIdA) vps['#OutputLayerFlag[' + i + '][' + j + ']'] = 1;
      }
      vps['#NumOutputLayersInOutputLayerSet[' + i + ']'] = 0;

      for (var j = 0; j < vps['#NumLayersInIdList[' + OlsIdxToLsIdx + ']']; j++) {
        vps['#NumOutputLayersInOutputLayerSet[' + i + ']'] += vps['#OutputLayerFlag[' + i + '][' + j + ']'];
        if (vps['#OutputLayerFlag[' + i + '][' + j + ']']) vps['#OlsHighestOutputLayerId[' + i + ']'] = vps['#LayerSetLayerIdList[' + OlsIdxToLsIdx + '][' + j + ']'];
      }

      for (var j = 0; j < vps['#NumLayersInIdList[' + OlsIdxToLsIdx + ']']; j++) {
        vps['#NecessaryLayerFlag[' + i + '][' + j + ']'] = vps['#OutputLayerFlag[' + i + '][' + j + ']'];
        var currLayerId = vps['#LayerSetLayerIdList[' + j + '][' + rLsLayerIdx + ']'];

        for (var rLsLayerIdx = 0; rLsLayerIdx < j; rLsLayerIdx++) {
          var refLayerId = vps['#LayerSetLayerIdList[' + j + '][' + rLsLayerIdx + ']'];
          if (vps['#DependencyFlag[' + vps['#LayerIdxInVps[' + currLayerId + ']'] + '][' + vps['#LayerIdxInVps[' + refLayerId + ']'] + ']']) vps['#NecessaryLayerFlag[' + i + '][' + j + ']'] = 1;
        }
      }

      for (var j = 0; j < vps['#NumLayersInIdList[' + OlsIdxToLsIdx + ']']; j++) {
        if (vps['#NecessaryLayerFlag[' + i + '][' + j + ']'] && vps['vps_num_profile_tier_level_minus1'] > 0) vps['profile_tier_level_idx[' + i + '][' + j + ']'] = bs.u(this.cntbits(vps['vps_num_profile_tier_level_minus1'] + 1));
      }

      if (vps['#NumOutputLayersInOutputLayerSet[' + i + ']'] == 1 && vps['#NumDirectRefLayers[' + vps['#OlsHighestOutputLayerId[' + i + ']'] + ']'] > 0) vps['alt_output_layer_flag[' + i + ']'] = bs.u(1);
    }

    vps['vps_num_rep_formats_minus1'] = bs.ue();

    for (var i = 0; i <= vps['vps_num_rep_formats_minus1']; i++) {
      this.rep_format(bs, i, vps);
    }

    if (vps['vps_num_rep_formats_minus1'] > 0) vps['rep_format_idx_present_flag'] = bs.u(1);

    if (vps['rep_format_idx_present_flag']) {
      var nbits = this.cntbits(vps['vps_num_rep_formats_minus1'] + 1);

      for (var i = vps['vps_base_layer_internal_flag'] ? 1 : 0; i <= vps['vps_max_layers_minus1']; i++) {
        vps['vps_rep_format_idx[' + i + ']'] = bs.u(nbits);
      }
    }

    vps['max_one_active_ref_layer_flag'] = bs.u(1);
    vps['vps_poc_lsb_aligned_flag'] = bs.u(1);

    for (var i = 1; i <= vps['vps_max_layers_minus1']; i++) {
      if (vps['#NumDirectRefLayers[' + (vps['layer_id_in_nuh[' + i + ']'] || 0) + ']'] == 0) vps['poc_lsb_not_present_flag[' + i + ']'] = bs.u(1);
    }

    this.dpb_size(bs, vps);
    vps['direct_dep_type_len_minus2'] = bs.ue();
    vps['direct_dependency_all_layers_flag'] = bs.u(1);
    if (vps['direct_dependency_all_layers_flag']) vps['direct_dependency_all_layers_type'] = bs.u(vps['direct_dep_type_len_minus2'] + 2);else {
      for (var i = vvps['ps_base_layer_internal_flag'] ? 1 : 2; i <= vps['vps_max_layers_minus1']; i++) {
        for (var j = vps['vps_base_layer_internal_flag'] ? 0 : 1; j < i; j++) {
          if (vps['direct_dependency_flag[' + i + '][' + j + ']']) vps['direct_dependency_type[' + i + '][' + j + ']'] = bs.u(vps['direct_dep_type_len_minus2'] + 2);
        }
      }
    }
    vps['vps_non_vui_extension_length'] = bs.ue();

    for (var i = 1; i <= vps['vps_non_vui_extension_length']; i++) {
      vps['vps_non_vui_extension_data_byte'] = bs.u(8);
    }

    vps['vps_vui_present_flag'] = bs.u(1);

    if (vps['vps_vui_present_flag']) {
      while (!bs.bytealign()) {
        bs.u(1);
      }

      this.vps_vui(bs, vps);
    }
  };

  bitstream_parser_h265.prototype.vps_3d_extension = function (bs, vps) {
    vps['cp_precision'] = bs.ue();

    for (var n = 1; n < vps['#NumViews']; n++) {
      i = vps['#ViewOIdxList[' + n + ']'];
      vps['num_cp[' + i + ']'] = bs.u(6);

      if (vps['num_cp[' + i + ']'] > 0) {
        vps['cp_in_slice_segment_header_flag[' + i + ']'] = bs.u(1);

        for (var m = 0; m < vps['num_cp[' + i + ']']; m++) {
          vps['cp_ref_voi[' + i + '][' + m + ']'] = bs.ue();

          if (!vps['cp_in_slice_segment_header_flag[' + i + ']']) {
            var j = vps['cp_ref_voi[' + i + '][' + m + ']'];
            vps['vps_cp_scale[' + i + '][' + j + ']'] = bs.se();
            vps['vps_cp_off[' + i + '][' + j + ']'] = bs.se();
            vps['vps_cp_inv_scale_plus_scale[' + i + '][' + j + ']'] = bs.se();
            vps['vps_cp_inv_off_plus_off[' + i + '][' + j + ']'] = bs.se();
          }
        }
      }
    }
  };

  bitstream_parser_h265.prototype.parse_vps = function (bs, vps) {
    vps['vps_video_parameter_set_id'] = bs.u(4);
    vps['vps_base_layer_internal_flag'] = bs.u(1);
    vps['vps_base_layer_available_flag '] = bs.u(1);
    vps['vps_max_layers_minus1'] = bs.u(6);
    vps['vps_max_sub_layers_minus1'] = bs.u(3);
    vps['vps_temporal_id_nesting_flag'] = bs.u(1);
    vps['vps_reserved_0xffff_16bits'] = bs.u(16);
    this.profile_tier_level(bs, '', 1, vps['vps_max_sub_layers_minus1'], vps);
    vps['vps_sub_layer_ordering_info_present_flag'] = bs.u(1);

    for (var i = vps['vps_sub_layer_ordering_info_present_flag'] ? 0 : vps['vps_max_sub_layers_minus1']; i <= vps['vps_max_sub_layers_minus1']; i++) {
      vps['vps_max_dec_pic_buffering_minus1[' + i + ']'] = bs.ue();
      vps['vps_max_num_reorder_pics[' + i + ']'] = bs.ue();
      vps['vps_max_latency_increase_plus1[' + i + ']'] = bs.ue();
    }

    vps['vps_max_layer_id'] = bs.u(6);
    vps['vps_num_layer_sets_minus1'] = bs.ue();

    for (var i = 1; i <= vps['vps_num_layer_sets_minus1']; i++) {
      for (var j = 0; j <= vps['vps_max_layer_id']; j++) {
        vps['layer_id_included_flag[' + i + '][' + j + ']'] = bs.u(1);
      }
    }

    vps['vps_timing_info_present_flag'] = bs.u(1);

    if (vps['vps_timing_info_present_flag']) {
      vps['vps_num_units_in_tick'] = bs.u(32);
      vps['vps_time_scale'] = bs.u(32);
      vps['vps_poc_proportional_to_timing_flag'] = bs.u(1);
      if (vps['vps_poc_proportional_to_timing_flag']) vps['vps_num_ticks_poc_diff_one_minus1'] = bs.ue();
      vps['vps_num_hrd_parameters'] = bs.ue();

      for (var i = 0; i < vps['vps_num_hrd_parameters']; i++) {
        vps['hrd_layer_set_idx[' + i + ']'] = bs.ue();
        if (i > 0) vps['cprms_present_flag[' + i + ']'] = bs.u(1);
        this.hrd_parameters(bs, i, i == 0 || vps['cprms_present_flag[' + i + ']'], vps['vps_max_sub_layers_minus1'], vps);
      }
    }

    vps['vps_extension_flag'] = bs.u(1);

    if (vps['vps_extension_flag']) {
      while (!bs.bytealign()) {
        bs.u(1);
      }

      this.vps_extension(bs, vps);
      vps['vps_extension2_flag'] = bs.u(1);

      if (vps['vps_extension2_flag']) {
        vps['vps_3d_extension_flag'] = bs.u(1);

        if (vps['vps_3d_extension_flag']) {
          while (!bs.bytealign()) {
            bs.u(1);
          }

          this.vps_3d_extension(bs, vui);
        }

        vps['vps_extension3_flag'] = bs.u(1);
        if (vps['vps_extension3_flag']) for (var i = 0; more_rbsp_data(bs); i++) {
          vps['vps_extension_data_flag[' + i + ']'] = bs.u(1);
        }
      }
    }

    return vps;
  };

  bitstream_parser_h265.prototype.short_term_ref_pic_set = function (bs, stRpsIdx, num_short_term_ref_pic_sets, rps, sps) {
    var idx = stRpsIdx == num_short_term_ref_pic_sets ? '' : '[' + stRpsIdx + ']';
    if (stRpsIdx > 0) rps['inter_ref_pic_set_prediction_flag' + idx] = bs.u(1);

    if (rps['inter_ref_pic_set_prediction_flag' + idx]) {
      if (stRpsIdx == num_short_term_ref_pic_sets) rps['delta_idx_minus1' + idx] = bs.ue();
      rps['delta_rps_sign' + idx] = bs.u(1);
      rps['abs_delta_rps_minus1' + idx] = bs.ue();
      var RefRpsIdx = stRpsIdx - 1 - (stRpsIdx == num_short_term_ref_pic_sets ? rps['delta_idx_minus1' + idx] : 0);
      var deltaRps = (1 - 2 * rps['delta_rps_sign' + idx]) * (rps['abs_delta_rps_minus1' + idx] + 1);
      var RefNumDeltaPocs = sps['#NumDeltaPocs[' + RefRpsIdx + ']'];
      var NumDeltaPocs = 0;

      for (var j = 0; j <= RefNumDeltaPocs; j++) {
        rps['used_by_curr_pic_flag' + idx + '[' + j + ']'] = bs.u(1);
        if (rps['used_by_curr_pic_flag' + idx + '[' + j + ']'] == 0) rps['use_delta_flag' + idx + '[' + j + ']'] = bs.u(1);
        if (rps['used_by_curr_pic_flag' + idx + '[' + j + ']'] || rps['use_delta_flag' + idx + '[' + j + ']']) NumDeltaPocs++;
      }

      rps['#NumDeltaPocs' + idx] = NumDeltaPocs;
    } else {
      rps['num_negative_pics' + idx] = bs.ue();
      rps['num_positive_pics' + idx] = bs.ue();

      for (var j = 0; j < rps['num_negative_pics' + idx]; j++) {
        rps['delta_poc_s0_minus1' + idx + '[' + j + ']'] = bs.ue();
        rps['used_by_curr_pic_s0_flag' + idx + '[' + j + ']'] = bs.u(1);
      }

      for (var j = 0; j < rps['num_positive_pics' + idx]; j++) {
        rps['delta_poc_s1_minus1' + idx + '[' + j + ']'] = bs.ue();
        rps['used_by_curr_pic_s1_flag' + idx + '[' + j + ']'] = bs.u(1);
      }

      rps['#NumDeltaPocs' + idx] = rps['num_negative_pics' + idx] + rps['num_positive_pics' + idx];
    }
  };

  bitstream_parser_h265.prototype.scaling_list_data = function (bs, list) {
    for (var sizeId = 0; sizeId < 4; sizeId++) {
      for (var matrixId = 0; matrixId < (sizeId == 3 ? 2 : 6); matrixId++) {
        list['scaling_list_pred_mode_flag[' + sizeId + '][' + matrixId + ']'] = bs.u(1);
        if (!list['scaling_list_pred_mode_flag[' + sizeId + '][' + matrixId + ']']) list['scaling_list_pred_matrix_id_delta[' + sizeId + '][' + matrixId + ']'] = bs.ue();else {
          var nextCoef = 8;
          var coefNum = Math.min(64, 1 << 4 + (sizeId << 1));

          if (sizeId > 1) {
            var scaling_list_dc_coef_minus8 = bs.se();
            nextCoef = scaling_list_dc_coef_minus8 + 8;
          }
          var scalingList = new Array(coefNum);

          for (var i = 0; i < coefNum; i++) {
            var scaling_list_delta_coef = bs.se();
            nextCoef = (nextCoef + scaling_list_delta_coef + 256) % 256;
            scalingList[i] = nextCoef;
          }

          list['scaling_list_pred_mode_flag[' + sizeId + '][' + matrixId + ']'] = scalingList;
        }
      }
    }
  };

  bitstream_parser_h265.prototype.parse_sps = function (bs, sps) {
    sps['sps_video_parameter_set_id'] = bs.u(4);
    sps['sps_max_sub_layers_minus1'] = bs.u(3);
    sps['sps_temporal_id_nesting_flag'] = bs.u(1);
    this.profile_tier_level(bs, '', 1, sps['sps_max_sub_layers_minus1'], sps);
    sps['sps_seq_parameter_set_id'] = bs.ue();
    sps['chroma_format_idc'] = bs.ue();
    if (sps['chroma_format_idc'] == 3) sps['separate_colour_plane_flag'] = bs.u(1);
    sps['pic_width_in_luma_samples'] = bs.ue();
    sps['pic_height_in_luma_samples'] = bs.ue();
    sps['conformance_window_flag'] = bs.u(1);

    if (sps['conformance_window_flag']) {
      sps['conf_win_left_offset'] = bs.ue();
      sps['conf_win_right_offset'] = bs.ue();
      sps['conf_win_top_offset'] = bs.ue();
      sps['conf_win_bottom_offset'] = bs.ue();
    }

    sps['bit_depth_luma_minus8'] = bs.ue();
    sps['bit_depth_chroma_minus8'] = bs.ue();
    sps['log2_max_pic_order_cnt_lsb_minus4'] = bs.ue();
    sps['sps_sub_layer_ordering_info_present_flag'] = bs.u(1);

    for (var i = sps['sps_sub_layer_ordering_info_present_flag'] ? 0 : sps['sps_max_sub_layers_minus1']; i <= sps['sps_max_sub_layers_minus1']; i++) {
      sps['sps_max_dec_pic_buffering_minus1[' + i + ']'] = bs.ue();
      sps['sps_max_num_reorder_pics[' + i + ']'] = bs.ue();
      sps['sps_max_latency_increase_plus1[' + i + ']'] = bs.ue();
    }

    sps['log2_min_luma_coding_block_size_minus3'] = bs.ue();
    sps['log2_diff_max_min_luma_coding_block_size'] = bs.ue();
    sps['log2_min_transform_block_size_minus2'] = bs.ue();
    sps['log2_diff_max_min_transform_block_size'] = bs.ue();
    sps['max_transform_hierarchy_depth_inter'] = bs.ue();
    sps['max_transform_hierarchy_depth_intra'] = bs.ue();
    sps['scaling_list_enabled_flag'] = bs.u(1);

    if (sps['scaling_list_enabled_flag']) {
      sps['sps_scaling_list_data_present_flag'] = bs.u(1);
      if (sps['sps_scaling_list_data_present_flag']) this.scaling_list_data(bs, sps);
    }

    sps['amp_enabled_flag'] = bs.u(1);
    sps['sample_adaptive_offset_enabled_flag'] = bs.u(1);
    sps['pcm_enabled_flag'] = bs.u(1);

    if (sps['pcm_enabled_flag']) {
      sps['pcm_sample_bit_depth_luma_minus1'] = bs.u(4);
      sps['pcm_sample_bit_depth_chroma_minus1'] = bs.u(4);
      sps['log2_min_pcm_luma_coding_block_size_minus3'] = bs.ue();
      sps['log2_diff_max_min_pcm_luma_coding_block_size'] = bs.ue();
      sps['pcm_loop_filter_disabled_flag'] = bs.u(1);
    }

    sps['num_short_term_ref_pic_sets'] = bs.ue();

    for (var i = 0; i < sps['num_short_term_ref_pic_sets']; i++) {
      this.short_term_ref_pic_set(bs, i, sps['num_short_term_ref_pic_sets'], sps, sps);
    }

    sps['long_term_ref_pics_present_flag'] = bs.u(1);

    if (sps['long_term_ref_pics_present_flag']) {
      sps['num_long_term_ref_pics_sps'] = bs.ue();

      for (var i = 0; i < sps['num_long_term_ref_pics_sps']; i++) {
        sps['lt_ref_pic_poc_lsb_sps[' + i + ']'] = bs.u(sps['log2_max_pic_order_cnt_lsb_minus4'] + 4);
        sps['used_by_curr_pic_lt_sps_flag[' + i + ']'] = bs.u(1);
      }
    }

    sps['sps_temporal_mvp_enabled_flag'] = bs.u(1);
    sps['strong_intra_smoothing_enabled_flag'] = bs.u(1);
    sps['vui_parameters_present_flag'] = bs.u(1);

    if (sps['vui_parameters_present_flag']) {
      sps['aspect_ratio_info_present_flag'] = bs.u(1);

      if (sps['aspect_ratio_info_present_flag']) {
        sps['aspect_ratio_idc'] = bs.u(8);

        if (sps['aspect_ratio_idc'] == 255) {
          sps['sar_width'] = bs.u(16);
          sps['sar_height'] = bs.u(16);
        }
      }

      sps['overscan_info_present_flag'] = bs.u(1);
      if (sps['overscan_info_present_flag']) sps['overscan_appropriate_flag'] = bs.u(1);
      sps['video_signal_type_present_flag'] = bs.u(1);

      if (sps['video_signal_type_present_flag']) {
        sps['video_format'] = bs.u(3);
        sps['video_full_range_flag'] = bs.u(1);
        sps['colour_description_present_flag'] = bs.u(1);

        if (sps['colour_description_present_flag']) {
          sps['colour_primaries'] = bs.u(8);
          sps['transfer_characteristics'] = bs.u(8);
          sps['matrix_coeffs'] = bs.u(8);
        }
      }

      sps['chroma_loc_info_present_flag'] = bs.u(1);

      if (sps['chroma_loc_info_present_flag']) {
        sps['chroma_sample_loc_type_top_field'] = bs.ue();
        sps['chroma_sample_loc_type_bottom_field'] = bs.ue();
      }

      sps['neutral_chroma_indication_flag'] = bs.u(1);
      sps['field_seq_flag'] = bs.u(1);
      sps['frame_field_info_present_flag'] = bs.u(1);
      sps['default_display_window_flag'] = bs.u(1);

      if (sps['default_display_window_flag']) {
        sps['def_disp_win_left_offset'] = bs.ue();
        sps['def_disp_win_right_offset'] = bs.ue();
        sps['def_disp_win_top_offset'] = bs.ue();
        sps['def_disp_win_bottom_offset'] = bs.ue();
      }

      sps['vui_timing_info_present_flag'] = bs.u(1);

      if (sps['vui_timing_info_present_flag']) {
        sps['vui_num_units_in_tick'] = bs.u(32);
        sps['vui_time_scale'] = bs.u(32);
        sps['vui_poc_proportional_to_timing_flag'] = bs.u(1);
        if (sps['vui_poc_proportional_to_timing_flag']) sps['vui_num_ticks_poc_diff_one_minus1'] = bs.ue();
        sps['vui_hrd_parameters_present_flag'] = bs.u(1);
        if (sps['vui_hrd_parameters_present_flag']) this.hrd_parameters(bs, '', 1, sps['sps_max_sub_layers_minus1'], sps);
      }

      sps['bitstream_restriction_flag'] = bs.u(1);

      if (sps['bitstream_restriction_flag']) {
        sps['tiles_fixed_structure_flag'] = bs.u(1);
        sps['motion_vectors_over_pic_boundaries_flag'] = bs.u(1);
        sps['restricted_ref_pic_lists_flag'] = bs.u(1);
        sps['min_spatial_segmentation_idc'] = bs.ue();
        sps['max_bytes_per_pic_denom'] = bs.ue();
        sps['max_bits_per_min_cu_denom'] = bs.ue();
        sps['log2_max_mv_length_horizontal'] = bs.ue();
        sps['log2_max_mv_length_vertical'] = bs.ue();
      }
    }

    sps['sps_extension_flag'] = bs.u(1);

    if (sps['sps_extension_flag']) {
      sps['sps_range_extension_flag'] = bs.u(1);
      sps['sps_multilayer_extension_flag'] = bs.u(1);
      sps['sps_3d_extension_flag'] = bs.u(1);
      sps['sps_extension_5bits'] = bs.u(5);
    }

    if (sps['sps_range_extension_flag']) {
      sps['transform_skip_rotation_enabled_flag'] = bs.u(1);
      sps['transform_skip_context_enabled_flag'] = bs.u(1);
      sps['implicit_rdpcm_enabled_flag'] = bs.u(1);
      sps['explicit_rdpcm_enabled_flag'] = bs.u(1);
      sps['extended_precision_processing_flag'] = bs.u(1);
      sps['intra_smoothing_disabled_flag'] = bs.u(1);
      sps['high_precision_offsets_enabled_flag'] = bs.u(1);
      sps['persistent_rice_adaptation_enabled_flag'] = bs.u(1);
      sps['cabac_bypass_alignment_enabled_flag'] = bs.u(1);
    }

    if (sps['sps_multilayer_extension_flag']) {
      sps['inter_view_mv_vert_constraint_flag'] = bs.u(1);
    }

    if (sps['sps_3d_extension_flag']) {
      for (var d = 0; d <= 1; d++) {
        sps['iv_di_mc_enabled_flag[' + d + ']'] = bs.u(1);
        sps['iv_mv_scal_enabled_flag[' + d + ']'] = bs.u(1);

        if (d == 0) {
          sps['log2_ivmc_sub_pb_size_minus3'] = bs.ue();
          sps['iv_res_pred_enabled_flag'] = bs.u(1);
          sps['depth_ref_enabled_flag'] = bs.u(1);
          sps['vsp_mc_enabled_flag'] = bs.u(1);
          sps['dbbp_enabled_flag'] = bs.u(1);
        } else {
          sps['tex_mc_enabled_flag'] = bs.u(1);
          sps['log2_texmc_sub_pb_size_minus3'] = bs.ue();
          sps['intra_contour_enabled_flag'] = bs.u(1);
          sps['intra_dc_only_wedge_enabled_flag'] = bs.u(1);
          sps['cqt_cu_part_pred_enabled_flag'] = bs.u(1);
          sps['inter_dc_only_enabled_flag'] = bs.u(1);
          sps['skip_intra_enabled_flag'] = bs.u(1);
        }
      }
    }

    if (sps['sps_extension_5bits']) {
      for (var i = 0; more_rbsp_data(bs); i++) {
        sps['sps_extension_5bits[' + i + ']'] = bs.u(1);
      }
    }
  };

  bitstream_parser_h265.prototype.colour_mapping_octants = function (pps, inpDepth, idxY, idxCb, idxCr, inpLength) {
    if (inpDepth < pps['cm_octant_depth']) pps['split_octant_flag[' + inpDepth + ']'] = bs.u(1);
    if (pps['split_octant_flag[' + inpDepth + ']']) for (var k = 0; k < 2; k++) {
      for (var m = 0; m < 2; m++) {
        for (var n = 0; n < 2; n++) {
          this.colour_mapping_octants(pps, inpDepth + 1, idxY + (PartNumY * k * inpLength >> 1), idxCb + (m * inpLength >> 1), idxCr + (n * inpLength >> 1), inpLength >> 1);
        }
      }
    } else for (var i = 0; i < 1 << pps['cm_y_part_num_log2']; i++) {
      var idxShiftY = idxY + (i << pps['cm_octant_depth'] - inpDepth);

      for (var j = 0; j < 4; j++) {
        var coded_res_flag = pps['coded_res_flag[' + idxShiftY + '][' + idxCb + '][' + idxCr + '][' + j + ']'] = bs.u(1);

        if (coded_res_flag) {
          for (var c = 0; c < 3; c++) {
            var res_coeff_q = pps['res_coeff_q[' + idxShiftY + '][' + idxCb + '][' + idxCr + '][' + j + '][' + c + ']'] = bs.ue();
            var res_coeff_r = pps['res_coeff_r[' + idxShiftY + '][' + idxCb + '][' + idxCr + '][' + j + '][' + c + ']'] = bs.ue();
            if (res_coeff_q || res_coeff_r) pps['res_coeff_s[' + idxShiftY + '][' + idxCb + '][' + idxCr + '][' + j + '][' + c + ']'] = bs.u(1);
          }
        }
      }
    }
  };

  bitstream_parser_h265.prototype.delta_dlt = function (pps, i) {
    pps['num_val_delta_dlt[' + i + ']'] = bs.u(pps['pps_bit_depth_for_depth_layers_minus8'] + 8);

    if (pps['num_val_delta_dlt[' + i + ']'] > 0) {
      if (pps['num_val_delta_dlt[' + i + ']'] > 1) pps['max_diff[' + i + ']'] = bs.u(pps['pps_bit_depth_for_depth_layers_minus8'] + 8);
      var min_diff_minus1 = pps['max_diff[' + i + ']'] - 1;
      if (pps['num_val_delta_dlt[' + i + ']'] > 2 && pps['max_diff[' + i + ']'] > 0) min_diff_minus1 = pps['min_diff_minus1[' + i + ']'] = bs.u(this.cntbits(pps['max_diff[' + i + ']']));
      pps['delta_dlt_val0[' + i + ']'] = bs.u(pps['pps_bit_depth_for_depth_layers_minus8'] + 8);

      if (pps['max_diff[' + i + ']'] > min_diff_minus1 + 1) {
        var nbits = this.cntbits(pps['max_diff[' + i + ']'] - min_diff_minus1 + 2);

        for (var k = 1; k < pps['num_val_delta_dlt[' + i + ']']; k++) {
          pps['delta_val_diff_minus_min[' + k + ']'] = bs.u(nbits);
        }
      }
    }
  };

  bitstream_parser_h265.prototype.parse_pps = function (bs, pps) {
    pps['pps_pic_parameter_set_id'] = bs.ue();
    pps['pps_seq_parameter_set_id'] = bs.ue();
    pps['dependent_slice_segments_enabled_flag'] = bs.u(1);
    pps['output_flag_present_flag'] = bs.u(1);
    pps['num_extra_slice_header_bits'] = bs.u(3);
    pps['sign_data_hiding_enabled_flag'] = bs.u(1);
    pps['cabac_init_present_flag'] = bs.u(1);
    pps['num_ref_idx_l0_default_active_minus1'] = bs.ue();
    pps['num_ref_idx_l1_default_active_minus1'] = bs.ue();
    pps['init_qp_minus26'] = bs.se();
    pps['constrained_intra_pred_flag'] = bs.u(1);
    pps['transform_skip_enabled_flag'] = bs.u(1);
    pps['cu_qp_delta_enabled_flag'] = bs.u(1);
    if (pps['cu_qp_delta_enabled_flag']) pps['diff_cu_qp_delta_depth'] = bs.ue();
    pps['pps_cb_qp_offset'] = bs.se();
    pps['pps_cr_qp_offset'] = bs.se();
    pps['pps_slice_chroma_qp_offsets_present_flag'] = bs.u(1);
    pps['weighted_pred_flag'] = bs.u(1);
    pps['weighted_bipred_flag'] = bs.u(1);
    pps['transquant_bypass_enabled_flag'] = bs.u(1);
    pps['tiles_enabled_flag'] = bs.u(1);
    pps['entropy_coding_sync_enabled_flag'] = bs.u(1);

    if (pps['tiles_enabled_flag']) {
      pps['num_tile_columns_minus1'] = bs.ue();
      pps['num_tile_rows_minus1'] = bs.ue();
      pps['uniform_spacing_flag'] = bs.u(1);

      if (pps['uniform_spacing_flag'] == 0) {
        for (var i = 0; i < pps['num_tile_columns_minus1']; i++) {
          pps['column_width_minus1[' + i + ']'] = bs.ue();
        }

        for (var i = 0; i < pps['num_tile_rows_minus1']; i++) {
          pps['row_height_minus1[' + i + ']'] = bs.ue();
        }
      }

      pps['loop_filter_across_tiles_enabled_flag'] = bs.u(1);
    }

    pps['pps_loop_filter_across_slices_enabled_flag'] = bs.u(1);
    pps['deblocking_filter_control_present_flag'] = bs.u(1);

    if (pps['deblocking_filter_control_present_flag']) {
      pps['deblocking_filter_override_enabled_flag'] = bs.u(1);
      pps['pps_deblocking_filter_disabled_flag'] = bs.u(1);

      if (pps['pps_deblocking_filter_disabled_flag'] == 0) {
        pps['pps_beta_offset_div2'] = bs.se();
        pps['pps_tc_offset_div2'] = bs.se();
      }
    }

    pps['pps_scaling_list_data_present_flag'] = bs.u(1);
    if (pps['pps_scaling_list_data_present_flag']) this.scaling_list_data(bs, pps);
    pps['lists_modification_present_flag'] = bs.u(1);
    pps['log2_parallel_merge_level_minus2'] = bs.ue();
    pps['slice_segment_header_extension_present_flag'] = bs.u(1);
    pps['pps_extension_present_flag'] = bs.u(1);

    if (pps['pps_extension_present_flag']) {
      pps['pps_range_extension_flag'] = bs.u(1);
      pps['pps_multilayer_extension_flag'] = bs.u(1);
      pps['pps_3d_extension_flag'] = bs.u(1);
      pps['pps_extension_5bits'] = bs.u(5);
    }

    if (pps['pps_range_extension_flag']) {
      if (pps['transform_skip_enabled_flag']) pps['log2_max_transform_skip_block_size_minus2'] = bs.ue();
      pps['cross_component_prediction_enabled_flag'] = bs.u(1);
      pps['chroma_qp_offset_list_enabled_flag'] = bs.u(1);

      if (pps['chroma_qp_offset_list_enabled_flag']) {
        pps['diff_cu_chroma_qp_offset_depth'] = bs.ue();
        pps['chroma_qp_offset_list_len_minus1'] = bs.ue();

        for (var i = 0; i <= pps['chroma_qp_offset_list_len_minus1']; i++) {
          pps['cb_qp_offset_list[' + i + ']'] = bs.se();
          pps['cr_qp_offset_list[' + i + ']'] = bs.se();
        }
      }

      pps['log2_sao_offset_scale_luma'] = bs.ue();
      pps['log2_sao_offset_scale_chroma'] = bs.ue();
    }

    if (pps['pps_multilayer_extension_flag']) {
      pps['poc_reset_info_present_flag'] = bs.u(1);
      pps['pps_infer_scaling_list_flag'] = bs.u(1);
      if (pps['pps_infer_scaling_list_flag']) pps['pps_scaling_list_ref_layer_id'] = bs.u(6);
      pps['num_ref_loc_offsets'] = bs.ue();

      for (var i = 0; i < pps['num_ref_loc_offsets']; i++) {
        pps['ref_loc_offset_layer_id[' + i + ']'] = bs.u(6);
        pps['scaled_ref_layer_offset_present_flag[' + i + ']'] = bs.u(1);

        if (pps['scaled_ref_layer_offset_present_flag[' + i + ']']) {
          pps['scaled_ref_layer_left_offset[ ref_loc_offset_layer_id[' + i + ']]'] = bs.se();
          pps['scaled_ref_layer_top_offset[ ref_loc_offset_layer_id[' + i + ']]'] = bs.se();
          pps['scaled_ref_layer_right_offset[ ref_loc_offset_layer_id[' + i + ']]'] = bs.se();
          pps['scaled_ref_layer_bottom_offset[ ref_loc_offset_layer_id[' + i + ']]'] = bs.se();
        }

        pps['ref_region_offset_present_flag[' + i + ']'] = bs.u(1);

        if (pps['ref_region_offset_present_flag[' + i + ']']) {
          pps['ref_region_left_offset[ ref_loc_offset_layer_id[' + i + ']]'] = bs.se();
          pps['ref_region_top_offset[ ref_loc_offset_layer_id[' + i + ']]'] = bs.se();
          pps['ref_region_right_offset[ ref_loc_offset_layer_id[' + i + ']]'] = bs.se();
          pps['ref_region_bottom_offset[ ref_loc_offset_layer_id[' + i + ']]'] = bs.se();
        }

        pps['resample_phase_set_present_flag[' + i + ']'] = bs.u(1);

        if (pps['resample_phase_set_present_flag[' + i + ']']) {
          pps['phase_hor_luma[ ref_loc_offset_layer_id[' + i + ']]'] = bs.ue();
          pps['phase_ver_luma[ ref_loc_offset_layer_id[' + i + ']]'] = bs.ue();
          pps['phase_hor_chroma_plus8[ ref_loc_offset_layer_id[' + i + ']]'] = bs.ue();
          pps['phase_ver_chroma_plus8[ ref_loc_offset_layer_id[' + i + ']]'] = bs.ue();
        }
      }

      pps['colour_mapping_enabled_flag'] = bs.u(1);

      if (pps['colour_mapping_enabled_flag']) {
        pps['num_cm_ref_layers_minus1'] = bs.ue();

        for (var i = 0; i <= pps['num_cm_ref_layers_minus1']; i++) {
          pps['cm_ref_layer_id[' + i + ']'] = bs.u(6);
        }

        pps['cm_octant_depth'] = bs.u(2);
        pps['cm_y_part_num_log2'] = bs.u(2);
        pps['luma_bit_depth_cm_input_minus8'] = bs.ue();
        pps['chroma_bit_depth_cm_input_minus8'] = bs.ue();
        pps['luma_bit_depth_cm_output_minus8'] = bs.ue();
        pps['chroma_bit_depth_cm_output_minus8'] = bs.ue();
        pps['cm_res_quant_bits'] = bs.u(2);
        pps['cm_delta_flc_bits_minus1'] = bs.u(2);

        if (pps['cm_octant_depth'] == 1) {
          pps['cm_adapt_threshold_u_delta'] = bs.se();
          pps['cm_adapt_threshold_v_delta'] = bs.se();
        }

        this.colour_mapping_octants(pps, 0, 0, 0, 0, 1 << pps['cm_octant_depth']);
      }
    }

    if (pps['pps_3d_extension_flag']) {
      pps['dlts_present_flag'] = bs.u(1);

      if (pps['dlts_present_flag']) {
        pps['pps_depth_layers_minus1'] = bs.u(6);
        pps['pps_bit_depth_for_depth_layers_minus8'] = bs.u(4);

        for (var i = 0; i <= pps['pps_bit_depth_for_depth_layers_minus8']; i++) {
          pps['dlt_flag[' + i + ']'] = bs.u(1);

          if (pps['dlt_flag[' + i + ']']) {
            pps['dlt_pred_flag[' + i + ']'] = bs.u(1);
            if (!pps['dlt_pred_flag[' + i + ']']) pps['dlt_val_flags_present_flag[' + i + ']'] = bs.u(1);
            if (pps['dlt_val_flags_present_flag[' + i + ']']) for (var j = 0; j <= (1 << pps['pps_bit_depth_for_depth_layers_minus8'] + 8) - 1; j++) {
              pps['dlt_value_flag[' + i + '][' + j + ']'] = bs.u(1);
            } else this.delta_dlt(pps, i);
          }
        }
      }
    }

    if (pps['pps_extension_5bits']) {
      for (var i = 0; more_rbsp_data(bs); i++) {
        pps['pps_extension_data_flag[' + i + ']'] = bs.u(1);
      }
    }
  };

  bitstream_parser_h265.prototype.slice_segment_header = function (bs, sh) {
    sh['first_slice_segment_in_pic_flag'] = bs.u(1);
    if (sh['nal_unit_type'] >= 16 && sh['nal_unit_type'] <= 23) sh['no_output_of_prior_pics_flag'] = bs.u(1);
    sh['slice_pic_parameter_set_id'] = bs.ue();
    this.pps = this.find_nalu([34], 'pps_pic_parameter_set_id', sh['slice_pic_parameter_set_id']);
    if (this.pps == null) return sh;
    this.sps = this.find_nalu([33], 'sps_seq_parameter_set_id', this.pps['pps_seq_parameter_set_id']);

    if (sh['first_slice_segment_in_pic_flag'] == 0) {
      if (this.pps['dependent_slice_segments_enabled_flag']) sh['dependent_slice_segment_flag'] = bs.u(1);
      var MaxCUWidth = 1 << this.sps['log2_min_luma_coding_block_size_minus3'] + 3 + this.sps['log2_diff_max_min_luma_coding_block_size'];
      var NumCTUs = Math.floor((this.sps['pic_width_in_luma_samples'] + MaxCUWidth - 1) / MaxCUWidth) * Math.floor((this.sps['pic_height_in_luma_samples'] + MaxCUWidth - 1) / MaxCUWidth);
      var n = 0;

      while (NumCTUs > 1 << n) {
        n++;
      }

      sh['slice_segment_address'] = bs.u(n);
    }

    if (!sh['dependent_slice_segment_flag']) {
      for (var i = 0; i < this.pps['num_extra_slice_header_bits']; i++) {
        sh['slice_reserved_flag[' + i + ']'] = bs.u(1);
      }

      sh['slice_type'] = bs.ue();
      if (this.pps['output_flag_present_flag']) sh['pic_output_flag'] = bs.u(1);
      if (this.sps == null) return sh;
      if (this.sps['separate_colour_plane_flag']) sh['colour_plane_id'] = bs.u(2);
      var NumPicTotalCurr = 0;

      if (sh['nal_unit_type'] != 19 && sh['nal_unit_type'] != 20) {
        sh['slice_pic_order_cnt_lsb'] = bs.u(this.sps['log2_max_pic_order_cnt_lsb_minus4'] + 4);
        sh['short_term_ref_pic_set_sps_flag'] = bs.u(1);

        if (sh['short_term_ref_pic_set_sps_flag'] == 0) {
          this.short_term_ref_pic_set(bs, this.sps['num_short_term_ref_pic_sets'], this.sps['num_short_term_ref_pic_sets'], sh, this.sps);
          NumPicTotalCurr = sh['#NumDeltaPocs'];
        } else if (this.sps['num_short_term_ref_pic_sets'] > 1) {
          sh['short_term_ref_pic_set_idx'] = bs.u(cntbits(this.sps['num_short_term_ref_pic_sets']));
          NumPicTotalCurr = this.sps['#NumDeltaPocs[' + sh['short_term_ref_pic_set_idx'] + ']'];
        }

        if (this.sps['long_term_ref_pics_present_flag']) {
          var num_long_term_sps = 0;
          if (this.sps['num_long_term_ref_pics_sps'] > 0) sh['num_long_term_sps'] = num_long_term_sps = bs.ue();
          sh['num_long_term_pics'] = bs.ue();
          var nbits = cntbits(this.sps['num_long_term_ref_pics_sps']);

          for (var i = 0; i < num_long_term_sps + sh['num_long_term_pics']; i++) {
            if (i < num_long_term_sps) {
              if (this.sps['num_long_term_ref_pics_sps'] > 1) {
                sh['lt_idx_sps[' + i + ']'] = bs.u(nbits);
                NumPicTotalCurr += this.sps['used_by_curr_pic_lt_sps_flag[' + sh['lt_idx_sps[' + i + ']'] + ']'];
              }
            } else {
              sh['poc_lsb_lt[' + i + ']'] = bs.u(this.sps['log2_max_pic_order_cnt_lsb_minus4'] + 4);
              sh['used_by_curr_pic_lt_flag[' + i + ']'] = bs.u(1);
              NumPicTotalCurr += sh['used_by_curr_pic_lt_flag[' + i + ']'];
            }

            sh['delta_poc_msb_present_flag[' + i + ']'] = bs.u(1);
            if (sh['delta_poc_msb_present_flag[' + i + ']']) sh['delta_poc_msb_cycle_lt[' + i + ']'] = bs.ue();
          }
        }

        if (this.sps['sps_temporal_mvp_enabled_flag']) sh['slice_temporal_mvp_enabled_flag'] = bs.u(1);
      }

      if (this.sps['sample_adaptive_offset_enabled_flag']) {
        sh['slice_sao_luma_flag'] = bs.u(1);
        if (this.sps['chroma_format_idc'] > 0) sh['slice_sao_chroma_flag'] = bs.u(1);
      }

      if (sh['slice_type'] == 1 || sh['slice_type'] == 0) {
        sh['num_ref_idx_active_override_flag'] = bs.u(1);
        var num_ref_idx_l0_active_minus1 = this.pps['num_ref_idx_l0_default_active_minus1'];
        var num_ref_idx_l1_active_minus1 = this.pps['num_ref_idx_l1_default_active_minus1'];

        if (sh['num_ref_idx_active_override_flag']) {
          sh['num_ref_idx_l0_active_minus1'] = num_ref_idx_l0_active_minus1 = bs.ue();
          if (sh['slice_type'] == 0) sh['num_ref_idx_l1_active_minus1'] = num_ref_idx_l1_active_minus1 = bs.ue();
        }

        if (this.pps['lists_modification_present_flag'] && NumPicTotalCurr > 1) {
          var nbits = cntbits(NumPicTotalCurr);
          sh['ref_pic_list_modification_flag_l0'] = bs.u(1);

          if (sh['ref_pic_list_modification_flag_l0']) {
            for (var i = 0; i <= num_ref_idx_l0_active_minus1; i++) {
              sh['list_entry_l0[' + i + ']'] = bs.u(nbits);
            }
          }

          if (sh['slice_type'] == 0) {
            sh['ref_pic_list_modification_flag_l1'] = bs.u(1);

            if (sh['ref_pic_list_modification_flag_l1']) {
              for (var i = 0; i <= num_ref_idx_l1_active_minus1; i++) {
                sh['list_entry_l1[' + i + ']'] = bs.u(nbits);
              }
            }
          }
        }

        if (sh['slice_type'] == 0) sh['mvd_l1_zero_flag'] = bs.u(1);
        if (this.pps['cabac_init_present_flag']) sh['cabac_init_flag'] = bs.u(1);

        if (sh['slice_temporal_mvp_enabled_flag']) {
          var collocated_from_l0_flag = 1;
          if (sh['slice_type'] == 0) sh['collocated_from_l0_flag'] = collocated_from_l0_flag = bs.u(1);
          if (collocated_from_l0_flag && num_ref_idx_l0_active_minus1 > 0 || collocated_from_l0_flag == 0 && num_ref_idx_l1_active_minus1 > 0) sh['collocated_ref_idx'] = bs.ue();
        }

        if (this.pps['weighted_pred_flag'] && sh['slice_type'] == 1 || this.pps['weighted_bipred_flag'] && sh['slice_type'] == 0) {
          sh['luma_log2_weight_denom'] = bs.ue();
          if ('chroma_format_idc' in this.sps && this.sps['chroma_format_idc'] != 0) sh['delta_chroma_log2_weight_denom'] = bs.se();

          for (var i = 0; i <= num_ref_idx_l0_active_minus1; i++) {
            sh['luma_weight_l0_flag[' + i + ']'] = bs.u(1);
          }

          if (this.sps['chroma_format_idc'] != 0) {
            for (var i = 0; i <= num_ref_idx_l0_active_minus1; i++) {
              sh['chroma_weight_l0_flag[' + i + ']'] = bs.u(1);
            }
          }

          for (var i = 0; i <= num_ref_idx_l0_active_minus1; i++) {
            if (sh['luma_weight_l0_flag[' + i + ']']) {
              sh['delta_luma_weight_l0[' + i + ']'] = bs.se();
              sh['luma_offset_l0[' + i + ']'] = bs.se();
            }

            if (sh['chroma_weight_l0_flag[' + i + ']']) {
              for (var j = 0; j < 2; j++) {
                sh['delta_chroma_weight_l0[' + i + '][' + j + ']'] = bs.se();
                sh['delta_chroma_offset_l0[' + i + '][' + j + ']'] = bs.se();
              }
            }
          }

          if (sh['slice_type'] == 0) {
            for (var i = 0; i <= num_ref_idx_l1_active_minus1; i++) {
              sh['luma_weight_l1_flag[' + i + ']'] = bs.u(1);
            }

            if (this.sps['chroma_format_idc'] != 0) for (var i = 0; i <= num_ref_idx_l1_active_minus1; i++) {
              sh['chroma_weight_l1_flag[' + i + ']'] = bs.u(1);
            }

            for (var i = 0; i <= num_ref_idx_l1_active_minus1; i++) {
              if (sh['luma_weight_l1_flag[' + i + ']']) {
                sh['delta_luma_weight_l1[' + i + ']'] = bs.se();
                sh['luma_offset_l1[' + i + ']'] = bs.se();
              }

              if (sh['chroma_weight_l1_flag[' + i + ']']) {
                for (var j = 0; j < 2; j++) {
                  sh['delta_chroma_weight_l1[' + i + '][' + j + ']'] = bs.se();
                  sh['delta_chroma_offset_l1[' + i + '][' + j + ']'] = bs.se();
                }
              }
            }
          }
        }

        sh['five_minus_max_num_merge_cand'] = bs.ue();
      }

      sh['slice_qp_delta'] = bs.se();

      if (this.pps['pps_slice_chroma_qp_offsets_present_flag']) {
        sh['slice_cb_qp_offset'] = bs.se();
        sh['slice_cr_qp_offset'] = bs.se();
      }

      if (this.pps['deblocking_filter_override_enabled_flag']) sh['deblocking_filter_override_flag'] = bs.u(1);

      if (sh['deblocking_filter_override_flag'] || 0) {
        sh['slice_deblocking_filter_disabled_flag'] = bs.u(1);

        if (sh['slice_deblocking_filter_disabled_flag'] == 0) {
          sh['slice_beta_offset_div2'] = bs.se();
          sh['slice_tc_offset_div2'] = bs.se();
        }
      }

      if (this.pps['pps_loop_filter_across_slices_enabled_flag'] && (sh['slice_sao_luma_flag'] || sh['slice_sao_chroma_flag'] || (sh['slice_deblocking_filter_disabled_flag'] || 0) == 0)) sh['slice_loop_filter_across_slices_enabled_flag'] = bs.u(1);
    }

    if (this.pps['tiles_enabled_flag'] || this.pps['entropy_coding_sync_enabled_flag']) {
      sh['num_entry_point_offsets'] = bs.ue();

      if (sh['num_entry_point_offsets'] > 0) {
        sh['offset_len_minus1'] = bs.ue();

        for (var i = 0; i < sh['num_entry_point_offsets']; i++) {
          sh['entry_point_offset_minus1[' + i + ']'] = bs.u(sh['offset_len_minus1'] + 1);
        }
      }
    }

    if (this.pps['slice_segment_header_extension_present_flag']) {
      sh['slice_segment_header_extension_length'] = bs.ue();

      for (var i = 0; i < sh['slice_segment_header_extension_length']; i++) {
        sh['slice_segment_header_extension_data_byte[' + i + ']'] = bs.u(8);
      }
    }
  };

  bitstream_parser_h265.prototype.parse_sei = function (bs) {
    var seis = {};
    return seis;
  };

  var Renderer =
  /*#__PURE__*/
  function () {
    function Renderer(canvas) {
      classCallCheck(this, Renderer);

      this.canvas = canvas;
      this.context = this.canvas.getContext('2d');
      this.img = this.context.createImageData(canvas.width, canvas.height);
      var rgba = this.img.data;

      for (var y = 0; y < this.img.height; y += 2) {
        var p0 = y * this.img.width;
        var p1 = p0 + this.img.width;

        for (var x = 0; x < this.img.width; x += 2) {
          rgba[(p0 + x) * 4 + 3] = 255;
          rgba[(p0 + x) * 4 + 7] = 255;
          rgba[(p1 + x) * 4 + 3] = 255;
          rgba[(p1 + x) * 4 + 7] = 255;
        }
      }
    }

    createClass(Renderer, [{
      key: "converter",
      value: function converter(frame) {
        var img = this.img;
        var rgba = img.data;

        for (var y = 0; y < img.height; y += 2) {
          var p0 = y * img.width;
          var p1 = p0 + img.width;
          var p4 = p0 / 4;

          for (var x = 0; x < img.width; x += 2) {
            var y0 = 1.164 * (frame.y[p0 + x] - 16);
            var y1 = 1.164 * (frame.y[p0 + x + 1] - 16);
            var y2 = 1.164 * (frame.y[p1 + x] - 16);
            var y3 = 1.164 * (frame.y[p1 + x + 1] - 16);
            var u = frame.u[p4 + x / 2];
            var v = frame.v[p4 + x / 2];
            var t0 = 1.596 * (v - 128);
            var t1 = -0.391 * (u - 128) - 0.813 * (v - 128);
            var t2 = 2.018 * (u - 128);
            var p2 = (p0 + x) * 4;
            var p3 = (p1 + x) * 4;
            rgba[p2] = y0 + t0;
            rgba[p2 + 1] = y0 + t1;
            rgba[p2 + 2] = y0 + t2;
            rgba[p2 + 4] = y1 + t0;
            rgba[p2 + 5] = y1 + t1;
            rgba[p2 + 6] = y1 + t2;
            rgba[p3] = y2 + t0;
            rgba[p3 + 1] = y2 + t1;
            rgba[p3 + 2] = y2 + t2;
            rgba[p3 + 4] = y3 + t0;
            rgba[p3 + 5] = y3 + t1;
            rgba[p3 + 6] = y3 + t2;
          }
        }

        return img;
      }
    }]);

    return Renderer;
  }();

  var nalStart$1 = new Uint8Array([0x00, 0x00, 0x00, 0x01]);

  var Decoder =
  /*#__PURE__*/
  function () {
    function Decoder(flv) {
      var _this = this;

      classCallCheck(this, Decoder);

      var debug = flv.debug,
          options = flv.options,
          player = flv.player;
      this.worker = new Worker(options.workerPath);
      this.h264Parser = create_parser('h264');
      this.h264DecoderInitialized = false;
      var sps = null;
      var pps = null;
      flv.on('videoData', function (nalu) {
        _this.h264Parser.parse(nalu);

        var naluInfo = _this.h264Parser.next();

        if (!naluInfo) return;
        var rawdata = null;

        switch (naluInfo['@type']) {
          case 'IDR':
          case 'I':
          case 'B':
          case 'P':
            {
              rawdata = mergeBuffer(sps, pps, nalStart$1, naluInfo['@data']);
              break;
            }

          case 'SPS':
            sps = mergeBuffer(nalStart$1, naluInfo['@data']);
            break;

          case 'PPS':
            pps = mergeBuffer(nalStart$1, naluInfo['@data']);
            break;

          default:
            break;
        }

        if (!rawdata) return;
        var packet = {
          data: rawdata,
          frame_type: 255
        };

        if (!_this.h264DecoderInitialized) {
          _this.h264DecoderInitialized = true;
          _this.renderer = new Renderer(player.canvas);

          _this.h264setup(options.h264Configuration, packet).then(function (frame) {
            if (frame.data) {
              var videoFrame = _this.renderer.converter(frame);

              flv.emit('videoFrame', videoFrame);
            }
          }, function (err) {
            debug.warn(false, '[h264]: decode failed', err);
          });
        } else {
          _this.h264decode(packet).then(function (frame) {
            if (frame.data) {
              var videoFrame = _this.renderer.converter(frame);

              flv.emit('videoFrame', videoFrame);
            }
          }, function (err) {
            console.log(naluInfo);
            debug.warn(false, '[h264]: decode failed', err);
          });
        }
      });
    }

    createClass(Decoder, [{
      key: "h264setup",
      value: function h264setup(cfg, packet) {
        var _this2 = this;

        return new Promise(function (resolve, reject) {
          _this2.worker.onmessage = function (ev) {
            if (ev.data.status === 0) {
              resolve(ev.data);
            } else {
              reject(ev.data);
            }
          };

          _this2.worker.postMessage({
            params: cfg,
            packet: packet
          });
        });
      }
    }, {
      key: "h264decode",
      value: function h264decode(packet) {
        var _this3 = this;

        return new Promise(function (resolve, reject) {
          _this3.worker.onmessage = function (ev) {
            if (ev.data.status === 0) {
              resolve(ev.data);
            } else {
              reject(ev.data);
            }
          };

          _this3.worker.postMessage(packet);
        });
      }
    }]);

    return Decoder;
  }();

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

  var id = 0;

  var FlvPlayer =
  /*#__PURE__*/
  function (_Emitter) {
    inherits(FlvPlayer, _Emitter);

    function FlvPlayer(options) {
      var _this;

      classCallCheck(this, FlvPlayer);

      _this = possibleConstructorReturn(this, getPrototypeOf(FlvPlayer).call(this));
      _this.options = Object.assign({}, FlvPlayer.options, options);
      optionValidator(assertThisInitialized(_this));
      _this.debug = new Debug(assertThisInitialized(_this));
      _this.player = new Player(assertThisInitialized(_this));
      _this.decoder = new Decoder(assertThisInitialized(_this));
      _this.demuxer = new Demuxer(assertThisInitialized(_this));
      _this.stream = new Stream(assertThisInitialized(_this));
      id += 1;
      _this.id = id;
      FlvPlayer.instances.push(assertThisInitialized(_this));
      return _this;
    }

    createClass(FlvPlayer, [{
      key: "destroy",
      value: function destroy() {
        FlvPlayer.instances.splice(FlvPlayer.instances.indexOf(this), 1);
        this.emit('destroy');
      }
    }], [{
      key: "options",
      get: function get() {
        return {
          url: '',
          container: null,
          debug: false,
          live: false,
          controls: true,
          width: 400,
          height: 300,
          workerPath: 'openh264_decoder.js',
          h264Configuration: {}
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
