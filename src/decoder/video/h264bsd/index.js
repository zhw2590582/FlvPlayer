import { mergeBuffer, readBuffer, createWorker } from '../../../utils';
import H264bsdCanvas from './h264bsd_canvas';
import workerString from './h264bsd.worker';

export default class VideoDecoder {
    constructor(flv) {
        this.flv = flv;
        const { player, events, options } = flv;

        this.playing = false;
        this.playIndex = 0;
        this.videoframes = [];
        this.videoInputLength = 0;
        this.decoding = false;
        this.byteSize = 0;
        this.loaded = 0;
        this.playTimer = null;
        this.decoderWorker = createWorker(workerString);
        this.renderer = new H264bsdCanvas(player.$canvas);

        flv.on('destroy', () => {
            this.videoframes = [];
            this.decoderWorker.terminate();
            this.pause();
        });

        events.proxy(this.decoderWorker, 'message', event => {
            const message = event.data;
            if (!message.hasOwnProperty('type')) return;
            switch (message.type) {
                case 'pictureReady':
                    this.byteSize += message.data.byteLength;
                    this.videoframes.push(message);
                    this.decoding = this.videoframes.length !== this.videoInputLength;
                    this.loaded = this.videoframes.length / player.frameRate;
                    flv.emit('videoLoaded', this.loaded);
                    if (this.videoframes.length === 1 && !options.poster) {
                        this.draw(0);
                    }
                    break;
                default:
                    break;
            }
        });

        let sps = new Uint8Array();
        let pps = new Uint8Array();
        flv.on('videoData', (uint8, timestamp) => {
            const readNalu = readBuffer(uint8);
            readNalu(4);
            const nalHeader = readNalu(1)[0];
            const naluType = nalHeader & 31;
            switch (naluType) {
                case 1:
                case 5: {
                    this.decoding = true;
                    const frame = mergeBuffer(sps, pps, uint8);
                    this.decoderWorker.postMessage({ type: 'queueInput', data: frame.buffer }, [frame.buffer]);
                    this.videoInputLength += 1;
                    break;
                }
                case 7:
                    sps = uint8;
                    break;
                case 8:
                    pps = uint8;
                    break;
                default:
                    break;
            }
        });
    }

    draw(index) {
        const videoframe = this.videoframes[index];
        this.renderer.drawNextOutputPicture(
            videoframe.width,
            videoframe.height,
            videoframe.croppingParams,
            new Uint8Array(videoframe.data),
        );
    }

    queue() {
        const { player } = this.flv;
        const videoframe = this.videoframes[this.playIndex];
        if (!videoframe) {
            this.stop();
            return;
        }
        this.playing = true;
        this.draw(this.playIndex);
        this.playTimer = setTimeout(() => {
            this.playIndex += 1;
            this.queue();
        }, player.frameDuration);
    }

    play(startTime = 0) {
        this.stop();
        const { player } = this.flv;
        this.playIndex = startTime * player.frameRate;
        const videoframe = this.videoframes[this.playIndex];
        if (!videoframe) {
            this.stop();
            return;
        }
        this.queue();
    }

    stop() {
        this.playing = false;
        clearTimeout(this.playTimer);
        this.playTimer = null;
    }
}
