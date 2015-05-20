'use strict';

angular.module('content.edit', [
  'content.edit.controller',
  'content.edit.templateChooser'
])
  .config([
    '$routeProvider', 'routes',
    function ($routeProvider, routes) {
      $routeProvider
        .when('/cms/app/edit/:id/', {
          templateUrl: routes.COMPONENTS_URL + 'content/content-edit/content-edit.html',
          controller: 'ContentEdit'
        });
    }]);
