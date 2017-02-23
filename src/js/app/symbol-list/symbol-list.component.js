'use strict';

var angular = require('angular');

angular.
  module('symbolList').
  component('symbolList', {
    templateUrl: './app/symbol-list/symbol-list.template.html',
    controller: ['Symbol', 'appGlobals',
      function SymbolListController(Symbol, appGlobals) {
        var self = this;
        Symbol.query(function(symbols) {
          self.symbols = symbols;
          appGlobals.symbols = self.symbols.map(function(symbol) {
            return { id: symbol.id, name: symbol.name}
          });
        });
      }
  ]});
