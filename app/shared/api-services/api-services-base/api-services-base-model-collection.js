'use strict';

/**
 * Base that all api model collections should use.
 */
angular.module('apiServices.base.modelCollection', [
  'apiServices.base.http',
  'apiServices.base.requestor',
  'apiServices.error'
])
  .factory('BaseModelCollection', [
    'ApiError', 'ApiHttp', 'Requestor',
    function (ApiError, ApiHttp, Requestor) {

      /**
       * Base collection constructor.
       *
       * @param {string} endpoint - api-endpoint-relative path to collection's endpoint.
       * @param {BaseModel} model - type of model this collection will contain.
       * @param {object} [data] - optional data to build model off of.
       * @returns {BaseModelCollection}
       */
      var BaseModelCollection = function (endpoint, model, data) {
        Requestor.call(this);

        this._count = 0;
        this._page = 1;
        this._endpoint = endpoint;
        this._model = model;

        this.data = data || [];

        return this;
      };
      BaseModelCollection.prototype = Object.create(Requestor.prototype);
      BaseModelCollection.prototype.constructor = BaseModelCollection;

      /**
       * Create a GET request to retrieve a collection of models based on given
       *  parameters.
       *
       * @param {object} params - request parameters to use for collection retrieval.
       * @param {boolean} force - if true, will abort any currently running request
       *  in this model. Otherwise, if false and there is a running request, this
       *  function will throw an error.
       * @returns {BaseModelCollection}
       */
      BaseModelCollection.prototype.$query = function (params, force) {
        var paramType = typeof(params);
        if (paramType !== 'undefined' && paramType !== 'object') {
          throw new ApiError('first argument to $query must be an object if provided!');
        }

        var _collection = this;

        var req = new ApiHttp({
          method: 'GET',
          url: this._endpoint,
          params: params
        })
          .addResponseTransformer(function (data, headers, status) {
            if (status === 200) {
              _collection.data = data.results.map(function (result) {
                return new _collection._model(result);
              });
              _collection._count = data.count;
              _collection._page =
                paramType === 'object' && params.hasOwnProperty('page') ?
                  params.page : 1;
            }
          });

        return this._executeRequest(req, force);
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
