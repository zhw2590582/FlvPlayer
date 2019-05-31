import './style.scss';
import template from './template';
import property from './property';
import observer from './observer';
import events from './events';
import controls from './controls';
import performance from './performance';

export default class Player {
    constructor(flv) {
        template(flv, this);
        property(flv, this);
        observer(flv, this);
        events(flv, this);

        if (flv.options.controls) {
            controls(flv, this);
        }

        if (flv.options.debug) {
            performance(flv, this);
        }
    }
}
