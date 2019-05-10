export default {
    header: {
        signature: {
            value: [0x46, 0x4c, 0x56],
        },
        version: {
            value: [0x01],
        },
        flags: {
            0x00: 'No audio and video tag',
            0x01: 'Video tag only',
            0x04: 'Audio tag only',
            0x05: 'Audio and video tag',
        },
        dataOffset: {
            value: [0x09],
        },
    },
    tags: {
        header: {
            tagType: {
                0x08: 'Video tag',
                0x09: 'Audio tag',
                0x12: 'Scrip tag',
            },
            dataSize: {
                lenght: 3,
            },
            timestamp: {
                lenght: 4,
            },
            streamID: {
                lenght: 3,
            },
        },
        body: {
            scripTag: {
                amf1: {
                    type: {
                        value: [0x02],
                    },
                    size: {
                        lenght: 2,
                    },
                    string: {
                        value: 'onMetaData',
                    },
                },
                amf2: {
                    type: {
                        value: [0x08],
                    },
                    size: {
                        lenght: 4,
                    },
                    metaData: {
                        type: {
                            0x00: 'Number',
                            0x01: 'Boolean',
                            0x02: 'String',
                            0x03: 'Object',
                            0x04: 'MovieClip (reserved, not supported)',
                            0x05: 'Null',
                            0x06: 'Undefined',
                            0x07: 'Reference',
                            0x08: 'ECMA array',
                            0x09: 'Object end marker',
                            0x0a: 'Strict array',
                            0x0b: 'Date',
                            0x0c: 'Long string',
                        },
                        name: {
                            audiocodecid: 'Audio codec ID used in the file (see E.4.2.1 for available SoundFormat values)',
                            audiodatarate: 'Audio bit rate in kilobits per second',
                            audiodelay: 'Delay introduced by the audio codec in seconds',
                            audiosamplerate: 'Frequency at which the audio stream is replayed',
                            audiosamplesize: 'Resolution of a single audio sample',
                            canSeekToEnd: 'Indicating the last video frame is a key frame',
                            creationdate: 'Creation date and time',
                            duration: 'Total duration of the file in seconds',
                            filesize: 'Total size of the file in bytes',
                            framerate: 'Number of frames per second',
                            height: 'Height of the video in pixels',
                            stereo: 'Indicating stereo audio',
                            videocodecid: 'Video codec ID used in the file (see E.4.3.1 for available CodecID values)',
                            videodatarate: 'Video bit rate in kilobits per second',
                            width: 'Width of the video in pixels',
                        },
                    },
                },
            },
            audioTag: {
                soundFormat: {
                    0: 'Linear PCM, platform endian',
                    1: 'ADPCM',
                    2: 'MP3',
                    3: 'Linear PCM, little endian',
                    4: 'Nellymoser 16-kHz mono',
                    5: 'Nellymoser 8-kHz mono',
                    6: 'Nellymoser',
                    7: 'G.711 A-law logarithmic PCM',
                    8: 'G.711 mu-law logarithmic PCM',
                    9: 'reserved',
                    10: 'AAC',
                    11: 'Speex',
                    14: 'MP3 8-Khz',
                    15: 'Device-specific sound',
                },
                soundRate: {
                    0: '5.5-kHz',
                    1: '11-kHz',
                    2: '22-kHz',
                    3: '44-kHz',
                },
                soundSize: {
                    0: 'snd8Bit',
                    1: 'snd16Bit',
                },
                soundType: {
                    0: 'sndMono',
                    1: 'sndStereo',
                },
            },
            videoTag: {
                frameType: {
                    1: 'keyframe (for AVC, a seekable frame)',
                    2: 'inter frame (for AVC, a non-seekable frame)',
                    3: 'disposable inter frame (H.263 only)',
                    4: 'generated keyframe (reserved for server use only)',
                    5: 'video info/command frame',
                },
                codecID: {
                    1: 'JPEG (currently unused)',
                    2: 'Sorenson H.263',
                    3: 'Screen video',
                    4: 'On2 VP6',
                    5: 'On2 VP6 with alpha channel',
                    6: 'Screen video version 2',
                    7: 'AVC',
                },
            },
        },
    },
};
