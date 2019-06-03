import Emitter from './emitter';
import validator from './validator';
import Debug from './debug';
import Events from './events';
import Player from './player';
import Decoder from './decoder';
import Demuxer from './demuxer';
import Stream from './stream';

let id = 0;
class FlvPlayer extends Emitter {
    constructor(options) {
        super();
        this.options = Object.assign({}, FlvPlayer.options, options);
        validator(this);

        this.debug = new Debug(this);
        this.events = new Events(this);
        this.player = new Player(this);
        this.decoder = new Decoder(this);
        this.demuxer = new Demuxer(this);
        this.stream = new Stream(this);

        id += 1;
        this.id = id;
        this.isDestroy = false;
        this.userAgent = window.navigator.userAgent;
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(this.userAgent);
        FlvPlayer.instances.push(this);
    }

    static get options() {
        return {
            url: '',
            poster: '',
            container: null,
            debug: false,
            live: false,
            loop: false,
            hotkey: true,
            controls: true,
            volume: 7,
            frameRate: 30,
            headers: {},
            width: 400,
            height: 300,
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
        this.isDestroy = true;
        this.options.container.innerHTML = '';
        FlvPlayer.instances.splice(FlvPlayer.instances.indexOf(this), 1);
        this.emit('destroy');
    }
}

Object.defineProperty(FlvPlayer, 'instances', {
    value: [],
});

export default FlvPlayer;
