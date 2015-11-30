'use strict';

/**
 * When adding links in the editor, allows searching through content to link.
 */
angular.module('content.edit.linkBrowser', [
  'apiServices.config',
  'jquery'
])
  .service('LinkBrowser', function ($, $http, ApiConfig) {
     window.linkBrowser = function(term, resultsElement) {
       resultsElement.html('<div class="items"></div><hr><span class="type">Articles</span><ul class="content"></ul>');

       $http.get(ApiConfig.buildBackendApiUrl('search/autocomplete?q=' + term))
         .success(function(resp) {
           $('.items', resultsElement).html(resp);
         });

       $http.get(ApiConfig.buildBackendApiUrl('content/?search=' + term))
         .success(function(resp) {
           for (var i=0; i < Math.min(resp.count, 20); i ++) {
             var link = $('<A>')
               .attr('href',resp.results[i].absolute_url)
               .html('<span class="feature_type">' + resp.results[i].feature_type + '</span>' + resp.results[i].title);
             $('.content', resultsElement).append($('<li>').append(link));
           }
         });
     };
  });
