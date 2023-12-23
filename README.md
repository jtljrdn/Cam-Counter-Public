# Cam Counter

Silly Discord bot to provide a count for how many times my friend Cameron doesn't join Discord VC when he said he would.

Mainly using this as a way to test features for Discord bots. Will most likely just become a general purpose/utility bot. 

## Details/Stack

* Discord.js
* MongoDB
* Hosted with [Bot-Hosting.net](https://bot-hosting.net)

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

9. Rename your local `.env.template` file to `.env` and fill in environment variables

10. Run 
```sh
npm start
```

## TODO

* Change DB system to MongoDB
* Add multiple count support via ID setting
* Add commands to set the current count ID (Allowing for multiple counts)
* Passwords on counts? (Or some other way to make server-specific)
* Change real-time count preview from the status to a locked voice-channel.

## Contributions

If you want to contribute a feature or bug fix you found, fork the repo and send a PR!

If you find a bug or want a new feature, report it under issues.

If you need any help getting it setup, reach out to me on discord @.bung or on twitter @jtljrdn!
