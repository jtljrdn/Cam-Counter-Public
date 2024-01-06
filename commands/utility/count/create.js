const { connectToDatabase } = require("../../../lib/database");
const Count = require("../../../lib/database/models/count.model");
const { logErrors } = require("../../../logging");

const createCount = async (interaction) => {
  try {
    await connectToDatabase();
    const newCount = await Count.create({
      name: interaction.options.getString("name"),
      value: 0,
      creator: interaction.member.id,
      createdAt: Date.now(),
    });
    await interaction.reply(
      `Sucessfully created count with name ${interaction.options.getString(
        "name"
      )} and ID \`${newCount._id}\`!`
    );
    console.log(
      `New Count Created in DB ${interaction.options.getString("name")}`
    );
    console.log(JSON.parse(JSON.stringify(newCount)));
  } catch (error) {
    logErrors(interaction, error);
    console.log(error);
    await interaction.reply(
      `Error creating count in database. Use \`/count help\` for help.`
    );
  }
};

module.exports = { createCount };
