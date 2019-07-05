import YUVBuffer from 'yuv-buffer';
import YUVCanvas from 'yuv-canvas';

export default class Renderer {
    constructor(canvas) {
        this.yuv = YUVCanvas.attach(canvas, { webGL: false });
        this.format = null;
    }

    drawFrame(data) {
        if (!this.format) {
            const { width, height } = data;
            this.format = YUVBuffer.format({
                width,
                height,
                chromaWidth: width / 2,
                chromaHeight: height / 2,
            });
        }
        let y = YUVBuffer.lumaPlane(this.format, new Uint8Array(data.YData));
        let u = YUVBuffer.chromaPlane(this.format, new Uint8Array(data.UData));
        let v = YUVBuffer.chromaPlane(this.format, new Uint8Array(data.VData));
        let frame = YUVBuffer.frame(this.format, y, u, v);
        this.yuv.drawFrame(frame);
    }
}
