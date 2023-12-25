# Cam Counter

[Invite](https://discord.com/api/oauth2/authorize?client_id=1186507379173503137&permissions=1494698011670&scope=bot+applications.commands)

Small Multi-Purpose Discord bot that is fully open-source and in active development

## Details/Stack

* Discord.js
* MongoDB
* Hosted with [Bot-Hosting.net](https://bot-hosting.net/?aff=119662538781753344)

## Installation/Usage

1. Clone git repo
```sh
git clone https://github.com/jtljrdn/Cam-Counter-Public
```

2. Install Node.js if you haven't already

3. Run 
```sh
npm install
```

4. Create a [Discord Application](https://discord.com/developers/applications?new_application=true) 

5. Configure Application Name/Profile Picture/Description

6. Create OAuth2 URL with permissions `applications.command, bot`

7. Configure bot permissions `Send Messages, Manage Messages, Read Messages/View Channels`

8. Take generated URL and paste into your browser to create the bot invite. Add to your desired server

9. Go to [MongoDB](https://www.mongodb.com/atlas) and create a free `M0` database. Copy the connection URL with password.

10. Rename your local `.env.template` file to `.env` and paste in environment variables from Discord and MongoDB

11. Run 
```sh
npm start
```

## TODO

* ~~Change DB system to MongoDB~~
* ~~Add multiple count support via ID setting~~
* ~~Add commands to set the current count ID (Allowing for multiple counts)~~
* Passwords on counts? (Or some other way to make server-specific)
* Change real-time count preview from the status to a locked voice-channel.

## Contributions

If you want to contribute a feature or bug fix you found, fork the repo and send a PR!

If you find a bug or want a new feature, report it under issues.

If you need any help getting it setup, reach out to me on [Discord](https://discord.gg/bDwKqSreue)
