(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var InstagramEmbedProcessor = function ($element, options) {
  this._settings = $.extend({
    instagramEmbedScriptUrl: '//platform.instagram.com/en_US/embeds.js'
  }, options);
  this.$container = $element;
  this.$container.data('pluginInstagramEmbedProcessor', this);

  this.$container.attr('instagram-processor-version', this._getVersion());
};

// store deferred for getting instagram object, use same deferred accross all instances
InstagramEmbedProcessor.prototype._shared = {instagramLoaded: null};

InstagramEmbedProcessor.prototype._getInstagramEmbedScript = function () {
  if (!this._shared.instagramLoaded || this._shared.instagramLoaded.state() === 'rejected') {

    this._shared.instagramLoaded = $.Deferred();

    var self = this;
    $.getScript(this._settings.instagramEmbedScriptUrl)
      .done(function () {
        self._shared.instagramLoaded.resolve();
      })
      .fail(function () {
        self._shared.instagramLoaded.reject(arguments);
        console.error('Unable to load instagram embed script!', arguments);
      });
  }

  return this._shared.instagramLoaded.promise();
};

InstagramEmbedProcessor.prototype._sanitizeHtml = function (unsanitizedHtml) {
  var html;
  if (typeof(unsanitizedHtml) === 'string') {
    html = unsanitizedHtml;
  } else {
    html = unescape(this.$container.attr('instagram-embed-html-unsanitized'));
    this.$container.attr('instagram-embed-html-unsanitized', '');
  }

  return $(html).not('script').prop('outerHTML');
};

InstagramEmbedProcessor.prototype._getVersion = function () {
  return '1.0.0';
};

InstagramEmbedProcessor.prototype.html = function (unescapedHtml) {
  if (typeof(unescapedHtml) === 'string') {
    this.$container.attr('instagram-embed-html', escape(unescapedHtml));
  }

  return unescape(this.$container.attr('instagram-embed-html'));
};

InstagramEmbedProcessor.prototype.isRendered = function (val) {
  return this.$container.data('instagramEmbedRendered') === true;
};

InstagramEmbedProcessor.prototype.prep = function (embedHtml) {
  var sanitized = this._sanitizeHtml(embedHtml);
  this.html(sanitized);
};

InstagramEmbedProcessor.prototype.insertUnrenderedHtml = function () {
  this.$container.html(this.html());
};

InstagramEmbedProcessor.prototype.render = function () {
  var rendered;

  if (!this.isRendered()) {
    this.insertUnrenderedHtml();

    var self = this;
    rendered = this._getInstagramEmbedScript().done(function () {
      instgrm.Embeds.process();

      self.$container.data('instagramEmbedRendered', true);
    });
  } else {
    rendered = this._getInstagramEmbedScript();
  }

  return rendered;
};

InstagramEmbedProcessor.prototype.clear = function () {
  this.$container.empty();
  this.$container.data('instagramEmbedRendered', false);
};

var createInstagramEmbedProcessor = function (options) {
  this.each(function () {
    var $this = $(this);
    if (!$this.data('pluginInstagramEmbedProcessor')) {
      $this.data('pluginInstagramEmbedProcessor', new InstagramEmbedProcessor($this, options));
    }
  });

  return this;
};

$.fn.instagramEmbedProcessor = createInstagramEmbedProcessor;

},{}]},{},[1]);

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	angular.module('cmsComponents.templates', []);
	var context = __webpack_require__(2);
	context.keys().map(context);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var cmsComponents = angular.module('cmsComponents', [
	  'cmsComponents.auth',

	// TODO : these components should be moved out of here at some point and
	//  included only where they are needed
	  'cmsComponents.button',
	  'cmsComponents.input'
	]);

	cmsComponents.provider('$render', function () {
	  return {
	    templateDirective: function templateDirective (directive) {
	      return function () {
	        return '<' + directive + '></' + directive + '>';
	      }
	    },
	    renderToRoot: function toRoot(options) {
	      options.views = {
	        'cmsLayoutViewport@': {
	          template: options.template,
	          templateUrl: options.templateUrl,
	          controller: options.controller,
	          templateProvider: options.templateProvider
	        }
	      };

	      delete options.template;
	      delete options.templateUrl;
	      delete options.controller;
	      delete options.templateProvider;

	      return options;
	    },
	    $get: function () {
	      return {
	        // angular-ui-router has a painful api to render child
	        // views into their parent's root, rather than nest the html
	        // this provides some small sugar around it
	      }
	    }
	  }
	});

	cmsComponents.provider('$loadPathTemplateCache', function () {
	  var templates = {};
	  var loadPaths = [];

	  return {
	    loadPaths: function (paths) {
	      loadPaths = loadPaths.concat(paths);
	    },
	    $get: function () {
	      return {
	        info: function (cacheId) {
	          return templates[cacheId];
	        },
	        get: function (cacheId) {
	          return templates[cacheId];
	        },
	        put: function (cacheId, template) {
	          templates[cacheId] = template;
	        },
	        remove: function (cacheId) {
	          delete templates[cacheId];
	        },
	        removeAll: function () {
	          templates = {};
	        },
	        destroy: function () {
	        },
	        getAll: function () {
	          return templates;
	        },
	        resolve: function (config) {
	          var path = config.path;
	          var component = config.component;

	          var template = templates[path];
	          if (template) { return template; }

	          var paths = ['components/'+component].concat(loadPaths)
	          var loadPath = _.detect(paths, function (loadPath) {
	            var pathToLoad = [loadPath, path].join('/') + '.html';
	            return templates[pathToLoad];
	          });
	          var pathToLoad = [loadPath, path].join('/') + '.html';
	          return templates[pathToLoad];
	        }
	      };
	    }
	  };
	})


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./betty-cropper/betty-cropper.js": 3,
		"./betty-cropper/betty-cropper.scss": 4,
		"./betty-cropper/betty-editable.html": 8,
		"./betty-cropper/betty-editable.js": 9,
		"./betty-cropper/betty-service.js": 10,
		"./betty-cropper/image-crop-modal.html": 11,
		"./betty-cropper/image-crop-modal.js": 12,
		"./betty-cropper/open-image-crop-modal.js": 13,
		"./cms-button/cms-button.html": 14,
		"./cms-button/cms-button.js": 15,
		"./cms-button/cms-button.scss": 16,
		"./cms-component/cms-component.html": 18,
		"./cms-component/cms-component.js": 19,
		"./cms-component/cms-component.scss": 20,
		"./cms-container/cms-container.html": 22,
		"./cms-container/cms-container.js": 23,
		"./cms-container/cms-container.scss": 24,
		"./cms-content-list/cms-content-list.html": 26,
		"./cms-content-list/cms-content-list.js": 27,
		"./cms-content-list/cms-content-list.scss": 28,
		"./cms-filter-item/cms-filter-item.html": 30,
		"./cms-filter-item/cms-filter-item.js": 31,
		"./cms-filter-item/cms-filter-item.scss": 32,
		"./cms-filter-set/cms-filter-set.html": 34,
		"./cms-filter-set/cms-filter-set.js": 35,
		"./cms-filter-set/cms-filter-set.scss": 36,
		"./cms-flyout/cms-flyout.html": 38,
		"./cms-flyout/cms-flyout.js": 39,
		"./cms-flyout/cms-flyout.scss": 40,
		"./cms-input/cms-input.html": 42,
		"./cms-input/cms-input.js": 43,
		"./cms-input/cms-input.scss": 44,
		"./cms-layout/cms-layout.html": 46,
		"./cms-layout/cms-layout.js": 47,
		"./cms-layout/cms-layout.scss": 48,
		"./cms-legend/cms-legend.html": 50,
		"./cms-legend/cms-legend.js": 51,
		"./cms-legend/cms-legend.scss": 52,
		"./cms-modal/cms-modal.html": 55,
		"./cms-modal/cms-modal.js": 56,
		"./cms-modal/cms-modal.scss": 57,
		"./cms-nav-user/cms-nav-user.html": 59,
		"./cms-nav-user/cms-nav-user.js": 60,
		"./cms-nav-user/cms-nav-user.scss": 61,
		"./cms-notifications/cms-notifications-service.js": 63,
		"./cms-notifications/cms-notifications.html": 64,
		"./cms-notifications/cms-notifications.js": 65,
		"./cms-notifications/cms-notifications.scss": 66,
		"./cms-partial/cms-partial.html": 68,
		"./cms-partial/cms-partial.js": 69,
		"./cms-partial/cms-partial.scss": 70,
		"./cms-row/cms-row.js": 72,
		"./cms-row/cms-row.scss": 73,
		"./cms-table-cell/cms-table-cell.js": 75,
		"./cms-table-cell/cms-table-cell.scss": 76,
		"./cms-table-column/cms-table-column.js": 78,
		"./cms-table-column/cms-table-column.scss": 79,
		"./cms-table/cms-table.html": 81,
		"./cms-table/cms-table.js": 82,
		"./cms-table/cms-table.scss": 83,
		"./cms-token-auth/cms-token-auth-config.js": 85,
		"./cms-token-auth/cms-token-auth-interceptor/cms-token-auth-interceptor.js": 86,
		"./cms-token-auth/cms-token-auth-login-form/cms-token-auth-login-form.html": 87,
		"./cms-token-auth/cms-token-auth-login-form/cms-token-auth-login-form.js": 88,
		"./cms-token-auth/cms-token-auth-login-form/cms-token-auth-login-form.scss": 89,
		"./cms-token-auth/cms-token-auth-login-required-wrapper/cms-token-auth-login-required-wrapper.js": 91,
		"./cms-token-auth/cms-token-auth-logout/cms-token-auth-logout.js": 92,
		"./cms-token-auth/cms-token-auth-service/cms-token-auth-service.js": 93,
		"./cms-token-auth/cms-token-auth-user/cms-token-auth-user.js": 94,
		"./cms-token-auth/cms-token-auth.js": 95,
		"./cms-tooltip/cms-tooltip.js": 96,
		"./cms-tooltip/cms-tooltip.scss": 97,
		"./cms-unsaved-changes-guard/cms-unsaved-changes-guard.js": 99,
		"./convert-to-number/convert-to-number.js": 100,
		"./filters/filters-user-display-name/filters-user-display-name.js": 101,
		"./sidebar-nav-item/sidebar-nav-item.html": 102,
		"./sidebar-nav-item/sidebar-nav-item.js": 103,
		"./sidebar-nav-item/sidebar-nav-item.scss": 104,
		"./ui-sref-active-if/ui-sref-active-if.js": 106
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 2;


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	!(function () {
	  angular.module('BettyCropper', [
	    'restmod',
	    'ui.bootstrap'
	// TODO : cmsButton dependency should be listed here
	  ])
	    .value('DEFAULT_IMAGE_WIDTH', 1200)
	    .factory('Selection', SelectionFactory)
	    .factory('BettyImage', BettyImageFactory)
	    .service('BettyCropper', BettyCropperService);

	  function BettyCropperService($http, $q, BettyImage, $, ApiServicesConfig) {

	    // alias this
	    var service = this;

	    // get the input by id
	    var fileInputId = '#bulbs-cms-hidden-image-file-input';
	    var inputTemplate = '<input id="bulbs-cms-hidden-image-file-input" type="file" accept="image/*" style="position: absolute; left:-99999px;" name="image" />';

	    // set the functionality of the service
	    service.upload = upload;
	    service.get = get;
	    service.detail = get;
	    service.updateSelection = updateSelection;

	    var config = BettyImage.config = this.config = {
	      imageServerUrl: ApiServicesConfig.bettyRoot,
	      publicToken: ApiServicesConfig.bettyKey
	    };

	    // create the service functions
	    function upload() {
	      var uploadImageDeferred = $q.defer();

	      angular.element(fileInputId).remove();
	      var fileInput = angular.element(inputTemplate);
	      angular.element('body').append(fileInput);

	      fileInput.click();

	      fileInput.unbind('change');
	      fileInput.bind('change', function (e) {
	        if (e.target.files.length !== 1) {
	          uploadImageDeferred.reject('We need exactly one image!');
	        }
	        var file = e.target.files[0];
	        if (file.type.indexOf('image/') !== 0) {
	          uploadImageDeferred.reject('Not an image!');
	        }

	        if (file.size > 10 * 1024 * 1024) { // MAGIC!
	          uploadImageDeferred.reject('The file is too large!');
	        }

	        var imageData = new FormData();
	        imageData.append('image', file);

	        $http({
	          method: 'POST',
	          url: ApiServicesConfig.bettyRoot + '/api/new',
	          headers: {
	            'X-Betty-Api-Key': ApiServicesConfig.bettyKey,
	            'Content-Type': undefined,
	            'X-CSRFToken': undefined
	          },
	          data: imageData,
	          transformRequest: angular.identity,
	          transformResponse: function (data, headersGetter) {
	            // So, sometimes the browser doesn't think that JSON data is JSON.
	            if (typeof data === 'string') {
	              data = $.parseJSON(data);
	            }
	            var image = new BettyImage(data);
	            return image;
	          }
	        }).success(function (success) {
	          uploadImageDeferred.resolve(success);
	        }).error(function (error) {
	          uploadImageDeferred.reject(error);
	        });

	      });

	      return uploadImageDeferred.promise;
	    }

	    function get(id) {
	      return $http({
	        method: 'GET',
	        url: ApiServicesConfig.bettyRoot + '/api/' + id,
	        headers: {
	          'X-Betty-Api-Key': ApiServicesConfig.bettyKey,
	          'Content-Type': undefined,
	          'X-CSRFToken': undefined
	        },
	        transformRequest: angular.identity,
	        transformResponse: function (data, headersGetter) {
	          if (typeof data === 'string') {
	            data = $.parseJSON(data);
	          }
	          return new BettyImage(data);
	        }
	      });
	    }

	    function updateSelection(id, ratio, selections) {
	      return $http({
	        method: 'POST',
	        url: ApiServicesConfig.bettyRoot + '/api/' + id + '/' + ratio,
	        headers: {
	          'X-Betty-Api-Key': ApiServicesConfig.bettyKey,
	          'Content-Type': undefined,
	          'X-CSRFToken': undefined
	        },
	        data: selections
	      });
	    }
	  }

	  function BettyImageFactory($interpolate, $http, ApiServicesConfig, DEFAULT_IMAGE_WIDTH, Selection, $) {

	    function BettyImage(data) {
	      this.id = data.id;
	      this.name = data.name;
	      this.width = data.width;
	      this.height = data.height;
	      this.selections = {};
	      for (var ratio in data.selections) {
	        this.selections[ratio] = new Selection(data.selections[ratio]);
	      }
	    }

	    BettyImage.prototype.scaleToFit = function (width, height) {
	      var scale;

	      // if scale set
	      if (width && height) {
	        var fitRatio = width / height;
	        var thisRatio = this.width / this.height;
	        if (fitRatio > thisRatio) {
	          scale = height / this.height;
	        } else {
	          scale = width / this.width;
	        }
	      }

	      // if only height
	      else if (height) {
	        scale = height / this.height;
	      }

	      // if only width
	      else if (width) {
	        scale = width / this.width;
	      }

	      // set scale object
	      var scaled = {
	        width: Math.round(this.width * scale),
	        height: Math.round(this.height * scale),
	        scale: scale
	      };

	      return scaled;
	    };

	    BettyImage.prototype.getStyles = function (width, height, ratio) {
	      // reset height
	      if (height === 0) {
	        height = null;
	      }

	      // set selections
	      var selection = this.selections[ratio];
	      var scaledSelection = selection.scaleToFit(width, height);

	      // dump style config object
	      return {
	        'background-image': 'url(' + this.url('original', DEFAULT_IMAGE_WIDTH, 'jpg') + ')',
	        'background-size': Math.floor(scaledSelection.width() / selection.width() * this.width) + 'px',
	        'background-position': '-' + scaledSelection.x0 + 'px -' + scaledSelection.y0 + 'px',
	        'height': scaledSelection.height() + 'px',
	        'width': scaledSelection.width() + 'px',
	        'background-repeat': 'no-repeat',
	        'position': 'relative'
	      };
	    };

	    BettyImage.prototype.url = function (ratio, width, format) {
	      var exp = $interpolate('{{ base_url }}/{{ id }}/{{ ratio }}/{{ width }}.{{ format }}');
	      var idStr = this.id.toString();
	      var segmentedId = '';

	      for (var i = 0; i < idStr.length; i++) {
	        if (i % 4 === 0 && i !== 0) {
	          segmentedId += '/';
	        }
	        segmentedId += idStr.substr(i, 1);
	      }

	      return exp({
	        base_url: ApiServicesConfig.bettyRoot,
	        id: segmentedId,
	        ratio: ratio,
	        width: width,
	        format: format
	      });
	    };

	    BettyImage.prototype.updateSelection = function (ratio, selection) {
	      // set data object
	      var data = {
	        x0: selection.x0,
	        x1: selection.x1,
	        y0: selection.y0,
	        y1: selection.y1
	      };
	      if (selection.source) {
	        data.source = selection.source;
	      }

	      // go get it
	      return $http({
	        method: 'POST',
	        url: ApiServicesConfig.bettyRoot + '/api/' + this.id + '/' + ratio,
	        headers: {
	          'X-Betty-Api-Key': ApiServicesConfig.bettyKey,
	          'Content-Type': undefined,
	          'X-CSRFToken': undefined
	        },
	        data: data,
	        transformResponse: function (data) {
	          if (typeof data === 'string') {
	            data = $.parseJSON(data);
	          }
	          return [ratio, new Selection(data.selections[ratio])];
	        }
	      });
	    };

	    return BettyImage;
	  }

	  function SelectionFactory() {
	    function Selection(data) {
	      this.x0 = data.x0;
	      this.x1 = data.x1;
	      this.y0 = data.y0;
	      this.y1 = data.y1;
	      this.source = data.source;
	    }

	    Selection.prototype.width = function () {
	      return this.x1 - this.x0;
	    };

	    Selection.prototype.height = function () {
	      return this.y1 - this.y0;
	    };

	    Selection.prototype.scaleBy = function (scale) {
	      var scaledToFit = new Selection({
	        x0: Math.round(this.x0 * scale),
	        x1: Math.round(this.x1 * scale),
	        y0: Math.round(this.y0 * scale),
	        y1: Math.round(this.y1 * scale)
	      });
	      return scaledToFit;
	    };

	    Selection.prototype.scaleToFit = function (width, height) {
	      var scale;

	      // if width and height set
	      if (width && height) {
	        var fitRatio = width / height;
	        var thisRatio = this.width() / this.height();
	        if (fitRatio > thisRatio) {
	          scale = height / this.height();
	        } else {
	          scale = width / this.width();
	        }
	      }

	      // if height
	      else if (height) {
	        scale = height / this.height();
	      }

	      // if width
	      else if (height) {
	        scale = width / this.width();
	      }

	      return this.scaleBy(scale);
	    };

	    return Selection;
	  }
	})();


