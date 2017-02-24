'use strict';

var angular = require('angular');
require('angular-sanitize');

// Create module
angular.module('commentsForm', ['core.comment', 'ngSanitize']);

// Require core module
require('../core/core.module');

// Require component
require('./comments-form.component');
