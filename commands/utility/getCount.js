const { SlashCommandBuilder } = require("discord.js");

const { Count } = require("../../handleDb.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get")
    .setDescription("Gets the current count"),
  async execute(interaction) {
    try {
      const countRecord = await Count.findOne({ where: { id: 1 } });
      await interaction.reply(`Current Count: ${countRecord.get("value")}`);
    } catch (error) {
      console.log(error);
      await interaction.reply(
        `Error getting count. Contact <@119662538781753344> for help.`
      );
    }
  },
};
