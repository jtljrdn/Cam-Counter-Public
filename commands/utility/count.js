const { SlashCommandBuilder } = require("discord.js");
const { createCount } = require("./count/create.js");
const { setCount } = require("./count/set.js");
const { listCount } = require("./count/list.js");
const { addCount } = require("./count/add.js");
const { removeCount } = require("./count/remove.js");
const { showCount } = require("./count/show.js");
const { resetCount } = require("./count/reset.js");
const { displayCount } = require("./count/display.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("count")
    .setDescription("Count Commands")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("create")
        .setDescription("Creates a new count")
        .addStringOption((option) =>
          option.setName("name").setDescription("Count Name").setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("set")
        .setDescription("Set the current count for the sever")
        .addStringOption((option) =>
          option.setName("id").setDescription("Count ID").setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("list")
        .setDescription("List counts created by user")
        .addUserOption((option) =>
          option.setName("user").setDescription("User").setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Add to the current count")
        .addIntegerOption((option) =>
          option.setName("amount").setDescription("Amount").setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("Remove from the current count")
        .addIntegerOption((option) =>
          option.setName("amount").setDescription("Amount").setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("show").setDescription("Show the current count")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("reset")
        .setDescription("Reset the current count to 0")
        .addStringOption((option) =>
          option.setName("id").setDescription("Count ID").setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("display").setDescription("Display the current count")
    ),

  async execute(interaction) {
    const command = interaction.options.getSubcommand();

    switch (command) {
      case "create":
        createCount(interaction);
        break;

      case "set":
        setCount(interaction);
        break;

      case "list":
        listCount(interaction);
        break;

      case "add":
        addCount(interaction);
        break;

      case "remove":
        removeCount(interaction);
        break;

      case "show":
        showCount(interaction);
        break;

      case "reset":
        resetCount(interaction);
        break;

      case "display":
        displayCount(interaction);
        break;

      default:
        await interaction.reply(`Invalid Subcommand!`);
        break;
    }
  },
};
