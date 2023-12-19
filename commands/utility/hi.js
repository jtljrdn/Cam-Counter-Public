const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("hi").setDescription("What do I do?"),
  async execute(interaction) {
    try {
      await interaction.reply(
        "I'm a bot that counts the number of times Cameron said he would get on VC, but didn't. Use /add to add to the count and /get to get the current count."
      );
    } catch (error) {
      console.log(error);
      await interaction.reply(
        `Error getting count. Contact <@119662538781753344> for help.`
      );
    }
  },
};
