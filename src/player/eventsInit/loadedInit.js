import { throttle, clamp } from '../../utils';

export default function loadedInit(flv, player) {
    const loadedFn = throttle(timestamp => {
        const time = clamp(timestamp / 1000 / player.duration, 0, 1);
        player.$loaded.style.width = `${time * 100}%`;
    }, 500);

    flv.on('timestamp', timestamp => {
        if (!flv.options.live) {
            loadedFn(timestamp);
        }
    });
}
