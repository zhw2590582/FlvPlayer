import screenfull from 'screenfull';

export default function property(flv, control) {
    const {
        player,
    } = flv;

    Object.defineProperty(control, 'controls', {
        get: () => {
            return player.$player.classList.contains('flvplayer-controls-show');
        },
        set: type => {
            if (type) {
                player.$player.classList.add('flvplayer-controls-show');
            } else {
                player.$player.classList.remove('flvplayer-controls-show');
            }
        },
    });

    Object.defineProperty(control, 'loading', {
        get: () => {
            return player.$player.classList.contains('flvplayer-loading-show');
        },
        set: type => {
            if (type) {
                player.$player.classList.add('flvplayer-loading-show');
            } else {
                player.$player.classList.remove('flvplayer-loading-show');
            }
        },
    });

    try {
        const screenfullChange = () => {
            if (control.fullscreen) {
                player.$container.classList.add('flvplayer-fullscreen');
            } else {
                player.$container.classList.remove('flvplayer-fullscreen');
            }
            control.autoSize();
        };
        screenfull.on('change', screenfullChange);
        flv.events.destroys.push(() => {
            screenfull.off('change', screenfullChange);
        });
    } catch (error) {
        flv.debug.warn(false, 'Does not seem to support full screen events');
    }

    Object.defineProperty(control, 'fullscreen', {
        get: () => screenfull.isFullscreen || player.$container.classList.contains('flvplayer-fullscreen-web'),
        set: type => {
            if (type) {
                try {
                    screenfull.request(player.$container);
                } catch (error) {
                    player.$container.classList.add('flvplayer-fullscreen-web');
                    control.autoSize();
                }
            } else {
                try {
                    screenfull.exit();
                } catch (error) {
                    player.$container.classList.remove('flvplayer-fullscreen-web');
                    control.autoSize();
                }
            }
        },
    });

    Object.defineProperty(control, 'autoSize', {
        value: () => {
            player.$container.style.padding = '0 0';
            const playerWidth = player.width;
            const playerHeight = player.height;
            const playerRatio = playerWidth / playerHeight;
            const canvasWidth = player.$canvas.width;
            const canvasHeight = player.$canvas.height;
            const canvasRatio = canvasWidth / canvasHeight;
            console.log(playerWidth, playerHeight, playerRatio, canvasWidth, canvasHeight, canvasRatio);
            if (playerRatio > canvasRatio) {
                const padding = (playerWidth - playerHeight * canvasRatio) / 2;
                player.$container.style.padding = `0 ${padding}px`;
            } else {
                const padding = (playerHeight - playerWidth / canvasRatio) / 2;
                console.log(padding);
                player.$container.style.padding = `${padding}px 0`;
            }
        },
    });
}