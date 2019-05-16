import AudioTag from './audioTag';
import VideoTag from './videoTag';
import ScripTag from './scripTag';

export default class Demuxer {
    constructor(flv) {
        const { debug } = flv;
        this.scripTag = new ScripTag(flv);
        this.videoTag = new VideoTag(flv);
        this.audioTag = new AudioTag(flv);

        flv.on('parseTag', tag => {
            switch (tag.tagType) {
                case 18:
                    this.scripTag.demuxer(tag);
                    break;
                case 9:
                    this.videoTag.demuxer(tag);
                    break;
                case 8:
                    this.audioTag.demuxer(tag);
                    break;
                default:
                    debug.error(false, `unknown tag type: ${tag.tagType}`);
                    break;
            }
        });
    }
}
