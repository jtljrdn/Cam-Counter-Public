const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription(
      "Get the avatar URL of the selected user, or your own avatar."
    )
    .addUserOption((option) =>
      option.setName("target").setDescription("The user's avatar to show")
    ),
  async execute(interaction) {
    const avatarEmbed = new EmbedBuilder()
      .setTitle("Avatar")
      .setColor("#0099ff");

    try {
      if (interaction.options.getUser("target")) {
        avatarEmbed.setTitle(
          `${interaction.options.getUser("target").username}'s Avatar`
        );
        avatarEmbed.setImage(
          interaction.options
            .getUser("target")
            .displayAvatarURL({ dynamic: true })
        );
        await interaction.reply({ embeds: [avatarEmbed] });
      } else {
        avatarEmbed.setTitle(`${interaction.user.username}'s Avatar`);
        avatarEmbed.setImage(
          interaction.user.displayAvatarURL({ dynamic: true })
        );
        await interaction.reply({ embeds: [avatarEmbed] });
      }
    } catch (error) {
      console.log(error);
      await interaction.reply(
        `Error getting avatar. Contact <@119662538781753344> for help.`
      );
    }
  },
};
