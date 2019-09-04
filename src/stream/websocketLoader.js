export default class WebsocketLoader {
    constructor(flv) {
        const {
            options,
            events: { proxy },
        } = flv;

        flv.options.live = true;
        const socket = new WebSocket(flv.options.url);
        socket.binaryType = 'arraybuffer';

        flv.emit('streamStart');
        proxy(socket, 'open', () => {
            socket.send(options.socketSend);
        });

        proxy(socket, 'message', event => {
            flv.emit('streaming', new Uint8Array(event.data));
        });

        proxy(socket, 'close', () => {
            flv.emit('streamEnd');
        });

        proxy(socket, 'error', error => {
            flv.emit('streamError', error);
            throw error;
        });

        flv.on('destroy', () => {
            socket.close();
        });
    }
}
