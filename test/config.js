'use strict';

angular.module('apiServices.settings', []).constant('API_URL_ROOT', '/cms/api/v1/');

angular.module('bulbsCmsApp')
  .config(function ($httpProvider, CmsConfigProvider, CONTENT_PARTIALS_URL,
      DIRECTIVE_PARTIALS_URL, PARTIALS_URL) {

    CmsConfigProvider.setApiPath('/cms/api/v1/');
    CmsConfigProvider.setLogoUrl('/images/onion-logo.png');
    CmsConfigProvider.setToolbarMappings({
      toolbar: PARTIALS_URL + 'toolbar.html'
    });
    CmsConfigProvider.addEditPageMapping(
      CONTENT_PARTIALS_URL + 'content_content.html',
      'content_content'
    );
    CmsConfigProvider.setCreateContentTemplateUrl(DIRECTIVE_PARTIALS_URL + 'create-content.html');

    // HACK : splice out TokenAuthInterceptor so test requests can go through,
    //  the correct way to do this would to be testing each module in isolation
    //  so that app-level configs don't interfere with the testing of a single
    //  module
    var interceptors = $httpProvider.interceptors;
    var index = $httpProvider.interceptors.indexOf('TokenAuthInterceptor');
    interceptors.splice(index, 1);
  });

angular.module('bulbsCmsApp.settings')
  .constant('AUTO_ADD_AUTHOR', false)
  .constant('CMS_NAMESPACE', 'Bulbs')
  .constant('COMPONENTS_URL', '/components/')
  .constant('CONTENT_PARTIALS_URL', '/content_type_views/')
  .constant('DIRECTIVE_PARTIALS_URL', '/views/')
  .constant('LOADING_IMG_SRC', '/images/loading.gif')
  .constant('MEDIA_ITEM_PARTIALS_URL', '/cms/api/partials/media_items/')
  .constant('PARTIALS_URL', '/views/')
  .constant('SHARED_URL', '/shared/')
  .constant('STATIC_URL', '/static/')
  .constant('RESTANGULAR_API_URL_ROOT', '/cms/api/v1')
  .constant('VIDEO_EMBED_URL', 'http://www.avclub.com/video/embed?id=')
  .constant('firebaseApiConfig', {
      FIREBASE_ROOT: 'bulbs-cms-test',
      FIREBASE_URL: 'https://luminous-fire-8340.firebaseio.com/'
  })
  .constant('TAR_OPTIONS', {
    namespace: 'Woodruff',
    endpoint: '/ads/targeting'
  })
  .constant('ZERO_CLIPBOARD_SWF', '/static/ZeroClipboard.swf');
