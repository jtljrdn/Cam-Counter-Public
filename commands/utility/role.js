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
    // .addSubcommand((subcommand) =>
    //   subcommand
    //     .setName("addall")
    //     .setDescription("Add all users to role")
    //     .addRoleOption((option) =>
    //       option.setName("role").setDescription("Role").setRequired(true)
    //     )
    //     .addBooleanOption((option) =>
    //       option.setName("bots").setDescription("Include Bots. Default: False")
    //     )
    // )
    //   .addSubcommand((subcommand) =>
    //   subcommand
    //     .setName("removeall")
    //     .setDescription("Remove all users from a role")
    //     .addRoleOption((option) =>
    //       option.setName("role").setDescription("Role").setRequired(true)
    //     )
    //     .addBooleanOption((option) =>
    //       option.setName("bots").setDescription("Include Bots. Default: False")
    //     )
    // )
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
    // .addSubcommand((subcommand) =>
    //   subcommand
    //     .setName("list")
    //     .setDescription("Lists users in a role")
    //     .addRoleOption((option) =>
    //       option.setName("role").setDescription("Role").setRequired(true)
    //     )
    // )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("info")
        .setDescription("Shows info on a role")
        .addRoleOption((option) =>
          option.setName("role").setDescription("Role").setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("create")
        .setDescription("Creates a role")
        .addStringOption((option) =>
          option.setName("name").setDescription("Role Name").setRequired(true)
        )
        .addStringOption((option) =>
          option.setName("color").setDescription("Hex Color Code")
        )
        .addBooleanOption((option) =>
          option.setName("mentionable").setDescription("Mentionable Role")
        )
        .addBooleanOption((option) =>
          option.setName("hoist").setDescription("Hoist Role")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("color")
        .setDescription("Changes a role's color")
        .addRoleOption((option) =>
          option.setName("role").setDescription("Role").setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("hex")
            .setDescription("Hex Color Code")
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    try {
      const subcommand = await interaction.options.getSubcommand();
      const targetUser = interaction.options.getMember("user");
      const member = await interaction.member;
      const role = await interaction.options.getRole("role");
      if (!member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
        await interaction.reply(
          `<@${interaction.user.id}> You do not have permission to use this command.`
        );
        return;
      }

      switch (subcommand) {
        case "add":
          await interaction.reply(`Added ${role} to ${targetUser}`);
          await targetUser.roles.add(role.id);
          break;
        // case "addall":
        //   await interaction.reply(`Adding all users to ${role}`);
        //   const addBots = (await interaction.options.getBoolean("bots")) ?? false;
        //   await interaction.guild.members.fetch();
        //   if (addBots == true) {
        //     const membersToAdd = await interaction.guild.members.cache
        //     await membersToAdd.forEach(async (member) => {
        //       await member.roles.add(role.id);
        //     });
        //     await interaction.editReply(
        //       `Added ${membersToAdd.size} users to ${role}`
        //     );
        //   } else {
        //     const membersToAdd = await interaction.guild.members.cache.filter(
        //       (member) => member.user.bot === false
        //     );
        //     await membersToAdd.forEach(async (member) => {
        //       await member.roles.add(role.id);
        //     });
        //     await interaction.editReply(
        //       `Added ${membersToAdd.size} users to ${role}`
        //     );
        //   }
        //   break;
        case "remove":
          await interaction.reply(`Removed ${role} from ${targetUser}`);
          await targetUser.roles.remove(role.id);
          break;
        //   case "removeall":
        //   await interaction.reply(`Removing all users from ${role}`);
        //   const removeBots = (await interaction.options.getBoolean("bots")) ?? false;
        //   await interaction.guild.members.fetch();
        //   if (removeBots == true) {
        //     const membersToRemove = await interaction.guild.members.cache
        //     await membersToRemove.forEach(async (member) => {
        //       await member.roles.remove(role.id);
        //     });
        //     await interaction.editReply(
        //       `Removed ${membersToRemove.size} users from ${role}`
        //     );
        //   } else {
        //     const membersToRemove = await interaction.guild.members.cache.filter(
        //       (member) => member.user.bot === false
        //     );
        //     await membersToRemove.forEach(async (member) => {
        //       await member.roles.remove(role.id);
        //     });
        //     await interaction.editReply(
        //       `Removed ${membersToRemove.size} users from ${role}`
        //     );
        //   }
        // break;
        // case "list":
        //   await interaction.guild.members.fetch();
        //   const members = await role.members
        //     .map((member) => `<@${member.user.id}>`)
        //     .join("\n");
        //   const listEmbed = new EmbedBuilder()
        //     .setColor(role.color)
        //     .setTitle(`Users in ${role.name}`)
        //     .setDescription(`${members}`);
        //   await interaction.reply({ embeds: [listEmbed] });
        //   break;
        case "info":
          const infoEmbed = new EmbedBuilder()
            .setColor(role.color)
            .setTitle(`${role.name}`)
            .setDescription(`ID: ${role.id}`)
            .setThumbnail(
              `https://www.colorhexa.com/${role.hexColor.slice(1)}.png`
            )
            .addFields(
              { name: "Color", value: `${role.hexColor}`, inline: true },
              {
                name: "Mentionable",
                value: `${role.mentionable}`,
                inline: true,
              },
              { name: "Hoisted", value: `${role.hoist}`, inline: true },
              { name: "Position", value: `${role.position}`, inline: true }
            );
          await interaction.reply({ embeds: [infoEmbed] });
          break;
        case "create":
          await interaction.reply("Creating role...");
          const name = await interaction.options.getString("name");
          const color =
            (await interaction.options.getString("color")) ?? "Default";
          const mentionable =
            (await interaction.options.getBoolean("mentionable")) ?? false;
          const hoist =
            (await interaction.options.getBoolean("hoist")) ?? false;

          const newRole = await interaction.guild.roles.create({
            name: name,
            color: color,
            mentionable: mentionable,
            hoist: hoist,
          });
          const roleEmbed = new EmbedBuilder()
            .setColor(newRole.color)
            .setTitle(`Sucessfully created new role ${newRole.name}!`)
            .setDescription(`ID: ${newRole.id}`)
            .setThumbnail(
              `https://www.colorhexa.com/${newRole.hexColor.slice(1)}.png`
            )
            .addFields(
              { name: "Color", value: `${newRole.hexColor}`, inline: true },
              {
                name: "Mentionable",
                value: `${newRole.mentionable}`,
                inline: true,
              },
              { name: "Hoisted", value: `${newRole.hoist}`, inline: true }
            )
            .setTimestamp();
          await interaction.editReply({ content: "", embeds: [roleEmbed] });
          break;
        case "color":
          await interaction.reply("Changing role color...");
          const hex = await interaction.options.getString("hex");
          await role.setColor(hex);
          const colorEmbed = new EmbedBuilder()
            .setColor(role.color)
            .setTitle(`Sucessfully changed ${role.name}'s color!`)
            .setDescription(`ID: ${role.id}`)
            .setThumbnail(
              `https://www.colorhexa.com/${role.hexColor.slice(1)}.png`
            )
            .addFields(
              { name: "Role", value: `${role}`, inline: true },
              { name: "Color", value: `${role.hexColor}`, inline: true }
            )
            .setTimestamp();
          await interaction.editReply({ content: "", embeds: [colorEmbed] });
          break;

        default:
          break;
      }
    } catch (error) {
      if (
        error.message === "Missing Permissions" ||
        error.message === "Missing Access"
      ) {
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
      if (error.message === "Unable to convert color to a number.") {
        const embed = new EmbedBuilder()
          .setTitle("🤖 Error")
          .setColor("Red")
          .setDescription(
            `Invalid color code. Please use a hex color code. (i.e. #ff0000))`
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
