const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')
const { EmbedBuilder } = require("discord.js")
const nodemailer = require("nodemailer")
require("dotenv").config()

module.exports = {
	name: 'email',
	description: 'Send a email.',
	// owner: true,
	// testOnly: Boolean,
	 options: [
        {
            name: 'destinatario',
            description: 'Destinatario del email.',
            required: true, 
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'asunto',
            description: 'Asunto del email.',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'contenido',
            description: 'Contenido del email.',
            type: ApplicationCommandOptionType.String,
            required: true
        }
     ],
     permissionRequired: [PermissionFlagsBits.Administrator],
    //  botPermissions: [PermissionFlagsBits.Administrator],

	callback: (client, interaction) => {
		if(interaction.user.id !== process.env.ID_OWNER){
            interaction.reply({
                ephemeral: true,
                embeds: [
                    new EmbedBuilder()
                        .setDescription("⛔ No tienes permisos para enviar emails.")
                        .setColor("#EA3939")
                ]
            })
            return
        }

        const destinatario = interaction.options.get("destinatario").value
        const asunto = interaction.options.get("asunto").value
        const contenido = interaction.options.get("contenido").value

        const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        if(validEmail.test(destinatario)){
            var transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.GMAIL_KEY
                },
                tls: {
                    rejectUnauthorized: false
                }
            })

            transporter.verify().then(() => {
                console.log('Ready for send emails')
            })

            var mailOptions = {
                from: process.env.EMAIL,
                to: destinatario,
                subject: asunto,
                text: contenido
            }

            transporter.sendMail(mailOptions, async (error, info) => {
                if(error){
                    console.log(error)
                }
                else{
                    client.logger.log(`Email sent: ${info.response}`, "success")
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle('✅ Email enviado')
                                .addFields([
                                    { 
                                        name: 'Destinatario', 
                                        value: destinatario,
                                        inline: true
                                    },
                                    {
                                        name: 'Asunto', 
                                        value: asunto,
                                        inline: true
                                    },
                                    {
                                        name: 'Contenido', 
                                        value: contenido
                                    }
                                ])
                                .setColor("#059f03")
                                .setTimestamp()
                                .setFooter({
                                    text: process.env.NAME_BOT,
                                    iconURL: client.user.displayAvatarURL()
                                })
                        ],
                        ephemeral: true
                    })
                }
            })
        }
        else{
            interaction.reply({
               
                embeds: [
                    new EmbedBuilder()
                        .setDescription("❌ Introduce un email valido.")
                        .setColor("#EA3939")
                ],
                ephemeral: true,
            })
            return
        }
	}
};