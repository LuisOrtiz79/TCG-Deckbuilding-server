var express = require('express');
var router = express.Router();

const Comments = require('../models/Comments');

// GET comments
router.get('/', (req, res, next) => {
    Comments.find({})
        .then((comments) => {
            console.log('Retrieved Comments ===> ', comments);
            res.json(cohorts);
        })
        .catch((error) => {
            console.error('Error while retrieving comments ===> ', error);
            res.status(500).json({ error: 'Failed to retrieve comments' });
        });
});

// GET comment by id
router.get('/:commentId', (req, res, next) => {
    const { commentId } = req.params;

    Comments.findById(commentId)
        .then((comment) => {
            console.log('Retrieved Comment ===> ', comment);
            res.json(comment);
        })
        .catch((error) => {
            console.error('Error while retrieving comment ===> ', error);
            res.status(500).json({ error: 'Failed to retrieve comment' });
        });
});

// POST new comments
router.post('/', (req, res, next) => {
    Comments.create({
        user: req.body.user,
        deck: req.body.deck,
        comments: req.body.comments
    })
    .then((createdComment) => {
        console.log('Comment created ===> ', createdComment);
        res.status(201).json(createdComment);
    })
    .catch((error) => {
        console.error('Error while creating comment ===> ', error);
        res.status(500).json({ error: 'Failed to create comment' });
    });
});

// PUT update comment by id
router.put('/:commentId', (req, res, next) => {
    const { commentId } = req.params;

    Comments.findByIdAndUpdate(commentId, req.body, { new: true })
        .then((UpdatedComment) => {
            console.log('Updated Comment ===> ', UpdatedComment);
            res.status(200).json(UpdatedComment);
        })
        .catch((error) => {
            console.error('Error while updating comment ===> ', error);
            res.status(500).json({ error: 'Failed to update comment' });
        });
});

// DELETE comment by id
router.delete('/:commentId', (req, res, next) => {
    const { commentId } = req.params;

    Comments.findByIdAndDelete(commentId)
        .then((result) => {
            console.log('Comment deleted!');
            res.status(200).json(result);
        })
        .catch((error) => {
            console.error('Error while deleting comment ===> ', error);
            res.status(500).json({ error: 'Deleting comment failed' });
        });
});

module.exports = router;