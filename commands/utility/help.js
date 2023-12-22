const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List of Info/Commands"),
  async execute(interaction) {
    const helpEmbed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Help")
      .setDescription("**Useful Links**\n[GitHub](https://github.com/jtljrdn/cam-counter-public)\n[Community Discord](https://discord.gg/bDwKqSreue)")
      .addFields(
        { name: "**Commands**", value: "\n"},
        { name: "/add", value: "Add to the count" },
        { name: "/get", value: "Get the current count" },
        { name: "/set", value: "**Admin** Set the current count" },
        { name: "/reset", value: "**Admin** Set the current count to zero" },
      );
    await interaction.reply({ embeds: [helpEmbed] });
  },
};
