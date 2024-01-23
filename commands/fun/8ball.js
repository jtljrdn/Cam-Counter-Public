const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logErrors } = require("../../logging");
const responses = [
  "It is certain",
  "Reply hazy, try again",
  "Don't count on it",
  "It is decidedly so",
  "Ask again later",
  "My reply is no",
  "Without a doubt",
  "Better not tell you now",
  "My sources say no",
  "Yes definitely",
  "Cannot predict now",
  "Outlook not so good",
  "You may rely on it",
  "Concentrate and ask again",
  "Very doubtful",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Ask the 8ball a question.")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("The question to ask the 8ball.")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
        await interaction.reply("🎱Asking the 8 Ball...🎱");

      const question = interaction.options.getString("question");
      const response = responses[Math.floor(Math.random() * responses.length)];
      const embed = new EmbedBuilder()
        .setTitle("The Magic 8 Ball")
        .setDescription(question)
        .addFields({ name: "Response", value: response })
        .setColor("NotQuiteBlack")
        .setTimestamp();
        setTimeout(async () => {
            await interaction.editReply({content:"", embeds: [embed] });
        }, 1000);
    } catch (error) {
      logErrors(interaction, error);
      console.log(error);
    }
  },
};
