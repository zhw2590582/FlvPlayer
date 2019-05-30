import { mergeBuffer, readBufferSum, readString, readBuffer, readDouble, readBoolean, getNowTime } from './utils';

const nalStart = new Uint8Array([0x00, 0x00, 0x00, 0x01]);
export default class Demuxer {
    constructor(flv) {
        this.flv = flv;
        const { options, debug } = flv;
        this.scripMeta = null;
        this.AVCDecoderConfigurationRecord = null;
        this.AudioSpecificConfig = null;

        this.uint8 = new Uint8Array(0);
        this.index = 0;
        this.header = null;

        this.streamStartTime = 0;
        this.streamStartEnd = 0;

        flv.on('streamStart', requestType => {
            this.streamStartTime = getNowTime();
            debug.log('stream-start', requestType, options.url);
        });

        flv.on('streaming', uint8 => {
            this.uint8 = mergeBuffer(this.uint8, uint8);
            this.demux();
        });

        flv.on('streamEnd', uint8 => {
            this.streamStartEnd = getNowTime();
            debug.log('stream-end', this.streamStartEnd - this.streamStartTime);

            if (uint8) {
                this.uint8 = uint8;
                this.index = 0;
                this.header = null;
                this.demux();
            }

            this.uint8 = uint8;
            this.index = 0;
            this.header = null;
            flv.isLoaded = true;
            flv.emit('demuxDone');
            debug.log('demux-done');
        });
    }

    demux() {
        const { debug } = this.flv;
        if (!this.header && this.readable(13)) {
            const header = Object.create(null);
            header.signature = readString(this.read(3));
            header.version = this.read(1)[0];
            debug.error(header.signature === 'FLV' && header.version === 1, 'FLV header not found');
            header.flags = this.read(1)[0];
            header.headersize = readBufferSum(this.read(4));
            this.header = header;
            const prevTagSize = readBufferSum(this.read(4));
            debug.error(prevTagSize === 0, `PrevTagSize0 should be equal to 0, but got ${prevTagSize}`);
            this.flv.emit('parseHeader', this.header);
            debug.log('parse-header', this.header);
        }

        while (this.index < this.uint8.length) {
            const restIndex = this.index;
            const tag = Object.create(null);

            if (this.readable(11)) {
                tag.tagType = this.read(1)[0];
                tag.dataSize = readBufferSum(this.read(3));
                const ts2 = this.read(1);
                const ts1 = this.read(1);
                const ts0 = this.read(1);
                const ts3 = this.read(1);
                tag.timestamp = ts0 | (ts1 << 8) | (ts2 << 16) | (ts3 << 24);
                tag.streamID = readBufferSum(this.read(3));
                debug.error(tag.streamID === 0, `streamID should be equal to 0, but got ${tag.streamID}`);
            } else {
                this.index = restIndex;
                break;
            }

            if (this.readable(tag.dataSize + 4)) {
                tag.body = this.read(tag.dataSize);
                const prevTagSize = readBufferSum(this.read(4));
                debug.error(prevTagSize === tag.dataSize + 11, `Invalid PrevTagSize: ${prevTagSize}`);
            } else {
                this.index = restIndex;
                break;
            }

            switch (tag.tagType) {
                case 18:
                    this.demuxerScripTag(tag);
                    break;
                case 9:
                    this.demuxerVideoTag(tag);
                    break;
                case 8:
                    this.demuxerAudioTag(tag);
                    break;
                default:
                    debug.error(false, `unknown tag type: ${tag.tagType}`);
                    break;
            }
        }
    }

    readable(length) {
        return this.uint8.length - this.index >= length;
    }

    read(length) {
        const tempUint8 = new Uint8Array(length);
        for (let i = 0; i < length; i += 1) {
            tempUint8[i] = this.uint8[this.index];
            this.index += 1;
        }
        return tempUint8;
    }

