const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logErrors } = require("../../logging");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Choose a random number between 1 and the upper bound.")
    .addIntegerOption((option) =>
      option
        .setName("upper_bound")
        .setDescription("The upper bound for the random number.")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const upperBound = interaction.options.getInteger("upper_bound");
      if (upperBound < 1) {
        await interaction.reply("The upper bound must be greater than 0.");
        return;
      }

      const randomNumber = Math.floor(Math.random() * upperBound) + 1;
      const embed = new EmbedBuilder()
        .setTitle("Random Number")
        .setDescription(`Your random number is ${randomNumber}.`)
        .setColor("#0099ff")
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      logErrors(interaction, error);
      console.log(error);
    }
  },
};
