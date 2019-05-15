import FlvPlayerError from './utils/FlvPlayerError';

export default class Debug {
    constructor(flv) {
        const { debug } = flv.options;
        this.log = (name, ...args) => {
            if (debug) {
                console.log(`FlvPlayer: [${name}]`, ...args);
            }
        };

        this.warn = (condition, ...args) => {
            if (!condition && debug) {
                console.warn(...args);
            }
        };

        this.error = (condition, msg) => {
            if (!condition) {
                throw new FlvPlayerError(msg);
            }
        };
    }
}
