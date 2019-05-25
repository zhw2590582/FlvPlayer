import Emitter from 'tiny-emitter';
import optionValidator from './utils/optionValidator';
import Debug from './debug';
import Demuxer from './demuxer';
import Decoder from './decoder';
import Stream from './stream';

let id = 0;
class FlvPlayer extends Emitter {
    constructor(options) {
        super();
        this.options = Object.assign({}, FlvPlayer.options, options);
        optionValidator(this);

        this.debug = new Debug(this);
        this.decoder = new Decoder(this);
        this.demuxer = new Demuxer(this);
        this.stream = new Stream(this);

        id += 1;
        this.id = id;
        FlvPlayer.instances.push(this);
    }

    static get options() {
        return {
            url: '',
            element: null,
            debug: false,
            live: false,
            controls: true,
            width: 400,
            height: 300,
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
        FlvPlayer.instances.splice(FlvPlayer.instances.indexOf(this), 1);
        this.emit('destroy');
    }
}

Object.defineProperty(FlvPlayer, 'instances', {
    value: [],
});

export default FlvPlayer;
