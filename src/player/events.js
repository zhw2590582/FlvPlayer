export default function events(flv, player) {
    const {
        events: { proxy },
    } = flv;

    player.autoSize();

    flv.on('scripMeta', scripMeta => {
        const { width, height } = scripMeta.amf2.metaData;
        player.$canvas.width = width;
        player.$canvas.height = height;
        player.autoSize();
    });

    flv.on('resize', () => {
        player.autoSize();
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
