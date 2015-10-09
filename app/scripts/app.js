'use strict';

// ****** External Libraries ****** \\

angular.module('lodash', []).constant('_', window._);
angular.module('URLify', []).constant('URLify', window.URLify);
angular.module('jquery', []).constant('$', window.$);
angular.module('moment', []).constant('moment', window.moment);
angular.module('PNotify', []).constant('PNotify', window.PNotify);
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
  'ipCookie',
  'jquery',
  'lodash',
  'moment',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'OnionEditor',
  'PNotify',
  'Raven',
  'restangular',
  'tokenAuth',
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
  'currentUser',
  // components
  'bettyEditable',
  'bugReporter',
  'campaigns',
  'content',
  'content.video',
  'filterWidget',
  'promotedContent',
  'reporting',
  'sections',
  'sendToEditor',
  'specialCoverage',
  'statusFilter',
  'templateTypeField',

  // TODO : remove these, here because they are used by unrefactored compontents
  'content.edit.versionBrowser.modal.opener'
])
  .config([
    '$provide', '$httpProvider', '$locationProvider', '$routeProvider', '$sceProvider',
      'TokenAuthConfigProvider', 'TokenAuthServiceProvider', 'CmsConfigProvider',
      'COMPONENTS_URL', 'FirebaseConfigProvider',
    function ($provide, $httpProvider, $locationProvider, $routeProvider, $sceProvider,
        TokenAuthConfigProvider, TokenAuthServiceProvider, CmsConfigProvider,
        COMPONENTS_URL, FirebaseConfigProvider) {

      // FirebaseConfigProvider
      //   .setDbUrl('')
      //   .setSiteRoot('sites/bulbs-cms-testing');

      $locationProvider.html5Mode(true);

      var config = CmsConfigProvider.$get();

      $routeProvider
        .when('/', {
          templateUrl: config.getPartialsUrl() + 'contentlist.html',
          controller: 'ContentlistCtrl',
          reloadOnSearch: false
        })
        .when('/cms/app/list/', {
          redirectTo: '/'
        })
        .when('/cms/app/edit/:id/contributions/', {
          templateUrl: config.getPartialsUrl() + 'contributions.html',
          controller: 'ContributionsCtrl'
        })
        .when('/cms/app/targeting/', {
          templateUrl: config.getPartialsUrl() + 'targeting-editor.html',
          controller: 'TargetingCtrl'
        })
        .when('/cms/app/notifications/', {
          templateUrl: config.getPartialsUrl() + 'cms-notifications.html',
          controller: 'CmsNotificationsCtrl'
        })
        .when('/cms/app/pzones/', {
          templateUrl: config.getPartialsUrl() + 'pzones.html',
          controller: 'PzoneCtrl'
        })
        .when('/cms/login/', {
          templateUrl: config.getPartialsUrl() + 'login/login.html'
        })
        .otherwise({
          templateUrl: '/404.html'
        });

      CmsConfigProvider.setLogoutCallback(function () {
        TokenAuthServiceProvider.$get().logout();
      });

      CmsConfigProvider.addEditPageMapping(
        '/components/edit-pages/video/video-container.html',
        'core_video');

      TokenAuthConfigProvider.setApiEndpointAuth('/token/auth');
      TokenAuthConfigProvider.setApiEndpointRefresh('/token/refresh');
      TokenAuthConfigProvider.setApiEndpointVerify('/token/verify');
      TokenAuthConfigProvider.setLoginPagePath('/cms/login/');

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
    }
  ])
  .run([
    '$rootScope', '$http', '$cookies',
    function ($rootScope, $http, $cookies) {
      // set the CSRF token here
      $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;
      var deleteHeaders = $http.defaults.headers.delete || {};
      deleteHeaders['X-CSRFToken'] = $cookies.csrftoken;
      $http.defaults.headers.delete = deleteHeaders;
    }
  ]);
