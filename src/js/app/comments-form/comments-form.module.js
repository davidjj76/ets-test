'use strict';

var angular = require('angular');
require('angular-sanitize');
require('angular-messages');

// Create module
angular.module('commentsForm', ['core.comment', 'ngSanitize', 'ngMessages']);

// Require core module
require('../core/core.module');

// Require component
require('./comments-form.component');
