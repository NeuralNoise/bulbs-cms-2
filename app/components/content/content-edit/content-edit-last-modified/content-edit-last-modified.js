'use strict';

angular.module('content.edit.lastModified', [
  'cms.firebase',
  'content.edit.versionBrowser.modal.opener',
  'lodash',
  'moment',
  'PNotify'
])
  .service('ContentEditLastModifiedGuard', [
    '_', 'FirebaseArticleFactory', 'moment', 'PNotify', 'VersionBrowserModalOpener',
    function (_, FirebaseArticleFactory, moment, PNotify, VersionBrowserModalOpener) {
      return {
// HACK : figure out a better setup scheme for this service
        setup: function ($scope) {

          return FirebaseArticleFactory
            .$retrieveArticle($scope.article.id)
            .then(function ($article) {

              var $versions = $article.$versions();
              var currentUser;
              var savePNotify;

              $versions.$loaded(function () {
                $versions.$watch(function (e) {
                  if (e.event === 'child_added') {

                    // order versions newest to oldest then grab the top one which should be the new version
                    var newVersion = _.sortBy($versions, function (version) {
                      return -version.timestamp;
                    })[0];

                    if (currentUser && newVersion.user.id !== currentUser.id) {

                      // close any existing save pnotify
                      if (savePNotify) {
                        savePNotify.remove();
                      }

                      var msg = '<b>' +
                                  newVersion.user.displayName +
                                '</b> -- ' +
                                  moment(newVersion.timestamp).format('MMM Do YYYY, h:mma') +
                                '<br>';
                      if ($scope.articleIsDirty) {
                        msg += ' You have unsaved changes that may conflict when you save.';
                      }
                      msg += ' Open the version browser to see their latest version.';

                      // this isn't the current user that saved, so someone else must have saved, notify this user
                      savePNotify = new PNotify({
                        title: 'Another User Saved!',
                        text: msg,
                        type: 'error',
                        mouse_reset: false,
                        hide: false,
                        confirm: {
                          confirm: true,
                          buttons: [{
                            text: 'Open Version Browser',
                            addClass: 'btn-primary',
                            click: function (notice) {
                              notice.mouse_reset = false;
                              notice.remove();
                              VersionBrowserModalOpener.open($scope, $scope.article);
                            }
                          }, {
                            addClass: 'hide'
                          }]
                        },
                        buttons: {
                          closer_hover: false,
                          sticker: false
                        }
                      });
                    }
                  }
                });
              });

              // register current user active with this article
              $article.$registerCurrentUserActive()
                .then(function (user) {
                  currentUser = user;
                });

              // who knows what kind of promises you might have in the future? so return the article object for chains
              return $article;

            });
        }
      };
    }
  ]);
