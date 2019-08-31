function mergeBuffer(...buffers) {
    const Cons = buffers[0].constructor;
    return buffers.reduce((pre, val) => {
        const merge = new Cons((pre.byteLength | 0) + (val.byteLength | 0));
        merge.set(pre, 0);
        merge.set(val, pre.byteLength | 0);
        return merge;
    }, new Cons());
}

function debounce(func, wait, context) {
    let timeout;
    return function fn(...args) {
        const later = function later() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export default class Dida {
    constructor(option = {}) {
        this.option = {
            ...Dida.option,
            ...option,
        };

        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.gainNode = this.context.createGain();
        this.gainNode.gain.value = this.option.volume;
        this.source = null;

        this.decoding = false;
        this.playing = false;
        this.loadLength = 0;
        this.loadByteSize = 0;
        this.audioDuration = 0;
        this.audioLength = 0;

        this.timestamps = [];
        this.audiobuffers = [];
        this.timestampTmp = [];
        this.decodeErrorBuffer = new Uint8Array();
        this.decodeWaitingBuffer = new Uint8Array();

        this.restDetectFn = debounce(() => {
            if (this.decodeWaitingBuffer.length) {
                this.timestamps.push(this.timestampTmp[0]);
                this.timestampTmp = [];
                const { buffer } = this.decodeWaitingBuffer;
                this.decodeWaitingBuffer = new Uint8Array();
                this.decodeErrorBuffer = new Uint8Array();
                this.context.decodeAudioData(buffer, audiobuffer => {
                    this.audioDuration += audiobuffer.duration;
                    this.audioLength += audiobuffer.length;
                    this.audiobuffers.push(audiobuffer);
                    this.decoding = false;
                    this.option.onEnd();
                });
            }
        }, this.option.endDetectTime);
    }

    static get option() {
        return {
            volume: 0.7,
            cache: true,
            chunk: 64 * 1024,
            endDetectTime: 1000,
            onLoad: () => null,
            onStop: () => null,
            onPlay: () => null,
            onNext: t => t,
            onEnd: () => null,
            onDestroy: () => null,
            onDecodeDone: () => null,
            onDecodeError: () => null,
        };
    }

    get volume() {
        return this.gainNode.gain.value;
    }

    set volume(value) {
        this.gainNode.gain.value = value;
    }

    destroy() {
        this.stop();
        this.context = null;
        this.gainNode = null;
        this.source = null;
        this.timestamps = [];
        this.audiobuffers = [];
        this.timestampTmp = [];
        this.decodeErrorBuffer = new Uint8Array();
        this.decodeWaitingBuffer = new Uint8Array();
        this.option.onDestroy();
        return this;
    }

    load(uint8, timestamp) {
        this.decoding = true;
        this.loadLength += 1;
        this.loadByteSize += uint8.byteLength;
        this.option.onLoad(uint8, timestamp);
        if (this.decodeWaitingBuffer.byteLength >= this.option.chunk) {
            this.timestamps.push(this.timestampTmp[0]);
            this.timestampTmp = [];
            const { buffer } = mergeBuffer(this.decodeErrorBuffer, this.decodeWaitingBuffer);
            this.decodeWaitingBuffer = new Uint8Array();
            this.context
                .decodeAudioData(buffer, audiobuffer => {
                    this.audioDuration += audiobuffer.duration;
                    this.audioLength += audiobuffer.length;
                    this.audiobuffers.push(audiobuffer);
                    this.decodeErrorBuffer = new Uint8Array();
                    this.option.onDecodeDone(audiobuffer);
                })
                .catch(error => {
                    this.decodeErrorBuffer = mergeBuffer(this.decodeErrorBuffer, this.decodeWaitingBuffer);
                    this.option.onDecodeError(error);
                });
        } else {
            this.timestampTmp.push(timestamp);
            this.decodeWaitingBuffer = mergeBuffer(this.decodeWaitingBuffer, uint8);
        }
        this.restDetectFn();
        return this;
    }

    play(startTime = 0) {
        this.stop();
        this.playing = true;
        const index = this.timestamps.findIndex((timestamp, i) => {
            const audiobuffer = this.audiobuffers[i];
            return audiobuffer && timestamp + audiobuffer.duration * 1000 >= startTime;
        });
        const timestamp = this.timestamps[index];
        const audiobuffer = this.audiobuffers[index];
        if (timestamp === undefined || audiobuffer === undefined) return this.stop();
        const offset = Math.max(0, (startTime - timestamp) / 1000);
        this.source = this.context.createBufferSource();
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.source.buffer = audiobuffer;
        this.option.onPlay(audiobuffer, startTime, offset);
        this.source.start(0, offset);
        this.source.onended = () => {
            const nextTimestamp = this.timestamps[index + 1];
            const nextAudiobuffer = this.audiobuffers[index + 1];
            if (nextTimestamp && nextAudiobuffer) {
                if (!this.option.cache) {
                    this.audiobuffers.splice(0, index + 1);
                    this.timestamps.splice(0, index + 1);
                }
                this.play(this.option.onNext(nextTimestamp));
            } else {
                this.stop();
            }
        };
        return this;
    }

    stop() {
        this.playing = false;
        if (this.source) {
            this.source.onended = null;
            this.source.stop();
            this.source = null;
        }
        this.option.onStop();
        return this;
    }
}
