'use strict';

angular.module('bulbsCmsApp')
  .directive('cmsNotifyContainer', function (CmsConfig) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: CmsConfig.getPartialsUrl() + 'cms-notify-container.html',
      controller: 'CmsNotifyContainerCtrl'
    };
  });
