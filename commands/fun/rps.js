const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logErrors } = require("../../logging");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription("Rock Paper Scissors")
    .addStringOption((option) =>
      option
        .setName("choice")
        .setDescription("The choice to play.")
        .addChoices(
          { name: "Rock", value: "rock" },
          { name: "Paper", value: "paper" },
          { name: "Scissors", value: "scissors" }
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const embed = new EmbedBuilder()
        .setTitle("Rock Paper Scissors")
        .setDescription("🤔Thinking🤔")
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });

      const choice = interaction.options.getString("choice");
      const number = Math.floor(Math.random() * 3);
      let botChoice = "";
      switch (number) {
        case 0:
          botChoice = "rock";
          break;
        case 1:
          botChoice = "paper";
          break;
        case 2:
          botChoice = "scissors";
          break;
      }
      const win_loss = () => {
        if (choice === botChoice) {
          return "tie";
        } else if (choice === "rock") {
          if (botChoice === "paper") {
            return "lose";
          } else {
            return "win";
          }
        } else if (choice === "paper") {
          if (botChoice === "scissors") {
            return "lose";
          } else {
            return "win";
          }
        } else if (choice === "scissors") {
          if (botChoice === "rock") {
            return "lose";
          } else {
            return "win";
          }
        }
      };
      const result = win_loss();
      embed
        .setDescription(
          `You chose **${choice}** and I chose **${botChoice}**. You ${result}!`
        )
        .setColor(result == "win" ? "Green" : "Red")
        .setTimestamp();
      setTimeout(async () => {
        await interaction.editReply({ embeds: [embed] });
      }, 1000);
    } catch (error) {
      logErrors(interaction, error);
      console.log(error);
    }
  },
};
