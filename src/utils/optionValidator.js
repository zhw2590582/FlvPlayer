import { errorHandle } from './index';

export default function(flv) {
    const { element, url } = flv.options;

    errorHandle(element instanceof HTMLDivElement, 'The \'element\' option is not a \'HTMLDivElement\'');

    errorHandle(
        flv.constructor.instances.every(item => item.options.element !== element),
        'Cannot mount multiple instances on the same div element, please destroy the instance first',
    );

    errorHandle(typeof url === 'string' || url instanceof File, 'The \'url\' option is not a string or file');
}
