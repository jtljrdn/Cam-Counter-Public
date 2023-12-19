const { SlashCommandBuilder, ActivityType } = require("discord.js");
const { Count } = require("../../handleDb.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Adds to the current count!"),
  async execute(interaction) {
    try {
      const countRecord = await Count.findOne({ where: { id: 1 } });

      if (countRecord) {
        countRecord.increment("value");
      }

      await interaction.reply(
        `+1 to the "Cameron not joining VC" count. Current Count: ${
          countRecord.get("value") + 1
        }`
      );
    } catch (error) {
      console.log(error);
      await interaction.reply(`Error getting count. Contact <@119662538781753344> for help.`);
    }
  },
};
