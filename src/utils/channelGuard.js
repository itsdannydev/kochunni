const { isDev, testChannelId } = require('../config');

// Dev bot: only the bot testing channel. Live bot: everywhere except the bot testing channel.
module.exports = (channelId) => isDev === (channelId === testChannelId);
