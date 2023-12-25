const { connectToDatabase } = require("../../../lib/database");
const Count = require("../../../lib/database/models/count.model");

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
      )} and ID ${newCount._id}!`
    );
    console.log(
      `New Count Created in DB ${interaction.options.getString("name")}`
    );
    console.log(JSON.parse(JSON.stringify(newCount)));
  } catch (error) {
    console.log(error);
    await interaction.reply(
      `Error creating count in database. Join the support server for help:\nhttps://discord.gg/bDwKqSreue.`
    );
  }
};

module.exports = { createCount };
