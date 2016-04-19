'use strict';

var ConfigError = function (providerName, message) {
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.name = 'Configuration Error (' + providerName + ')';
  this.message = message || 'Something was misconfigured.';
};
ConfigError.prototype = Object.create(Error.prototype);
ConfigError.prototype.constructor = window.ConfigError;
