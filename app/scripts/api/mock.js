'use strict';

angular.module('bulbs.api.mock', []).run(function ($httpBackend) {
  $httpBackend.when('OPTIONS', /^\/cms\/api\/v1\/.*/).respond('');

  // Authors Service
  $httpBackend.when('GET', /^\/cms\/api\/v1\/author\/?\?.*/).respond([
    {
      id: 1,
      first_name: 'T. Herman',
      last_name: 'Zweibel',
      username: 'tzwiebel'
    },
    {
      id: 2,
      first_name: 'Chris',
      last_name: 'Sinchok',
      username: 'csinchok'
    },
    {
      id: 3,
      first_name: 'Adam',
      last_name: 'Wentz',
      username: 'csinchok'
    },
    {
      id: 4,
      first_name: 'Andrew',
      last_name: 'Kos',
      username: 'akos'
    },
    {
      id: 5,
      first_name: 'Shawn',
      last_name: 'Cook',
      username: 'scook'
    }
  ]);
  $httpBackend.when('GET', /^\/cms\/api\/v1\/author\/\d+/).respond({
    id: 2,
    first_name: 'Chris',
    last_name: 'Sinchok',
    username: 'csinchok'
  });

  // Contribution Service
  $httpBackend.when('GET', new RegExp('^/cms/api/v1/content/[0-9]+/contributions/?$')).respond([
    {
      id: 1,
      content: 12345,
      contributor: {
        id: 2,
        first_name: 'Chris',
        last_name: 'Sinchok',
        username: 'csinchok'
      },
      force_pay: false,
      force_date: '2015-8-14',
      rate: 60,
      override_rate: 100,
      role: 1,
      payment_type: 'Flat Rate'
    },
    {
      id: 1,
      content: 12345,
      contributor: {
        id: 2,
        first_name: 'Adam',
        last_name: 'Wentz',
        username: 'awentz'
      },
      force_pay: true,
      force_date: null,
      rate: 70,
      override_rate: null,
      role: 2,
      payment_type: 'Hourly'
    },
    {
      id: 3,
      content: 12345,
      contributor: {
        id: 3,
        first_name: 'Cameron',
        last_name: 'Lowe',
        username: 'Favorite Guy'
      },
      force_pay: false,
      force_date: null,
      rate: null,
      override_rate: null,
      role: 3,
      payment_type: 'Manual'
    }
  ]);
  // Contribution Service
  $httpBackend.when('POST', new RegExp('^/cms/api/v1/content/[0-9]+/contributions/?')).respond(function (method, url, data, headers) {
    return [200, data, {}];
  });

  // ContributionRole Service
  $httpBackend.when('GET', new RegExp('^/cms/api/v1/contributions/role/?')).respond([
    {
      id: 1,
      name: 'Author'
    },
    {
      id: 2,
      name: 'Editor'
    },
    {
      id: 3,
      name: 'Programmer'
    }
  ]);

  $httpBackend.when('GET', new RegExp('^/cms/api/v1/contributions/staff/?')).respond([
    {
      id: 1,
      full_name: 'Big Papa',
      first_name: 'Big',
      last_name: 'Papa'
    },
    {
      id: 2,
      full_name: 'Medium Papa',
      first_name: 'Medium',
      last_name: 'Papa'
    },
    {
      id: 3,
      full_name: 'Small Papa',
      first_name: 'Small',
      last_name: 'Papa'
    }
  ]);

  // LineItem Service
  $httpBackend.when('GET', new RegExp('^/cms/api/v1/line-items/?')).respond([
    {
      id:1,
      contributor: 'Alasdair Wilkins',
      amount: 25,
      note: 'A Note for the ages',
      date: '2015-05-01T16:20:00Z'
    },
    {
      id:2,
      contributor: 'Brandon Nowalk',
      amount: 100,
      note: 'Simpson Week 2015 Illustration',
      date: '2015-05-01T16:20:00Z'
    },
    {
      id:3,
      contributor: 'Cameron Esposito',
      amount: 120,
      note: 'Something Else',
      date: '2015-05-01T16:20:00Z'
    },
    {
      id:4,
      contributor: 'Carline Framke',
      amount: 25,
      note: 'Something Else',
      date: '2015-05-01T16:20:00Z'
    },
    {
      id:5,
      contributor: 'Jason Heller',
      amount: 35,
      note: 'Something Else',
      date: '2015-05-01T16:20:00Z'
    }
  ]);

  // ContributionReporting Service
  $httpBackend.when('GET', new RegExp('^/cms/api/v1/contributions/reporting/?')).respond([
    {
      id: 1,
      role: 'Author',
      notes: '',
      rate: '$' + 100,
      content: {
        id: 1,
        title: 'Just an Article',
        url: '/articles/just-an-article-1',
        content_type: 'Article',
        feature_type: 'ICYMI',
        published: '2011-04-03T16:20:00Z'
      },
      user: {
        id: 1,
        username: 'csinchok',
        full_name: 'Chris Sinchok',
      }
    },
    {
      id: 2,
      role: 'Editor',
      notes: 'Did a real solid job editing this',
      rate: '$' + 160,
      content: {
        id: 1,
        title: 'Just an Article',
        url: '/articles/just-an-article-1',
        content_type: 'Article',
        feature_type: 'ICYMI',
        published: '2011-04-03T16:20:00Z'
      },
      user: {
        id: 2,
        username: 'awentz',
        full_name: 'Adam Wentz',
      }
    },
    {
      id: 3,
      role: 'Lookie-Loo',
      notes: 'Just kinda sat around',
      rate: '$' + 70,
      content: {
        id: 1,
        title: 'Just an Article',
        url: '/articles/just-an-article-1',
        content_type: 'Article',
        feature_type: 'ICYMI',
        published: '2011-04-03T16:20:00Z'
      },
      user: {
        id: 1,
        username: 'sbloomfield',
        full_name: 'Sean Bloomfield',
      }
    },
  ]);

  // ContentCompliance Service
  $httpBackend.when('GET', new RegExp('^/cms/api/v1/contributions/contentreporting/?')).respond([
    {
      id: 1,
      title: 'Just an Article',
      url: '/articles/just-an-article-1',
      content_type: 'Article',
      feature_type: 'ICYMI',
      published: '2011-04-03T16:20:00Z',
      value: '$' + 670
    },
    {
      id: 2,
      title: 'Another stand out article',
      url: '/articles/another-stand-out-2',
      content_type: 'Article',
      feature_type: 'ICYMI',
      published: '2011-04-03T16:20:00Z',
      value: '$' + 178
    },
    {
      id: 3,
      title: 'Perhaps this article is just fine',
      url: '/articles/perhaps-this-article-3',
      content_type: 'Article',
      feature_type: 'ICYMI',
      published: '2011-04-03T16:20:00Z',
      value: '$' + 300
    }
  ]);

  // TODO: Do this better.
  $httpBackend.when('GET', new RegExp('^/cms/api/v1/content/[0-9]+/?$')).respond({
    id: 6,
    title: 'No Thumbnail Here Folks',
    feature_type: 'Thumbnails On Holiday',
    slug: 'thumbnails-holiday-6',
    polymorphic_ctype: 'content_content',
    tags: [],
    authors: [{
      username: 'hsimpson',
      first_name: 'Homer',
      last_name: 'Simpson',
      id: 16832
    }],
    thumbnail: null,
    absolute_url: '/article/article-1',
    sponsor_image: null,
    status: 'Published',
    published: '2011-04-03T16:20:00Z',
    last_modified: '2011-05-03T16:00:00Z',
    description: '',
    subhead: '',
    indexed: true,
    body: 'There\'s no thumbnail here. Go away.',
    client_pixel: null,
    sponsor_name: null
  });

});
