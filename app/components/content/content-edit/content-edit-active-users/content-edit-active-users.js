'use strict';

angular.module('content.edit.activeUsers', [
  'bulbsCmsApp.settings',
  'cms.firebase',
  'lodash',
  'utils'
])
  .directive('contentEditActiveUsers', function (COMPONENTS_URL, Utils) {
    return {
      controller: [
        '_', '$scope', 'FirebaseApi', 'FirebaseArticleFactory',
        function (_, $scope, FirebaseApi, FirebaseArticleFactory) {

          var currentUser;

          $scope.firebaseConnected = false;
          FirebaseApi.$connection
            .onConnect(function () {
              $scope.firebaseConnected = true;
            })
            .onDisconnect(function () {
              $scope.firebaseConnected = false;
            });

          FirebaseArticleFactory
            .$retrieveArticle($scope.articleId)
            .then(function ($article) {
              // register a watch on active users so we can update the list in real time
              var $activeUsers = $article.$activeUsers();
              $activeUsers.$watch(function () {

                // unionize user data so that we don't have a bunch of the same users in the list
                $scope.activeUsers =
                  _.chain($activeUsers)
                    // group users by their id
                    .groupBy(function (user) {
                      return user.id;
                    })
                    // take first user in grouping and use that data along with a count of the number of times they show
                    //  up in the list (number of sessions they have running)
                    .map(function (group) {
                      var groupedUser = group[0];
                      groupedUser.count = group.length;

                      if (currentUser && groupedUser.id === currentUser.id) {
                        groupedUser.displayName = 'You';
                      }

                      return groupedUser;
                    })
                    // sort users by their display names
                    .sortBy(function (user) {
                      return user.displayName === 'You' ? '' : user.displayName;
                    })
                    // now we have a list of unique users along with the number of sessions they have running, sorted by
                    //  their display names
                    .value();

              });

              // register current user active with this article
              $article.$registerCurrentUserActive()
                .then(function (user) {
                  currentUser = user;
                });
            });
        }
      ],
      restrict: 'E',
      scope: {
        articleId: '='
      },
      templateUrl: Utils.path.join(
        COMPONENTS_URL,
        'content',
        'content-edit',
        'content-edit-active-users',
        'content-edit-active-users.html'
      )
    };
  });
