'use strict';

var angular = require('angular');
require('angular-local-storage');

angular.
  module('core.comment').
  factory('Comment', ['localStorageService', '$q',
    function(localStorageService, $q) {
      return {
        query: function(symbolId) {
          // Someday this function wil be async
          var defered = $q.defer();
          var promise = defered.promise;
          setTimeout(function() {
            if (localStorageService.isSupported) {
              var commentKey = 'comment-' + symbolId + '-';
              var comments = localStorageService.keys()
                      .filter(function(key) {
                        return key.startsWith(commentKey);
                      })
                      .map(function(item) {
                        return localStorageService.get(item);
                      })
                      .sort(function(a, b) {
                        return new Date(b.date) - new Date(a.date);
                      }); 
              defered.resolve(comments);
            } else {
              defered.reject({"browser": "Local Storage not supported"});
            }
          }, 500);
          return promise;
        },
        save: function(symbolId, commentId, comment) {
          // Someday this function wil be async
          var defered = $q.defer();
          var promise = defered.promise;
          setTimeout(function() {
            if (localStorageService.isSupported) {
              var key = 'comment-' + symbolId + '-' + commentId;
              localStorageService.set(key, comment);
              defered.resolve(comment);
            } else {
              defered.reject({"browser": "Local Storage not supported"});
            }
          }, 500);
          return promise;
        },
        remove: function(symbolId, commentId) {
          // Someday this function wil be async
          var defered = $q.defer();
          var promise = defered.promise;
          setTimeout(function() {
            if (localStorageService.isSupported) {
              var key = 'comment-' + symbolId + '-' + commentId;
              localStorageService.remove(key);
              defered.resolve(commentId);
            } else {
              defered.reject({"browser": "Local Storage not supported"});
            }
          }, 500);
          return promise;
        },
      };
    }
  ]);
