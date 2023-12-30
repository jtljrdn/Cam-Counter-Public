const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logErrors, logBugs } = require("../../logging");
const { connectToDatabase } = require("../../lib/database");
const Bug = require("../../lib/database/models/bug.model");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bug")
    .setDescription("Commands for bugs")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("report")
        .setDescription("Report a bug")
        .addStringOption((option) =>
          option
            .setName("description")
            .setDescription("Bug Description")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("delete")
        .setDescription("Delete bug by ID")
        .addStringOption((option) =>
          option.setName("id").setDescription("Bug ID").setRequired(true)
        )
    ),
  async execute(interaction) {
    try {
      const subcommand = await interaction.options.getSubcommand();
      switch (subcommand) {
        case "report":
          await interaction.reply("🐛 Reporting Bug...");
          await connectToDatabase();
          const bug = await Bug.create({
            description: interaction.options.getString("description"),
            submittedBy: interaction.user.id,
            createdAt: Date.now(),
          });
          const reportEmbed = new EmbedBuilder()
            .setTitle("🐛 Bug Reported")
            .setColor("Red")
            .addFields(
              { name: "Bug ID", value: `${bug._id}` },
              { name: "Description", value: `${bug.description}` },
              { name: "Submitted By", value: `<@${bug.submittedBy}>` },
              { name: "Submitted At", value: `${bug.createdAt}` }
            );
          await interaction.editReply({ content: "", embeds: [reportEmbed] });
          logBugs(interaction, bug);
          break;

        case "delete":
          await interaction.reply("🐛 Deleting Bug...");
          await connectToDatabase();
          const bugId = interaction.options.getString("id");
          const bugToDelete = await Bug.findById(bugId);
          console.log(typeof interaction.user.id);
          if (
            bugToDelete.submittedBy != interaction.user.id ||
            interaction.user.id != "119662538781753344"
          ) {
            await interaction.editReply(
              "You can only delete bugs that you have reported."
            );
            break;
          }
          await Bug.findByIdAndDelete(bugId);
          await interaction.editReply("Bug deleted.");
          break;
        default:
          break;
      }
    } catch (error) {
      logErrors(interaction, error);
      console.log(error);
      interaction.editReply(
        "There was an error running this command.\nJoin the support server for help:\nhttps://discord.gg/bDwKqSreue."
      );
    }
  },
};
