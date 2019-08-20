import template from './template';
import property from './property';
import observer from './observer';
import events from './events';
import { proxyPropertys } from '../utils';

export default class Player {
    constructor(flv) {
        template(flv, this);
        property(flv, this);
        observer(flv, this);
        events(flv, this);
        proxyPropertys(flv, this);
    }
}
