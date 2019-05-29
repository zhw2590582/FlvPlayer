export default function videoMix(flv, player) {
    Object.defineProperty(player, 'currentTime', {
        get: () => {
            return true;
        },
        set: value => {
            return value;
        },
    });

    Object.defineProperty(player, 'duration', {
        get: () => {
            return true;
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

    Object.defineProperty(player, 'ended', {
        value: () => {
            return true;
        },
    });

    Object.defineProperty(player, 'playing', {
        value: () => {
            return true;
        },
    });

    Object.defineProperty(player, 'play', {
        value: () => {
            return true;
        },
    });

    Object.defineProperty(player, 'pause', {
        value: () => {
            return true;
        },
    });
}
