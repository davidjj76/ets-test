'use strict';

var angular = require('angular');
require('angular-route');

angular.
  module('etsApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/symbols', {
          template: '<symbol-list></symbol-list>'
        }).
        when('/symbols/:symbolId', {
          template: '<symbol-detail></symbol-detail>'
        }).
        otherwise('/symbols');
    }
  ]);

angular.
  module('etsApp').
  config(['$mdThemingProvider', 
    function($mdThemingProvider) {
      $mdThemingProvider
        .theme('default')
        .primaryPalette('blue')
        .accentPalette('pink')
        .warnPalette('red')
        .backgroundPalette('grey');
    }
]);
