'use strict';

angular.module('apiServices', [
  'apiServices.config',
  'restmod',
  'restmod.styles.drfPaged'
])
  .config([
    'API_URL_ROOT', 'restmodProvider',
    function (API_URL_ROOT, restmodProvider) {
      restmodProvider.rebase('DjangoDRFPagedApi', {
        $config: {
          style: 'BulbsApi',
          urlPrefix: API_URL_ROOT
        }
      });
    }
  ]);
