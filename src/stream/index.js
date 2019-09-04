import FetchLoader from './fetchLoader';
import WebsocketLoader from './websocketLoader';
import FileLoader from './fileLoader';

export default class Stream {
    constructor(flv) {
        this.flv = flv;
        const Loader = Stream.getStreamFactory(flv.options.url);
        this.flv.debug.log('stream-type', Loader.name);
        this.loader = new Loader(flv, this);
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
            return FileLoader;
        }

        if (url.startsWith('ws://')) {
            return WebsocketLoader;
        }

        return FetchLoader;
    }
}
