import { readBuffer, readBufferSum, mergeBuffer } from '../../utils/buffer';
import SPSParser from './sps-parser';

export default class H264 {
    constructor(flv) {
        this.flv = flv;
        this.nalStart = new Uint8Array([0x00, 0x00, 0x00, 0x01]);
        this.frameHeader = new Uint8Array(0);
        this.mate = {};
        this.SPS = new Uint8Array(0);
        this.PPS = new Uint8Array(0);
        this.AVCDecoderConfigurationRecord = null;
    }

    demuxer(tag, requestHeader) {
        const { debug } = this.flv;
        const packet = tag.body.slice(1, 5);
        debug.error(packet.length >= 4, '[H264] Invalid AVC packet, missing AVCPacketType or/and CompositionTime');
        let frame = null;
        let header = null;

        const view = new DataView(packet.buffer);
        const AVCPacketType = view.getUint8(0);
        const CompositionTime = ((view.getUint32(0) & 0x00ffffff) << 8) >> 8;
        const packetData = tag.body.subarray(5);

        if (AVCPacketType === 0) {
            debug.warn(!this.AVCDecoderConfigurationRecord, '[h264] Find another one AVCDecoderConfigurationRecord');
            this.AVCDecoderConfigurationRecord = this.getAVCDecoderConfigurationRecord(packetData);
            this.flv.emit('AVCDecoderConfigurationRecord', this.AVCDecoderConfigurationRecord);
            debug.log('avc-decoder-configuration-record', this.AVCDecoderConfigurationRecord);
        } else if (AVCPacketType === 1) {
            frame = this.getAVCVideoData(packetData, CompositionTime);
        } else {
            debug.error(AVCPacketType === 2, `[H264] Invalid video packet type ${AVCPacketType}`);
        }

        if (requestHeader) {
            header = {
                format: 'h264',
                ...this.mate,
            };
        }

        return {
            header,
            frame,
        };
    }

    getAVCDecoderConfigurationRecord(packetData) {
        const { debug } = this.flv;
        debug.error(packetData.length >= 7, '[H264] AVCDecoderConfigurationRecord parse length is not enough');
        const readDcr = readBuffer(packetData);
        const result = {};
        [result.configurationVersion] = readDcr(1);
        [result.AVCProfileIndication] = readDcr(1);
        [result.profile_compatibility] = readDcr(1);
        [result.AVCLevelIndication] = readDcr(1);
        result.lengthSizeMinusOne = (readDcr(1)[0] & 3) + 1;

        result.numOfSequenceParameterSets = readDcr(1)[0] & 31;
        for (let index = 0; index < result.numOfSequenceParameterSets; index += 1) {
            result.sequenceParameterSetLength = readBufferSum(readDcr(2));
            if (result.sequenceParameterSetLength > 0) {
                this.SPS = readDcr(result.sequenceParameterSetLength);
                if (index === 0) {
                    result.sequenceParameterSetNALUnit = SPSParser.parser(this.SPS);
                    const codecArray = this.SPS.subarray(1, 4);
                    let codecString = 'avc1.';
                    for (let j = 0; j < 3; j += 1) {
                        let h = codecArray[j].toString(16);
                        if (h.length < 2) {
                            h = `0${h}`;
                        }
                        codecString += h;
                    }
                    this.mate.codec = codecString;
                }
            }
        }

        [result.numOfPictureParameterSets] = readDcr(1);
        for (let index = 0; index < result.numOfPictureParameterSets; index += 1) {
            result.pictureParameterSetLength = readBufferSum(readDcr(2));
            if (result.pictureParameterSetLength > 0) {
                this.PPS = readDcr(result.pictureParameterSetLength);
            }
        }

        debug.error(
            result.configurationVersion === 1,
            `[H264] Invalid configurationVersion: ${result.configurationVersion}`,
        );

        debug.error(
            result.AVCProfileIndication !== 0,
            `[H264] Invalid AVCProfileIndication: ${result.AVCProfileIndication}`,
        );

        debug.error(
            result.lengthSizeMinusOne === 4 || result.lengthSizeMinusOne !== 3,
            `[H264] Invalid lengthSizeMinusOne: ${result.lengthSizeMinusOne}`,
        );

        debug.error(
            result.numOfSequenceParameterSets !== 0,
            `[H264] Invalid numOfSequenceParameterSets: ${result.numOfSequenceParameterSets}`,
        );

        debug.warn(
            result.numOfSequenceParameterSets === 1,
            `[H264] Strange numOfSequenceParameterSets: ${result.numOfSequenceParameterSets}`,
        );

        debug.error(
            result.numOfPictureParameterSets !== 0,
            `[H264] Invalid numOfPictureParameterSets: ${result.numOfPictureParameterSets}`,
        );

        debug.warn(
            result.numOfPictureParameterSets === 1,
            `[H264] Strange numOfPictureParameterSets: ${result.numOfPictureParameterSets}`,
        );

        return result;
    }

    getAVCVideoData(packetData) {
        const { lengthSizeMinusOne } = this.AVCDecoderConfigurationRecord;
        const readVideo = readBuffer(packetData);
        let frame = new Uint8Array(0);
        while (readVideo.index < packetData.length) {
            const length = readBufferSum(readVideo(lengthSizeMinusOne));
            frame = mergeBuffer(frame, this.SPS, this.PPS, readVideo(length));
        }
        return mergeBuffer(this.nalStart, frame);
    }
}
