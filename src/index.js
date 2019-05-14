import Emitter from 'tiny-emitter';
import checkSupport from './utils/checkSupport';
import optionValidator from './utils/optionValidator';
import Debug from './debug';
import Events from './events';
import Workers from './workers';
import Parse from './parse';
import Demuxer from './demuxer';
import Remuxer from './remuxer';
import Stream from './stream';
import Player from './player';

let id = 0;
class FlvPlayer extends Emitter {
    constructor(options) {
        super();
        checkSupport();
        this.options = Object.assign({}, FlvPlayer.options, options);
        optionValidator(this);

        this.debug = new Debug(this);
        this.events = new Events(this);
        this.workers = new Workers(this);
        this.parse = new Parse(this);
        this.demuxer = new Demuxer(this);
        this.remuxer = new Remuxer(this);
        this.stream = new Stream(this);
        this.player = new Player(this);

        this.le = (function le() {
            const buf = new ArrayBuffer(2);
            new DataView(buf).setInt16(0, 256, true);
            return new Int16Array(buf)[0] === 256;
        })();

        id += 1;
        this.id = id;
        FlvPlayer.instances.push(this);
    }

    static get options() {
        return {
            url: '',
            canvas: null,
            debug: false,
            live: false,
            width: null,
            height: null,
            header: {},
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
        FlvPlayer.instances.splice(FlvPlayer.instances.indexOf(this), 1);
        this.emit('destroy');
    }
}

Object.defineProperty(FlvPlayer, 'instances', {
    value: [],
});

export default FlvPlayer;
