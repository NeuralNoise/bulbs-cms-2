'use strict';

angular.module('bulbsCmsApp')
  .factory('BadRequestInterceptor', function ($q, $injector, CmsConfig) {
    return {
      responseError: function (rejection) {
        $injector.invoke(function ($modal) {
          if (rejection.status === 400) {
            var detail = rejection.data || {'something': ['Something was wrong with your request.']};
            $modal.open({
              templateUrl: CmsConfig.getPartialsUrl() + 'modals/400-modal.html',
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
  });
