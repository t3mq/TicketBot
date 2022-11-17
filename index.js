const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection
} = require('discord.js');
const config = require("./config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMembers
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.User,
        Partials.ThreadMember,
    ]
});

module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();

client.on('ready', async () => {

    require("./handler")(client);

    const readyEvent = require("./events/client/ready");
    await readyEvent.execute(client);
})

client.login(config.token)