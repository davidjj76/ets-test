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

        this.sending = false;

        this.$onChanges = function(changes) {
          if(changes.symbolId.currentValue) {
            self.symbolId = changes.symbolId.currentValue;
            Comment.query(self.symbolId)
              .then(function(comments) {
                self.comments = comments; 
              })
              .catch(function(err) {
                console.log(err);
              });
          }
        }

        this.sendComment = function() {
          var form = self.commentsForm;
          if(form.$valid) {
            var commentId = shortid.generate();
            var comment = {
              id: commentId,
              author: self.author,
              message: self.message,
              date: new Date()
            };
            self.saveComment(comment);
          }
        }

        this.deleteComment = function(commentId) {
          // Disable delete button
          self.sending = true;
          Comment.remove(self.symbolId , commentId)
            .then(function(commentId) {
              return Comment.query(self.symbolId);
            })
            .then(function(comments) {
              self.comments = comments;
            })
            .catch(function(err) {
              console.log(err);              
            })
            .finally(function() {
              self.sending = false;
            });
        }

        this.updateComment = function(commentId, author, message) {
          var comment = {
              id: commentId,
              author: author,
              message: message,
              date: new Date()            
          };
          self.saveComment(comment);
        }

        this.saveComment = function(comment) {
          // Disable send button
          self.sending = true;
          Comment.save(self.symbolId , comment.id, comment)
            .then(function(comment) {
              self.resetForm();
              return Comment.query(self.symbolId);
            })
            .then(function(comments) {
              self.comments = comments;
            })
            .catch(function(err) {
              console.log(err);
            })
            .finally(function() {
              self.sending = false;
            });
        }

        this.validateComment = function(newMessage) {
          if(!newMessage) {
            return "Message is required!"
          } else if (newMessage.length > 150) {
            return "Message is too long!"
          } else {
            return true;
          }
        }

        this.resetForm = function() {
          // Reset form
          var form = self.commentsForm;
          self.author = '';
          self.message = '';
          form.$setPristine();
          form.$setUntouched();
        }

    }
  ]});
