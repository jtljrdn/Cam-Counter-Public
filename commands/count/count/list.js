const { connectToDatabase } = require("../../../lib/database");
const Count = require("../../../lib/database/models/count.model");
const { logErrors } = require("../../../logging");

const listCount = async (interaction) => {
  try {
    const user = interaction.options.getUser("user") ?? interaction.user;
    await connectToDatabase();
    const findCounts = await Count.find({
      creator: user.id,
    });
    await interaction.reply(
      `Here are ${user} counts:${findCounts.map(
        (count) => `\n${count.name} - \`${count._id}\``
      )}`
    );
  } catch (error) {
    logErrors(interaction, error);
    console.log(error);
    await interaction.reply(
      `Error listing your active counts. Use \`/count help\` for help.`
    );
  }
};

module.exports = { listCount };
