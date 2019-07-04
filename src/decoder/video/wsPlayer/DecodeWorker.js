var Module = typeof Module !== 'undefined' ? Module : {};
var moduleOverrides = {};
var key;
for (key in Module) {
    if (Module.hasOwnProperty(key)) {
        moduleOverrides[key] = Module[key];
    }
}
Module['arguments'] = [];
Module['thisProgram'] = './this.program';
Module['quit'] = function(status, toThrow) {
    throw toThrow;
};
Module['preRun'] = [];
Module['postRun'] = [];
var ENVIRONMENT_IS_WEB = false;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;
ENVIRONMENT_IS_WEB = typeof window === 'object';
ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
ENVIRONMENT_IS_NODE =
    typeof process === 'object' && typeof require === 'function' && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
var scriptDirectory = '';
function locateFile(path) {
    if (Module['locateFile']) {
        return Module['locateFile'](path, scriptDirectory);
    } else {
        return scriptDirectory + path;
    }
}
if (ENVIRONMENT_IS_NODE) {
    scriptDirectory = __dirname + '/';
    var nodeFS;
    var nodePath;
    Module['read'] = function shell_read(filename, binary) {
        var ret;
        if (!nodeFS) nodeFS = require('fs');
        if (!nodePath) nodePath = require('path');
        filename = nodePath['normalize'](filename);
        ret = nodeFS['readFileSync'](filename);
        return binary ? ret : ret.toString();
    };
    Module['readBinary'] = function readBinary(filename) {
        var ret = Module['read'](filename, true);
        if (!ret.buffer) {
            ret = new Uint8Array(ret);
        }
        assert(ret.buffer);
        return ret;
    };
    if (process['argv'].length > 1) {
        Module['thisProgram'] = process['argv'][1].replace(/\\/g, '/');
    }
    Module['arguments'] = process['argv'].slice(2);
    if (typeof module !== 'undefined') {
        module['exports'] = Module;
    }
    process['on']('uncaughtException', function(ex) {
        if (!(ex instanceof ExitStatus)) {
            throw ex;
        }
    });
    process['on']('unhandledRejection', abort);
    Module['quit'] = function(status) {
        process['exit'](status);
    };
    Module['inspect'] = function() {
        return '[Emscripten Module object]';
    };
} else if (ENVIRONMENT_IS_SHELL) {
    if (typeof read != 'undefined') {
        Module['read'] = function shell_read(f) {
            return read(f);
        };
    }
    Module['readBinary'] = function readBinary(f) {
        var data;
        if (typeof readbuffer === 'function') {
            return new Uint8Array(readbuffer(f));
        }
        data = read(f, 'binary');
        assert(typeof data === 'object');
        return data;
    };
    if (typeof scriptArgs != 'undefined') {
        Module['arguments'] = scriptArgs;
    } else if (typeof arguments != 'undefined') {
        Module['arguments'] = arguments;
    }
    if (typeof quit === 'function') {
        Module['quit'] = function(status) {
            quit(status);
        };
    }
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
    if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = self.location.href;
    } else if (document.currentScript) {
        scriptDirectory = document.currentScript.src;
    }
    if (scriptDirectory.indexOf('blob:') !== 0) {
        scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf('/') + 1);
    } else {
        scriptDirectory = '';
    }
    Module['read'] = function shell_read(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);
        return xhr.responseText;
    };
    if (ENVIRONMENT_IS_WORKER) {
        Module['readBinary'] = function readBinary(url) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            xhr.responseType = 'arraybuffer';
            xhr.send(null);
            return new Uint8Array(xhr.response);
        };
    }
    Module['readAsync'] = function readAsync(url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function xhr_onload() {
            if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
                onload(xhr.response);
                return;
            }
            onerror();
        };
        xhr.onerror = onerror;
        xhr.send(null);
    };
    Module['setWindowTitle'] = function(title) {
        document.title = title;
    };
} else {
}
var out =
    Module['print'] ||
    (typeof console !== 'undefined' ? console.log.bind(console) : typeof print !== 'undefined' ? print : null);
var err =
    Module['printErr'] ||
    (typeof printErr !== 'undefined'
        ? printErr
        : (typeof console !== 'undefined' && console.warn.bind(console)) || out);
