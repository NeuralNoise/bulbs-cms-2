'use strict';

angular.module('content.edit.lastModified.modal.factory', [
  'bulbsCmsApp.settings',
  'filters.userDisplay',
  'lodash',
  'ui.bootstrap.modal',
  'utils'
])
  .factory('LastModifiedModal', [
    '$modal', 'COMPONENTS_URL', 'Utils',
    function ($modal, COMPONENTS_URL, Utils) {

      var LastModifiedModal = function (scope) {
        return (function (scope) {
          $modal.open({
            controller: [
              '_', '$scope', 'ContentFactory', 'moment',
              function (_, $scope, ContentFactory, moment) {

                ContentFactory.all('log')
                  .getList({content: $scope.articleOnPage.id})
                  .then(function (log) {
                    var latest = _.max(log, function (entry) { return moment(entry.action_time); });
                    var lastSavedById = latest.user;
                    ContentFactory.one('author', lastSavedById).get().then(function (data) {
                      $scope.lastSavedBy = data;
                    });
                  });

                $scope.loadFromServer = function () {
                  $scope.$close();

                  if ($scope.modalOnLoadChanges) {
                    $scope.modalOnLoadChanges();
                  }
                };

                $scope.saveAnyway = function () {
                  $scope.$close();

                  if ($scope.modalOnOverwriteChanges) {
                    $scope.modalOnOverwriteChanges();
                  }
                };

                $scope.cancelModal = function () {
                  $scope.$dismiss();

                  if ($scope.modalOnCancel) {
                    $scope.modalOnCancel();
                  }
                };
              }
            ],
            scope: scope,
            templateUrl: Utils.path.join(
              COMPONENTS_URL,
              'content',
              'content-edit',
              'content-edit-last-modified',
              'content-edit-last-modified-modal.html'
            )
          });
        })(scope);
      };

      return LastModifiedModal;
    }
  ]);
