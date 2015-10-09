'use strict';

angular.module('campaigns.list', [
  'apiServices.campaign.factory',
  'bulbsCmsApp.settings',
  'cms.config',
  'listPage',
  'moment'
])
  .config(function ($routeProvider, COMPONENTS_URL) {
    $routeProvider
      .when('/cms/app/campaigns/', {
        controller: [
          '$scope', '$window', 'Campaign', 'CmsConfig',
          function ($scope, $window, Campaign, CmsConfig) {
            // set title
            $window.document.title = CmsConfig.getCmsTitle() + ' | Campaign';

            $scope.modelFactory = Campaign;
          }
        ],
        templateUrl: COMPONENTS_URL + 'campaigns/campaigns-list/campaigns-list-page.html'
      });
  });
