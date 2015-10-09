'use strict';

angular.module('specialCoverage.edit', [
  'cms.config',
  'specialCoverage.edit.directive'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/cms/app/special-coverage/edit/:id/', {
        controller: [
          '$routeParams', '$scope', '$window', 'CmsConfig',
          function ($routeParams, $scope, $window, CmsConfig) {
            // set title
            $window.document.title = CmsConfig.getCmsTitle() + ' | Edit Special Coverage';

            $scope.routeId = $routeParams.id;
          }
        ],
        template: '<special-coverage-edit model-id="routeId"></special-coverage-edit>'
      });
  });
