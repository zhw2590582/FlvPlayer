import { throttle } from '../../utils';

export default function loadedInit(flv, player) {
    const loadedFn = throttle(timestamp => {
        player.$loaded.style.width = `${(timestamp / 1000 / player.duration) * 100}%`;
    }, 500);

    flv.on('timestamp', timestamp => {
        if (!flv.options.live) {
            loadedFn(timestamp);
        }
    });
}
