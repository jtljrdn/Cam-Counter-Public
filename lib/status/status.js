const { ActivityType } = require("discord.js");

function updateStatus(client) {
  const StatusList = [
    { name: "/help | /invite", type: ActivityType.Watching },
    { name: "Use /bug to help squash bugs", type: ActivityType.Playing },
    { name: "New Features Added Frequently!", type: ActivityType.Playing },
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
    { name: `Polls added!`, type: ActivityType.Playing },
  ];
  client.user.setActivity(StatusList[0]);
  setInterval(() => {
    const random = Math.floor(Math.random() * StatusList.length);
    client.user.setActivity(StatusList[random]);
  }, 1000 * 60 * 5);
}

module.exports = updateStatus;
