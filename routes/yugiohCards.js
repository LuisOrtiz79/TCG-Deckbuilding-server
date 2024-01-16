var express = require('express');
var router = express.Router();

const YugiohCards = require('../models/YugiohCards');

// GET all cards
router.get('/', (req, res, next) => {
    YugiohCards.find({})
        .then((cards) => {
            console.log('Retrieved YugiohCards ===> ', cards);
            res.json(cards);
        })
        .catch((error) => {
            console.error('Error while retrieving yugioh cards ===> ', error);
            res.status(500).json({ error: "Failed to retrieve yugioh cards" });
        });
});

// GET cards by its id
router.get('/:cardId', (req, res, next) => {
    const { cardId } = req.params;

    YugiohCards.findById(cardId)
        .then((card) => {
            console.log('Retrieved YugiohCard ===> ', card);
            res.json(card);
        })
        .catch((error) => {
            console.error('Error while retrieving yugioh card ===> ', error);
            res.status(500).json({ error: 'Failed to retrieve yugioh card' });
        });
});

module.exports = router;