import fetchRequest from './fetchRequest';
import mozXhrRequest from './mozXhrRequest';
import xhrRequest from './xhrRequest';
import websocketRequest from './websocketRequest';
import rtmpRequest from './rtmpRequest';
import readFile from './readFile';

export default class Stream {
    constructor(flv) {
        const { url } = flv.options;
        this.transportFactory = Stream.getStreamFactory(url);
        this.transport = this.transportFactory(flv, url);
    }

    static supportsXhrResponseType(type) {
        try {
            const tmpXhr = new XMLHttpRequest();
            tmpXhr.responseType = type;
            return tmpXhr.responseType === type;
        } catch (e) {
            return false;
        } 
    }

    static getStreamFactory(url) {
        if (url instanceof File) {
            return readFile;
        }

        if (url.startsWith('ws://')) {
            return websocketRequest;
        }

        if (url.startsWith('rtmp://')) {
            return rtmpRequest;
        }

        if (
            typeof Response !== 'undefined' &&
            Object.prototype.hasOwnProperty.call(Response.prototype, 'body') &&
            typeof Headers === 'function'
        ) {
            return fetchRequest;
        }

        const mozChunked = 'moz-chunked-arraybuffer';
        if (Stream.supportsXhrResponseType(mozChunked)) {
            return mozXhrRequest;
        }

        return xhrRequest;
    }
}
