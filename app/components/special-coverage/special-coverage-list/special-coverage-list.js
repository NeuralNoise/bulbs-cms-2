'use strict';

angular.module('specialCoverage.list', [
  'apiServices.specialCoverage.factory',
  'bulbsCmsApp.settings',
  'cms.config',
  'listPage',
  'specialCoverage.settings'
])
  .config(function ($routeProvider, COMPONENTS_URL) {

    $routeProvider
      .when('/cms/app/special-coverage/', {
        controller: [
          '$scope', '$window', 'EXTERNAL_URL', 'SPECIAL_COVERAGE_LIST_REL_PATH',
            'SpecialCoverage', 'CmsConfig',
          function ($scope, $window, EXTERNAL_URL, SPECIAL_COVERAGE_LIST_REL_PATH,
            SpecialCoverage, CmsConfig) {

            // set title
            $window.document.title = CmsConfig.getCmsTitle() + ' | Special Coverage';

            $scope.modelFactory = SpecialCoverage;
            $scope.LIST_URL = EXTERNAL_URL + SPECIAL_COVERAGE_LIST_REL_PATH;
          }
        ],
        templateUrl: COMPONENTS_URL + 'special-coverage/special-coverage-list/special-coverage-list-page.html'
      });
  });
