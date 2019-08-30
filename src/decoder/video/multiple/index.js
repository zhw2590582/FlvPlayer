import VideoSuperDecoder from '../index';
import { createWorker } from '../../../utils';
import Renderer from './renderer';
import workerString from './decoder.worker';

export default class VideoDecoder extends VideoSuperDecoder {
    constructor(flv, decoder) {
        super(flv, decoder);
        const { player, events } = flv;
        this.decoderWorker = createWorker(workerString);
        this.renderer = new Renderer(player.$canvas);

        events.proxy(this.decoderWorker, 'message', event => {
            const message = event.data;
            switch (message.command) {
                case 'video':
                    flv.emit(
                        'decoding',
                        message,
                        message.YData.byteLength + message.UData.byteLength + message.VData.byteLength,
                    );
                    break;
                default:
                    break;
            }
        });

        flv.on('videoData', (frame, timestamp) => {
            this.decoderWorker.postMessage(frame.buffer, [frame.buffer]);
            flv.emit('befoerdecoding', timestamp);
        });
    }

    getFramesSize(framesIndex) {
        let framesSize = 0;
        for (let index = 0; index < framesIndex; index++) {
            framesSize += this.videoframes[index].YData.byteLength;
            framesSize += this.videoframes[index].UData.byteLength;
            framesSize += this.videoframes[index].VData.byteLength;
        }
        return framesSize;
    }
}
