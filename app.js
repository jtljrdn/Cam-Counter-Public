const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  ActivityType,
} = require("discord.js");
const deploy = require("./deploy-commands");
const Server = require("./lib/database/models/servers.model");
const { connectToDatabase } = require("./lib/database");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let currentPage = 0;
deploy();
require("dotenv").config();

client.once(Events.ClientReady, async (c) => {
  client.user.setActivity("/help");
  console.log(`Logged in as ${c.user.tag}!`);
});

const checkConnection = async () => {
  try {
    await connectToDatabase();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
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
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
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
      console.log(`Guild ${guild.id} already exists in DB!`);
    } else {
      console.log(`New Guild Joined: ${guild.id}. Adding to DB...`);
      const newGuild = await Server.create({
        guildId: guild.id,
        guildName: guild.name,
      });
      console.log(JSON.parse(JSON.stringify(newGuild)));
    }
    const channel = client.channels.cache.get(guild.systemChannelId);
    channel.send(
      "Hi! I'm CamBot, a multipurpose bot for your server! To get started, type `/help` to see a list of commands.\nJoin the support server at https://discord.gg/bDwKqSreue for help or to suggest new features!"
    );
  } catch (error) {
    console.log(error);
  }
});

client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  } else if (interaction.isButton()) {
    console.log(interaction);
    // respond to the button interaction
  }
  // } else if (interaction.isStringSelectMenu()) {
  //  // respond to the select menu
  // }
});
