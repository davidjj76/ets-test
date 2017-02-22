'use strict';

var angular = require('angular');

// Create module
angular.module('symbolList', ['core']);

// Require core module (Symbol service & filters)
require('../core/core.module');

// Require component
require('./symbol-list.component');
