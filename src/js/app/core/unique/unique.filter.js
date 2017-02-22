'use strict';

var angular = require('angular');

angular.
  module('core').
  filter('unique', function() {
    return function(input, key) {

        var uniqueList = [];
        var unique = {};

       if(input) {
          for(var i = 0; i < input.length; i++){
              if(typeof unique[input[i][key]] === "undefined"){
                  unique[input[i][key]] = "";
                  uniqueList.push(input[i]);
              }
          }          
        }
        return uniqueList; 
    };
  });
