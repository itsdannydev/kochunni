const isDev = process.env.NODE_ENV === 'development';
require('dotenv').config({ quiet: true }); // one .env for both bots (Render uses its own env vars)

module.exports = {
    isDev,
    // dev run uses the DEV_* values, live run uses the plain ones
    token: isDev ? process.env.DEV_BOT_TOKEN : process.env.BOT_TOKEN,
    clientId: isDev ? process.env.DEV_CLIENT_ID : process.env.CLIENT_ID, // only needed to register slash commands
    guildId: process.env.GUILD_ID,                                       // the one server; slash commands register there instantly
    testChannelId: process.env.BOT_TESTING_CHANNEL_ID,
    prefix: process.env.PREFIX || '!',
    port: process.env.PORT || 3000,
};
