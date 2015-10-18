/**
 * Opens a JSON file provided as the first argument to this script, searches for
 *  "version" key in the root object, versions up that key based on the
 *  second argument to this script ('major', 'minor', 'fix'), then writes the
 *  JSON back to the file with the new version.
 */

'use strict';

var fs = require('fs');

var Versioner = require('./versioner.js');

var jsonFile = process.argv[2];     // a JSON file
var versionType = process.argv[3];  // 'major', 'minor', 'fix'


var versioner = new Versioner(jsonFile, function (version, json) {
  var newVersionSplit = [version.major, version.minor, version.fix];
  if (versionType === 'major') {
    newVersionSplit[0]++;
  } else if (versionType === 'minor') {
    newVersionSplit[1]++;
  } else if (versionType === 'fix') {
    newVersionSplit[2]++;
  } else {
    versioner.exitWithError('Invalid version type "%s" provided!', versionType);
  }

  json.version = newVersionSplit.join('.');
  fs.writeFile(jsonFile, JSON.stringify(json, null, 2), function (error) {
    if (error) {
      versioner.exitWithError(error);
    }

    console.log('Versioned up "%s" to "%s"', jsonFile, json.version);
  });
});
