import play from './play.svg';
import pause from './pause.svg';
import volume from './volume.svg';
import volumeClose from './volume-close.svg';
import fullscreen from './fullscreen.svg';

const iconsMap = {
    play,
    pause,
    volume,
    volumeClose,
    fullscreen,
};

const icons = {};
Object.keys(iconsMap).forEach(key => {
    icons[key] = `<i class="flv-player-icon flv-player-icon-${key}">${iconsMap[key]}</i>`;
});

export default icons;
