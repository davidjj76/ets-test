'use strict';

var angular = require('angular');

angular.
  module('symbolDetail').
  component('symbolDetail', {
    templateUrl: './app/symbol-detail/symbol-detail.template.html',
    controller: ['$routeParams', '$window', 'Symbol', 'appGlobals',
      function SymbolDetailController($routeParams, $window, Symbol, appGlobals) {
  		var self = this;
	    Symbol.get({symbolId: $routeParams.symbolId}, 
	    	function(symbol) {
	    		self.symbol = symbol;
		      	if(appGlobals.symbols.length) {
	  		  		self.symbols = appGlobals.symbols;
		      	} else {
					Symbol.query(function(symbols) {
			          appGlobals.symbols = symbols.map(function(symbol) {
			            return { id: symbol.id, name: symbol.name}
			          });
			          self.symbols = appGlobals.symbols;
					}, function() {
			      		redirectTo('/#!/symbols');
					})
	    		}
	    	},
	    	function() {
	      		redirectTo('/#!/symbols');
	    	}
	    );

     	function redirectTo(route) {
      		$window.location.href = route;	
      	}

      }
  ]});
