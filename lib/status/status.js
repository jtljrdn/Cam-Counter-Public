const { ActivityType } = require("discord.js");

function updateStatus(client) {
  const StatusList = [
    { name: "/help", type: ActivityType.Listening },
    { name: "Found a bug? Use /bug to report it!", type: ActivityType.Playing },
    { name: "Join the support server: /invite", type: ActivityType.Playing },
    { name: "New Features Added Frequently!", type: ActivityType.Playing },
    {
      name: "Use /invite to invite me to your server!",
      type: ActivityType.Playing,
    },
    { name: "Role commands added!", type: ActivityType.Playing },
    {
      name: "Use /fn itemshop to see the item shop!",
      type: ActivityType.Playing,
    },
    { name: "Now with Fortnite commands!", type: ActivityType.Playing },
    {
      name: `${client.guilds.cache.size} Guilds!`,
      type: ActivityType.Watching,
    },
    { name: `Use /vote to support us!`, type: ActivityType.Playing },
  ];
  const random = Math.floor(Math.random() * StatusList.length);
  client.user.setActivity(StatusList[random]);
  setInterval(() => {
    const random = Math.floor(Math.random() * StatusList.length);
    client.user.setActivity(StatusList[random]);
  }, 1000 * 60 * 5);
}

module.exports = updateStatus;
