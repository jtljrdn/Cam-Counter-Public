const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logErrors } = require("../../logging");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Invite the bot to your server!"),
  async execute(interaction) {
    // interaction.guild is the object representing the Guild in which the command was run
    try {
        const embed = new EmbedBuilder()
            .setTitle("Invite Me!")
            .setColor("Green")
            .setDescription("Invite me to your server!")
            .setImage(interaction.client.user.displayAvatarURL()) 
            .addFields(
                { name: "Invite Link", value: "[Invite](https://discord.com/api/oauth2/authorize?client_id=1186507379173503137&permissions=18992663587958&scope=bot+applications.commands)"},
                { name: "Support Discord", value: "[Join](https://discord.gg/bDwKqSreue)"}
            )

        await interaction.reply({ embeds: [embed] });
    } catch (error) {
        logErrors(interaction, error);
        console.log(error);
    }
  },
};
