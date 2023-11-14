const { ActivityType, EmbedBuilder, WebhookClient } = require("discord.js")
require("dotenv").config();

 const webhook = new WebhookClient({
    url: process.env.WEBHOOK_LOGS_CHANNEL
}) 

module.exports = (client) => {
    let membersCount = client.guilds.cache
    .map((guild) => guild.memberCount)
    .reduce((a, b) => a + b, 0);

    const pickPresence = async () => {
        const statusArray = [
            // {
            //     name: `Achant | /help`,
            //     type: ActivityType.Playing,
            //     status: "online",
            // },
            // {
            //     name: `Double Dragon | /help`,
            //     type: ActivityType.Playing,
            //     status: "online",
            // },
            // {
            //     name: `Golden Axe | /help`,
            //     type: ActivityType.Playing,
            //     status: "dnd",
            // },
            // {
            //     name: `El Fary | /help`,
            //     type: ActivityType.Listening,
            //     status: "online",
            // },
            // {
            //     name: `Gat y Gos | /help`,
            //     type: ActivityType.Watching,
            //     status: "idle",
            // },
            // {
            //     name: `Vaca y Pollo | /help`,
            //     type: ActivityType.Watching,
            //     status: "online",
            // },
            {
                name: `${membersCount} usuarios 👀`,
                type: ActivityType.Watching,
                status: "online"
            },
            {
                name: `a ${membersCount} usuarios 🎧`,
                type: ActivityType.Listening,
                status: "online"
            }
        ]

        const option = Math.floor(Math.random() * statusArray.length)

        try {
            await client.user.setPresence({
                activities: [
                    {
                        name: statusArray[option].name,
                        type: statusArray[option].type
                    }
                ],
                status: statusArray[option].status
            })
        } catch (e) {
            client.logger.log(e, "error")
        }
    }

    setInterval(pickPresence, 60 * 1000)
    

    // Verifica si hay al menos una actividad antes de intentar acceder a la propiedad 'name'
    const activity = client.user.presence.activities[0];
    const activityName = activity ? activity.name : "Ninguna actividad";


    const embed = new EmbedBuilder()
        .setTitle("Bot")
        .setDescription(`🟢 <@${client.user.id}> Online`)
        .addFields(
            {
                name: `Estado:`,
                value: `${client.user.presence.status}`,
                inline: false
            },
            {
                name: `Actividad:`,
                value: `${activityName}`,
                inline: false
            },
            {
                name: `ID:`,
                value: `${client.user.id}`,
                inline: false
            },
            {
                name: `Fecha de conexion:`,
                value: `${new Date().toLocaleDateString("es-DO", {
                    timeZone: "America/Santo_Domingo"
                })}`
            }
        )
        .setColor("#059f03")
        .setTimestamp()
        .setFooter({ text: "Logs" })

         webhook.send({ embeds: [embed] })

        client.logger.log(`
            

        ▄████▄   ██▓    ▄▄▄       ██▀███  ▓█████  ███▄    █  ▄████▄  ▓█████  ▄▄▄▄    ▒█████  ▄▄▄█████▓
        ▒██▀ ▀█  ▓██▒   ▒████▄    ▓██ ▒ ██▒▓█   ▀  ██ ▀█   █ ▒██▀ ▀█  ▓█   ▀ ▓█████▄ ▒██▒  ██▒▓  ██▒ ▓▒
        ▒▓█    ▄ ▒██░   ▒██  ▀█▄  ▓██ ░▄█ ▒▒███   ▓██  ▀█ ██▒▒▓█    ▄ ▒███   ▒██▒ ▄██▒██░  ██▒▒ ▓██░ ▒░
        ▒▓▓▄ ▄██▒▒██░   ░██▄▄▄▄██ ▒██▀▀█▄  ▒▓█  ▄ ▓██▒  ▐▌██▒▒▓▓▄ ▄██▒▒▓█  ▄ ▒██░█▀  ▒██   ██░░ ▓██▓ ░ 
        ▒ ▓███▀ ░░██████▒▓█   ▓██▒░██▓ ▒██▒░▒████▒▒██░   ▓██░▒ ▓███▀ ░░▒████▒░▓█  ▀█▓░ ████▓▒░  ▒██▒ ░ 
        ░ ░▒ ▒  ░░ ▒░▓  ░▒▒   ▓▒█░░ ▒▓ ░▒▓░░░ ▒░ ░░ ▒░   ▒ ▒ ░ ░▒ ▒  ░░░ ▒░ ░░▒▓███▀▒░ ▒░▒░▒░   ▒ ░░   
          ░  ▒   ░ ░ ▒  ░ ▒   ▒▒ ░  ░▒ ░ ▒░ ░ ░  ░░ ░░   ░ ▒░  ░  ▒    ░ ░  ░▒░▒   ░   ░ ▒ ▒░     ░    
        ░          ░ ░    ░   ▒     ░░   ░    ░      ░   ░ ░ ░           ░    ░    ░ ░ ░ ░ ▒    ░      
        ░ ░          ░  ░     ░  ░   ░        ░  ░         ░ ░ ░         ░  ░ ░          ░ ░           
        ░                                                    ░                     ░                   
                             Bot conectado como ${client.user.tag}! (${new Date().toLocaleTimeString("es-DO", {timeZone: "America/Santo_Domingo"})})`
        , "success")
}