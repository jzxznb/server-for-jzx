const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.common');

const webpackConfig = merge(baseWebpackConfig, {
    entry: {
        app: path.resolve(__dirname, './entry-client.js')
    },
    output: {
        path: path.resolve(__dirname, '../ssrDist/client'),
        filename: '[name].[chunkhash].js',
        publicPath: '/' // 打包后输出路径以/dist/开头
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'ssrTemplate.html',
            template: path.resolve(__dirname, './ssrTemplate.html')
        })
    ]
});

module.exports = webpackConfig;
