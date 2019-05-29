export default function templateInit(flv, player) {
    const { options } = flv;
    options.container.classList.add('flv-player-container');
    options.container.innerHTML = `
        <div class="flv-player-inner">
            <canvas class="flv-player-canvas" width="${options.width}" height="${options.height}"></canvas>
            <div class="flv-player-controls">
                <div class="flv-player-controls-top">
                    <div class="flv-player-controls-left">
                        <div class="flv-player-controls-item flv-player-state">
                            <div class="flv-player-state-play">${flv.icons.play}</div>
                            <div class="flv-player-state-pause">${flv.icons.pause}</div>
                        </div>
                        <div class="flv-player-controls-item flv-player-time">00:00 / 00:00</div>
                    </div>
                    <div class="flv-player-controls-right">
                        <div class="flv-player-controls-item flv-player-volume">${flv.icons.volume}</div>
                        <div class="flv-player-controls-item flv-player-fullscreen">${flv.icons.fullscreen}</div>
                    </div>
                </div>
                <div class="flv-player-controls-progress">
                    <div class="flv-player-controls-loaded"></div>
                    <div class="flv-player-controls-played">
                        <div class="flv-player-controls-indicator"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    Object.defineProperty(player, '$container', {
        value: options.container,
    });

    Object.defineProperty(player, '$inner', {
        value: options.container.querySelector('.flv-player-inner'),
    });

    Object.defineProperty(player, '$canvas', {
        value: options.container.querySelector('.flv-player-canvas'),
    });

    Object.defineProperty(player, '$controls', {
        value: options.container.querySelector('.flv-player-controls'),
    });
}
