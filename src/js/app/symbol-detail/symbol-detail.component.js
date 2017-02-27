'use strict';

var angular = require('angular');

angular.
  module('symbolDetail').
  component('symbolDetail', {
    templateUrl: './app/symbol-detail/symbol-detail.template.html',
    controller: ['$routeParams', '$window', 'Symbol', 'appGlobals', '$q',
      function SymbolDetailController($routeParams, $window, Symbol, appGlobals, $q) {

        var self = this;

        this.loading = true;
        this.error = false;

        this.setNavigation = function() {
          var actualSymbolIndex = self.symbols
            .map(function(symbol) { return symbol.id })
            .indexOf(self.symbol.id);

          self.firstSymbol = (actualSymbolIndex === 0);
          self.lastSymbol = (actualSymbolIndex === self.symbols.length - 1);
          self.previousSymbol = (self.firstSymbol) ? {} : self.symbols[actualSymbolIndex - 1];
          self.nextSymbol = (self.lastSymbol) ? {} : self.symbols[actualSymbolIndex + 1];
        }

  	    Symbol.get({symbolId: $routeParams.symbolId}).$promise
          .then(function(symbol) {
            self.symbol = symbol;
            if(appGlobals.symbols.length) {
              self.symbols = angular.copy(appGlobals.symbols);
              self.setNavigation();
            } else {
              // Reload navigation
              Symbol.query().$promise
                .then(function(symbols) {
                  self.symbols = symbols.map(function(symbol) {
                    return { id: symbol.id, name: symbol.name };
                  });
                  self.setNavigation();
                  appGlobals.symbols = angular.copy(self.symbols);                  
                })
                .catch(function(err) {
                  self.error = true;
                  console.log(err);
                })
                .finally(function() {
                  self.loading = false;
                });
            }
          })
          .catch(function(err) {
            self.error = true;
            console.log(err);
          })
          .finally(function() {
            self.loading = false;
          });
      }
    ]
  });
