'use strict';

angular.module('bulbsCmsApp.mockApi.lineItem', [
  'bulbsCmsApp.mockApi.data'
])
  .run(['_', '$httpBackend', 'mockApiData',
  function (_, $httpBackend, mockApiData) {

    var reContributor = {
      list: /^\/cms\/api\/v1\/line-items\/(\?.*)?$/,
    };
    mockApiData.contributors = [{
      id: 1,
      first_name: 'Big',
      last_name: 'Papa',
    }];
    $httpBackend.whenGET(reContributor.list).respond(function (method, url, data) {
      return [200, {
        count: mockApiData.contributors.length,
        results: mockApiData.contributors
      }];
    });
  }])