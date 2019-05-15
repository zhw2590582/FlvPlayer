import { mergeBuffer } from '../utils/buffer';
import { download } from '../utils';
import AudioTag from './audioTag';
import VideoTag from './videoTag';
import ScripTag from './scripTag';

export default class Demuxer {
    constructor(flv) {
        this.flv = flv;
        const { debug } = flv;
        this.scripMeta = null;
        this.audioMeta = null;
        this.videoMeta = null;
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
                    const { data, meta } = this.videoTag.demuxer(tag, !this.videoMeta);
                    if (data) {
                        const result = {
                            timestamp: tag.timestamp,
                            data,
                        };
                        this.videoTrack.push(result);
                        flv.emit('videoTrack', result);
                    }
                    if (!this.videoMeta && meta) {
                        this.videoMeta = meta;
                        flv.emit('videoMeta', meta);
                        debug.log('video-meta', meta);
                    }
                    break;
                }
                case 8: {
                    const { data, meta } = this.audioTag.demuxer(tag, !this.audioMeta);
                    if (data) {
                        const result = {
                            timestamp: tag.timestamp,
                            data,
                        };
                        this.audioTrack.push(result);
                        flv.emit('audioTrack', result);
                    }
                    if (!this.audioMeta && meta) {
                        this.audioMeta = meta;
                        flv.emit('audioMeta', meta);
                        debug.log('audio-meta', meta);
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
        const { parse, debug } = this.flv;
        debug.error(parse.loaded, 'Stream not loaded yet complete');
        const url = URL.createObjectURL(
            new Blob([mergeBuffer(...this.audioTrack.map(item => item.data))]),
        );
        download(url, `audioTrack.${this.audioMeta.format}`);
    }

    downloadVideo() {
        const { parse, debug } = this.flv;
        debug.error(parse.loaded, 'Stream not loaded yet complete');
        const url = URL.createObjectURL(
            new Blob([mergeBuffer(...this.videoTrack.map(item => item.data))]),
        );
        download(url, `videoTrack.${this.videoMeta.format}`);
    }
}
