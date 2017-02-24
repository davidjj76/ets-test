'use strict';

var angular = require('angular');

// Create module
angular.module('core.comment', ['LocalStorageModule']);

// Config local storage service provider
angular.module('core.comment')
  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('ets-test');
}]);

// Require service
require('./comment.service');
