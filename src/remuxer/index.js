import naluToYuv from './naluToYuv';
import yuvToRgba from './yuvToRgba';

export default class Remuxer {
    constructor(flv) {
        flv.on('nalu', nalu => {
            const yuv = naluToYuv(nalu);
            const rgba = yuvToRgba(yuv);
            flv.emit('rgba', rgba);
        });
    }
}