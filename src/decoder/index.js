import { mergeBuffer, readBuffer } from '../utils';
import createParser from './bsparser';

export default class Decoder {
    constructor(flv) {
        this.h264Parser = createParser('h264');
        let sps = null;
        let pps = null;
        flv.on('videoData', nalu => {
            const readNalu = readBuffer(nalu);
            readNalu(4);
            const nalHeader = readNalu(1)[0];
            const naluType = nalHeader & 31;
            switch (naluType) {
                case 1:
                case 5: {
                    const frame = mergeBuffer(sps, pps, nalu);
                    flv.emit('videoFrame', frame);
                    break;
                }
                case 7:
                    sps = nalu;
                    break;
                case 8:
                    pps = nalu;
                    break;
                default:
                    break;
            }
        });
    }
}
