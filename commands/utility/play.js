const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logErrors } = require("../../logging");
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play Audio from a URL!")
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("The URL to play audio from.")
        .setRequired(true)
    ),
  async execute(interaction) {
    // interaction.guild is the object representing the Guild in which the command was run
    const url = interaction.options.getString("url");
    try {
      const embed = new EmbedBuilder()
        .setTitle("Invite Me!")
        .setColor("Green")
        .setDescription("Invite me to your server!")
        .setImage(interaction.client.user.displayAvatarURL())
        .addFields(
          {
            name: "Invite Link",
            value:
              "[Invite](https://discord.com/api/oauth2/authorize?client_id=1186507379173503137&permissions=18992663587958&scope=bot+applications.commands)",
          },
          {
            name: "Support Discord",
            value: "[Join](https://discord.gg/bDwKqSreue)",
          }
        );

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      logErrors(interaction, error);
      console.log(error);
    }
  },
};
