'use strict';

angular.module('sections.edit', [
  'bulbsCmsApp.settings',
  'cms.config',
  'sections.edit.directive'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/cms/app/section/edit/:id/', {
        controller: [
          '$routeParams', '$scope', '$window', 'CmsConfig',
          function ($routeParams, $scope, $window, CmsConfig) {
            // set title
            $window.document.title = CmsConfig.getCmsTitle() + ' | Edit Section';

            $scope.routeId = $routeParams.id;
          }
        ],
        template: '<sections-edit model-id="routeId"></sections-edit>',
        reloadOnSearch: false
      });
  });
