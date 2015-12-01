'use strict';

angular.module('apiServices', [
  'apiServices.config',
  'apiServices.config.interceptor',
  'restmod',
  'restmod.styles.drfPaged'
])
  .config([
    'API_URL_ROOT', 'restmodProvider', '$httpProvider', 'ApiServicesConfigInterceptor'
    function (API_URL_ROOT, restmodProvider, $httpProvider, ApiServicesConfigInterceptor) {

// TODO : remove this once restmod is gone
      restmodProvider.rebase('DjangoDRFPagedApi', {
        $config: {
          style: 'BulbsApi',
          urlPrefix: API_URL_ROOT
        }
      });

      $httpProvider.interceptors.push(ApiServicesConfigInterceptor)
    }
  ]);
