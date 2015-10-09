'use strict';

angular.module('promotedContent', [
  'bulbsCmsApp.settings',
  'cms.config',
  'promotedContentPzoneSelect',
  'promotedContentList',
  'promotedContentSearch',
  'promotedContentTimePicker',
  'promotedContentOperationsList',
])
  .config(function ($routeProvider, COMPONENTS_URL) {
    $routeProvider
      .when('/cms/app/promotion/', {
        controller: [
          '$window', 'CmsConfig',
          function ($window, CmsConfig) {
            // set title
            $window.document.title = CmsConfig.getCmsTitle() + ' | Promotion Tool';
          }
        ],
        templateUrl: COMPONENTS_URL + 'promoted-content/promoted-content.html',
        reloadOnSearch: false
      });
  });
