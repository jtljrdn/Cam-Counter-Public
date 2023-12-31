
function deploy() {
  const { REST, Routes } = require("discord.js");
  const fs = require("node:fs");
  const path = require("node:path");
  const axios = require("axios").default;
  require("dotenv").config();

  const commands = [];
  // Grab all the command folders from the commands directory you created earlier
  const foldersPath = path.join(__dirname, "commands");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      if ("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
      } else {
        console.log(
          `${Date.now()} | [WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }

  // Construct and prepare an instance of the REST module
  const rest = new REST().setToken(process.env.TOKEN);

  // and deploy your commands!
  (async () => {
    try {
      console.log(
        `${Date.now()} | Started refreshing ${
          commands.length
        } application (/) commands.`
      );

      // The put method is used to fully refresh all commands in the guild with the current set
      const data = await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands }
      );
      const { data: dblResponse } = await axios.post(
        `https://discordbotlist.com/api/v1/bots/1186507379173503137/commands`,
        commands,
        { headers: { Authorization: `Bot ${process.env.DBL_TOKEN}` } }
      );

      console.log(
        `${Date.now()} | Successfully sent ${
          data.length
        } application (/) commands to Discord Bot List.`
      );

      console.log(
        `${Date.now()} | Successfully reloaded ${
          data.length
        } application (/) commands.`
      );
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      console.error(error);
    }
  })();
}

module.exports = deploy;
