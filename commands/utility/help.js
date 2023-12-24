const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { pages } = require("../../lib/help");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List of Info/Commands")
    .addStringOption((option) =>
      option
        .setName("page")
        .setDescription("Page Number (1-3)")
        .setRequired(false)
    ),
  async execute(interaction) {
    const page = interaction.options.getString("page");
    try {
      switch (page) {
        case "1":
          await interaction.reply({ embeds: [pages[0]] });
          break;
        case "2":
          await interaction.reply({ embeds: [pages[1]] });
          break;
        // case "3":
        //   await interaction.reply({ embeds: [pages[2]] });
        //   break;
        default:
          interaction.reply("Please provide a page number (1-2)");
      }
    } catch (error) {
      console.log(error);
      await interaction.reply(
        `Error getting help pages. Contact <@119662538781753344> for help.`
      );
    }
  },
};