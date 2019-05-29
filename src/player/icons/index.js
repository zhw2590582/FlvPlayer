import play from './play.svg';
import pause from './pause.svg';
import volume from './volume.svg';
import volumeClose from './volume-close.svg';
import fullscreen from './fullscreen.svg';

export default class Icons {
    constructor() {
        const icons = {
            play,
            pause,
            volume,
            volumeClose,
            fullscreen,
        };

        Object.keys(icons).forEach(key => {
            this[key] = `<i class="flv-player-icon flv-player-icon-${key}">${icons[key]}</i>`;
        });
    }
}
