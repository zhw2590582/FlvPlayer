export default function mozXhrRequest(flv, stream) {
    flv.emit('streamStart');
    const {
        events: { proxy },
        options: { headers },
    } = flv;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', flv.options.url, true);
    xhr.responseType = 'moz-chunked-arraybuffer';
    Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
    });

    proxy(xhr, 'readystatechange', () => {
        flv.emit('readystatechange', xhr);
    });

    proxy(xhr, 'progress', () => {
        flv.emit('streaming', new Uint8Array(xhr.response));
    });

    proxy(xhr, 'loadend', () => {
        flv.emit('streamEnd');
    });

    proxy(xhr, 'error', error => {
        stream.reconnect(error);
        throw error;
    });

    xhr.send();

    flv.on('streamCancel', () => {
        xhr.abort();
    });

    return xhr;
}
