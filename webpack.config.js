const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    devtool: 'cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.mjs']
    },
    module: {
        rules: [
            { 
                test: /\.(js)$/, 
                exclude: /node_modules/,
                use: 'babel-loader' 
            },
            { 
                test: /\.css$/, 
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.m?js/,
                resolve: {
                  fullySpecified: false
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    mode: 'development',
    plugins: [

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [{
               from: "./src/manifest.json",
               to:   "./manifest.json"
            }]
        }),
        new MiniCssExtractPlugin()
    ]
}