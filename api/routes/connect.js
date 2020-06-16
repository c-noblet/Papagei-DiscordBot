const express = require('express');
const router = express.Router();
const { client, silenceJob, discordPlayer } = require('../../discord/index.js');

// Connect the bot to the channel
router.get('/:id', async (req, res) => {
  try {
    const channel = client.channels.cache.get(req.params.id);
    const connection = await channel.join();
    discordPlayer.setConnection(connection);
    silenceJob.start();
    res.status(200).json({ message: 'connecting' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;