/***/ },
/* 4 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	var path = 'components/betty-cropper/betty-editable.html';
	var html = "<cms-button\n    type=\"muted\"\n    glyph=\"picture-o\"\n    ng-click=\"upload()\"\n    ng-hide=\"image && image.id\"\n    ng-style=\"imageStyling\">\n  {{ buttonText || 'Upload Image' }}\n</cms-button>\n\n<div\n    ng-show=\"image && image.id\"\n    ng-style=\"imageStyling\"\n    class=\"image-edit-container\">\n  <div\n      class=\"image-edit-overlay\"\n      ng-show=\"editable\">\n    <div class=\"remove\">\n      <button\n          type=\"button\"\n          ng-click=\"removeImage();\"\n          class=\"fa fa-trash-o\"></button>\n    </div>\n    <div class=\"edit\">\n      <button\n          type=\"button\"\n          name=\"inline_edit\"\n          ng-click=\"edit();\">\n        EDIT\n      </button>\n    </div>\n  </div>\n</div>\n\n<input\n    class=\"betty-editable-value-holder\"\n    type=\"text\"\n    name=\"{{ inputName }}\"\n    ng-model=\"image\">\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('bettyEditable', [
	    '$http', 'BettyCropper', 'openImageCropModal',
	    function ($http, BettyCropper, openImageCropModal) {
	      return {
	        templateUrl: 'components/betty-cropper/betty-editable.html',
	        restrict: 'E',
	        require: ['?^^form'],

	        scope: {
	          image: '=',
	          ratio: '@',                             // ratio string, AxB, where A is width, B is height
	          editable: '=?',
	          imageChangeCallback: '=',
	          isDisabled: '=',
	          buttonText: '@bettyEditableButtonText', // text to display on button
	          inputName: '@?bettyEditableInputName'   // name of input
	        },

	        controller: ['$scope', function ($scope) {
	          $scope.editable = angular.isDefined($scope.editable) ? $scope.editable : true;

	          var parsedRatio = $scope.ratio
	            .split('x')
	            .map(function (num) {
	              return parseInt(num, 10) || 1;
	            });
	          $scope.parsedRatio = {
	            width: parsedRatio[0],
	            height: parsedRatio[1]
	          };

	          $scope.callImageChangeCallback = function (param) {
	            if (_.isFunction($scope.imageChangeCallback)) {
	              $scope.imageChangeCallback(param);
	            }
	          };

	          $scope.upload = function () {
	            BettyCropper.upload().then(
	              function (success) {
	                $scope.image = {
	                  id: success.id,
	                  caption: null,
	                  alt: null
	                };
	                $scope.bettyImage = success;
	                $scope.callImageChangeCallback(success);
	                $scope.setStyles();
	                $scope.markDirty();
	              },
	              function (error) {
	                console.error(error);
	              },
	              function (progress) {
	                console.log(progress);
	              }
	            );
	          };

	          $scope.edit = function () {
	            openImageCropModal($scope.image).then(function (image) {
	              if (!image.id) {
	                $scope.image = null;
	              } else {
	                $scope.image = image;
	                BettyCropper.get($scope.image.id).then(function (response) {
	                  $scope.bettyImage = response.data;
	                  $scope.setStyles();
	                });
	              }

	              $scope.callImageChangeCallback();
	            });
	          };
	        }],

	        link: function (scope, element, attrs, ctrls) {

	          var parentForm = ctrls[0];

	          if (!scope.bettyImage) {
	            scope.bettyImage = null;
	          }

	          scope.markDirty = function () {
	            if (parentForm && scope.inputName && parentForm[scope.inputName]) {
	              parentForm[scope.inputName].$setDirty();
	            }
	          };

	          scope.setStyles = function () {
	            if (scope.bettyImage) {
	              scope.imageStyling = scope.bettyImage.getStyles(element.parent().width(), element.parent().height(), scope.ratio);
	            } else {
	              scope.imageStyling = {
	                'position': 'relative',
	                'width': element.parent().width(),
	                'height': Math.floor(element.parent().width() * scope.parsedRatio.height / scope.parsedRatio.width) + 'px',
	              };
	            }
	          };

	          scope.$watch('image', function (newImage) {
	            if (newImage && newImage.id) {
	              BettyCropper.get(newImage.id).then(function (response) {
	                scope.bettyImage = response.data;
	              });
	            }
	          });

	          scope.$watch('bettyImage', function () {
	            scope.setStyles();
	          }, true);

	          element.resize(scope.setStyles);

	          scope.removeImage = function () {
	            scope.image = null;
	            scope.bettyImage = null;
	            scope.callImageChangeCallback();
	            scope.setStyles();
	            scope.markDirty();
	          };

	          scope.editImage = function () {
	            openImageCropModal(scope.image).then(function (success) {});
	          };

	          scope.setStyles();
	        }
	      };
	    }
	  ]);


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .service('BettyService', ['$http', 'Config', 'BettyCropper', function ($http, Config, BettyCropper) {
	    var service = {};

	    service.updateBettyConfig = function () {
	      return $http.get(Config.apiUrl + 'photo-service-details/')
	        .success(service.bettyConfigRetrieved);
	    };

	    service.bettyConfigRetrieved = function (response) {
	      BettyCropper.config.publicToken = response.public_token;
	      BettyCropper.config.imageServerUrl = response.image_url;
	    };

	    return service;
	  }]);


/***/ },
/* 11 */
/***/ function(module, exports) {

	var path = 'components/betty-cropper/image-crop-modal.html';
	var html = "<div class=\"image-cropper-modal\" tabindex=\"1\">\n  <div class=\"modal-header\">\n    <button type=\"button\" class=\"close\" ng-click=\"$dismiss();\" aria-hidden=\"true\">&times;</button>\n    <h4 class=\"modal-title\" ng-hide=\"cropMode\">Edit Image Options</h4>\n    <h4 class=\"modal-title\" ng-show=\"cropMode\">Crop Image</h4>\n  </div>\n  <div class=\"modal-body\">\n    <div ng-hide=\"cropMode\">\n\n      <h5>Set Image Crops</h5>\n      <ul class=\"thumb-list\">\n        <li ng-repeat=\"ratio in ratios\">\n          <div class=\"cropped-thumb-container\" ng-style=\"thumb_container_styles[ratio]\" ng-click=\"selectCrop(ratio)\">\n            <div ng-style=\"thumb_styles[ratio]\" class=\"cropped-thumb\">\n            </div>\n          </div>\n          <span class=\"fa\" ng-class=\"isCropDone(ratio)\"><strong>{{ ratio }}</strong></span>\n        </li>\n      </ul>\n      <div ng-show=\"imageData.hasOwnProperty('caption')\" class=\"caption-container\">\n        <hr>\n        <div class=\"row\">\n          <div class=\"form-group col-md-6\">\n            <label class=\"control-label small\">Caption / Photo Credit</label>\n            <input type=\"text\" class=\"form-control\" placeholder=\"Brief explanation of image\" ng-model=\"imageData.caption\" />\n          </div>\n          <div class=\"form-group col-md-6\">\n            <label class=\"control-label small\">Alt Text</label>\n            <input type=\"text\" class=\"form-control\" placeholder=\"Describe image's contents\" ng-model=\"imageData.alt\" />\n          </div>\n        </div>\n      </div>\n    </div>\n    <div ng-show=\"cropMode\">\n      <div class=\"crop-image-container\">\n        <img ng-src=\"{{ image_url }}\" width=\"{{ scaleData.width }}\" height=\"{{ scaleData.height }}\" />\n      </div>\n      <div class=\"ratio-paginator\">\n        <span\n          ng-repeat=\"ratio in ratios\"\n          ng-class=\"image.selections[ratio].source\"\n          class=\"fa\"\n          ng-click=\"selectCrop(ratio)\">{{ ratio }}</span>\n\n      </div>\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n    <div ng-hide=\"cropMode\">\n      <button type=\"button\" class=\"btn btn-success\" ng-click=\"closeModal();\">Done</button>\n    </div>\n    <div ng-show=\"cropMode\">\n      <button type=\"button\" class=\"btn btn-link\" ng-click=\"saveAndQuit()\" ng-hide=\"finished\">Save and Finish</button>\n      <button type=\"button\" class=\"btn btn-success\" ng-click=\"saveAndNext()\" ng-hide=\"finished\">Save & Continue</button>\n      <button type=\"button\" class=\"btn btn-success\" ng-click=\"saveAndQuit()\" ng-show=\"finished\">Save & Finish</button>\n    </div>\n  </div>\n</div>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	angular.module('BettyCropper')
	  .controller('ImageCropModalCtrl',
	    ['$scope', '$timeout', '$modalInstance', 'BettyCropper', 'Selection', 'DEFAULT_IMAGE_WIDTH', 'imageData', 'ratios',
	    function ($scope, $timeout, $modalInstance, BettyCropper, Selection, DEFAULT_IMAGE_WIDTH, imageData, ratios) {

	      $scope.selectedCrop = null;
	      $scope.cropMode = false;
	      $scope.ratios = ratios;
	      $scope.finished = false;
	      $scope.thumb_container_styles = {};
	      $scope.imageData = imageData;

	      if (!$scope.image) {
	        $scope.image = null;
	        BettyCropper.get(imageData.id).then(function (success) {
	          $scope.image = success.data;
	        });
	      }

	      $scope.$watch('image', function (image) {
	        if (!image) {
	          return;
	        }

	        var finished = true;
	        for (var ratio in image.selections) {
	          if (image.selections[ratio].source === 'auto') {
	            finished = false;
	            break;
	          }
	        }
	        $scope.finished = finished;

	        $scope.scaleData = image.scaleToFit(550, 400);

	        $('.crop-image-container img').one('load', function () {
	          $(this).Jcrop({
	            allowSelect: false,
	            allowMove: true,
	            allowResize: true,
	            keySupport: false
	          }, function () {
	            $scope.jcrop_api = this;
	          });
	        });

	        $scope.image_url = image.url('original', DEFAULT_IMAGE_WIDTH, 'jpg');
	        if (!$scope.ratios) {
	          $scope.ratios = Object.keys(image.selections);
	        }

	        $scope.setThumbStyles();
	      });

	      $scope.$watch('selectedCrop', function (crop) {
	        if (!$scope.image) {
	          return;
	        }
	        var finished = true;
	        for (var ratio in $scope.image.selections) {
	          if ($scope.image.selections[ratio].source === 'auto' && ratio !== crop) {
	            finished = false;
	            break;
	          }
	        }
	        $scope.finished = finished;
	      });

	      $scope.selectCrop = function (ratio) {
	        if (!ratio) {
	          ratio = Object.keys($scope.image.selections)[0];
	          for (var key in $scope.image.selections) {
	            if ($scope.image.selections[key].source === 'auto') {
	              ratio = key;
	              break;
	            }
	          }
	        }
	        var selection = $scope.image.selections[ratio].scaleBy($scope.scaleData.scale);

	        $scope.jcrop_api.setOptions({
	          aspectRatio: selection.width() / selection.height()
	        });

	        $scope.jcrop_api.setSelect([
	          selection.x0,
	          selection.y0,
	          selection.x1,
	          selection.y1
	        ]);

	        $scope.cropMode = true;
	        $scope.selectedCrop = ratio;
	      };

	      $scope.setThumbStyles = function () {
	        $scope.thumb_styles = $scope.thumb_styles || {};

	        for (var ratio in $scope.image.selections) {
	          var scaledSelection = $scope.image.selections[ratio].scaleToFit(170, 170);
	          $scope.thumb_container_styles[ratio] = {
	            'padding-top': Math.round((180 - scaledSelection.height()) / 2) + 'px',
	            'padding-bottom': '5px',
	            'padding-left': Math.round((180 - scaledSelection.width()) / 2) + 'px',
	            'padding-right': '5px'
	          };

	          $scope.thumb_styles[ratio] = $scope.image.getStyles(170, 170, ratio);
	        }
	      };

	      $scope.save = function (ratio) {

	        var jcrop_selection = $scope.jcrop_api.tellSelect();

	        var newSelection = new Selection({
	          x0: jcrop_selection.x,
	          x1: jcrop_selection.x2,
	          y0: jcrop_selection.y,
	          y1: jcrop_selection.y2,
	          source: 'user'
	        });
	        newSelection = newSelection.scaleBy(1 / $scope.scaleData.scale);
	        if (newSelection.x1 > $scope.image.width) {
	          newSelection.x1 = $scope.image.width;
	        }
	        if (newSelection.y1 > $scope.image.height) {
	          newSelection.y1 = $scope.image.height;
	        }

	        return this.image.updateSelection(ratio, newSelection);
	      };

	      $scope.saveAndQuit = function () {
	        var ratio = $scope.selectedCrop;
	        this.save(ratio).then(function (success) {
	          var ratio = success.data[0];
	          var selection = success.data[1];
	          $scope.image.selections[ratio] = selection;
	        });
	        $scope.cropMode = false;

	        $scope.closeModal();
	      };

	      $scope.saveAndNext = function () {
	        var ratio = $scope.selectedCrop;
	        this.save(ratio).then(function (success) {
	          var ratio = success.data[0];
	          var selection = success.data[1];
	          $scope.image.selections[ratio] = selection;

	          var nextRatioIndex = ($scope.ratios.indexOf(ratio) + 1) % $scope.ratios.length;

	          $scope.selectCrop($scope.ratios[nextRatioIndex]);
	        });
	      };

	      $scope.closeModal = function () {
	        $modalInstance.dismiss('cancel');
	      };

	    }]);


/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	angular.module('BettyCropper')
	  .factory('openImageCropModal', ['$modal', function ($modal) {
	    var openImageCropModal = function (imageData, ratios) {
	      return $modal.open({
	        templateUrl: 'components/betty-cropper/image-crop-modal.html',
	        controller: 'ImageCropModalCtrl',
	        resolve: {
	          imageData: function () { return imageData; },
	          ratios: function () { return ratios || false; }
	        },
	        backdrop: 'static'
	      }).result;
	    };

	    return openImageCropModal;
	  }]);


/***/ },
/* 14 */
/***/ function(module, exports) {

	var path = 'components/cms-button/cms-button.html';
	var html = "<button\n    type=\"{{ buttonType || 'button' }}\"\n    class=\"{{ type || 'friendly' }}-action\"\n    ng-disabled=\"buttonDisabled()\">\n  <i\n      ng-if=\"iconIsBefore && !hideGlyph()\"\n      class=\"{{ iconClasses }}\">\n  </i>\n  <ng-transclude></ng-transclude>\n  <i\n      ng-if=\"!iconIsBefore && !hideGlyph()\"\n      class=\"{{ iconClasses }}\">\n  </i>\n</button>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents.button', [
	  'cmsComponents.templates'
	])
	  .directive('cmsButton', function () {

	    return {
	      templateUrl: 'components/cms-button/cms-button.html',
	      restrict: 'EA',
	      transclude: true,
	      scope: {
	        buttonType: '@',                    // button type to apply to html button
	        buttonDisabled: '&',                // true to set button disabled
	        type: '@type',                      // type of button styling to apply, defaults to 'friendly'
	        glyph: '@glyph',                    // glyph to use from glyph library, defaults to 'question-circle'
	        glyphClass: '@buttonGlyphClass',    // class to use to style glyph, defaults to 'fa'
	        glyphPrefix: '@buttonGlyphPrefix',  // prefix for glyph icon, defaults to 'fa'
	        glyphSize: '@glyphsize',            // class to use for glyph size
	        glyphPos: '@glyphpos',              // position of glyph, 'before' or 'after', defaults to 'before'
	        hideGlyph: '&noglyph',              // truthy to hide glyph
	      },
	      link: function ($scope, elements, attrs) {
	        $scope.iconClasses =
	            ($scope.glyphClass || 'fa') + ' ' +
	            ($scope.glyphPrefix || 'fa') + '-' +
	            ($scope.glyph || 'question-circle') + ' ' +
	            ($scope.glyphSize || '');
	        $scope.iconIsBefore = $scope.glyphPos !== 'after';
	      }
	    }
	  });


