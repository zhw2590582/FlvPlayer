export default class FileLoader {
    constructor(flv) {
        const reader = new FileReader();
        const { proxy } = flv.events;

        proxy(reader, 'load', e => {
            const uint8 = new Uint8Array(e.target.result);
            flv.emit('streamEnd', uint8);
            flv.debug.log('stream-end', `${uint8.byteLength} byte`);
        });

        proxy(reader, 'error', error => {
            flv.emit('streamError', error);
        });

        flv.on('destroy', () => {
            reader.abort();
        });

        flv.emit('streamStart');
        reader.readAsArrayBuffer(flv.options.url);
    }
}
