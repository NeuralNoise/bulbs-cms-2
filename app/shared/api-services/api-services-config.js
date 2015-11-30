'use strict';

angular.module('apiServices.config', [
  'lodash'
])

// TODO : remove API_URL_ROOT and all its references once at $http

  .constant('API_URL_ROOT', '/cms/api/v1/')
  .provider('ApiConfig', [
    '_',
    function ApiConfigProvider (_) {

      // relative api path, rel to backendRoot
      var apiPath = '';
      // root for all backend requests
      var backendRoot = '';

      var error = function (message) {
        return new ConfigError('CmsConfig', message);
      };

      this.setApiPath = function (value) {
        if (_.isString(value)) {
          apiPath = value;
        } else {
          throw error('apiPath must be a string!');
        }
        return this;
      };

      this.setBackendRoot = function (value) {
        if (_.isString(value)) {
          backendRoot = value;
        } else {
          throw error('backendRoot must be a string!');
        }
        return this;
      };

      this.$get = function () {
        return {
          /**
           * Create an absolute api url.
           *
           * @param {string} relUrl - relative url to get the absolute api
           *  url for.
           * @returns {string} absolute api url.
           */
          buildBackendApiUrl: function (relUrl) {
            return this.buildBackendUrl(apiPath + (relUrl || ''));
          },
          /**
           * Build a url relative to backend root.
           *
           * @param {string} relUrl - relative url to get the absolute url for.
           * @returns {string} absolute url.
           */
          buildBackendUrl: function (relUrl) {
            return backendRoot + (relUrl || '');
          },
        };
      };
    }
  ]);
