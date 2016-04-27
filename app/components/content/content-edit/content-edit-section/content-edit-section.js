'use strict';

angular.module('content.edit.section', [
  'apiServices.section.factory',
  'bulbsCmsApp.settings',
  'lodash',
  'utils',
  'uuid4'
])
  .directive('contentEditSection', [
    '_', 'COMPONENTS_URL', 'Utils', 'uuid4',
    function (_, COMPONENTS_URL, Utils, uuid4) {
      return {
        controller: [
          '$scope', 'Section',
          function ($scope, Section) {

            $scope.searchSections = function (query) {
              return Section.$search({
                ordering: 'name',
                search: query
              })
              .$asPromise();
            };

            $scope.itemDisplayFormatter = function (section) {
              return _.isObject(section) ? section.name : null;
            };

            $scope.itemValueFormatter = function (section) {
              if (_.isObject(section)) {
                return {
                  id: section.id,
                  name: section.name,
                  $resolved: true
                };
              }

              return null;
            };
          }
        ],
        link: function (scope, element, attrs, ngModelCtrl) {
          scope.uuid = uuid4.generate();

          if (ngModelCtrl) {

            scope.ngModel = ngModelCtrl;

            ngModelCtrl.$render = function () {
              if (_.isObject(ngModelCtrl.$modelValue) && !scope.initialValue) {
                scope.initialValue = scope.itemDisplayFormatter(ngModelCtrl.$modelValue);
              }
            };

            scope.onSelect = function () {
              ngModelCtrl.$commitViewValue();
            };
          }
        },
        restrict: 'E',
        require: 'ngModel',
        scope: {
          onSelect: '&campaignAutocompleteOnSelect' // selection handler for auto completions
        },
        templateUrl: Utils.path.join(
          COMPONENTS_URL,
          'content',
          'content-edit',
          'content-edit-section',
          'content-edit-section.html'
        )
      };
    }
  ]);