/***/ },
/* 16 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 17 */,
/* 18 */
/***/ function(module, exports) {

	var path = 'components/cms-component/cms-component.html';
	var html = "<span>Calling from cms-component</span>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsComponent', ['$compile', function ($compile) {
	    return {
	      template: '',
	      restrict: 'E',
	      compile: function (element, attrs) {
	        return {
	          pre: function ($scope, $element, $attrs) {
	            $element.append(document.createElement(attrs.tag));
	            $compile($element.contents())($scope);
	          }
	        };
	      }
	    }
	  }]);


/***/ },
/* 20 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 21 */,
/* 22 */
/***/ function(module, exports) {

	var path = 'components/cms-container/cms-container.html';
	var html = "<ng-transclude></ng-transclude>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsContainer', function () {
	    return {
	      templateUrl: 'components/cms-container/cms-container.html',
	      restrict: 'E',
	      transclude: true
	    }
	  });


/***/ },
/* 24 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 25 */,
/* 26 */
/***/ function(module, exports) {

	var path = 'components/cms-content-list/cms-content-list.html';
	var html = "<cms-container>\n  <cms-partial template=\"status-filters\"></cms-partial>\n  <cms-partial template=\"search-filters\"></cms-partial>\n  <cms-partial template=\"list-table\"></cms-partial>\n</cms-container>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsContentList', function () {
	    return {
	      templateUrl: 'components/cms-content-list/cms-content-list.html',
	      restrict: 'E'
	    };
	  });


