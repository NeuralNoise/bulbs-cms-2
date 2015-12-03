'use strict';

describe('Requestor', function () {

  var $httpBackend;
  var ApiHttp;
  var requestor;

  beforeEach(function () {
    module('apiServices.interceptors.config', function ($httpProvider) {
      $httpProvider.interceptors.push('ApiConfigInterceptor');
    });
    module('apiServices.base.http');
    module('apiServices.base.requestor');

    inject(function (_$httpBackend_, _ApiHttp_, Requestor) {
      $httpBackend = _$httpBackend_;
      ApiHttp = _ApiHttp_;
      requestor = new Requestor();
    });
  });

  describe('_executeRequest', function () {

    it('should error if first argument isn\'t an ApiHttp', function () {
      expect(function () { requestor._executeRequest({}) }).toThrow();
    });

    it('should prevent multiple requests', function () {
      var req1 = new ApiHttp({
        method: 'GET',
        url: 'testing-url'
      });
      var req2 = new ApiHttp({
        method: 'GET',
        url: 'testing-url'
      });

      requestor._executeRequest(req1);

      expect(function () { requestor._executeRequest(req2); }).toThrow();
    });

    it('should allow a request to be forced, aborting pending request', function () {
      var req1 = new ApiHttp({
        method: 'GET',
        url: 'testing-url'
      });
      var req2 = new ApiHttp({
        method: 'GET',
        url: 'testing-url'
      });

      requestor._executeRequest(req1);

      expect(function () { requestor._executeRequest(req2, true); }).not.toThrow();
    });
  });
});
