'use strict';

describe('BaseModelCollection', function () {

  var $httpBackend;
  var BaseModelCollection;

  beforeEach(function () {
    module('apiServices.config.interceptor', function ($httpProvider) {
      $httpProvider.interceptors.push('ApiConfigInterceptor');
    });
    module('apiServices.base.modelCollection');

    inject(function (_$httpBackend_, _BaseModelCollection_) {
      $httpBackend = _$httpBackend_;
      BaseModelCollection = _BaseModelCollection_;
    });
  });

  describe('$query', function () {
    var collection;

    
  });
});
