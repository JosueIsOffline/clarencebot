const { EmbedBuilder, codeBlock, PermissionFlagsBits } = require("discord.js")

module.exports = {
    name: "info",
    description: "Get a command's information.",
    usage: "info [command]",
    permissionRequired: [PermissionFlagsBits.Administrator],
    owner: false,
    callback: async (client, interaction) => {
        if(!interaction[0]){
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription("Please provide a command name.")
                        .setColor("Red")
                ]
            })
        }
            

        const command = client.prefix_commands.get(interaction[0].toLowerCase())

        if(!command){
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription("Sorry, but that command doesn't  exists.")
                        .setColor("Red")
                ]
            })
        }

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Command Information: ${command.config.name.toUpperCase()}`)
                    .addFields(
                        {
                            name: "Description:",
                            value: command.config.description || "No Description was provided."
                        },
                        {
                            name: "Usage:",
                            value: command.config.usage
                                ? codeBlock("txt", command.config.usage)
                                : "No Usage was provided."
                        },
                        { name: "Permissions:", value: command.permissions.join(", ") },
                        { name: "Developer only?", value: command.owner ? "Yes" : "No" }
                    )
                    .setColor("Blue")
            ]
        })
    }
}