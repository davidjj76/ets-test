'use strict';

var angular = require('angular');
require('angular-aria');
require('angular-animate');
require('angular-material');

// Create module
var etsApp = angular.module('etsApp', [
  'ngMaterial',
  'ngRoute',
  'core',
  'symbolList',
  'symbolDetail'
]).value('appGlobals', { symbols: [] });

// Require config
require('./app.config.js');

// Require other components
require('./symbol-detail/symbol-detail.module');
require('./symbol-list/symbol-list.module');
