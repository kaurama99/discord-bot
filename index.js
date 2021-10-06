const { Client, Collection, Intents, DiscordAPIError } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
require('dotenv').config()
const fs = require('fs');

const prefix = process.env.PREFIX;
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

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

	const command = client.commands.get(interaction.commandName);
  if(!command) return;

  try {
    await command.execute(interaction);
  } catch (e) {
    console.error(e);
    return interaction.reply({ content: 'There was an error, death to boogie', ephemeral: true});
  }
});

client.login(process.env.TOKEN);