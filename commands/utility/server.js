const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logErrors } = require("../../logging");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server."),
  async execute(interaction) {
    try {
      const guild = interaction.guild;
      const serverEmbed = new EmbedBuilder()
        .setTitle(guild.name)
        .setColor("Green")
        .setThumbnail(guild.iconURL())
        .addFields(
          {
            name: "Owner",
            value: `<@${guild.ownerId}>`,
          },
          {
            name: "ID",
            value: guild.id,
          },
          {
            name: "Members",
            value: `${guild.memberCount}`,
          },
          {
            name: "Created",
            value: `<t:${parseInt(
              (guild.createdTimestamp / 1000).toFixed(0)
            )}>`,
          }
        )
        .setTimestamp();
      await interaction.reply({ embeds: [serverEmbed] });
    } catch (error) {
      logErrors(interaction, error);
      console.log(error);
    }
  },
};
