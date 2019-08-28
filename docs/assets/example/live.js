var flv = new FlvPlayer({
    container: '.flvplayer-app',
    url: 'http://116.62.117.109:7001/demo/demo.flv',
    decoder: './uncompiled/flvplayer-decoder-baseline.js',
    debug: true,
    live: true,
    autoPlay: true,
    hasAudio: false,
    width: 960,
    height: 540,
});
