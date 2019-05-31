import resizeInit from './resizeInit'; 
import loadedInit from './loadedInit'; 
import playAndPauseInit from './playAndPauseInit'; 

export default function eventsInit(flv, player) {
    resizeInit(flv, player);
    loadedInit(flv, player);
    playAndPauseInit(flv, player);
}