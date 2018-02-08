/* global __dirname, require, module*/

const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/vanillaCalendar.js',
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'vanillaCalendar.js',
        libraryTarget: 'umd',
        library: 'VanillaCalendar'
    },
    devServer: {
        contentBase: './docs'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader'
                },
                enforce: 'pre'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{ from: 'src' }]),
        new HtmlWebpackPlugin({
            inject: 'head',
            template: './src/index.html'
        })
    ]
};