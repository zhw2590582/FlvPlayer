import { getNowTime, createWorker, readBuffer, mergeBuffer } from '../utils';
import workerString from './demuxer.worker';

export default class Demuxer {
    constructor(flv) {
        const { options, debug } = flv;
        this.size = 0;
        this.header = null;
        this.streaming = false;
        this.demuxed = false;
        this.videoDataSize = 0;
        this.audioDataSize = 0;
        this.videoDataLength = 0;
        this.audioDataLength = 0;
        this.streamStartTime = 0;
        this.streamEndTime = 0;
        this.scripMeta = null;
        this.AudioSpecificConfig = null;
        this.AVCDecoderConfigurationRecord = null;
        this.demuxWorker = createWorker(workerString);

        flv.on('destroy', () => {
            this.demuxWorker.terminate();
        });

        flv.on('streamStart', requestType => {
            this.streamStartTime = getNowTime();
            debug.log('stream-url', options.url);
            debug.log('stream-request', requestType);
        });

        flv.on('streaming', uint8 => {
            this.streaming = true;
            this.size += uint8.byteLength;
            this.demuxWorker.postMessage(uint8);
        });

        flv.on('streamEnd', uint8 => {
            this.streaming = false;
            this.streamEndTime = getNowTime();

            if (uint8) {
                this.index = 0;
                this.size = uint8.byteLength;
                this.demuxWorker.postMessage(uint8);
            }

            debug.log('stream-size', `${this.size} byte`);
            debug.log('stream-time', `${this.streamEndTime - this.streamStartTime} ms`);

            this.demuxed = true;
            flv.emit('demuxDone');
            debug.log('demux-done');
        });

        let sps = new Uint8Array();
        let pps = new Uint8Array();
        this.demuxWorker.onmessage = event => {
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
                case 'videoData': {
                    this.videoDataLength += 1;
                    this.videoDataSize += message.data.byteLength;
                    const readNalu = readBuffer(message.data);
                    readNalu(4);
                    const nalHeader = readNalu(1)[0];
                    const naluType = nalHeader & 31;
                    switch (naluType) {
                        case 1:
                        case 5: {
                            flv.emit('videoData', mergeBuffer(sps, pps, message.data), message.timestamp);
                            break;
                        }
                        case 7:
                            sps = message.data;
                            break;
                        case 8:
                            pps = message.data;
                            break;
                        default:
                            break;
                    }
                    break;
                }
                case 'audioData':
                    this.audioDataLength += 1;
                    this.audioDataSize += message.data.byteLength;
                    flv.emit('audioData', message.data, message.timestamp);
                    break;
                default:
                    break;
            }
        };
    }
}
