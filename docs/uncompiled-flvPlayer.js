(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Flvplayer = factory());
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

  var Decoder = function Decoder() {
    classCallCheck(this, Decoder);
  };

  var Player = function Player() {
    classCallCheck(this, Player);
  };

  var Flvplayer =
  /*#__PURE__*/
  function () {
    function Flvplayer(options) {
      classCallCheck(this, Flvplayer);

      this.options = Object.assign({}, Flvplayer.options, options);
      this.decoder = new Decoder(this);
      this.player = new Player(this);
    }

    createClass(Flvplayer, null, [{
      key: "options",
      get: function get() {
        return {
          url: '',
          canvas: null,
          width: null,
          height: null
        };
      }
    }]);

    return Flvplayer;
  }();

  return Flvplayer;

}));
//# sourceMappingURL=uncompiled-flvPlayer.js.map
