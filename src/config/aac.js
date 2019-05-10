// https://wiki.multimedia.cx/index.php?title=ADTS
// https://github.com/uupaa/AAC.js/wiki/TechnicalTerms

export default {
    AIDS: {},
    ADTS: {
        frame: {
            Header: {
                length: '56bits',
                SyncWord: {
                    length: '12bits',
                    value: 0xfff,
                },
                MPEGVersionID: {
                    length: '1bits',
                    0: 'MPEG-4',
                    1: 'MPEG-2',
                },
                Layer: {
                    length: '2bits',
                    value: 0,
                },
                CRCProtection: {
                    length: '1bits',
                    0: 'yes',
                    1: 'no',
                },
                Profile: {
                    length: '2bits',
                    1: 'AAC-LC',
                },
                SamplingRate: {
                    length: '4bits',
                    '0100': 44100,
                    '0111': 22050,
                },
                Private: {
                    length: '1bits',
                },
                Channels: {
                    length: '3bits',
                    1: 'CENTER',
                    2: 'LEFT/RIGHT',
                },
                Originality: {
                    length: '1bits',
                },
                Home: {
                    length: '1bits',
                },
                Copyrighted: {
                    length: '1bits',
                },
                CopyrightID: {
                    length: '1bits',
                },
                FrameLength: {
                    length: '13bits',
                    note: 'ADTS Header + CRC + RDBs',
                },
                BufferFullness: {
                    length: '11bits',
                },
                RDBsInFrame: {
                    length: '2bits',
                    note: 'CRC if protection absent is 0',
                },
            },
            CRC: {
                length: '16bits',
            },
            RDB: {
                length: 'nbits',
            },
        },
    },
    AudioSpecificConfig: {
        audioObjectType: {
            0: 'Null',
            1: 'AAC Main',
            2: 'AAC LC (Low Complexity)',
            3: 'AAC SSR (Scalable Sample Rate)',
            4: 'AAC LTP (Long Term Prediction)',
            5: 'SBR (Spectral Band Replication)',
            6: 'AAC Scalable',
            7: 'TwinVQ',
            8: 'CELP (Code Excited Linear Prediction)',
            9: 'HXVC (Harmonic Vector eXcitation Coding)',
            10: 'Reserved',
            11: 'Reserved',
            12: 'TTSI (Text-To-Speech Interface)',
            13: 'Main Synthesis',
            14: 'Wavetable Synthesis',
            15: 'General MIDI',
        },
        samplingFrequencyIndex: {
            0: '96000 Hz',
            1: '88200 Hz',
            2: '64000 Hz',
            3: '48000 Hz',
            4: '44100 Hz',
            5: '32000 Hz',
            6: '24000 Hz',
            7: '22050 Hz',
            8: '16000 Hz',
            9: '12000 Hz',
            10: '11025 Hz',
            11: '8000 Hz',
            12: '7350 Hz',
            13: 'Reserved',
            14: 'Reserved',
            15: 'frequency is written explictly',
        },
        channelConfiguration: {
            0: 'Defined in AOT Specifc Config',
            1: '1 channel: front-center',
            2: '2 channels: front-left, front-right',
            3: '3 channels: front-center, front-left, front-right',
            4: '4 channels: front-center, front-left, front-right, back-center',
            5: '5 channels: front-center, front-left, front-right, back-left, back-right',
            6: '6 channels: front-center, front-left, front-right, back-left, back-right, LFE-channel',
            7: '8 channels: front-center, front-left, front-right, side-left, side-right, back-left, back-right, LFE-channel',
            '8-15': 'Reserved',
        },
    },
};
