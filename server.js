require('dotenv').config();
const app = require('./api/index.js');
const { client } = require('./discord/index.js');

app.listen(process.env.PORT, () => console.log('server started'));
client.login(process.env.TOKEN);
