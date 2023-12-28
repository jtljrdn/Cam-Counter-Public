const { connectToDatabase } = require("../../../lib/database");
const Count = require("../../../lib/database/models/count.model");
const Server = require("../../../lib/database/models/servers.model");
const { logErrors } = require("../../../logging");

const showCount = async (interaction) => {
  try {
    await connectToDatabase();
    const findCountForServer = await Server.findOne({
      guildId: interaction.guild.id,
    });
    const findCount = await Count.findById(findCountForServer.currentCount);
    await interaction.reply(
      `The current count for ${interaction.guild.name} is ${findCount.value}!`
    );
  } catch (error) {
    logErrors(interaction, error);
    console.log(error);
    await interaction.reply(
      `Error showing your active counts.\nhttps://discord.gg/bDwKqSreue.`
    );
  }
};

module.exports = { showCount };
