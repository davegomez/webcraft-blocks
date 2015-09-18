var webpack = require('karma-webpack');

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'lib/tests/**/*.spec.js'
    ],
    plugins: [webpack, 'karma-mocha', 'karma-phantomjs-launcher', 'karma-coverage', 'karma-spec-reporter'],
    browsers: [ 'PhantomJS' ],
    preprocessors: {
      'lib/tests/**/*.spec.js': ['webpack'],
      'lib/src/**/*.js': ['webpack']
    },
    reporters: [ 'spec', 'coverage' ],
    coverageReporter: {
      dir: 'build/reports/coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
      ]
    },
    webpack: {
      module: {
        loaders: [
          {
            test: /\.js$/, exclude: /(bower_components|node_modules)/,
            loader: 'babel-loader'
          },
          {
            test: /sinon.*\.js$/,
            loader: "imports?define=>false"
          }
        ],
        postLoaders: [{
          test: /\.js$/, exclude: /(node_modules|bower_components|tests)/,
          loader: 'istanbul-instrumenter'
        }]
      }
    },
    webpackMiddleware: { noInfo: true }
  });
};
