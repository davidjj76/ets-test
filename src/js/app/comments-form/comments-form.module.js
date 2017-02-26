'use strict';

var angular = require('angular');
require('angular-sanitize');
require('angular-messages');
require('angular-xeditable');

// Create module
angular.module('commentsForm', ['core.comment', 'ngSanitize', 'ngMessages', "xeditable"]);

angular.module('commentsForm')
  .run(['editableOptions', 'editableThemes',
    function(editableOptions, editableThemes) {
      editableOptions.theme = 'default';
      editableThemes['default'].submitTpl = '<md-button type="submit" class="md-primary">Save</md-button>';
      editableThemes['default'].cancelTpl = '<md-button type="button" class="md-warn" ng-click="$form.$cancel()">cancel</md-button>'
    }
  ]);

// Require core module
require('../core/core.module');

// Require component
require('./comments-form.component');
