import { mergeBuffer, readBuffer } from '../utils';
import create_parser from './bsparser';
import Renderer from './renderer';

export default class Decoder {
    constructor(flv) {
        const { debug, options, player } = flv;
        this.worker = new Worker(options.workerPath);
        this.h264Parser = create_parser('h264');
        this.h264DecoderInitialized = false;

        let sps = null;
        let pps = null;
        flv.on('videoData', nalu => {
            const readNalu = readBuffer(nalu);
            readNalu(4);
            const nalHeader = readNalu(1)[0];
            const naluType = nalHeader & 31;
            if (naluType === 7) {
                sps = nalu;
            } else if (naluType === 8) {
                pps = nalu;
            } else {
                const rawdata = mergeBuffer(sps, pps, nalu);
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
                            debug.warn(false, '[h264]: decode failed', err);
                        },
                    );
                }
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
