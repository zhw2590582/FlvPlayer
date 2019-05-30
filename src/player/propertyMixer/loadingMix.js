export default function loadingMix(flv, player) {
    Object.defineProperty(player, 'loading', {
        get: () => player.$loading.style.display !== 'none',
        set: type => {
            if (type) {
                player.$loading.style.display = 'flex';
            } else {
                player.$loading.style.display = 'none';
            }
        },
    });
}
