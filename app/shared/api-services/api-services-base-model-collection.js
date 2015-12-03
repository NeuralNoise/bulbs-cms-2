'use strict';

/**
 * Base that all api model collections should use.
 */
angular.module('apiServices.base.modelCollection', [
  'apiServices.error',
  'apiServices.http.factory',
  'apiServices.utils'
])
  .factory('BaseModelCollection', [
    'ApiError', 'ApiHttp', 'ApiUtils',
    function (ApiError, ApiHttp, ApiUtils) {

      /**
       * Base collection constructor.
       *
       * @param {string} endpoint - api-endpoint-relative path to collection's endpoint.
       * @param {BaseModel} model - type of model this collection will contain.
       * @param {object} [data] - optional data to build model off of.
       * @returns {BaseModelCollection}
       */
      var BaseModelCollection = function (endpoint, model, data) {
        this._count = 0;
        this._page = 1;
        this._endpoint = endpoint;
        this._model = model;

        this.data = data || [];

        return this;
      };

      /**
       * Create a GET request to retrieve a collection of models based on given
       *  parameters.
       *
       * @param {object} params - request parameters to use for collection retrieval.
       * @returns {BaseModelCollection}
       */
      BaseModelCollection.prototype.$query = function (params) {
        var type = typeof(params);
        if (type !== 'undefined' && type !== 'object') {
          throw new ApiError('$query argument must be undefined or an object');
        }

        var _collection = this;

        var req = new ApiHttp({
          method: 'GET',
          url: this._endpoint,
          params: params
        })
          .addResponseTransformer(function (data, headers, status) {
            if (status === 200) {
              _model.data = data.results;
              _model._count = data.count;
              _model._page = params.page || 1;
            }
          });

        return ApiUtils.executeRequest(this, req, force);
      };

      /**
       * Provide correct JSON representation.
       *
       * @returns {string} stringified JSON representation of this collection.
       */
      BaseModelCollection.prototype.toJSON = function () {
        return this.data;
      };

      return BaseModelCollection;
    }
  ]);
