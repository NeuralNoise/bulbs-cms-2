/**
 * Utility for opening and reading a JSON file with a "version" key.
 */

'use strict';

var fs = require('fs');


var Versioner = function () {};

/**
 * Log an error to console and exit the process with error code 1.
 *
 * @param {...} arguments to pass to console.error.
 */
Versioner.prototype.exitWithError = function () {
  console.error(arguments);
  process.exit(1);
};

/**
 * Read the version from a given JSON file, operate on it with a callback.
 *
 * @param {string} jsonFile - JSON file to read version from.
 * @param {function} callback - callback to verison reading that takes as its
 *  arguments (version, parsed file json).
 */
Versioner.prototype.getVersion = function (jsonFile, callback) {
  var self = this;

  fs.readFile(jsonFile, function(error, data) {
    if (error) {
      self.exitWithError(error);
    }

    var json = JSON.parse(data);
    var versionString = json.version;
    if (typeof(versionString) === 'undefined') {
      self.exitWithError('No version string found in "%s"!', jsonFile);
    }

    var versionSplit = versionString.split('.');
    var version = {
      major: Number(versionSplit[0]),
      minor: Number(versionSplit[1]),
      fix: Number(versionSplit[2])
    };
    if (isNaN(version.major) || isNaN(version.minor) || isNaN(version.fix)) {
      self.exitWithError('Invalid version string "%s" in "%s"!', versionString);
    }

    callback(version, json);
  });
};

module.exports = Versioner;
