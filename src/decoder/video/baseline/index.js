import { createWorker } from '../../../utils';
import Renderer from './renderer';
import workerString from './decoder.worker';

export default class VideoDecoder {
    constructor(flv) {
        this.flv = flv;
        const { player, events, options } = flv;

        this.ready = false;
        this.playing = false;
        this.playIndex = 0;
        this.videoframes = [];
        this.timestamps = [];
        this.videoInputLength = 0;
        this.decoding = false;
        this.byteSize = 0;
        this.loaded = 0;
        this.freeNumber = 512;
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
            this.videoInputLength += 1;
        });

        flv.on('timeupdate', currentTime => {
            const index = this.playIndex;
            const timestamp = this.timestamps[index];
            if (timestamp !== undefined && currentTime * 1000 >= timestamp) {
                if (this.draw(index)) {
                    if (this.flv.options.live && (index !== 0 && index % this.freeNumber === 0)) {
                        this.playIndex = -1;
                        this.videoframes.splice(0, index + 1);
                        this.timestamps.splice(0, index + 1);
                        this.flv.decoder.currentTime = this.timestamps[0] / 1000 || 0;
                    }
                    this.playIndex += 1;
                } else {
                    if (!options.live) {
                        this.stop();
                    }
                }
            }
        });
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
            const startIndex = Math.max(0, this.videoframes.length);
            this.playIndex = 0;
            this.videoframes.splice(0, startIndex);
            this.timestamps.splice(0, startIndex);
            this.flv.decoder.currentTime = this.timestamps[0] / 1000 || 0;
        } else {
            this.playIndex = Math.round(startTime * this.flv.player.frameRate);
        }
    }

    stop() {
        this.playing = false;
    }
}
