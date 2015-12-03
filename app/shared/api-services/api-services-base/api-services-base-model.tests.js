'use strict';

describe('BaseModel', function () {

  var $httpBackend;
  var BaseModel;
  var BaseModelCollection;

  beforeEach(function () {
    module('apiServices.config.interceptor', function ($httpProvider) {
      $httpProvider.interceptors.push('ApiConfigInterceptor');
    });
    module('apiServices.base.model');
    module('apiServices.base.modelCollection');

    inject(function (_$httpBackend_, _BaseModel_, _BaseModelCollection_) {
      $httpBackend = _$httpBackend_;
      BaseModel = _BaseModel_;
      BaseModelCollection = _BaseModelCollection_;
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

      $httpBackend.expectGET('/test-endpoint/' + id).respond(200, {
        id: id,
        title: title
      });
      $httpBackend.flush();

      expect(model.data.id).toBe(id);
      expect(model.data.title).toBe(title);
      expect(model.getState()).toBe('identified');
    });

    it('should return a promise interface', function () {
      var req = model.$get(1);

      expect(typeof(req.then)).toBe('function');
      expect(typeof(req.catch)).toBe('function');
      expect(typeof(req.finally)).toBe('function');
    });

    it('should fail if first input isn\'t a number', function () {
      expect(function () { model.$get(); }).toThrow();
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
      expect(model.getState()).toBe('identified');
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

      expect(model.getState()).toBe('identified');
    });

    it('should return a promise interface', function () {
      var model = new BaseModel('test-endpoint', {});

      var req = model.$save();

      expect(typeof(req.then)).toBe('function');
      expect(typeof(req.catch)).toBe('function');
      expect(typeof(req.finally)).toBe('function');
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

      expect(model.getState()).toBe('deleted');
    });

    it('should fail if attempting to delete a new model', function () {

      var model = new BaseModel('test-endpoint', {});

      expect(function () { model.$delete(); }).toThrow();
    });

    it('should mark state as deleted, prevent other function calls', function () {
      var id = 1;

      var model = new BaseModel('test-endpoint', {
        id: id
      });

      model.$delete();

      $httpBackend.expectDELETE('/test-endpoint/' + id).respond(200);
      $httpBackend.flush();

      expect(function () { model.$get(id); }).toThrow();
      expect(function () { model.$save(); }).toThrow();
      expect(function () { model.$delete(); }).toThrow();
      expect(function () { model.toJSON(); }).toThrow();
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

    it('should fail if model has no id', function () {
      var model = new BaseModel('test-endpoint');

      expect(function () { model.$delete(); }).toThrow();
    });
  });

  describe('toJSON', function () {
    it('should be implemented', function () {
      var TestModel = function (data) {
        BaseModel.call(this, 'test-endpoint', data);
      };
      TestModel.prototype = Object.create(BaseModel.prototype);
      TestModel.prototype.constructor = TestModel;

      var testCollection = new BaseModelCollection('test-endpoint', TestModel, [
        new TestModel({id: 3})
      ]);

      var data = {
        id: 1,
        title: 'something',
        things: testCollection
      };

      var model = new TestModel(data);

      spyOn(testCollection, 'toJSON').andCallThrough();

      expect(JSON.stringify(model)).toEqual(JSON.stringify(data));
      expect(testCollection.toJSON).toHaveBeenCalled();
    });
  });
});
