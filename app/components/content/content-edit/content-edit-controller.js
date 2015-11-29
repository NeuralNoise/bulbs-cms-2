'use strict';

angular.module('content.edit.controller', [
  'bulbs.cms.lastModifiedGuard',
  'bulbs.cms.unsavedChangesGuard',
  'content.edit.lastModified',
  'content.edit.lastModified.modal.factory',
  'content.edit.linkBrowser',
  'content.edit.versionBrowser.api',
  'cms.config'
])
  .controller('ContentEdit', function (
      $, $scope, $rootScope, $routeParams, $window, $location, $timeout, $q, $modal,
      _, moment, VersionStorageApi, ContentFactory, LastModifiedGuard, LastModifiedModal,
      LinkBrowser, VersionBrowserModalOpener, CmsConfig, UnsavedChangesGuard,
      ContentEditLastModifiedGuard) {

    $scope.PARTIALS_URL = CmsConfig.getPartialsUrl();
    $scope.MEDIA_ITEM_PARTIALS_URL = CmsConfig.getMediaItemsPartialsUrl();
    $scope.page = 'edit';
    $scope.saveArticleDeferred = null;
    $scope.articleId = $routeParams.id;

    $scope.getContent = function () {
      return ContentFactory.one('content', $scope.articleId).get()
        .then(function (data) {
          $scope.article = data;
          $scope.last_saved_article = angular.copy(data);

          ContentEditLastModifiedGuard.setup($scope);
        });
    };

    $scope.saveArticleIfDirty = function () {
      /*this is only for operations that trigger a saveArticle (e.g. send to editor)
      if the article isn't dirty, we don't want to fire saveArticle
      and possibly trigger the last-modified-guard or whatever else*/
      if ($scope.articleIsDirty) {
        return $scope.saveArticle();
      } else {
        //resolves immediately with article as the resolved value
        //(saveArticle resolves to article as well)
        return $q.when($scope.article);
      }
    };

    $scope.saveArticle = function () {
      if ($scope.saveArticleDeferred === null ||
          $scope.saveArticleDeferred.promise.$$state.status !== 0) {
        // there isn't a article already in the process of saving, use a new deferred
        $scope.saveArticleDeferred = $q.defer();
      }

      LastModifiedGuard.checkLastModified($scope.article)
        .then(function () {
          // okay to save, move to next step
          $scope.postValidationSaveArticle();
        })
        .catch(function (resp) {
          if (resp.status === 200) {
            var articleOnServer = resp.data;

            // there's been another save since our last save, prevent saving without
            //  user validation

            $scope.saveArticleDeferred.reject();

            var modalScope = $scope.$new(true);
            modalScope.modalOnLoadChanges = function () {
              // pull article from server and replace whatever data we need to
              //  show the newest version
              _.each(articleOnServer, function (value, key) {
                $scope.article[key] = value;
              });
              $scope.articleIsDirty = true;
            };
            modalScope.modalOnOverwriteChanges = function () {
              $scope.postValidationSaveArticle();
            };
            modalScope.articleOnServer = articleOnServer;
            modalScope.articleOnPage = $scope.article;

            // open modal
            new LastModifiedModal(modalScope);
          } else {
            // some other issue happened
            saveArticleErrorCbk(resp);
          }
        });

      return $scope.saveArticleDeferred.promise;
    };

    var saveArticleErrorCbk = function (data) {
      if (status === 400) {
        $scope.errors = data;
      }
      $scope.saveArticleDeferred.reject();
    };

    $scope.postValidationSaveArticle = function () {
      if ($scope.article.status !== 'Published') {
        $scope.article.slug = $window.URLify($scope.article.title, 50);
      }

      // update article
      $scope.article.put()
        .then(function (data) {
          // store a version with version api
          VersionStorageApi.$create($scope.article, $scope.articleIsDirty);

          $scope.article = data;
          $scope.last_saved_article = angular.copy(data);

          $scope.articleIsDirty = false;
          $scope.errors = null;

          $location.search('rating_type', null); //maybe just kill the whole query string with $location.url($location.path())
          $scope.saveArticleDeferred.resolve(data);
        })
        .catch(saveArticleErrorCbk);

      return $scope.saveArticleDeferred.promise;
    };

    $scope.trashSuccessCbk = function () {
      //delaying this so the user isn't sent back before the trashed content is removed from the listing view
      $timeout(function () {
        $window.history.back();
      }, 1500);
    };

    // finish initialization
    UnsavedChangesGuard.enable({
      unsavedChangesCheckCallback: function () {
        return $scope.articleIsDirty;
      }
    });
    $scope.getContent();
  });
