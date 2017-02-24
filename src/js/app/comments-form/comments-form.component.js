'use strict';

var angular = require('angular');
var shortid = require('shortid');

angular.
  module('commentsForm').
  component('commentsForm', {
    templateUrl: './app/comments-form/comments-form.template.html',
    bindings: {
      symbolId: "@"
    },
    controller: ['Comment',
      function CommentsFormController(Comment) {

        var self = this;

        self.$onChanges = function(changes) {
          if(changes.symbolId.currentValue) {
            self.symbolId = changes.symbolId.currentValue;
            self.comments = Comment.query(self.symbolId);
          }
        }

        self.sendComment = function(isValid) {
          if(isValid) {
            var commentId = shortid.generate();
            self.comments = Comment.save(self.symbolId , commentId, {
              id: commentId,
              message: self.newComment,
              date: new Date()
            });
            self.newComment = '';            
          }
        }

        self.deleteComment = function(commentId) {
          self.comments = Comment.remove(self.symbolId , commentId);
        }

    }
  ]});