/***/ },
/* 28 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 29 */,
/* 30 */
/***/ function(module, exports) {

	var path = 'components/cms-filter-item/cms-filter-item.html';
	var html = "<ng-transclude></ng-transclude>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsFilterItem', function () {
	    return {
	      templateUrl: 'components/cms-filter-item/cms-filter-item.html',
	      restrict: 'E',
	      transclude: true
	    }
	  });


/***/ },
/* 32 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 33 */,
/* 34 */
/***/ function(module, exports) {

	var path = 'components/cms-filter-set/cms-filter-set.html';
	var html = "<ng-transclude></ng-transclude>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsFilterSet', function () {
	    return {
	      templateUrl: 'components/cms-filter-set/cms-filter-set.html',
	      restrict: 'E',
	      transclude: true
	    }
	  });


/***/ },
/* 36 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 37 */,
/* 38 */
/***/ function(module, exports) {

	var path = 'components/cms-flyout/cms-flyout.html';
	var html = "<ng-transclude></ng-transclude>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsFlyout', function () {
	    return {
	      templateUrl: 'components/cms-flyout/cms-flyout.html',
	      restrict: 'E',
	      transclude: true,

	      controller: ['$scope', '$element', '$document',
	        function ($scope, $element, $document) {
	          var active = false;
	          var activeClass = 'cms-flyout-active';
	          $scope.$on
	          function toggleActive (event) {
	            // don't close if clicking on the panel
	            if ($(event.target).closest('cms-flyout-panel')[0]) {
	              return;
	            }

	            active = !active;
	            if (active) {
	              $element.addClass(activeClass)
	              setTimeout(function () {
	                $document.bind('click', toggleActive);
	              });
	            }
	            else {
	              $element.removeClass(activeClass);
	              $document.unbind('click', toggleActive);
	            }
	          }
	          $element.on('click', '[cms-flyout-trigger]', toggleActive);
	          $scope.$on('flyout-close', function (event) {
	            event.stopPropagation();
	            if (active) {
	              toggleActive(event);
	            }
	          });

	          // do close if navigating
	          $scope.$on('$locationChangeStart', function(event, next, current) {
	            if (active) { toggleActive(event) };
	          });
	        }]
	    }
	  })
	  .directive('cmsFlyoutTrigger', function () {
	    return {
	      restrict: 'A',
	      controller: ['$scope', function ($scope) {
	      }]
	    };
	  })
	;


/***/ },
/* 40 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 41 */,
/* 42 */
/***/ function(module, exports) {

	var path = 'components/cms-input/cms-input.html';
	var html = "<label>\n  <span class=\"cms-input-label\">\n    <span class=\"cms-input-label-item cms-input-title\">{{ title }}</span>\n    <span\n        class=\"cms-input-label-item cms-input-error\"\n        ng-repeat=\"(message, doShow) in errors()\"\n        ng-if=\"doShowErrors() && doShow\">\n        <i\n            class=\"fa fa-exclamation-triangle\"\n            cms-tooltip=\"{{ message }}\"\n            cms-tooltip-classes=\"invalid\">\n        </i>\n    </span>\n  </span>\n  <ng-transclude class=\"cms-input-control\"></ng-transclude>\n</label>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents.input', [
	  'cmsComponents.tooltip',
	  'cmsComponents.templates'
	])
	  .directive('cmsInput', [
	    function () {
	      return {
	        templateUrl: 'components/cms-input/cms-input.html',
	        restrict: 'E',
	        scope: {
	          title: '@',                             // title for input label
	          showErrors: '&cmsInputErrorsShowWhen',  // only show errors when this is true, by default errors will always show
	          errors: '&cmsInputErrors'               // object of errors where key is the error message and value is a boolean to use to determine if error shows or not
	        },
	        transclude: true,
	        link: function ($scope) {

	          $scope.doShowErrors = function () {
	            var doShowAttr = $scope.showErrors();
	            // specifically checking false, so falsy values like undefined don't
	            //  trigger errors not showing up
	            return doShowAttr === false ? false : true;
	          };
	        }
	      }
	    }
	  ]);


/***/ },
/* 44 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 45 */,
/* 46 */
/***/ function(module, exports) {

	var path = 'components/cms-layout/cms-layout.html';
	var html = "<ng-transclude></ng-transclude>\n<section ui-view=\"cmsLayoutViewport\" class='cms-layout-viewport'>\n</section>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents.cmsLayout', [])
	  .directive('cmsLayout', [
	    function () {
	      return {
	        templateUrl: 'components/cms-layout/cms-layout.html',
	        restrict: 'E',
	        transclude: true
	      }
	    }
	  ]);


/***/ },
/* 48 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 49 */,
/* 50 */
/***/ function(module, exports) {

	var path = 'components/cms-legend/cms-legend.html';
	var html = "<cms-row>\n  <hr/>\n  <ng-transclude class='cms-legend-text'></ng-transclude>\n  <hr/>\n</cms-row>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsLegend', function () {
	    return {
	      templateUrl: 'components/cms-legend/cms-legend.html',
	      restrict: 'E',
	      transclude: true
	    }
	  });


