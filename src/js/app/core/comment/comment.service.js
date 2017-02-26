'use strict';

var angular = require('angular');
require('angular-local-storage');

angular.
  module('core.comment').
  factory('Comment', ['localStorageService',
    function(localStorageService) {

      return {
        query: function(symbolId) {
          var commentKey = 'comment-' + symbolId + '-';
          return localStorageService.keys()
                  .filter(function(key) {
                    return key.startsWith(commentKey);
                  }).
                  map(function(item) {
                    return localStorageService.get(item);
                  }).
                  sort(function(a, b) {
                    return new Date(b.date) - new Date(a.date);
                  });
        },
        save: function(symbolId, commentId, comment) {
          var key = 'comment-' + symbolId + '-' + commentId;
          localStorageService.set(key, comment);
          return this.query(symbolId);
        },
        remove: function(symbolId, commentId) {
          var key = 'comment-' + symbolId + '-' + commentId;
          localStorageService.remove(key);
          return this.query(symbolId);
        },
      };
    }
  ]);
