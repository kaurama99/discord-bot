const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with BongosBinted!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};