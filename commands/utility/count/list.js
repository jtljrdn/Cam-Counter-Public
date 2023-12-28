const { connectToDatabase } = require("../../../lib/database");
const Count = require("../../../lib/database/models/count.model");
const { logErrors } = require("../../../logging");

const listCount = async (interaction) => {
  try {
    await connectToDatabase();
    const findCounts = await Count.find({
      creator: interaction.options.getUser("user").id,
    });
    await interaction.reply(
      `Here are ${interaction.options.getUser("user")} counts:${findCounts.map(
        (count) => `\n${count.name} - ${count._id}`
      )}`
    );
  } catch (error) {
    logErrors(interaction, error);
    console.log(error);
    await interaction.reply(
      `Error listing your active counts. Join the support server for help:\nhttps://discord.gg/bDwKqSreue.`
    );
  }
};

module.exports = { listCount };
