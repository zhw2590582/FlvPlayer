import VideoDecoder from './video/h264bsd';
import AudioDecoder from './audio';

export default class Decoder {
    constructor(flv) {
        this.video = new VideoDecoder(flv);
        this.audio = new AudioDecoder(flv);
    }
}
