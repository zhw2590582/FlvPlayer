import { mergeBuffer, throttle, calculationRate } from '../utils';

export default class FetchLoader {
    constructor(flv) {
        this.flv = flv;
        this.byteLength = 0;
        this.reader = null;
        this.chunkStart = 0;
        this.data = new Uint8Array();
        this.readChunk = throttle(this.readChunk, 1000);

        this.streamRate = calculationRate(rate => {
            flv.emit('streamRate', rate);
        });

        flv.on('destroy', () => {
            this.reader.cancel();
            this.data = null;
        });

        flv.on('timeupdate', currentTime => {
            if (!flv.options.live && flv.player.loaded - currentTime <= 5) {
                this.readChunk();
            }
        });

        this.init();
    }

    readChunk() {
        const { options } = this.flv;
        const chunkEnd = Math.min(this.chunkStart + options.chunkSize, this.data.length);
        if (chunkEnd > this.chunkStart) {
            const chunkData = this.data.subarray(this.chunkStart, chunkEnd);
            this.flv.emit('streaming', chunkData);
            this.chunkStart = chunkEnd;
        }
    }

    init() {
        const { options, debug } = this.flv;
        const self = this;
        this.flv.emit('streamStart');
        return fetch(options.url, {
            headers: options.headers,
        })
            .then(response => {
                self.reader = response.body.getReader();
                return (function read() {
                    return self.reader
                        .read()
                        .then(({ done, value }) => {
                            if (done) {
                                self.flv.emit('streamEnd');
                                debug.log('stream-end', `${self.byteLength} byte`);
                                return;
                            }

                            const uint8 = new Uint8Array(value);
                            self.byteLength += uint8.byteLength;
                            self.streamRate(uint8.byteLength);

                            if (options.live) {
                                self.flv.emit('streaming', uint8);
                            } else {
                                self.data = mergeBuffer(self.data, uint8);
                                if (self.chunkStart === 0) {
                                    self.readChunk();
                                }
                            }

                            // eslint-disable-next-line consistent-return
                            return read();
                        })
                        .catch(error => {
                            self.flv.emit('streamError', error);
                            throw error;
                        });
                })();
            })
            .catch(error => {
                self.flv.emit('streamError', error);
                throw error;
            });
    }
}
