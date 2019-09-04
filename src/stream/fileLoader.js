export default class FileLoader {
    constructor(flv) {
        const { proxy } = flv.events;
        const reader = new FileReader();
        proxy(reader, 'load', e => {
            const buffer = e.target.result;
            flv.emit('streamEnd', new Uint8Array(buffer));
        });
        flv.emit('streamStart');
        reader.readAsArrayBuffer(flv.options.url);
    }
}
