/**
 * Utility for updating the table of contents in README.md
 */

'use strict';

var fs = require('fs');
var toc = require('markdown-toc');

var ConsoleHelper = require('console-helper');


var README_PATH = 'README.md';

fs.readFile(README_PATH, 'utf-8', function (error, data) {
  if (error) {
    ConsoleHelper.exitWithError(error);
  }

  var withToc = toc.insert(data, {
    regex: /(?:<!-- markdown-toc(?:\s*-stop)? -->)/g,
    open: '<!-- markdown-toc -->\n\n',
    close: '<!-- markdown-toc-stop -->'
  });

  fs.writeFile(README_PATH, withToc, function () {
    console.log('Table of contents updated in ' + README_PATH);
  });
});
