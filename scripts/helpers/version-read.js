/**
 * Opens a JSON file provided as the first argument to this script, searches for
 *  "version" key in the root object and prints it to the console.
 */

'use strict';

var Versioner = require('./versioner.js');

var jsonFile = process.argv[2];     // a JSON file


new Versioner(jsonFile, function (version, json) {
  console.log([version.major, version.minor, version.fix].join('.'));
});
