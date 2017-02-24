'use strict';

var angular = require('angular');

// Create module
angular.module('commentsForm', ['core.comment']);

// Require core module (Symbol service & filters)
require('../core/core.module');

// Require component
require('./comments-form.component');
