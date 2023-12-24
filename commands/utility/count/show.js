const { connectToDatabase } = require("../../../lib/database");
const Count = require("../../../lib/database/models/count.model");
const Server = require("../../../lib/database/models/servers.model");

const showCount = async (interaction) => {
    try {
        await connectToDatabase();
        const findCountForServer = await Server.findOne({guildId: interaction.guild.id});
        const findCount = await Count.findById(findCountForServer.currentCount);
        await interaction.reply(`The current count for ${interaction.guild.name} is ${findCount.value}!`);
    } catch (error) {
        console.log(error);
        await interaction.reply(
            `Error showing your active counts. Contact <@119662538781753344> for help.`
          );
    }
}

module.exports = { showCount }