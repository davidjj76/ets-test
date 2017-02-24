'use strict';

var angular = require('angular');

angular.
  module('symbolList').
  component('symbolList', {
    templateUrl: './app/symbol-list/symbol-list.template.html',
    controller: ['Symbol', 'appGlobals',
      function SymbolListController(Symbol, appGlobals) {

        var self = this;

        self.filterSymbol = function() {
          return function (symbol) {
              if (self.currencies && self.risk_families) {
                return (self.currencies.indexOf(symbol.currency) !== -1 && 
                        self.risk_families.indexOf(symbol.risk_family) !== -1);                
              }
          };
        }

        Symbol.query(function(symbols) {
          self.symbols = symbols;
          appGlobals.symbols = self.symbols.map(function(symbol) {
            return { id: symbol.id, name: symbol.name}
          });
        });
      }
  ]});
