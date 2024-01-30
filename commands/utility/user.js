const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logErrors } = require("../../logging");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User").setRequired(true)
    ),
  async execute(interaction) {
    try {
      const guildUser = await interaction.guild.members.fetch(interaction.options.getUser("user"));
      const createdAt = new Date(interaction.options.getUser("user").createdAt.getTime())
      const boosted = guildUser.premiumSinceTimestamp != null ? "✅" : "❌";
      const userEmbed = new EmbedBuilder()
        .setTitle(`${interaction.options.getUser("user").username}'s Info`)
        .setThumbnail(guildUser.user.displayAvatarURL())
        .setColor("Random")
        .addFields(
          {
            name: "**❯ User ID**",
            value: interaction.options.getUser("user").id,
            inline: true,
          },
          {
            name: "**❯ Username**",
            value: interaction.options.getUser("user").username,
            inline: true,
          },
          {
            name: "**❯ Display Name**",
            value: guildUser.user.globalName,
            inline: true,
          },
          {
            name: "**❯ Boosting**",
            value: `${boosted}`,
            inline: true,
          },
          {
            name: "**❯ Created At**",
            value: `<t:${parseInt((createdAt.getTime()/1000).toFixed(0))}>`,
            inline: true,
          },
          {
            name: "**❯ Joined At**",
            value: `<t:${parseInt((guildUser.joinedTimestamp/1000).toFixed(0))}>`,
            inline: true,
          },
          {
            name: "**❯ Roles**",
            value: guildUser.roles.cache.map((role) => `${role}`).join(" | "),
            inline: true,
          },
        )
        .setTimestamp();
      await interaction.reply({ embeds: [userEmbed] });
    } catch (error) {
      logErrors(interaction, error);
      console.log(error);
      interaction.reply("Error getting user info. Join the support server for help:\nhttps://discord.gg/bDwKqSreue.");
    }
  },
};