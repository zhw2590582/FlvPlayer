export default function events(flv, player) {
    const { proxy } = flv.events;

    flv.on('scripMeta', scripMeta => {
        const { width, height } = scripMeta.amf2.metaData;
        if (width && height) {
            player.$canvas.width = width;
            player.$canvas.height = height;
        }
    });

    proxy(player.$canvas, 'click', () => {
        player.toggle();
    });
}
