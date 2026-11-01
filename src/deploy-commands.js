// Registers slash commands with Discord. Run after adding/changing a file in src/commands.
//   npm run deploy:dev   -> dev bot  (DEV_BOT_TOKEN, DEV_CLIENT_ID)
//   npm run deploy       -> live bot (BOT_TOKEN, CLIENT_ID)
// Both register to GUILD_ID, the one server.
const path = require('path');
const { REST, Routes } = require('discord.js');
const { token, clientId, guildId } = require('./config');
const loadFiles = require('./utils/loadFiles');

if (!token || !clientId) {
    console.error('Token and client ID missing: set BOT_TOKEN + CLIENT_ID (live) or DEV_BOT_TOKEN + DEV_CLIENT_ID (dev) in .env.');
    process.exit(1);
}

const body = loadFiles(path.join(__dirname, 'commands')).map((c) => c.data.toJSON());
const rest = new REST().setToken(token);

// with GUILD_ID: registers to that server only (instant). Without it: global (can take up to an hour).
const route = guildId ? Routes.applicationGuildCommands(clientId, guildId) : Routes.applicationCommands(clientId);

rest.put(route, { body })
    .then((data) => console.log(`Registered ${data.length} slash command(s) ${guildId ? 'to guild ' + guildId : 'globally'}.`))
    .catch(console.error);
