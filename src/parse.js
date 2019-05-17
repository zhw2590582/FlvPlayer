import { mergeBuffer, readBufferSum, readString } from './utils';

export default class Parse {
    constructor(flv) {
        this.flv = flv;
        const { options, debug } = flv;
        this.uint8 = new Uint8Array(0);
        this.index = 0;
        this.header = null;
        this.loaded = false;

        flv.on('streamStart', () => {
            debug.log('stream-start', options.url);
        });

        flv.on('streaming', uint8 => {
            this.uint8 = mergeBuffer(this.uint8, uint8);
            this.parse();
        });

        flv.on('streamEnd', uint8 => {
            debug.log('stream-end');
            if (uint8) {
                this.uint8 = uint8;
                this.index = 0;
                this.header = null;
                this.parse();
            }

            this.loaded = true;
            flv.emit('parseDone');
            debug.log('parse-done');
        });
    }

    parse() {
        const { debug } = this.flv;
        if (!this.header && this.readable(13)) {
            const header = Object.create(null);
            header.signature = readString(this.read(3));
            [header.version] = this.read(1);
            debug.error(header.signature === 'FLV' && header.version === 1, 'FLV header not found');
            [header.flags] = this.read(1);
            header.headersize = readBufferSum(this.read(4));
            this.header = header;
            const prevTagSize = readBufferSum(this.read(4));
            debug.error(prevTagSize === 0, `PrevTagSize0 should be equal to 0, but got ${prevTagSize}`);
            this.flv.emit('parseHeader', this.header);
            debug.log('parse-header', this.header);
        }

        while (this.index < this.uint8.length) {
            const restIndex = this.index;
            const tag = Object.create(null);

            if (this.readable(11)) {
                [tag.tagType] = this.read(1);
                tag.dataSize = readBufferSum(this.read(3));
                const ts2 = this.read(1);
                const ts1 = this.read(1);
                const ts0 = this.read(1);
                const ts3 = this.read(1);
                tag.timestamp = ts0 | (ts1 << 8) | (ts2 << 16) | (ts3 << 24);
                tag.streamID = readBufferSum(this.read(3));
                debug.error(tag.streamID === 0, `streamID should be equal to 0, but got ${tag.streamID}`);
            } else {
                this.index = restIndex;
                break;
            }

            if (this.readable(tag.dataSize + 4)) {
                tag.body = this.read(tag.dataSize);
                const prevTagSize = readBufferSum(this.read(4));
                debug.error(prevTagSize === tag.dataSize + 11, `Invalid PrevTagSize: ${prevTagSize}`);
            } else {
                this.index = restIndex;
                break;
            }

            this.flv.emit('parseTag', tag);
        }
    }

    readable(length) {
        return this.uint8.length - this.index >= length;
    }

    read(length) {
        const tempUint8 = new Uint8Array(length);
        for (let i = 0; i < length; i += 1) {
            tempUint8[i] = this.uint8[this.index];
            this.index += 1;
        }
        return tempUint8;
    }
}
