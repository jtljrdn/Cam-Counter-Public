
function updateStatus(client) {
  const StatusList = [
    "Need help? /help",
    "Found a bug? Use /bug to report it!",
    "Join the support server: /invite",
    "New Features Added Frequently!",
    "Use /invite to invite me to your server!",
    "Role commands added!",
    "Use /fn itemshop to see the item shop!",
    "Now with Fortnite commands!",
    `Now In ${client.guilds.cache.size} Servers!`,
  ];
  const random = Math.floor(Math.random() * StatusList.length);
  client.user.setActivity(StatusList[random]);
  setInterval(() => {
    const random = Math.floor(Math.random() * StatusList.length);
    client.user.setActivity(StatusList[random]);
  }, 1000 * 60 * 5);
}

module.exports = updateStatus;
