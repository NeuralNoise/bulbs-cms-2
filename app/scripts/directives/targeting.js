'use strict';

angular.module('bulbsCmsApp')
  .directive('targeting', function (CmsConfig) {
    return {
      restrict: 'E',
      templateUrl: CmsConfig.getPartialsUrl() + 'targeting.html',
      link: function (scope, element, attrs) {
        scope.addTargetingRow = function (index) {
          scope.targetingArray.push([]);
        };
        scope.removeTargetingRow = function (index) {
          scope.targetingArray.splice(index, 1);
        };
      }
    };
  });
