require('dotenv').config();
const fs = require('fs');
const https = require('https');
const privateKey = fs.readFileSync('./ssl/server.key');
const certificate = fs.readFileSync('./ssl/server.crt');

const credentials = {key: privateKey, cert: certificate};

const app = require('./api/index.js');
const { client } = require('./discord/index.js');

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(process.env.PORT);
client.login(process.env.TOKEN);
