export default class FileLoader {
    constructor(flv) {
        const reader = new FileReader();
        const { proxy } = flv.events;

        proxy(reader, 'load', e => {
            const buffer = e.target.result;
            flv.emit('streamEnd', new Uint8Array(buffer));
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
