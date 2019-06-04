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
        this.timestamps = [0];
        this.audioInputLength = 0;
        this.decoding = false;
        this.byteSize = 0;
        this.loaded = 0;

        this.decodeErrorBuffer = new Uint8Array();
        this.decodeWaitingBuffer = new Uint8Array();

        flv.on('destroy', () => {
            this.audiobuffers = [];
            this.stop();
        });

        flv.on('demuxDone', () => {
            // TODO...
            setTimeout(() => {
                if (this.decodeWaitingBuffer.buffer) {
                    this.context.decodeAudioData(this.decodeWaitingBuffer.buffer, audiobuffer => {
                        this.decodeWaitingBuffer = new Uint8Array();
                        this.decodeErrorBuffer = new Uint8Array();
                        this.loaded += audiobuffer.duration;
                        this.byteSize += audiobuffer.length;
                        this.audiobuffers.push(audiobuffer);
                        flv.emit('audioLoaded', this.loaded);
                        this.decoding = false;
                    });
                } else {
                    this.decoding = false;
                }
            }, 500);
        });

        flv.on('audioData', (uint8, timestamp) => {
            this.decoding = true;
            this.audioInputLength += 1;
            if (this.decodeWaitingBuffer.byteLength >= 512 * 512) {
                this.timestamps.push(timestamp);
                const buffer = mergeBuffer(this.decodeErrorBuffer, this.decodeWaitingBuffer).buffer;
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
                this.decodeWaitingBuffer = mergeBuffer(this.decodeWaitingBuffer, uint8);
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
        const audioCurrentTime = this.timestamps[this.playIndex];
        const videoCurrentTime = this.flv.player.currentTime * 1000;
        const timeDifference = audioCurrentTime - videoCurrentTime;
        this.flv.debug.log('audio-current-time', audioCurrentTime);
        this.flv.debug.log('video-current-time', videoCurrentTime);
        this.flv.debug.log('time-difference', timeDifference);
        if (Math.abs(timeDifference) > 500) {
            if (audioCurrentTime > videoCurrentTime) {
                setTimeout(() => {
                    this.source.start();
                }, audioCurrentTime - videoCurrentTime);
            } else {
                this.source.start(0, (videoCurrentTime - audioCurrentTime) / 1000);
            }
        } else {
            this.source.start();
        }
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
