const { EmbedBuilder } = require("discord.js")
module.exports = {
    name: 'ping',
    description: 'Pong!!!',
   //owner: true,
   //options: Object[],
   //testOnly: Boolean,
   //deleted: true,
    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply()

        const ping = reply.createdTimestamp - interaction.createdTimestamp
        interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`🏓 **Pong!** Client \`${ping}\`ms. | Websocket: ${client.ws.ping}ms.`)
                    .setColor("Green")
            ]
        })
    }
}