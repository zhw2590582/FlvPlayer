## 使用阿里云 ECS 搭建 NodeJs 直播服务器

手头上只有 ECS，所以只讨论 ECS，其他服务器类似

### 安装 node-media-server

```bash
mkdir nms
cd nms
npm init -y
npm install -S node-media-server
```

### 添加配置 app.js

```js
const NodeMediaServer = require('node-media-server');

const config = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60,
    },
    http: {
        port: 8000,
        allow_origin: '*',
    },
};

var nms = new NodeMediaServer(config);
nms.run();
```

### 运行 node-media-server

```bash
node app.js
```

### 推流

#### 电脑端推流

推流方式很多, 只要知道自己的推流地址即可, 推流时最好设置`Profile`为`Baseline`, 具体参考 [publishing-live-streams](https://github.com/illuspas/Node-Media-Server#publishing-live-streams)。

```js
rtmp://[服务器公网IP]/live/[流名字]
```

#### 手机端推流

和电脑端差不多，只是需要下载`APP`，我这里实验了一个叫`易推流`的正常工作。

### 安全组

最后就是添加两个安全组

| 名称     | 协议类型   | 端口范围  | 授权对象  |
| -------- | ---------- | --------- | --------- |
| rtmp     | 自定义 TCP | 1935/1935 | 0.0.0.0/0 |
| http-flv | 自定义 TCP | 8000/8000 | 0.0.0.0/0 |

### 使用 FlvPlayer.js 直播

假如长时间直播没有画面，就需要换一个解码器试试

```js
var flv = new FlvPlayer({
    container: '.flvplayer-app',
    url: 'http://[服务器公网IP]:8000/live/[流名字].flv',
    decoder: './uncompiled/flvplayer-decoder-baseline.js',
    // decoder: './uncompiled/flvplayer-decoder-multiple.js',
    debug: true,
    live: true,
    autoPlay: true,
    hasAudio: false,
    width: 1280,
    height: 720,
});
```
