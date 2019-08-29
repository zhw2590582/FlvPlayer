export default function websocketRequest(flv, stream) {
    flv.emit('streamStart');
    const {
        options,
        events: { proxy },
    } = flv;

    const socket = new WebSocket(flv.options.url);
    socket.binaryType = 'arraybuffer';

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
        stream.reconnect(error);
        throw error;
    });

    return {
        reader: socket,
        cancel: socket.close,
    };
}
