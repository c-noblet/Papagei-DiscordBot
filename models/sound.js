const mongoose = require('mongoose');

const soundSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  favorite: {
    type: Boolean,
    default: false
  },
  url: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    required: true,
  }
});


module.exports = mongoose.model('Sound', soundSchema)