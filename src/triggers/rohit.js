module.exports = {
    name: 'rohit',
    match: (message) => message.content.toLowerCase().includes('rohit'),
    execute: (message) => message.reply(':rofl: Rohit = KakkaTheetam'),
};