    demuxerScripTag(tag) {
        const { debug } = this.flv;
        const readScripTag = readBuffer(tag.body);
        const amf1 = Object.create(null);
        const amf2 = Object.create(null);

        amf1.type = readScripTag(1)[0];
        debug.error(amf1.type === 2, `AMF: [amf1] type expect 2, but got ${amf1.type}`);
        amf1.size = readBufferSum(readScripTag(2));
        amf1.string = readString(readScripTag(amf1.size));

        amf2.type = readScripTag(1)[0];
        debug.error(amf2.type === 8, `AMF: [amf2] type expect 8, but got ${amf2.type}`);
        amf2.size = readBufferSum(readScripTag(4));
        amf2.metaData = Object.create(null);

        function getValue(type) {
            let value = null;
            if (type !== undefined) {
                switch (type) {
                    case 0:
                        value = readDouble(readScripTag(8));
                        break;
                    case 1:
                        value = readBoolean(readScripTag(1));
                        break;
                    case 2: {
                        const valueLength = readBufferSum(readScripTag(2));
                        value = readString(readScripTag(valueLength));
                        break;
                    }
                    case 3: {
                        value = Object.create(null);
                        let lastType = -1;
                        while (lastType !== 9) {
                            const nameLength = readBufferSum(readScripTag(2));
                            const name = readString(readScripTag(nameLength));
                            const itemType = readScripTag(1)[0];
                            if (name) {
                                value[name] = getValue(itemType);
                            }
                            lastType = itemType;
                        }
                        break;
                    }
                    case 5:
                        value = null;
                        break;
                    case 6:
                        value = undefined;
                        break;
                    case 7:
                        value = `Reference #${readScripTag.index}`;
                        readScripTag(2);
                        break;
                    case 8: {
                        value = Object.create(null);
                        let lastType = -1;
                        while (lastType !== 9) {
                            const nameLength = readBufferSum(readScripTag(2));
                            const name = readString(readScripTag(nameLength));
                            const itemType = readScripTag(1)[0];
                            if (name) {
                                value[name] = getValue(itemType);
                            }
                            lastType = itemType;
                        }
                        break;
                    }
                    case 10: {
                        const valueLength = readBufferSum(readScripTag(4));
                        value = [];
                        for (let index = 0; index < valueLength; index += 1) {
                            const itemType = readScripTag(1)[0];
                            value.push(getValue(itemType));
                        }
                        break;
                    }
                    case 11:
                        value = readDouble(readScripTag(2));
                        break;
                    case 12: {
                        const valueLength = readBufferSum(readScripTag(4));
                        value = readString(readScripTag(valueLength));
                        break;
                    }
                    default:
                        debug.error(false, `AMF: Unknown metaData type: ${type}`);
                        break;
                }
            }
            return value;
        }

        while (readScripTag.index < tag.body.length) {
            const nameLength = readBufferSum(readScripTag(2));
            const name = readString(readScripTag(nameLength));
            const type = readScripTag(1)[0];
            if (name) {
                amf2.metaData[name] = getValue(type);
            }
        }

        debug.error(readScripTag.index === tag.body.length, 'AMF: Seems to be incompletely parsed');
        debug.error(amf2.size === Object.keys(amf2.metaData).length, 'AMF: [amf2] length does not match');

        this.scripMeta = { amf1, amf2 };
        this.flv.emit('scripMeta', this.scripMeta);
        debug.log('scrip-meta', this.scripMeta);
    }

    demuxerVideoTag(tag) {
        const { debug } = this.flv;
        debug.error(tag.body.length > 1, 'Invalid video packet');
        const header = {
            frameType: (tag.body[0] & 0xf0) >> 4,
            codecID: tag.body[0] & 0x0f,
        };
        debug.error(header.codecID === 7, `[videoTrack] Unsupported codec in video frame: ${header.codecID}`);
        const packet = tag.body.slice(1, 5);
        debug.error(packet.length >= 4, '[H264] Invalid AVC packet, missing AVCPacketType or/and CompositionTime');
        const view = new DataView(packet.buffer);
        const AVCPacketType = view.getUint8(0);
        const CompositionTime = ((view.getUint32(0) & 0x00ffffff) << 8) >> 8;
        const pts = CompositionTime + tag.timestamp;
        const packetData = tag.body.subarray(5);

        if (AVCPacketType === 0) {
            debug.warn(!this.AVCDecoderConfigurationRecord, '[h264] Find another one AVCDecoderConfigurationRecord');
            debug.error(packetData.length >= 7, '[H264] AVCDecoderConfigurationRecord parse length is not enough');
            const readDcr = readBuffer(packetData);
            const result = {};
            result.configurationVersion = readDcr(1)[0];
            debug.error(
                result.configurationVersion === 1,
                `[H264] Invalid configurationVersion: ${result.configurationVersion}`,
            );
            result.AVCProfileIndication = readDcr(1)[0];
            debug.error(
                result.AVCProfileIndication !== 0,
                `[H264] Invalid AVCProfileIndication: ${result.AVCProfileIndication}`,
            );
            result.profile_compatibility = readDcr(1)[0];
            result.AVCLevelIndication = readDcr(1)[0];
            result.lengthSizeMinusOne = (readDcr(1)[0] & 3) + 1;
            debug.error(
                result.lengthSizeMinusOne === 4 || result.lengthSizeMinusOne !== 3,
                `[H264] Invalid lengthSizeMinusOne: ${result.lengthSizeMinusOne}`,
            );
            result.numOfSequenceParameterSets = readDcr(1)[0] & 31;
            debug.error(
                result.numOfSequenceParameterSets !== 0,
                `[H264] Invalid numOfSequenceParameterSets: ${result.numOfSequenceParameterSets}`,
            );
            debug.warn(
                result.numOfSequenceParameterSets === 1,
                `[H264] Strange numOfSequenceParameterSets: ${result.numOfSequenceParameterSets}`,
            );
            for (let index = 0; index < result.numOfSequenceParameterSets; index += 1) {
                result.sequenceParameterSetLength = readBufferSum(readDcr(2));
                if (result.sequenceParameterSetLength > 0) {
                    const SPS = readDcr(result.sequenceParameterSetLength);
                    this.flv.emit('videoData', mergeBuffer(nalStart, SPS));
                }
            }
            result.numOfPictureParameterSets = readDcr(1)[0];
            debug.error(
                result.numOfPictureParameterSets !== 0,
                `[H264] Invalid numOfPictureParameterSets: ${result.numOfPictureParameterSets}`,
            );
            debug.warn(
                result.numOfPictureParameterSets === 1,
                `[H264] Strange numOfPictureParameterSets: ${result.numOfPictureParameterSets}`,
            );
            for (let index = 0; index < result.numOfPictureParameterSets; index += 1) {
                result.pictureParameterSetLength = readBufferSum(readDcr(2));
                if (result.pictureParameterSetLength > 0) {
                    const PPS = readDcr(result.pictureParameterSetLength);
                    this.flv.emit('videoData', mergeBuffer(nalStart, PPS), pts);
                }
            }
            this.AVCDecoderConfigurationRecord = result;
            this.flv.emit('AVCDecoderConfigurationRecord', result);
            debug.log('avc-decoder-configuration-record', result);
        } else if (AVCPacketType === 1) {
            const { lengthSizeMinusOne } = this.AVCDecoderConfigurationRecord;
            const readVideo = readBuffer(packetData);
            while (readVideo.index < packetData.length) {
                const length = readBufferSum(readVideo(lengthSizeMinusOne));
                this.flv.emit('videoData', mergeBuffer(nalStart, readVideo(length)), pts);
            }
        } else {
            debug.error(AVCPacketType === 2, `[H264] Invalid video packet type ${AVCPacketType}`);
        }
    }

