'use strict';

var vertexYUVShader = [
    '#version 300 es',
    'layout(location = 0) in vec4 vertexPos;',
    'layout(location = 1) in vec2 texturePos;',
    'out vec2 textureCoord;',
    'void main()',
    '{',
    'gl_Position = vertexPos;',
    'textureCoord = texturePos;',
    '}',
].join('\n');

var fragmentYUVShader = [
    '#version 300 es',
    'precision highp float;',
    'in vec2 textureCoord;',
    'out vec4 fragColor;',
    'uniform sampler2D ySampler;',
    'uniform sampler2D uSampler;',
    'uniform sampler2D vSampler;',
    'const mat4 YUV2RGB = mat4',
    '(',
    '1.1643828125, 0, 1.59602734375, -.87078515625,',
    '1.1643828125, -.39176171875, -.81296875, .52959375,',
    '1.1643828125, 2.017234375, 0, -1.081390625,',
    '0, 0, 0, 1',
    ');',
    'void main(void) {',
    'float y = texture(ySampler,  textureCoord).r;',
    'float u = texture(uSampler,  textureCoord).r;',
    'float v = texture(vSampler,  textureCoord).r;',
    'fragColor = vec4(y, u, v, 1) * YUV2RGB;',
    '}',
].join('\n');

export default function SuperRender2(canvas) {
    this.canvasElement = canvas;
    this.initContextGL();
    if (this.contextGL) {
        this.YUVProgram = this.initProgram(vertexYUVShader, fragmentYUVShader);
        this.initBuffers();
        this.initTextures();
    }
}

SuperRender2.prototype.initContextGL = function() {
    var e = this.canvasElement;
    var r = null;
    try {
        r = e.getContext('webgl2');
    } catch (e) {
        r = null;
    }
    if (!r || typeof r.getParameter !== 'function') {
        r = null;
    }
    this.contextGL = r;
    if (null == r) {
        console.error('WebGL2.0 init failed!');
    }
};

SuperRender2.prototype.initProgram = function(e, r) {
    var t = this.contextGL;
    var a = t.createShader(t.VERTEX_SHADER);
    t.shaderSource(a, e);
    t.compileShader(a);
    if (!t.getShaderParameter(a, t.COMPILE_STATUS)) {
        console.error('Vertex shader failed to compile: ' + t.getShaderInfoLog(a));
    }
    var i = t.createShader(t.FRAGMENT_SHADER);
    t.shaderSource(i, r);
    t.compileShader(i);
    if (!t.getShaderParameter(i, t.COMPILE_STATUS)) {
        console.error('Fragment shader failed to compile: ' + t.getShaderInfoLog(i));
    }
    var o = t.createProgram();
    t.attachShader(o, a);
    t.attachShader(o, i);
    t.linkProgram(o);
    if (!t.getProgramParameter(o, t.LINK_STATUS)) {
        console.error('Program failed to compile: ' + t.getProgramInfoLog(o));
    }
    t.deleteShader(a);
    t.deleteShader(i);
    return o;
};

SuperRender2.prototype.initBuffers = function() {
    var e = this.contextGL;
    var r = e.createBuffer();
    e.bindBuffer(e.ARRAY_BUFFER, r);
    e.bufferData(e.ARRAY_BUFFER, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]), e.STATIC_DRAW);
    e.bindBuffer(e.ARRAY_BUFFER, null);
    var t = e.createBuffer();
    e.bindBuffer(e.ARRAY_BUFFER, t);
    e.bufferData(e.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), e.DYNAMIC_DRAW);
    e.bindBuffer(e.ARRAY_BUFFER, null);
    this.vertexPosBuffer = r;
    this.texturePosBuffer = t;
};

SuperRender2.prototype.initTextures = function() {
    var e = this.contextGL;
    var r = this.YUVProgram;
    e.useProgram(r);
    var t = this.initTexture();
    var a = e.getUniformLocation(r, 'ySampler');
    e.uniform1i(a, 0);
    this.yTextureRef = t;
    var i = this.initTexture();
    var o = e.getUniformLocation(r, 'uSampler');
    e.uniform1i(o, 1);
    this.uTextureRef = i;
    var n = this.initTexture();
    var f = e.getUniformLocation(r, 'vSampler');
    e.uniform1i(f, 2);
    this.vTextureRef = n;
    e.useProgram(null);
};

