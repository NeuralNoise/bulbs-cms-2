'use strict';

angular.module('apiServices.settings', []).constant('API_URL_ROOT', '/cms/api/v1/');

angular.module('bulbsCmsApp')
  .config(function (CmsConfigProvider, CONTENT_PARTIALS_URL, DIRECTIVE_PARTIALS_URL) {
    CmsConfigProvider
      .setApiPath('/cms/api/v1/')
      .setCmsTitle('Bulbs')
      .setLogoUrl('/images/onion-logo.png')
      .setMediaItemsPartialsUrl('/cms/api/partials/media_items/')
      .setPartialsUrl('/views/')
      .setToolbarMappings({
        toolbar: CmsConfigProvider.$get().getPartialsUrl() + 'toolbar.html'
      })
      .addEditPageMapping(
        CONTENT_PARTIALS_URL + 'content_content.html',
        'content_content'
      )
      .setCreateContentTemplateUrl(DIRECTIVE_PARTIALS_URL + 'create-content.html');
  });

angular.module('bulbsCmsApp.settings')
  .constant('AUTO_ADD_AUTHOR', false)
  .constant('COMPONENTS_URL', '/components/')
  .constant('CONTENT_PARTIALS_URL', '/content_type_views/')
  .constant('DIRECTIVE_PARTIALS_URL', '/views/')
  .constant('LOADING_IMG_SRC', '/images/loading.gif')
  .constant('SHARED_URL', '/shared/')
  .constant('STATIC_URL', '/static/')
  .constant('RESTANGULAR_API_URL_ROOT', '/cms/api/v1')
  .constant('TIMEZONE_NAME', 'America/Chicago')
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
