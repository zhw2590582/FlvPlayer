import Dida from './dida';

export default class AudioDecoder {
    constructor(flv) {
        this.flv = flv;
        this.dida = new Dida();

        flv.on('audioData', (uint8, timestamp) => {
            this.dida.load(uint8, timestamp);
        });

        flv.on('timeupdate', currentTime => {
            // this.dida.play(currentTime * 1000);
        });

        flv.on('destroy', () => {
            this.dida.destroy();
        });
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
