import { secondToTime } from '../utils';

export default function eventsInit(flv, player) {
    flv.on('scripMeta', scripMeta => {
        const { metaData } = scripMeta.amf2;

        if (metaData.width && metaData.height) {
            player.$canvas.width = metaData.width;
            player.$canvas.height = metaData.height;
            player.autoSize();
        }

        if (metaData.duration && !flv.options.live) {
            player.$duration.innerText = secondToTime(metaData.duration);
        }
    });
}
