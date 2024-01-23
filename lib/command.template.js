const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logErrors } = require("../../logging");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("NAME")
    .setDescription("DESCRIPTION"),
  async execute(interaction) {
    try {
    await interaction.reply("RESPONSE");
    } catch (error) {
      logErrors(interaction, error);
      console.log(error);
    }
  },
};
