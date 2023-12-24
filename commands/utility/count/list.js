const { connectToDatabase } = require("../../../lib/database");
const Count = require("../../../lib/database/models/count.model");

const listCount = async (interaction) => {
    try {
        await connectToDatabase();
        const findCounts = await Count.find({creator: interaction.options.getUser("user").id});
        await interaction.reply(`Here are ${interaction.options.getUser("user")} counts:${findCounts.map((count) => `\n${count.name} - ${count._id}`)}`);
    } catch (error) {
        console.log(error);
        await interaction.reply(
            `Error listing your active counts. Contact <@119662538781753344> for help.`
          );
    }
}

module.exports = { listCount }