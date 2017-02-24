'use strict';

var angular = require('angular');

// Create module
angular.module('symbolDetail', ['core', 'lineChart', 'commentsForm']);

// Require core module (Symbol service & filters)
require('../core/core.module');

// Require line chart module
require('../line-chart/line-chart.module');

// Require comments form module
require('../comments-form/comments-form.module');

// Require component
require('./symbol-detail.component');
