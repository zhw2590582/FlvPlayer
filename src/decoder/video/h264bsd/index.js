import { mergeBuffer, readBuffer, createWorker } from '../../../utils';
import H264bsdCanvas from './h264bsd_canvas';
import workerString from './h264bsd.worker';

export default class VideoDecoder {
    constructor(flv) {
        const { player, events } = flv;

        this.frames = [];
        this.byteSize = 0;
        this.loaded = 0;
        this.decoder = createWorker(workerString);
        this.renderer = new H264bsdCanvas(player.$canvas);

        events.proxy(this.decoder, 'message', event => {
            const message = event.data;
            if (!message.hasOwnProperty('type')) return;
            switch (message.type) {
                case 'pictureReady':
                    this.byteSize += message.data.byteLength;
                    this.frames.push(message);
                    this.loaded = this.frames.length / player.frameRate;
                    flv.emit('loaded', this.loaded);
                    break;
                default:
                    break;
            }
        });

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
                    this.decoder.postMessage({ type: 'queueInput', data: frame.buffer }, [frame.buffer]);
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

    draw(index) {
        const message = this.frames[index];
        if (!message) return false;
        this.renderer.drawNextOutputPicture(
            message.width,
            message.height,
            message.croppingParams,
            new Uint8Array(message.data),
        );
        return true;
    }
}
