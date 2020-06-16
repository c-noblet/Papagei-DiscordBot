const Discord = require('discord.js');
const client = new Discord.Client();
const Player = require('../player/Player.js');
const CronJob = require('cron').CronJob;

const discordPlayer = new Player();

// this silenceJob avoid the bot from auto disconnect
const silenceJob = new CronJob('*/5 * * * *', () => {
  discordPlayer.playSilence();
  console.log('silence');
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.on('message', async message => {
    if (!message.guild) return;
  
    if (message.content === '!p join') {
      // try to join the voice channel
      if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        discordPlayer.setConnection(connection);
        silenceJob.start();
        connection.on('disconnect', silenceJob.stop());
      } else {
        message.reply('You need to join a voice channel first!');
      }
      message.delete();
    }
  });
});

module.exports = {
  discordPlayer,
  client,
  silenceJob
};