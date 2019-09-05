function checkWebAssembly() {
    try {
        if (typeof window.WebAssembly === 'object' && typeof window.WebAssembly.instantiate === 'function') {
            const module = new window.WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
            if (module instanceof window.WebAssembly.Module) {
                return new window.WebAssembly.Instance(module) instanceof window.WebAssembly.Instance;
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}

function checkWorker() {
    return typeof window.Worker === 'function';
}

function checkFetch() {
    return typeof window.fetch === 'function';
}

function checkURL() {
    return window.URL && typeof window.URL.createObjectURL === 'function';
}

function checkReader() {
    return (
        typeof window.ReadableStream === 'function' &&
        typeof window.Response === 'function' &&
        Object.prototype.hasOwnProperty.call(window.Response.prototype, 'body')
    );
}

function checkBlob() {
    return (
        typeof window.Blob === 'function' &&
        (() => {
            try {
                return !!new window.Blob();
            } catch (e) {
                return false;
            }
        })()
    );
}

function checkArrayBuffer() {
    return typeof window.ArrayBuffer === 'function';
}

function checkAACType() {
    const canPlay = new Audio().canPlayType('audio/aac;');
    return canPlay === 'probably' || canPlay === 'maybe';
}

function checkAudioContext() {
    return window.AudioContext || window.webkitAudioContext;
}

function checkCanvas() {
    if (window.WebGLRenderingContext) {
        const canvas = document.createElement('canvas');
        const names = ['webgl2', 'webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
        let context = false;
        for (let i = 0; i < names.length; i += 1) {
            try {
                context = canvas.getContext(names[i]);
                if (context && typeof context.getParameter === 'function') {
                    return true;
                }
            } catch (e) {
                //
            }
        }
        return false;
    }
    return false;
}

export default function isSupported() {
    return (
        checkWebAssembly() &&
        checkWorker() &&
        checkFetch() &&
        checkReader() &&
        checkBlob() &&
        checkArrayBuffer() &&
        checkURL() &&
        checkAACType() &&
        checkAudioContext() &&
        checkCanvas()
    );
}
