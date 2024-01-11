var express = require('express');
var router = express.Router();

const Games = require('../models/Game');

// GET games
router.get('/', function(req, res, next) {
    Games.find({})
        .populate('user')
        .populate('deck')
        .then((games) => {
            console.log('Retrived Games ===> ', games);
            res.json(games);
        })
        .catch((error) => {
            console.log('Error while retrieving games ===> ', error);
            res.status(500).json({ error: 'Failed to retrieve games' });
        });
});

// Get games by id
router.get('/:gameId', (req, res, next) => {
    const { gameId } = req.params;

    Games.findById(gameId)
        .populate('user')
        .populate('deck')
        .then((game) => {
            console.log('Retrieved Game ===> ', game);
            res.json(game);
        })
        .catch((error) => {
            console.log('Error while retieving game ===> ', error);
            res.status(500).json({ error: 'Failed to retrieve game' });
        });
});

module.exports = router;