/***/ },
/* 52 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 53 */,
/* 54 */,
/* 55 */
/***/ function(module, exports) {

	var path = 'components/cms-modal/cms-modal.html';
	var html = "<ng-transclude></ng-transclude>";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsModal', function () {
	    return {
	      templateUrl: 'components/cms-modal/cms-modal.html',
	      restrict: 'E',
	      modalTitle: '=',
	      transclude: true,
	      controller: ['$scope', '$element', '$document',

	        function ($scope, $element, $document) {

	          var active = false;
	          var activeClass = 'cms-modal-active';
	          
	          function toggleActive (event) {
	            // don't close if clicking on the inner
	            if ($(event.target).closest('cms-modal-content')[0]) {
	              return;
	            }

	            active = !active;
	            if (active) {
	              $element.addClass(activeClass)
	              setTimeout(function () {
	                $document.bind('click', toggleActive);
	              });
	            }
	            else {
	              $element.removeClass(activeClass);
	              $document.unbind('click', toggleActive);
	            }
	          }
	          $element.on('click', '[cms-modal-trigger]', toggleActive);
	          $element.on('click', '.close', toggleActive);
	          
	          $scope.$on('modal-close', function (event) {
	            event.stopPropagation();
	            if (active) {
	              toggleActive(event);
	            }
	          });


	          // do close if navigating
	          $scope.$on('$locationChangeStart', function(event, next, current) {
	            if (active) { toggleActive(event) };
	          });
	        }]
	    }
	  })
	  .directive('cmsModalTrigger', function () {
	    return {
	      restrict: 'A',
	      controller: ['$scope', function ($scope) {
	      }]
	    };
	  })
	;


/***/ },
/* 57 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 58 */,
/* 59 */
/***/ function(module, exports) {

	var path = 'components/cms-nav-user/cms-nav-user.html';
	var html = "<cms-login-required-wrapper>\n  <div\n      uib-dropdown\n      dropdown-append-to-body>\n    <button\n        class=\"cms-nav-user-menu-opener\"\n        uib-dropdown-toggle>\n      <span>Hi,</span>\n      <span class=\"cms-nav-user-name\">{{ user | userDisplay }}</span>\n      <i class=\"fa fa-angle-down\"></i>\n    </button>\n    <ul\n        uib-dropdown-menu\n        role=\"menu\"\n        aria-labelledby=\"btn-append-to-body\"\n        class=\"dropdown-menu nav-menu-dropdown-menu\">\n      <li>\n        <a ui-sref=\"logout\">\n          <i class=\"fa fa-power-off\"></i>\n          <span>Log Out</span>\n        </a>\n      </li>\n    </ul>\n  </div>\n</cms-login-required-wrapper>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 60 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents.navUser', [
	  'cmsComponents.auth.user',
	  'cmsComponents.auth.loginRequiredWrapper',
	  'cmsComponents.filters.userDisplay',
	  'cmsComponents.templates'
	])
	  .directive('cmsNavUser', [
	    function () {
	      return {
	        templateUrl: 'components/cms-nav-user/cms-nav-user.html',
	        restrict: 'E',
	        controller: [
	          '$scope', 'CurrentUser',
	          function ($scope, CurrentUser) {
	            CurrentUser.$get()
	              .then(function (user) {
	                $scope.user = user;
	              });
	          }
	        ]
	      }
	    }
	  ]);


/***/ },
/* 61 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 62 */,
/* 63 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents.notifications.service', [])
	  .service('NotificationsService', [
	    function () {

	      var data = {
	        errors: [],
	        warnings: [],
	        infos: []
	      };

	      var lastId = 0;
	      var put = function (type, message, removalCondition) {
	        var typeList = data[type];

	        var nextId = lastId++;;
	        typeList.push({
	          id: nextId,
	          message: message,
	          doRemove: removalCondition
	        });

	        return nextId;
	      };

	      var clear = function (type) {
	        data[type] = [];
	      };

	      var remove = function (type, id) {
	        data[type] = data[type].filter(function (notification) {
	          return notification.id !== id;
	        });
	      };

	      var list = function (type) {
	        // clean up anything we should remove
	        data[type] = data[type].filter(function (notification) {
	          return typeof notification.doRemove !== 'function' || !notification.doRemove();
	        });

	        return data[type];
	      };

	      return {
	        // errors
	        addError: put.bind(null, 'errors'),
	        removeError: remove.bind(null, 'errors'),
	        listErrors: list.bind(null, 'errors'),
	        clearErrors: clear.bind(null, 'errors'),
	        // warnings
	        addWarning: put.bind(null, 'warnings'),
	        removeWarning: remove.bind(null, 'warnings'),
	        listWarnings: list.bind(null, 'warnings'),
	        clearWarnings: clear.bind(null, 'warnings'),
	        // infos
	        addInfo: put.bind(null, 'infos'),
	        removeInfo: remove.bind(null, 'infos'),
	        listInfos: list.bind(null, 'infos'),
	        clearInfos: clear.bind(null, 'infos')
	      };
	    }
	  ]);


/***/ },
/* 64 */
/***/ function(module, exports) {

	var path = 'components/cms-notifications/cms-notifications.html';
	var html = "<ul\n    class=\"cms-notifications-errors\"\n    ng-if=\"service.listErrors().length > 0\">\n  <li ng-repeat=\"notification in service.listErrors() track by notification.id\">\n    <i class=\"fa fa-exclamation-triangle\"></i>\n    <span>{{ notification.message }}</span>\n    <button\n        type=\"button\"\n        ng-click=\"service.removeError(notification.id)\">\n      <i class=\"fa fa-times\"></i>\n    </button>\n  </li>\n</ul>\n<ul\n    class=\"cms-notifications-warnings\"\n    ng-if=\"service.listWarnings().length > 0\">\n  <li ng-repeat=\"notification in service.listWarnings() track by notification.id\">\n    <i class=\"fa fa-exclamation-circle\"></i>\n    <span>{{ notification.message }}</span>\n    <button\n        type=\"button\"\n        ng-click=\"service.removeWarning(notification.id)\">\n      <i class=\"fa fa-times\"></i>\n    </button>\n  </li>\n</ul>\n<ul\n    class=\"cms-notifications-infos\"\n    ng-if=\"service.listInfos().length > 0\">\n  <li ng-repeat=\"notification in service.listInfos() track by notification.id\">\n    <i class=\"fa fa-info-circle\"></i>\n    <span>{{ notification.message }}</span>\n    <button\n        type=\"button\"\n        ng-click=\"service.removeInfo(notification.id)\">\n      <i class=\"fa fa-times\"></i>\n    </button>\n  </li>\n</ul>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 65 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents.notifications', [
	  'cmsComponents.notifications.service',
	  'cmsComponents.templates'
	])
	  .directive('cmsNotifications', [
	    'NotificationsService',
	    function (NotificationsService) {
	      return {
	        templateUrl: 'components/cms-notifications/cms-notifications.html',
	        restrict: 'E',
	        link: function ($scope) {
	          $scope.service = NotificationsService;
	        }
	      }
	    }
	  ]);


/***/ },
/* 66 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 67 */,
/* 68 */
/***/ function(module, exports) {

	var path = 'components/cms-partial/cms-partial.html';
	var html = "<span>Calling from cms-partial</span>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 69 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsPartial', ['$templateCache', '$compile',
	  function ($templateCache, $compile) {
	    return {
	      restrict: 'E',
	      compile: function (element, attrs) {
	        return {
	          post: function ($scope, $element, $attrs) {
	            $element[0].innerHTML = $templateCache.resolve({
	              path: $attrs.template,
	              component: $scope.component
	            });
	            $compile($element.contents())($scope);
	          }
	        };
	      }
	    }
	  }]);


/***/ },
/* 70 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 71 */,
/* 72 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsRow', function () {
	    return {
	      template: '<ng-transclude></ng-transclude>',
	      restrict: 'E',
	      transclude: true
	    }
	  });


/***/ },
/* 73 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 74 */,
/* 75 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Renders item data based on column spec.
	 */
	angular.module('cmsComponents')
	  .directive('cmsTableCell', [
	    '$compile',
	    function ($compile) {
	      return {
	        restrict: 'A',
	        require: '^cmsTable',
	        scope: {
	          column: '=',    // column spec associated with this cell
	          item: '='       // item spec assicated with this cell
	        },
	        link: function (scope, elements) {
	          scope.column.buildHtml(scope).then(function (html) {
	            elements.html(html);
	          });
	        }
	      }
	    }
	  ]);


/***/ },
/* 76 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 77 */,
/* 78 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Specifies layout and rendering of a given column for a cms-table. Defines how
	 *  cms-table-cell elements will render.
	 */
	angular.module('cmsComponents')
	  .directive('cmsTableColumn', [
	    '$compile', '$interpolate', '$parse', '$q', '$templateRequest',
	    function ($compile, $interpolate, $parse, $q, $templateRequest) {

	      return {
	        restrict: 'E',
	        require: '^cmsTable',
	        scope: {
	          title: '@',           // title of column
	          sort: '@',            // name of field that this sorts
	          size: '&',            // size of column relative to other columns
	          // will use only one of the following cell-* attrs to render contents
	          cellTemplate: '@',    // template to use for cell rendering, for use with simple, non-html templates
	          cellTemplateUrl: '@'  // url to template to use for cell rendering, for use with complex templates with html
	        },
	        link: function (scope, element, attrs, cmsTable) {
	          var defer = $q.defer();
	          var getTemplate = defer.promise;

	          cmsTable.addColumn({
	            title: scope.title,
	            sort: scope.sort,
	            size: scope.size() || 1,
	            buildHtml: function (scope) {
	              return getTemplate.then(function (compiler) {
	                return compiler(scope);
	              });
	            }
	          });

	          if (scope.cellTemplateUrl) {
	            $templateRequest(scope.cellTemplateUrl)
	              .then(function (template) {
	                defer.resolve(function (scope) {
	                  // seems weird and unnecessary, why doesn't $compile fill in
	                  //  {{ interpolateSections }}?
	                  return $compile($interpolate(template)(scope))(scope);
	                });
	              })
	              .catch(defer.reject);
	          } else if (scope.cellTemplate) {
	            defer.resolve($parse(scope.cellTemplate));
	          }
	        }
	      }
	    }
	  ]);


