/* eslint indent: 0 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const LIB = path.resolve(__dirname, 'lib');
const BIN = path.resolve(__dirname, 'bin');

const common = {
  entry: LIB,
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: BIN,
    filename: 'bundle.js'
  }
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    module: {
      preLoaders: [
        { test: /\.js?$/, loaders: 'eslint', include: LIB },
        { test: /\.js?$/, loaders: 'jscs-loader', include: LIB }
      ],
      loaders: [
        {
          test: /\.js?/,
          loaders: ['babel'],
          include: LIB
        },
        {
          test: /\.scss?$/,
          loader: ExtractTextPlugin.extract('style-loader',
            'css-loader?sourceMap' +
            '!autoprefixer-loader?browsers=last 2 version' +
            '!sass-loader?outputStyle=expanded&sourceMap&sourceMapContents')
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      port: 3000
    },
    plugins: [
      new OpenBrowserPlugin({ url: 'http://localhost:3000/webpack-dev-server/' }),
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin('bin/css/main.css', {
        allChunks: true
      }),
      new HtmlWebpackPlugin({
        title: 'Webcraft'
      })
    ]
  });
}
