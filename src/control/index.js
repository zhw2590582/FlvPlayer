import './style.scss';
import template from './template';
import hotkey from './hotkey';
import property from './property';
import events from './events';

export default class Control {
    constructor(flv) {
        template(flv, this);
        events(flv, this);
        property(flv, this);
        if (!flv.isMobile) {
            hotkey(flv, this);
        }
    }
}