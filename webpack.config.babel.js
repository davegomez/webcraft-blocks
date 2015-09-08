const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const target = process.env.npm_lifecycle_event;
const rootPath = path.resolve(__dirname);

const common = {
  entry: path.resolve(rootPath, 'main.js'),
  output: {
    path: path.resolve(rootPath, 'bin'),
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss?$/,
        loader: ExtractTextPlugin.extract("style-loader",
          "css-loader?sourceMap" +
          "!autoprefixer-loader?browsers=last 2 version" +
          "!sass-loader?outputStyle=expanded&sourceMap&sourceMapContents")
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("bin/main.css", {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'Webcraft Blocks'
    })
  ]
};

if (target === 'start' || !target) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    module: {
      loaders: [
        {
          test: /\.js?/,
          loaders: ['babel'],
          include: path.resolve(rootPath, 'bin')
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
