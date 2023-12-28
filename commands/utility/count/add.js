const { connectToDatabase } = require("../../../lib/database");
const Count = require("../../../lib/database/models/count.model");
const Server = require("../../../lib/database/models/servers.model");


const addCount = async (interaction) => {
    try {
        await connectToDatabase();
        const findServer = await Server.findOne({guildId: interaction.guild.id});
        const findCount = await Count.findById(findServer.currentCount);
        const updatedCount = await Count.updateOne({_id: findServer.currentCount}, {value: findCount.value + interaction.options.getInteger("amount")});
        await interaction.reply(`Count ${findCount.name} incremented by ${interaction.options.getInteger("amount")}!`);
    } catch (error) {
        logErrors(interaction, error);
        console.log(error);
        await interaction.reply(
            `Error adding to the count. Join the support server for help:\nhttps://discord.gg/bDwKqSreue.`
          );
    }
}

module.exports = { addCount }