    demuxerAudioTag(tag) {
        const { debug } = this.flv;
        debug.error(tag.body.length > 1, 'Invalid audio packet');
        const header = {
            soundFormat: (tag.body[0] & 0xf0) >> 4,
            soundRate: (tag.body[0] & 0x0c) >> 2,
            soundSize: (tag.body[0] & 0x02) >> 1,
            soundType: (tag.body[0] & 0x01) >> 0,
        };
        debug.error(header.soundFormat === 10, `[audioTrack] unsupported audio format: ${header.soundFormat}`);
        const packet = tag.body.subarray(1);
        const packetType = packet[0];
        if (packetType === 0) {
            const packetData = packet.subarray(1);
            debug.warn(!this.AudioSpecificConfig, '[aac] Find another one AudioSpecificConfig');
            debug.error(packetData.length >= 2, '[aac] AudioSpecificConfig parse length is not enough');
            const result = {};
            result.audioObjectType = (packetData[0] & 0xf8) >> 3;
            result.samplingFrequencyIndex = ((packetData[0] & 7) << 1) + (((packetData[1] & 0x80) >> 7) & 1);
            result.channelConfiguration = (packetData[1] & 0x7f) >> 3;
            this.AudioSpecificConfig = result;
            this.flv.emit('AudioSpecificConfig', result);
            debug.log('audio-specific-config', result);
        } else {
            const { audioObjectType, samplingFrequencyIndex, channelConfiguration } = this.AudioSpecificConfig;
            const ADTSLen = tag.dataSize - 2 + 7;
            const ADTSHeader = new Uint8Array(7);
            ADTSHeader[0] = 0xff;
            ADTSHeader[1] = 0xf0;
            ADTSHeader[1] |= 0 << 3;
            ADTSHeader[1] |= 0 << 1;
            ADTSHeader[1] |= 1;
            ADTSHeader[2] = (audioObjectType - 1) << 6;
            ADTSHeader[2] |= (samplingFrequencyIndex & 0x0f) << 2;
            ADTSHeader[2] |= 0 << 1;
            ADTSHeader[2] |= (channelConfiguration & 0x04) >> 2;
            ADTSHeader[3] = (channelConfiguration & 0x03) << 6;
            ADTSHeader[3] |= 0 << 5;
            ADTSHeader[3] |= 0 << 4;
            ADTSHeader[3] |= 0 << 3;
            ADTSHeader[3] |= 0 << 2;
            ADTSHeader[3] |= (ADTSLen & 0x1800) >> 11;
            ADTSHeader[4] = (ADTSLen & 0x7f8) >> 3;
            ADTSHeader[5] = (ADTSLen & 0x7) << 5;
            ADTSHeader[5] |= 0x1f;
            ADTSHeader[6] = 0xfc;
            const ADTSBody = tag.body.subarray(2);
            const data = mergeBuffer(ADTSHeader, ADTSBody);
            this.flv.emit('audioData', data, tag.timestamp);
        }
    }
}
