import { setStyle } from '../utils';

export default function template(flv, player) {
    const { options } = flv;
    options.container.classList.add('flvplayer-container');
    setStyle(options.container, {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
    });

    options.container.innerHTML = `
        <div class="flvplayer-inner" style="position: relative;display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;">
            <canvas class="flvplayer-canvas" width="${options.width}" height="${options.height}" style="cursor: pointer;width: 100%;height: 100%;background-color: #000;"></canvas>
        </div>
    `;

    Object.defineProperty(player, '$container', {
        value: options.container,
    });

    Object.defineProperty(player, '$player', {
        value: options.container.querySelector('.flvplayer-inner'),
    });

    Object.defineProperty(player, '$canvas', {
        value: options.container.querySelector('.flvplayer-canvas'),
    });
}
