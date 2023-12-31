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
            .setFooter({text: "Powered by fnbr.co"})
            .setTimestamp();
          const cosmetics = itemShopFeatured
            .map(
              (item) =>
                `**${item.name}** | ${item.price} V-Bucks | ${upperCaseFirst(item.rarity)}`
            )
            .join("\n");
          itemShopEmbed.setDescription(cosmetics);
          await interaction.editReply({content: "", embeds: [itemShopEmbed] });
          break;

        case "search":
            await interaction.reply("Searching Fortnite Cosmetic...");
            const cosmeticName = interaction.options.getString("name");
            const cosmetic = await axios.get(`https://fnbr.co/api/images?search=${cosmeticName}`, {
                headers: { "x-api-key": process.env.FNBR_API_KEY },
            });
            if (cosmetic.data.data.length === 0) {
                await interaction.editReply(`No cosmetics found for ${cosmeticName}. Check your spelling and try again.`);
                return;
            }
            const cosmeticEmbed = new EmbedBuilder()
                .setTitle(`${cosmetic.data.data[0].name}`)
                .setColor("Blue")
                .setDescription(`${cosmetic.data.data[0].description}`)
                .addFields({
                    name: "Price",
                    value: `${cosmetic.data.data[0].price} V-Bucks`,
                })
                .addFields({
                    name: "Rarity",
                    value: `${upperCaseFirst(cosmetic.data.data[0].rarity)}`,
                })
                .addFields({
                    name: "Type",
                    value: `${upperCaseFirst(cosmetic.data.data[0].type)}`,
                })
                .setImage(cosmetic.data.data[0].images.png ? cosmetic.data.data[0].images.png : cosmetic.data.data[0].images.icon)
                .setURL(`https://fnbr.co/${cosmetic.data.data[0].type}/${cosmetic.data.data[0].slug}`)
                .setFooter({text: "Powered by fnbr.co"})
                .setTimestamp();
            await interaction.editReply({content: "", embeds: [cosmeticEmbed] });
          break;
        default:
          await interaction.reply(`https://fnbr.co/shop`);
      }
    } catch (error) {
      logErrors(interaction, error);
      console.log(error);
      await interaction.reply(
        `Error using Fortnite commands. Join the support server for help:\nhttps://discord.gg/bDwKqSreue.`
      );
    }
  },
};
