const { PermissionsBitField } = require("discord.js");
const { connectToDatabase } = require("../../../lib/database");
const Count = require("../../../lib/database/models/count.model");
const Server = require("../../../lib/database/models/servers.model");
const { logErrors } = require("../../../logging");

const setCount = async (interaction) => {
  try {
    const member = await interaction.guild.members.fetch(interaction.user.id);
    if (!member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      await interaction.reply(
        `<@${interaction.user.id}> You do not have permission to use this command.`
      );
      return;
    }
    await connectToDatabase();
    const findCount = await Count.findById(interaction.options.getString("id"));
    if (!findCount) {
      await interaction.reply(
        `Count with ID \`${interaction.options.getString("id")}\` not found!`
      );
      return;
    }
    const updateCountInServer = await Server.findOneAndUpdate(
      { guildId: interaction.guild.id },
      { currentCount: interaction.options.getString("id") }
    );
    await interaction.reply(
      `Setting count to ${interaction.options.getString("id")}`
    );
    console.log(
      `Sever Count Set to ${interaction.options.getString("id")} for ${
        interaction.guild.name
      }`
    );
  } catch (error) {
    logErrors(interaction, error);
    console.log(error);
    await interaction.reply(
      `Error setting count in database.\nhttps://discord.gg/bDwKqSreue.`
    );
  }
};
module.exports = { setCount };
