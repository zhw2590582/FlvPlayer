export default function fetchRequest(flv, stream) {
    flv.emit('streamStart');
    return fetch(flv.options.url, {
        headers: flv.options.headers,
    })
        .then(response => {
            const reader = response.body.getReader();

            flv.on('streamCancel', () => {
                reader.cancel();
            });

            function read() {
                return reader
                    .read()
                    .then(({ done, value }) => {
                        if (done) {
                            flv.emit('streamEnd');
                            return;
                        }
                        flv.emit('streaming', new Uint8Array(value));
                        // eslint-disable-next-line consistent-return
                        return read();
                    })
                    .catch(error => {
                        throw error;
                    });
            }
            return read();
        })
        .catch(error => {
            stream.reconnect(error);
            throw error;
        });
}
