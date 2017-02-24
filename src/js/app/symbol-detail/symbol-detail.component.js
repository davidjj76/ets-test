'use strict';

var angular = require('angular');

angular.
  module('symbolDetail').
  component('symbolDetail', {
    templateUrl: './app/symbol-detail/symbol-detail.template.html',
    controller: ['$routeParams', '$window', 'Symbol', 'appGlobals',
      function SymbolDetailController($routeParams, $window, Symbol, appGlobals) {

        this.redirectTo = function(route) {
          $window.location.href = route;  
        }

        this.setNavigation = function() {
          var actualSymbolIndex = this.symbols.map(function(symbol) { return symbol.id })
                                    .indexOf(this.symbol.id);

          this.firstSymbol = (actualSymbolIndex === 0);
          this.lastSymbol = (actualSymbolIndex === this.symbols.length - 1);
          this.previousSymbol = (this.firstSymbol) ? {} : this.symbols[actualSymbolIndex - 1];
          this.nextSymbol = (this.lastSymbol) ? {} : this.symbols[actualSymbolIndex + 1];
        }

        var self = this;

  	    Symbol.get({symbolId: $routeParams.symbolId}, 
  	    	function(symbol) {
  	    		self.symbol = symbol;
  		      	if(appGlobals.symbols.length) {
  	  		  		self.symbols = appGlobals.symbols;
                self.setNavigation();
  		      	} else {
                Symbol.query(
                  function(symbols) {
    			          appGlobals.symbols = symbols.map(function(symbol) {
    			            return { id: symbol.id, name: symbol.name}
    			          });
    			          self.symbols = appGlobals.symbols;
                    self.setNavigation();
  	 				      }, function() {
                    self.redirectTo('/#!/symbols');
                  })
              }
  	    	},
  	    	function() {
  	      		self.redirectTo('/#!/symbols');
  	    	}
  	    );
      }
  ]});
