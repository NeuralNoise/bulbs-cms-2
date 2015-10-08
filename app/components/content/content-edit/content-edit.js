'use strict';

angular.module('content.edit', [
  'content.edit.directive',
  'utils'
])
  .config([
    '$routeProvider', 'UtilsProvider',
    function ($routeProvider, UtilsProvider) {
      $routeProvider
        .when(UtilsProvider.path.join('/cms', 'app', 'edit', ':id/'), {
          template: '<content-edit></content-edit≥'
        });
    }]);
