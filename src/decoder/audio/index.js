import { mergeBuffer } from '../../utils';

export default class AudioDecoder {
    constructor(flv) {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.gainNode = this.context.createGain();
        this.gainNode.gain.value = flv.options.volume;

        this.playing = false;
        this.playIndex = 0;
        this.audiobuffers = [];
        this.audioInputLength = 0;
        this.decoding = false;
        this.loaded = 0;

        let decodeErrorBuffer = new Uint8Array();
        let decodeWaitingBuffer = new Uint8Array();

        flv.on('destroy', () => {
            this.audiobuffers = [];
            this.pause();
        });

        flv.on('audioData', (uint8, timestamp) => {
            this.audioInputLength += 1;
            if (this.audioInputLength % 128 === 0) {
                const buffer = mergeBuffer(decodeErrorBuffer, decodeWaitingBuffer).buffer;
                decodeWaitingBuffer = new Uint8Array();
                this.context
                    .decodeAudioData(buffer, audiobuffer => {
                        this.loaded += audiobuffer.duration;
                        this.audiobuffers.push(audiobuffer);
                        this.decoding = this.audiobuffers.length !== this.audioInputLength;
                        flv.emit('audioLoaded', this.loaded);
                        decodeErrorBuffer = new Uint8Array();
                    })
                    .catch(() => {
                        decodeErrorBuffer = mergeBuffer(decodeErrorBuffer, decodeWaitingBuffer);
                    });
            } else {
                decodeWaitingBuffer = mergeBuffer(decodeWaitingBuffer, uint8);
            }
        });
    }

    queue() {
        this.playIndex += 1;
        const audiobuffer = this.audiobuffers[this.playIndex];
        if (!audiobuffer) {
            this.stop();
            return;
        }
        this.source = this.context.createBufferSource();
        this.source.buffer = audiobuffer;
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.source.onended = () => {
            if (this.playing) {
                this.queue();
            }
        };
        this.playing = true;
        this.source.start();
    }

    play(startTime = 0) {
        this.stop();
        let time = 0;
        this.playIndex = this.audiobuffers.findIndex(item => {
            time += item.duration;
            return startTime <= time;
        });
        const audiobuffer = this.audiobuffers[this.playIndex];
        if (!audiobuffer) {
            this.stop();
            return;
        }
        const offset = startTime - (time - audiobuffer.duration);
        this.source = this.context.createBufferSource();
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.source.buffer = audiobuffer;
        this.source.onended = () => {
            if (this.playing) {
                this.queue();
            }
        };
        this.playing = true;
        this.source.start(0, offset);
    }

    stop() {
        this.playing = false;
        if (this.source) {
            this.source.onended = null;
            this.source.stop();
        }
    }
}
