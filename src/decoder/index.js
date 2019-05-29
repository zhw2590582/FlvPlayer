import Video from './video';
import Audio from './audio';

export default class Decoder {
    constructor(flv) {
        this.video = new Video(flv);
        this.audio = new Audio(flv);
    }
}
