import { mergeBuffer } from '../../utils';
import mergeAudioBuffers from './mergeAudioBuffers';

export default class AudioDecoder {
    constructor(flv) {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.source = this.context.createBufferSource();
        this.gainNode = this.context.createGain();
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.gainNode.gain.value = 0.7;

        this.audiobuffers = [];

        // let test = new Uint8Array();
        // let index = 0;
        // flv.on('audioData', uint8 => {
        //     if (index <= 500) {
        //         index += 1;
        //         test = mergeBuffer(test, uint8);
        //     }
        // });

        // this.play = () => {
        //     this.context.decodeAudioData(test.buffer, audiobuffer => {
        //         this.source.buffer = audiobuffer;
        //         this.source.start(0);
        //     });
        // };

        flv.on('audioData', uint8 => {
            // this.context.decodeAudioData(uint8.buffer, audiobuffer => {
            //     this.audiobuffers.push(audiobuffer);
            // }, err => {
            //     console.log(err);
            // });
        });

        this.play = index => {
            this.source.buffer = this.audiobuffers[index];
            this.source.start(0);
        };
    }
}
