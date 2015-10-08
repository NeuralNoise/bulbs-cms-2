'use strict';

angular.module('bulbs.cms.unsavedChangesGuard', [
  'confirmationModal.factory',
  'jquery'
])
  .service('UnsavedChangesGuard', [
    '$', '$location', '$rootScope', 'ConfirmationModal',
    function ($, $location, $rootScope, ConfirmationModal) {

      var $window = $(window);
      var locationChangeCallbackRef;
      var windowCallbackRef;

      var enableGuard = function (options) {
        var settings = $.extend({
          modalGuardTitle: 'Unsaved Changes!',
          message: 'You have unsaved changes. Do you want to continue?',
          unsavedChangesCheckCallback: function () { return false; }
        }, options);

        // remove existing hooks
        disableGuard();

        // browser navigation hook
        windowCallbackRef = windowCallback.bind(this, settings);
        $window.on('beforeunload', windowCallbackRef);

        // angular navigation hook
        locationChangeCallbackRef = locationChangeCallback.bind(this, settings);
        $rootScope.$on('$locationChangeStart', locationChangeCallbackRef);
      };

      var disableGuard = function () {
// TODO : figure this one out, how do I unbind these events?

        $window.off('beforeunload', windowCallbackRef);
        //$rootScope.$off('$locationChangeStart', locationChangeCallbackRef);
      };

      var windowCallback = function (settings) {
        if (settings.unsavedChangesCheckCallback()) {
          return settings.message;
        }
      };

      var locationChangeCallback = function (settings, e, newUrl) {
        if (settings.unsavedChangesCheckCallback()) {

          // set up modal
          var modalScope = $rootScope.$new();
          modalScope.modalOnOk = function () {
            // navigate user
            disableGuard();
            $location.url(newUrl.substring($location.absUrl().length - $location.url().length));
          };
          modalScope.modalTitle = settings.modalGuardTitle;
          modalScope.modalBody = settings.message;
          modalScope.modalOkText = 'Yes';
          modalScope.modalCancelText = 'No';

          // open modal
          new ConfirmationModal(modalScope);

          // stop immediate navigation
          e.preventDefault();
        }
      };

      return {
        enable: enableGuard,
        disable: disableGuard
      };
    }
  ]);
