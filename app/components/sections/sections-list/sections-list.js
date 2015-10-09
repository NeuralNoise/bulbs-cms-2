'use strict';

angular.module('sections.list', [
  'apiServices.section.factory',
  'bulbsCmsApp.settings',
  'cms.config',
  'listPage',
  'sections.settings'
])
  .config(function ($routeProvider, COMPONENTS_URL) {

    $routeProvider
      .when('/cms/app/section/', {
        controller: [
          '$scope', '$window', 'EXTERNAL_URL', 'SECTIONS_LIST_REL_PATH', 'Section',
            'CmsConfig',
          function ($scope, $window, EXTERNAL_URL, SECTIONS_LIST_REL_PATH, Section,
              CmsConfig) {

            // set title
            $window.document.title = CmsConfig.getCmsTitle() + ' | Section';

            $scope.modelFactory = Section;
            $scope.LIST_URL = EXTERNAL_URL + SECTIONS_LIST_REL_PATH;
          }
        ],
        templateUrl: COMPONENTS_URL + 'sections/sections-list/sections-list-page.html'
      });
  });
