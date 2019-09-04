import { calculationRate } from '../utils';

export default class WebsocketLoader {
    constructor(flv) {
        const {
            debug,
            options,
            events: { proxy },
        } = flv;

        this.byteLength = 0;
        this.streamRate = calculationRate(rate => {
            flv.emit('streamRate', rate);
        });

        this.socket = new WebSocket(flv.options.url);
        this.socket.binaryType = 'arraybuffer';

        flv.emit('streamStart');
        proxy(this.socket, 'open', () => {
            this.socket.send(options.socketSend);
        });

        proxy(this.socket, 'message', event => {
            const uint8 = new Uint8Array(event.data);
            this.byteLength += uint8.byteLength;
            this.streamRate(uint8.byteLength);
            flv.emit('streaming', uint8);
        });

        proxy(this.socket, 'close', () => {
            flv.emit('streamEnd');
            debug.log('stream-end', `${this.byteLength} byte`);
        });

        proxy(this.socket, 'error', error => {
            flv.emit('streamError', error);
            throw error;
        });

        flv.on('destroy', () => {
            this.socket.close();
        });
    }
}
