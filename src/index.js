import Emitter from 'tiny-emitter';
import checkSupport from './utils/checkSupport';
import optionValidator from './utils/optionValidator';
import Debug from './debug';
import Events from './events';
import Workers from './workers';
import Decoder from './decoder';
import Player from './player';

let id = 0;
class Flvplayer extends Emitter {
    constructor(options) {
        super();
        checkSupport();
        this.options = Object.assign({}, Flvplayer.options, options);
        optionValidator(this.options);

        this.debug = new Debug(this);
        this.events = new Events(this);
        this.workers = new Workers(this);
        this.decoder = new Decoder(this);
        this.player = new Player(this);

        id += 1;
        this.id = id;
        Flvplayer.instances.push(this);
    }

    static get options() {
        return {
            url: '',
            canvas: null,
            debug: false,
            live: false,
            width: null,
            height: null
        };
    }

    static get version() {
        return '__VERSION__';
    }

    static get env() {
        return '__ENV__';
    }

    destroy() {
        this.events.destroy();
        this.workers.destroy();
        Flvplayer.instances.splice(Flvplayer.instances.indexOf(this), 1);
        this.emit('destroy');
    }
}

Object.defineProperty(Flvplayer, 'instances', {
    value: []
});

export default Flvplayer;
