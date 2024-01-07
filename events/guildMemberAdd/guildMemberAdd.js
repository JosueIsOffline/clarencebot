const { EmbedBuilder, WebhookClient } = require('discord.js')
const { User } = require('../../models')
require("dotenv").config()

const webhook = new WebhookClient({
    url: process.env.WEBHOOK_LOGS_CHANNEL
})

module.exports = async (client, member) => {
    
    const embed = new EmbedBuilder()
        .setTitle(`¡Bienvenido a ${member.guild.name}!`)
        .setDescription(`Klok ${member.user.username} (Aun no me acostumbro a ser un dominicano XD, lo hice bien? Jiji)`)
        .setThumbnail(member.user.displayAvatarURL())
        .setImage("https://i.pinimg.com/originals/f0/38/37/f03837e4f1b07f72bff8ee592a91adef.gif")
        .setColor("#09a80c")
        .setTimestamp()
        .setFooter({
            text: process.env.NAME_BOT,
            iconURL: client.user.displayAvatarURL()
        })
        
    client.channels.cache.get(process.env.GENERAL_CHANNEL_ID).send({ embeds: [embed] })
    

    try {
        let userDB = await User.findOne({
            where: {
                id: member.user.id
            }
        })
    
        if(!userDB){
            userDB = await User.create({
                id: member.user.id,
                user: member.user.tag,
                discriminator: member.user.discriminator,
            })
        }
    } catch (error) {
        console.error(error)
    }

    

    const hiEmbed = new EmbedBuilder()
        .setAuthor({
            name: `${member.user.username} ha entrado al servidor!`,
            iconURL: member.user.displayAvatarURL({ dynamic: true })
        })
        .setFooter({
            text: `${process.env.NAME_BOT}`,
            iconURL: client.user.displayAvatarURL()
        })
        .setTimestamp()
        .setColor("#09a80c")

    return webhook.send({ embeds: [hiEmbed] })
   
}