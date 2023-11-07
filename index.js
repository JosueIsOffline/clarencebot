const {
  Client,
  GatewayIntentBits,
  IntentsBitField,
  Partials,
  Collection,
} = require("discord.js");
const config = require("./config/config");
const events = require("./handlers/events");
require("dotenv").config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction,
  ],
  presence: {
    activities: [
      {
        name: "/help | 24/7 ONLINE...!",
        type: 0,
      },
    ],
    status: "online",
  },
});

client.logger = require("./utils/logger");

// Getting the bot token:
const AuthenticationToken = config.Client.TOKEN || process.env.TOKEN_DISCORD;

// Handler:
client.prefix_commands = new Collection();
client.slash_commands = new Collection();
client.user_commands = new Collection();
client.message_commands = new Collection();
client.modals = new Collection();
client.events = new Collection();
// client.player = new Player(client, {
//     ytdlOptions: {
//         quality: "highestaudio",
//         highWaterMark: 1 << 25, // High water mark to avoid cut audio
//     }
// })
client.queueToList = [];


// Handler errors: 
client.on("error", (error) => client.logger.log(error, "error"));
client.on("warn", (info) => client.logger.log(info, "warn"));
process.on("unhandledRejection", (error) =>
  client.logger.log("UNHANDLED_INJECTION\n" + error, "error")
);
process.on("uncaughtException", (error) => {
  client.logger.log("UNCAUGHT_EXCEPTION\n" + error, "error");
  client.logger.log("Uncaught Execption is detected, restarting...", "info");
  process.exit(1);
});

// Event handler:
events(client)


// Login to the bot
client.login(AuthenticationToken).catch((err) => {
    client.logger.log("Something went wrong while connecting to the bot...", "warn")
});
