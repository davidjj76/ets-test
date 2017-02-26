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

        self.sendComment = function() {
          var form = self.commentsForm;
          if(form.$valid) {
            var commentId = shortid.generate();
            self.comments = Comment.save(self.symbolId , commentId, {
              id: commentId,
              author: self.author,
              message: self.message,
              date: new Date()
            });
            // Reset form
            self.author = '';
            self.message = '';
            form.$setPristine();
            form.$setUntouched();
          }
        }

        self.deleteComment = function(commentId) {
          self.comments = Comment.remove(self.symbolId , commentId);
        }

        self.updateComment = function(commentId, author, message) {
          self.comments = Comment.save(self.symbolId , commentId, {
              id: commentId,
              author: author,
              message: message,
              date: new Date()            
          });                        
        }

        self.validateComment = function(newMessage) {
          if(!newMessage) {
            return "Message is required!"
          } else if (newMessage.length > 150) {
            return "Message is too long!"
          } else {
            return true;
          }
        }
    }
  ]});
