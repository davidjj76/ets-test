'use strict';

var angular = require('angular');

angular.
  module('core').
  filter('names', function() {
    return function(input, key) {
      function findNames(obj, key, list) {
        if(!obj) return list;
        if(obj instanceof Array) {
          for(var i in obj) {
              list = list.concat(findNames(obj[i], key, []));
          }
          return list;
        }
        if(obj[key]) {
          list.push(obj[key]);
        }

        if((typeof obj == "object") && (obj !== null) ){
          var children = Object.keys(obj);
          if(children.length > 0){
            for(i = 0; i < children.length; i++ ){
              list = list.concat(findNames(obj[children[i]], key, []));
            }
          }
        }
        return list;
      }
      if (input) {
        return findNames(input, key, []).join(" / ");        
      }
    };
  });
