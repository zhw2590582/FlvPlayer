import { mergeBuffer, throttle, calculationRate } from '../utils';
import { checkReadableStream } from '../utils/isSupported';

export default class FetchLoader {
    constructor(flv) {
        this.flv = flv;
        const { options, player, debug } = flv;
        this.byteLength = 0;
        this.reader = null;
        this.chunkStart = 0;
        this.contentLength = 0;
        this.data = new Uint8Array();
        this.readChunk = throttle(this.readChunk, 1000);
        this.chunkSize = options.hasAudio ? options.videoChunk + options.audioChunk : options.videoChunk;

        this.streamRate = calculationRate(rate => {
            flv.emit('streamRate', rate);
        });

        flv.on('destroy', () => {
            if (this.reader) {
                this.reader.cancel();
            }
            this.data = null;
        });

        flv.on('timeupdate', currentTime => {
            if (!options.live && player.loaded - currentTime <= 5) {
                this.readChunk();
            }
        });

        if (checkReadableStream()) {
            debug.log('stream-type', 'Try use ReadableStream');
            this.initFetchStream();
        } else {
            debug.log('stream-type', 'Try use http headers range');
            fetch(options.url, {
                method: 'head',
                credentials: options.withCredentials ? 'include' : 'omit',
                mode: options.cors ? 'cors' : 'no-cors',
            })
                .then(response => {
                    this.contentLength = Number(response.headers.get('content-length')) || options.filesize;
                    debug.log('stream-contentLength', this.contentLength);
                    this.flv.emit('streamStart');
                    this.initFetchRange(0, this.chunkSize);
                })
                .catch(error => {
                    flv.emit('streamError', error);
                    throw error;
                });
        }
    }

    readChunk() {
        const chunkEnd = Math.min(this.chunkStart + this.chunkSize, this.data.length);
        if (chunkEnd > this.chunkStart) {
            const chunkData = this.data.subarray(this.chunkStart, chunkEnd);
            this.flv.emit('streaming', chunkData);
            this.chunkStart = chunkEnd;
        }
    }

    initFetchStream() {
        const { options, debug } = this.flv;
        this.flv.emit('streamStart');
        return fetch(options.url, {
            credentials: options.withCredentials ? 'include' : 'omit',
            mode: options.cors ? 'cors' : 'no-cors',
            headers: options.headers,
        })
            .then(response => {
                if (response.body && typeof response.body.getReader === 'function') {
                    this.reader = response.body.getReader();
                    return function read() {
                        return this.reader
                            .read()
                            .then(({ done, value }) => {
                                if (done) {
                                    this.flv.emit('streamEnd');
                                    debug.log('stream-end', `${this.byteLength} byte`);
                                    return null;
                                }

                                const uint8 = new Uint8Array(value);
                                this.byteLength += uint8.byteLength;
                                this.streamRate(uint8.byteLength);

                                if (options.live) {
                                    this.flv.emit('streaming', uint8);
                                } else {
                                    this.data = mergeBuffer(this.data, uint8);
                                    if (this.chunkStart === 0 && this.data.length >= this.chunkSize) {
                                        this.readChunk();
                                    }
                                }

                                return read.call(this);
                            })
                            .catch(error => {
                                this.flv.emit('streamError', error);
                                throw error;
                            });
                    }.call(this);
                }

                debug.log('stream-type', 'Try use response arrayBuffer');
                return response.arrayBuffer();
            })
            .then(arrayBuffer => {
                if (arrayBuffer && arrayBuffer.byteLength && !options.live) {
                    this.data = new Uint8Array(arrayBuffer);
                    this.byteLength += this.data.byteLength;
                    this.flv.emit('streamEnd', this.data);
                    debug.log('stream-end', `${this.byteLength} byte`);
                }
            })
            .catch(error => {
                this.flv.emit('streamError', error);
                throw error;
            });
    }

    initFetchRange(rangeStart, rangeEnd) {
        const { options } = this.flv;
        return fetch(options.url, {
            credentials: options.withCredentials ? 'include' : 'omit',
            mode: options.cors ? 'cors' : 'no-cors',
            headers: {
                ...options.headers,
                range: `bytes=${rangeStart}-${rangeEnd}`,
            },
        })
            .then(response => response.arrayBuffer())
            .then(value => {
                const uint8 = new Uint8Array(value);
                this.byteLength += uint8.byteLength;
                this.streamRate(uint8.byteLength);

                if (options.live) {
                    this.flv.emit('streaming', uint8);
                } else {
                    this.data = mergeBuffer(this.data, uint8);
                    if (this.chunkStart === 0 && this.data.length >= this.chunkSize) {
                        this.readChunk();
                    }
                }

                const nextRangeStart = Math.min(this.contentLength, rangeEnd + 1);
                const nextRangeEnd = Math.min(this.contentLength, nextRangeStart + this.chunkSize);
                if (nextRangeEnd > nextRangeStart) {
                    this.initFetchRange(nextRangeStart, nextRangeEnd);
                }
            })
            .catch(error => {
                this.flv.emit('streamError', error);
                throw error;
            });
    }
}
