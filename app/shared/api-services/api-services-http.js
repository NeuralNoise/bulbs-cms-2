'use strict';

/**
 * Wrapper around $http to allow room for a common interface in $http calls. All
 *  $http calls to the API should be made through here.
 */
angular.module('apiServices.http.factory', [])
  .factory('ApiServicesHttp', [
    '$http',
    function ($http) {

      /**
       * Create a new $http call via this wrapper object.
       *
       * @param {object} config - config to use for $http request.
       * @returns {ApiServicesHttp}
       */
      var ApiServicesHttp = function (config) {
        config.isApiCall = true;

        this.$http = $http(config);

        return this;
      };

      return ApiServicesHttp;
    }
  ]);
