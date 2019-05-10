export default function fetchRequest(flv, url) {
    flv.emit('streamStart');
    fetch(url, {
        headers: flv.options.headers
    }).then(response => {
        const reader = response.body.getReader();

        flv.on('destroy', () => {
            reader.cancel();
        });

        flv.on('streamCancel', () => {
            reader.cancel();
            flv.debug.log('stream-cancel');
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
    });
}
