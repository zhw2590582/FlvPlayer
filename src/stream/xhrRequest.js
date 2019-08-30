export default function xhrRequest(flv, stream) {
    flv.emit('streamStart');
    const {
        events: { proxy },
        options: { headers },
    } = flv;
    const textEncoder = new TextEncoder();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', flv.options.url, true);
    xhr.responseType = 'text';
    Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
    });
    let index = 0;

    proxy(xhr, 'readystatechange', () => {
        flv.emit('readystatechange', xhr);
    });

    proxy(xhr, 'progress', () => {
        const rawText = xhr.responseText.substr(index);
        index = xhr.responseText.length;
        flv.emit('streaming', textEncoder.encode(rawText, { stream: true }));
    });

    proxy(xhr, 'loadend', () => {
        flv.emit('streaming', textEncoder.encode('', { stream: false }));
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
