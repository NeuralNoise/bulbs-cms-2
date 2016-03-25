'use strict';

// ****** External Libraries ****** \\

angular.module('lodash', []).constant('_', window._);
angular.module('URLify', []).constant('URLify', window.URLify);
angular.module('jquery', []).constant('$', window.$);
angular.module('moment', []).constant('moment', window.moment);
angular.module('PNotify', []).constant('PNotify', window.PNotify);
angular.module('keypress', []).constant('keypress', window.keypress);
angular.module('Raven', []).constant('Raven', window.Raven);
angular.module('OnionEditor', []).constant('OnionEditor', window.OnionEditor);

// ****** App Config ****** \\

angular.module('bulbsCmsApp.settings', [
  'ngClipboard'
])
  .config(function (ngClipProvider, ZERO_CLIPBOARD_SWF) {
    ngClipProvider.setPath(ZERO_CLIPBOARD_SWF);
  });

angular.module('bulbsCmsApp', [
  // unorganized
  'bulbsCmsApp.settings',
  'bulbs.api',

  // external
  'BettyCropper',
  'cmsComponents.auth',
  'cmsComponents.navUser',
  'ipCookie',
  'jquery',
  'keypress',
  'lodash',
  'moment',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'OnionEditor',
  'PNotify',
  'Raven',
  'restangular',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker',
  'URLify',

  // shared
  'backendApiHref',
  'contentServices',
  'cms.config',
  'cms.firebase.config',
  'cms.image',
  'cms.templates',
  'cms.tunic',

  // components
  'bettyEditable',
  'bugReporter',
  'campaigns',
  'cms.loggedInUser',
  'content',
  'content.video',
  'evergreenField',
  'filterWidget',
  'filterListWidget',
  'polls',
  'promotedContent',
  'sections',
  'sendToEditor',
  'specialCoverage',
  'statusFilter',
  'templateTypeField',
  'specialCoverage',
  'sections',
  'reports',
  // TODO : remove these, here because they are used by unrefactored compontents
  'content.edit.versionBrowser.modal.opener'
])
  .constant('TIMEZONE_NAME', 'America/Chicago')
  .provider('AuthRouter', [
    'TokenAuthConfigProvider',
    function AuthRouter (TokenAuthConfigProvider) {
      // this is an unfortunate construct of the $state service not being
      //  accessible in any way at config time, or injected later at run time.
      //  there's probably a better, unexplored way to do this.
      return {
        $get: [
          '$location',
          function ($location) {
            var loginPath = '/cms/login/';

            return {
              init: function () {
                TokenAuthConfigProvider.addAuthFailureHandler(function () {
                  $location.path(loginPath);
                });
                TokenAuthConfigProvider.addAuthSuccessHandler(function () {
                  // since this isn't truly single-page, route to root only if
                  //  currently on the login page
                  var currPath = $location.path();
                  if (currPath === loginPath) {
                    $location.path('/');
                  }
                });
                TokenAuthConfigProvider.addUnauthHandler(function () {
                  $location.path(loginPath);
                });
              }
            };
          }
        ]
      };
    }
  ])
  .config([
    '$provide', '$httpProvider', '$locationProvider', '$routeProvider',
      '$sceProvider', 'TokenAuthConfigProvider', 'TokenAuthServiceProvider',
      'CmsConfigProvider', 'COMPONENTS_URL', 'PARTIALS_URL', 'FirebaseConfigProvider',
      'PNotify',
    function ($provide, $httpProvider, $locationProvider, $routeProvider,
        $sceProvider, TokenAuthConfigProvider, TokenAuthServiceProvider, CmsConfigProvider,
        COMPONENTS_URL, PARTIALS_URL, FirebaseConfigProvider, PNotify) {

      PNotify.prototype.options.styling = 'fontawesome';

      // FirebaseConfigProvider
      //   .setDbUrl('')
      //   .setSiteRoot('');

      $locationProvider.html5Mode(true);

      $routeProvider
        .when('/', {
          templateUrl: PARTIALS_URL + 'contentlist.html',
          controller: 'ContentlistCtrl',
          reloadOnSearch: false
        })
        .when('/cms/app/list/', {
          redirectTo: '/'
        })
        .when('/cms/app/edit/:id/contributions/', {
          templateUrl: PARTIALS_URL + 'contributions.html',
          controller: 'ContributionsCtrl'
        })
        .when('/cms/app/targeting/', {
          templateUrl: PARTIALS_URL + 'targeting-editor.html',
          controller: 'TargetingCtrl'
        })
        .when('/cms/app/notifications/', {
          templateUrl: PARTIALS_URL + 'cms-notifications.html',
          controller: 'CmsNotificationsCtrl'
        })
        .when('/cms/app/pzones/', {
          templateUrl: PARTIALS_URL + 'pzones.html',
          controller: 'PzoneCtrl'
        })
        .when('/cms/login/', {
          template: '<cms-token-auth-login-form></cms-token-auth-login-form>'
        })
        .otherwise({
          templateUrl: '/404.html'
        });

      CmsConfigProvider.addEditPageMapping(
        '/components/edit-pages/video/video-container.html',
        'core_video');

      //TODO: whitelist staticonion.
      $sceProvider.enabled(false);
      /*.resourceUrlWhitelist([
      'self',
      STATIC_URL + "**"]);*/

      $provide.decorator('$exceptionHandler', function ($delegate) {
        return function (exception, cause) {
          $delegate(exception, cause);
          window.Raven.captureException(exception);
        };
      });

      $httpProvider.interceptors.push('BugReportInterceptor');
      $httpProvider.interceptors.push('BadRequestInterceptor');
      $httpProvider.interceptors.push('TokenAuthInterceptor');
      $httpProvider.interceptors.push('TunicInterceptor');
    }
  ])
  .run([
    '$http', '$cookies', 'AuthRouter', 'TokenAuthService',
    function ($http, $cookies, AuthRouter, TokenAuthService) {
      // set the CSRF token here
      $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;
      var deleteHeaders = $http.defaults.headers.delete || {};
      deleteHeaders['X-CSRFToken'] = $cookies.csrftoken;
      $http.defaults.headers.delete = deleteHeaders;

      AuthRouter.init();
      TokenAuthService.tokenVerify();
    }
  ]);
