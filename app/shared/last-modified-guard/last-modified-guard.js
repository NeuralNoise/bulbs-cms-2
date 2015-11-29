'use strict';

angular.module('bulbs.cms.lastModifiedGuard', [
  'contentServices.factory',
  'moment'
])
  .service('LastModifiedGuard', [
    '$q', 'ContentFactory', 'moment',
    function ($q, ContentFactory, moment) {

      return {
        checkLastModified: function (article) {
          return $q(function (resolve, reject) {
            ContentFactory.one('content', article.id).get()
              .then(function (articleOnServer) {
                if (articleOnServer.hasOwnProperty('last_modified') &&
                    article.hasOwnProperty('last_modified') &&
                    moment(articleOnServer.last_modified).isAfter(article.last_modified)) {
                  // someone else has saved since last save, reject
                  reject({
                    data: articleOnServer,
                    status: 200
                  });
                } else {
                  // no save has been done since last attempt, resolve
                  resolve();
                }
              })
              .catch(function (resp) {
                reject({
                  data: resp.data,
                  status: resp.status
                });
              });
          });
        }
      };
    }
  ]);
