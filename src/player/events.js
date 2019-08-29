export default function events(flv, player) {
    const {
        events: { proxy },
    } = flv;

    flv.on('scripMeta', scripMeta => {
        const { width, height } = scripMeta.amf2.metaData;
        player.$canvas.width = width;
        player.$canvas.height = height;
    });

    proxy(player.$canvas, 'click', () => {
        player.toggle();
    });
}
