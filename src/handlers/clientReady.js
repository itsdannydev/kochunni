module.exports = {
    event: 'clientReady',
    once: true,
    execute(client) {
        console.log(`\n\n|-------------------------------@${client.user.username}✅ is online-------------------------------|`);
    },
};
