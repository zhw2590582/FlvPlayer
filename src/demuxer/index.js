import { getNowTime, createWorker } from '../utils';
import workerString from './demuxer.worker';

export default class Demuxer {
    constructor(flv) {
        const { options, debug } = flv;
        this.size = 0;
        this.header = null;
        this.streaming = false;
        this.streamStartTime = 0;
        this.streamEndTime = 0;
        this.scripMeta = null;
        this.AudioSpecificConfig = null;
        this.AVCDecoderConfigurationRecord = null;
        this.demux = createWorker(workerString);

        flv.on('streamStart', requestType => {
            this.streamStartTime = getNowTime();
            debug.log('stream-url', options.url);
            debug.log('stream-request', requestType);
        });

        flv.on('streaming', uint8 => {
            this.streaming = true;
            this.size += uint8.byteLength;
            this.demux.postMessage(uint8);
        });

        flv.on('streamEnd', uint8 => {
            this.streaming = false;
            this.streamEndTime = getNowTime();

            if (uint8) {
                this.index = 0;
                this.size = uint8.byteLength;
                this.demux.postMessage(uint8);
            }

            debug.log('stream-size', `${this.size} byte`);
            debug.log('stream-time', `${this.streamEndTime - this.streamStartTime} ms`);

            this.demux.terminate();
            flv.emit('demuxDone');
            debug.log('demux-done');
        });

        this.demux.onmessage = event => {
            const message = event.data;
            switch (message.type) {
                case 'flvHeader':
                    this.header = message.data;
                    flv.emit('flvHeader', this.header);
                    debug.log('flv-header', this.header);
                    break;
                case 'scripMeta':
                    this.scripMeta = message.data;
                    flv.emit('scripMeta', this.scripMeta);
                    debug.log('scrip-meta', this.scripMeta);
                    break;
                case 'AVCDecoderConfigurationRecord':
                    this.AVCDecoderConfigurationRecord = message.data;
                    flv.emit('AVCDecoderConfigurationRecord', this.AVCDecoderConfigurationRecord);
                    debug.log('AVCDecoderConfigurationRecord', this.AVCDecoderConfigurationRecord);
                    break;
                case 'AudioSpecificConfig':
                    this.AudioSpecificConfig = message.data;
                    flv.emit('AudioSpecificConfig', this.AudioSpecificConfig);
                    debug.log('AudioSpecificConfig', this.AudioSpecificConfig);
                    break;
                case 'videoData':
                    flv.emit('videoData', message.data, message.timestamp);
                    break;
                case 'audioData':
                    flv.emit('audioData', message.data, message.timestamp);
                    break;
                default:
                    break;
            }
        };
    }
}
