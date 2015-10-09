'use strict';

angular.module('bulbsCmsApp')
  .directive('loggedInUser', function (CmsConfig, CurrentUser) {
    return {
      controller: function ($scope) {
        CurrentUser.$simplified().then(function (user) {
          $scope.user = user;
        });
        $scope.logout = CmsConfig.logoutCallback;
      },
      restrict: 'E',
      replace: true,
      templateUrl: CmsConfig.getPartialsUrl() + 'logged-in-user.html',
      scope: {}
    };
  });