/***/ },
/* 79 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 80 */,
/* 81 */
/***/ function(module, exports) {

	var path = 'components/cms-table/cms-table.html';
	var html = "<ng-transclude></ng-transclude>\n<div class=\"cms-table-table\">\n  <div class=\"cms-table-row cms-table-header\">\n    <div\n        ng-repeat=\"column in columns\"\n        class=\"cms-table-cell cms-table-cell-size-{{ column.size }}\"\n        type=\"{{ column.type }}\">\n      <a ng-click=\"$parent.$parent.orderTable(column.sort)\">\n        <span>{{ column.title }}</span>\n        <i\n            class=\"fa\"\n            ng-class=\"{\n              'fa-chevron-down': $parent.$parent.listOrdering === '-' + column.sort,\n              'fa-chevron-up': $parent.$parent.listOrdering === column.sort\n            }\">\n        </i>\n      </a>\n    </div>\n  </div>\n\n  <div\n      class=\"cms-table-row\"\n      dir-paginate=\"item in collection | itemsPerPage: 20\"\n      total-items=\"{{ collection.$totalCount }}\"\n      current-page=\"$parent.$parent.listPage\">\n    <div\n        ng-repeat=\"column in columns\"\n        cms-table-cell\n        class=\"cms-table-cell cms-table-cell-size-{{ column.size }}\"\n        item=\"item\"\n        column=\"column\">\n    </div>\n  </div>\n\n  <div class=\"cms-table-blank-slate\" ng-show=\"collection.$status == 'pending'\">\n    <p> Loading items from server... </p>\n  </div>\n\n  <div class=\"cms-table-blank-slate\" ng-hide=\"collection.length\">\n    <p> No items to show in this list. </p>\n  </div>\n</div>\n\n<div class=\"cms-table-pagination\">\n  <dir-pagination-controls on-page-change=\"$parent.$parent.paginate(newPageNumber)\"></dir-pagination-controls>\n</div>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 82 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('cmsTable', [
	    function () {
	      return {
	        templateUrl: 'components/cms-table/cms-table.html',
	        restrict: 'E',
	        transclude: true,
	        scope: {
	          collection: '='
	        },
	        controller: [
	          '$scope',
	          function ($scope) {

	            $scope.columns = [];

	            return {
	              addColumn: function (column) {
	                $scope.columns.push(column);
	              }
	            };
	          }
	        ]
	      }
	    }
	  ]);


/***/ },
/* 83 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 84 */,
/* 85 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents.auth.config', [
	  'lodash'
	])
	  .provider('TokenAuthConfig', [
	    '_',
	    function TokenAuthConfigProvider (_) {
	      // endpoint for token auth
	      var apiEndpointAuth = '/api/token/auth';
	      // endpoint for token refresh
	      var apiEndpointRefresh = '/api/token/refresh';
	      // endpoint for current user data
	      var apiEndpointCurrentUser = '/api/me';
	      // endpoint for token verification
	      var apiEndpointVerify = '/api/token/verify';
	      // host where auth endpoints are located
	      var apiHost = '';
	      // handlers to when an authentication failure occurs
	      var authFailureHandlers = [];
	      // handlers to fire when authentication succeeds
	      var authSuccessHandlers = [];
	      // HTTP codes this module should handle
	      var handleHttpCodes = [401, 403];
	      // url for logo to display on login page
	      var logoUrl = '';
	      // list of regular expressions to match request urls, only matched urls will
	      //  be intercepted successfully
	      var matchers = [/.*/];
	      // local storage key for token
	      var tokenKey = 'authToken';
	      // handlers to fire when unauthentication occurs (logout)
	      var unauthHandlers = [];

	      this.setApiEndpointAuth = function (value) {
	        if (_.isString(value)) {
	          apiEndpointAuth = value;
	        } else {
	          throw new TypeError('TokenAuthConfig.apiEndpointAuth must be a string!');
	        }
	        return this;
	      };

	      this.setApiEndpointRefresh = function (value) {
	        if (_.isString(value)) {
	          apiEndpointRefresh = value;
	        } else {
	          throw new TypeError('TokenAuthConfig.apiEndpointRefresh must be a string!');
	        }
	        return this;
	      };

	      this.setApiEndpointVerify = function (value) {
	        if (_.isString(value)) {
	          apiEndpointVerify = value;
	        } else {
	          throw new TypeError('TokenAuthConfig.apiEndpointVerify must be a string!');
	        }
	        return this;
	      };

	      this.setApiEndpointCurrentUser = function (value) {
	        if (_.isString(value)) {
	          apiEndpointCurrentUser = value;
	        } else {
	          throw new TypeError('TokenAuthConfig.apiEndpointCurrentUser must be a string!');
	        }
	        return this;
	      };

	      this.setApiHost = function (value) {
	        if (_.isString(value)) {
	          apiHost = value;
	        } else {
	          throw new TypeError('TokenAuthConfig.apiHost must be a string!');
	        }
	        return this;
	      };

	      this.setHandleHttpCodes = function (httpCodesList) {
	        if (_.isArray(httpCodesList)) {
	          // check that all the items are numbers
	          _.each(httpCodesList, function (httpCode) {
	            if (!_.isNumber(httpCode)) {
	              throw new TypeError('TokenAuthConfig.handleHttpCodes must include only Numbers! ' + httpCode + ' is not a Number.');
	            }
	          });

	          handleHttpCodes = httpCodesList;
	        } else {
	          throw new TypeError('TokenAuthConfig.handleHttpCodes must be an array!');
	        }
	        return this;
	      };

	      this.addAuthFailureHandler = function (func) {
	        if (_.isFunction(func)) {
	          authFailureHandlers.push(func);
	        } else {
	          throw new TypeError('TokenAuthConfig.addAuthFailureHandlers can only contain functions!');
	        }
	        return this;
	      };

	      this.addAuthSuccessHandler = function (func) {
	        if (_.isFunction(func)) {
	          authSuccessHandlers.push(func);
	        } else {
	          throw new TypeError('TokenAuthConfig.authSuccessHandlers can only contain functions!');
	        }
	        return this;
	      };

	      this.setLogoUrl = function (value) {
	        if (_.isString(value)) {
	          logoUrl = value;
	        } else {
	          throw new TypeError('TokenAuthConfig.logoUrl must be a string!');
	        }
	        return this;
	      };

	      this.setMatchers = function (matcherList) {
	        if (_.isArray(matcherList)) {
	          // check that all the items are regex
	          _.each(matcherList, function (matcher) {
	            if (!_.isRegExp(matcher)) {
	              throw new TypeError('TokenAuthConfig.matchers must include only RegExp objects! ' + matcher + ' is not a RegExp.');
	            }
	          });

	          matchers = matcherList;
	        } else {
	          throw new TypeError('TokenAuthConfig.matchers must be an array!');
	        }
	        return this;
	      };

	      this.setTokenKey = function (value) {
	        if (_.isString(value)) {
	          tokenKey = value;
	        } else {
	          throw new TypeError('TokenAuthConfig.tokenKey must be a string!');
	        }
	        return this;
	      };

	      this.addUnauthHandler = function (func) {
	        if (_.isFunction(func)) {
	          unauthHandlers.push(func);
	        } else {
	          throw new TypeError('TokenAuthConfig.unauthHandlers can only contain functions!');
	        }
	        return this;
	      };

	      this.$get = function () {
	        return {
	          getApiEndpointAuth: _.constant(apiHost + apiEndpointAuth),
	          getApiEndpointRefresh: _.constant(apiHost + apiEndpointRefresh),
	          getApiEndpointCurrentUser: _.constant(apiHost + apiEndpointCurrentUser),
	          getApiEndpointVerify: _.constant(apiHost + apiEndpointVerify),
	          getLogoUrl: _.constant(logoUrl),
	          getTokenKey: _.constant(tokenKey),
	          callAuthFailureHandlers: function (args) {
	            if (!_.isArray(args)) {
	              args = [args];
	            }

	            authFailureHandlers.forEach(function (handler) {
	              handler.apply(null, args);
	            });
	          },
	          callAuthSuccessHandlers: function (args) {
	            if (!_.isArray(args)) {
	              args = [args];
	            }

	            authSuccessHandlers.forEach(function (handler) {
	              handler.apply(null, args);
	            });
	          },
	          callUnauthHandlers: function (args) {
	            if (!_.isArray(args)) {
	              args = [args];
	            }

	            unauthHandlers.forEach(function (handler) {
	              handler.apply(null, args);
	            });
	          },
	          /**
	           * Check if this an HTTP status code this library should handle.
	           *
	           * @param {number} httpCode - HTTP code to test.
	           * @returns {boolean} true if HTTP code indicates something to handle,
	           *    false otherwise.
	           */
	          isStatusCodeToHandle: function (httpCode) {
	            return _.includes(handleHttpCodes, httpCode);
	          },
	          /**
	           * Check if a url is a token auth url.
	           *
	           * @param {string} url - Url to test against token auth urls.
	           * @returns {boolean} true if url should be intercepted, false otherwise.
	           */
	          isTokenAuthUrl: function (url) {
	            return url.search(this.getApiEndpointAuth()) ||
	              url.search(this.getApiEndpointVerify()) ||
	              url.search(this.getApiEndpointRefresh());
	          },
	          /**
	           * Check if a given url should be intercepted by this library's interceptor.
	           *
	           * @param {string} url - Url to test against matchers.
	           * @returns {boolean} true if url should be intercepted, false otherwise.
	           */
	          shouldBeIntercepted: function (url) {
	            return _.chain(matchers)
	              .find(function (regex) {
	                return regex.test(url);
	              })
	              .isRegExp()
	              .value();
	          }
	       };
	      };
	    }
	  ]);


