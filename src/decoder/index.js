import VideoDecoder from './video/h264bsd';
import AudioDecoder from './audio';

export default class Decoder {
    constructor(flv) {
        this.flv = flv;
        this.ended = false;
        this.playing = false;
        this.playTimer = null;
        this.waitingTimer = null;
        this.endedTimer = null;
        this.playIndex = 0;
        this.currentTime = 0;
        this.video = new VideoDecoder(flv, this);
        this.audio = new AudioDecoder(flv, this);
    }

    play() {
        const { options, player } = this.flv;

        if (this.ended) {
            this.playIndex = 0;
        }

        const videoDrawState = this.video.draw(this.playIndex);

        if (videoDrawState) {
            if (!this.playing) {
                this.playing = true;
                this.flv.emit('play');
            }
            this.playIndex += 1;
            this.ended = false;
            this.currentTime = this.playIndex / player.frameRate;
            this.flv.emit('timeupdate', this.currentTime);
            this.playTimer = setTimeout(() => {
                this.play();
            }, player.frameDuration);
        } else if (player.streaming || player.videoDecoding) {
            this.ended = false;
            this.playing = false;
            this.flv.emit('waiting');
            this.waitingTimer = setTimeout(() => {
                this.play();
            }, player.frameDuration);
        } else {
            this.ended = true;
            this.playing = false;
            this.flv.emit('ended');
            if (options.loop) {
                this.playIndex = 0;
                this.endedTimer = setTimeout(() => {
                    this.play();
                }, player.frameDuration);
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
        clearTimeout(this.endedTimer);
        this.playTimer = null;
        this.waitingTimer = null;
        this.endedTimer = null;
    }

    seeked(time) {
        const { player } = this.flv;
        this.playIndex = time * player.frameRate;
        this.flv.emit('seeked', time);
        this.video.draw(this.playIndex);
    }
}
