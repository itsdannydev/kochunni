const path = require('path');
const { Client, IntentsBitField } = require('discord.js');
const config = require('./config');
const loadFiles = require('./utils/loadFiles');
const startHealthServer = require('./server/health');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

// register every event handler in src/handlers
for (const handler of loadFiles(path.join(__dirname, 'handlers'))) {
    client[handler.once ? 'once' : 'on'](handler.event, (...args) => handler.execute(client, ...args));
}

startHealthServer(client);
client.login(config.token);
