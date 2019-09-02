import template from './template';
import property from './property';
import events from './events';

export default class Player {
    constructor(flv) {
        template(flv, this);
        property(flv, this);
        events(flv, this);
    }
}
