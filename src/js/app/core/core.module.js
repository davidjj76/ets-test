'use strict';

var angular = require('angular');

// Create module
angular.module('core', ['core.symbol']);

// Require components
require('./symbol/symbol.module');
require('./comment/comment.module');
require('./unique/unique.filter');
require('./names/names.filter');