for (key in moduleOverrides) {
    if (moduleOverrides.hasOwnProperty(key)) {
        Module[key] = moduleOverrides[key];
    }
}
moduleOverrides = undefined;
var STACK_ALIGN = 16;
function staticAlloc(size) {
    var ret = STATICTOP;
    STATICTOP = (STATICTOP + size + 15) & -16;
    return ret;
}
function dynamicAlloc(size) {
    var ret = HEAP32[DYNAMICTOP_PTR >> 2];
    var end = (ret + size + 15) & -16;
    HEAP32[DYNAMICTOP_PTR >> 2] = end;
    if (end >= TOTAL_MEMORY) {
        var success = enlargeMemory();
        if (!success) {
            HEAP32[DYNAMICTOP_PTR >> 2] = ret;
            return 0;
        }
    }
    return ret;
}
function alignMemory(size, factor) {
    if (!factor) factor = STACK_ALIGN;
    return Math.ceil(size / factor) * factor;
}
function getNativeTypeSize(type) {
    switch (type) {
        case 'i1':
        case 'i8':
            return 1;
        case 'i16':
            return 2;
        case 'i32':
            return 4;
        case 'i64':
            return 8;
        case 'float':
            return 4;
        case 'double':
            return 8;
        default: {
            if (type[type.length - 1] === '*') {
                return 4;
            } else if (type[0] === 'i') {
                var bits = parseInt(type.substr(1));
                assert(bits % 8 === 0);
                return bits / 8;
            } else {
                return 0;
            }
        }
    }
}
var asm2wasmImports = {
    'f64-rem': function(x, y) {
        return x % y;
    },
    debugger: function() {
        debugger;
    },
};
var functionPointers = new Array(0);
var GLOBAL_BASE = 1024;
var ABORT = false;
var EXITSTATUS = 0;
function assert(condition, text) {
    if (!condition) {
        abort('Assertion failed: ' + text);
    }
}
function setValue(ptr, value, type, noSafe) {
    type = type || 'i8';
    if (type.charAt(type.length - 1) === '*') type = 'i32';
    switch (type) {
        case 'i1':
            HEAP8[ptr >> 0] = value;
            break;
        case 'i8':
            HEAP8[ptr >> 0] = value;
            break;
        case 'i16':
            HEAP16[ptr >> 1] = value;
            break;
        case 'i32':
            HEAP32[ptr >> 2] = value;
            break;
        case 'i64':
            (tempI64 = [
                value >>> 0,
                ((tempDouble = value),
                +Math_abs(tempDouble) >= 1
                    ? tempDouble > 0
                        ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0
                        : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0
                    : 0),
            ]),
                (HEAP32[ptr >> 2] = tempI64[0]),
                (HEAP32[(ptr + 4) >> 2] = tempI64[1]);
            break;
        case 'float':
            HEAPF32[ptr >> 2] = value;
            break;
        case 'double':
            HEAPF64[ptr >> 3] = value;
            break;
        default:
            abort('invalid type for setValue: ' + type);
    }
}
var ALLOC_STATIC = 2;
var ALLOC_NONE = 4;
function allocate(slab, types, allocator, ptr) {
    var zeroinit, size;
    if (typeof slab === 'number') {
        zeroinit = true;
        size = slab;
    } else {
        zeroinit = false;
        size = slab.length;
    }
    var singleType = typeof types === 'string' ? types : null;
    var ret;
    if (allocator == ALLOC_NONE) {
        ret = ptr;
    } else {
        ret = [typeof _malloc === 'function' ? _malloc : staticAlloc, stackAlloc, staticAlloc, dynamicAlloc][
            allocator === undefined ? ALLOC_STATIC : allocator
        ](Math.max(size, singleType ? 1 : types.length));
    }
    if (zeroinit) {
        var stop;
        ptr = ret;
        assert((ret & 3) == 0);
        stop = ret + (size & ~3);
        for (; ptr < stop; ptr += 4) {
            HEAP32[ptr >> 2] = 0;
        }
        stop = ret + size;
        while (ptr < stop) {
            HEAP8[ptr++ >> 0] = 0;
        }
        return ret;
    }
    if (singleType === 'i8') {
        if (slab.subarray || slab.slice) {
            HEAPU8.set(slab, ret);
        } else {
            HEAPU8.set(new Uint8Array(slab), ret);
        }
        return ret;
    }
    var i = 0,
        type,
        typeSize,
        previousType;
    while (i < size) {
        var curr = slab[i];
        type = singleType || types[i];
        if (type === 0) {
            i++;
            continue;
        }
        if (type == 'i64') type = 'i32';
        setValue(ret + i, curr, type);
        if (previousType !== type) {
            typeSize = getNativeTypeSize(type);
            previousType = type;
        }
        i += typeSize;
    }
    return ret;
}
function getMemory(size) {
    if (!staticSealed) return staticAlloc(size);
    if (!runtimeInitialized) return dynamicAlloc(size);
    return _malloc(size);
}
var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;
function UTF8ArrayToString(u8Array, idx) {
    var endPtr = idx;
    while (u8Array[endPtr]) ++endPtr;
    if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
        return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
    } else {
        var u0, u1, u2, u3, u4, u5;
        var str = '';
        while (1) {
            u0 = u8Array[idx++];
            if (!u0) return str;
            if (!(u0 & 128)) {
                str += String.fromCharCode(u0);
                continue;
            }
            u1 = u8Array[idx++] & 63;
            if ((u0 & 224) == 192) {
                str += String.fromCharCode(((u0 & 31) << 6) | u1);
                continue;
            }
            u2 = u8Array[idx++] & 63;
            if ((u0 & 240) == 224) {
                u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
            } else {
                u3 = u8Array[idx++] & 63;
                if ((u0 & 248) == 240) {
                    u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | u3;
                } else {
                    u4 = u8Array[idx++] & 63;
                    if ((u0 & 252) == 248) {
                        u0 = ((u0 & 3) << 24) | (u1 << 18) | (u2 << 12) | (u3 << 6) | u4;
                    } else {
                        u5 = u8Array[idx++] & 63;
                        u0 = ((u0 & 1) << 30) | (u1 << 24) | (u2 << 18) | (u3 << 12) | (u4 << 6) | u5;
                    }
                }
            }
            if (u0 < 65536) {
                str += String.fromCharCode(u0);
            } else {
                var ch = u0 - 65536;
                str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
            }
        }
    }
}
function UTF8ToString(ptr) {
    return UTF8ArrayToString(HEAPU8, ptr);
}
function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
    if (!(maxBytesToWrite > 0)) return 0;
    var startIdx = outIdx;
    var endIdx = outIdx + maxBytesToWrite - 1;
    for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343) {
            var u1 = str.charCodeAt(++i);
            u = (65536 + ((u & 1023) << 10)) | (u1 & 1023);
        }
        if (u <= 127) {
            if (outIdx >= endIdx) break;
            outU8Array[outIdx++] = u;
        } else if (u <= 2047) {
            if (outIdx + 1 >= endIdx) break;
            outU8Array[outIdx++] = 192 | (u >> 6);
            outU8Array[outIdx++] = 128 | (u & 63);
        } else if (u <= 65535) {
            if (outIdx + 2 >= endIdx) break;
            outU8Array[outIdx++] = 224 | (u >> 12);
            outU8Array[outIdx++] = 128 | ((u >> 6) & 63);
            outU8Array[outIdx++] = 128 | (u & 63);
        } else if (u <= 2097151) {
            if (outIdx + 3 >= endIdx) break;
            outU8Array[outIdx++] = 240 | (u >> 18);
            outU8Array[outIdx++] = 128 | ((u >> 12) & 63);
            outU8Array[outIdx++] = 128 | ((u >> 6) & 63);
            outU8Array[outIdx++] = 128 | (u & 63);
        } else if (u <= 67108863) {
            if (outIdx + 4 >= endIdx) break;
            outU8Array[outIdx++] = 248 | (u >> 24);
            outU8Array[outIdx++] = 128 | ((u >> 18) & 63);
            outU8Array[outIdx++] = 128 | ((u >> 12) & 63);
            outU8Array[outIdx++] = 128 | ((u >> 6) & 63);
            outU8Array[outIdx++] = 128 | (u & 63);
        } else {
            if (outIdx + 5 >= endIdx) break;
            outU8Array[outIdx++] = 252 | (u >> 30);
            outU8Array[outIdx++] = 128 | ((u >> 24) & 63);
            outU8Array[outIdx++] = 128 | ((u >> 18) & 63);
            outU8Array[outIdx++] = 128 | ((u >> 12) & 63);
            outU8Array[outIdx++] = 128 | ((u >> 6) & 63);
            outU8Array[outIdx++] = 128 | (u & 63);
        }
    }
    outU8Array[outIdx] = 0;
    return outIdx - startIdx;
}
function lengthBytesUTF8(str) {
    var len = 0;
    for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343) u = (65536 + ((u & 1023) << 10)) | (str.charCodeAt(++i) & 1023);
        if (u <= 127) {
            ++len;
        } else if (u <= 2047) {
            len += 2;
        } else if (u <= 65535) {
            len += 3;
        } else if (u <= 2097151) {
            len += 4;
        } else if (u <= 67108863) {
            len += 5;
        } else {
            len += 6;
        }
    }
    return len;
}
var UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined;
function allocateUTF8(str) {
    var size = lengthBytesUTF8(str) + 1;
    var ret = _malloc(size);
    if (ret) stringToUTF8Array(str, HEAP8, ret, size);
    return ret;
}
var WASM_PAGE_SIZE = 65536;
function alignUp(x, multiple) {
    if (x % multiple > 0) {
        x += multiple - (x % multiple);
    }
    return x;
}
var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
function updateGlobalBuffer(buf) {
    Module['buffer'] = buffer = buf;
}
function updateGlobalBufferViews() {
    Module['HEAP8'] = HEAP8 = new Int8Array(buffer);
    Module['HEAP16'] = HEAP16 = new Int16Array(buffer);
    Module['HEAP32'] = HEAP32 = new Int32Array(buffer);
    Module['HEAPU8'] = HEAPU8 = new Uint8Array(buffer);
    Module['HEAPU16'] = HEAPU16 = new Uint16Array(buffer);
    Module['HEAPU32'] = HEAPU32 = new Uint32Array(buffer);
    Module['HEAPF32'] = HEAPF32 = new Float32Array(buffer);
    Module['HEAPF64'] = HEAPF64 = new Float64Array(buffer);
}
var STATIC_BASE, STATICTOP, staticSealed;
var STACK_BASE, STACKTOP, STACK_MAX;
var DYNAMIC_BASE, DYNAMICTOP_PTR;
STATIC_BASE = STATICTOP = STACK_BASE = STACKTOP = STACK_MAX = DYNAMIC_BASE = DYNAMICTOP_PTR = 0;
staticSealed = false;
function abortOnCannotGrowMemory() {
    abort(
        'Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value ' +
            TOTAL_MEMORY +
            ', (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ',
    );
}
function enlargeMemory() {
    abortOnCannotGrowMemory();
}
var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 134217728;
if (TOTAL_MEMORY < TOTAL_STACK)
    err('TOTAL_MEMORY should be larger than TOTAL_STACK, was ' + TOTAL_MEMORY + '! (TOTAL_STACK=' + TOTAL_STACK + ')');
