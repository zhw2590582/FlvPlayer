import templateInit from './templateInit';
import rectMix from './rectMix';
import autoSizeMix from './autoSizeMix';

export default class Player {
    constructor(flv) {
        templateInit(flv, this);
        rectMix(flv, this);
        autoSizeMix(flv, this);

        this.autoSize();
        flv.on('sizeChange', () => {
            this.autoSize();
        });
    }
}
