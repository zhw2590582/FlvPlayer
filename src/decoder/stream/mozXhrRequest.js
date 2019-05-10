export default function mozXhrRequest(flv, url) {
    flv.emit('streamStart');
    const { events: { proxy }, options: { headers } } = flv;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
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
        throw error;
    });

    flv.on('destroy', () => {
        xhr.abort();
    });

    flv.on('streamCancel', () => {
        xhr.abort();
        flv.debug.log('stream-cancel');
    });

    xhr.send();
}
