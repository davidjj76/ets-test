'use strict';

var angular = require('angular');

// Create module
angular.module('symbolDetail', ['core']);

// Require core module (Symbol service & filters)
require('../core/core.module');

// Require component
require('./symbol-detail.component');
