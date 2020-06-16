const ytdl = require('ytdl-core');

class Player {
  constructor(){
    this.connection = null;
  }

  setConnection(connection) {
    this.connection = connection;
  }

  playSound(ytId) {
    this.connection.play(ytdl(`https://youtu.be/${ytId}`, { filter: 'audioonly' }), {
      volume: 0.1
    });
  }

  playSilence() {
    this.connection.play('./silence.wav', {
      volume: 0.1
    });
  }
}

module.exports = Player;