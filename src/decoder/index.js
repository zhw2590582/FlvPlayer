import VideoDecoder from './video/h264bsd';
import AudioDecoder from './audio';

export default class Decoder {
    constructor(flv) {
        this.flv = flv;
        this.ended = false;
        this.playing = false;
        this.playTimer = null;
        this.waitingTimer = null;
        this.playIndex = 0;
        this.video = new VideoDecoder(flv, this);
        this.audio = new AudioDecoder(flv, this);
    }

    play() {
        const { stream, options, player } = this.flv;

        // Play after the end of playback
        if (this.ended) {
            this.playIndex = 0;
        }

        // Whether to draw successfully
        const videoDrawState = this.video.draw(this.playIndex);

        // Successfully drawn
        if (videoDrawState) {
            if (!this.playing) {
                this.playing = true;
                this.flv.emit('play');
            }

            this.playIndex += 1;
            this.ended = false;
            this.flv.emit('timeupdate');
            this.playTimer = setTimeout(() => {
                this.play();
            }, player.frameDuration);

        // Failed to draw because it is not loaded
        } else if (stream.streaming) {
            this.ended = false;
            this.playing = false;
            this.flv.emit('waiting');
            this.waitingTimer = setTimeout(() => {
                this.play();
            }, player.frameDuration);

        // Drawing failed because of the end    
        } else {
            this.flv.emit('ended');
            this.ended = true;
            this.playing = false;
            if (options.loop) {
                this.playIndex = 0;
                this.play();
            } else {
                this.pause();
            }
        }
    }

    pause() {
        this.playing = false;
        this.flv.emit('pause');
        clearTimeout(this.playTimer);
        clearTimeout(this.waitingTimer);
        this.playTimer = null;
        this.waitingTimer = null;
    }

    seeked(time) {
        const { player } = this.flv;
        this.playIndex = time * player.frameRate;
        this.flv.emit('seeked');
        this.video.draw(this.playIndex);
    }
}
