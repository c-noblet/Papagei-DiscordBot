require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const SoundsRouter = require('./routes/sounds');
app.use('/sounds', SoundsRouter);

module.exports = app;