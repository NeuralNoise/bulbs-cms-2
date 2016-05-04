'use strict';

describe('Controller: ContentworkflowCtrl', function () {

  // load the controller's module
  beforeEach(module('bulbsCmsApp'));

  var ContentworkflowCtrl;
  var scope;
  var modalService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $modal) {
    modalService = $modal;
    scope = $rootScope.$new();
    ContentworkflowCtrl = $controller('ContentworkflowCtrl', {
      $scope: scope,
      $modal: modalService
    });

    sinon.stub(modalService, 'open').returns({
      result: {
        then: function () {}
      }
    });
  }));

  describe('should contain modal opening functions for various modals:', function () {
    it('trashContentModal', function () {
      scope.trashContentModal();
      expect(modalService.open.called).to.equal(true);
    });

    it('pubTimeModal', function () {
      scope.pubTimeModal();
      expect(modalService.open.called).to.equal(true);
    });

    it('changelogModal', function () {
      scope.changelogModal();
      expect(modalService.open.called).to.equal(true);
    });

    it('thumbnailModal', function () {
      scope.thumbnailModal();
      expect(modalService.open.called).to.equal(true);
    });

    it('versionBrowserModal', function () {
      scope.versionBrowserModal();
      expect(modalService.open.called).to.equal(true);
    });

    it('descriptionModal', function () {
      scope.descriptionModal();
      expect(modalService.open.called).to.equal(true);
    });
  });

  describe('function getStatus is a utility function for determining if an article is unpublished/scheduled/published', function () {
    it('should return "unpublished" if article has no publish time set', function () {
      expect(scope.getStatus({})).to.equal('unpublished');
      expect(scope.getStatus({published: null})).to.equal('unpublished');
    });

    it('should return "scheduled" if article has publish time in future', function () {
      expect(scope.getStatus({published: '2999-04-08T15:35:15.118Z'})).to.equal('scheduled');
    });

    it('should return "published" if article has publish time in past', function () {
      expect(scope.getStatus({published: '1999-04-08T15:35:15.118Z'})).to.equal('published');
    });
  });
});
