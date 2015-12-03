'use strict';

/**
 * Base that all api models should use.
 */
angular.module('apiServices.base.model', [
  'apiServices.base.http',
  'apiServices.base.requestor',
  'apiServices.error',
  'utils'
])
  .factory('BaseModel', [
    'ApiError', 'ApiHttp', 'Requestor', 'Utils',
    function (ApiError, ApiHttp, Requestor, Utils) {

      var STATES = [
        'new',
        'identified',
        'deleted'
      ];

      /**
       * Base model constructor.
       *
       * @param {string} endpoint - api-endpoint-relative path to model's endpoint.
       * @param {object} [data] - optional data to build model off of.
       * @returns {BaseModel}
       */
      var BaseModel = function (endpoint, data) {
        Requestor.call(this);

        this._endpoint = endpoint;

        this.data = typeof(data) === 'object' ? data : {};

        this._state = typeof(this.data.id) === 'number' ? 1 : 0;

        return this;
      };
      BaseModel.prototype = Object.create(Requestor.prototype);
      BaseModel.prototype.constructor = BaseModel;

      /**
       * Utility function to see what state this model is in.
       *
       * @returns {string} value indicating the current state of this model.
       */
      BaseModel.prototype.getState = function () {
        return STATES[this._state];
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
        if (this._state === 2) {
          throw new ApiError('This model has been deleted, cannot call its methods!');
        }

        if (typeof(id) !== 'number') {
          throw new ApiError('$get requires a number id as its first argument!');
        }

        var _model = this;

        var req = new ApiHttp({
          method: 'GET',
          url: Utils.path.join(this._endpoint, id)
        })
          .addResponseTransformer(function (data, headers, status) {
            if (status === 200) {
              _model.data = data;
              _model._state = 1;
            }
          });

        return this._executeRequest(req, force);
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
        if (this._state === 2) {
          throw new ApiError('This model has been deleted, cannot call its methods!');
        }

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
              _model._state = 1;
            }
          });

        return this._executeRequest(req, force);
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
        if (this._state === 0) {
          throw new ApiError('Cannot delete a model with no id!');
        } else if (this._state === 2) {
          throw new ApiError('This model has been deleted, cannot call its methods!');
        }

        var req = new ApiHttp({
          method: 'DELETE',
          url: Utils.path.join(this._endpoint, this.data.id)
        });

        var _model = this;
        return this._executeRequest(req, force)
          .then(function () {
            _model._state = 2;
          });
      };

      /**
       * Provide correct JSON representation.
       *
       * @returns {string} stringified JSON representation of this model.
       */
      BaseModel.prototype.toJSON = function () {
        if (this._state === 2) {
          throw new ApiError('This model has already been deleted, cannot call its methods!');
        }

        return this.data;
      };

      return BaseModel;
    }
  ]);
