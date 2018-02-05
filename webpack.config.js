/* global __dirname, require, module*/

const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: './src/vanillaCalendar.js',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'vanillaCalendar.js',
        libraryTarget: 'umd',
        library: 'VanillaCalendar'
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
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                   loader: 'babel-loader',
                   options: { presets: ['es2015'] }
                }
             }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{ from: 'src' }]),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            inject: 'head',
            template: 'index.html'
        })
    ]
};