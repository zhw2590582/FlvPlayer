export default function videoMix(flv, player) {
    Object.defineProperty(player, 'currentTime', {
        get: () => {
            return flv.decoder.playIndex / player.frameRate;
        },
        set: time => {
            if (time <= player.loaded) {
                flv.decoder.seeked(time);
            }
        },
    });

    Object.defineProperty(player, 'duration', {
        get: () => {
            try {
                return flv.demuxer.scripMeta.amf2.metaData.duration;
            } catch (error) {
                return flv.options.duration || 0;
            }
        },
    });

    Object.defineProperty(player, 'frameRate', {
        get: () => {
            try {
                return flv.demuxer.scripMeta.amf2.metaData.framerate;
            } catch (error) {
                return flv.options.frameRate || 30;
            }
        },
    });

    Object.defineProperty(player, 'frameDuration', {
        get: () => {
            return (1000 / player.frameRate) | 0;
        },
    });

    Object.defineProperty(player, 'volume', {
        get: () => {
            return true;
        },
        set: value => {
            return value;
        },
    });

    Object.defineProperty(player, 'loaded', {
        get: () => {
            return flv.decoder.video.loaded;
        },
    });

    Object.defineProperty(player, 'playing', {
        get: () => {
            return flv.decoder.playing;
        },
    });

    Object.defineProperty(player, 'play', {
        value: () => {
            if (!player.playing) {
                flv.decoder.play();
            }
        },
    });

    Object.defineProperty(player, 'pause', {
        value: () => {
            flv.decoder.pause();
        },
    });
}
