export default function playAndPauseInit(flv, player) {
    const { $canvas } = player;
    const { events: { proxy } }  = flv;

    proxy($canvas, 'click', () => {
        if (player.playing) {
            player.pause();
        } else {
            player.play();
        }
    });
}