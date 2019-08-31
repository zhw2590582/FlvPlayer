import Dida from './dida';

export default class AudioDecoder {
    constructor(flv, decoder) {
        this.flv = flv;

        this.dida = new Dida({
            volume: flv.options.muted ? 0 : flv.options.volume,
            cache: flv.options.cache,
            onNext: timestamp => {
                const currentTime = decoder.currentTime * 1000;
                const timeDiff = Math.abs(timestamp - currentTime);
                return timeDiff >= flv.options.maxTimeDiff ? currentTime : timestamp;
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
            this.volume = 7;
        }
    }

    get volume() {
        return this.dida.volume;
    }

    set volume(volume) {
        this.dida.volume = volume;
        this.flv.emit('volumechange', volume);
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
