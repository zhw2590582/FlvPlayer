import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import nodeResolve from 'rollup-plugin-node-resolve';
import { eslint } from 'rollup-plugin-eslint';
import replace from 'rollup-plugin-replace';
import { string } from 'rollup-plugin-string';
import { uglify } from 'rollup-plugin-uglify';
import workerInline from 'rollup-plugin-worker-inline';
import { version, homepage } from './package.json';

const isProd = process.env.NODE_ENV === 'production';

const baseConfig = {
    output: {
        format: 'umd',
        sourcemap: !isProd,
    },
    plugins: [
        eslint({
            exclude: ['node_modules/**', 'src/decoder/video', 'src/control/style.scss', 'src/control/icons/*.svg'],
        }),
        string({
            include: ['src/decoder/video/**/*.worker', 'src/control/icons/*.svg'],
        }),
        nodeResolve(),
        commonjs(),
        workerInline(),
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**',
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false,
                    },
                ],
            ],
            plugins: ['@babel/plugin-external-helpers', '@babel/plugin-transform-runtime'],
        }),
        replace({
            exclude: 'node_modules/**',
            __ENV__: JSON.stringify(process.env.NODE_ENV || 'development'),
            __VERSION__: version,
        }),
        isProd &&
            uglify({
                output: {
                    preamble:
                        '/*!\n' +
                        ` * FlvPlayer.js v${version}\n` +
                        ` * Github: ${homepage}\n` +
                        ` * (c) 2017-${new Date().getFullYear()} Harvey Zack\n` +
                        ' * Released under the MIT License.\n' +
                        ' */\n',
                },
            }),
    ],
};

export default [
    {
        input: 'src/index.js',
        output: {
            name: 'FlvPlayer',
            file: isProd ? 'dist/flvplayer.js' : 'docs/uncompiled/flvplayer.js',
        },
        plugins: [],
    },
    {
        input: 'src/decoder/video/multiple/index.js',
        output: {
            name: 'FlvplayerDecoder',
            file: isProd ? 'dist/flvplayer-decoder-multiple.js' : 'docs/uncompiled/flvplayer-decoder-multiple.js',
        },
        plugins: [],
    },
    {
        input: 'src/decoder/video/baseline/index.js',
        output: {
            name: 'FlvplayerDecoder',
            file: isProd ? 'dist/flvplayer-decoder-baseline.js' : 'docs/uncompiled/flvplayer-decoder-baseline.js',
        },
        plugins: [],
    },
    {
        input: 'src/control/index.js',
        output: {
            name: 'FlvplayerControl',
            file: isProd ? 'dist/flvplayer-control.js' : 'docs/uncompiled/flvplayer-control.js',
        },
        plugins: [
            postcss({
                plugins: [
                    autoprefixer(),
                    cssnano({
                        preset: 'default',
                    }),
                ],
                sourceMap: !isProd,
                extract: isProd ? 'dist/flvplayer-control.css' : 'docs/uncompiled/flvplayer-control.css',
            }),
        ],
    },
].map(config => {
    return {
        input: config.input,
        output: {
            ...baseConfig.output,
            ...config.output,
        },
        plugins: [...baseConfig.plugins, ...config.plugins],
    };
});
