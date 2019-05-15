import BroadwayPlayer from '../broadway/Player';
import eventsMix from './events';
import methodsMix from './methods';
import propertysMix from './propertys';

export default class Player {
    constructor(flv) {
        const { element, width, height } = flv.options;

        this.broadwayPlayer = new BroadwayPlayer({
            useWorker: false,
            reuseMemory: true,
            webgl: true,
            size: {
                width,
                height,
            },
        });

        this.canvas = this.broadwayPlayer.canvas;
        element.appendChild(this.canvas);

        flv.on('videoTrack', videoTrack => {
            this.broadwayPlayer.decode(videoTrack);
        });

        propertysMix(flv, this);
        methodsMix(flv, this);
        eventsMix(flv, this);
    }
}
