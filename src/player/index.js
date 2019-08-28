import template from './template';
import property from './property';
import events from './events';
import { proxyPropertys } from '../utils';

export default class Player {
    constructor(flv) {
        template(flv, this);
        property(flv, this);
        events(flv, this);
        proxyPropertys(flv, this);
    }
}
