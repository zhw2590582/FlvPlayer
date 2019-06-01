import screenfull from 'screenfull';

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

    Object.defineProperty(player, 'x', {
        get: () => {
            return player.left + window.pageXOffset;
        },
    });

    Object.defineProperty(player, 'y', {
        get: () => {
            return player.top + window.pageYOffset;
        },
    });

    Object.defineProperty(player, 'currentTime', {
        get: () => {
            return flv.decoder.currentTime;
        },
        set: time => {
            if (time <= player.loaded) {
                flv.decoder.seeked(time);
            }
        },
    });

    Object.defineProperty(player, 'streaming', {
        get: () => {
            return flv.demuxer.streaming;
        },
    });

    Object.defineProperty(player, 'videoDecoding', {
        get: () => {
            return flv.decoder.video.decoding;
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
            try {
                return Math.round(flv.demuxer.scripMeta.amf2.metaData.framerate);
            } catch (error) {
                return Math.round(flv.options.frameRate || 30);
            }
        },
    });

    Object.defineProperty(player, 'frameDuration', {
        get: () => {
            return (1000 / player.frameRate) | 0;
        },
    });

    Object.defineProperty(player, 'volume', {
        get: () => {
            return true;
        },
        set: value => {
            return value;
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

    Object.defineProperty(player, 'loading', {
        get: () => player.$loading.style.display === 'flex',
        set: type => {
            if (type) {
                player.$loading.style.display = 'flex';
            } else {
                player.$loading.style.display = 'none';
            }
        },
    });

    Object.defineProperty(player, 'fullscreen', {
        get: () => screenfull.isFullscreen || player.$container.classList.contains('flv-player-fullscreen-web'),
        set: type => {
            if (type) {
                try {
                    screenfull.request(player.$container).then(() => {
                        player.$container.classList.add('flv-player-fullscreen');
                        player.autoSize();
                    });
                } catch (error) {
                    player.$container.classList.add('flv-player-fullscreen-web');
                }
            } else {
                try {
                    screenfull.exit().then(() => {
                        player.$container.classList.remove('flv-player-fullscreen');
                        player.autoSize();
                    });
                } catch (error) {
                    player.$container.classList.remove('flv-player-fullscreen-web');
                }
            }
        },
    });
}
