// BSD 2-Clause License
//
// Copyright (c) 2018, Christian Berger
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// * Redistributions of source code must retain the above copyright notice, this
//   list of conditions and the following disclaimer.
//
// * Redistributions in binary form must reproduce the above copyright notice,
//   this list of conditions and the following disclaimer in the documentation
//   and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
// FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
// DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
// OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// Inspired by https://github.com/kazuki/video-codec.js
var Decoder = (function () {
    function Decoder(worker_script_path) {
        this.worker = new Worker(worker_script_path);
    }
    Decoder.prototype.setup = function (cfg, packet) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.worker.onmessage = function (ev) {
                if (ev.data.status == 0) {
                    resolve(ev.data);
                }
                else {
                    reject(ev.data);
                }
            };
            _this.worker.postMessage({
                params: cfg,
                packet: packet
            });
        });
    };
    Decoder.prototype.decode = function (packet) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.worker.onmessage = function (ev) {
                if (ev.data.status == 0) {
                    resolve(ev.data);
                }
                else {
                    reject(ev.data);
                }
            };
            _this.worker.postMessage(packet);
        });
    };
    return Decoder;
})();

var Renderer = (function () {
    function Renderer(canvas) {
        this._canvas = canvas;
    }
    Renderer.prototype.init = function (info) {
        this._canvas.width = info.width;
        this._canvas.height = info.height;
        this._context = this._canvas.getContext('2d');
        var img = this._img = this._context.createImageData(info.width, info.height);
        var rgba = img.data;
        for (var y = 0; y < img.height; y += 2) {
            var p0 = y * img.width;
            var p1 = p0 + img.width;
            for (var x = 0; x < img.width; x += 2) {
                rgba[(p0 + x) * 4 + 3] =
                    rgba[(p0 + x) * 4 + 7] =
                        rgba[(p1 + x) * 4 + 3] =
                            rgba[(p1 + x) * 4 + 7] = 255;
            }
        }
    };
    Renderer.prototype.draw = function (frame) {
        var img = this._img;
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
                var u = frame.u[p4 + x / 2], v = frame.v[p4 + x / 2];
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
        this._context.putImageData(img, 0, 0);
    };
    return Renderer;
})();

var __videoRenderer = undefined;
var __h264DecoderInitialized = false;
var __h264Decoder = new Decoder('js/openh264_decoder.js');

function decodeAndRenderH264(canvasName, w, h, rawdata) {
    if (undefined == __videoRenderer) {
        __videoRenderer = new Renderer(document.getElementById(canvasName));
        __videoRenderer.init({
            width: w,
            height: h
        });
    }

    if (undefined != __videoRenderer) {
        document.getElementById(canvasName).style.visibility = "visible";

        var packet = { data: rawdata,
                       frame_type: 255 };

        if (!__h264DecoderInitialized) {
            __h264DecoderInitialized = true;

            var __h264Configuration = {};
            __h264Decoder.setup(__h264Configuration, packet).then(function (frame) {
                if (frame.data) {
                    __videoRenderer.draw(frame);
                }
            }, function (e) {
                console.log('failed: decode', e);
            });
        }
        else {
            __h264Decoder.decode(packet).then(function (frame) {
                if (frame.data) {
                    __videoRenderer.draw(frame);
                }
            }, function (e) {
                console.log('failed: decode', e);
            });
        }
    }
}

var __vpxDecoderInitialized = false;
var __vpxDecoder = new Decoder('js/libvpx_decoder.js');

function decodeAndRenderVPX(canvasName, w, h, rawdata, version) {
    var __vpxConfiguration = { 'version': (("VP80" == version) ? 8 : 9) };

    if (undefined == __videoRenderer) {
        __videoRenderer = new Renderer(document.getElementById(canvasName));
        __videoRenderer.init({
            width: w,
            height: h
        });
    }

    if (undefined != __videoRenderer) {
        document.getElementById(canvasName).style.visibility = "visible";

        var packet = { data: rawdata,
                       frame_type: 255 };

        if (!__vpxDecoderInitialized) {
            __vpxDecoderInitialized = true;

            __vpxDecoder.setup(__vpxConfiguration, packet).then(function (frame) {
                if (frame.data) {
                    __videoRenderer.draw(frame);
                }
            }, function (e) {
                console.log('failed: decode', e);
            });
        }
        else {
            __vpxDecoder.decode(packet).then(function (frame) {
                if (frame.data) {
                    __videoRenderer.draw(frame);
                }
            }, function (e) {
                console.log('failed: decode', e);
            });
        }
    }
}

