import { mergeBuffer } from '../../utils/buffer';

export default class AAC {
    constructor(flv) {
        this.flv = flv;
    }

    static get SAMPLERATES() {
        return {
            0: 96000,
            1: 88200,
            2: 64000,
            3: 48000,
            4: 44100,
            5: 32000,
            6: 24000,
            7: 22050,
            8: 16000,
            9: 12000,
            10: 11025,
            11: 8000,
            12: 7350,
            13: 0,
            14: 0,
            15: 0,
        };
    }

    static get CHANNELS() {
        return {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 8,
        };
    }

    demuxer(tag, requestHeader) {
        const { debug } = this.flv;
        const packet = tag.body.slice(1);
        const packetType = packet[0];
        let frame = null;
        let header = null;
        
        this.AudioSpecificConfig = {
            audioObjectType: 0,
            samplingFrequencyIndex: 0,
            channelConfiguration: 0,
        };

        if (packetType === 0) {
            const packetData = packet.slice(1);
            this.AudioSpecificConfig = this.getAudioSpecificConfig(packetData);
            this.flv.emit('AudioSpecificConfig', this.AudioSpecificConfig);
            debug.log('audio-specific-config', this.AudioSpecificConfig);
        } else {
            const ADTSLen = tag.dataSize - 2 + 7;
            const ADTSHeader = this.getADTSHeader(ADTSLen);
            const ADTSBody = tag.body.slice(2);
            frame = mergeBuffer(ADTSHeader, ADTSBody);
        }

        if (requestHeader) {
            header = {
                format: 'aac',
                sampleRate: AAC.SAMPLERATES[this.AudioSpecificConfig.samplingFrequencyIndex],
                channels: AAC.CHANNELS[this.AudioSpecificConfig.channelConfiguration],
                codec: `mp4a.40.${this.AudioSpecificConfig.audioObjectType}`,
            };
        }

        return {
            header,
            frame,
        }
    }

    getAudioSpecificConfig(packetData) {
        const { debug } = this.flv;
        debug.error(packetData.length >= 2, '[aac] AudioSpecificConfig parse length is not enough');
        const result = {};
        result.audioObjectType = (packetData[0] & 0xf8) >> 3;
        result.samplingFrequencyIndex = ((packetData[0] & 7) << 1) + (((packetData[1] & 0x80) >> 7) & 1);
        result.channelConfiguration = (packetData[1] & 0x7f) >> 3;
        return result;
    }

    getADTSHeader(ADTSLen) {
        const { audioObjectType, samplingFrequencyIndex, channelConfiguration } = this.AudioSpecificConfig;
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
        return ADTSHeader;
    }
}
