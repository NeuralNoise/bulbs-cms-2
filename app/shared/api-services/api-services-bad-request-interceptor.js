'use strict';

angular.module('apiServices.badRequest.interceptor', [
  'bulbsCmsApp.settings'
])
  .factory('BadRequestInterceptor', [
    '$q', '$injector', 'PARTIALS_URL',
    function ($q, $injector, PARTIALS_URL) {
      return {
        responseError: function (rejection) {
          $injector.invoke(function ($modal) {
            if (rejection.status === 400) {
              var detail = rejection.data || {'something': ['Something was wrong with your request.']};
              $modal.open({
                templateUrl: PARTIALS_URL + 'modals/400-modal.html',
                controller: 'BadrequestmodalCtrl',
                resolve: {
                  detail: function () { return detail; }
                }
              });
            }
          });
          return $q.reject(rejection);
        }
      };
    }
  ]);
