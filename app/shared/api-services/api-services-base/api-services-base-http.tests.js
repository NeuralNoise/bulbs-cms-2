'use strict';

describe('ApiHttp', function () {

  var $httpBackend;
  var $httpProvider;
  var ApiHttp;

  beforeEach(function () {
    module('apiServices.interceptors.config', function (_$httpProvider_) {
      $httpProvider = _$httpProvider_;

      $httpProvider.interceptors.push('ApiConfigInterceptor');
    });
    module('apiServices.base.http');

    inject(function (_$httpBackend_, _ApiHttp_) {
      $httpBackend = _$httpBackend_;
      ApiHttp = _ApiHttp_;
    });
  });

  describe('$execute', function () {

    it('should make a request based on passed in config', function () {
      var http = new ApiHttp({
        method: 'GET',
        url: '/something/'
      });

      http.$execute();

      $httpBackend.expectGET('/something/').respond(200);
      $httpBackend.flush();

      expect(http.getState()).toBe('executed');
    });

    it('should return a promise interface', function () {

      var http = new ApiHttp({
        method: 'GET',
        url: '/something/'
      });

      var request = http.$execute();

      expect(typeof(request.then)).toBe('function');
      expect(typeof(request.catch)).toBe('function');
      expect(typeof(request.finally)).toBe('function');
    });

    it('should use default transformers, config transformers, then added transformers', function () {
      var calledDefault = false;
      var calledConfig = false;
      var calledAdded = false;

      $httpProvider.defaults.transformResponse = function defaultTransform () {
        calledDefault = true;
      };

      var config = {
        method: 'GET',
        url: '/something/',
        transformResponse: function configTransform () {
          calledConfig = true;
        }
      };

      var http = new ApiHttp(config);

      http.addResponseTransformer(function addedTransform () {
        calledAdded = true;
      });

      http.$execute();

      $httpBackend.expectGET('/something/').respond(200, {});
      $httpBackend.flush();

      expect(calledDefault).toBe(true);
      expect(calledConfig).toBe(true);
      expect(calledAdded).toBe(true);
    });

    it('should error out if attempting to make two requests', function () {

      var http = new ApiHttp({
        method: 'GET',
        url: '/something/'
      });

      http.$execute();

      expect(function () { http.$execute(); }).toThrow();
    });
  });

  describe('abort', function () {

    it('should resolve config timeout defer', function () {

      var http = new ApiHttp({
        method: 'GET',
        url: '/something/'
      });

      http.$execute();

      spyOn(http._abortDefer, 'resolve');

      http.abort();

      expect(http._abortDefer.resolve).toHaveBeenCalled();
      expect(http.getState()).toBe('executed');
    });

    it('should error out if no request is pending', function () {

      var http = new ApiHttp({
        method: 'GET',
        url: '/something/'
      });

      expect(function () { http.abort(); }).toThrow();
    });
  });

  describe('addResponseTransformer', function () {

    it('should error if request has already executed', function () {

      var http = new ApiHttp({
        method: 'GET',
        url: '/something/'
      });

      http.$execute();

      expect(function () { http.addResponseTransformer(function () {}); }).toThrow();
    });
  });
});
