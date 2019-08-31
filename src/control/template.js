import icons from './icons';
import { setStyle } from '../utils';

export default function template(flv, control) {
    const { options } = flv;

    setStyle(flv.player.$container, {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
    });

    setStyle(flv.player.$player, {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    });

    setStyle(flv.player.$canvas, {
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
    });

    flv.player.$player.classList.add('flvplayer-controls-show');
    if (options.live) {
        flv.player.$player.classList.add('flvplayer-live');
    }

    flv.player.$player.insertAdjacentHTML(
        'beforeend',
        `
        ${options.poster ? `<div class="flvplayer-poster" style="background-image: url(${options.poster})"></div>` : ''}
            <div class="flvplayer-loading">${icons.loading}</div>
            <div class="flvplayer-controls flv-player-controls-show ${options.live ? 'flv-player-live' : ''}">
                ${
                    !options.live
                        ? `
                    <div class="flvplayer-controls-progress">
                        <div class="flvplayer-loaded"></div>
                        <div class="flvplayer-played">
                            <div class="flvplayer-indicator"></div>
                        </div>
                    </div>
                `
                        : ''
                }
                <div class="flvplayer-controls-bottom">
                    <div class="flvplayer-controls-left">
                        <div class="flvplayer-controls-item flvplayer-state">
                            <div class="flvplayer-play">${icons.play}</div>
                            <div class="flvplayer-pause">${icons.pause}</div>
                        </div>
                        ${
                            options.hasAudio
                                ? `
                            <div class="flvplayer-controls-item flvplayer-volume">
                                <div class="flvplayer-volume-on">${icons.volume}</div>
                                <div class="flvplayer-volume-off">${icons.volumeClose}</div>
                                ${
                                    flv.isMobile
                                        ? ''
                                        : `
                                    <div class="flvplayer-volume-panel">
                                        <div class="flvplayer-volume-panel-handle"></div>
                                    </div>
                                `
                                }
                            </div>
                        `
                                : ''
                        }
                        ${
                            !options.live
                                ? `
                            <div class="flvplayer-controls-item flvplayer-time">
                                <span class="flvplayer-current">00:00</span> / <span class="flvplayer-duration">00:00</span>
                            </div>
                        `
                                : ''
                        }
                    </div>
                    <div class="flvplayer-controls-right">
                        <div class="flvplayer-controls-item flvplayer-fullscreen">${icons.fullscreen}</div>
                    </div>
                </div>
            </div>
        `,
    );

    Object.defineProperty(control, '$poster', {
        value: options.container.querySelector('.flvplayer-poster'),
    });

    Object.defineProperty(control, '$loading', {
        value: options.container.querySelector('.flvplayer-loading'),
    });

    Object.defineProperty(control, '$controls', {
        value: options.container.querySelector('.flvplayer-controls'),
    });

    Object.defineProperty(control, '$state', {
        value: options.container.querySelector('.flvplayer-state'),
    });

    Object.defineProperty(control, '$play', {
        value: options.container.querySelector('.flvplayer-play'),
    });

    Object.defineProperty(control, '$pause', {
        value: options.container.querySelector('.flvplayer-pause'),
    });

    Object.defineProperty(control, '$current', {
        value: options.container.querySelector('.flvplayer-current'),
    });

    Object.defineProperty(control, '$duration', {
        value: options.container.querySelector('.flvplayer-duration'),
    });

    Object.defineProperty(control, '$volumeOn', {
        value: options.container.querySelector('.flvplayer-volume-on'),
    });

    Object.defineProperty(control, '$volumeOff', {
        value: options.container.querySelector('.flvplayer-volume-off'),
    });

    Object.defineProperty(control, '$volumePanel', {
        value: options.container.querySelector('.flvplayer-volume-panel'),
    });

    Object.defineProperty(control, '$volumeHandle', {
        value: options.container.querySelector('.flvplayer-volume-panel-handle'),
    });

    Object.defineProperty(control, '$fullscreen', {
        value: options.container.querySelector('.flvplayer-fullscreen'),
    });

    Object.defineProperty(control, '$progress', {
        value: options.container.querySelector('.flvplayer-controls-progress'),
    });

    Object.defineProperty(control, '$loaded', {
        value: options.container.querySelector('.flvplayer-loaded'),
    });

    Object.defineProperty(control, '$played', {
        value: options.container.querySelector('.flvplayer-played'),
    });

    Object.defineProperty(control, '$indicator', {
        value: options.container.querySelector('.flvplayer-indicator'),
    });
}
