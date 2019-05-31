import { secondToTime, throttle, clamp } from '../utils';

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

    function getPosFromEvent(event) {
        const { $progress } = player;
        const { left } = $progress.getBoundingClientRect();
        const width = clamp(event.x - left, 0, $progress.clientWidth);
        const second = (width / $progress.clientWidth) * player.duration;
        const time = secondToTime(second);
        const percentage = clamp(width / $progress.clientWidth, 0, 1);
        return { second, time, width, percentage };
    }

    proxy(player.$progress, 'click', event => {
        if (event.target !== player.$indicator) {
            const { second } = getPosFromEvent(event);
            player.currentTime = second;
        }
    });

    let isDroging = false;
    proxy(player.$indicator, ['mousedown', 'touchstart'], () => {
        isDroging = true;
    });

    proxy(document, ['mousemove', 'touchmove'], event => {
        if (isDroging) {
            const { second, percentage } = getPosFromEvent(event);
            if (second <= player.loaded) {
                player.$played.style.width = `${percentage * 100}%`;
                player.currentTime = second;
            }
        }
    });

    proxy(document, ['mouseup', 'touchend'], () => {
        if (isDroging) {
            isDroging = false;
        }
    });
}
