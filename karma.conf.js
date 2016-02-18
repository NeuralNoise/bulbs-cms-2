// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  'use strict';

  // sauce labs custom launchers (https://saucelabs.com/platforms)
  var customLaunchers = {
    'SL_Chrome': {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: '38'
    },
    'SL_Firefox': {
      base: 'SauceLabs',
      browserName: 'firefox'
    },
    // 'SL_Safari': {
    //   base: 'SauceLabs',
    //   browserName: 'safari',
    //   platform: 'OS X 10.9',
    //   version: '7'
    // }
  };

  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/lodash/lodash.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/jcrop/js/jquery.Jcrop.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/firebase/firebase-debug.js',
      'bower_components/firebase-token-generator/build/firebase-token-generator.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-cookie/angular-cookie.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-uuid4/angular-uuid4.js',
      'bower_components/angularfire/dist/angularfire.js',
      'bower_components/restangular/dist/restangular.js',
      'bower_components/moment/moment.js',
      'bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js',
      'bower_components/urlify/urlify.js',
      'bower_components/onion-editor/build/onion-editor.min.js',
      'bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
      'bower_components/Keypress/keypress.js',
      'bower_components/zeroclipboard/dist/ZeroClipboard.min.js',
      'bower_components/ng-clip/dest/ng-clip.min.js',
      'bower_components/bulbs-autocomplete/dist/bulbs-autocomplete.js',
      'bower_components/angular-ui-sortable/sortable.js',
      'bower_components/angular-restmod/dist/angular-restmod-bundle.js',
      'bower_components/angular-restmod/dist/plugins/nested-dirty.js',
      'bower_components/videohub-client-js/dist/videohub-client.js',
      'bower_components/restmod-style-drf-paged/restmod-style-drf-paged.js',
      'bower_components/videohub-client-js/src/videohub-client/videohub-api-mocks.js',
      'bower_components/cms-components/dist/cms-components.js',

      'app/mocks/api.js',
      'app/mocks/api-mock-data.js',
      'app/mocks/api/api-campaign.js',
      'app/mocks/api/api-custom-search.js',
      'app/mocks/api/api-line-item.js',
      'app/mocks/api/api-override.js',
      'app/mocks/api/api-role.js',
      'app/mocks/api/api-sections.js',
      'app/mocks/api/api-special-coverage.js',
      'app/mocks/betty.js',
      'app/mocks/firebaseapi.js',

      'app/shared/**/*.js',
      'app/components/**/*.js',

      'app/scripts/*.js',

      'app/scripts/api/module.js',
      'app/scripts/api/*.js',

      'app/scripts/**/*.js',
      'test/spec/**/*.js',

      'app/scripts/api/*.js',

      'test/config.js',

      'app/views/**/*.html',
      'app/components/**/*.html',
      'app/shared/**/*.html'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    preprocessors: {
      'app/components/**/*.html': 'ng-html2js',
      'app/shared/**/*.html': 'ng-html2js',
      'app/views/**/*.html': 'ng-html2js'
    },

    // set up reporters
    reporters: ['progress', 'coverage'],

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'app',

      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('foo')
      moduleName: 'cms.templates'
    },

    // set up lcov coverage reporter
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },

  });

  if (process.env.TRAVIS) {

    // we're using Travis CI to do karma, configure as such
    var buildLabel = 'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')';

    // set up saucelabs stuff
    config.captureTimeout = 0; // rely on SL timeout
    config.singleRun = true;
    config.autoWatch = false;
    config.sauceLabs = {
      build: buildLabel,
      startConnect: false,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
    };

    config.customLaunchers = customLaunchers;
    config.browsers = Object.keys(customLaunchers);
    config.singleRun = true;
    config.reporters.push('saucelabs');

  } else {
    // this is local, just use Chrome
    config.singleRun = false;
    config.autoWatch = true;
    config.browsers = ['Chrome'];
  }

};
