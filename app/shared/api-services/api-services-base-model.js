'use strict';

/**
 * Base that all api models should use.
 */
angular.module('apiServices.base.model', [
  'apiServices.error',
  'apiServices.http.factory',
  'utils'
])
  .factory('BaseModel', [
    'ApiError', 'ApiHttp', 'Utils',
    function (ApiError, ApiHttp, Utils) {

      /**
       * Utility to execute requests within a model framework.
       *
       * @param {BaseModel} model - model to execute request with.
       * @param {ApiHttp} request - request to execute.
       * @returns {ApiHttp} new request made.
       */
      var executeRequest = function (model, request, force) {
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
      };

      /**
       * Base model constructor.
       *
       * @param {string} endpoint - api-endpoint-relative path to model's endpoint.
       * @param {object} [data] - optional data to build model off of.
       * @returns {BaseModel}
       */
      var BaseModel = function (endpoint, data) {
        this._currRequest = null;
        this._endpoint = endpoint;
        this._state = 0;

        this.data = data || {};

        return this;
      };

      /**
       * Abort currently running request if there is one.
       *
       * @returns {undefined}
       */
      BaseModel.prototype._abortCurrRequest = function () {
        if (this._currRequest) {
          this._currRequest.abort();
          this._currRequest = null;
        }
      };

      /**
       * Create a GET request to fetch data for this model based on given id.
       *
       * @param {number} id - id of model data to fetch.
       * @param {boolean} force - if true, will abort any currently running request
       *  in this model. Otherwise, if false and there is a running request, this
       *  function will throw an error.
       * @returns {BaseModel}
       */
      BaseModel.prototype.$get = function (id, force) {
        var _model = this;

        var req = new ApiHttp({
          method: 'GET',
          url: Utils.path.join(this._endpoint, id)
        })
          .addResponseTransformer(function (data, headers, status) {
            if (status === 200) {
              _model.data = data;
            }
          });

        return executeRequest(this, req, force);
      };

      /**
       * Update or create a model. If model's data contains an id, a PUT request
       *  will be created to update an existing model. If model's data does not
       *  contain an id, a POST request will be created to create a new model.
       *
       * @param {boolean} force - if true, will abort any currently running request
       *  in this model. Otherwise, if false and there is a running request, this
       *  function will throw an error.
       * @returns {BaseModel}
       */
      BaseModel.prototype.$save = function (force) {
        var _model = this;

        var httpMethod = 'POST';
        var httpUrl = this._endpoint;
        if (this.data.hasOwnProperty('id')) {
          httpMethod = 'PUT';
          httpUrl = Utils.path.join(this._endpoint, this.data.id);
        }

        var req = new ApiHttp({
          method: httpMethod,
          url: httpUrl,
          data: this.data
        })
          .addResponseTransformer(function (data, headers, status) {
            if (status === 200) {
              _model.data.id = data.id;
            }
          });

        return executeRequest(this, req, force);
      };

      /**
       * Delete this model.
       *
       * @param {boolean} force - if true, will abort any currently running request
       *  in this model. Otherwise, if false and there is a running request, this
       *  function will throw an error.
       * @returns {undefined}
       */
      BaseModel.prototype.$delete = function (force) {
        var req = new ApiHttp({
          method: 'DELETE',
          url: Utils.path.join(this._endpoint, this.data.id)
        });

        return executeRequest(this, req, force);
      };

      return BaseModel;
    }
  ]);
