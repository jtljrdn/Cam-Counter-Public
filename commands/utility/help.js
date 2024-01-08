const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ComponentType,
} = require("discord.js");
const { pages } = require("../../lib/help");
const { logErrors } = require("../../logging");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List of Info/Commands"),

  async execute(interaction) {
    try {
      let page = 0;
      const nextPage = new ButtonBuilder()
        .setCustomId("next")
        .setLabel("Next")
        .setStyle(ButtonStyle.Success);
      const prevPage = new ButtonBuilder()
        .setCustomId("prev")
        .setLabel("Prev")
        .setStyle(ButtonStyle.Success);
      const disabledPageNumber = new ButtonBuilder()
        .setCustomId("pageNumber")
        .setLabel(`${page + 1}/${pages.length}`)
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true);
      const row = new ActionRowBuilder().addComponents(
        prevPage,
        disabledPageNumber,
        nextPage
      );

      const curPage = await interaction.reply({
        embeds: [
          pages[page].setFooter({ text: `Page ${page + 1} / ${pages.length}` }),
        ],
        components: [row],
        fetchReply: true,
      });

      const collector = await curPage.createMessageComponentCollector({
        componentType: ComponentType.Button,
        time: 120000,
      });

      collector.on("collect", async (i) => {
        switch (i.customId) {
          case "prev":
            page = page > 0 ? --page : pages.length - 1;
            break;
          case "next":
            page = page + 1 < pages.length ? ++page : 0;
            break;
          default:
            break;
        }
        disabledPageNumber.setLabel(`${page + 1}/${pages.length}`);
        await i.deferUpdate();
        await i.editReply({
          embeds: [
            pages[page].setFooter({
              text: `Page ${page + 1} / ${pages.length}`,
            }),
          ],
          components: [row],
        });
        collector.resetTimer();
      });

      collector.on("end", (_, reason) => {
        if (reason !== "messageDelete") {
          const disabledRow = new ActionRowBuilder().addComponents(
            prevPage.setDisabled(true),
            disabledPageNumber.setDisabled(true),
            nextPage.setDisabled(true)
          );
          curPage.edit({
            embeds: [
              pages[page].setFooter({
                text: `Page ${page + 1} / ${pages.length}`,
              }),
            ],
            components: [disabledRow],
          });
        }
      });
    } catch (error) {
      logErrors(interaction, error);
      console.log(error);
      await interaction.editReply(
        `Error getting help pages. Join the support server for help:\nhttps://discord.gg/bDwKqSreue.`
      );
    }
  },
};
