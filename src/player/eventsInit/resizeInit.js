export default function resizeInit(flv, player) {
    flv.on('scripMeta', scripMeta => {
        const { metaData } = scripMeta.amf2;
        if (metaData.width && metaData.height) {
            player.$canvas.width = metaData.width;
            player.$canvas.height = metaData.height;
            player.autoSize();
        }
    });

    const resizeObserver = new ResizeObserver(player.autoSize);
    resizeObserver.observe(player.$container);
    flv.events.destroyEvents.push(() => {
        resizeObserver.unobserve(player.$container);
    });
}
