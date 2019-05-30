import resizeInit from './resizeInit'; 
import durationInit from './durationInit'; 
import loadedInit from './loadedInit'; 

export default function eventsInit(flv, player) {
    resizeInit(flv, player);
    durationInit(flv, player);
    loadedInit(flv, player);
}