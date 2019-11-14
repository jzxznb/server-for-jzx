const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.common');

const webpackConfig = merge(baseWebpackConfig, {
    entry: {
        app: path.resolve(__dirname, './entry-server.js')
    },
    output: {
        path: path.resolve(__dirname, '../ssrDist/server'),
        filename: 'serverEntry.js',
        libraryTarget: 'commonjs2'
    },
    target: 'node'
});

module.exports = webpackConfig;
