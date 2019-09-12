import Dida from 'dida.js';

export default class AudioDecoder {
    constructor(flv, decoder) {
        this.flv = flv;

        this.dida = new Dida({
            volume: flv.options.muted ? 0 : flv.options.volume,
            cache: flv.options.cache,
            maxTimeDiff: flv.options.maxTimeDiff,
            touchResume: flv.options.touchResume,
            onNext: timestamp => {
                const currentTime = decoder.currentTime * 1000;
                const timeDiff = timestamp - currentTime;
                flv.debug.log('time-diff', timeDiff);
                if (Math.abs(timeDiff) >= flv.options.maxTimeDiff) {
                    flv.debug.log('time-sync', timeDiff);
                    decoder.currentTime = timestamp / 1000;
                }
                return timestamp;
            },
            onVolumeChange: value => {
                flv.emit('volumechange', value);
            },
            onFreeMemory: info => {
                flv.debug.log('free-audio-memory', info);
                flv.emit('freeAudioMemory', info);
            },
        });

        flv.on('audioData', (uint8, timestamp) => {
            this.dida.load(uint8, timestamp);
        });

        flv.on('destroy', () => {
            this.dida.destroy();
        });
    }

    get muted() {
        return this.volume === 0;
    }

    set muted(value) {
        if (value) {
            this.volume = 0;
        } else {
            this.volume = 0.7;
        }
    }

    get volume() {
        return this.dida.volume;
    }

    set volume(volume) {
        this.dida.volume = volume;
    }

    get decoding() {
        return this.dida.decoding;
    }

    get playing() {
        return this.dida.playing;
    }

    play(startTime = 0) {
        this.dida.play(startTime * 1000);
    }

    stop() {
        this.dida.stop();
    }
}