/***/ },
/* 86 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents.auth.interceptor', [
	  'cmsComponents.auth.service',
	  'cmsComponents.auth.config',
	  'LocalStorageModule'
	])
	  .service('TokenAuthInterceptor', [
	    '$injector', '$q', '$templateCache', 'localStorageService', 'TokenAuthConfig',
	    function ($injector, $q, $templateCache, localStorageService, TokenAuthConfig) {

	      var doIgnoreAuth = function (config) {
	        return Boolean(!config || config.ignoreTokenAuth);
	      };

	      var isTemplateRequest = function (config) {
	        return config &&
	            config.method === 'GET' &&
	            typeof $templateCache.get(config.url) !== 'undefined';
	      };

	      var abortRequest = function (config) {
	        var abort = $q.defer();
	        config.timeout = abort.promise;
	        abort.resolve();
	      };

	      this.request = function (config) {
	        if (!doIgnoreAuth(config) &&
	            !isTemplateRequest(config) &&
	            TokenAuthConfig.shouldBeIntercepted(config.url)) {

	          // get token from storage
	          var token = localStorageService.get(TokenAuthConfig.getTokenKey());
	          // need to inject service here, otherwise we get a circular $http dep
	          var TokenAuthService = $injector.get('TokenAuthService');

	          return TokenAuthService.tokenVerify()
	            .then(function () {
	              // add Authorization header
	              config.headers = config.headers || {};
	              config.headers.Authorization = 'JWT ' + token;

	              return config;
	            })
	            .catch(function () {
	              // verification failed abort request
	              abortRequest(config);
	              return $q.reject(config);
	            });
	        }

	        // this is a request not being intercepted, just return it
	        return config;
	      };

	      this.responseError = function (response) {
	        // only deal with an error if auth module is not ignored, this is a url
	        //  to deal with and the response code is unauthorized
	        var config = response.config ? response.config : response;

	        if (!doIgnoreAuth(config) &&
	            TokenAuthConfig.shouldBeIntercepted(config.url) &&
	            (!response.status || TokenAuthConfig.isStatusCodeToHandle(response.status))) {

	          // need to inject service here, otherwise we get a circular $http dep
	          var TokenAuthService = $injector.get('TokenAuthService');

	          // append request to buffer to retry later
	          TokenAuthService.requestBufferPush(config);

	          // attempt to refresh token
	          TokenAuthService.tokenRefresh();
	        }

	        return $q.reject(response);
	      };

	      return this;
	    }
	  ]);


/***/ },
/* 87 */
/***/ function(module, exports) {

	var path = 'components/cms-token-auth/cms-token-auth-login-form/cms-token-auth-login-form.html';
	var html = "<img\n    class=\"login-logo\"\n    ng-if=\"LOGO_URL\"\n    ng-src=\"{{ LOGO_URL }}\">\n\n<form name=\"loginForm\">\n  <div\n      class=\"alert alert-danger\"\n      ng-show=\"loginForm.$submitted && loginForm.$invalid\">\n    <i class=\"fa fa-exclamation-triangle\"></i>\n    <span>Username and password required!</span>\n  </div>\n\n  <div\n      class=\"alert alert-danger\"\n      ng-show=\"loginForm.$submitted && loginForm.$valid && loginErrorFromServer\">\n    <i class=\"fa fa-exclamation-triangle\"></i>\n    <span>{{ loginErrorFromServer }}</span>\n  </div>\n\n  <div\n      class=\"form-group\"\n      ng-class=\"{'has-error': loginForm.$submitted && loginForm.username.$invalid}\">\n    <label class=\"control-label\">Username</label>\n    <input\n        tabindex=\"0\"\n        type=\"text\"\n        class=\"form-control\"\n        name=\"username\"\n        ng-model=\"username\"\n        ng-change=\"clearLoginErrorFromServer()\"\n        autofocus\n        required>\n  </div>\n  <div\n      class=\"form-group\"\n      ng-class=\"{'has-error': loginForm.$submitted && loginForm.password.$invalid}\">\n    <label class=\"control-label\">Password</label>\n    <input\n        type=\"password\"\n        class=\"form-control\"\n        name=\"password\"\n        ng-model=\"password\"\n        ng-change=\"clearLoginErrorFromServer()\"\n        required>\n  </div>\n  <alertbar></alertbar>\n  <button\n      class=\"btn add-btn btn-success\"\n      type=\"submit\"\n      ng-click=\"submitLogin()\">\n    <span>Sign in</span>\n  </button>\n\n  <a\n      class=\"contact\"\n      href=\"mailto:webtech@theonion.com\">\n    <i class=\"fa fa-paper-plane\"></i>\n    <div class=\"contact-tech\">Contact Tech</div>\n  </a>\n</form>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 88 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents.auth.loginForm', [
	  'cmsComponents.auth.service',
	  'cmsComponents.templates'
	])
	  .directive('cmsTokenAuthLoginForm', [
	    function () {
	      return {
	        controller: [
	          '$scope', 'TokenAuthService', 'TokenAuthConfig',
	          function ($scope, TokenAuthService, TokenAuthConfig) {

	            $scope.LOGO_URL = TokenAuthConfig.getLogoUrl();

	            $scope.username = '';
	            $scope.password = '';

	            $scope.clearLoginErrorFromServer = function () {
	              $scope.loginErrorFromServer = null;
	            };

	            $scope.submitLogin = function () {
	              $scope.loginErrorFromServer = null;

	              if(!_.isEmpty($scope.username) && !_.isEmpty($scope.password)) {
	                TokenAuthService.login($scope.username, $scope.password)
	                  .catch(function (error) {
	                    var message;
	                    if (error.status === 500) {
	                      message = 'An error occurred on the server. Try again later or contact tech below.';
	                    } else {
	                      message = error.data.non_field_errors[0];
	                    }
	                    $scope.loginErrorFromServer = message;
	                  });
	              }
	            };
	          }
	        ],
	        restrict: 'E',
	        scope: {},
	        templateUrl: 'components/cms-token-auth/cms-token-auth-login-form/cms-token-auth-login-form.html'
	      };
	    }
	  ]);


/***/ },
/* 89 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 90 */,
/* 91 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents.auth.loginRequiredWrapper', [
	  'cmsComponents.auth.user'
	])
	  .directive('cmsLoginRequiredWrapper', [
	    function () {
	      return {
	        template: '<ng-transclude ng-if="user"></ng-transclude>',
	        restrict: 'E',
	        transclude: true,
	        controller: [
	          '$scope', 'CurrentUser',
	          function ($scope, CurrentUser) {
	            CurrentUser.$get();

	            var onLogin = function (user) {
	              $scope.user = user;
	            };

	            var onLogout = function () {
	              $scope.user = null;
	            };

	            CurrentUser.addLoginHandler(onLogin);
	            CurrentUser.addLogoutHandler(onLogout);

	            $scope.$on('$destroy', function () {
	              CurrentUser.removeLoginHandler(onLogin);
	              CurrentUser.removeLogoutHandler(onLogout);
	            });
	          }
	        ]
	      }
	    }
	  ]);


/***/ },
/* 92 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents.auth.logout', [
	  'cmsComponents.auth.service'
	])
	  .directive('cmsTokenAuthLogout', [
	    function () {
	      return {
	        restrict: 'E',
	        controller: [
	          'TokenAuthService',
	          function (TokenAuthService) {
	            TokenAuthService.logout();
	          }
	        ]
	      }
	    }
	  ]);


/***/ },
/* 93 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents.auth.service', [
	  'cmsComponents.auth.config',
	  'cmsComponents.auth.user',
	  'LocalStorageModule'
	])
	  .service('TokenAuthService', [
	    '$q', '$http', 'CurrentUser', 'localStorageService', 'TokenAuthConfig',
	    function ($q, $http, CurrentUser, localStorageService, TokenAuthConfig) {

	      var TokenAuthService = this;
	      var requestInProgress = false;
	      var verifiedAtLeastOnce = false;
	      var verificationInProgress = false;

	      var clearAuth = function () {
	        TokenAuthService.requestBufferClear();
	        TokenAuthConfig.callAuthFailureHandlers();
	        CurrentUser.logout();
	      };

	      TokenAuthService._requestBuffer = [];

	      /**
	       * Token verification endpoint. Should be used as the initial request when
	       *  a page loads to check if user is authenticated. All requests should be
	       *  buffered until verify endpoint returns successfully.
	       *
	       * Because token verification is meant only to occur once when the page loads,
	       *  subsequent calls to this function will return the promise from the original
	       *  call.
	       *
	       * @returns {promise} resolves when authenticated, rejects otherwise.
	       */
	      TokenAuthService.tokenVerify = function () {

	        if (verifiedAtLeastOnce) {
	          // we only call this verify endpoint one time
	          return $q.resolve();
	        }

	        if (verificationInProgress) {
	          // already doing verification, just return that promise
	          return verificationInProgress;
	        }

	        if (requestInProgress) {
	          // there's already an auth request going, reject verification
	          return $q.reject();
	        }

	        var token = localStorageService.get(TokenAuthConfig.getTokenKey());
	        if (!token) {
	          // no token in storage, reject verification
	          clearAuth();
	          return $q.reject('session expired');
	        }

	        // no currently running request, start a new one
	        requestInProgress = true;

	        verificationInProgress = $http.post(
	          TokenAuthConfig.getApiEndpointVerify(),
	          {
	            token: token
	          },
	          {
	            ignoreTokenAuth: true
	          }
	        )
	          .then(function () {
	            verifiedAtLeastOnce = true;
	            TokenAuthService.requestBufferRetry();
	            TokenAuthConfig.callAuthSuccessHandlers();
	            CurrentUser.$get();
	          })
	          .catch(function (response) {
	            var promise;

	            if (response.status === 400) {
	              // this is an expired token, attempt refresh
	              requestInProgress = false;
	              promise = TokenAuthService.tokenRefresh()
	                .then(function () {
	                  verifiedAtLeastOnce = true;
	                });
	            } else if (TokenAuthConfig.isStatusCodeToHandle(response.status)) {
	              // user is not authorized, reject everything, user needs to login
	              clearAuth();
	              promise = $q.reject('not authorized');
	            } else {
	              // this is not an auth error, reject verification
	              promise = $q.reject();
	            }

	            return promise;
	          })
	          .finally(function () {
	            // reset request flag so other requests can go through
	            requestInProgress = false;
	          });

	        return verificationInProgress;
	      };

	      /**
	       * Token refresh endpoint. Should be used for reauthenticating ajax requests
	       *  that have responded with an unauthorized status code.
	       *
	       * @returns {promise} resolves when authenticated, rejects otherwise.
	       */
	      TokenAuthService.tokenRefresh = function () {
	        if (requestInProgress) {
	          // there's already an auth request going, reject
	          return $q.reject();
	        }

	        var token = localStorageService.get(TokenAuthConfig.getTokenKey());
	        if (!token) {
	          // no token in storage, reject
	          clearAuth();
	          return $q.reject('session expired');
	        }

	        // no currently running request, start a new one
	        requestInProgress = true;

	        return $http.post(
	          TokenAuthConfig.getApiEndpointRefresh(),
	          {
	            token: token
	          },
	          {
	            ignoreTokenAuth: true
	          }
	        )
	          .then(function (tokenResponse) {
	            localStorageService.set(TokenAuthConfig.getTokenKey(), tokenResponse.data.token);
	            verifiedAtLeastOnce = true;
	            TokenAuthService.requestBufferRetry();
	            TokenAuthConfig.callAuthSuccessHandlers();
	            CurrentUser.$get();
	          })
	          .catch(function (error) {
	            clearAuth();
	            return $q.reject(error);
	          })
	          .finally(function () {
	            // reset request flag so other requests can go through
	            requestInProgress = false;
	          });
	      };

	      /**
	       * Login endpoint. Should only be used where a user is providing a username
	       *  and password to login.
	       *
	       * Calls TokenAuthConfig.callAuthSuccessHandlers on success, and
	       *  TokenAuthConfig.callAuthFailureHandlers on failure.
	       *
	       * Sets token key in local storage on success.
	       *
	       * @param {string} username - username to use to login.
	       * @param {string} password - password to use to login.
	       * @returns {promise} resolves when fully authenticated, rejects otherwise.
	       */
	      TokenAuthService.login = function (username, password) {
	        if (requestInProgress) {
	          // there's already an auth request going, reject
	          return $q.reject();
	        }

	        // no currently running request, start a new one
	        requestInProgress = true;

	        return $http.post(
	          TokenAuthConfig.getApiEndpointAuth(),
	          {
	            username: username,
	            password: password
	          },
	          {
	            ignoreTokenAuth: true
	          }
	        )
	          .then(function (tokenResponse) {
	            localStorageService.set(TokenAuthConfig.getTokenKey(), tokenResponse.data.token);
	            verifiedAtLeastOnce = true;
	            TokenAuthConfig.callAuthSuccessHandlers();
	            CurrentUser.$get();
	          })
	          .catch(function (error) {
	            CurrentUser.logout();
	            TokenAuthConfig.callAuthFailureHandlers();
	            return $q.reject(error);
	          })
	          .finally(function () {
	            // reset request flag so other requests can go through
	            requestInProgress = false;
	          });
	      };

	      /**
	       * Log user out by removing token from local storage, sends them back to
	       *  login page.
	       */
	      TokenAuthService.logout = function () {
	        CurrentUser.logout();
	        TokenAuthConfig.callUnauthHandlers();
	        localStorageService.remove(TokenAuthConfig.getTokenKey());
	      };

	      /**
	       * Push a request configuration into buffer to be rerun later.
	       *
	       * @param {object} config - request configuration to be buffered.
	       * @returns {object} cloned config object added to the buffer.
	       */
	      TokenAuthService.requestBufferPush = function (config) {
	        var configCopy = _.omit(config, 'timeout');
	        TokenAuthService._requestBuffer.push(configCopy);
	        return configCopy;
	      };

	      /**
	       * Retry all buffered requests. If any response returns with an
	       *  unauthorized status code, all further buffered requests will be aborted.
	       *  Clears buffer in every case.
	       */
	      TokenAuthService.requestBufferRetry = function () {
	        var abort = $q.defer();

	        _.each(TokenAuthService._requestBuffer, function (config) {
	          // hook for canceling requests after a failure
	          config.timeout = abort.promise;

	          $http(config)
	            .catch(function (response) {
	              if (TokenAuthConfig.isStatusCodeToHandle(response.status)) {
	                // have one failure, abort all other requests
	                return abort.resolve();
	              }
	            });
	         });

	         TokenAuthService.requestBufferClear();
	      };

	      /**
	       * Remove all request configurations from request buffer.
	       */
	      TokenAuthService.requestBufferClear = function () {
	        TokenAuthService._requestBuffer = [];
	      };

	      return TokenAuthService;
	    }
	  ]);


