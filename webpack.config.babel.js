/* eslint indent: 0 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const resolveRootPath = function resolveRootPath(newPath) {
  return path.resolve(__dirname, newPath);
};

const common = {
  entry: resolveRootPath('lib'),
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: resolveRootPath('bin'),
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        loaders: ['eslint', 'jscs'],
        include: resolveRootPath('lib')
      }
    ],
    loaders: [
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
    new HtmlWebpackPlugin({
      title: 'Webcraft'
    })
  ]
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    module: {
      loaders: [
        {
          test: /\.js?/,
          loaders: ['babel'],
          include: resolveRootPath('lib')
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
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
