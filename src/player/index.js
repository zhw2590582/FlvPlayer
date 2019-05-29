import { secondToTime } from '../utils';
import templateInit from './template';
import videoMix from './mixer/videoMix';
import rectMix from './mixer/rectMix';
import autoSizeMix from './mixer/autoSizeMix';

export default class Player {
    constructor(flv) {
        templateInit(flv, this);
        videoMix(flv, this);
        rectMix(flv, this);
        autoSizeMix(flv, this);

        flv.on('scripMeta', scripMeta => {
            const { metaData } = scripMeta.amf2;

            if (metaData.width && metaData.height) {
                this.$canvas.width = metaData.width;
                this.$canvas.height = metaData.height;
                this.autoSize();
            }

            if (metaData.duration && !flv.options.live) {
                this.$duration.innerText = secondToTime(metaData.duration);
            }
        });
    }
}
