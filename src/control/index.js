import './style.scss';
import template from './template';
import observer from './observer';
import hotkey from './hotkey';
import property from './property';
import events from './events';

class Control {
    constructor(flv) {
        template(flv, this);
        observer(flv, this);
        property(flv, this);
        events(flv, this);
        if (flv.options.hotkey) {
            hotkey(flv, this);
        }
    }
}

window.FlvplayerControl = Control;
export default Control;
