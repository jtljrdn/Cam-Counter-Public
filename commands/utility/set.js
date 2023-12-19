const { SlashCommandBuilder } = require("discord.js");
const { Count } = require("../../handleDb.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set")
    .setDescription("Set the current count to the input desired.")
    .addIntegerOption((option) =>
      option
        .setName("count")
        .setDescription("The count to set the current count to.")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      if (interaction.member.id != "119662538781753344") {
        await interaction.reply(
          `You do not have permission to set the count! If you believe this is a mistake, contact <@119662538781753344>`
        );
        return;
      }
      const countRecord = await Count.findOrCreate({ where: { id: 1 } });

      // Update the count value to zero
      countRecord[0].value = interaction.options.getInteger("count");
      countRecord[0].save();
      await interaction.reply(`Sucessfully set count to ${interaction.options.getInteger("count")}!`);
    } catch (error) {
      console.log(error);
      await interaction.reply(
        `Error getting count. Contact <@119662538781753344> for help.`
      );
    }
  },
};
