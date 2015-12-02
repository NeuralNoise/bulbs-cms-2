'use strict';

angular.module('apiServices.utils', [])
  .service('ApiUtils', function () {
    return {
      /**
       * Utility to execute requests within a model framework.
       *
       * @param {BaseModel} model - model to execute request with.
       * @param {ApiHttp} request - request to execute.
       * @returns {ApiHttp} new request made.
       */
      executeRequest: function (model, request, force) {
        if (force) {
          model._abortCurrRequest();
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
      }
    }
  });
