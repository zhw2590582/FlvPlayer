export default function autoSize(flv, player) {
    Object.defineProperty(player, 'autoSize', {
        value: () => {
            const playerWidth = player.width;
            const playerHeight = player.height;
            const playerRatio = playerWidth / playerHeight;
            const canvasWidth = player.$canvas.width;
            const canvasHeight = player.$canvas.height;
            const canvasRatio = canvasWidth / canvasHeight;
            if (playerRatio > canvasRatio) {
                const padding = (playerWidth - playerHeight * canvasRatio) / 2;
                player.$container.style.paddingLeft = `${padding}px`;
                player.$container.style.paddingRight = `${padding}px`;
            } else {
                const padding = (playerHeight - playerWidth * canvasRatio) / 2;
                player.$container.style.paddingTop = `${padding}px`;
                player.$container.style.paddingBottom = `${padding}px`;
            }
        },
    });
}
