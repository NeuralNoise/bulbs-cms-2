'use strict';

/**
 * Base that all api model collections should use.
 */
angular.module('apiServices.base.modelCollection', [
  'apiServices.base.model',
  'apiServices.http.factory'
])
  .factory('BaseModelCollection', [
    'ApiHttp',
    function (ApiHttp) {

      /**
       * Base collection constructor.
       *
       * @param {BaseModel} model - models this collection will contain.
       * @returns {BaseModelCollection}
       */
      BaseModelCollection = function (model) {
        this.model = model;
        this.data = [];
        return this;
      };

      /**
       * Create a GET request to retrieve a collection of models based on given
       *  parameters.
       *
       * @param {object} params - request parameters to use for collection retrieval.
       * @returns {BaseModelCollection}
       */
      BaseModelCollection.prototype.$query = function (params) {};

      return BaseModelCollection;
    }
  ]);
