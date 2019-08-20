var url = 'https://zhw2590582.github.io/assets-cdn';
var flv = new FlvPlayer({
    container: '.flvplayer-app',
    url: url + '/video/weathering-with-you-H264(Baseline@L52)-AAC.flv',
    poster: url + '/image/weathering-with-you-poster.jpg',
    decoder: './uncompiled/flvplayer-decoder-baseline.js',
    // decoder: './uncompiled/flvplayer-decoder-multiple.js',
    debug: true,
    live: false,
    loop: true,
    hotkey: true,
    autoPlay: true,
    hasAudio: true,
    volume: 7,
    width: 640,
    height: 360,
});
