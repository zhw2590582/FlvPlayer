import { readBuffer } from '../utils/buffer';

export default class Remuxer {
    constructor(flv) {
        const { debug } = flv;
        flv.on('nalu', nalu => {
            const readNalu = readBuffer(nalu);
            readNalu(4);
            const nalHeader = readNalu(1)[0];
            const naluType = nalHeader & 31;

            switch (naluType) {
                case 6: // SEI
                case 7: // SPS
                case 8: // PPS
                    break;
                case 5: // IDR
                    //
                    break;
                case 1:
                    //
                    break;
                default:
                    debug.warn(false, `[NALU]: unknown nalu type ${naluType}`);
                    break;
            }
        });
    }
}
