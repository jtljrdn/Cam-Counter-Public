const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logErrors } = require("../../logging");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Poll commands.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("create")
        .setDescription("Create a poll.")
        .addStringOption((option) =>
          option
            .setName("question")
            .setDescription("Question for the poll.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("option1")
            .setDescription("Option 1 for the poll.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("option2")
            .setDescription("Option 2 for the poll.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option.setName("option3").setDescription("Option 3 for the poll.")
        )
        .addStringOption((option) =>
          option.setName("option4").setDescription("Option 4 for the poll.")
        )
        .addStringOption((option) =>
          option.setName("option5").setDescription("Option 5 for the poll.")
        )
        .addStringOption((option) =>
          option.setName("option6").setDescription("Option 6 for the poll.")
        )
    ),

  async execute(interaction) {
    try {
      await interaction.reply("Creating poll...");
      const subcommand = interaction.options.getSubcommand();
      switch (subcommand) {
        case "create":
          const question = interaction.options.getString("question");
          const option1 = interaction.options.getString("option1");
          const option2 = interaction.options.getString("option2");
          const option3 = interaction.options.getString("option3");
          const option4 = interaction.options.getString("option4");
          const option5 = interaction.options.getString("option5");
          const option6 = interaction.options.getString("option6");
          let numOptions = 2;
          let embedDesc = ":one: " + option1 + "\n" + ":two: " + option2 + "\n";
          if (option3) {
            embedDesc += ":three: " + option3 + "\n";
            numOptions++;
          }
          if (option4) {
            embedDesc += ":four: " + option4 + "\n";
            numOptions++;
          }
          if (option5) {
            embedDesc += ":five: " + option5 + "\n";
            numOptions++;
          }
          if (option6) {
            embedDesc += ":five: " + option6 + "\n";
            numOptions++;
          }
          const embed = new EmbedBuilder()
            .setAuthor({
              name: interaction.user.username,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setTitle(question)
            .setColor("Green")
            .setDescription(embedDesc)
            .setTimestamp();

          await interaction.editReply({content: "", embeds: [embed] });
          const pollMessage = await interaction.fetchReply();
          for (let i = 1; i <= numOptions; i++) {
            await pollMessage.react(`${i}\u20e3`);
          }
          break;
      }
    } catch (error) {
      logErrors(interaction, error);
      console.log(error);
      interaction.editReply(
        "Error creating poll. Join the support server for help:\nhttps://discord.gg/bDwKqSreue."
      );
    }
  },
};
