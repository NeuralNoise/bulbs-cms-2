'use strict';

angular.module('apiServices.utils', [
  'apiServices.error'
])
  .service('ApiUtils', [
    'ApiError',
    function (ApiError) {
// TODO : make this a base prototype called Requestor for both models and collections

      var ApiUtils = {
        /**
         * Utility to execute requests within a model framework.
         *
         * @param {BaseModel} model - model to execute request with.
         * @param {ApiHttp} request - request to execute.
         * @returns {ApiHttp} new request made.
         */
        executeRequest: function (model, request, force) {
          if (force) {
            ApiUtils.abortCurrRequest(model);
          }

          if (model._currRequest === null) {
            model._currRequest = request;
          } else {
            throw new ApiError('Model request already pending, either abort or force a new request!');
          }

          return model._currRequest.$execute()
            .finally(function () {
              model.currRequest = null;
            });
        },
        /**
         * Abort currently running request on given model if there is one.
         *
         * @param {BaseModel} model - model to execute request with.
         * @returns {undefined}
         */
        abortCurrRequest: function (model) {
          if (model._currRequest !== null) {
            model._currRequest.abort();
            model._currRequest = null;
          }
        }
      };

      return ApiUtils;
    }
  ]);
