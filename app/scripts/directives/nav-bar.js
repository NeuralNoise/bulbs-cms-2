'use strict';

angular.module('bulbsCmsApp')
  .directive('navBar', [
    'CmsConfig', 'PARTIALS_URL', 'CurrentUser',
    function (CmsConfig, PARTIALS_URL, CurrentUser) {
      var defaultView = PARTIALS_URL + 'nav.html';

      return {
        controller: 'ContentworkflowCtrl',
        restrict: 'E',
        scope: false,
        templateUrl: function (tElement, tAttrs) {
          var template = defaultView;
          if ('view' in tAttrs) {
            try {
              template = CmsConfig.getToolbarTemplateUrl(tAttrs.view);
            } catch (e) {
              console.error(e);
            }
          }
          return template;
        },
        link: function (scope) {
          scope.NAV_LOGO = CmsConfig.getLogoUrl();

          var onLogin = function (user) {
            scope.showManagementLinks = user.is_manager;
          };

          var onLogout = function () {
            scope.showManagementLinks = false;
          };

          CurrentUser.addLoginHandler(onLogin);
          CurrentUser.addLogoutHandler(onLogout);

          scope.$on('$destroy', function () {
            CurrentUser.removeLoginHandler(onLogin);
            CurrentUser.removeLogoutHandler(onLogout);
          });
        }
      };
    }
  ]);
