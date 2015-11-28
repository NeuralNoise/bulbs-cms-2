/**
 * Deletes given files and folders.
 */
'use strict';

var config = require('../config');

module.exports = {
  dist: {
    files: [{
      dot: true,
      src: [
        config.paths.tmp(),
        config.paths.dist('*'),
        '!' + config.paths.dist('.git*'),
        '!' + config.paths.dist('README.md'),
        '!' + config.paths.dist('bower.json'),
        '!' + config.paths.dist('package.json')
      ]
    }]
  },
  server: config.paths.tmp()
};
