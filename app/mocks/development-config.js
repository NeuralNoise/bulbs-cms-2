'use strict';

angular.module('bulbs.cms.development.config', [
  'lodash'
])
  .provider('CmsDevelopmentConfig', function CmsDevelopmentConfigProvider (_) {
    // firebase secret token
    var firebaseSecretToken = '';

    var error = function (message) {
      return new ConfigError('CmsDevelopmentConfig', message);
    };

    this.setFirebaseSecretToken = function (value) {
      if (_.isString(value)) {
        firebaseSecretToken = value;
      } else {
        throw error('firebaseSecretToken must be a string!');
      }
      return this;
    };

    this.$get = function () {
      return {
        getFirebaseSecretToken: _.constant(firebaseSecretToken)
      };
    };
  });
