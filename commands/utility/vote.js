const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logErrors } = require("../../logging");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vote")
    .setDescription("Vote for CamBot"),
  async execute(interaction) {
    try {
      const embed = new EmbedBuilder()
        .setTitle("Vote!")
        .setColor("Blurple")
        .setThumbnail(interaction.client.user.displayAvatarURL())
        .setDescription("If you want to support CamBot, vote for it!")
        .addFields(
          {
            name: "Voting",
            value:
              "[Top.gg](https://top.gg/bot/1186507379173503137)\n[DiscordBotList](https://discordbotlist.com/bots/cambot/upvote)",
          },
          {
            name: "Want to support the bot in other ways?",
            value:
              "**Buy me a [Ko-fi](https://ko-fi.com/bungbloopity)** to support the bot's development!\nJoin the support server! [Discord](https://discord.gg/bDwKqSreue)",
          }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      logErrors(interaction, error);
      console.log(error);
    }
  },
};
