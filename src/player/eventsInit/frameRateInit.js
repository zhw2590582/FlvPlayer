export default function durationInit(flv, player) {
    flv.on('scripMeta', scripMeta => {
        const { metaData } = scripMeta.amf2;
        if (metaData.framerate) {
            player.frameRate = Math.round(metaData.framerate);
        }
    });
}
