import { secondToTime, throttle, debounce, clamp, getStyle, setStyle } from '../utils';

export default function controls(flv, control) {
    const {
        options: { poster },
        events: { proxy },
        player,
    } = flv;

    proxy(window, ['click', 'contextmenu'], event => {
        if (event.composedPath().indexOf(player.$container) > -1) {
            control.isFocus = true;
        } else {
            control.isFocus = false;
        }
    });

    control.autoSize();
    flv.on('resize', () => {
        control.autoSize();
    });

    flv.on('scripMeta', () => {
        control.autoSize();
    });

    if (poster) {
        flv.on('play', () => {
            control.$poster.style.display = 'none';
        });

        flv.on('seeked', () => {
            control.$poster.style.display = 'none';
        });
    }

    flv.on('waiting', () => {
        control.loading = true;
    });

    flv.on('ended', () => {
        control.loading = false;
    });

    flv.on('timeupdate', () => {
        control.loading = false;
    });

    proxy(control.$play, 'click', () => {
        player.play();
    });

    proxy(control.$pause, 'click', () => {
        player.pause();
    });

    const loadedFn = throttle(timestamp => {
        const time = clamp(timestamp / player.duration, 0, 1);
        control.$loaded.style.width = `${time * 100}%`;
    }, 500);

    flv.on('videoLoaded', timestamp => {
        if (!flv.options.live) {
            loadedFn(timestamp);
        }
    });

    const timeupdateFn = throttle(currentTime => {
        control.$played.style.width = `${(currentTime / player.duration) * 100}%`;
        control.$current.innerText = secondToTime(currentTime);
    }, 500);

    flv.on('timeupdate', currentTime => {
        if (!flv.options.live) {
            timeupdateFn(currentTime);
        }
    });

    flv.on('seeked', currentTime => {
        if (!flv.options.live) {
            timeupdateFn(currentTime);
        }
    });

    flv.on('play', () => {
        control.$play.style.display = 'none';
        control.$pause.style.display = 'block';
    });

    flv.on('ended', () => {
        control.controls = true;
        control.$play.style.display = 'block';
        control.$pause.style.display = 'none';
    });

    flv.on('loop', () => {
        control.controls = false;
    });

    flv.on('pause', () => {
        control.$play.style.display = 'block';
        control.$pause.style.display = 'none';
        control.loading = false;
    });

    flv.on('scripMeta', () => {
        if (!flv.options.live) {
            control.$duration.innerText = secondToTime(player.duration);
        }
    });

    proxy(control.$fullscreen, 'click', () => {
        if (control.fullscreen) {
            control.fullscreen = false;
        } else {
            control.fullscreen = true;
        }
    });

    const autoHide = debounce(() => {
        player.$player.classList.add('flvplayer-hide-cursor');
        control.controls = false;
    }, 5000);

    proxy(player.$player, 'mousemove', () => {
        autoHide.clearTimeout();
        player.$player.classList.remove('flvplayer-hide-cursor');
        control.controls = true;
        if (player.playing) {
            autoHide();
        }
    });

    function volumeChangeFromEvent(event) {
        const { left: panelLeft, width: panelWidth } = control.$volumePanel.getBoundingClientRect();
        const { width: handleWidth } = control.$volumeHandle.getBoundingClientRect();
        const percentage =
            clamp(event.x - panelLeft - handleWidth / 2, 0, panelWidth - handleWidth / 2) / (panelWidth - handleWidth);
        return percentage * 10;
    }

    function setVolumeHandle(percentage) {
        if (percentage === 0) {
            if (!flv.isMobile) {
                setStyle(control.$volumeHandle, 'left', '0');
            }
            setStyle(control.$volumeOn, 'display', 'none');
            setStyle(control.$volumeOff, 'display', 'flex');
        } else {
            if (!flv.isMobile) {
                const panelWidth = getStyle(control.$volumePanel, 'width') || 60;
                const handleWidth = getStyle(control.$volumeHandle, 'width');
                const width = ((panelWidth - handleWidth) * percentage) / 10;
                setStyle(control.$volumeHandle, 'left', `${width}px`);
            }
            setStyle(control.$volumeOn, 'display', 'flex');
            setStyle(control.$volumeOff, 'display', 'none');
        }
    }

    if (flv.options.hasAudio) {
        let lastVolume = 0;
        let isVolumeDroging = false;

        if (flv.options.muted) {
            setVolumeHandle(0);
        } else {
            setVolumeHandle(flv.options.volume);
        }

        flv.on('volumechange', () => {
            setVolumeHandle(player.volume);
        });

        proxy(control.$volumeOn, 'click', () => {
            control.$volumeOn.style.display = 'none';
            control.$volumeOff.style.display = 'block';
            lastVolume = player.volume;
            player.volume = 0;
        });

        proxy(control.$volumeOff, 'click', () => {
            control.$volumeOn.style.display = 'block';
            control.$volumeOff.style.display = 'none';
            player.volume = lastVolume || 7;
        });

        if (!flv.isMobile) {
            proxy(control.$volumePanel, 'click', event => {
                player.volume = volumeChangeFromEvent(event);
            });

            proxy(control.$volumeHandle, 'mousedown', () => {
                isVolumeDroging = true;
            });

            proxy(control.$volumeHandle, 'mousemove', event => {
                if (isVolumeDroging) {
                    player.volume = volumeChangeFromEvent(event);
                }
            });
        }

        proxy(document, 'mouseup', () => {
            if (isVolumeDroging) {
                isVolumeDroging = false;
            }
        });
    }

    function getPosFromEvent(event) {
        const { $progress } = control;
        const { left } = $progress.getBoundingClientRect();
        const width = clamp(event.x - left, 0, $progress.clientWidth);
        const second = (width / $progress.clientWidth) * player.duration;
        const time = secondToTime(second);
        const percentage = clamp(width / $progress.clientWidth, 0, 1);
        return { second, time, width, percentage };
    }

    if (!flv.options.live && flv.options.cache) {
        proxy(control.$progress, 'click', event => {
            if (event.target !== control.$indicator) {
                const { second, percentage } = getPosFromEvent(event);
                if (second <= player.loaded) {
                    control.$played.style.width = `${percentage * 100}%`;
                    player.currentTime = second;
                }
            }
        });

        let isIndicatorDroging = false;
        proxy(control.$indicator, 'mousedown', () => {
            isIndicatorDroging = true;
        });

        proxy(document, 'mousemove', event => {
            if (isIndicatorDroging) {
                const { second, percentage } = getPosFromEvent(event);
                if (second <= player.loaded) {
                    control.$played.style.width = `${percentage * 100}%`;
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
                const { $progress } = control;
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
