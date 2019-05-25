import './style.scss';

export default class Player {
    constructor(flv) {
        this.flv = flv;
        const { options } = flv;
        options.container.classList.add('flv-player-container');
        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('flv-player-canvas');
        this.canvas.width = options.width;
        this.canvas.height = options.height;
        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, options.width, options.height);
        options.container.appendChild(this.canvas);

        flv.on('scripMeta', ({ amf2 }) => {
            const { width, height } = amf2.metaData;
            flv.debug.error(width && height, '[amf2]: Missing length or height');
            this.canvas.width = width;
            this.canvas.height = height;
            this.context = this.canvas.getContext('2d');
            this.context.fillStyle = '#000';
            this.context.fillRect(0, 0, width, height);
        });

        this.videoFrames = [];
        flv.on('videoFrame', videoFrame => {
            this.videoFrames.push(videoFrame);
        });
    }
}
