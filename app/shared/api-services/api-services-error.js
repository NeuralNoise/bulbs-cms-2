'use strict';

angular.module('apiServices.error', [])
  .factory('ApiError', function () {

    var ApiError = function (message) {
      this.name = 'Api Error';
      this.message = message || 'An error occurred with the API.';
    };

    ApiError.prototype = Object.create(Error.prototype);
    ApiError.prototype.constructor = ApiError;

    return ApiError;
  });
