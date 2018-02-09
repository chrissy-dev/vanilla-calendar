/* global __dirname, require, module*/

const path = require('path')

module.exports = {
    entry: './src/vanillaCalendar.js',
    output: {
        path: path.resolve(__dirname, 'docs'),
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
    plugins: [],
    devServer: {
        contentBase: path.resolve(__dirname, 'docs')
    }
};