import eventsMix from './events';
import methodsMix from './methods';
import propertysMix from './propertys';

export default class Player {
    constructor(flv) {
        propertysMix(flv, this);
        methodsMix(flv, this);
        eventsMix(flv, this);

        const { canvas, width, height } = flv.options;
        canvas.width = width;
        canvas.style.width = `${width}px`;
        canvas.height = height;
        canvas.style.height = `${height}px`;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
    }
}
