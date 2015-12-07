'use strict';

angular.module('apiServices', [
  'apiServices.interceptors.bugReport',
  'apiServices.interceptors.badRequest',
  'apiServices.interceptors.config',
  'restangular',
  'restmod',
  'restmod.styles.drfPaged'
])
  .config([
    'RestangularProvider', 'restmodProvider', '$httpProvider',
    function (RestangularProvider, restmodProvider, $httpProvider) {

// TODO : remove this once restmod is gone
      restmodProvider.rebase('DjangoDRFPagedApi', {
        $config: {
          style: 'BulbsApi'
        },
        $hooks: {
          'before-request': function (_req) {
            _req.isApiCall = true;
          }
        }
      });

// TODO : remove this once restangular is gone
      RestangularProvider.setDefaultHttpFields({
        isApiCall: true
      });
      RestangularProvider.setRequestSuffix('/');

// TODO : remove apiconfig interceptor once restmod and restangular are gone,
//  will simplify design
      // set interceptors
      $httpProvider.interceptors.push('ApiConfigInterceptor');
      $httpProvider.interceptors.push('BugReportInterceptor');
      $httpProvider.interceptors.push('BadRequestInterceptor');
    }
  ]);
