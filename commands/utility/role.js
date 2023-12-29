const {
  SlashCommandBuilder,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");
const { logErrors } = require("../../logging");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("role")
    .setDescription("Add role to user")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Add role to user")
        .addUserOption((option) =>
          option.setName("user").setDescription("User").setRequired(true)
        )
        .addRoleOption((option) =>
          option.setName("role").setDescription("Role").setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("Removes a role from a user")
        .addUserOption((option) =>
          option.setName("user").setDescription("User").setRequired(true)
        )
        .addRoleOption((option) =>
          option.setName("role").setDescription("Role").setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("list")
        .setDescription("Lists users in a role")
        .addRoleOption((option) =>
          option.setName("role").setDescription("Role").setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("info")
        .setDescription("Shows info on a role")
        .addRoleOption((option) =>
          option.setName("role").setDescription("Role").setRequired(true)
        )
    ),

  async execute(interaction) {
    try {
      const subcommand = await interaction.options.getSubcommand();
      const targetUser = await interaction.guild.members.fetch(
        interaction.options.getUser("user")
      );
      const member = await interaction.guild.members.fetch(interaction.user.id);
      const role = await interaction.options.getRole("role");
      if (!member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
        await interaction.reply(
          `<@${interaction.user.id}> You do not have permission to use this command.`
        );
        return;
      }

      switch (subcommand) {
        case "add":
          await interaction.reply(`Adding ${role} to ${targetUser}`);
          await targetUser.roles.add(role.id);
          break;
          case "remove":
            await interaction.reply(`Removing ${role} from ${targetUser}`);
            await targetUser.roles.remove(role.id);
          break;
          case "list":
            await interaction.guild.members.fetch();
            const members = await role.members
              .map((member) => `<@${member.user.id}>`)
              .join("\n");
            const listEmbed = new EmbedBuilder()
              .setColor(role.color)
              .setTitle(`Users in ${role.name}`)
              .setDescription(`${members}`);
            await interaction.reply({ embeds: [listEmbed] });
          break;
          case "info":
            await interaction.guild.members.fetch();
            const infoEmbed = new EmbedBuilder()
            .setColor(role.color)
            .setTitle(`${role.name}`)
            .setDescription(`ID: ${role.id}`)
            .setThumbnail(`https://www.colorhexa.com/${role.hexColor.slice(1)}.png`)
            .addFields(
              { name: "Color", value: `${role.hexColor}` },
              { name: "Mentionable", value: `${role.mentionable}` },
              { name: "Hoisted", value: `${role.hoist}` },
              { name: "Position", value: `${role.position}` },
              { name: "Members", value: `${role.members.size}` }
            );
          await interaction.reply({ embeds: [infoEmbed] });
          break;
      
        default:
          break;
      }
    } catch (error) {
      if (error.message === "Missing Permissions") {
        const embed = new EmbedBuilder()
          .setTitle("🤖 Error")
          .setColor("Red")
          .setDescription(
            `CamBot does not have permission to use this command.\nPlease make sure CamBot has the **Manage Roles** permission and the role you are trying to change is below CamBot's highest role.`
          )
          .setTimestamp(Date.now());
        await interaction.editReply({ content: "", embeds: [embed] });
        return;
      }
      logErrors(interaction, error);
      console.log(error);
      await interaction.followUp(
        "There was an error trying to execute that command!"
      );
    }
  },
};
