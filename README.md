# FlvPlayer

[![Build Status](https://www.travis-ci.org/zhw2590582/FlvPlayer.svg?branch=master)](https://www.travis-ci.org/zhw2590582/FlvPlayer)
![version](https://badgen.net/npm/v/flvplayer)
![license](https://badgen.net/npm/license/flvplayer)
![size](https://badgen.net/bundlephobia/minzip/flvplayer)
[![npm Downloads](https://img.shields.io/npm/dt/flvplayer.svg)](https://www.npmjs.com/package/flvplayer)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![dependencies Status](https://david-dm.org/zhw2590582/flvplayer/status.svg)](https://david-dm.org/zhw2590582/flvplayer)

> FlvPlayer.js is a JavaScript player for decode flv to the canvas

## Demo

[Checkout the demo](https://flvplayer.js.org/) from Github Pages

## Install player

Install with `npm`

```bash
$ npm install flvplayer
```

Or install with `yarn`

```bash
$ yarn add flvplayer
```

```js
import FlvPlayer from 'flvplayer';
```

Or umd builds are also available

```html
<script src="path/to/flvplayer.js"></script>
```

Will expose the global variable to `window.FlvPlayer`.

## Install control(optional)

You should load the control before load the player.

```js
import 'path/to/flvplayer-control.css';
import 'path/to/flvplayer-control.js';
```

Or umd builds are also available

```html
<link rel="stylesheet" href="path/to/flvplayer-control.css" />
<script src="path/to/flvplayer-control.js"></script>
```

Will expose the global variable to `window.FlvplayerControl`.

## Usage

```html
<div class="flvplayer-app"></div>
```

```js
var flv = new FlvPlayer({
    // Accept http url, websocket url, and file type
    url: '',

    // Accept dom element, dom selector
    container: '',

    // Whether to print debug information
    debug: false,

    // Whether live mode
    live: false,

    // Whether the video loops, in non-live mode
    loop: false,

    // Whether to use hotkeys, if the control exists
    hotkey: true,

    // Whether to turn off the volume
    muted: false,

    // Whether to play automatically
    autoPlay: false,

    // Whether it contains an audio stream
    hasAudio: true,

    // Whether to cache the video frame to play
    cache: true,

    // Maximum time difference between audio and video, unit is ms
    // used to automatically adjust audio and video synchronization
    maxTimeDiff: 200,

    // Whether to display the control, if the control exists
    control: true,

    // Volume from 0 to 10
    volume: 7,

    // Initialize the frame rate, which will be covered by the actual frame rate of the file
    frameRate: 30,

    // Maximum limit for cached data in live mode, unit is byte, the default is 64M
    freeMemory: 64 * 1024 * 1024,

    // Initialize the width, which will be covered by the actual width of the file
    width: 400,

    // Initialize the height, which will be covered by the actual height of the file
    height: 300,

    // Initialize http headers
    headers: {},

    // The path of the video decoder, currently optional flvplayer-decoder-baseline.js and flvplayer-decoder-multiple.js
    decoder: 'flvplayer-decoder-baseline.js',
});
```

## Question

Q: What is the difference between `flvplayer-decoder-baseline.js` and `flvplayer-decoder-multiple.js`.

-   `flvplayer-decoder-baseline.js` only supports flv in this `Baseline` profile, only 200k size.
-   `flvplayer-decoder-multiple.js` supports flv in this `Baseline`、`Main`、`Extended` and `High` profile, but have 2M size.

## API

### Instance methods and properties

Play video:

```js
flv.play();
```

Pause video:

```js
flv.pause();
```

Switch whether to play:

```js
flv.toggle();
```

Destroy instance:

```js
flv.destroy();
```

Whether it is playing:

```js
flv.playing;
```

Is the stream being pulled:

```js
flv.streaming;
```

Get the current time of the video:

```js
flv.currentTime;
```

Get the duration of the video:

```js
flv.duration;
```

Get the loaded of the video:

```js
flv.loaded;
```

Whether it is focus:

```js
flv.isFocus;
```

Set whether to turn off the volume:

```js
flv.muted;
```

Set the volume:

```js
flv.volume;
```

Get canvas elements:

```js
flv.$canvas;
```

### Instance event

| Name          | Description                   |
| ------------- | ----------------------------- |
| `destroy`     | When destroying an instance   |
| `streamStart` | Start pulling the stream      |
| `streaming`   | When pulling stream           |
| `streamEnd`   | At the end of the pull stream |
| `demuxDone`   | Demux completed               |
| `resize`      | When container resize         |
| `play`        | When video play               |
| `timeupdate`  | When video timeupdate         |
| `waiting`     | When video waiting            |
| `ended`       | When video ended              |
| `loop`        | When video loop               |
| `pause`       | When video pause              |
| `seeked`      | When video seeked             |
| `ready`       | When video ready              |
| `streamRate`  | Stream Rate                   |
| `demuxRate`   | Demux Rate                    |
| `decoderRate` | Decoder Rate                  |
| `drawRate`    | Draw Rate                     |

Example:

```js
flv.on('play', function() {
    console.log('Video is play!');
});
```

### Class methods and properties

Get all instances:

```js
FlvPlayer.instances;
```

## Contribution

Installation dependency

```bash
$ npm install
```

Run the developer mode

```bash
$ npm run dev
```

Open web server

```bash
$ npm start
```

## QQ Group

![QQ Group](./QQgroup.png)

## License

MIT © [Harvey Zack](https://sleepy.im/)
