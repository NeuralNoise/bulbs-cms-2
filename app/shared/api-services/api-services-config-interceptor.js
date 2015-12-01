'use strict';

/**
 * Applies ApiConfig configurations as an $httpProvider interceptor.
 */
angular.module('apiServices.config.interceptor', [
  'apiServices.config'
])
  .factory('ApiServicesConfigInterceptor', [
    'ApiConfig',
    function (ApiConfig) {

      /**
       * Applies base api url to requested url if given config has a property
       *  isApiCall set to true.
       *
       * @param {object} config - http config object to transform.
       * @returns {undefined}
       */
      var applyBaseApiUrl = function (config) {
        if (config.isApiCall) {
          config.url = ApiConfig.buildBackendApiUrl(config.url);
        }
      };

      return {
        request: function (config) {
          // apply transformations to config object
          applyBaseUrl(config);

          return config;
        }
      };
    }
  ]);
