export default class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.img = this.context.createImageData(canvas.width, canvas.height);
        let rgba = this.img.data;
        for (let y = 0; y < this.img.height; y += 2) {
            const p0 = y * this.img.width;
            const p1 = p0 + this.img.width;
            for (let x = 0; x < this.img.width; x += 2) {
                rgba[(p0 + x) * 4 + 3] = 255;
                rgba[(p0 + x) * 4 + 7] = 255;
                rgba[(p1 + x) * 4 + 3] = 255;
                rgba[(p1 + x) * 4 + 7] = 255;
            }
        }
    }

    converter(frame) {
        let img = this.img;
        let rgba = img.data;
        for (let y = 0; y < img.height; y += 2) {
            const p0 = y * img.width;
            const p1 = p0 + img.width;
            const p4 = p0 / 4;
            for (let x = 0; x < img.width; x += 2) {
                const y0 = 1.164 * (frame.y[p0 + x] - 16);
                const y1 = 1.164 * (frame.y[p0 + x + 1] - 16);
                const y2 = 1.164 * (frame.y[p1 + x] - 16);
                const y3 = 1.164 * (frame.y[p1 + x + 1] - 16);
                const u = frame.u[p4 + x / 2];
                const v = frame.v[p4 + x / 2];
                const t0 = 1.596 * (v - 128);
                const t1 = -0.391 * (u - 128) - 0.813 * (v - 128);
                const t2 = 2.018 * (u - 128);
                const p2 = (p0 + x) * 4;
                const p3 = (p1 + x) * 4;
                rgba[p2] = y0 + t0;
                rgba[p2 + 1] = y0 + t1;
                rgba[p2 + 2] = y0 + t2;
                rgba[p2 + 4] = y1 + t0;
                rgba[p2 + 5] = y1 + t1;
                rgba[p2 + 6] = y1 + t2;
                rgba[p3] = y2 + t0;
                rgba[p3 + 1] = y2 + t1;
                rgba[p3 + 2] = y2 + t2;
                rgba[p3 + 4] = y3 + t0;
                rgba[p3 + 5] = y3 + t1;
                rgba[p3 + 6] = y3 + t2;
            }
        }

        return img;
    }
}
