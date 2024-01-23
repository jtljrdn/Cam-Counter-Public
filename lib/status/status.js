const { ActivityType } = require("discord.js");

function updateStatus(client) {
  const StatusList = [
    { name: "/help | cambot.xyz", type: ActivityType.Watching },
    { name: "Now with Fortnite Commands! | cambot.xyz", type: ActivityType.Watching },
    { name: "/invite to add me! | cambot.xyz", type: ActivityType.Watching },
    { name: "Polls added! | cambot.xyz", type: ActivityType.Watching },
    { name: "/vote to support us! | cambot.xyz", type: ActivityType.Watching },
    { name: "NEW Games Added! | cambot.xyz", type: ActivityType.Watching },
    { name: "Game searching added | cambot.xyz", type: ActivityType.Watching },
    
  ];
  client.user.setActivity(StatusList[0]);
  setInterval(() => {
    const random = Math.floor(Math.random() * StatusList.length);
    client.user.setActivity(StatusList[random]);
  }, 1000 * 60 * 5);
}

module.exports = updateStatus;
