'use strict';

describe('LastModifiedGuard', function () {

  var $httpBackend;
  var LastModifiedGuard;
  var moment;
  var testArticle;
  var modifiedProperty = 'last_modified';

  beforeEach(function () {
    module('bulbs.cms.lastModifiedGuard');
    module('moment');

    inject(function (_$httpBackend_, _LastModifiedGuard_, _moment_) {
      $httpBackend = _$httpBackend_;
      LastModifiedGuard = _LastModifiedGuard_;
      moment = _moment_;
    });

    testArticle = {id: 1};
    testArticle[modifiedProperty] = moment().subtract(1, 'minute').format();
  });

  it('should succeed when noone else has saved since last save', function () {
    var resolved = false;

    LastModifiedGuard.checkLastModified(testArticle)
      .then(function () {
        resolved = true;
      });

    $httpBackend.expectGET('/content/1').respond(testArticle);
    $httpBackend.flush();

    expect(resolved).toBe(true);
  });

  it('should reject its check when someone else has saved since last save', function () {
    var responseData;
    var responseStatus;

    var articleOnServer = {
      id: testArticle.id
    };

    articleOnServer[modifiedProperty] =
      moment(testArticle[modifiedProperty]).add(1, 'minute').format();

    LastModifiedGuard.checkLastModified(testArticle)
      .catch(function (resp) {
        responseData = resp.data;
        responseStatus = resp.status;
      });

    $httpBackend.expectGET('/content/1').respond(articleOnServer);
    $httpBackend.flush();

    expect(responseData.id).toBe(articleOnServer.id);
    expect(responseData[modifiedProperty]).toBe(articleOnServer[modifiedProperty]);
    expect(responseStatus).toBe(200);
  });

  it('should reject its check when an error occurs during check', function () {
    var rejectStatus = 400;
    var rejectData = {message: 'failure'};
    var responseData;
    var responseStatus;

    LastModifiedGuard.checkLastModified(testArticle)
      .catch(function (resp) {
        responseData = resp.data;
        responseStatus = resp.status;
      });

    $httpBackend.expectGET('/content/1').respond(rejectStatus, rejectData);
    $httpBackend.flush();

    expect(responseData).toEqual(rejectData);
    expect(responseStatus).toBe(rejectStatus);
  });
});
