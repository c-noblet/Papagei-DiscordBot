const express = require('express');
const router = express.Router();
const Sound = require('../../models/sound.js');
const { discordPlayer } = require('../../discord/index.js');

// Find the sound for GET, PUT and DELETE methods
async function getSound(req, res, next) {
  try {
    const sound = await Sound.findById(req.params.id);
    if (sound == null) {
      return res.status(404).json({ message: 'Cant find sound'});
    }
    res.sound = sound;
  } catch(err){
    return res.status(500).json({ message: err.message });
  }
  next();
}

// Get all sounds
router.get('/', async (req, res) => {
  try {
    const sounds = await Sound.find();
    res.status(200).json(sounds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one sound
router.get('/:id', getSound, (req, res) => {
  discordPlayer.playSound(res.sound);
  res.status(200).json(res.sound);
});

// Create one sound
router.post('/', async (req, res) => {
  const sound = new Sound({
    title: req.body.title,
    url: req.body.url
  });

  try {
    const newSound = await sound.save();
    res.status(201).json(newSound);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one sound
router.patch('/:id', getSound, async (req, res) => {

  // Find data to update
  if (req.body.title != null) {
    res.sound.title = req.body.title;
  }

  if (req.body.url != null) {
    res.sound.url = req.body.url;
  }

  if (req.body.favorite != null) {
    res.sound.favorite = req.body.favorite;
  }

  // Try to update in the Database
  try {
    const updatedSound = await res.sound.save();
    res.status(200).json(updatedSound);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one sound
router.delete('/:id', getSound, async (req, res) => {
  try {
    await res.sound.delete();
    res.status(200).json({ message: 'Deleted This Sound' });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
