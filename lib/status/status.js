const { ActivityType } = require("discord.js");

function updateStatus(client) {
  const StatusList = [
    { name: "/help", type: ActivityType.Listening },
    { name: "Use /bug to help squash bugs", type: ActivityType.Playing },
    { name: "Join the support server: /invite", type: ActivityType.Playing },
    { name: "New Features Added Frequently!", type: ActivityType.Playing },
    {
      name: "Use /invite to invite me to your server!",
      type: ActivityType.Playing,
    },
    { name: "More role commands added!", type: ActivityType.Playing },
    {
      name: "Use /fn to access Fortnite commands!",
      type: ActivityType.Playing,
    },
    { name: "Now with Fortnite commands!", type: ActivityType.Playing },
    {
      name: `${client.guilds.cache.size} Guilds!`,
      type: ActivityType.Watching,
    },
    { name: `/vote to support CamBot`, type: ActivityType.Playing },
    { name: `Consider donating with /vote`, type: ActivityType.Playing },
    {
      name: `Join the Discord to suggest new features /invite`,
      type: ActivityType.Playing,
    },
    { name: `Fully Open-Source!`, type: ActivityType.Playing },
  ];
  const random = Math.floor(Math.random() * StatusList.length);
  client.user.setActivity(StatusList[11]);
  setInterval(() => {
    const random = Math.floor(Math.random() * StatusList.length);
    client.user.setActivity(StatusList[random]);
  }, 1000 * 60 * 5);
}

module.exports = updateStatus;
