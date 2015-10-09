'use strict';

angular.module('bulbsCmsApp')
  .factory('TemporaryUrlModalOpener', function ($modal, CmsConfig) {

    var modal = null;

    return {
      open: function ($scope, article) {
        // ensure only one version browser is open at a time
        if (modal) {
          modal.close();
        }

        modal = $modal.open({
          templateUrl: CmsConfig.getPartialsUrl() + 'modals/temporary-url-modal.html',
          controller: 'TemporaryUrlModalCtrl',
          scope: $scope,
          resolve: {
            article: function () {
              return article;
            }
          }
        });

        return modal;
      }
    };

  });
