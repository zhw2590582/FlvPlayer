import screenfull from 'screenfull';
import { clamp } from '../utils';

export default function property(flv, player) {
    Object.defineProperty(player, 'rect', {
        get: () => {
            return player.$container.getBoundingClientRect();
        },
    });

    ['bottom', 'height', 'left', 'right', 'top', 'width'].forEach(key => {
        Object.defineProperty(player, key, {
            get: () => {
                return player.rect[key];
            },
        });
    });

    Object.defineProperty(player, 'currentTime', {
        get: () => {
            return flv.decoder.currentTime;
        },
        set: time => {
            if (!flv.options.live) {
                flv.decoder.seeked(clamp(time, 0, player.loaded));
            }
        },
    });

    Object.defineProperty(player, 'streaming', {
        get: () => {
            return flv.demuxer.streaming;
        },
    });

    Object.defineProperty(player, 'demuxed', {
        get: () => {
            return flv.demuxer.demuxed;
        },
    });

    Object.defineProperty(player, 'videoDecoding', {
        get: () => {
            return flv.decoder.video.decoding;
        },
    });

    Object.defineProperty(player, 'audioDecoding', {
        get: () => {
            return flv.decoder.audio.decoding;
        },
    });

    Object.defineProperty(player, 'duration', {
        get: () => {
            try {
                return flv.demuxer.scripMeta.amf2.metaData.duration;
            } catch (error) {
                return flv.options.duration || 0;
            }
        },
    });

    Object.defineProperty(player, 'frameRate', {
        get: () => {
            const defaultFrameRate = Math.round(flv.options.frameRate || 30);
            try {
                return Math.round(flv.demuxer.scripMeta.amf2.metaData.framerate) || defaultFrameRate;
            } catch (error) {
                return defaultFrameRate;
            }
        },
    });

    Object.defineProperty(player, 'frameDuration', {
        get: () => {
            return (1000 / player.frameRate) | 0;
        },
    });

    Object.defineProperty(player, 'isFocus', {
        value: false,
        writable: true,
    });

    Object.defineProperty(player, 'volume', {
        get: () => {
            try {
                return flv.decoder.audio.gainNode.gain.value;
            } catch (error) {
                return 0;
            }
        },
        set: value => {
            try {
                flv.decoder.audio.gainNode.gain.value = clamp(value, 0, 10);
                flv.emit('volumechange', player.volume);
                return player.volume;
            } catch (error) {
                return value;
            }
        },
    });

    Object.defineProperty(player, 'loaded', {
        get: () => {
            return flv.decoder.video.loaded;
        },
    });

    Object.defineProperty(player, 'playing', {
        get: () => {
            return flv.decoder.playing;
        },
    });

    Object.defineProperty(player, 'play', {
        value: () => {
            if (!player.playing) {
                flv.decoder.play();
            }
        },
    });

    Object.defineProperty(player, 'pause', {
        value: () => {
            flv.decoder.pause();
        },
    });

    Object.defineProperty(player, 'toggle', {
        value: () => {
            if (player.playing) {
                player.pause();
            } else {
                player.play();
            }
        },
    });

    Object.defineProperty(player, 'autoSize', {
        value: () => {
            const playerWidth = player.width;
            const playerHeight = player.height;
            const playerRatio = playerWidth / playerHeight;
            const canvasWidth = player.$canvas.width;
            const canvasHeight = player.$canvas.height;
            const canvasRatio = canvasWidth / canvasHeight;
            if (playerRatio > canvasRatio) {
                const padding = (playerWidth - playerHeight * canvasRatio) / 2;
                player.$container.style.padding = `0 ${padding}px`;
            } else {
                const padding = (playerHeight - playerWidth / canvasRatio) / 2;
                player.$container.style.padding = `${padding}px 0`;
            }
        },
    });

    Object.defineProperty(player, 'controls', {
        get: () => {
            return player.$player.classList.contains('flv-player-controls-show');
        },
        set: type => {
            if (type) {
                player.$player.classList.add('flv-player-controls-show');
            } else {
                player.$player.classList.remove('flv-player-controls-show');
            }
        },
    });

    Object.defineProperty(player, 'loading', {
        get: () => {
            return player.$player.classList.contains('flv-player-loading-show');
        },
        set: type => {
            if (type) {
                player.$player.classList.add('flv-player-loading-show');
            } else {
                player.$player.classList.remove('flv-player-loading-show');
            }
        },
    });

    try {
        const screenfullChange = () => {
            if (player.fullscreen) {
                player.$container.classList.add('flv-player-fullscreen');
            } else {
                player.$container.classList.remove('flv-player-fullscreen');
            }
            player.autoSize();
        };
        screenfull.on('change', screenfullChange);
        flv.events.destroyEvents.push(() => {
            screenfull.off('change', screenfullChange);
        });
    } catch (error) {
        flv.debug.warn(false, 'Does not seem to support full screen events');
    }

    Object.defineProperty(player, 'fullscreen', {
        get: () => screenfull.isFullscreen || player.$container.classList.contains('flv-player-fullscreen-web'),
        set: type => {
            if (type) {
                try {
                    screenfull.request(player.$container);
                } catch (error) {
                    player.$container.classList.add('flv-player-fullscreen-web');
                }
            } else {
                try {
                    screenfull.exit();
                } catch (error) {
                    player.$container.classList.remove('flv-player-fullscreen-web');
                }
            }
        },
    });
}
