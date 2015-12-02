'use strict';

describe('BaseModel', function () {

  var $httpBackend;
  var ApiError;
  var ApiHttp;
  var BaseModel;

  beforeEach(function () {
    module('apiServices.config.interceptor', function ($httpProvider) {
      $httpProvider.interceptors.push('ApiConfigInterceptor');
    });
    module('apiServices.base.model');

    inject(function (_$httpBackend_, _ApiError_, _ApiHttp_, _BaseModel_) {
      $httpBackend = _$httpBackend_;
      ApiError = _ApiError_;
      ApiHttp = _ApiHttp_;
      BaseModel = _BaseModel_;
    });
  });

  describe('$get', function () {
    var model;

    beforeEach(function () {
      model = new BaseModel('test-endpoint', {});
    });

    it('should be able to retrieve model data by id', function () {

      var id = 1;
      var title = 'hello';

      model.$get(id);

      $httpBackend.expectGET('/test-endpoint/' + id).respond({
        id: id,
        title: title
      });
      $httpBackend.flush();

      expect(model.data.id).toBe(id);
      expect(model.data.title).toBe(title);
    });

    it('should return a promise interface', function () {
      var req = model.$get(1);

      expect(typeof(req.then)).toBe('function');
      expect(typeof(req.catch)).toBe('function');
      expect(typeof(req.finally)).toBe('function');
    });

    it('should prevent multiple requests', function () {
      model.$get(1);
      expect(model.$get).toThrow();
    });

    it('should allow a new request to be forced, aborting pending request', function () {
      model.$get(1);
      expect(function () { model.$get(1, true); }).not.toThrow();
    });

    it('should fail if first input isn\'t a number', function () {
      expect(model.$get).toThrow();
    });
  });

  describe('$save', function () {
    it('should be able to save a new model', function () {
      var id = 1;
      var title = 'some new model';
      var model = new BaseModel('test-endpoint', {
        title: title
      });

      model.$save();

      $httpBackend.expectPOST('/test-endpoint').respond(200, {
        id: id
      });
      $httpBackend.flush();

      expect(model.data.id).toBe(id);
      expect(model.data.title).toBe(title);
    });

    it('should be able to update an existing model', function () {
      var id = 1;
      var title = 'some new model';
      var model = new BaseModel('test-endpoint', {
        id: id,
        title: title
      });

      model.$save();

      $httpBackend.expectPUT('/test-endpoint/' + id).respond(200, {
        id: id
      });
      $httpBackend.flush();
    });

    it('should return a promise interface', function () {
      var model = new BaseModel('test-endpoint', {});

      var req = model.$save();

      expect(typeof(req.then)).toBe('function');
      expect(typeof(req.catch)).toBe('function');
      expect(typeof(req.finally)).toBe('function');
    });

    it('should prevent multiple requests', function () {
      var model = new BaseModel('test-endpoint', {});

      model.$save();
      expect(model.$save).toThrow();
    });

    it('should allow a new request to be forced, aborting pending request', function () {
      var model = new BaseModel('test-endpoint', {});

      model.$save();
      expect(function () { model.$save(true); }).not.toThrow();
    });
  });

  describe('$delete', function () {
    it('should be able to delete', function () {
      var id = 1;

      var model = new BaseModel('test-endpoint', {
        id: id
      });

      model.$delete();

      $httpBackend.expectDELETE('/test-endpoint/' + id).respond(200);
      $httpBackend.flush();
    });

    it('should fail if attempting to delete a new model', function () {

      var model = new BaseModel('test-endpoint', {});

      expect(model.$delete).toThrow();
    });

    it('should return a promise interface', function () {
      var model = new BaseModel('test-endpoint', {
        id: 1
      });

      var req = model.$delete();

      expect(typeof(req.then)).toBe('function');
      expect(typeof(req.catch)).toBe('function');
      expect(typeof(req.finally)).toBe('function');
    });

    it('should prevent multiple requests', function () {
      var model = new BaseModel('test-endpoint', {});

      model.$delete();
      expect(model.$delete).toThrow();
    });

    it('should allow a new request to be forced, aborting pending request', function () {
      var model = new BaseModel('test-endpoint', {});

      model.$delete();
      expect(function () { model.$delete(true); }).not.toThrow();
    });
  });
});
