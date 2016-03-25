'use strict';

angular.module('evergreenField.directive', [
  'bulbsCmsApp.settings',
  'lodash',
  'saveButton.directive',
])
  .directive('evergreenField', [
    'COMPONENTS_URL',
    function (COMPONENTS_URL) {
      return {
        restrict: 'E',
        scope: {
          article: '='
        },
        templateUrl: COMPONENTS_URL + 'evergreen-field/evergreen-field.html'
      };
    }
  ]);
