'use strict';

var angular = require('angular');
require('angular-resource');

angular.
  module('core.symbol').
  factory('Symbol', ['$resource',
    function($resource) {
      var headers = {
        'Content-Type': 'application/json',
        'JsonStub-Project-Key': '6ed070c1-b334-4612-8fa8-169c5e45baef',
        'JsonStub-User-Key': '9facef2e-9583-4a83-9f08-c87159f1c113'
      };

      return $resource('http://jsonstub.com/etsfintech/symbols/:symbolId', {}, {
        query: {
          method: 'GET',
          params: {symbolId: ''},
          data: '',
          isArray: true,
          headers: headers
        },
        get: {
          method: 'GET',
          params: {symbolId: ':symbolId'},
          data: '',
          headers: headers
        },
      });
    }
  ]);