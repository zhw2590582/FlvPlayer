import { mergeBuffer } from '../utils';
import create_parser from './bsparser';
import Renderer from './renderer';

const nalStart = new Uint8Array([0x00, 0x00, 0x00, 0x01]);
export default class Decoder {
    constructor(flv) {
        const { debug, options, player } = flv;
        this.worker = new Worker(options.workerPath);
        this.h264Parser = create_parser('h264');
        this.h264DecoderInitialized = false;

        let sps = null;
        let pps = null;
        flv.on('videoData', nalu => {
            this.h264Parser.parse(nalu);
            let naluInfo = this.h264Parser.next();
            if (!naluInfo) return;
            let rawdata = null;
            switch (naluInfo['@type']) {
                case 'IDR':
                case 'I':
                case 'B':
                case 'P': {
                    rawdata = mergeBuffer(sps, pps, nalStart, naluInfo['@data']);
                    break;
                }
                case 'SPS':
                    sps = mergeBuffer(nalStart, naluInfo['@data']);
                    break;
                case 'PPS':
                    pps = mergeBuffer(nalStart, naluInfo['@data']);
                    break;
                default:
                    break;
            }

            if (!rawdata) return;
            const packet = { data: rawdata, frame_type: 255 };
            if (!this.h264DecoderInitialized) {
                this.h264DecoderInitialized = true;
                this.renderer = new Renderer(player.canvas);
                this.h264setup(options.h264Configuration, packet).then(
                    frame => {
                        if (frame.data) {
                            const videoFrame = this.renderer.converter(frame);
                            flv.emit('videoFrame', videoFrame);
                        }
                    },
                    err => {
                        debug.warn(false, '[h264]: decode failed', err);
                    },
                );
            } else {
                this.h264decode(packet).then(
                    frame => {
                        if (frame.data) {
                            const videoFrame = this.renderer.converter(frame);
                            flv.emit('videoFrame', videoFrame);
                        }
                    },
                    err => {
                        console.log(naluInfo);
                        debug.warn(false, '[h264]: decode failed', err);
                    },
                );
            }
        });
    }

    h264setup(cfg, packet) {
        return new Promise((resolve, reject) => {
            this.worker.onmessage = ev => {
                if (ev.data.status === 0) {
                    resolve(ev.data);
                } else {
                    reject(ev.data);
                }
            };
            this.worker.postMessage({
                params: cfg,
                packet: packet,
            });
        });
    }

    h264decode(packet) {
        return new Promise((resolve, reject) => {
            this.worker.onmessage = ev => {
                if (ev.data.status === 0) {
                    resolve(ev.data);
                } else {
                    reject(ev.data);
                }
            };
            this.worker.postMessage(packet);
        });
    }
}
