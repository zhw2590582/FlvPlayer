// Create a local http-flv live stream
// https://github.com/zhw2590582/http-flv-streaming-demo

var flv = new FlvPlayer({
    container: '.flvplayer-app',
    url: 'http://localhost:7001/demo/demo.flv',
    decoder: './uncompiled/flvplayer-decoder-baseline.js',
    debug: true,
    live: true,
    autoPlay: true,
    hasAudio: true,
    width: 960,
    height: 540,
    freeMemory: 64 * 1024 * 1024,
});
