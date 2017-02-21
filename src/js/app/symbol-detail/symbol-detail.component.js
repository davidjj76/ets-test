'use strict';

var angular = require('angular');

angular.
  module('symbolDetail').
  component('symbolDetail', {
    // TODO: mediante tarea de gulp colocar correctamente los templates html
    templateUrl: 'src/js/app/symbol-detail/symbol-detail.template.html',
    controller: ['$http', '$routeParams',
      function SymbolDetailController($http, $routeParams) {
        var self = this;
        $http.get('http://jsonstub.com/etsfintech/symbols/' + $routeParams.symbolId, {
          data: '',
          headers: {
            'Content-Type': 'application/json',
            'JsonStub-Project-Key': '6ed070c1-b334-4612-8fa8-169c5e45baef',
            'JsonStub-User-Key': '9facef2e-9583-4a83-9f08-c87159f1c113',
          }
        }).
        then(function(response) {
          console.log(response);
          self.symbol = response.data;
        });
      }
  ]});
