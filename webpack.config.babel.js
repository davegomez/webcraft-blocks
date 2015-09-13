const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const target = process.env.npm_lifecycle_event;
const rootPath = path.resolve(__dirname);
const jsFiles = [
        path.resolve(rootPath, 'lib/components'),
        path.resolve(rootPath, 'lib/transformers')
      ];

const common = {
  entry: path.resolve(rootPath, 'lib/main.js'),
  output: {
    path: path.resolve(rootPath, 'bin/js'),
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
      },
      {
        test: /\.js$/,
        loader: "eslint-loader",
        include: jsFiles
      },
      {
        test: /\.js$/,
        loader: "jscs-loader",
        include: jsFiles
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("bin/css/main.css", {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'Webcraft'
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
          include: path.resolve(rootPath, 'bin/js')
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