/***/ },
/* 94 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents.auth.user', [
	  'cmsComponents.auth.config'
	])
	  .service('CurrentUser', [
	    '$http', '$q', 'TokenAuthConfig',
	    function ($http, $q, TokenAuthConfig) {
	      var data = {
	        user: null
	      };

	      var handlers = {
	        login: [],
	        logout: []
	      };

	      var lastRequest = null;
	      var lastLogout = null;

	      return {
	        $get: function () {
	          if (!lastRequest) {
	            lastRequest = $http.get(TokenAuthConfig.getApiEndpointCurrentUser())
	              .then(function (response) {
	                data.user = response.data;

	                lastLogout = null;
	                handlers.login.forEach(function (handler) {
	                  handler(data.user);
	                });

	                return data.user;
	              })
	              .catch(function (error) {
	                lastRequest = null;
	                return $q.reject(error);
	              });
	          }

	          return lastRequest;
	        },
	        addLoginHandler: function (func) {
	          handlers.login.push(func);

	          if (lastRequest) {
	            lastRequest.then(func);
	          }
	        },
	        addLogoutHandler: function (func) {
	          handlers.logout.push(func);

	          if (lastLogout) {
	            lastLogout.then(func);
	          }
	        },
	        removeLoginHandler: function (func) {
	          var index = handlers.login.indexOf(func);
	          if (index >= 0) {
	            handlers.login.splice(index, 1);
	          }
	        },
	        removeLogoutHandler: function (func) {
	          var index = handlers.logout.indexOf(func);
	          if (index >= 0) {
	            handlers.logout.splice(index, 1);
	          }
	        },
	        logout: function () {
	          if (!lastLogout) {
	            lastLogout = $q.resolve();

	            data.user = null;

	            lastRequest = null;
	            handlers.logout.forEach(function (handler) {
	              handler();
	            });
	          }

	          return lastLogout;
	        }
	      };
	    }
	  ]);


/***/ },
/* 95 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents.auth', [
	  'cmsComponents.auth.interceptor',
	  'cmsComponents.auth.config',
	  'cmsComponents.auth.loginForm',
	  'cmsComponents.auth.loginRequiredWrapper',
	  'cmsComponents.auth.logout',
	  'cmsComponents.auth.user'
	]);


/***/ },
/* 96 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents.tooltip', [])
	  .directive('cmsTooltip', function () {
	    return {
	      restrict: 'A',
	      scope: {
	        text: '@cmsTooltip',
	        classes: '@cmsTooltipClasses'
	      },
	      link: function (scope, elements) {

	        var tooltipEle = angular.element(
	          '<div class="cms-tooltip-container ' + scope.classes + '">' +
	            '<span class="cms-tooltip-text">' + scope.text + '</span>' +
	          '</div>'
	        );
	        angular.element(document.body).append(tooltipEle);

	        elements.on('mouseenter', function (e) {
	          var $target = angular.element(e.target);

	          var offset = $target.offset();
	          var left = offset.left + $target.width() + 10;
	          var top = offset.top - $target.height() / 2;

	          tooltipEle.css('display', 'block');
	          tooltipEle.css('left', left);
	          tooltipEle.css('top', top);
	        });

	        elements.on('mouseleave', function () {
	          tooltipEle.css('display', 'none');
	        });

	        scope.$on('$destroy', function () {
	          tooltipEle.remove();
	        });
	      }
	    }
	  });


/***/ },
/* 97 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 98 */,
/* 99 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents.unsavedChangesGuard', [])
	  .directive('cmsUnsavedChangesGuard', [
	    function () {
	      return {
	        require: ['form'],
	        restrict: 'A',
	        link: function ($scope, elements, attrs, ctrls) {
	          var parentForm = ctrls[0];

	          var checkDirty = function () {
	            if (parentForm.$dirty) {
	              return 'You have unsaved changes! Are you sure you want to continue?';
	            }
	          };

	          window.addEventListener('beforeunload', checkDirty);

	          $scope.$on('$destroy', function () {
	            window.removeEventListener('beforeunload', checkDirty);
	          });

	          $scope.$on('$stateChangeStart', function (e) {
	            var check = checkDirty();
	            if (!e.defaultPrevented && check && !confirm(check)) {
	              e.preventDefault();
	            }
	          });
	        }
	      }
	    }
	  ]);


/***/ },
/* 100 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('convertToNumber', function () {
	    return {
	      require: 'ngModel',
	      link: function(scope, element, attrs, ngModel) {
	        ngModel.$parsers.push(function(val) {
	          return parseInt(val, 10);
	        });
	        ngModel.$formatters.push(function(val) {
	          return '' + val;
	        });
	      }
	    };
	  });


/***/ },
/* 101 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents.filters.userDisplay', [])
	  .filter('userDisplay', [
	    function () {
	      return function (user) {
	        var name = '';

	        if (user) {
	          if (user.full_name) {
	            name = user.full_name;
	          } else if (user.first_name && user.last_name) {
	            name = user.first_name + ' ' + user.last_name;
	          } else {
	            name = user.username;
	          }
	        }

	        return name;
	      };
	    }
	  ]);


/***/ },
/* 102 */
/***/ function(module, exports) {

	var path = 'components/sidebar-nav-item/sidebar-nav-item.html';
	var html = "<a ng-transclude ui-sref=\"{{sref}}\"></a>\n";
	window.angular.module('cmsComponents.templates').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 103 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('sidebarNavItem', function () {
	    return {
	      templateUrl: 'components/sidebar-nav-item/sidebar-nav-item.html',
	      restrict: 'E',
	      scope: {
	        'sref': '@'
	      },
	      transclude: true
	    }
	  });


/***/ },
/* 104 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 105 */,
/* 106 */
/***/ function(module, exports) {

	'use strict';

	angular.module('cmsComponents')
	  .directive('uiSrefActiveIf', ['$state', function($state) {
	    return {
	        restrict: "A",
	        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
	            var state = $attrs.uiSrefActiveIf;

	            function update() {
	                if ( $state.includes(state) || $state.is(state) ) {
	                    $element.addClass("active");
	                } else {
	                    $element.removeClass("active");
	                }
	            }

	            $scope.$on('$stateChangeSuccess', update);
	            update();
	        }]
	    };
	}])


/***/ }
/******/ ]);