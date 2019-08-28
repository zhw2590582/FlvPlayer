export default function events(flv, player) {
    const {
        events: { proxy },
    } = flv;

    flv.on('scripMeta', scripMeta => {
        const { width, height } = scripMeta.amf2.metaData;
        player.$canvas.width = width;
        player.$canvas.height = height;
    });

    proxy(window, ['click', 'contextmenu'], event => {
        if (event.composedPath().indexOf(player.$container) > -1) {
            player.isFocus = true;
        } else {
            player.isFocus = false;
        }
    });

    proxy(player.$canvas, 'click', () => {
        player.toggle();
    });
}
