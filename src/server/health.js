const http = require('http');
const { port } = require('../config');

// Health check server (for Render + UptimeRobot)
module.exports = (client) => {
    http.createServer((req, res) => {
        if (req.url === '/health') {
            const healthy = client.isReady();
            res.writeHead(healthy ? 200 : 503, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: healthy ? 'ok' : 'discord not ready', uptime: process.uptime() }));
        } else {
            res.writeHead(200);
            res.end('Bot is running');
        }
    }).listen(port, () => console.log(`Health server listening on port ${port}`));
};
