const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType,
    Colors,
    PermissionFlagsBits
} = require('discord.js');
const transcript = require('discord-html-transcripts');
const config = require('../../config.json');

module.exports = {
    name: 'interactionCreate',
    once: false,
    execute: async (interaction, client) => {
        if (!interaction.isButton()) return;

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('claim').setLabel(' | Claim').setEmoji('📩').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('close').setLabel(' | Close').setEmoji('🗑').setStyle(ButtonStyle.Danger),
                new ButtonBuilder().setCustomId('transcript').setLabel(' | Transcript').setEmoji('📁').setStyle(ButtonStyle.Primary)
            )


        let category = config.parent;
        let roleStaff = interaction.guild.roles.cache.get(config.roleStaffId);
        let LogChannel = config.logChannel;

        let AlreadyAChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id);
        if (AlreadyAChannel) return interaction.rely({
            content: ":x: | You already have an open ticket on the server",
            ephemeral: true
        });

        if (interaction.customId === "close") {
            let channel = interaction.channel;
            channel.delete()
        } else if (interaction.customId === "claim") {
            interaction.reply({
                embeds: [{
                    description: `Your salon has been taken care of by ${interaction.user}`,
                    footer: {
                        text: "Ticket Support"
                    },
                    color: Colors.Blurple
                }]
            })
        } else if (interaction.customId === "transcript") {
            interaction.reply({
                embeds: [{
                    description: `📁 | The transcript has been completed`,
                    footer: {
                        text: "Ticket Support"
                    },
                    color: Colors.Blurple
                }]
            })

            client.channels.cache.get(config.logChannel).send({
                embeds: [{
                    description: `📁 | Transcript of ${interaction.channel}`,
                    footer: {
                        text: "Ticket Support"
                    },
                    color: Colors.Blurple
                }],
                files: [await transcript.createTranscript(interaction.channel)]
            })
        } else if (interaction.customId === "staff") {
            interaction.guild.channels.create({
                name: `ticket of ${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: config.parent,
                permissionOverwrites: [{
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: roleStaff,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    }
                ]
            }).then((c) => {
                c.send({
                    content: `||${interaction.user}||`,
                    embeds: [{
                        title: "Staff contact ticket",
                        description: "Please detail your request so that a staff can answer you as precisely as possible.",
                        footer: {
                            text: "Ticket Support",
                        },
                        color: Colors.Blurple
                    }],
                    components: [
                        row
                    ]
                })
                interaction.reply({
                    content: `✅ Your ticket has been successfully opened. <#${c.id}>`,
                    ephemeral: true
                })
            })

        } else if (interaction.customId === "answer") {
            interaction.guild.channels.create({
                name: `ticket of ${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: config.parent,
                permissionOverwrites: [{
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: roleStaff,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    }
                ]
            }).then((c) => {
                c.send({
                    content: `||${interaction.user}||`,
                    embeds: [{
                        title: "What is your question",
                        description: "Please detail your request so that a staff can answer you as precisely as possible.",
                        footer: {
                            text: "Ticket Support",
                        },
                        color: Colors.Blurple
                    }],
                    components: [
                        row
                    ]
                })
                interaction.reply({
                    content: `✅ Your ticket has been successfully opened. <#${c.id}>`,
                    ephemeral: true
                })
            })
        } else if (interaction.customId === "other") {
            interaction.guild.channels.create({
                name: `ticket of ${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: config.parent,
                permissionOverwrites: [{
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: roleStaff,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    }
                ]
            }).then((c) => {
                c.send({
                    content: `||${interaction.user}||`,
                    embeds: [{
                        title: "What is your problem ?",
                        description: "Please detail your request so that a staff can answer you as precisely as possible.",
                        footer: {
                            text: "Ticket Support",
                        },
                        color: Colors.Blurple
                    }],
                    components: [
                        row
                    ]
                })
                interaction.reply({
                    content: `✅ Your ticket has been successfully opened. <#${c.id}>`,
                    ephemeral: true
                })
            })
        }
    }
}
