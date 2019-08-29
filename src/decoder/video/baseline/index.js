import { createWorker } from '../../../utils';
import Renderer from './renderer';
import workerString from './decoder.worker';

export default class VideoDecoder {
    constructor(flv) {
        this.flv = flv;
        const { player, events, options, debug } = flv;

        this.ready = false;
        this.playing = false;
        this.playIndex = 0;
        this.videoframes = [];
        this.timestamps = [];
        this.videoInputLength = 0;
        this.decoding = false;
        this.byteSize = 0;
        this.loaded = 0;
        this.freeMemory = 128 * 1024 * 1024;
        this.initLiveTimestamp = false;
        this.decoderWorker = createWorker(workerString);
        this.renderer = new Renderer(player.$canvas);

        flv.on('destroy', () => {
            this.videoframes = [];
            this.timestamps = [];
            this.decoderWorker.terminate();
            this.stop();
        });

        events.proxy(this.decoderWorker, 'message', event => {
            const message = event.data;
            switch (message.type) {
                case 'pictureReady':
                    if (this.flv.options.live && !this.playing && this.ready) return;
                    this.byteSize += message.data.byteLength;
                    this.videoframes.push(message);
                    this.decoding = this.videoframes.length !== this.videoInputLength;
                    this.loaded = this.videoframes.length / player.frameRate;
                    flv.emit('videoLoaded', this.loaded);
                    if (!this.ready && this.videoframes.length === 1) {
                        this.ready = true;
                        flv.emit('ready');
                    }
                    break;
                default:
                    break;
            }
        });

        flv.on('videoData', (frame, timestamp) => {
            this.decoding = true;
            this.decoderWorker.postMessage({ type: 'decode', data: frame.buffer }, [frame.buffer]);
            this.timestamps.push(timestamp);
            if (this.flv.options.live && !this.initLiveTimestamp) {
                this.flv.decoder.currentTime = timestamp / 1000;
                this.initLiveTimestamp = true;
            }
            this.videoInputLength += 1;
        });

        flv.on('timeupdate', currentTime => {
            const index = this.playIndex;
            const timestamp = this.timestamps[index];
            if (timestamp !== undefined && currentTime * 1000 >= timestamp) {
                if (this.draw(index)) {
                    const framesSize = this.getFramesSize(index);
                    if (
                        this.flv.options.live &&
                        framesSize >= this.freeMemory &&
                        this.videoframes.length - 1 > index &&
                        this.timestamps.length - 1 > index
                    ) {
                        this.playIndex = 0;
                        this.videoframes.splice(0, index + 1);
                        this.timestamps.splice(0, index + 1);
                        this.flv.decoder.currentTime = this.timestamps[0] / 1000;
                        debug.log('Free Memory', `Size: ${framesSize / 1024 / 1024} M`, `Index: ${index}`);
                    } else {
                        this.playIndex += 1;
                    }
                } else {
                    if (!options.live) {
                        this.stop();
                    }
                }
            }
        });
    }

    getFramesSize(framesIndex) {
        let framesSize = 0;
        for (let index = 0; index < framesIndex; index++) {
            framesSize += this.videoframes[index].data.byteLength;
        }
        return framesSize;
    }

    draw(index) {
        const videoframe = this.videoframes[index];
        if (!videoframe) return false;
        this.renderer.drawFrame(videoframe);
        return true;
    }

    play(startTime = 0) {
        this.playing = true;
        if (this.flv.options.live) {
            this.playIndex = 0;
            this.videoframes = [];
            this.timestamps = [];
            this.initLiveTimestamp = false;
        } else {
            this.playIndex = Math.round(startTime * this.flv.player.frameRate);
        }
    }

    stop() {
        this.playing = false;
        if (this.flv.options.live) {
            this.playIndex = 0;
            this.videoframes = [];
            this.timestamps = [];
            this.initLiveTimestamp = false;
        }
    }
}
