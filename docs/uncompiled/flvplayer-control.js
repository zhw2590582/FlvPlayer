(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.FlvplayerControl = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

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
  var icons = Object.keys(iconsMap).reduce(function (icons, key) {
    icons[key] = "<i class=\"flvplayer-icon flvplayer-icon-".concat(key, "\">").concat(iconsMap[key], "</i>");
    return icons;
  }, {});

  function template(flv, control) {
    var options = flv.options;
    flv.player.$player.classList.add('flvplayer-controls-show');

    if (options.live) {
      flv.player.$player.classList.add('flvplayer-live');
    }

    flv.player.$player.insertAdjacentHTML('beforeend', "\n        ".concat(options.poster ? "<div class=\"flvplayer-poster\" style=\"background-image: url(".concat(options.poster, ")\"></div>") : '', "\n            <div class=\"flvplayer-loading\">").concat(icons.loading, "</div>\n            <div class=\"flvplayer-controls\">\n                ").concat(!options.live ? "\n                    <div class=\"flvplayer-controls-progress\">\n                        <div class=\"flvplayer-loaded\"></div>\n                        <div class=\"flvplayer-played\">\n                            <div class=\"flvplayer-indicator\"></div>\n                        </div>\n                    </div>\n                " : '', "\n                <div class=\"flvplayer-controls-bottom\">\n                    <div class=\"flvplayer-controls-left\">\n                        <div class=\"flvplayer-controls-item flvplayer-state\">\n                            <div class=\"flvplayer-play\">").concat(icons.play, "</div>\n                            <div class=\"flvplayer-pause\">").concat(icons.pause, "</div>\n                        </div>\n                        ").concat(options.hasAudio ? "\n                            <div class=\"flvplayer-controls-item flvplayer-volume\">\n                                <div class=\"flvplayer-volume-on\">".concat(icons.volume, "</div>\n                                <div class=\"flvplayer-volume-off\">").concat(icons.volumeClose, "</div>\n                                ").concat(flv.isMobile ? '' : "\n                                    <div class=\"flvplayer-volume-panel\">\n                                        <div class=\"flvplayer-volume-panel-handle\"></div>\n                                    </div>\n                                ", "\n                            </div>\n                        ") : '', "\n                        ").concat(!options.live ? "\n                            <div class=\"flvplayer-controls-item flvplayer-time\">\n                                <span class=\"flvplayer-current\">00:00</span> / <span class=\"flvplayer-duration\">00:00</span>\n                            </div>\n                        " : '', "\n                    </div>\n                    <div class=\"flvplayer-controls-right\">\n                        <div class=\"flvplayer-controls-item flvplayer-fullscreen\">").concat(icons.fullscreen, "</div>\n                    </div>\n                </div>\n            </div>\n        "));
    Object.defineProperty(control, '$poster', {
      value: options.container.querySelector('.flvplayer-poster')
    });
    Object.defineProperty(control, '$loading', {
      value: options.container.querySelector('.flvplayer-loading')
    });
    Object.defineProperty(control, '$controls', {
      value: options.container.querySelector('.flvplayer-controls')
    });
    Object.defineProperty(control, '$state', {
      value: options.container.querySelector('.flvplayer-state')
    });
    Object.defineProperty(control, '$play', {
      value: options.container.querySelector('.flvplayer-play')
    });
    Object.defineProperty(control, '$pause', {
      value: options.container.querySelector('.flvplayer-pause')
    });
    Object.defineProperty(control, '$current', {
      value: options.container.querySelector('.flvplayer-current')
    });
    Object.defineProperty(control, '$duration', {
      value: options.container.querySelector('.flvplayer-duration')
    });
    Object.defineProperty(control, '$volumeOn', {
      value: options.container.querySelector('.flvplayer-volume-on')
    });
    Object.defineProperty(control, '$volumeOff', {
      value: options.container.querySelector('.flvplayer-volume-off')
    });
    Object.defineProperty(control, '$volumePanel', {
      value: options.container.querySelector('.flvplayer-volume-panel')
    });
    Object.defineProperty(control, '$volumeHandle', {
      value: options.container.querySelector('.flvplayer-volume-panel-handle')
    });
    Object.defineProperty(control, '$fullscreen', {
      value: options.container.querySelector('.flvplayer-fullscreen')
    });
    Object.defineProperty(control, '$progress', {
      value: options.container.querySelector('.flvplayer-controls-progress')
    });
    Object.defineProperty(control, '$loaded', {
      value: options.container.querySelector('.flvplayer-loaded')
    });
    Object.defineProperty(control, '$played', {
      value: options.container.querySelector('.flvplayer-played')
    });
    Object.defineProperty(control, '$indicator', {
      value: options.container.querySelector('.flvplayer-indicator')
    });
  }

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

  function secondToTime(second) {
    var add0 = function add0(num) {
      return num < 10 ? "0".concat(num) : String(num);
    };

    var hour = Math.floor(second / 3600);
    var min = Math.floor((second - hour * 3600) / 60);
    var sec = Math.floor(second - hour * 3600 - min * 60);
    return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':');
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

  function observer(flv) {
    var proxy = flv.events.proxy,
        player = flv.player;
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

  function hotkey(flv, control) {
    var proxy = flv.events.proxy,
        player = flv.player;
    var keys = {};

    function addHotkey(key, event) {
      if (keys[key]) {
        keys[key].push(event);
      } else {
        keys[key] = [event];
      }
    }

    addHotkey(27, function () {
      if (control.fullscreen) {
        player.fullscreen = false;
      }
    });
    addHotkey(32, function () {
      player.toggle();
    });
    addHotkey(37, function () {
      player.currentTime -= 5;
    });
    addHotkey(38, function () {
      player.volume += 0.1;
    });
    addHotkey(39, function () {
      player.currentTime += 5;
    });
    addHotkey(40, function () {
      player.volume -= 0.1;
    });
    proxy(window, 'keydown', function (event) {
      if (control.isFocus) {
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

  var screenfull = createCommonjsModule(function (module) {
  /*!
  * screenfull
  * v4.2.1 - 2019-07-27
  * (c) Sindre Sorhus; MIT License
  */
  (function () {

  	var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
  	var isCommonjs =  module.exports;
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
  			return new Promise(function (resolve, reject) {
  				var request = fn.requestFullscreen;

  				var onFullScreenEntered = function () {
  					this.off('change', onFullScreenEntered);
  					resolve();
  				}.bind(this);

  				this.on('change', onFullScreenEntered);

  				elem = elem || document.documentElement;

  				var promise;

  				// Work around Safari 5.1 bug: reports support for
  				// keyboard in fullscreen even though it doesn't.
  				// Browser sniffing, since the alternative with
  				// setTimeout is even worse.
  				if (/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)) {
  					promise = elem[request]();
  				} else {
  					promise = elem[request](keyboardAllowed ? Element.ALLOW_KEYBOARD_INPUT : {});
  				}

  				Promise.resolve(promise).catch(reject);
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

  function property(flv, control) {
    var player = flv.player;
    Object.defineProperty(control, 'controls', {
      get: function get() {
        return player.$player.classList.contains('flvplayer-controls-show');
      },
      set: function set(type) {
        if (type) {
          player.$player.classList.add('flvplayer-controls-show');
        } else {
          player.$player.classList.remove('flvplayer-controls-show');
        }
      }
    });
    Object.defineProperty(control, 'loading', {
      get: function get() {
        return player.$player.classList.contains('flvplayer-loading-show');
      },
      set: function set(type) {
        if (type) {
          player.$player.classList.add('flvplayer-loading-show');
        } else {
          player.$player.classList.remove('flvplayer-loading-show');
        }
      }
    });

    try {
      var screenfullChange = function screenfullChange() {
        if (control.fullscreen) {
          player.$container.classList.add('flvplayer-fullscreen');
        } else {
          player.$container.classList.remove('flvplayer-fullscreen');
        }

        control.autoSize();
      };

      screenfull.on('change', screenfullChange);
      flv.events.destroys.push(function () {
        screenfull.off('change', screenfullChange);
      });
    } catch (error) {//
    }

    Object.defineProperty(control, 'fullscreen', {
      get: function get() {
        return screenfull.isFullscreen || player.$container.classList.contains('flvplayer-fullscreen-web');
      },
      set: function set(type) {
        if (type) {
          try {
            screenfull.request(player.$container);
          } catch (error) {
            player.$container.classList.add('flvplayer-fullscreen-web');
            control.autoSize();
          }
        } else {
          try {
            screenfull.exit();
          } catch (error) {
            player.$container.classList.remove('flvplayer-fullscreen-web');
            control.autoSize();
          }
        }
      }
    });
    Object.defineProperty(control, 'autoSize', {
      value: function value() {
        player.$container.style.padding = '0 0';
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

  function controls(flv, control) {
    var poster = flv.options.poster,
        proxy = flv.events.proxy,
        player = flv.player;
    proxy(window, ['click', 'contextmenu'], function (event) {
      if (event.composedPath().indexOf(player.$container) > -1) {
        control.isFocus = true;
      } else {
        control.isFocus = false;
      }
    });
    control.autoSize();
    flv.on('resize', function () {
      control.autoSize();
    });
    flv.on('scripMeta', function () {
      control.autoSize();
    });
    proxy(window, 'orientationchange', function () {
      setTimeout(function () {
        control.autoSize();
      }, 300);
    });

    if (poster) {
      flv.once('play', function () {
        control.$poster.style.display = 'none';
      });
      flv.once('seeked', function () {
        control.$poster.style.display = 'none';
      });
    }

    flv.on('waiting', function () {
      control.loading = true;
    });
    flv.on('ended', function () {
      control.loading = false;
    });
    flv.on('timeupdate', function () {
      control.loading = false;
    });
    proxy(control.$play, 'click', function () {
      player.play();
    });
    proxy(control.$pause, 'click', function () {
      player.pause();
    });
    var loadedFn = throttle(function (timestamp) {
      var time = clamp(timestamp / player.duration, 0, 1);
      control.$loaded.style.width = "".concat(time * 100, "%");
    }, 500);
    flv.on('videoLoaded', function (timestamp) {
      if (!flv.options.live) {
        loadedFn(timestamp);
      }
    });
    var timeupdateFn = throttle(function (currentTime) {
      control.$played.style.width = "".concat(currentTime / player.duration * 100, "%");
      control.$current.innerText = secondToTime(currentTime);
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
      control.$play.style.display = 'none';
      control.$pause.style.display = 'block';
    });
    flv.on('ended', function () {
      control.controls = true;
      control.$play.style.display = 'block';
      control.$pause.style.display = 'none';
    });
    flv.on('loop', function () {
      control.controls = false;
    });
    flv.on('pause', function () {
      control.$play.style.display = 'block';
      control.$pause.style.display = 'none';
      control.loading = false;
    });
    flv.on('scripMeta', function () {
      if (!flv.options.live) {
        control.$duration.innerText = secondToTime(player.duration);
      }
    });
    proxy(control.$fullscreen, 'click', function () {
      if (control.fullscreen) {
        control.fullscreen = false;
      } else {
        control.fullscreen = true;
      }
    });
    var autoHide = debounce(function () {
      player.$player.classList.add('flvplayer-hide-cursor');
      control.controls = false;
    }, 5000);
    proxy(player.$player, 'mousemove', function () {
      autoHide.clearTimeout();
      player.$player.classList.remove('flvplayer-hide-cursor');
      control.controls = true;

      if (player.playing) {
        autoHide();
      }
    });

    function volumeChangeFromEvent(event) {
      var _control$$volumePanel = control.$volumePanel.getBoundingClientRect(),
          panelLeft = _control$$volumePanel.left,
          panelWidth = _control$$volumePanel.width;

      var _control$$volumeHandl = control.$volumeHandle.getBoundingClientRect(),
          handleWidth = _control$$volumeHandl.width;

      var percentage = clamp(event.x - panelLeft - handleWidth / 2, 0, panelWidth - handleWidth / 2) / (panelWidth - handleWidth);
      return percentage;
    }

    function setVolumeHandle(percentage) {
      if (percentage === 0) {
        if (!flv.isMobile) {
          setStyle(control.$volumeHandle, 'left', '0');
        }

        setStyle(control.$volumeOn, 'display', 'none');
        setStyle(control.$volumeOff, 'display', 'flex');
      } else {
        if (!flv.isMobile) {
          var panelWidth = getStyle(control.$volumePanel, 'width') || 60;
          var handleWidth = getStyle(control.$volumeHandle, 'width');
          var width = (panelWidth - handleWidth) * percentage;
          setStyle(control.$volumeHandle, 'left', "".concat(width, "px"));
        }

        setStyle(control.$volumeOn, 'display', 'flex');
        setStyle(control.$volumeOff, 'display', 'none');
      }
    }

    if (flv.options.hasAudio) {
      var lastVolume = 0;
      var isVolumeDroging = false;

      if (flv.options.muted) {
        setVolumeHandle(0);
      } else {
        setVolumeHandle(flv.options.volume);
      }

      flv.on('volumechange', function () {
        setVolumeHandle(player.volume);
      });
      proxy(control.$volumeOn, 'click', function () {
        control.$volumeOn.style.display = 'none';
        control.$volumeOff.style.display = 'block';
        lastVolume = player.volume;
        player.volume = 0;
      });
      proxy(control.$volumeOff, 'click', function () {
        control.$volumeOn.style.display = 'block';
        control.$volumeOff.style.display = 'none';
        player.volume = lastVolume || 0.7;
      });

      if (!flv.isMobile) {
        proxy(control.$volumePanel, 'click', function (event) {
          player.volume = volumeChangeFromEvent(event);
        });
        proxy(control.$volumeHandle, 'mousedown', function () {
          isVolumeDroging = true;
        });
        proxy(control.$volumeHandle, 'mousemove', function (event) {
          if (isVolumeDroging) {
            player.volume = volumeChangeFromEvent(event);
          }
        });
      }

      proxy(document, 'mouseup', function () {
        if (isVolumeDroging) {
          isVolumeDroging = false;
        }
      });
    }

    function getPosFromEvent(event) {
      var $progress = control.$progress;

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

    if (!flv.options.live && flv.options.cache) {
      proxy(control.$progress, 'click', function (event) {
        if (event.target !== control.$indicator) {
          var _getPosFromEvent = getPosFromEvent(event),
              second = _getPosFromEvent.second,
              percentage = _getPosFromEvent.percentage;

          if (second <= player.loaded) {
            control.$played.style.width = "".concat(percentage * 100, "%");
            player.currentTime = second;
          }
        }
      });
      var isIndicatorDroging = false;
      proxy(control.$indicator, 'mousedown', function () {
        isIndicatorDroging = true;
      });
      proxy(document, 'mousemove', function (event) {
        if (isIndicatorDroging) {
          var _getPosFromEvent2 = getPosFromEvent(event),
              second = _getPosFromEvent2.second,
              percentage = _getPosFromEvent2.percentage;

          if (second <= player.loaded) {
            control.$played.style.width = "".concat(percentage * 100, "%");
            player.currentTime = second;
          }
        }
      });
      proxy(document, 'mouseup', function () {
        if (isIndicatorDroging) {
          isIndicatorDroging = false;
        }
      });
    }
  }

  var Control = function Control(flv) {
    classCallCheck(this, Control);

    template(flv, this);
    observer(flv);
    property(flv, this);
    controls(flv, this);

    if (flv.options.hotkey) {
      hotkey(flv, this);
    }
  };

  return Control;

}));
//# sourceMappingURL=flvplayer-control.js.map
