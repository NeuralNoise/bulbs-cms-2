'use strict';

angular.module('cms.loggedInUser', [
  'cmsComponents.auth.service',
  'cmsComponents.auth.user',
  'cmsComponents.filters.userDisplay',
])
  .directive('loggedInUser', [
    'COMPONENTS_URL',
    function (COMPONENTS_URL) {
      return {
        controller: [
          '$scope', 'CurrentUser', 'TokenAuthService',
          function ($scope, CurrentUser, TokenAuthService) {
// TODO : replace this with cmsComponents.navUser at some point, cannot do it
//  now because of incompatibility with angular bootstrap ui dropdown stuff
            $scope.logout = function () {
              TokenAuthService.logout();
            };

            var onLogin = function (user) {
              $scope.user = user;
            };

            var onLogout = function () {
              $scope.user = null;
            };

            CurrentUser.addLoginHandler(onLogin);
            CurrentUser.addLogoutHandler(onLogout);

            $scope.$on('$destroy', function () {
              CurrentUser.removeLoginHandler(onLogin);
              CurrentUser.removeLogoutHandler(onLogout);
            });
          }
        ],
        restrict: 'E',
        replace: true,
        templateUrl: COMPONENTS_URL + 'logged-in-user/logged-in-user.html',
        scope: {}
      };
    }
  ]);
