var url = 'https://zhw2590582.github.io/assets-cdn';
var flv = new FlvPlayer({
    url: './weathering-with-you-H264(Baseline@L52)-AAC.flv',
    poster: url + '/image/weathering-with-you-poster.jpg',
    container: '.flvplayer-app',
    debug: true,
    live: false,
    loop: true,
    hotkey: true,
    controls: true,
    hasAudio: true,
    volume: 7,
    width: 640,
    height: 360,
});
