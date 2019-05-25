import { errorHandle } from './index';

export default function(flv) {
    const { container, url } = flv.options;

    errorHandle(container instanceof HTMLDivElement, 'The \'container\' option is not a \'HTMLDivElement\'');

    errorHandle(
        flv.constructor.instances.every(item => item.options.container !== container),
        'Cannot mount multiple instances on the same div element, please destroy the instance first',
    );

    errorHandle(typeof url === 'string' || url instanceof File, 'The \'url\' option is not a string or file');
}
