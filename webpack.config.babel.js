/* eslint indent: 0 */
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const LIB = path.resolve(__dirname, 'lib/src');
const BIN = path.resolve(__dirname, 'bin');

const common = {
  entry: LIB,
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: BIN,
    filename: 'js/main.js'
  }
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    module: {
      preLoaders: [
        { test: /\.js?$/, loaders: ['eslint', 'jscs'], include: LIB }
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
    plugins: [
      new ExtractTextPlugin('bin/css/main.css', {
        allChunks: true
      }),
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['./bin'] },
        files: ['bin/*.html']
      })
    ]
  });
}
