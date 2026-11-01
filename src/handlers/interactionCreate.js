const path = require('path');
const { MessageFlags } = require('discord.js');
const loadFiles = require('../utils/loadFiles');
const channelGuard = require('../utils/channelGuard');

const commands = new Map(loadFiles(path.join(__dirname, '../commands')).map((c) => [c.data.name, c]));

module.exports = {
    event: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isChatInputCommand()) return;

        // Discord needs a response, so tell the user instead of staying silent
        if (!channelGuard(interaction.channelId)) {
            return interaction.reply({ content: 'This bot does not respond in this channel.', flags: MessageFlags.Ephemeral });
        }

        const command = commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (err) {
            console.error(`/${interaction.commandName} error:`, err);
            const reply = { content: 'Something went wrong running that command.', flags: MessageFlags.Ephemeral };
            if (interaction.replied || interaction.deferred) await interaction.followUp(reply);
            else await interaction.reply(reply);
        }
    },
};
