const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
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
        .setName("help")
        .setDescription("List of Count Commands")
    )
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
          option.setName("user").setDescription("User")
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
      case "help":
        const embed = new EmbedBuilder()
        .setTitle("Help with Counts")
        .setDescription("Counts are a way to keep track of things. You can create a count for anything you want, as much as you want.")
        .addFields(
          {name: "Instructions", value: "\n"},
          {name: "Create", value: "Create a count with `/count create [name]`. The name can be anything you want. The ID will be used to reference the count later."},
          {name: "Set", value: "Set the current count for the server with `/count set [ID]`. The ID is the ID of the count you want to set. You can get this from `/count create` or `/count list [user]`."},
          {name: "List", value: "List all counts created by a user with `/count list [user]`. The user is optional. If no user is provided, it will list all counts created by you."},
          {name: "Add", value: "Add to the current count with `/count add [amount]`. The amount is the number you want to add to the current count."},
          {name: "Remove", value: "Remove from the current count with `/count remove [amount]`. The amount is the number you want to remove from the current count."},
          {name: "Show", value: "Show the current count with `/count show`. This will show the current count for the server."},
          {name: "Reset", value: "Reset the current count to 0 with `/count reset [ID]`. The ID is the ID of the count you want to reset. You can get this from `/count create` or `/count list [user]`."},
          {name: "Display", value: "Display the current count in a voice channel with `/count display`. This will create a voice channel with the current count. It will update every minute."},
        )
        await interaction.reply({embeds: [embed]});
        break;
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
