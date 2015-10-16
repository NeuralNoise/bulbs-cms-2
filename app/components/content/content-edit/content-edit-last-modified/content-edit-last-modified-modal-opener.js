'use strict';

angular.module('content.edit.lastModified.modal.opener', [
  'bulbsCmsApp.settings',
  'content.edit.lastModified.modal.factory'
])
  .directive('lastModifiedModalOpener', function (LastModifiedModal) {
    return {
      restrict: 'A',
      scope: {
        modalOnCancel: '&',
        modalOnLoadChanges: '&',
        modalOnOverwriteChanges: '&'
      },
      link: function (scope, element) {
        var modalInstance = null;
        element.addClass('content-edit-last-modified-modal-opener');
        element.on('click', function () {
          modalInstance = new LastModifiedModal(scope);
        });
      }
    };
  });
