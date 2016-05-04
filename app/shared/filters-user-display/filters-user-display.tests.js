'use strict';

describe('Filter: userDisplay', function () {
  beforeEach(module('filters.userDisplay'));

  var user;
  beforeEach(inject(function ($filter) {
    user = $filter('userDisplay');
  }));

  it('should return empty string when there is no user', function () {
    expect(user(null)).to.equal('');
  });

  it('should return first and last name when present', function () {
    expect(user({
      first_name: 'First',
      last_name: 'Last'
    })).to.equal('First Last');
  });

  it('should return username when no first and last name', function () {
    expect(user({
      username: 'username'
    })).to.equal('username');
  });
});
