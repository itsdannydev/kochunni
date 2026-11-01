const path = require('path');
const { prefix } = require('../config');
const loadFiles = require('../utils/loadFiles');
const channelGuard = require('../utils/channelGuard');

const triggers = loadFiles(path.join(__dirname, '../triggers'));

// prefix commands, looked up by name or alias
const prefixCommands = new Map();
for (const cmd of loadFiles(path.join(__dirname, '../prefixCommands'))) {
    prefixCommands.set(cmd.name, cmd);
    (cmd.aliases || []).forEach((alias) => prefixCommands.set(alias, cmd));
}

module.exports = {
    event: 'messageCreate',
    async execute(client, message) {
        if (message.author.bot) return;
        if (!channelGuard(message.channelId)) return;

        try {
            // 1. prefix commands, e.g. !ping
            if (message.content.startsWith(prefix)) {
                const [name, ...args] = message.content.slice(prefix.length).trim().split(/\s+/);
                const cmd = prefixCommands.get(name.toLowerCase());
                if (cmd) return await cmd.execute(message, args);
            }

            // 2. keyword triggers, e.g. "hey"
            for (const trigger of triggers) {
                if (trigger.match(message)) await trigger.execute(message);
            }
        } catch (err) {
            console.error('messageCreate error:', err);
        }
    },
};
