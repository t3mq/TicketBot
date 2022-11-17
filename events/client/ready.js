const colors = require('colors');
const {
    ActivityType
} = require('discord.js');

module.exports = {
    name: 'ready',
    once: false,
    execute: async (client) => {

        console.log('[API] '.bold.green + `Connected to Discord.`.bold.white)

        let statuses = ['🎫 | Ticket Manager', `${client.guilds.cache.size} guilds`]
        setInterval(function () {
            let status = statuses[Math.floor(Math.random() * statuses.length)];
            client.user.setPresence({
                activities: [{
                    name: status,
                    type: ActivityType.Watching
                }],
                status: "idle"
            })
        }, 10000)

    }
}