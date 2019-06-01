import { secondToTime, throttle, debounce, clamp } from '../utils';

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

    flv.on('loaded', timestamp => {
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
