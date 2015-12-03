'use strict';

/**
 * Base object for anything that needs to allow only one request at a time.
 */
angular.module('apiServices.base.requestor', [
  'apiServices.base.http',
  'apiServices.error'
])
  .factory('Requestor', [
    'ApiError', 'ApiHttp',
    function (ApiError, ApiHttp) {

      var Requestor = function () {
        this._currentRequest = null;
      };

      /**
       * Execute requests within a controllable framework.
       *
       * @param {ApiHttp} request - request to execute.
       * @returns {ApiHttp} new executing request.
       */
      Requestor.prototype._executeRequest = function (request, force) {
        if (!(request instanceof ApiHttp)) {
          throw new ApiError('Request object provided must be of type ApiHttp!');
        }

        if (force) {
          this._abortCurrentRequest();
        }

        if (this._currentRequest === null) {
          this._currentRequest = request;
        } else {
          throw new ApiError('A request is already pending, either abort or force a new request!');
        }

        var _requestor = this;
        return this._currentRequest.$execute()
          .finally(function () {
            _requestor._currentRequest = null;
          });
      };

      /**
       * Abort currently running request if there is one.
       *
       * @returns {undefined}
       */
      Requestor.prototype._abortCurrentRequest = function () {
        if (this._currentRequest !== null) {
          this._currentRequest.abort();
          this._currentRequest = null;
        }
      }

      return Requestor;
    }
  ]);
