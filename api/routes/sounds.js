const express = require('express');
const router = express.Router();
const { discordPlayer } = require('../../discord/index.js');

// Play one sound
router.get('/:id', (req, res) => {
  try {
    discordPlayer.playSound(req.params.id);
    res.status(200).json({ message: 'playing' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
