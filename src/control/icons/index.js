import play from './play.svg';
import pause from './pause.svg';
import volume from './volume.svg';
import volumeClose from './volume-close.svg';
import fullscreen from './fullscreen.svg';
import loading from './loading.svg';

const iconsMap = {
    play,
    pause,
    volume,
    volumeClose,
    fullscreen,
    loading,
};

export default Object.keys(iconsMap).reduce((icons, key) => {
    icons[key] = `<i class="flvplayer-icon flvplayer-icon-${key}">${iconsMap[key]}</i>`;
    return icons;
}, {});
