export default function websocketRequest(flv, url) {
    flv.emit('streamStart', 'websocket-request');
    const {
        events: { proxy },
    } = flv;

    const socket = new WebSocket(url);
    socket.binaryType = 'arraybuffer';

    proxy(socket, 'open', () => {
        socket.send();
    });

    proxy(socket, 'message', event => {
        flv.emit('streaming', new Uint8Array(event.data));
    });

    proxy(socket, 'close', () => {
        flv.emit('streamEnd');
    });

    proxy(socket, 'error', error => {
        throw error;
    });

    flv.on('destroy', () => {
        socket.close();
    });
}
