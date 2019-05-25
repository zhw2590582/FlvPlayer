import { mergeBuffer, readBuffer } from '../utils';
import create_parser from './bsparser';
import Renderer from './renderer';

let FrameType;
(function FrameTypeFn(FrameType) {
    FrameType[(FrameType['Key'] = 1)] = 'Key';
    FrameType[(FrameType['IDR'] = 1)] = 'IDR';
    FrameType[(FrameType['I'] = 2)] = 'I';
    FrameType[(FrameType['P'] = 3)] = 'P';
    FrameType[(FrameType['B'] = 4)] = 'B';
    FrameType[(FrameType['Unknown'] = 255)] = 'Unknown';
})(FrameType || (FrameType = {}));

const nalStart = new Uint8Array([0x00, 0x00, 0x00, 0x01]);
export default class Decoder {
    constructor(flv) {
        const { debug, options, player } = flv;
        this.worker = new Worker(options.workerPath);
        this.h264Parser = create_parser('h264');
        this.h264DecoderInitialized = false;

        let id = 0;

        let sps = null;
        let pps = null;

        const nalus = [];
        flv.on('videoData', nalu => {
            const readNalu = readBuffer(nalu);
            readNalu(4);
            const nalHeader = readNalu(1)[0];
            const naluType = nalHeader & 31;

            switch (naluType) {
                case 1:
                case 5: {
                    const rawdata = mergeBuffer(sps, pps, nalStart, nalu);
                    const packet = {
                        status: 0,
                        data: rawdata.buffer,
                        frame_type: 255,
                    };
        
                    if (!this.h264DecoderInitialized) {
                        this.h264DecoderInitialized = true;
                        this.renderer = new Renderer(player.canvas);
                        this.h264setup(options.h264Configuration, packet).then(
                            frame => {
                                console.log(frame);
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
                                console.log(frame);
                                if (frame.data) {
                                    const videoFrame = this.renderer.converter(frame);
                                    flv.emit('videoFrame', videoFrame);
                                }
                            },
                            err => {
                                debug.warn(false, '[h264]: decode failed', err);
                            },
                        );
                    }
                    break;
                }
                case 7:
                    sps = nalu;
                    break;
                case 8:
                    pps = nalu;
                    break;
                default:
                    debug.warn(false, `[NALU]: Found extra nalu type ${naluType}`);
                    break;
            }
        });

        this.test = function test() {
            const data = nalus.shift();
            console.log(data);
            this.h264Parser.parse(data);
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
                    console.log('sps', sps);
                    break;
                case 'PPS':
                    pps = mergeBuffer(nalStart, naluInfo['@data']);
                    console.log('pps', pps);
                    break;
                default:
                    break;
            }

            // console.log(rawdata);
            // if (!rawdata) return;
        };
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

            this.worker.postMessage(packet, [packet.data]);
        });
    }
}
