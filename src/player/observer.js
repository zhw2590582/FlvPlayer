export default function observer(flv, player) {
    const { proxy } = flv.events;
    const object = document.createElement('object');
    object.setAttribute('aria-hidden', 'true');
    object.setAttribute('tabindex', -1);
    object.type = 'text/html';
    object.data = 'about:blank';

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
