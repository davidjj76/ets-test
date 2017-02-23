'use strict';

var angular = require('angular');

// Create module
angular.module('symbolDetail', ['core', 'lineChart']);

// Require core module (Symbol service & filters)
require('../core/core.module');

// Require line chart module
require('../line-chart/line-chart.module');

// Require component
require('./symbol-detail.component');
