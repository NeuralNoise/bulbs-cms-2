'use strict';

var fs = require('fs');
var toc = require('markdown-toc');

var README_PATH = 'README.md';

fs.readFile(README_PATH, 'utf-8', function (error, data) {
  if (error) {
    console.error(error);
    process.exit(1);
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
