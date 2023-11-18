const { devs, guildId } = require('../../conf/config.json')
const getLocalCommands = require('../../utils/getLocalCommands')

module.exports = async (client, interaction) => {
    if(!interaction.isChatInputCommand()) return 

    const localCommands = getLocalCommands()

    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        )

        if(!commandObject) return 

        if(commandObject.owner){
            if(!devs.includes(interaction.member.id)){
                interaction.reply({
                    content: 'Only developers are allowed to run this command.',
                    ephemeral: true
                })
                return
            }
        }

        if(commandObject.testOnly){
            if(!interaction.guild.id === guildId){
                interaction.reply({
                    content: 'This command cannot be ran here.',
                    ephemeral: true
                })
                return
            }
        }
        if(commandObject.permissionsRequired?.length){
            for(const permission of commandObject.permissionsRequired){
                if(!interaction.member.permissions.has(permission)){
                    interaction.reply({
                        content: `You need the ${permission} permission or higher to use this command`,
                        ephemeral: true,
                    })
                    return
                }
            }
        }

        if(commandObject.botPermissions?.length){
            for(const permission of commandObject.botPermissions){
                const bot = interaction.guild.members.me

                if(!bot.permissions.has(permission)){
                    interaction.reply({
                        content: "I don't have enough permissions.",
                        ephemeral: true
                    })
                    return
                }
            }
        }

        await commandObject.callback(client, interaction)
    } catch (e) {
        console.error(e)
    }
}