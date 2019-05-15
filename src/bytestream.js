export default class Bytestream {
    constructor(arrayBuffer, start, length) {
        this.bytes = new Uint8Array(arrayBuffer);
        this.start = start || 0;
        this.pos = this.start;
        this.end = start + length || this.bytes.length;
    }

    get length() {
        return this.end - this.start;
    }

    get position() {
        return this.pos;
    }

    get remaining() {
        return this.end - this.pos;
    }

    readU8Array(length) {
        if (this.pos > this.end - length) return null;
        const res = this.bytes.subarray(this.pos, this.pos + length);
        this.pos += length;
        return res;
    }

    readU32Array(rows, cols = 1, names) {
        if (this.pos > this.end - rows * cols * 4) return null;
        if (cols === 1) {
            const array = new Uint32Array(rows);
            for (let i = 0; i < rows; i += 1) {
                array[i] = this.readU32();
            }
            return array;
        }
        
        const array = new Array(rows);
        for (let i = 0; i < rows; i += 1) {
            let row = null;
            if (names) {
                row = {};
                for (let j = 0; j < cols; j += 1) {
                    row[names[j]] = this.readU32();
                }
            } else {
                row = new Uint32Array(cols);
                for (let j = 0; j < cols; j += 1) {
                    row[j] = this.readU32();
                }
            }
            array[i] = row;
        }
        return array;
    }

    read8() {
        return (this.readU8() << 24) >> 24;
    }

    readU8() {
        if (this.pos >= this.end) return null;
        // eslint-disable-next-line no-plusplus
        return this.bytes[this.pos++];
    }

    read16() {
        return (this.readU16() << 16) >> 16;
    }

    readU16() {
        if (this.pos >= this.end - 1) return null;
        const res = (this.bytes[this.pos + 0] << 8) | this.bytes[this.pos + 1];
        this.pos += 2;
        return res;
    }

    read24() {
        return (this.readU24() << 8) >> 8;
    }

    readU24() {
        const pos = this.pos;
        const bytes = this.bytes;
        if (pos > this.end - 3) return null;
        const res = (bytes[pos + 0] << 16) | (bytes[pos + 1] << 8) | bytes[pos + 2];
        this.pos += 3;
        return res;
    }

    peek32(advance) {
        const pos = this.pos;
        const bytes = this.bytes;
        if (pos > this.end - 4) return null;
        const res = (bytes[pos + 0] << 24) | (bytes[pos + 1] << 16) | (bytes[pos + 2] << 8) | bytes[pos + 3];
        if (advance) {
            this.pos += 4;
        }
        return res;
    }

    read32() {
        return this.peek32(true);
    }

    readU32() {
        return this.peek32(true) >>> 0;
    }

    read4CC() {
        const pos = this.pos;
        if (pos > this.end - 4) return null;
        let res = '';
        for (let i = 0; i < 4; i += 1) {
            res += String.fromCharCode(this.bytes[pos + i]);
        }
        this.pos += 4;
        return res;
    }

    readFP16() {
        return this.read32() / 65536;
    }

    readFP8() {
        return this.read16() / 256;
    }

    readISO639() {
        const bits = this.readU16();
        let res = '';
        for (let i = 0; i < 3; i += 1) {
            const c = (bits >>> ((2 - i) * 5)) & 0x1f;
            res += String.fromCharCode(c + 0x60);
        }
        return res;
    }

    readUTF8(length) {
        let res = '';
        for (let i = 0; i < length; i += 1) {
            res += String.fromCharCode(this.readU8());
        }
        return res;
    }

    readPString(max) {
        const len = this.readU8();
        // assert(len <= max);
        const res = this.readUTF8(len);
        this.reserved(max - len - 1, 0);
        return res;
    }

    skip(length) {
        this.seek(this.pos + length);
    }

    reserved(length, value) {
        for (let i = 0; i < length; i += 1) {
            // assert(this.readU8() == value);
        }
    }

    seek(index) {
        if (index < 0 || index > this.end) {
            // error('Index out of bounds (bounds: [0, ' + this.end + '], index: ' + index + ').');
        }
        this.pos = index;
    }

    subStream(start, length) {
        return new Bytestream(this.bytes.buffer, start, length);
    }
}
