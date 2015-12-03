'use strict';

/**
 * Wrapper around $http to allow room for a common interface in $http calls. All
 *  $http calls to the API should be made through here.
 */
angular.module('apiServices.base.http', [
  'apiServices.error'
])
  .factory('ApiHttp', [
    '$http', '$q', 'ApiError',
    function ($http, $q, ApiError) {

      // ordered by the order in which the occur
      var STATES = [
        'ready',
        'executing',
        'executed'
      ];

      /**
       * Create a new $http call via this wrapper object.
       *
       * @param {object} config - config to use for $http request.
       * @returns {ApiHttp}
       */
      var ApiHttp = function (config) {
        config.isApiCall = true;

        this._$http = null;
        this._abortDefer = $q.defer();
        this._config = config;
        this._responseTransformers = [];
        this._state = 0;

        return this;
      };

      /**
       * Execute $http request. Should only be called once per ApiHttp instance.
       *
       * @returns {$http} $http object used for request.
       */
      ApiHttp.prototype.$execute = function () {
        if (this._state !== 0) {
          throw new ApiError('$execute has already been called! Create a new ApiHttp object to make a new $http request.');
        }

        this._state = 1;

        // add response transformers
        var respTransformersFromHttpDefaults =
          (angular.isArray($http.defaults.transformResponse) ?
            $http.defaults.transformResponse : [$http.defaults.transformResponse]);
        this._config.transformResponse = [].concat(
          respTransformersFromHttpDefaults,
          this._config.transformResponse || [],
          this._responseTransformers
        );

        // setup hook for aborting request
        this._config.timeout = this._abortDefer.promise;

        // create request, changes state once request comes back
        var _this = this;
        this._$http = $http(this._config)
          .finally(function () {
            _this._state = 2;
          });

        return this._$http;
      };

      /**
       * Abort the current request if it's running.
       *
       * @returns {undefined}
       */
      ApiHttp.prototype.abort = function () {
        if (this._state !== 1) {
          throw new ApiError('No requests pending to abort!');
        }

        this._abortDefer.resolve();
        this._state = 2;
      };

      /**
       * Utility function to see what state this request is in.
       *
       * @returns {string} value indicating the current state of this request.
       */
      ApiHttp.prototype.getState = function () {
        return STATES[this._state];
      };

      /**
       * Add a response transformer to $http request. Must be called before
       *  $execute so it can be ready to go when then response returns.
       *
       * @param {function} callback - callback to use to transform response.
       * @returns {ApiHttp}
       */
      ApiHttp.prototype.addResponseTransformer = function (callback) {
        if (this._state !== 0) {
          throw new ApiError('$execute has already been called! No modifications can be made to configuration of this request.');
        }

        this._responseTransformers.push(callback);

        return this;
      };

      return ApiHttp;
    }
  ]);
