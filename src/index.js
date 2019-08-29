import Emitter from './emitter';
import Debug from './debug';
import Events from './events';
import Player from './player';
import Decoder from './decoder';
import Demuxer from './demuxer';
import Stream from './stream';
import * as utils from './utils';

let id = 0;
class FlvPlayer extends Emitter {
    constructor(options) {
        super();
        this.options = {
            ...FlvPlayer.options,
            ...options,
        };

        if (typeof this.options.container === 'string') {
            this.options.container = document.querySelector(this.options.container);
        }

        if (window.FlvplayerDecoder) {
            this.init();
        } else {
            utils.loadScript(this.options.decoder, 'FlvplayerDecoder').then(() => {
                this.init();
            });
        }
    }

    init() {
        this.isDestroy = false;
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
        );

        this.debug = new Debug(this);
        this.events = new Events(this);
        this.player = new Player(this);
        this.decoder = new Decoder(this);
        this.demuxer = new Demuxer(this);
        this.stream = new Stream(this);

        if (window.FlvplayerControl && this.options.control) {
            this.control = new window.FlvplayerControl(this);
        }

        id += 1;
        this.id = id;
        FlvPlayer.instances.push(this);
    }

    static get options() {
        return {
            url: '',
            container: '',
            debug: false,
            live: false,
            loop: false,
            autoPlay: false,
            hasAudio: true,
            control: true,
            volume: 7,
            frameRate: 30,
            width: 400,
            height: 300,
            socketSend: '',
            headers: {},
            decoder: './flvplayer-decoder-baseline.js',
        };
    }

    static get version() {
        return '__VERSION__';
    }

    static get env() {
        return '__ENV__';
    }

    static get utils() {
        return utils;
    }

    destroy() {
        this.isDestroy = true;
        this.emit('destroy');
        FlvPlayer.instances.splice(FlvPlayer.instances.indexOf(this), 1);
    }
}

Object.defineProperty(FlvPlayer, 'instances', {
    value: [],
});

export default FlvPlayer;
