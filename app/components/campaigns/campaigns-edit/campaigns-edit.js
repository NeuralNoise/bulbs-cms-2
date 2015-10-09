'use strict';

angular.module('campaigns.edit', [
  'campaigns.edit.directive',
  'cms.config'
])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/cms/app/campaigns/edit/:id/', {
      controller: [
        '$routeParams', '$scope', '$window', 'CmsConfig',
        function ($routeParams, $scope, $window, CmsConfig) {

          // set title
          $window.document.title = CmsConfig.getCmsTitle() + ' | Edit Campaign';

          $scope.routeId = $routeParams.id;
        }
      ],
      template: '<campaigns-edit model-id="routeId"></campaigns-edit>',
      reloadOnSearch: false
    });
  });
