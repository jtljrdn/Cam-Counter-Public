const { connectToDatabase } = require("../../../lib/database");
const Count = require("../../../lib/database/models/count.model");
const Server = require("../../../lib/database/models/servers.model");


const resetCount = async (interaction) => {
    try {
        const member = await interaction.guild.members.fetch(interaction.user.id);

        await connectToDatabase();
        const findServer = await Server.findOne({guildId: interaction.guild.id});
        const findCount = await Count.findById(findServer.currentCount);
        if (member.id !== findCount.creator) {
            await interaction.reply(
                `<@${interaction.user.id}> You do not have permission to use this command. Only the count's creator may reset it.`
              );
              return;
        }
        const updatedCount = await Count.updateOne({_id: findServer.currentCount}, {value: 0});
        await interaction.reply(`Count ${findCount.name} reset to 0!`);
    } catch (error) {
        console.log(error);
        await interaction.reply(
            `Error resetting count. Contact <@119662538781753344> for help.`
          );
    }
}

module.exports = { resetCount }