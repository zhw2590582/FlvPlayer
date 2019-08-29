export default function fetchRequest(flv, stream) {
    flv.emit('streamStart');
    return fetch(flv.options.url, {
        headers: flv.options.headers,
    })
        .then(response => {
            const reader = response.body.getReader();
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

            return {
                reader,
                cancel: reader.cancel,
            };
        })
        .catch(error => {
            stream.reconnect(error);
            throw error;
        });
}
