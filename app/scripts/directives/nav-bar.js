'use strict';

angular.module('bulbsCmsApp')
  .directive('navBar', [
    'CmsConfig', 'PARTIALS_URL', 'CurrentUser',
    function (CmsConfig, PARTIALS_URL, CurrentUser) {
      var defaultView;
      try {
        defaultView = CmsConfig.getToolbarTemplateUrl('nav');
      } catch (e) {
        console.warn(
          'Unable to find site-specific "nav" template, using default. Config stacktrace follows:',
          e.stack
        );
        defaultView = PARTIALS_URL + 'nav.html';
      }

      return {
        controller: 'ContentworkflowCtrl',
        restrict: 'E',
        scope: false,
        templateUrl: function (tElement, tAttrs) {
          var templateUrl;

          if (tAttrs.view) {
            templateUrl = CmsConfig.getToolbarTemplateUrl(tAttrs.view);
          } else {
            templateUrl = defaultView;
          }

          return templateUrl
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
