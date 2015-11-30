'use strict';

angular.module('bulbsCmsApp')
  .controller('TrashcontentmodalCtrl', function ($scope, $http, $modalInstance, $,
      articleId, Raven, ApiConfig) {
    $scope.deleteButton = {
      idle: 'Delete',
      busy: 'Trashing',
      finished: 'Trashed',
      error: 'Error!'
    };

    $scope.trashContent = function () {
      return $http({
        'method': 'POST',
        'url': ApiConfig.buildBackendApiUrl('content/' + articleId + '/trash/')
      });
    };

    $scope.trashCbk = function (trash_promise) {
      trash_promise
        .then(function (result) {
          console.log('trash success');
          $scope.trashSuccessCbk();
          $modalInstance.close();
        })
        .catch(function (reason) {
          if (reason.status === 404) {
            $scope.trashSuccessCbk();
            $modalInstance.close();
            return;
          }
          Raven.captureMessage('Error Deleting Article', {extra: reason});
          $modalInstance.dismiss();
        });
    };
  });
