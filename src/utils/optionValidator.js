import { errorHandle } from './index';

export default function(flv) {
    const { canvas, url } = flv.options;

    errorHandle(canvas instanceof HTMLCanvasElement, 'The \'canvas\' option is not a \'HTMLCanvasElement\'');

    errorHandle(
        flv.constructor.instances.every(item => item.options.canvas !== canvas),
        'Cannot mount multiple instances on the same canvas element, please destroy the instance first',
    );

    errorHandle(typeof url === 'string' || url instanceof File, 'The \'url\' option is not a string or file');
}
