'use strict';

describe('Content', function () {

  var $httpBackend;
  var ApiError;
  var ApiHttp;
  var Content;

  beforeEach(function () {
    module('apiServices.config.interceptor', function ($httpProvider) {
      $httpProvider.interceptors.push('ApiConfigInterceptor');
    });
    module('apiServices.content.factory');

    inject(function (_$httpBackend_, _ApiError_, _ApiHttp_, _Content_) {
      $httpBackend = _$httpBackend_;
      ApiError = _ApiError_;
      ApiHttp = _ApiHttp_;
      Content = _Content_;
    });
  });

  describe('$get', function () {
    it('should be able to retrieve model data by id', function () {

      var id = 1;
      var title = 'hello';
      var content = new Content();

      content.$get(id);

      $httpBackend.expectGET('/content/' + id).respond({
        id: id,
        title: title
      });
      $httpBackend.flush();

      expect(content.data.id).toBe(id);
      expect(content.data.title).toBe(title);
    });

    it('should return a promise interface', function () {
      var content = new Content();

      var req = content.$get(1);

      expect(typeof(req.then)).toBe('function');
      expect(typeof(req.catch)).toBe('function');
      expect(typeof(req.finally)).toBe('function');
    });
  });

  describe('$save', function () {
    it('should be able to save a new model', function () {
      var id = 1;
      var title = 'some new content';
      var content = new Content({
        title: title
      });

      content.$save();

      $httpBackend.expectPOST('/content').respond(200, {
        id: id
      });
      $httpBackend.flush();

      expect(content.data.id).toBe(id);
      expect(content.data.title).toBe(title);
    });

    it('should be able to update an existing model', function () {
      var id = 1;
      var title = 'some new content';
      var content = new Content({
        id: id,
        title: title
      });

      content.$save();

      $httpBackend.expectPUT('/content/' + id).respond(200, {
        id: id
      });
      $httpBackend.flush();
    });

    it('should return a promise interface', function () {
      var content = new Content();

      var req = content.$save();

      expect(typeof(req.then)).toBe('function');
      expect(typeof(req.catch)).toBe('function');
      expect(typeof(req.finally)).toBe('function');
    });
  });

  describe('$delete', function () {
    it('should be able to delete', function () {
      var id = 1;

      var content = new Content({
        id: id
      });

      content.$delete();

      $httpBackend.expectDELETE('/content/' + id).respond(200);
      $httpBackend.flush();
    });

    it('should fail if attempting to delete a new model', function () {

      var content = new Content();

      expect(content.$delete).toThrowError();
    });

    it('should return a promise interface', function () {
      var content = new Content({
        id: 1
      });

      var req = content.$delete();

      expect(typeof(req.then)).toBe('function');
      expect(typeof(req.catch)).toBe('function');
      expect(typeof(req.finally)).toBe('function');
    });
  });

  it('should error out if attempting to do multiple requests', function () {

    // TODO : add test code here
    throw new Error('Not implemented yet.');
  });

  it('should allow forcing new request if one is already pending', function () {

    // TODO : add test code here
    throw new Error('Not implemented yet.');
  });
});
