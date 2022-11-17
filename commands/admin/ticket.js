const {
    ActionRowBuilder,
    ApplicationCommandType,
    ButtonBuilder,
    ButtonStyle,
    Colors,
    PermissionsBitField
} = require('discord.js');

module.exports = {
    name: 'ticket',
    description: '(🔧) Permet d\'envoyer le système de ticket.',
    type: ApplicationCommandType.ChatInput,
    execute: async (client, interaction, args) => {
        
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({
            cotent: `Vous n'avez pas la permissions d'éxécuter cette commande !`
        })

        interaction.channel.send({
            embeds: [{
                title: "Open Ticket",
                description: `**__How Top Open A Ticket :__**\nPlease choose the type of ticket you wish to open.`,
                footer: {
                    text: "Ticket Support"
                },
                color: Colors.Blurple
            }],
            components: [
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder().setCustomId('staff').setLabel(' |Contact the staff').setEmoji('🎓').setStyle(ButtonStyle.Primary),
                    new ButtonBuilder().setCustomId('answer').setLabel(' | Answer a question').setEmoji('⁉').setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder().setCustomId('other').setLabel(' | Other').setEmoji('🔧').setStyle(ButtonStyle.Success)
                )
            ]
        })
    }
}