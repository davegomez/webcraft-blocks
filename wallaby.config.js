var babel = require('babel');
var wallabyWebpack = require('wallaby-webpack');

var webpackPostprocessor = wallabyWebpack({
  module: {
    loaders: [
      {
        test: /sinon.*\.js$/,
        loader: "imports?define=>false"
      }
    ]
  }
});

module.exports = function () {
  return {
    files: [
      { pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false },
      { pattern: 'node_modules/babel-core/browser-polyfill.js', instrument: false },
      { pattern: 'lib/src/**/*.js', load: false }
    ],

    tests: [
      { pattern: 'lib/tests/**/*.spec.js', load: false }
    ],

    preprocessors: {
      'lib/**/*.js': file => babel.transform(file.content, { sourceMap: true })
    },

    postprocessor: webpackPostprocessor,

    bootstrap: function () {
      window.__moduleBundler.loadTests();
    }
  };
};
