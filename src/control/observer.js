import { setStyle } from '../utils';

export default function observer(flv) {
    const {
        events: { proxy },
        player,
    } = flv;
    const object = document.createElement('object');
    object.setAttribute('aria-hidden', 'true');
    object.setAttribute('tabindex', -1);
    object.type = 'text/html';
    object.data = 'about:blank';

    setStyle(object, {
        display: 'block',
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: '-1',
    });

    let playerWidth = player.width;
    let playerHeight = player.height;
    proxy(object, 'load', () => {
        proxy(object.contentDocument.defaultView, 'resize', () => {
            if (player.width !== playerWidth || player.height !== playerHeight) {
                playerWidth = player.width;
                playerHeight = player.height;
                flv.emit('resize');
            }
        });
    });

    player.$container.appendChild(object);
}
