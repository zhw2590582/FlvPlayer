import { getNowTime } from '../utils';
import AudioDecoder from './audio';

export default class Decoder {
    constructor(flv) {
        this.flv = flv;
        this.ended = false;
        this.playing = false;
        this.waiting = false;
        this.animationFrameTimer = null;
        this.waitingTimer = null;
        this.endedTimer = null;
        this.currentTime = 0;
        this.lastUpdateTime = 0;

        this.video = new window.FlvplayerDecoder(flv, this);
        if (flv.options.hasAudio) {
            this.audio = new AudioDecoder(flv, this);
        } else {
            this.audio = {
                play: () => null,
                stop: () => null,
                playing: true,
                decoding: false,
            };
        }

        flv.on('ready', () => {
            if (flv.options.autoPlay) {
                this.play();
            } else {
                this.video.draw(0);
            }
        });

        flv.on('destroy', () => {
            this.pause();
        });

        flv.on('timeupdate', currentTime => {
            if (!flv.options.live && currentTime >= flv.player.duration) {
                this.pause();
            }
        });

        let isPlaying = false;
        flv.events.proxy(document, 'visibilitychange', () => {
            if (document.hidden) {
                isPlaying = this.playing;
                this.pause();
            }

            if (!document.hidden && isPlaying) {
                isPlaying = this.playing;
                this.play();
            }
        });
    }

    play() {
        this.lastUpdateTime = getNowTime();
        this.video.play(this.currentTime);
        this.audio.play(this.currentTime);
        this.animationFrame();
        this.flv.emit('play');
    }

    animationFrame() {
        const { options, player } = this.flv;
        this.animationFrameTimer = window.requestAnimationFrame(() => {
            if (this.video.playing && this.audio.playing) {
                this.ended = false;
                this.playing = true;
                this.waiting = false;
                const updateTime = getNowTime();
                this.currentTime += (updateTime - this.lastUpdateTime) / 1000;
                this.lastUpdateTime = updateTime;
                this.flv.emit('timeupdate', this.currentTime);
            } else if (player.streaming || this.video.decoding || this.audio.decoding) {
                this.ended = false;
                this.playing = false;
                this.waiting = true;
                this.flv.emit('waiting', this.currentTime);
                this.waitingTimer = setTimeout(() => {
                    this.play();
                }, 1000);
                return;
            } else {
                this.ended = true;
                this.playing = false;
                this.waiting = false;
                this.flv.emit('ended', this.currentTime);
                if (options.loop && !options.live) {
                    this.currentTime = 0;
                    this.endedTimer = setTimeout(() => {
                        this.play();
                        this.flv.emit('loop');
                    }, 1000);
                    return;
                }
                this.pause();
            }
            this.animationFrame();
        });
    }

    pause() {
        window.cancelAnimationFrame(this.animationFrameTimer);
        window.clearTimeout(this.waitingTimer);
        window.clearTimeout(this.endedTimer);
        this.animationFrameTimer = null;
        this.waitingTimer = null;
        this.endedTimer = null;
        this.video.stop();
        this.audio.stop();
        this.ended = false;
        this.playing = false;
        this.waiting = false;
        this.flv.emit('pause');
    }

    seeked(time) {
        const { player } = this.flv;
        window.cancelAnimationFrame(this.animationFrameTimer);
        window.clearTimeout(this.waitingTimer);
        window.clearTimeout(this.endedTimer);
        this.animationFrameTimer = null;
        this.waitingTimer = null;
        this.endedTimer = null;
        this.currentTime = time;
        this.video.draw(Math.floor(time * player.frameRate));
        if (this.playing) {
            this.play();
        }
        this.flv.emit('seeked', time);
    }
}
