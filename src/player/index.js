import './style/index.scss';
import templateCreator from './templateCreator';
import propertyMixer from './propertyMixer';
import eventsInit from './eventsInit';

export default class Player {
    constructor(flv) {
        templateCreator(flv, this);
        propertyMixer(flv, this);
        eventsInit(flv, this);
    }
}
