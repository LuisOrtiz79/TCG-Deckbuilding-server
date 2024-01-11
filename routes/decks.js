var express = require('express');
var router = express.Router();

const Decks = require('../models/Deck');
const YugiohCards = require('../models/YugiohCards');

// GET decks
router.get('/', (req, res, next) => {
    Decks.find({})
        .populate('user')
        .populate('cards')
        .then((decks) => {
            console.log('Retrieved Decks ===> ', decks);
            res.json(decks);
        })
        .catch((error) => {
            console.error('Error while retrieving decks ===> ', error);
            res.status(500).json({ error: "Failed to retrieve decks" });
        });
});

// GET decks by id
router.get('/:deckId', (req, res, next) => {
    const { deckId } = req.params;

    Decks.findById(deckId)
        .populate('user')
        .populate('cards')
        .then((deck) => {
            console.log('Retrieved Deck ===> ', deck);
            res.json(deck);
        })
        .catch((error) => {
            console.error('Error while retrieving deck ===> ', error);
            res.status(500).json({ error: 'Failed to retrieve deck' });
        });
});

// GET cards from the deck by id ===> fix
router.get('/:deckId/cards', (req, res, next) => {
    const { deckId } = req.params;

    Decks.findById(deckId)
        .populate('cards')
        .then((deck) => {
            console.log('Retrieved Deck ===> ', deck);
            res.json(deck);
        })
        .catch((error) => {
            console.error('Error while retrieving deck ===> ', error);
            res.status(500).json({ error: 'Failed to retrieve deck' });
        });
});

// POST create new decks
router.post('/', (req, res, next) => {
    Decks.create({
        user: req.body.user,
        game: req.body.game,
        name: req.body.name,
        cards: req.body.cards
    })
    .then((createdDeck) => {
        console.log('Deck created ===> ', createdDeck);
        res.status(201).json(createdDeck);
    })
    .catch((error) => {
        console.error('Error while creating deck ===> ', error);
        res.status(500).json({ error: 'Failed to create deck' });
    });
});

// PUT update decks by id
router.put('/:deckId', (req, res, next) => {
    const { deckId } = req.params;

    Decks.findByIdAndUpdate(deckId, req.body, { new: true })
        .then((updatedDeck) => {
            console.log('Updated Deck ===> ', updatedDeck);
            res.status(200).json(updatedDeck);
        })
        .catch((error) => {
            console.error('Error while updatind deck ===> ', error);
            res.status(500).json({ error: 'Failed to update deck' });
        });
});

// PUT update cards from decks by id
router.put('/cards/:deckId', (req, res, next) => {
    const { deckId } = req.params;

    Decks.findByIdAndUpdate(deckId, { $push : req.body}, {new: true, runValidators: true}) // this is used to fix the upper one to get the cards
    // Decks.findByIdAndUpdate(deckId, { $push :[...cards, { cards: cardId}] } , {new: true, runValidators: true}) 
        .then((updatedDeck) => {
            console.log('Updated Deck ===> ', updatedDeck);
            res.status(200).json(updatedDeck);
        })
        .catch((error) => {
            console.error('Error while updatind deck ===> ', error);
            res.status(500).json({ error: 'Failed to update deck' });
        });
});

// PUT eliminates cards from decks by id
router.put('/remove/:deckId', (req, res, next) => {
    const { deckId } = req.params;

    Decks.findByIdAndUpdate(deckId, { $pull : {cards: req.body}}, {new: true, runValidators: true}) 
        .then((updatedDeck) => {
            console.log('Updated Deck ===> ', updatedDeck);
            res.status(200).json(updatedDeck);
        })
        .catch((error) => {
            console.error('Error while updatind deck ===> ', error);
            res.status(500).json({ error: 'Failed to update deck' });
        });
});

// DELETE decks by id
router.delete('/:deckId', (req, res, next) => {
    const { deckId } = req.params;

    Decks.findByIdAndDelete(deckId)
        .then((result) => {
            console.log('Deck deleted!');
            res.status(200).json(result);
        })
        .catch((error) => {
            console.error('Error while deleting deck ===> ', error);
            res.status(500).json({ error: 'Deleting deck failed' });
        });
});

module.exports = router;