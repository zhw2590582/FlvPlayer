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
        options.container.appendChild(this.canvas);
    }
}
