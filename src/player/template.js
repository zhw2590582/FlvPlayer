export default function template(flv, player) {
    const { options } = flv;
    const cacheCss = options.container.style.cssText;
    options.container.classList.add('flvplayer-container');

    options.container.innerHTML = `
        <div class="flvplayer-player">
            <canvas class="flvplayer-canvas" width="${options.width}" height="${options.height}"></canvas>
        </div>
    `;

    flv.on('destroy', () => {
        options.container.innerHTML = '';
        options.container.style.cssText = cacheCss;
        options.container.classList.remove('flvplayer-container');
    });

    Object.defineProperty(player, '$container', {
        value: options.container,
    });

    Object.defineProperty(player, '$player', {
        value: options.container.querySelector('.flvplayer-player'),
    });

    Object.defineProperty(player, '$canvas', {
        value: options.container.querySelector('.flvplayer-canvas'),
    });
}
