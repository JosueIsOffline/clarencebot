const config = require("../../config/config")
const getApplicationsCommands = require("../../utils/getApplicationsCommands")
const getLocalCommands = require("../../utils/getLocalCommands")
const areCommandDifferent = require('../../utils/areCommandDifferent')
module.exports = async (client) => {
   
    try {
         const localCommands = getLocalCommands()
         const applicationCommands = await getApplicationsCommands(client, config.Client.GUILD_ID)

         for(const localCommand of localCommands){
            const {name, description, options } = localCommand;

            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name 
            )

            if(existingCommand){
                if(localCommand.deleted){
                    await applicationCommands.delete(existingCommand.id)
                    client.logger.log(`🗑️ Deleted command ${name}`, 'cmd')
                    continue;
                }

                if(areCommandDifferent(existingCommand, localCommand)){
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    })

                    client.logger.log("🔄 Edited command", "cmd")
                }
            }
            else{
                if(localCommand.deleted){
                    client.logger.log(`⏩ Skipping registering command ${name} as it's set to delete.`)
                    continue;
                }


                await applicationCommands.create({
                    name,
                    description,
                    options
                })
                client.logger.log(`✅ • Loaded Successfully [COMMAND] ${name}`, "success")
            }
         }
    } catch (e) {
        client.logger.log(e, "error")
    }
}