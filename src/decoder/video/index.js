import { calculationRate } from '../../utils';

export default class VideoSuperDecoder {
    constructor(flv, decoder) {
        this.flv = flv;
        const { options, debug, player } = flv;

        this.ready = false;
        this.playing = false;
        this.playIndex = 0;
        this.videoframes = [];
        this.timestamps = [];
        this.videoInputLength = 0;
        this.decoding = false;
        this.byteSize = 0;
        this.loaded = 0;
        this.initLiveTimestamp = false;

        this.decoderRate = calculationRate(rate => {
            flv.emit('decoderRate', rate);
        });

        this.drawRate = calculationRate(rate => {
            flv.emit('drawRate', rate);
        });

        flv.on('destroy', () => {
            this.videoframes = [];
            this.timestamps = [];
            this.decoderWorker.terminate();
            this.stop();
        });

        flv.on('befoerdecoding', timestamp => {
            this.decoding = true;
            this.timestamps.push(timestamp);
            this.videoInputLength += 1;
            if (options.live && !this.initLiveTimestamp) {
                decoder.currentTime = timestamp / 1000;
                this.initLiveTimestamp = true;
            }
        });

        flv.on('decoding', (message, byteSize) => {
            if (options.live && !this.playing && this.ready) return;
            this.byteSize += byteSize;
            this.videoframes.push(message);
            this.decoding = this.videoframes.length !== this.videoInputLength;
            this.loaded = this.videoframes.length / player.frameRate;
            flv.emit('videoLoaded', this.loaded);
            this.decoderRate(1);
            if (!this.ready && this.videoframes.length === 1) {
                this.ready = true;
                flv.emit('ready');
            }
        });

        flv.on('timeupdate', currentTime => {
            const index = this.playIndex;
            const timestamp = this.timestamps[index];
            if (timestamp !== undefined && currentTime * 1000 >= timestamp) {
                if (this.draw(index)) {
                    const framesSize = this.getFramesSize(index);
                    if (
                        options.live &&
                        framesSize >= options.freeMemory &&
                        this.videoframes.length - 1 > index &&
                        this.timestamps.length - 1 > index
                    ) {
                        this.playIndex = 0;
                        this.videoframes.splice(0, index + 1);
                        this.timestamps.splice(0, index + 1);
                        decoder.currentTime = this.timestamps[0] / 1000;
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

    draw(index) {
        const videoframe = this.videoframes[index];
        if (!videoframe) return false;
        this.renderer.drawFrame(videoframe);
        this.drawRate(1);
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
