'use strict';

angular.module('bulbsCmsApp')
  .directive('cmsNotification', function (CmsConfig) {
    return {
      restrict: 'E',
      templateUrl: CmsConfig.getPartialsUrl() + 'cms-notification.html',
      scope: {
        notification: '='
      },
      controller: 'CmsNotificationCtrl'
    };
  });
