import { mergeBuffer } from '../utils/buffer';
import { download } from '../utils';
import AudioTag from './audioTag';
import VideoTag from './videoTag';
import ScripTag from './scripTag';

export default class Demuxer {
    constructor(flv) {
        const { debug } = flv;
        this.scripMeta = null;
        this.audioHeader = null;
        this.videoHeader = null;
        this.audioTrack = [];
        this.videoTrack = [];

        this.scripTag = new ScripTag(flv);
        this.videoTag = new VideoTag(flv);
        this.audioTag = new AudioTag(flv);

        flv.on('parseTag', tag => {
            switch (tag.tagType) {
                case 18:
                    this.scripMeta = this.scripTag.demuxer(tag);
                    flv.emit('scripMeta', this.scripMeta);
                    debug.log('scrip-meta', this.scripMeta);
                    break;
                case 9: {
                    const { frame, header } = this.videoTag.demuxer(tag, !this.videoHeader);
                    if (frame) {
                        const result = {
                            timestamp: tag.timestamp,
                            data: frame,
                        };
                        this.videoTrack.push(result);
                        flv.emit('videoFrame', result);
                    }
                    if (!this.videoHeader && header) {
                        this.videoHeader = header;
                        flv.emit('videoHeader', header);
                        debug.log('video-header', header);
                    }
                    break;
                }
                case 8: {
                    const { frame, header } = this.audioTag.demuxer(tag, !this.audioHeader);
                    if (frame) {
                        const result = {
                            timestamp: tag.timestamp,
                            data: frame,
                        };
                        this.audioTrack.push(result);
                        flv.emit('audioFrame', result);
                    }
                    if (!this.audioHeader && header) {
                        this.audioHeader = header;
                        flv.emit('audioHeader', header);
                        debug.log('audio-header', header);
                    }
                    break;
                }
                default:
                    debug.error(false, `unknown tag type: ${tag.tagType}`);
                    break;
            }
        });
    }

    downloadAudio() {
        const url = URL.createObjectURL(
            new Blob([mergeBuffer(...this.audioTrack.map(item => item.data))]),
        );
        download(url, `audioTrack.${this.audioHeader.format}`);
    }

    downloadVideo() {
        const url = URL.createObjectURL(
            new Blob([mergeBuffer(...this.videoTrack.map(item => item.data))]),
        );
        download(url, `videoTrack.${this.videoHeader.format}`);
    }
}
