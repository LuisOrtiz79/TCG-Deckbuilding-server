var express = require('express');
var router = express.Router();

const User = require('../models/User');
const isAuthenticated = require('../middleware/isAuthenticated');

// GET user by its id
router.get('/:userId', isAuthenticated, (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      console.log('Retrieved User ===> ', user);
      res.json(user);
    })
    .catch((error) => {
      console.log('Error while retrieving user ==>', error);
      res.status(500).json({ error: 'Failed to retrieve user' });
    });
});

// PUT update user by its id
router.put('/:userId', isAuthenticated, (req, res, next) => {
  const { userId } = req.params;

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((updatedUser) => {
      console.log('Updated user ===> ', updatedUser);
      res.status(200).json(updatedUser);
    })
    .catch((error) => {
      console.error('Error while updating user ===> ', error);
      res.status(500).json({ error: 'Failed to update user' });
    });
});

// DELETE user by its id
router.delete('/:userId', isAuthenticated, (req, res, next) => {
  const { userId } = req.params;

  User.findByIdAndDelete(userId)
    .then((result) => {
      console.log('User deleted!');
      res.status(200).json(result);
    })
    .catch((error) => {
      console.error('Error while deleting user ===> ', error);
      res.status(500).json({ error: 'Deleting user failed' });
    });
});

module.exports = router;