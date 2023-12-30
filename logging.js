const { Events, EmbedBuilder } = require("discord.js");
require("dotenv").config();

const logsChannel = process.env.BOT_LOGGING_CHANNEL;

const logCommands = async (client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isCommand()) {
      const isDms = interaction.guild != undefined ? interaction.guild : "DMS";
      const loggingChannel = client.channels.cache.get(logsChannel);
      let subcommand;
      try {
        subcommand = interaction.options.getSubcommand();
      } catch (error) {
        subcommand = "";
      }
      const embed = new EmbedBuilder()
        .setTitle("🤖 Command Triggered")
        .setColor("Aqua")
        .setDescription(
          `${interaction.user.tag} in ${isDms} triggered ${interaction.commandName} ${subcommand}.`
        )
        .setTimestamp(Date.now());
      loggingChannel.send({ embeds: [embed] });
    }
  });
};

const logEvents = async (client) => {
  client.on(Events.GuildCreate, async (guild) => {
    const loggingChannel = client.channels.cache.get(logsChannel);
    const embed = new EmbedBuilder()
      .setTitle("🤖 Server Joined")
      .setColor("Green")
      .setDescription(`Joined ${guild.name}!`)
      .addFields({ name: "Member Count", value: `${guild.memberCount}` })
      .setImage(guild.iconURL())
      .setTimestamp(Date.now());
    loggingChannel.send({ embeds: [embed] });
  });
  client.on(Events.GuildDelete, async (guild) => {
    const loggingChannel = client.channels.cache.get(logsChannel);
    const embed = new EmbedBuilder()
      .setTitle("🤖 Server Left")
      .setColor("Yellow")
      .setDescription(`Left ${guild.name}!`)
      .setImage(guild.iconURL())
      .setTimestamp(Date.now());
    loggingChannel.send({ embeds: [embed] });
  });
};

const logErrors = async (interaction, error) => {
  const loggingChannel = interaction.client.channels.cache.get(logsChannel);
  const embed = new EmbedBuilder()
    .setTitle("🤖 Error")
    .setColor("Red")
    .setDescription(
      `${interaction.user.tag} in ${
        interaction.guild != undefined ? interaction.guild : "DMS"
      } triggered ${interaction.commandName}.\n${error}`
    )
    .setTimestamp(Date.now());
  loggingChannel.send({ embeds: [embed] });
};

const logBugs = async (interaction, bug) => {
  const loggingChannel = interaction.client.channels.cache.get(logsChannel);
  const reportEmbed = new EmbedBuilder()
  .setTitle("🤖 Bug Reported")
  .setColor("Red")
  .addFields(
    { name: "Bug ID", value: `${bug._id}` },
    { name: "Description", value: `${bug.description}` },
    { name: "Submitted By", value: `<@${bug.submittedBy}>` },
    { name: "Submitted At", value: `${bug.createdAt}` }
  );
  await loggingChannel.send({ embeds: [reportEmbed] });
};

module.exports = { logCommands, logEvents, logErrors, logBugs };
