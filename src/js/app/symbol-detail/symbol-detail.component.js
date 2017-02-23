'use strict';

var angular = require('angular');

angular.
  module('symbolDetail').
  component('symbolDetail', {
    templateUrl: './app/symbol-detail/symbol-detail.template.html',
    controller: ['$routeParams', 'Symbol', 'appGlobals',
      function SymbolDetailController($routeParams, Symbol, appGlobals) {
        this.symbols = appGlobals.symbols;
        this.symbol = Symbol.get({symbolId: $routeParams.symbolId});
      }
  ]});
