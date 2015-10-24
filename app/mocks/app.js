'use strict';

angular.module('app.dev', [
  'bulbsCmsApp.mockApi',
  'bulbsCmsApp',
  'bulbs.api.mock',
  'bulbs.cms.development.config'
])
  .config([
    '$httpProvider', 'CmsConfigProvider', 'CmsDevelopmentConfigProvider',
      'DIRECTIVE_PARTIALS_URL', 'FirebaseConfigProvider',
      'StatusFilterOptionsProvider', 'TokenAuthConfigProvider',
    function ($httpProvider, CmsConfigProvider, CmsDevelopmentConfigProvider,
        DIRECTIVE_PARTIALS_URL, FirebaseConfigProvider,
        StatusFilterOptionsProvider, TokenAuthConfigProvider) {

      StatusFilterOptionsProvider.setStatuses([
        {label: 'Filter 1', key: 'filter1key', value: 'charizard'},
        {label: 'Filter 2', key: 'filter2key', value: function(){ return moment().unix(); }},
        {label: 'Filter 3', key: 'filter2key', value: function(){ return 'cool'; }},
        {label: 'All', key: null, value: null}
      ]);

      CmsConfigProvider
          .setApiPath('/cms/api/v1/')
          .setLogoUrl('/images/onion-logo.png')
          .setPartialsUrl('/views/')
          .setToolbarMappings({
            toolbar: CmsConfigProvider.$get().getPartialsUrl() + 'toolbar.html'
          })
          .addEditPageMapping(
            '/content_type_views/content_content.html',
            'content_content'
          )
          .setCreateContentTemplateUrl(DIRECTIVE_PARTIALS_URL + 'create-content.html')
          .setImageServerRoot('http://clickholeimg.local')
          .setImageServerApiKey('some-bc-api-key')
          .setInlineObjectsUrl('/static/inline-objects.json');

      // firebase settings
      var firebaseSecretToken = '';
      var firebaseDbUrl = '';

      CmsDevelopmentConfigProvider.setFirebaseSecretToken(firebaseSecretToken);
      FirebaseConfigProvider.setDbUrl(firebaseDbUrl);

      TokenAuthConfigProvider.setLogoUrl('/images/onion-logo.png');
      TokenAuthConfigProvider.setApiHost('');

      $httpProvider.interceptors.push('TokenAuthInterceptor');

    }
  ]);
