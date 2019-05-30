import { secondToTime } from '../../utils';

export default function durationInit(flv, player) {
    flv.on('scripMeta', scripMeta => {
        const { metaData } = scripMeta.amf2;
        if (metaData.duration && !flv.options.live) {
            player.duration = metaData.duration;
            player.$duration.innerText = secondToTime(metaData.duration);
        }
    });
}
