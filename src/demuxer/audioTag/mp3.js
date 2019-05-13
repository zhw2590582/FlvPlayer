export default class MP3 {
    constructor(flv) {
        this.flv = flv;
    }

    static get SAMPLERATES() {
        return {
            25: [11025, 12000, 8000, 0],
            20: [22050, 24000, 16000, 0],
            10: [44100, 48000, 32000, 0],
        };
    }

    static get BITRATES() {
        return {
            L1: [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, -1],
            L2: [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, -1],
            L3: [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1],
        };
    }

    demuxer(tag, requestHeader) {
        const { debug } = this.flv;
        const packet = tag.body.slice(1);
        let header = null;

        if (requestHeader) {
            debug.error(packet.length >= 4, 'MP3 header missing');
            debug.error(packet[0] === 0xff, 'MP3 header mismatch');
            const ver = (packet[1] >>> 3) & 0x03;
            const layer = (packet[1] & 0x06) >> 1;
            const bitrateIndex = (packet[2] & 0xf0) >>> 4;
            const samplingFreqIndex = (packet[2] & 0x0c) >>> 2;
            const channelMode = (packet[3] >>> 6) & 0x03;
            const channels = channelMode !== 3 ? 2 : 1;
            let sampleRate = 0;
            let bitRate = 0;

            switch (ver) {
                case 0:
                    sampleRate = MP3.SAMPLERATES['25'][samplingFreqIndex];
                    break;
                case 2:
                    sampleRate = MP3.SAMPLERATES['20'][samplingFreqIndex];
                    break;
                case 3:
                    sampleRate = MP3.SAMPLERATES['10'][samplingFreqIndex];
                    break;
                default:
                    debug.warn(false, `[mp3] Unknown mp3 version: ${ver}`);
                    break;
            }

            switch (layer) {
                case 1:
                    bitRate = MP3.BITRATES.L3[bitrateIndex];
                    break;
                case 2:
                    bitRate = MP3.BITRATES.L2[bitrateIndex];
                    break;
                case 3:
                    bitRate = MP3.BITRATES.L1[bitrateIndex];
                    break;
                default:
                    debug.warn(false, `[mp3] Unknown mp3 layer: ${layer}`);
                    break;
            }

            header = {
                ver,
                layer,
                bitRate,
                sampleRate,
                channels,
                format: 'mp3',
                codec: 'mp3',
            };
        }

        return {
            header,
            frame: packet,
        };
    }
}
