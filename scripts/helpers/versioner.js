/**
 * Utility for opening and reading a JSON file with a "version" key.
 */

'use strict';

var fs = require('fs');
var ConsoleHelper = require('console-helper');


module.exports = {
  /**
   * Read the version from a given JSON file, operate on it with a callback.
   *
   * @param {string} jsonFile - JSON file to read version from.
   * @param {function} callback - callback to verison reading that takes as its
   *  arguments (version, parsed file json).
   */
  getVersion: function (jsonFile, callback) {
    fs.readFile(jsonFile, function(error, data) {
      if (error) {
        ConsoleHelper.exitWithError(error);
      }

      var json = JSON.parse(data);
      var versionString = json.version;
      if (typeof(versionString) === 'undefined') {
        ConsoleHelper.exitWithError('No version string found in "%s"!', jsonFile);
      }

      var versionSplit = versionString.split('.');
      var version = {
        major: Number(versionSplit[0]),
        minor: Number(versionSplit[1]),
        patch: Number(versionSplit[2])
      };
      if (isNaN(version.major) || isNaN(version.minor) || isNaN(version.patch)) {
        ConsoleHelper.exitWithError('Invalid version string "%s" in "%s"!', versionString);
      }

      callback(version, json);
    });
  }
};
