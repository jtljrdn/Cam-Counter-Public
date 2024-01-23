const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logErrors } = require("../../logging");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("game-search")
    .setDescription("Search for game information.")
    .addStringOption((option) =>
      option
        .setName("game")
        .setDescription("The game to search for.")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
    await interaction.reply("RESPONSE");
    } catch (error) {
      logErrors(interaction, error);
      console.log(error);
    }
  },
};
