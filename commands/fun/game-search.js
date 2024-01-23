const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logErrors } = require("../../logging");
const { default: axios } = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("game-search")
    .setDescription("Search for game information.")
    .addStringOption((option) =>
      option
        .setName("game")
        .setDescription("The game to search for.")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply({ ephemeral: true });
      const game = interaction.options.getString("game");
      const { data: gameData, status } = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.RAWGAPI_KEY}&search=${game}`
      );
      const embed = new EmbedBuilder().setTitle("Game Search");
      if (status !== 200 || gameData.count === 0) {
        embed.setDescription("Something went wrong. Check your spelling and try again.").setColor("Red");
        await interaction.editReply({ embeds: [embed] });
        return;
      }
      const gameInfo = gameData.results[0];
      const platforms = gameInfo.platforms
        .map((platform) => platform.platform.name)
        .join(", ");
      const rating = gameInfo.metacritic || "N/A";
      const genres = gameInfo.genres.map((genre) => genre.name).join(", ");
      const stores = gameInfo.stores.map((store) => store.store.name).join(", ");
      embed
        .setTitle(gameInfo.name)
        .addFields(
          { name: "Released", value: gameInfo.released },
          { name: "Available On", value: stores.length > 0 ? stores : "N/A"},
          { name: "Platforms", value: platforms },
          { name: "Metascore", value: `${rating}` },
          { name: "Genres", value: genres }
        )
        .setImage(gameInfo.background_image)
        .setColor(gameInfo.dominant_color)
        .setTimestamp()
        .setFooter({ text: "Some info may be inaccurate | Powered by RAWG.io" })
        .setURL(`https://rawg.io/games/${gameInfo.slug}`);
      await interaction.editReply({ embeds: [embed], ephemeral: false});
    } catch (error) {
      await interaction.editReply("Something went wrong.");
      logErrors(interaction, error);
      console.log(error);
    }
  },
};
