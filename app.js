const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  EmbedBuilder,
} = require("discord.js");
const { createDjsClient } = require("discordbotlist");
const deploy = require("./deploy-commands");
const Server = require("./lib/database/models/servers.model");
const { connectToDatabase } = require("./lib/database");
const Count = require("./lib/database/models/count.model");
const { logCommands, logEvents } = require("./logging");
const updateStatus = require("./lib/status/status");
const axios = require("axios").default;
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});
deploy();
require("dotenv").config();
client.once(Events.ClientReady, async (c) => {
  updateStatus(c);
  const { data: topggResponse } = await axios
    .post(
      `https://top.gg/api/bots/1186507379173503137/stats`,
      { server_count: c.guilds.cache.size },
      { headers: { Authorization: process.env.TOPGG_TOKEN } }
    )
    .then(
      console.log(`${Date.now()} | Successfully sent server count to Top.gg!`)
    )
    .catch(console.error);
  console.log(`${Date.now()} | Logged in as ${c.user.tag}!`);
  const dbl = createDjsClient(process.env.DBL_TOKEN, client);
  dbl.startPosting();
  const loggingChannel = client.channels.cache.get(
    process.env.BOT_LOGGING_CHANNEL
  );
  const embed = new EmbedBuilder()
    .setTitle("🤖 Bot Started")
    .setColor("White")
    .setImage(client.user.displayAvatarURL())
    .setTimestamp(Date.now());
  loggingChannel.send({ embeds: [embed] });
  const updateCountChannel = async () => {
    try {
      await connectToDatabase();
      const servers = await Server.find({ countChannel: { $ne: null } });
      for (const server of servers) {
        const guild = await client.guilds.fetch(server.guildId);
        const channel = guild.channels.cache.get(server.countChannel);
        const count = await Count.findById(server.currentCount);
        channel.setName(`${count.name}: ${count.value}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  setInterval(async () => {
    await updateCountChannel();
  }, 1000 * 60 * 5);
  logCommands(client);
  logEvents(client);
});

const checkConnection = async () => {
  try {
    await connectToDatabase();
    console.log(
      `${Date.now()} | Connection has been established successfully.`
    );
  } catch (error) {
    console.error(
      `${Date.now()} | Unable to connect to the database: ${error}`
    );
  }
};

checkConnection();

client.login(process.env.TOKEN);

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `${Date.now()} | [WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.on(Events.GuildCreate, async (guild) => {
  console.log(`Joined ${guild.name}!`);
  try {
    await connectToDatabase();

    console.log(await Server.findOne({ guildId: guild.id }));

    if (await Server.findOne({ guildId: guild.id })) {
      console.log(`${Date.now()} | Guild ${guild.id} already exists in DB!`);
    } else {
      console.log(
        `${Date.now()} | New Guild Joined: ${guild.id}. Adding to DB...`
      );
      const newGuild = await Server.create({
        guildId: guild.id,
        guildName: guild.name,
        joinedAt: Date.now(),
      });
      console.log(JSON.parse(JSON.stringify(newGuild)));
    }

    const channel = client.channels.cache.get(guild.systemChannelId)
      ? client.channels.cache.get(guild.systemChannelId)
      : guild.channels.cache.find((channel) => channel.name === "general");
    channel.send(
      "Hi! I'm CamBot, a multipurpose bot for your server! Thanks for adding me! To get started, use </help:1187536665598775318> to see a list of commands.\nJoin the support server at https://discord.gg/bDwKqSreue for help or to suggest new features!\n\nIf you enjoy this bot, please consider voting for us on [Top.gg](https://top.gg/bot/1186507379173503137) and [DiscordBotList](https://discordbotlist.com/bots/cambot/upvote)!\nIf you'd like to support the development of this bot, consider donating at https://www.ko-fi.com/bungbloopity."
    );
    console.log(`${Date.now()} | Greeted new guild.`);
  } catch (error) {
    if (error.message === "Missing Permissions") {
      console.log(`${Date.now()} | Missing permissions to greet new guild.`);
    }
    console.log(error);
  }
  process.on("uncaughtException", (err) => {
    console.log(`${Date.now()} | Missing permissions to greet new guild.`);
  });
});

client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(
    `${Date.now()} | ${interaction.user.tag} in ${
      !interaction.guild ? "DMs" : interaction.guild.name
    } triggered ${interaction.commandName}.`
  );
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `${Date.now()} | No command matching ${
          interaction.commandName
        } was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      // if (interaction.replied || interaction.deferred) {
      //   await interaction.followUp({
      //     content: "There was an error while executing this command!",
      //     ephemeral: true,
      //   });
      // } else {
      //   await interaction.reply({
      //     content: "There was an error while executing this command!",
      //     ephemeral: true,
      //   });
      // }
    }
  } else if (interaction.isButton()) {
    console.log(interaction);
    // respond to the button interaction
  }
  // } else if (interaction.isStringSelectMenu()) {
  //  // respond to the select menu
  // }
});
