const Discord = require('discord.js');
const client = new Discord.Client();
const Player = require('../player/Player.js');

const discordPlayer = new Player();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.on('message', async message => {
    if (!message.guild) return;
  
    if (message.content === '!join') {
      // Only try to join the sender's voice channel if they are in one themselves
      if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        discordPlayer.setConnection(connection);
      } else {
        message.reply('You need to join a voice channel first!');
      }
      message.delete();
    }
  });
});

module.exports = {
  discordPlayer,
  client
};