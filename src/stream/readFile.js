export default function readFile(flv) {
    flv.emit('streamStart');
    const { proxy } = flv.events;
    const reader = new FileReader();
    proxy(reader, 'load', e => {
        const buffer = e.target.result;
        flv.emit('streamEnd', new Uint8Array(buffer));
    });
    reader.readAsArrayBuffer(flv.options.url);
    return reader;
}
