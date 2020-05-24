const ytdl = require('ytdl-core');

class Player {
  constructor(){
    this.connection = null;
  }

  setConnection(connection) {
    this.connection = connection;
  }

  playSound(sound) {
    this.connection.play(ytdl(sound.url, { filter: 'audioonly' }), {
      volume: 0.1
    });
  }
}

module.exports = Player;