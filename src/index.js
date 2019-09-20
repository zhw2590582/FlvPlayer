import validator from 'option-validator';
import isSupported from './utils/isSupported';
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
        this.options = validator(
            {
                ...FlvPlayer.options,
                ...options,
            },
            FlvPlayer.scheme,
        );

        if (this.options.live) {
            this.options.cache = false;
        }

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

        console.log(
            '%c FlvPlayer.js %c __VERSION__ %c https://flvplayer.js.org',
            'color: #fff; background: #5f5f5f',
            'color: #fff; background: #4bc729',
            '',
        );
    }

    init() {
        this.isDestroy = false;
        this.isMobile = utils.isMobile();
        this.isWechat = utils.isWechat();
        this.debug = new Debug(this);
        this.events = new Events(this);
        this.player = new Player(this);
        this.decoder = new Decoder(this);
        this.demuxer = new Demuxer(this);
        this.stream = new Stream(this);

        utils.proxyPropertys(this, this.player);
        if (window.FlvplayerControl && this.options.control) {
            this.control = new window.FlvplayerControl(this);
            utils.proxyPropertys(this, this.control);
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
            cache: true,
            muted: false,
            cors: true,
            touchResume: true,
            withCredentials: false,
            volume: 0.7,
            frameRate: 30,
            maxTimeDiff: 200,
            videoChunk: 1024 * 1024,
            audioChunk: 16 * 1024,
            filesize: Infinity,
            width: 400,
            height: 300,
            socketSend: '',
            headers: {},
            decoder: './flvplayer-decoder-baseline.js',
        };
    }

    static get scheme() {
        return {
            url: 'string|file',
            container: 'string|htmldivelement',
            debug: 'boolean',
            live: 'boolean',
            loop: 'boolean',
            autoPlay: 'boolean',
            hasAudio: 'boolean',
            control: 'boolean',
            cache: 'boolean',
            muted: 'boolean',
            cors: 'boolean',
            touchResume: 'boolean',
            withCredentials: 'boolean',
            volume: 'number',
            frameRate: 'number',
            maxTimeDiff: 'number',
            videoChunk: 'number',
            audioChunk: 'number',
            filesize: 'number',
            width: 'number',
            height: 'number',
            socketSend: 'string',
            headers: 'object',
            decoder: 'string',
        };
    }

    static get isSupported() {
        return isSupported;
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
