'use strict';

describe('Directive: lazyInclude', function () {

  // load the directive's module
  beforeEach(module('bulbsCmsApp'));

  var scope;
  var _Gettemplate;
  var _compile;

  var html = '<div style="display: none;" lazy-include template="test.html"></div>';

  beforeEach(inject(function ($rootScope, $compile, Gettemplate) {
    scope = $rootScope.$new();
    _Gettemplate = Gettemplate;
    _compile = $compile;
  }));

  it('should not call getTemplate if the element is not visible', function(){
    sinon.stub(_Gettemplate, 'get');
    var element = angular.element(_compile('<div style="display: none;" lazy-include template="test.html"></div>')(scope));
    expect(_Gettemplate.get.called).to.equal(false);
  });
});
