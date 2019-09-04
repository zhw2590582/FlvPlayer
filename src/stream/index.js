import FetchLoader from './fetchLoader';
import WebsocketLoader from './websocketLoader';
import FileLoader from './fileLoader';

export default class Stream {
    constructor(flv) {
        const Loader = Stream.getLoaderFactory(flv.options.url);
        flv.debug.log('stream-type', Loader.name);
        return new Loader(flv, this);
    }

    static getLoaderFactory(url) {
        if (url instanceof File) {
            return FileLoader;
        }

        if (/^ws{1,2}:\/\//i.test(url)) {
            return WebsocketLoader;
        }

        return FetchLoader;
    }
}
