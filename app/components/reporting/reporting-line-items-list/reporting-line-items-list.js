'use strict';

angular.module('lineItems.list', [
  'apiServices.lineItem.factory',
  'bulbsCmsApp.settings',
  'listPage',
  'utils'
])
  .config([
    '$routeProvider', 'COMPONENTS_URL', 'UtilsProvider',
    function ($routeProvider, COMPONENTS_URL, Utils) {
      $routeProvider
        .when('/cms/app/line-items/', {
          controller: [
            '$scope', '$window', 'CMS_NAMESPACE', 'LineItem',
            function($scope, $window, CMS_NAMESPACE, LineItem) {
              $window.document.title = CMS_NAMESPACE + ' | Line Items';

              $scope.modelFactory = LineItem;

              $scope.LineItemExportModal = function () {
                return $modal.open({
                  templateUrl: routes.PARTIALS_URL + 'modals/line-item-export-modal.html',
                  controller: 'LineitemexportmodalCtrl',
                });
              };

              $scope.utilityButtons = [{
                title: 'Export CSV',
                click: function () {
                  $scope.LineItemExportModal();
                },
                buttonClasses: 'add-item btn btn-primary',
                iconClasses: 'font-awesome'
              }];
            }
          ],
          templateUrl: Utils.path.join(
            COMPONENTS_URL,
            'reporting',
            'reporting-line-items-list',
            'reporting-line-items-list.html'
          )
        });
    }
  ]);
