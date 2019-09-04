var $flvplayer = document.querySelector('.flvplayer-app');
$flvplayer.innerHTML = `
Click to upload a flv video.
<input type="file" id="file" style="position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; right: 0px; bottom: 0px; opacity: 0;">
`;

document.getElementById('file').addEventListener('change', function(event) {
    var file = event.target.files[0];
    if (file) {
        var flv = new FlvPlayer({
            container: '.flvplayer-app',
            url: file,
            decoder: './uncompiled/flvplayer-decoder-baseline.js',
            // decoder: './uncompiled/flvplayer-decoder-multiple.js',
            debug: true,
            live: false,
            loop: true,
            hotkey: true,
            autoPlay: true,
            hasAudio: true,
            control: true,
            volume: 0.7,
            width: 640,
            height: 360,
        });
    }
});
