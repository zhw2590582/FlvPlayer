import resizeInit from './resizeInit'; 
import durationInit from './durationInit'; 
import frameRateInit from './frameRateInit'; 
import loadedInit from './loadedInit'; 
import playAndPauseInit from './playAndPauseInit'; 

export default function eventsInit(flv, player) {
    resizeInit(flv, player);
    durationInit(flv, player);
    frameRateInit(flv, player);
    loadedInit(flv, player);
    playAndPauseInit(flv, player);
}