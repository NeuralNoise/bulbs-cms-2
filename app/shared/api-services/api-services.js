'use strict';

angular.module('apiServices', [
  'apiServices.config.interceptor',
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

      $httpProvider.interceptors.push('ApiConfigInterceptor');
    }
  ]);
