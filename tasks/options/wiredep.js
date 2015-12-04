/**
 * Injector for bower dependencies.
 */
'use strict';

var config = require('../config');

module.exports = {
  app: {
    src: config.paths.app('index.html'),
    ignorePath: '../bower_components',
    devDependencies: true,
    overrides: {
      'angular-restmod': {
        main: [
          './dist/angular-restmod-bundle.js',
          './dist/plugins/nested-dirty.js'
        ]
      },
      // we don't want glyphicons from bootstrap, we manually compile the less
      bootstrap: {
        main: [
          './dist/js/bootstrap.js'
        ]
      },
      // don't use anything from font-awesome, we manually compile these
      'font-awesome': {
        main: []
      },
      jcrop: {
        main: [
          './js/jquery.Jcrop.js',
          './css/jquery.Jcrop.css'
        ]
      },
      'onion-editor': {
        main: [
          './build/editor-main.css',
          './build/onion-editor.js'
        ]
      }
    }
  }
};
