const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const { eslint } = require('rollup-plugin-eslint');
const replace = require('rollup-plugin-replace');
const { uglify } = require('rollup-plugin-uglify');
const { version, homepage } = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';
const banner =
    '/*!\n' +
    ` * flvPlayer.js v${version}\n` +
    ` * Github: ${homepage}\n` +
    ` * (c) 2017-${new Date().getFullYear()} Harvey Zack\n` +
    ' * Released under the MIT License.\n' +
    ' */\n';

module.exports = {
    input: 'src/index.js',
    output: {
        name: 'Flvplayer',
        file: isProd ? `dist/flvPlayer.js` : `docs/uncompiled-flvPlayer.js`,
        format: 'umd',
        sourcemap: !isProd,
    },
    plugins: [
        eslint({
            exclude: ['node_modules/**'],
        }),
        nodeResolve(),
        commonjs(),
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**',
            presets: [
                ['@babel/env', {
                    modules: false,
                }],
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
                preamble: banner,
            },
        }),
    ],
};
