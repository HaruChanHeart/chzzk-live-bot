// Initialize
require('dotenv').config();

const Cron = require('node-cron');
const chzzkNotifier = require('./lib/chzzk');

// Extract the required classes from the discord.js module
const { Client, Events, GatewayIntentBits, REST } = require('discord.js');

const { sequelize } = require('./lib/db');

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const token = process.env.TOKEN;

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// CHZZK Notifier
const { user_list } = require('./config.json')

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, async (c) => {
    // initialize db
    await sequelize.sync({ force: false })
        .then(() => {
            console.log('[DB] Connected to Database');
        })
        .catch((e) => {
            console.log('[DB] Failed to connect');
            console.error(e.message);
        });

    Cron.schedule('* * * * *', async () => {
        for (const uid of user_list) {
            await chzzkNotifier(c, uid);
        }
    });

  console.log(`[Discord] Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);