const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './flutter.js', // 入口文件
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // 你的 index.html 文件路径
            // inlineSource: '.(js|css)$', // 内联所有 JavaScript 和 CSS 文件
            inject: 'body'
        }),
        new HtmlInlineScriptPlugin({
            scriptMatchPattern: [/bundle.js$/], // 内联 bundle.js
        }),
        new webpack.ContextReplacementPlugin(/./, data => {
            // 修复动态依赖警告
            delete data.dependencies[0].critical;
            return data;
        })
    ],
    devtool: false,
};
