module.exports = {
    name: 'hey',
    match: (message) => message.content.toLowerCase() === 'hey',
    execute: (message) => message.reply(`Hey ${message.author.globalName}!!!\nHow are you?`),
};
