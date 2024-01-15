var express = require('express');
var router = express.Router();

const Decks = require('../models/Deck');
const Cards = require('../models/YugiohCards');

// GET decks
router.get('/', (req, res, next) => {
    const { userId } = req.query;

    Decks.find({ user: userId})
        .populate('user')
        .populate('main')
        .populate('extra')
        .populate('side')
        .then((decks) => {
            console.log('Retrieved Decks ===> ', decks);
            res.json(decks);
        })
        .catch((error) => {
            console.error('Error while retrieving decks ===> ', error);
            res.status(500).json({ error: "Failed to retrieve decks" });
        });
});

router.get('/all', (req, res, next) => {
    Decks.find()
        .populate('user')
        .populate('main')
        .populate('extra')
        .populate('side')
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
        .populate('main')
        .populate('extra')
        .populate('side')
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
router.get('/:deckId/main', (req, res, next) => {
    const { deckId } = req.params;

    Decks.findById(deckId)
        .populate('main')
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
        main: req.body.main,
        extra: req.body.extra,
        side: req.body.side
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
            console.error('Error while updating deck ===> ', error);
            res.status(500).json({ error: 'Failed to update deck' });
        });
});

// PUT update cards from decks by id
router.put('/main/:deckId', (req, res, next) => {
    const { deckId } = req.params;
    const { cardId } = req.body;

    Decks.findByIdAndUpdate(deckId, { $push: { main: cardId } }, {new: true, runValidators: true}) // this is used to fix the upper one to get the cards
    // Decks.findByIdAndUpdate(deckId, { $push :[...cards, { cards: cardId}] } , {new: true, runValidators: true}) 
        .then((updatedDeck) => {
            console.log('Updated Deck ===> ', updatedDeck);
            res.status(200).json(updatedDeck);
        })
        .catch((error) => {
            console.error('Error while updating deck ===> ', error);
            res.status(500).json({ error: 'Failed to update deck' });
        });
});

router.put('/extra/:deckId', (req, res, next) => {
    const { deckId } = req.params;
    const { cardId } = req.body;

    Decks.findByIdAndUpdate(deckId, { $push: { extra: cardId } }, {new: true, runValidators: true}) 
        .then((updatedDeck) => {
            console.log('Updated Deck ===> ', updatedDeck);
            res.status(200).json(updatedDeck);
        })
        .catch((error) => {
            console.error('Error while updating deck ===> ', error);
            res.status(500).json({ error: 'Failed to update deck' });
        });
});

router.put('/side/:deckId', (req, res, next) => {
    const { deckId } = req.params;
    const { cardId } = req.body;

    Decks.findByIdAndUpdate(deckId, { $push: { side: cardId } }, {new: true, runValidators: true}) 
        .then((updatedDeck) => {
            console.log('Updated Deck ===> ', updatedDeck);
            res.status(200).json(updatedDeck);
        })
        .catch((error) => {
            console.error('Error while updating deck ===> ', error);
            res.status(500).json({ error: 'Failed to update deck' });
        });
});

// PUT eliminates cards from decks by id Also fix this later
router.put('/removemain/:deckId', (req, res, next) => {
    const { deckId } = req.params;
    const { cardId } = req.body;

    Decks.findByIdAndUpdate(deckId, { $pullAll : {main: cardId}}, {new: true, runValidators: true}) 
        .then((updatedDeck) => {
            console.log('Updated Deck ===> ', updatedDeck);
            res.status(200).json(updatedDeck);
        })
        .catch((error) => {
            console.error('Error while updating deck ===> ', error);
            res.status(500).json({ error: 'Failed to update deck' });
        });
});

router.put('/removeextra/:deckId', (req, res, next) => {
    const { deckId } = req.params;
    const { cardId } = req.body;

    Decks.findByIdAndUpdate(deckId, { $pullAll : {extra: cardId}}, {new: true, runValidators: true}) 
        .then((updatedDeck) => {
            console.log('Updated Deck ===> ', updatedDeck);
            res.status(200).json(updatedDeck);
        })
        .catch((error) => {
            console.error('Error while updating deck ===> ', error);
            res.status(500).json({ error: 'Failed to update deck' });
        });
});

router.put('/removeside/:deckId', (req, res, next) => {
    const { deckId } = req.params;
    const { cardId } = req.body;

    Decks.findByIdAndUpdate(deckId, { $pull : {side: cardId}}, {new: true, runValidators: true}) 
        .then((updatedDeck) => {
            console.log('Updated Deck ===> ', updatedDeck);
            res.status(200).json(updatedDeck);
        })
        .catch((error) => {
            console.error('Error while updating deck ===> ', error);
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