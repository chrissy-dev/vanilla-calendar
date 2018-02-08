/* global __dirname, require, module*/

const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: './src/vanillaCalendar.js',
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
        new CopyWebpackPlugin([{
            from: 'src',
            ignore: ['index.html']
        }]),
        new CleanWebpackPlugin(['dist'])
    ]
};