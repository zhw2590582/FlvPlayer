import rectMix from './rectMix';
import autoSizeMix from './autoSizeMix';
import videoMix from './videoMix';

export default function propertyMixer(flv, player) {
    rectMix(flv, player);
    autoSizeMix(flv, player);
    videoMix(flv, player);
}
