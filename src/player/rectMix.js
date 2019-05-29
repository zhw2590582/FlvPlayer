export default function propertysMix(flv, player) {
    Object.defineProperty(player, 'rect', {
        get: () => {
            return flv.options.container.getBoundingClientRect();
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
}
