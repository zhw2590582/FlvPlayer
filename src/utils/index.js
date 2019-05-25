export class FlvPlayerError extends Error {
    constructor(message, context) {
        super(message);
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, context || this.constructor);
        }
        this.name = 'FlvPlayerError';
    }
}

export function errorHandle(condition, msg) {
    if (!condition) {
        throw new FlvPlayerError(msg);
    }
    return condition;
}

export function readBuffer(buffer) {
    let index = 0;
    function read(length) {
        const tempUint8 = new Uint8Array(length);
        for (let i = 0; i < length; i += 1) {
            tempUint8[i] = buffer[index];
            index += 1;
        }
        read.index = index;
        return tempUint8;
    }
    read.index = 0;
    return read;
}

export function mergeBuffer(...buffers) {
    const Cons = buffers[0].constructor;
    return buffers.reduce((pre, val) => {
        let merge = new Cons((pre.byteLength | 0) + (val.byteLength | 0));
        merge.set(pre, 0);
        merge.set(val, pre.byteLength | 0);
        return merge;
    }, new Cons());
}

export function readDouble(array) {
    const view = new DataView(new ArrayBuffer(array.length));
    array.forEach((b, i) => {
        view.setUint8(i, b);
    });
    return view.getFloat64(0);
}

export function readBoolean(array) {
    return array[0] !== 0;
}

export function readString(array) {
    return String.fromCharCode.call(String, ...array);
}

export function string2Buffer(string) {
    const result = [];
    for (let i = 0; i < string.length; i += 1) {
        result.push(Number(string.charCodeAt(i).toString(10)));
    }
    return result;
}

export function readBufferSum(array, uint = true) {
    return array.reduce((totle, num, index) => totle + (uint ? num : num - 128) * 256 ** (array.length - index - 1), 0);
}

export function hexToBuffer(hexString) {
    const result = new Uint8Array(hexString.length / 2);
    const bytes = hexString.split('');
    for (let i = 0, j = 0, iz = bytes.length; i < iz; i += 2, j += 1) {
        result[j] = parseInt(bytes[i] + bytes[i + 1], 16);
    }
    return result;
}

export function decimalToBinary(decimalArr) {
    return Array.from(decimalArr).map(item => (Array(8).join(0) + item.toString(2)).toUpperCase().slice(-8));
}

export function decimalToHex(decimalArr) {
    return Array.from(decimalArr).map(item => (Array(2).join(0) + item.toString(16)).toUpperCase().slice(-2));
}
