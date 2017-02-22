'use strict';

var angular = require('angular');

angular.
  module('symbolDetail').
  component('symbolDetail', {
    templateUrl: './app/symbol-detail/symbol-detail.template.html',
    controller: ['$routeParams', 'Symbol',
      function SymbolDetailController($routeParams, Symbol) {
        this.symbol = Symbol.get({symbolId: $routeParams.symbolId});
      }
  ]});
