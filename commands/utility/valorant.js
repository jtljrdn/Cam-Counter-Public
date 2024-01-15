const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logErrors } = require("../../logging");
const { default: axios } = require("axios");
const format = require("format-duration");

const getMapImage = (map) => {
  switch (map) {
    case "Haven":
      return "https://static.wikia.nocookie.net/valorant/images/7/70/Loading_Screen_Haven.png/revision/latest/scale-to-width-down/1000?cb=20200620202335";
    case "Bind":
      return "https://static.wikia.nocookie.net/valorant/images/2/23/Loading_Screen_Bind.png/revision/latest/scale-to-width-down/1000?cb=20200620202316";
    case "Split":
      return "https://static.wikia.nocookie.net/valorant/images/d/d6/Loading_Screen_Split.png/revision/latest/scale-to-width-down/1000?cb=20230411161807";
    case "Ascent":
      return "https://static.wikia.nocookie.net/valorant/images/e/e7/Loading_Screen_Ascent.png/revision/latest/scale-to-width-down/1000?cb=20200607180020";
    case "Icebox":
      return "https://static.wikia.nocookie.net/valorant/images/1/13/Loading_Screen_Icebox.png/revision/latest/scale-to-width-down/1000?cb=20201015084446";
    case "Breeze":
      return "https://static.wikia.nocookie.net/valorant/images/1/10/Loading_Screen_Breeze.png/revision/latest/scale-to-width-down/1000?cb=20210427160616";
    case "Fracture":
      return "https://static.wikia.nocookie.net/valorant/images/f/fc/Loading_Screen_Fracture.png/revision/latest/scale-to-width-down/1000?cb=20210908143656";
    case "Pearl":
      return "https://static.wikia.nocookie.net/valorant/images/a/af/Loading_Screen_Pearl.png/revision/latest/scale-to-width-down/1000?cb=20220622132842";
    case "Lotus":
      return "https://static.wikia.nocookie.net/valorant/images/d/d0/Loading_Screen_Lotus.png/revision/latest/scale-to-width-down/1000?cb=20230106163526";
    case "Sunset":
      return "https://static.wikia.nocookie.net/valorant/images/5/5c/Loading_Screen_Sunset.png/revision/latest/scale-to-width-down/1000?cb=20230829125442";
    default:
      break;
  }
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("valorant")
    .setDescription("Valorant Commands")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("match-info")
        .setDescription("Get information on a match")
        .addStringOption((option) =>
          option.setName("matchid").setDescription("Match ID").setRequired(true)
        )
    ),
  async execute(interaction) {
    try {
      const subcommand = interaction.options.getSubcommand();
      switch (subcommand) {
        case "match-info":
          const matchEmbed = new EmbedBuilder()
            .setTitle("Match Info")
            .setColor("#fa4454")
            .setDescription("Getting match info...")
            .setTimestamp();
          await interaction.reply({ embeds: [matchEmbed] });
          const matchId = interaction.options.getString("matchid");
          const matchData = await axios
            .get(`https://api.henrikdev.xyz/valorant/v2/match/${matchId}`)
            .catch((error) => {
              console.log(error);
              matchEmbed.setTitle("Match Info Error")
              matchEmbed.setDescription("Error getting match info. Make sure you entered the correct match ID and try again.")
              interaction.editReply({ embeds: [matchEmbed] });
              return;
            });

          const winningTeam = matchData.data.data.teams.red.has_won
            ? "Red"
            : "Blue";
          matchEmbed.setImage(getMapImage(matchData.data.data.metadata.map));
          matchEmbed.setFooter({
            text: "Images provided by Valorant Fandom Wiki",
          });
          matchEmbed.setDescription(null);
          matchEmbed.addFields([
            {
              name: "Match ID",
              value: `\`${matchData.data.data.metadata.matchid}\``,
              inline: true,
            },
            {
              name: "Map",
              value: `${matchData.data.data.metadata.map}`,
              inline: true,
            },
            {
              name: "Mode",
              value: `${matchData.data.data.metadata.mode}`,
              inline: true,
            },
            {
              name: "Game Time",
              value: `<t:${parseInt(
                matchData.data.data.metadata.game_start.toFixed(0)
              )}>`,
              inline: true,
            },
            {
              name: "Duration",
              value: `${format(
                matchData.data.data.metadata.game_length * 1000
              )}`,
              inline: true,
            },
            {
              name: "Region",
              value: `${matchData.data.data.metadata.region}`,
              inline: true,
            },
            { name: "Winning Team", value: `${winningTeam}`, inline: true },
            {
              name: "Score Line",
              value: `**Red** ${matchData.data.data.teams.red.rounds_won} - **Blue** ${matchData.data.data.teams.blue.rounds_won}`,
              inline: true,
            },
          ]);

          await interaction.editReply({ embeds: [matchEmbed] });
          break;

        default:
          break;
      }
    } catch (error) {
      logErrors(interaction, error);
      console.log(error);
      await interaction.editReply(`There was an error. Join the support server for help:\nhttps://discord.gg/bDwKqSreue.`);
    }
  },
};
