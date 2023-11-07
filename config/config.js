require("dotenv").config()

module.exports = {
    Prefix: process.env.PREFIX,

    Users: {
        OWNERS:  [process.env.ID_OWNER]
    },
    Client: {
        TOKEN: process.env.TOKEN_DISCORD,
        CLIENT_ID: process.env.CLIENT_ID,
        NAME_BOT: process.env.NAME_BOT,
        GUILD_ID: process.env.GUILD_ID
    }
}
