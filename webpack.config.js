/* global __dirname, require, module*/

const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const resolve = (dir) => path.join(__dirname, '..', dir)

module.exports = {
    entry: './src/vanillaCalendar.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'vanillaCalendar.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                include: [resolve('src')],
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015'] }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src' }
        ])
    ]
};