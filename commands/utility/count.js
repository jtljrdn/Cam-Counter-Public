const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { createCount } = require("./count/create.js");
const { setCount } = require("./count/set.js");
const { listCount } = require("./count/list.js");


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

      default:
        await interaction.reply(`Invalid Subcommand!`);
        break;
    }
  },
};
