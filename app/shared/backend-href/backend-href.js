'use strict';

/**
 * Filter and directive that can be used in templates to build correct urls for
 *  interaction with the backend.
 */
angular.module('backendApiHref', [
  'apiServices.config',
  'jquery'
])
  .filter('backendApiHref', [
    'ApiConfig',
    function(ApiConfig) {
      return function (relUrl) {
        return ApiConfig.buildBackendApiUrl(relUrl);
      };
    }]
  )
  .filter('backendHref', [
    'ApiConfig',
    function (ApiConfig) {
      return function (relUrl) {
        return ApiConfig.buildBackendUrl(relUrl);
      };
    }]
  )
  .directive('backendApiHref', [
    '$', '$filter',
    function ($, $filter) {
      return {
        restrict: 'A',
        scope: {
          backendApiHref: '@'
        },
        link: function (scope, iElement) {
          $(iElement).attr('href', $filter('backendApiHref')(scope.backendApiHref));
        }
      };
    }]
  )
  .directive('backendHref', [
    '$', '$filter',
    function ($, $filter) {
      return {
        restrict: 'A',
        scope: {
          backendHref: '@'
        },
        link: function (scope, iElement) {
          $(iElement).attr('href', $filter('backendHref')(scope.backendHref));
        }
      };
    }]
  );
