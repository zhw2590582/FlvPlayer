export function hasOwnProperty(obj, name) {
    return Object.prototype.hasOwnProperty.call(obj, name);
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

export function getNowTime() {
    if (performance && typeof performance.now === 'function') {
        return performance.now();
    }
    return Date.now();
}

export function debounce(func, wait, context) {
    let timeout;
    function fn(...args) {
        const later = function later() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    }

    fn.clearTimeout = function ct() {
        clearTimeout(timeout);
    };

    return fn;
}

export function throttle(callback, delay) {
    let isThrottled = false;
    let args;
    let context;

    function fn(...args2) {
        if (isThrottled) {
            args = args2;
            context = this;
            return;
        }

        isThrottled = true;
        callback.apply(this, args2);
        setTimeout(() => {
            isThrottled = false;
            if (args) {
                fn.apply(context, args);
                args = null;
                context = null;
            }
        }, delay);
    }

    return fn;
}

export function clamp(num, a, b) {
    return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
}

export function setStyle(element, key, value) {
    if (typeof key === 'object') {
        Object.keys(key).forEach(item => {
            setStyle(element, item, key[item]);
        });
    }
    element.style[key] = value;
    return element;
}

export function getStyle(element, key, numberType = true) {
    const value = window.getComputedStyle(element, null).getPropertyValue(key);
    return numberType ? parseFloat(value) : value;
}

export function loadScript(url, name) {
    return new Promise((resolve, reject) => {
        const $script = document.createElement('script');
        $script.type = 'text/javascript';
        $script.onload = () => {
            if (window[name]) {
                resolve(window[name]);
            } else {
                reject(new Error(`Unable to find global variable '${name}' from '${url}'`));
            }
        };
        $script.onerror = () => {
            reject(new Error(`Resource loading failed '${url}'`));
        };
        $script.src = url;
        document.head.appendChild($script);
    });
}

export function proxyPropertys(target, ...sources) {
    sources.forEach(source => {
        Object.getOwnPropertyNames(source).forEach(key => {
            if (!hasOwnProperty(target, key)) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            } else {
                throw new Error(`Instance attribute name is duplicated: ${key}`);
            }
        });
    });
}
