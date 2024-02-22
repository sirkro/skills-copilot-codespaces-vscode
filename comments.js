// Create web server
// Use express
// Use body parser
// Use mongoose
// Use Comment model
// Create a new comment
// Get all comments
// Update a comment
// Delete a comment
// Export router

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Comment = require('../models/comment');

var commentRouter = express.Router();
commentRouter.use(bodyParser.json());

commentRouter.route('/')
.get(function(req,res,next){
    Comment.find({}, function(err, comment){
        if(err) throw err;
        res.json(comment);
    });
})

.post(function(req, res, next){
    Comment.create(req.body, function(err, comment){
        if(err) throw err;
        console.log('Comment created');
        var id = comment._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the comment with id: ' + id);
    });
})

.delete(function(req, res, next){
    Comment.remove({}, function(err, resp){
        if(err) throw err;
        res.json(resp);
    });
});

commentRouter.route('/:commentId')
.get(function(req,res,next){
    Comment.findById(req.params.commentId, function(err, comment){
        if(err) throw err;
        res.json(comment);
    });
})

.put(function(req, res, next){
    Comment.findByIdAndUpdate(req.params.commentId, {
        $set: req.body
    }, {
        new: true
    }, function(err, comment){
        if(err) throw err;
        res.json(comment);
    });
})

.delete(function(req, res, next){
    Comment.findByIdAndRemove(req.params.commentId, function(err, resp){
        if(err) throw err;
        res.json(resp);
    });
});

module.exports = commentRouter;