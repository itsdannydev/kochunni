const isDev = process.env.NODE_ENV === 'development';
// dev uses .env.dev (dev bot token + test channel), prod uses .env / Render env vars
require('dotenv').config({ path: isDev ? '.env.dev' : '.env' });
const { Client, IntentsBitField } = require('discord.js');
const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
})

client.on('clientReady',(c)=>{
    console.log(`\n\n|-------------------------------@${c.user.username}✅ is online-------------------------------|`);
})

client.on('messageCreate',(message)=>{
    if(message.author.bot){//true if author of message is bot
        return;
    }

    // Dev bot: only respond in the bot testing channel.
    // Live bot: never respond in the bot testing channel.
    const inTestChannel = message.channelId === process.env.DEV_CHANNEL_ID;
    if(isDev !== inTestChannel){
        return;
    }

    if(message.content.toLowerCase() == 'hey'){
        message.reply(`Hey ${message.author.globalName}!!!\nHow are you?`)
    }
    if(message.content.toLowerCase().includes('rohit')){
        message.reply(':rofl: Rohit = KakkaTheetam')
    }
})

// Health check server (for Render + UptimeRobot)
const http = require('http');
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
    if (req.url === '/health') {
        const healthy = client.isReady();
        res.writeHead(healthy ? 200 : 503, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: healthy ? 'ok' : 'discord not ready', uptime: process.uptime() }));
    } else {
        res.writeHead(200);
        res.end('Bot is running');
    }
}).listen(PORT, () => console.log(`Health server listening on port ${PORT}`));

client.login(process.env.BOT_TOKEN);