'use strict';

angular.module('content.edit.directive', [
  'cms.config',
  'content.edit.activeUsers',
  'content.edit.authors',
  'content.edit.body',
  'content.edit.controller',
  'content.edit.editorItem',
  'content.edit.linkBrowser',
  'content.edit.mainImage',
  'content.edit.section',
  'content.edit.tags',
  'content.edit.templateChooser',
  'content.edit.title',
  'content.edit.versionBrowser',
  'utils'
])
  .directive('contentEdit', [
    '$window', 'CmsConfig', 'COMPONENTS_URL', 'Utils',
    function ($window, CmsConfig, COMPONENTS_URL, Utils) {
      return {
        controller: 'ContentEdit',
        link: function (scope) {

          scope.articleIsDirty = false;
          scope.$watch('article', function () {
            scope.articleIsDirty = !angular.equals(scope.article, scope.last_saved_article);
          }, true);

          scope.$watch('article.title', function () {
            $window.document.title = CmsConfig.getCmsTitle() +
                ' | Editing ' +
                (scope.article && scope.article.title ? scope.article.title : '');
          });
        },
        restrict: 'E',
        templateUrl: Utils.path.join(
          COMPONENTS_URL,
          'content',
          'content-edit',
          'content-edit.html'
        )
      };
    }]
  );
