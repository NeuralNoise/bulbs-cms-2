'use strict';

angular.module('polls.list', [
  'apiServices.poll.factory',
  'bulbsCmsApp.settings',
  'bulbsCmsApp.nonRestmodListPage',
  'moment'
])
  .config(function ($routeProvider, COMPONENTS_URL, CMS_NAMESPACE) {
    $routeProvider
      .when('/cms/app/polls/', {
        controller: function ($scope, $window, Poll) {
          // set title
          $window.document.title = CMS_NAMESPACE + ' | Poll';

          $scope.modelFactory = Poll;

        },
        templateUrl: COMPONENTS_URL + 'polls/polls-list/polls-list-page.html'
      });
  });
