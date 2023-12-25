const { EmbedBuilder } = require("discord.js");

const page1 = new EmbedBuilder()
  .setColor("#0099ff")
  .setTitle("Help")
  .setDescription(
    "**Useful Links**\n[Invite](https://discord.com/api/oauth2/authorize?client_id=1186507379173503137&permissions=1494698011670&scope=bot+applications.commands)\n[Source Code](https://github.com/jtljrdn/cam-counter-public)\n[Community Discord](https://discord.gg/bDwKqSreue)"
  )
  .addFields(
    { name: "**Commands**", value: "[Required] (Optional)" },
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
      value: "**Manage Channels** Shows the current count in a voice channel. Updates every 5 minutes.",
    },
    {
      name: "/count set [ID]",
      value: "**Admininstrator Only** Set the server's count",
    },
  )
  .setFooter({text: "Page 1/2"});

const page2 = new EmbedBuilder()
  .setColor("#0099ff")
  .setTitle("Help")
  .addFields(
    { name: "**Commands**", value: "[Required] (Optional)" },
    {
      name: "/count reset [ID]",
      value: "**Count Owner Only** Set a count to 0",
    },
    { name: "/user", value: "Gives information on a user" },
    { name: "/avatar (user)", value: "Gives a users avatar" },
    { name: "/server", value: "Gives information on the server" }
  )
  .setFooter({text: "Page 2/2"});

// const page3 = new EmbedBuilder()
// .setColor("#0099ff")
// .setTitle("Help")
// .addFields(
//   { name: "**Commands**", value: "[Required] (Optional)" },
//   { name: "/count create [name]", value: "Create a Count" },
//   { name: "/count list [user]", value: "Lists a users counts & IDs" },
//   {
//     name: "/count add [amount]",
//     value: "Adds amount to the current server count",
//   },
//   {
//     name: "/count set [ID]",
//     value: "**Admin Only** Set the server count to ID",
//   },
//   {
//     name: "/count reset [ID]",
//     value: "**Count Owner Only** Set a count to 0",
//   }
// );

const pages = [page1, page2];
module.exports = { pages };