if (Module['buffer']) {
    buffer = Module['buffer'];
} else {
    if (typeof WebAssembly === 'object' && typeof WebAssembly.Memory === 'function') {
        Module['wasmMemory'] = new WebAssembly.Memory({
            initial: TOTAL_MEMORY / WASM_PAGE_SIZE,
            maximum: TOTAL_MEMORY / WASM_PAGE_SIZE,
        });
        buffer = Module['wasmMemory'].buffer;
    } else {
        buffer = new ArrayBuffer(TOTAL_MEMORY);
    }
    Module['buffer'] = buffer;
}
updateGlobalBufferViews();
function getTotalMemory() {
    return TOTAL_MEMORY;
}
function callRuntimeCallbacks(callbacks) {
    while (callbacks.length > 0) {
        var callback = callbacks.shift();
        if (typeof callback == 'function') {
            callback();
            continue;
        }
        var func = callback.func;
        if (typeof func === 'number') {
            if (callback.arg === undefined) {
                Module['dynCall_v'](func);
            } else {
                Module['dynCall_vi'](func, callback.arg);
            }
        } else {
            func(callback.arg === undefined ? null : callback.arg);
        }
    }
}
var __ATPRERUN__ = [];
var __ATINIT__ = [];
var __ATMAIN__ = [];
var __ATPOSTRUN__ = [];
var runtimeInitialized = false;
function preRun() {
    if (Module['preRun']) {
        if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
        while (Module['preRun'].length) {
            addOnPreRun(Module['preRun'].shift());
        }
    }
    callRuntimeCallbacks(__ATPRERUN__);
}
function ensureInitRuntime() {
    if (runtimeInitialized) return;
    runtimeInitialized = true;
    callRuntimeCallbacks(__ATINIT__);
}
function preMain() {
    callRuntimeCallbacks(__ATMAIN__);
}
function postRun() {
    if (Module['postRun']) {
        if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
        while (Module['postRun'].length) {
            addOnPostRun(Module['postRun'].shift());
        }
    }
    callRuntimeCallbacks(__ATPOSTRUN__);
}
function addOnPreRun(cb) {
    __ATPRERUN__.unshift(cb);
}
function addOnPostRun(cb) {
    __ATPOSTRUN__.unshift(cb);
}
function writeAsciiToMemory(str, buffer, dontAddNull) {
    for (var i = 0; i < str.length; ++i) {
        HEAP8[buffer++ >> 0] = str.charCodeAt(i);
    }
    if (!dontAddNull) HEAP8[buffer >> 0] = 0;
}
var Math_abs = Math.abs;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_min = Math.min;
var Math_trunc = Math.trunc;
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null;
function addRunDependency(id) {
    runDependencies++;
    if (Module['monitorRunDependencies']) {
        Module['monitorRunDependencies'](runDependencies);
    }
}
function removeRunDependency(id) {
    runDependencies--;
    if (Module['monitorRunDependencies']) {
        Module['monitorRunDependencies'](runDependencies);
    }
    if (runDependencies == 0) {
        if (runDependencyWatcher !== null) {
            clearInterval(runDependencyWatcher);
            runDependencyWatcher = null;
        }
        if (dependenciesFulfilled) {
            var callback = dependenciesFulfilled;
            dependenciesFulfilled = null;
            callback();
        }
    }
}
Module['preloadedImages'] = {};
Module['preloadedAudios'] = {};
var dataURIPrefix = 'data:application/octet-stream;base64,';
function isDataURI(filename) {
    return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0;
}
function integrateWasmJS() {
    var wasmBinaryFile = 'Decoder.wasm';
    if (!isDataURI(wasmBinaryFile)) {
        wasmBinaryFile = locateFile(wasmBinaryFile);
    }
    var wasmPageSize = 64 * 1024;
    var info = { global: null, env: null, asm2wasm: asm2wasmImports, parent: Module };
    var exports = null;
    function mergeMemory(newBuffer) {
        var oldBuffer = Module['buffer'];
        if (newBuffer.byteLength < oldBuffer.byteLength) {
            err(
                'the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here',
            );
        }
        var oldView = new Int8Array(oldBuffer);
        var newView = new Int8Array(newBuffer);
        newView.set(oldView);
        updateGlobalBuffer(newBuffer);
        updateGlobalBufferViews();
    }
    function getBinary() {
        try {
            if (Module['wasmBinary']) {
                return new Uint8Array(Module['wasmBinary']);
            }
            if (Module['readBinary']) {
                return Module['readBinary'](wasmBinaryFile);
            } else {
                throw 'both async and sync fetching of the wasm failed';
            }
        } catch (err) {
            abort(err);
        }
    }
    function getBinaryPromise() {
        if (!Module['wasmBinary'] && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === 'function') {
            return fetch(wasmBinaryFile, { credentials: 'same-origin' })
                .then(function(response) {
                    if (!response['ok']) {
                        throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
                    }
                    return response['arrayBuffer']();
                })
                .catch(function() {
                    return getBinary();
                });
        }
        return new Promise(function(resolve, reject) {
            resolve(getBinary());
        });
    }
    function createWasm(global, env, providedBuffer) {
        if (typeof WebAssembly !== 'object') {
            err('no native wasm support detected');
            return false;
        }
        if (!(Module['wasmMemory'] instanceof WebAssembly.Memory)) {
            err('no native wasm Memory in use');
            return false;
        }
        env['memory'] = Module['wasmMemory'];
        info['global'] = { NaN: NaN, Infinity: Infinity };
        info['global.Math'] = Math;
        info['env'] = env;
        function receiveInstance(instance, module) {
            exports = instance.exports;
            if (exports.memory) mergeMemory(exports.memory);
            Module['asm'] = exports;
            removeRunDependency('wasm-instantiate');
        }
        addRunDependency('wasm-instantiate');
        if (Module['instantiateWasm']) {
            try {
                return Module['instantiateWasm'](info, receiveInstance);
            } catch (e) {
                err('Module.instantiateWasm callback failed with error: ' + e);
                return false;
            }
        }
        function receiveInstantiatedSource(output) {
            receiveInstance(output['instance'], output['module']);
        }
        function instantiateArrayBuffer(receiver) {
            getBinaryPromise()
                .then(function(binary) {
                    return WebAssembly.instantiate(binary, info);
                })
                .then(receiver, function(reason) {
                    err('failed to asynchronously prepare wasm: ' + reason);
                    abort(reason);
                });
        }
        if (
            !Module['wasmBinary'] &&
            typeof WebAssembly.instantiateStreaming === 'function' &&
            !isDataURI(wasmBinaryFile) &&
            typeof fetch === 'function'
        ) {
            WebAssembly.instantiateStreaming(fetch(wasmBinaryFile, { credentials: 'same-origin' }), info).then(
                receiveInstantiatedSource,
                function(reason) {
                    err('wasm streaming compile failed: ' + reason);
                    err('falling back to ArrayBuffer instantiation');
                    instantiateArrayBuffer(receiveInstantiatedSource);
                },
            );
        } else {
            instantiateArrayBuffer(receiveInstantiatedSource);
        }
        return {};
    }
    Module['asmPreload'] = Module['asm'];
    var wasmReallocBuffer = function(size) {
        var PAGE_MULTIPLE = 65536;
        size = alignUp(size, PAGE_MULTIPLE);
        var old = Module['buffer'];
        var oldSize = old.byteLength;
        try {
            var result = Module['wasmMemory'].grow((size - oldSize) / wasmPageSize);
            if (result !== (-1 | 0)) {
                return (Module['buffer'] = Module['wasmMemory'].buffer);
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    };
    Module['reallocBuffer'] = function(size) {
        return wasmReallocBuffer(size);
    };
    Module['asm'] = function(global, env, providedBuffer) {
        if (!env['table']) {
            var TABLE_SIZE = Module['wasmTableSize'];
            var MAX_TABLE_SIZE = Module['wasmMaxTableSize'];
            if (typeof WebAssembly === 'object' && typeof WebAssembly.Table === 'function') {
                if (MAX_TABLE_SIZE !== undefined) {
                    env['table'] = new WebAssembly.Table({
                        initial: TABLE_SIZE,
                        maximum: MAX_TABLE_SIZE,
                        element: 'anyfunc',
                    });
                } else {
                    env['table'] = new WebAssembly.Table({ initial: TABLE_SIZE, element: 'anyfunc' });
                }
            } else {
                env['table'] = new Array(TABLE_SIZE);
            }
            Module['wasmTable'] = env['table'];
        }
        if (!env['__memory_base']) {
            env['__memory_base'] = Module['STATIC_BASE'];
        }
        if (!env['__table_base']) {
            env['__table_base'] = 0;
        }
        var exports = createWasm(global, env, providedBuffer);
        return exports;
    };
}
integrateWasmJS();
STATIC_BASE = GLOBAL_BASE;
STATICTOP = STATIC_BASE + 221184;
__ATINIT__.push({
    func: function() {
        ___emscripten_environ_constructor();
    },
});
var STATIC_BUMP = 221184;
Module['STATIC_BASE'] = STATIC_BASE;
Module['STATIC_BUMP'] = STATIC_BUMP;
STATICTOP += 16;
var ENV = {};
function ___buildEnvironment(environ) {
    var MAX_ENV_VALUES = 64;
    var TOTAL_ENV_SIZE = 1024;
    var poolPtr;
    var envPtr;
    if (!___buildEnvironment.called) {
        ___buildEnvironment.called = true;
        ENV['USER'] = ENV['LOGNAME'] = 'web_user';
        ENV['PATH'] = '/';
        ENV['PWD'] = '/';
        ENV['HOME'] = '/home/web_user';
        ENV['LANG'] = 'C.UTF-8';
        ENV['_'] = Module['thisProgram'];
        poolPtr = getMemory(TOTAL_ENV_SIZE);
        envPtr = getMemory(MAX_ENV_VALUES * 4);
        HEAP32[envPtr >> 2] = poolPtr;
        HEAP32[environ >> 2] = envPtr;
    } else {
        envPtr = HEAP32[environ >> 2];
        poolPtr = HEAP32[envPtr >> 2];
    }
    var strings = [];
    var totalSize = 0;
    for (var key in ENV) {
        if (typeof ENV[key] === 'string') {
            var line = key + '=' + ENV[key];
            strings.push(line);
            totalSize += line.length;
        }
    }
    if (totalSize > TOTAL_ENV_SIZE) {
        throw new Error('Environment size exceeded TOTAL_ENV_SIZE!');
    }
    var ptrSize = 4;
    for (var i = 0; i < strings.length; i++) {
        var line = strings[i];
        writeAsciiToMemory(line, poolPtr);
        HEAP32[(envPtr + i * ptrSize) >> 2] = poolPtr;
        poolPtr += line.length + 1;
    }
    HEAP32[(envPtr + strings.length * ptrSize) >> 2] = 0;
}
var SYSCALLS = {
    buffers: [null, [], []],
    printChar: function(stream, curr) {
        var buffer = SYSCALLS.buffers[stream];
        assert(buffer);
        if (curr === 0 || curr === 10) {
            (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
            buffer.length = 0;
        } else {
            buffer.push(curr);
        }
    },
    varargs: 0,
    get: function(varargs) {
        SYSCALLS.varargs += 4;
        var ret = HEAP32[(SYSCALLS.varargs - 4) >> 2];
        return ret;
    },
    getStr: function() {
        var ret = UTF8ToString(SYSCALLS.get());
        return ret;
    },
    get64: function() {
        var low = SYSCALLS.get(),
            high = SYSCALLS.get();
        if (low >= 0) assert(high === 0);
        else assert(high === -1);
        return low;
    },
    getZero: function() {
        assert(SYSCALLS.get() === 0);
    },
};
function ___syscall140(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var stream = SYSCALLS.getStreamFromFD(),
            offset_high = SYSCALLS.get(),
            offset_low = SYSCALLS.get(),
            result = SYSCALLS.get(),
            whence = SYSCALLS.get();
        var offset = offset_low;
        FS.llseek(stream, offset, whence);
        HEAP32[result >> 2] = stream.position;
        if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
        return 0;
    } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall146(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var stream = SYSCALLS.get(),
            iov = SYSCALLS.get(),
            iovcnt = SYSCALLS.get();
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAP32[(iov + i * 8) >> 2];
            var len = HEAP32[(iov + (i * 8 + 4)) >> 2];
            for (var j = 0; j < len; j++) {
                SYSCALLS.printChar(stream, HEAPU8[ptr + j]);
            }
            ret += len;
        }
        return ret;
    } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___setErrNo(value) {
    if (Module['___errno_location']) HEAP32[Module['___errno_location']() >> 2] = value;
    return value;
}
function ___syscall221(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        return 0;
    } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall3(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var stream = SYSCALLS.getStreamFromFD(),
            buf = SYSCALLS.get(),
            count = SYSCALLS.get();
        return FS.read(stream, HEAP8, buf, count);
    } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall5(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var pathname = SYSCALLS.getStr(),
            flags = SYSCALLS.get(),
            mode = SYSCALLS.get();
        var stream = FS.open(pathname, flags, mode);
        return stream.fd;
    } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall54(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        return 0;
    } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall6(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var stream = SYSCALLS.getStreamFromFD();
        FS.close(stream);
        return 0;
    } catch (e) {
        if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function _abort() {
    Module['abort']();
}
function _clock() {
    if (_clock.start === undefined) _clock.start = Date.now();
    return ((Date.now() - _clock.start) * (1e6 / 1e3)) | 0;
}
var _fabs = Math_abs;
function _getenv(name) {
    if (name === 0) return 0;
    name = UTF8ToString(name);
    if (!ENV.hasOwnProperty(name)) return 0;
    if (_getenv.ret) _free(_getenv.ret);
    _getenv.ret = allocateUTF8(ENV[name]);
    return _getenv.ret;
}
function _gettimeofday(ptr) {
    var now = Date.now();
    HEAP32[ptr >> 2] = (now / 1e3) | 0;
    HEAP32[(ptr + 4) >> 2] = ((now % 1e3) * 1e3) | 0;
    return 0;
}
var ___tm_timezone = allocate(intArrayFromString('GMT'), 'i8', ALLOC_STATIC);
function _llvm_exp2_f32(x) {
    return Math.pow(2, x);
}
function _llvm_exp2_f64() {
    return _llvm_exp2_f32.apply(null, arguments);
}
var _llvm_trunc_f64 = Math_trunc;
function _emscripten_memcpy_big(dest, src, num) {
    HEAPU8.set(HEAPU8.subarray(src, src + num), dest);
    return dest;
}
DYNAMICTOP_PTR = staticAlloc(4);
STACK_BASE = STACKTOP = alignMemory(STATICTOP);
STACK_MAX = STACK_BASE + TOTAL_STACK;
DYNAMIC_BASE = alignMemory(STACK_MAX);
HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;
staticSealed = true;
function intArrayFromString(stringy, dontAddNull, length) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
    if (dontAddNull) u8array.length = numBytesWritten;
    return u8array;
}
Module['wasmTableSize'] = 1894;
Module['wasmMaxTableSize'] = 1894;
Module.asmGlobalArg = {};
Module.asmLibraryArg = {
    d: abort,
    w: enlargeMemory,
    o: getTotalMemory,
    m: abortOnCannotGrowMemory,
    l: ___buildEnvironment,
    h: ___setErrNo,
    k: ___syscall140,
    g: ___syscall146,
    f: ___syscall221,
    j: ___syscall3,
    v: ___syscall5,
    u: ___syscall54,
    i: ___syscall6,
    c: _abort,
    t: _clock,
    s: _emscripten_memcpy_big,
    r: _fabs,
    e: _getenv,
    q: _gettimeofday,
    p: _llvm_exp2_f64,
    n: _llvm_trunc_f64,
    a: DYNAMICTOP_PTR,
    b: STACKTOP,
};
var asm = Module['asm'](Module.asmGlobalArg, Module.asmLibraryArg, buffer);
Module['asm'] = asm;
var ___emscripten_environ_constructor = (Module['___emscripten_environ_constructor'] = function() {
    return Module['asm']['x'].apply(null, arguments);
});
var _free = (Module['_free'] = function() {
    return Module['asm']['y'].apply(null, arguments);
});
var _malloc = (Module['_malloc'] = function() {
    return Module['asm']['z'].apply(null, arguments);
});
var _video_decode_frame = (Module['_video_decode_frame'] = function() {
    return Module['asm']['A'].apply(null, arguments);
});
var _video_decoder_init = (Module['_video_decoder_init'] = function() {
    return Module['asm']['B'].apply(null, arguments);
});
var stackAlloc = (Module['stackAlloc'] = function() {
    return Module['asm']['D'].apply(null, arguments);
});
var dynCall_vi = (Module['dynCall_vi'] = function() {
    return Module['asm']['C'].apply(null, arguments);
});
Module['asm'] = asm;
function ExitStatus(status) {
    this.name = 'ExitStatus';
    this.message = 'Program terminated with exit(' + status + ')';
    this.status = status;
}
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;
dependenciesFulfilled = function runCaller() {
    if (!Module['calledRun']) run();
    if (!Module['calledRun']) dependenciesFulfilled = runCaller;
};
function run(args) {
    args = args || Module['arguments'];
    if (runDependencies > 0) {
        return;
    }
    preRun();
    if (runDependencies > 0) return;
    if (Module['calledRun']) return;
    function doRun() {
        if (Module['calledRun']) return;
        Module['calledRun'] = true;
        if (ABORT) return;
        ensureInitRuntime();
        preMain();
        if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();
        postRun();
    }
    if (Module['setStatus']) {
        Module['setStatus']('Running...');
        setTimeout(function() {
            setTimeout(function() {
                Module['setStatus']('');
            }, 1);
            doRun();
        }, 1);
    } else {
        doRun();
    }
}
Module['run'] = run;
function abort(what) {
    if (Module['onAbort']) {
        Module['onAbort'](what);
    }
    if (what !== undefined) {
        out(what);
        err(what);
        what = JSON.stringify(what);
    } else {
        what = '';
    }
    ABORT = true;
    EXITSTATUS = 1;
    throw 'abort(' + what + '). Build with -s ASSERTIONS=1 for more info.';
}
Module['abort'] = abort;
if (Module['preInit']) {
    if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
    while (Module['preInit'].length > 0) {
        Module['preInit'].pop()();
    }
}
Module['noExitRuntime'] = true;
run();

var video_decoder_ctx = 0;
Module.onRuntimeInitialized = function() {
    video_decoder_ctx = Module._video_decoder_init();
    postMessage({
        command: 'loaded',
    });
};

onmessage = function(evt) {
    var edata = new Uint8Array(evt.data);
    var memoryData = Module._malloc(edata.byteLength);
    Module.HEAPU8.set(edata, memoryData);
    var ptr = Module._video_decode_frame(video_decoder_ctx, memoryData, edata.byteLength);
    Module._free(memoryData);
    if (ptr == 0) return;

    var width = Module.HEAPU32[ptr / 4],
        height = Module.HEAPU32[ptr / 4 + 1],
        YimgBufferPtr = Module.HEAPU32[ptr / 4 + 2],
        UimgBufferPtr = Module.HEAPU32[ptr / 4 + 3],
        VimgBufferPtr = Module.HEAPU32[ptr / 4 + 4],
        YimageBuffer = Module.HEAPU8.subarray(YimgBufferPtr, YimgBufferPtr + width * height),
        UimageBuffer = Module.HEAPU8.subarray(UimgBufferPtr, UimgBufferPtr + (width * height) / 4),
        VimageBuffer = Module.HEAPU8.subarray(VimgBufferPtr, VimgBufferPtr + (width * height) / 4);

    var ydata = new Uint8Array(YimageBuffer);
    var udata = new Uint8Array(UimageBuffer);
    var vdata = new Uint8Array(VimageBuffer);

    postMessage(
        {
            command: 'video',
            width: width,
            height: height,
            YData: ydata.buffer,
            UData: udata.buffer,
            VData: vdata.buffer,
        },
        [ydata.buffer, udata.buffer, vdata.buffer],
    );
};
