import { setStyle } from '../utils';

export default function template(flv, player) {
    const { options } = flv;
    setStyle(options.container, {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
    });
    Object.defineProperty(player, '$container', {
        value: options.container,
    });

    const $canvas = document.createElement('canvas');
    $canvas.width = options.width;
    $canvas.height = options.height;
    setStyle($canvas, {
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
    });
    options.container.appendChild($canvas);
    Object.defineProperty(player, '$canvas', {
        value: $canvas,
    });
}
