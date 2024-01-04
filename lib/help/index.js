const { EmbedBuilder } = require("discord.js");

const page1 = new EmbedBuilder()
  .setColor("#0099ff")
  .setTitle("Help")
  .setDescription(
    "**Useful Links**\n[Invite](https://discord.com/api/oauth2/authorize?client_id=1186507379173503137&permissions=18992663587958&scope=bot+applications.commands)\n[Source Code](https://github.com/jtljrdn/cam-counter-public)\n[Support](https://discord.gg/bDwKqSreue)"
  )
  .addFields(
    {
      name: "**Commands**",
      value: "[Required] (Optional) **Permission Required**",
    },
    { name: "/count create [name]", value: "Create a Count" },
    { name: "/count list [user]", value: "Lists a users counts & IDs" },
    {
      name: "/count add [amount]",
      value: "Adds amount to the current server count",
    },
    {
      name: "/count remove [amount]",
      value: "Removes amount from the current server count",
    },
    {
      name: "/count show",
      value: "Shows the current server count",
    },
    {
      name: "/count display",
      value:
        "**Manage Channels** Shows the current count in a voice channel.\nUpdates every 5 minutes.",
    },
    {
      name: "/count set [ID]",
      value: "**Admininstrator Only** Set the server's count",
    },
    {
      name: "/count reset [ID]",
      value: "**Count Owner Only** Set a count to 0",
    }
  )
  .setFooter({ text: "Page 1/3" });

const page2 = new EmbedBuilder()
  .setColor("#0099ff")
  .setTitle("Help")
  .addFields(
    {
      name: "**Commands**",
      value: "[Required] (Optional) **Permission Required**",
    },
    {
      name: "/role add [user] [role]",
      value: "**Manage Roles** Adds a role to user.",
    },
    {
      name: "/role remove [user] [role]",
      value: "**Manage Roles** Removes a role from user.",
    },
    {
      name: "/role list [role]",
      value: "**Manage Roles** Lists all users with role.",
    },
    {
      name: "/role info [role]",
      value: "**Manage Roles** Shows info on role.",
    },
    {
      name: "/role create [name] (color) (mentionable) (hoist)",
      value: "**Manage Roles** Creates a role.",
    },
    {
      name: "/role color [role] [color]",
      value:
        "**Manage Roles** Changes a role's color. Must use hex color code.",
    },
    { name: "/server", value: "Gives information on the server" },
    { name: "/user [user]", value: "Gives information on a user" }
  )
  .setFooter({ text: "Page 2/3" });

const page3 = new EmbedBuilder()
  .setColor("#0099ff")
  .setTitle("Help")
  .addFields(
    {
      name: "**Commands**",
      value: "[Required] (Optional) **Permission Required**",
    },
    { name: "/bug report [description]", value: "Report a bug" },
    { name: "/bug delete [id]", value: "**Bug Reporter** Delete a bug report" },
    { name: "/fn itemshop", value: "Shows Today's Fortnite Item Shop" },
    { name: "/fn search [name]", value: "Shows the details of a cosmetic" },
    {
      name: "/fn stats [username] [platform]",
      value: "Shows individual player stats including wins and kills.",
    },
    { name: "/fn map", value: "Shows the current up-to-date Fortnite Map" },
    { name: "/avatar (user)", value: "Gives a users avatar" }
  )
  .setFooter({ text: "Page 3/3" });

const pages = [page1, page2, page3];
module.exports = { pages };
