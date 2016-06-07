angular.module('cms.templates', []);

var appFiles = require.context('./app', true, /[^\.test\.js]$/);
appFiles.keys().map(appFiles);
