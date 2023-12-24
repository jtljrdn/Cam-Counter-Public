const { connectToDatabase } = require("../../../lib/database");
const Count = require("../../../lib/database/models/count.model");
const Server = require("../../../lib/database/models/servers.model");


const removeCount = async (interaction) => {
    try {
        await connectToDatabase();
        const findServer = await Server.findOne({guildId: interaction.guild.id});
        const findCount = await Count.findById(findServer.currentCount);
        const updatedCount = await Count.updateOne({_id: findServer.currentCount}, {value: findCount.value - interaction.options.getInteger("amount")});
        await interaction.reply(`Count ${findCount.name} decreased by ${interaction.options.getInteger("amount")}!`);
    } catch (error) {
        console.log(error);
        await interaction.reply(
            `Error listing your active counts. Contact <@119662538781753344> for help.`
          );
    }
}

module.exports = { removeCount }