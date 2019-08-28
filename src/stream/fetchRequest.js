export default function fetchRequest(flv, url) {
    flv.emit('streamStart', 'fetch-request');
    return fetch(url, {
        headers: flv.options.headers,
    }).then(response => {
        const reader = response.body.getReader();

        flv.on('destroy', () => {
            reader.cancel();
        });

        (function read() {
            reader
                .read()
                .then(({ done, value }) => {
                    if (done) {
                        flv.emit('streamEnd');
                        return;
                    }
                    flv.emit('streaming', new Uint8Array(value));
                    read();
                })
                .catch(error => {
                    throw error;
                });
        })();

        return reader;
    }).catch(() => {
        flv.retry();
    });
}
