const isDev = process.env.NODE_ENV === 'development';
// dev uses .env.dev (dev bot token + test channel), live uses .env / Render env vars
require('dotenv').config({ path: isDev ? '.env.dev' : '.env', quiet: true });

module.exports = {
    isDev,
    token: process.env.BOT_TOKEN,
    clientId: process.env.CLIENT_ID,       // needed only to register slash commands
    guildId: process.env.GUILD_ID,         // optional: register slash commands to one server (instant)
    testChannelId: process.env.DEV_CHANNEL_ID,
    prefix: process.env.PREFIX || '!',
    port: process.env.PORT || 3000,
};
