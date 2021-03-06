'use strict';
/*jshint -W030 */

describe('Directive: specialCoverageEdit', function () {

  var
    $q,
    $directiveScope,
    $rootScope;

  beforeEach(function () {
    module('bulbsCmsApp');
    module('bulbsCmsApp.mockApi');
    module('cms.templates');

    angular.module('specialCoverage.edit').constant('EXTERNAL_URL', 'onion.local');

    inject(function ($, _$q_, $compile, _$rootScope_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      var element = $compile('<special-coverage-edit model-id="1"></special-coverage-edit>')($rootScope.$new());
      $rootScope.$digest();

      $directiveScope = element.isolateScope();
    });
  });

  describe('campaignId field', function () {

    it('default campaign mapping is empty', function () {
      expect($directiveScope.tunicCampaignIdMapping).to.eql({});
    });

    describe('tunicCampaignFormatter', function () {

      it('should lookup campaign object by ID', function () {
        $directiveScope.tunicCampaignIdMapping = {
          123: {
            name: 'Mike Burger',
            number: 123
          }
        };
        expect($directiveScope.tunicCampaignFormatter(123)).to.equal('Mike Burger - 123');
      });

      it('should return undefined if campaign not cached', function () {
        expect($directiveScope.tunicCampaignFormatter()).to.be.undefined;
        expect($directiveScope.tunicCampaignFormatter(123)).to.be.undefined;
      });
    });

    describe('searchCampaigns', function () {

      beforeEach(function() {

        sinon.stub($directiveScope.model, '$searchCampaigns').returns($q.when([
          {
            name: 'one',
            id: 1,
            number: 1
          },
          {
            name: 'two',
            id: 2,
            number: 2
          }
        ]));
      });

      it('should process search results', function () {

        var searchResults;
        $directiveScope.searchCampaigns('one').then(function (results) {
          searchResults = results;
        });

        $rootScope.$apply();

        expect($directiveScope.model.$searchCampaigns).to.have.been.calledWith({search: 'one'});
        expect(searchResults).to.eql([1, 2]);
        expect($directiveScope.tunicCampaignIdMapping).to.eql({
          1: {
            name: 'one',
            id: 1,
            number: 1,
          },
          2: {
            name: 'two',
            id: 2,
            number: 2,
          }
        });
      });
    });
  });

});
