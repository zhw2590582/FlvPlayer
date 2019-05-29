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
        const merge = new Cons((pre.byteLength | 0) + (val.byteLength | 0));
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

export function createWorker(workerString) {
    return new Worker(URL.createObjectURL(new Blob([workerString], { type: 'application/javascript' })));
}

export function secondToTime(second) {
    const add0 = num => (num < 10 ? `0${num}` : String(num));
    const hour = Math.floor(second / 3600);
    const min = Math.floor((second - hour * 3600) / 60);
    const sec = Math.floor(second - hour * 3600 - min * 60);
    return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':');
}
