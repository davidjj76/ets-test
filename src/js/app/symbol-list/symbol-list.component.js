'use strict';

var angular = require('angular');

angular.
  module('symbolList').
  component('symbolList', {
    templateUrl: './app/symbol-list/symbol-list.template.html',
    controller: ['Symbol', 
      function SymbolListController(Symbol) {
        this.symbols = Symbol.query();
      }
  ]});
