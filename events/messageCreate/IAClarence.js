const Axios = require('axios')
const { OpenAI } = require('openai')
require('dotenv').config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_TOKEN
})

module.exports = async (client, message) => {
    const mention = `<@${client.user.id}>`

    if (message.author.bot) return



    if (message.content.startsWith(mention)) {
        try {
            const thinkingMessage = await message.reply("Estoy pesnando amiguito...")
            const res = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        // name: 'Clarence',
                        role: 'system',
                        content: 'Chat GPT is awesome'
                    },
                    {
                        role: 'user',
                        content: `${message.content}`
                    }
                ]
            })

            // Verifica si hay respuestas en la propiedad 'choices' antes de intentar acceder a ella
            if (res.choices && res.choices[0] && res.choices[0].message && res.choices[0].message.content) {
                thinkingMessage.edit(res.choices[0].message.content)
            } else {
                client.logger.log('Respuesta inesperada de OpenAI', 'error')
            }
        } catch (e) {
            client.logger.log(e, 'error')
        }
    }
}