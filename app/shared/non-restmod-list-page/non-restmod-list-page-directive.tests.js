'use strict';

describe('Directive: nonRestmodListPage', function () {
  var $compile,
      $httpBackend,
      $rootScope,
      element;
  var html = '<non-restmod-list-page></non-restmod-list-page>';

  beforeEach(module('bulbsCmsApp'));
  beforeEach(module('cms.templates'));

  beforeEach(inject(function(_$compile_, _$httpBackend_, _$rootScope_) {
    $compile = _$compile_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;

    element = $compile(html)($rootScope);
    $rootScope.$digest();
  }));
});
