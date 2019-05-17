import { readBuffer } from '../utils';

export default class Decoder {
    constructor(flv) {
        const { debug } = flv;

        flv.on('videoData', nalu => {
            const readNalu = readBuffer(nalu);
            readNalu(4);
            const nalHeader = readNalu(1)[0];
            const naluType = nalHeader & 31;

            switch (naluType) {
                case 1:
                case 5:
                    // TODO
                    break;
                case 6: // SEI
                case 7: // SPS
                case 8: // PPS
                    break;
                default:
                    debug.warn(false, `[NALU]: Found extra nalu type ${naluType}`);
                    break;
            }
        });
    }
}
