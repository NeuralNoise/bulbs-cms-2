'use strict';

angular.module('content.edit.editorItem.service', [
  'apiServices.config'
])
  .service('EditorItems', [
    '$http', 'ApiConfig',
    function EditorItems($http, ApiConfig) {
      this.data = [];
      var self = this;
      this.getItems = function (article) {
        $http.get(
          ApiConfig.buildBackendApiUrl('content/' + article + '/send/')
        ).success(function (data, status) {
          self.data = data.editor_items;
        });
      };
    }]);
