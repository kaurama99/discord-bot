const { Client, Intents, DiscordAPIError } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
require('dotenv').config()
const fs = require('fs');

const prefix = process.env.PREFIX;

//status logging 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on('error', (e) => console.error(e));
client.on('warning', (e) => console.warn(e));

//client.on('debug', (e) => console.info(e)); //only toggle this for advanced debug

//commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
});

client.login(process.env.TOKEN);