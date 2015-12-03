'use strict';

describe('BaseModelCollection', function () {

  var $httpBackend;
  var BaseModelCollection;
  var TestModel;

  beforeEach(function () {
    module('apiServices.config.interceptor', function ($httpProvider) {
      $httpProvider.interceptors.push('ApiConfigInterceptor');
    });
    module('apiServices.base.model');
    module('apiServices.base.modelCollection');

    inject(function (_$httpBackend_, _BaseModel_, _BaseModelCollection_) {
      $httpBackend = _$httpBackend_;
      BaseModelCollection = _BaseModelCollection_;

      TestModel = function (data) {
        _BaseModel_.call(this, 'test-endpoint', data);
      };
      TestModel.prototype = Object.create(_BaseModel_.prototype);
      TestModel.prototype.constructor = TestModel;
    });
  });

  describe('$query', function () {
    var collection;

    it('should retrieve a list of models and cast them', function () {

      var model1Id = 1;
      var model2Id = 2;
      var model1Title = 'hello';
      var model2Title = 'goodbye';
      var count = 20;

      var collection = new BaseModelCollection('test-endpoint', TestModel);

      collection.$query();

      $httpBackend.expectGET('/test-endpoint').respond(200, {
        count: count,
        results: [{
          id: model1Id,
          title: model1Title
        }, {
          id: model2Id,
          title: model2Title
        }]
      });
      $httpBackend.flush();

      expect(collection.data[0] instanceof TestModel).toBe(true);
      expect(collection.data[0].data.id).toBe(model1Id);
      expect(collection.data[0].data.title).toBe(model1Title);
      expect(collection.data[1] instanceof TestModel).toBe(true);
      expect(collection.data[1].data.id).toBe(model2Id);
      expect(collection.data[1].data.title).toBe(model2Title);
    });

    it('should error if first argument is provided and is not an object', function () {
      expect(function () { collection.$query('abc') }).toThrow();
    });
  });

  describe('toJSON', function () {
    it('should be implemented', function () {
      var testModel1 = new TestModel();
      var testModel2 = new TestModel();

      var data = [testModel1, testModel2];

      var collection = new BaseModelCollection('test-endpoint', TestModel, data);

      spyOn(testModel1, 'toJSON').andCallThrough();
      spyOn(testModel2, 'toJSON').andCallThrough();

      expect(JSON.stringify(collection)).toEqual(JSON.stringify(data));
      expect(testModel1.toJSON).toHaveBeenCalled();
      expect(testModel2.toJSON).toHaveBeenCalled();
    });
  });
});
