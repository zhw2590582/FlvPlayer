import { mergeBuffer } from '../../utils';

export default class AudioDecoder {
    constructor(flv) {
        this.flv = flv;
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.gainNode = this.context.createGain();
        this.gainNode.gain.value = flv.options.volume;

        this.playing = false;
        this.playIndex = 0;
        this.audiobuffers = [];
        this.timestamps = [];
        this.audioInputLength = 0;
        this.decoding = false;
        this.byteSize = 0;
        this.loaded = 0;

        flv.on('destroy', () => {
            this.audiobuffers = [];
            this.stop();
        });

        let timestampTmp = [];
        this.decodeErrorBuffer = new Uint8Array();
        this.decodeWaitingBuffer = new Uint8Array();

        flv.on('audioData', (uint8, timestamp) => {
            this.decoding = true;
            this.audioInputLength += 1;
            if (this.decodeWaitingBuffer.byteLength >= 1024 * 128) {
                this.timestamps.push(timestampTmp[0]);
                timestampTmp = [];
                const { buffer } = mergeBuffer(this.decodeErrorBuffer, this.decodeWaitingBuffer);
                this.decodeWaitingBuffer = new Uint8Array();
                this.context
                    .decodeAudioData(buffer, audiobuffer => {
                        this.loaded += audiobuffer.duration;
                        this.byteSize += audiobuffer.length;
                        this.audiobuffers.push(audiobuffer);
                        flv.emit('audioLoaded', this.loaded);
                        this.decodeErrorBuffer = new Uint8Array();
                    })
                    .catch(() => {
                        this.decodeErrorBuffer = mergeBuffer(this.decodeErrorBuffer, this.decodeWaitingBuffer);
                    });
            } else {
                timestampTmp.push(timestamp);
                this.decodeWaitingBuffer = mergeBuffer(this.decodeWaitingBuffer, uint8);
            }
        });

        flv.on('timeupdate', currentTime => {
            if (this.flv.demuxer.demuxed && this.decodeWaitingBuffer.length) {
                this.timestamps.push(timestampTmp[0]);
                timestampTmp = [];
                this.context.decodeAudioData(this.decodeWaitingBuffer.buffer, audiobuffer => {
                    this.decodeWaitingBuffer = new Uint8Array();
                    this.decodeErrorBuffer = new Uint8Array();
                    this.loaded += audiobuffer.duration;
                    this.byteSize += audiobuffer.length;
                    this.audiobuffers.push(audiobuffer);
                    flv.emit('audioLoaded', this.loaded);
                    this.decoding = false;
                });
            }

            const timestamp = this.timestamps[this.playIndex];
            if (timestamp && currentTime * 1000 >= timestamp) {
                const state = this.queue(this.playIndex);
                if (state) {
                    this.playIndex += 1;
                } else {
                    this.stop();
                }
            }
        });
    }

    queue(index) {
        const audiobuffer = this.audiobuffers[index];
        if (!audiobuffer) return false;
        this.source = this.context.createBufferSource();
        this.source.buffer = audiobuffer;
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.source.onended = () => {
            if (this.flv.options.live) {
                this.audiobuffers[index] = null;
            }
        };
        this.playing = true;
        this.source.start();
        return true;
    }

    play(startTime = 0) {
        this.stop();
        let time = 0;
        const index = this.audiobuffers.findIndex(item => {
            time += item.duration;
            return startTime <= time;
        });

        const audiobuffer = this.audiobuffers[index];
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
            if (this.flv.options.live) {
                this.audiobuffers[index] = null;
            }
        };
        this.playing = true;
        this.source.start(0, offset);
        this.playIndex = index + 1;
    }

    stop() {
        this.playing = false;
        if (this.source) {
            this.source.onended = null;
            this.source.stop();
        }
    }
}
