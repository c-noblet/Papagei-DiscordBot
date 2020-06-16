require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const SoundsRouter = require('./routes/sounds');
app.use('/sounds', SoundsRouter)
const ConnectBotRouter = require('./routes/connect');
app.use('/connect', ConnectBotRouter);

module.exports = app;