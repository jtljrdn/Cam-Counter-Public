const { SlashCommandBuilder } = require("discord.js");
const { Count } = require("../../handleDb.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reset")
    .setDescription("Resets the current count!"),
  async execute(interaction) {
    try {
      if (interaction.member.id != "119662538781753344") {
        await interaction.reply(
          `You do not have permission to reset the count! If you believe this is a mistake, contact <@119662538781753344>`
        );
        return;
      }
      const countRecord = await Count.findOrCreate({ where: { id: 1 } });

      // Update the count value to zero
      countRecord[0].value = 0;
      countRecord[0].save();
      await interaction.reply(`Sucessfully reset count!`);
    } catch (error) {
      console.log(error);
      await interaction.reply(
        `Error getting count. Contact <@119662538781753344> for help.`
      );
    }
  },
};