SuperRender2.prototype.initTexture = function() {
    var e = this.contextGL;
    var r = e.createTexture();
    e.bindTexture(e.TEXTURE_2D, r);
    e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR);
    e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR);
    e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE);
    e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
    e.bindTexture(e.TEXTURE_2D, null);
    return r;
};

SuperRender2.prototype.SR_DisplayFrameData = function(width, height, Ydata, Udata, Vdata) {
    if (width <= 0 || height <= 0) {
        return;
    }
    var glCtx = this.contextGL;
    if (null == Ydata) {
        glCtx.clearColor(0, 0, 0, 0);
        glCtx.clear(glCtx.COLOR_BUFFER_BIT | glCtx.DEPTH_BUFFER_BIT);
        return;
    }

    glCtx.clearColor(0.8, 0.8, 1, 1);
    glCtx.clear(glCtx.COLOR_BUFFER_BIT | glCtx.DEPTH_BUFFER_BIT);
    glCtx.viewport(0, 0, this.canvasElement.width, this.canvasElement.height);

    glCtx.activeTexture(glCtx.TEXTURE0);
    glCtx.bindTexture(glCtx.TEXTURE_2D, this.yTextureRef);
    glCtx.texImage2D(
        glCtx.TEXTURE_2D,
        0,
        glCtx.LUMINANCE,
        width,
        height,
        0,
        glCtx.LUMINANCE,
        glCtx.UNSIGNED_BYTE,
        Ydata,
    );
    glCtx.activeTexture(glCtx.TEXTURE1);
    glCtx.bindTexture(glCtx.TEXTURE_2D, this.uTextureRef);
    glCtx.texImage2D(
        glCtx.TEXTURE_2D,
        0,
        glCtx.LUMINANCE,
        width / 2,
        height / 2,
        0,
        glCtx.LUMINANCE,
        glCtx.UNSIGNED_BYTE,
        Udata,
    );
    glCtx.activeTexture(glCtx.TEXTURE2);
    glCtx.bindTexture(glCtx.TEXTURE_2D, this.vTextureRef);
    glCtx.texImage2D(
        glCtx.TEXTURE_2D,
        0,
        glCtx.LUMINANCE,
        width / 2,
        height / 2,
        0,
        glCtx.LUMINANCE,
        glCtx.UNSIGNED_BYTE,
        Vdata,
    );

    var f = this.YUVProgram;
    glCtx.useProgram(f);
    var u = this.vertexPosBuffer;
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, u);
    var s = glCtx.getAttribLocation(f, 'vertexPos');
    glCtx.enableVertexAttribArray(s);
    glCtx.vertexAttribPointer(s, 2, glCtx.FLOAT, false, 0, 0);
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, null);
    var v = this.texturePosBuffer;
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, v);
    var l = glCtx.getAttribLocation(f, 'texturePos');
    glCtx.enableVertexAttribArray(l);
    glCtx.vertexAttribPointer(l, 2, glCtx.FLOAT, false, 0, 0);
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, null);
    glCtx.drawArrays(glCtx.TRIANGLE_STRIP, 0, 4);
    glCtx.disableVertexAttribArray(s);
    glCtx.disableVertexAttribArray(l);
    glCtx.useProgram(null);
};

SuperRender2.prototype.SR_Destroy = function() {
    var e = this.contextGL;
    var r = this.YUVProgram;
    e.deleteProgram(r);
    var a = this.vertexPosBuffer;
    var i = this.texturePosBuffer;
    e.deleteBuffer(a);
    e.deleteBuffer(i);
    var n = this.yTextureRef;
    var f = this.uTextureRef;
    var u = this.vTextureRef;
    e.deleteTexture(n);
    e.deleteTexture(f);
    e.deleteTexture(u);
};
