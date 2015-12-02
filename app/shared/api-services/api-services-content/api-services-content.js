'use strict';

angular.module('apiServices.content.factory', [
  'apiServices.base.model'
])
  .factory('Content', [
    'BaseModel',
    function (BaseModel) {

      var Content = function (data) {
        BaseModel.call(this, 'content', data);
      };

      Content.prototype = Object.create(BaseModel.prototype);
      Content.prototype.constructor = Content;

      return Content;
    }
  ]);
