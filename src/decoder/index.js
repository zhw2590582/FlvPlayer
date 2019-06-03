import { throttle } from '../utils';
import VideoDecoder from './video/h264bsd';
import AudioDecoder from './audio';

export default class Decoder {
    constructor(flv) {
        this.flv = flv;
        this.ended = false;
        this.playing = false;
        this.waiting = false;
        this.timer = null;
        this.video = new VideoDecoder(flv, this);
        this.audio = new AudioDecoder(flv, this);

        flv.on('destroy', () => {
            this.pause();
        });

        this.seekedThrottle = throttle(() => {
            this.video.draw(this.video.playIndex);
            if (this.playing) {
                this.play();
            }
        }, 200);
    }

    play() {
        const { options, player } = this.flv;

        let startTime = player.currentTime;
        if (this.ended) {
            startTime = 0;
        }

        this.video.play(startTime);
        this.audio.play(startTime);
        this.flv.emit('play');

        const loop = () => {
            this.timer = window.requestAnimationFrame(() => {
                if (this.video.playing && this.audio.playing) {
                    this.flv.emit('timeupdate', player.currentTime);
                    this.ended = false;
                    this.playing = true;
                    this.waiting = false;
                } else if (player.streaming || this.video.decoding || this.audio.decoding) {
                    this.flv.emit('waiting', player.currentTime);
                    this.ended = false;
                    this.playing = false;
                    this.waiting = true;
                    return this.play();
                } else {
                    this.flv.emit('ended', player.currentTime);
                    this.ended = true;
                    this.playing = false;
                    this.waiting = false;
                    if (options.loop) {
                        return this.play();
                    }
                    return this.pause();
                }
                return loop();
            });
        };
        loop();
    }

    pause() {
        window.cancelAnimationFrame(this.timer);
        this.timer = null;
        this.video.stop();
        this.audio.stop();
        this.ended = false;
        this.playing = false;
        this.waiting = false;
        this.flv.emit('pause');
    }

    seeked(time) {
        const { player } = this.flv;
        window.cancelAnimationFrame(this.timer);
        this.timer = null;
        this.video.playIndex = Math.floor(time * player.frameRate);
        this.flv.emit('seeked', time);
        this.seekedThrottle();
    }
}
