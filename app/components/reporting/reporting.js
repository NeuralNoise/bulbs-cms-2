'use strict';

angular.module('reporting', [
  'cms.config',
  'reporting.directive'
])
  .config([
    '$routeProvider', 'COMPONENTS_URL',
    function ($routeProvider, COMPONENTS_URL) {

      $routeProvider
        .when('/cms/app/reporting/', {
          controller: [
            '$window', 'CmsConfig',
            function ($window, CmsConfig) {
              // set title
              $window.document.title = CmsConfig.getCmsTitle() + ' | Reporting';
            }
          ],
          templateUrl: COMPONENTS_URL + 'reporting/reporting-page.html'
        });
    }
  ]);
