import { secondToTime, throttle, debounce, clamp, getStyle, setStyle } from '../utils';

export default function controls(flv, player) {
    const {
        events: { proxy },
    } = flv;

    proxy(player.$play, 'click', () => {
        player.play();
    });

    proxy(player.$pause, 'click', () => {
        player.pause();
    });

    const loadedFn = throttle(timestamp => {
        const time = clamp(timestamp / player.duration, 0, 1);
        player.$loaded.style.width = `${time * 100}%`;
    }, 500);

    flv.on('videoLoaded', timestamp => {
        if (!flv.options.live) {
            loadedFn(timestamp);
        }
    });

    const timeupdateFn = throttle(currentTime => {
        player.$played.style.width = `${(currentTime / player.duration) * 100}%`;
        player.$current.innerText = secondToTime(currentTime);
    }, 500);

    flv.on('timeupdate', currentTime => {
        if (!flv.options.live) {
            timeupdateFn(currentTime);
        }
    });

    flv.on('play', () => {
        player.$play.style.display = 'none';
        player.$pause.style.display = 'block';
    });

    flv.on('ended', () => {
        player.controls = true;
        player.$play.style.display = 'block';
        player.$pause.style.display = 'none';
    });

    flv.on('pause', () => {
        player.$play.style.display = 'block';
        player.$pause.style.display = 'none';
    });

    flv.on('scripMeta', () => {
        if (!flv.options.live) {
            player.$duration.innerText = secondToTime(player.duration);
        }
    });

    proxy(player.$fullscreen, 'click', () => {
        if (player.fullscreen) {
            player.fullscreen = false;
        } else {
            player.fullscreen = true;
        }
    });

    const autoHide = debounce(() => {
        player.$player.classList.add('flv-player-hide-cursor');
        player.controls = false;
    }, 5000);

    proxy(player.$player, 'mousemove', () => {
        autoHide.clearTimeout();
        player.$player.classList.remove('flv-player-hide-cursor');
        player.controls = true;
        if (player.playing) {
            autoHide();
        }
    });

    function volumeChangeFromEvent(event) {
        const { left: panelLeft, width: panelWidth } = player.$volumePanel.getBoundingClientRect();
        const { width: handleWidth } = player.$volumeHandle.getBoundingClientRect();
        const percentage =
            clamp(event.x - panelLeft - handleWidth / 2, 0, panelWidth - handleWidth / 2) / (panelWidth - handleWidth);
        return percentage * 10;
    }

    function setVolumeHandle(percentage) {
        if (percentage === 0) {
            setStyle(player.$volumeOn, 'display', 'none');
            setStyle(player.$volumeOff, 'display', 'flex');
            setStyle(player.$volumeHandle, 'left', '0');
        } else {
            const panelWidth = getStyle(player.$volumePanel, 'width') || 60;
            const handleWidth = getStyle(player.$volumeHandle, 'width');
            const width = ((panelWidth - handleWidth) * percentage) / 10;
            setStyle(player.$volumeOn, 'display', 'flex');
            setStyle(player.$volumeOff, 'display', 'none');
            setStyle(player.$volumeHandle, 'left', `${width}px`);
        }
    }

    if (flv.options.hasAudio) {
        let lastVolume = 0;
        let isVolumeDroging = false;

        setVolumeHandle(flv.options.volume);
        flv.on('volumechange', () => {
            setVolumeHandle(player.volume);
        });

        proxy(player.$volumeOn, 'click', () => {
            player.$volumeOn.style.display = 'none';
            player.$volumeOff.style.display = 'block';
            lastVolume = player.volume;
            player.volume = 0;
        });

        proxy(player.$volumeOff, 'click', () => {
            player.$volumeOn.style.display = 'block';
            player.$volumeOff.style.display = 'none';
            player.volume = lastVolume || 7;
        });

        proxy(player.$volumePanel, 'click', event => {
            player.volume = volumeChangeFromEvent(event);
        });

        proxy(player.$volumeHandle, 'mousedown', () => {
            isVolumeDroging = true;
        });

        proxy(player.$volumeHandle, 'mousemove', event => {
            if (isVolumeDroging) {
                player.volume = volumeChangeFromEvent(event);
            }
        });

        proxy(document, 'mouseup', () => {
            if (isVolumeDroging) {
                isVolumeDroging = false;
            }
        });
    }

    function getPosFromEvent(event) {
        const { $progress } = player;
        const { left } = $progress.getBoundingClientRect();
        const width = clamp(event.x - left, 0, $progress.clientWidth);
        const second = (width / $progress.clientWidth) * player.duration;
        const time = secondToTime(second);
        const percentage = clamp(width / $progress.clientWidth, 0, 1);
        return { second, time, width, percentage };
    }

    if (!flv.options.live) {
        proxy(player.$progress, 'click', event => {
            if (event.target !== player.$indicator) {
                const { second, percentage } = getPosFromEvent(event);
                if (second <= player.loaded) {
                    player.$played.style.width = `${percentage * 100}%`;
                    player.currentTime = second;
                }
            }
        });

        let isIndicatorDroging = false;
        proxy(player.$indicator, 'mousedown', () => {
            isIndicatorDroging = true;
        });

        proxy(document, 'mousemove', event => {
            if (isIndicatorDroging) {
                const { second, percentage } = getPosFromEvent(event);
                if (second <= player.loaded) {
                    player.$played.style.width = `${percentage * 100}%`;
                    player.currentTime = second;
                }
            }
        });

        proxy(document, 'mouseup', () => {
            if (isIndicatorDroging) {
                isIndicatorDroging = false;
            }
        });

        let isCanvasDroging = false;
        let touchstartX = 0;
        let touchSecond = 0;
        proxy(player.$canvas, 'touchstart', event => {
            isCanvasDroging = true;
            touchstartX = event.targetTouches[0].clientX;
        });

        proxy(player.$canvas, 'touchmove', event => {
            if (isCanvasDroging) {
                const { $progress } = player;
                const moveWidth = event.targetTouches[0].clientX - touchstartX;
                touchSecond = (moveWidth / $progress.clientWidth) * player.duration;
            }
        });

        proxy(player.$canvas, 'touchend', () => {
            if (isCanvasDroging) {
                isCanvasDroging = false;
                if (touchSecond <= player.loaded) {
                    player.currentTime += touchSecond;
                }
                touchstartX = 0;
                touchSecond = 0;
            }
        });
    }
}
