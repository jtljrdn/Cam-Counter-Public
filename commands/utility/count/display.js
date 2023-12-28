const {
  ChannelType,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");
const { connectToDatabase } = require("../../../lib/database");
const Count = require("../../../lib/database/models/count.model");
const Server = require("../../../lib/database/models/servers.model");
const { logErrors } = require("../../../logging");

const displayCount = async (interaction) => {
  try {
    const member = await interaction.guild.members.fetch(interaction.user.id);
    if (!member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      await interaction.reply(
        `<@${interaction.user.id}> You do not have permission to use this command. Must have Manage Channels Permissions`
      );
      return;
    }
    await connectToDatabase();

    const guild = await interaction.client.guilds.fetch(interaction.guild.id);
    const server = await Server.findOne({ guildId: interaction.guild.id });
    const findCount = await Count.findById(server.currentCount);
    if (
      interaction.guild.channels.cache.find(
        (channel) => channel.name === `${findCount.name}: ${findCount.value}`
      )
    ) {
      await interaction.reply(`Count channel already exists!`);
      return;
    }
    await guild.channels.create({
      name: `${findCount.name}: ${findCount.value}`,
      type: ChannelType.GuildVoice,
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone.id,
          deny: [PermissionFlagsBits.Connect],
        },
        {
          id: process.env.CLIENT_ID,
          allow: [
            PermissionFlagsBits.ManageChannels,
            PermissionFlagsBits.Connect,
          ],
        },
      ],
    });
    const updateServer = await Server.findByIdAndUpdate(server._id, {
      countChannel: interaction.guild.channels.cache.find(
        (channel) => channel.name === `${findCount.name}: ${findCount.value}`
      ).id,
    });
    await interaction.reply(`Successfully created count channel!`);
    console.log(
      `${Date.now()} | Count Channel Created for ${interaction.guild.name}`
    );
  } catch (error) {
    console.log(error);
    await interaction.reply(
      `Error listing your active counts. Join the support server for help:\nhttps://discord.gg/bDwKqSreue.`
    );
  }
};

module.exports = { displayCount };
