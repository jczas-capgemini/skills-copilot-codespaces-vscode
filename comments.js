// Create web server
var express = require('express');
var router = express.Router();

// Import comment model
var Comment = require('../models/comment');

// Get comments
router.get('/', function(req, res) {
    Comment.find({}, function(err, comments) {
        if (err) {
            res.send('Error getting comments: ', err);
        } else {
            res.json(comments);
        }
    });
});

// Add comment
router.post('/', function(req, res) {
    var comment = new Comment(req.body);
    comment.save(function(err, comment) {
        if (err) {
            res.send('Error saving comment: ', err);
        } else {
            res.json(comment);
        }
    });
});

// Delete comment
router.delete('/:id', function(req, res) {
    var id = req.params.id;
    Comment.findByIdAndRemove(id, function(err, comment) {
        if (err) {
            res.send('Error deleting comment: ', err);
        } else {
            res.json(comment);
        }
    });
});

// Update comment
router.put('/:id', function(req, res) {
    var id = req.params.id;
    var comment = req.body;
    var options = {new: true};
    Comment.findByIdAndUpdate(id, comment, options, function(err, comment) {
        if (err) {
            res.send('Error updating comment: ', err);
        } else {
            res.json(comment);
        }
    });
});

// Export router
module.exports = router;