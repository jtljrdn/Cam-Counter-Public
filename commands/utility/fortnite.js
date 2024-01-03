const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logErrors } = require("../../logging");
const { default: axios } = require("axios");
const { upperCaseFirst } = require("../../lib/upperCaseFirst");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fn")
    .setDescription("Fortnite Related Commands")
    .addSubcommand((subcommand) =>
      subcommand.setName("itemshop").setDescription("Get Fortnite Item Shop")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("search")
        .setDescription("Show Fortnite Cosmetic")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("Cosmetic Name")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("stats")
        .setDescription("Shows a Players Fortnite Stats")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("Epic Games Username")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("platform")
            .setDescription("Platform (Epic, PSN, XBL)")
            .addChoices(
              { name: "Epic", value: "epic" },
              { name: "PSN", value: "psn" },
              { name: "XBL", value: "xbl" }
            )
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    try {
      const subcommand = await interaction.options.getSubcommand();
      switch (subcommand) {
        case "itemshop":
          await interaction.reply("Getting Fortnite Item Shop...");
          const itemShop = await axios.get("https://fnbr.co/api/shop", {
            headers: { "x-api-key": process.env.FNBR_API_KEY },
          });
          const itemShopFeatured = itemShop.data.data.featured;

          const itemShopEmbed = new EmbedBuilder()
            .setTitle(`Today's Item Shop | ${itemShopFeatured.length} Items`)
            .setColor("Red")
            .setFooter({ text: "Powered by fnbr.co" })
            .setTimestamp();
          const cosmetics = itemShopFeatured
            .map(
              (item) =>
                `**${item.name}** | ${item.price} V-Bucks | ${upperCaseFirst(
                  item.rarity
                )}`
            )
            .join("\n");
          itemShopEmbed.setDescription(cosmetics);
          await interaction.editReply({ content: "", embeds: [itemShopEmbed] });
          break;

        case "search":
          await interaction.reply("Searching Fortnite Cosmetic...");
          const cosmeticName = interaction.options.getString("name");
          const cosmetic = await axios.get(
            `https://fnbr.co/api/images?search=${cosmeticName}`,
            {
              headers: { "x-api-key": process.env.FNBR_API_KEY },
            }
          );
          if (cosmetic.data.data.length === 0) {
            await interaction.editReply(
              `No cosmetics found for ${cosmeticName}. Check your spelling and try again.`
            );
            return;
          }

          const cosmeticEmbed = new EmbedBuilder()
            .setTitle(`${cosmetic.data.data[0].name}`)
            .setColor("Blue")
            .setDescription(`${cosmetic.data.data[0].description}`)
            .addFields({
              name: "Price",
              value: `${cosmetic.data.data[0].price}`,
            })
            .addFields({
              name: "Rarity",
              value: `${upperCaseFirst(cosmetic.data.data[0].rarity)}`,
            })
            .addFields({
              name: "Type",
              value: `${upperCaseFirst(cosmetic.data.data[0].type)}`,
            })
            .addFields({
              name: "Last Seen",
              value: `${cosmetic.data.data[0].history.lastSeen}`,
            })
            .setImage(
              cosmetic.data.data[0].images.featured
                ? cosmetic.data.data[0].images.featured
                : cosmetic.data.data[0].images.icon
            )
            .setURL(
              `https://fnbr.co/${cosmetic.data.data[0].type}/${cosmetic.data.data[0].slug}`
            )
            .setFooter({ text: "Powered by fnbr.co" })
            .setTimestamp();
          await interaction.editReply({ content: "", embeds: [cosmeticEmbed] });
          break;

        case "stats":
          await interaction.reply("Getting Fortnite Stats...");
          const username = interaction.options.getString("name");
          const platform = interaction.options.getString("platform");
          let stats;
          let platformImage;
          if (platform === "epic") {
            stats = await axios.get(
              `https://fortnite-api.com/v2/stats/br/v2?name=${username}&image=all`,
              {
                headers: { Authorization: process.env.FNAPI_KEY },
              }
            );
            platformImage =
              "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Epic_Games_logo.svg/882px-Epic_Games_logo.svg.png";
          } else if (platform === "psn") {
            stats = await axios.get(
              `https://fortnite-api.com/v2/stats/br/v2?name=${username}&accountType=psn&image=all`,
              {
                headers: { Authorization: process.env.FNAPI_KEY },
              }
            );
            platformImage =
              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/2560px-PlayStation_logo.svg.png";
          } else if (platform === "xbl") {
            stats = await axios.get(
              `https://fortnite-api.com/v2/stats/br/v2?name=${username}&accountType=xbl&image=all`,
              {
                headers: { Authorization: process.env.FNAPI_KEY },
              }
            );
            platformImage =
              "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/2048px-Xbox_one_logo.svg.png";
          }
          if (stats.data.status == 404) {
            await interaction.editReply(
              `${username} does not exist. Check your spelling and try again.`
            );
            return;
          }
          const statsEmbed = new EmbedBuilder()
            .setTitle(`${stats.data.data.account.name}`)
            .setDescription(
              `Fortnite Stats for ${
                stats.data.data.account.name
              } | ${upperCaseFirst(platform)}`
            )
            .setColor("Blue")
            .setThumbnail(platformImage)
            .addFields(
              {
                name: "Season Level",
                value: `BP Level ${stats.data.data.battlePass.level}`,
              },
              {
                name: "Overall",
                value: `Wins ${stats.data.data.stats.all.overall.wins} | Win Rate ${stats.data.data.stats.all.overall.winRate} | Kills ${stats.data.data.stats.all.overall.kills} `,
              },
              {
                name: "Solo",
                value: `Wins ${stats.data.data.stats.all.solo.wins} | Win Rate ${stats.data.data.stats.all.solo.winRate} | Kills ${stats.data.data.stats.all.solo.kills} `,
              },
              {
                name: "Duo",
                value: `Wins ${stats.data.data.stats.all.duo.wins} | Win Rate ${stats.data.data.stats.all.duo.winRate} | Kills ${stats.data.data.stats.all.duo.kills} `,
              },
              {
                name: "Squad",
                value: `Wins ${stats.data.data.stats.all.squad.wins} | Win Rate ${stats.data.data.stats.all.squad.winRate} | Kills ${stats.data.data.stats.all.squad.kills} `,
              }
            )
            .setImage(stats.data.data.image)
            .setFooter({ text: "Powered by fortnite-api.com" })
            .setTimestamp();
          await interaction.editReply({ content: "", embeds: [statsEmbed] });
          console.log(stats.data.data.stats.all.overall);
          break;

        default:
          await interaction.reply(`https://fnbr.co/shop`);
      }
    } catch (error) {
      if (error.response.status == 404) {
        await interaction.editReply(
          `User does not exist. Check your spelling and try again.`
        );
        return;
      }
      logErrors(interaction, error);
      console.log(error);
      await interaction.editReply(
        `Error using Fortnite commands. Join the support server for help:\nhttps://discord.gg/bDwKqSreue.`
      );
    }
  },
};
