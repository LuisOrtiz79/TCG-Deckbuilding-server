var express = require('express');
var router = express.Router();

const Decks = require('../models/Deck');

// GET decks
router.get('/', (req, res, next) => {
    Decks.find({})
        .then((decks) => {
            console.log('Retrieved Decks ===> ', decks);
            res.json(decks);
        })
        .catch((error) => {
            console.error('Error while retrieving decks ===> ', error);
            res.status(500).send({ error: "Failed to retrieve decks" });
        });
});

// GET decks by id
router.get('/:deckId', (req, res, next) => {
    const { deckId } = req.params;

    Decks.findById(deckId)
        .then((deck) => {
            console.log('Retrieved Deck ===> ', deck);
            res.json(deck);
        })
        .catch((error) => {
            console.error('Error while retrieving deck ===> ', error);
            res.status(500).send({ error: 'Failed to retrieve deck' });
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
        res.status(201).send(createdDeck);
    })
    .catch((error) => {
        console.error('Error while creating deck ===> ', error);
        res.status(500).send({ error: 'Failed to create deck' });
    });
});

// PUT update decks by id
router.put('/:deckId', (req, res, next) => {
    const { deckId } = req.params;

    Decks.findByIdAndUpdate(deckId, req.body, { new: true })
        .then((updatedDeck) => {
            console.log('Updated Deck ===> ', updatedDeck);
            res.status(200).send(updatedDeck);
        })
        .catch((error) => {
            console.error('Error while updatind deck ===> ', error);
            res.status(500).send({ error: 'Failed to update deck' });
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
            res.status(500).send({ error: 'Deleting deck failed' });
        });
});

module.exports = router;