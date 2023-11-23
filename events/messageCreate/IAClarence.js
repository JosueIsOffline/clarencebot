const Axios = require("axios");
const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_TOKEN,
});

module.exports = async (client, message) => {
  const mention = `<@${client.user.id}>`;

  if (message.author.bot) return;

  if (message.content.includes(mention)) {
    await message.channel.sendTyping();

    const sendTypingInterval = setInterval(() => {
      message.channel.sendTyping();
    }, 5000);

    try {
      let conversation = [];
      conversation.push({
        role: "system",
        content: "Chat GPT is awesome.",
      });

      let prevMessages = await message.channel.messages.fetch({ limit: 10 });
      prevMessages.reverse();

      prevMessages.forEach((msg) => {
        if (msg.author.bot && msg.author.id !== client.user.id) return;

        const username = msg.author.username
          .replace(/\s+/g, "_")
          .replace(/[^\w\s]/gi, "");

        if (msg.author.id === client.user.id) {
          conversation.push({
            role: "assistant",
            name: username,
            content: msg.content,
          });
        }

        conversation.push({
          role: "user",
          name: username,
          content: msg.content,
        });
      });

      const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: conversation,
      });

      clearInterval(sendTypingInterval);

      if (!res) {
        message.reply(
          "Lo siento, ahora mismo estoy lavando los trastes. Te respondo cuando este este disponible."
        );
      }

      const resMessage = res.choices[0].message.content;
      const chunkSizeLimit = 2000;

      for (let i = 0; i < resMessage.length; i += chunkSizeLimit) {
        const chunk = resMessage.substring(i, i + chunkSizeLimit);

        await message.reply(chunk);
      }

      // Verifica si hay respuestas en la propiedad 'choices' antes de intentar acceder a ella
      // if (res.choices && res.choices[0] && res.choices[0].message && res.choices[0].message.content) {
      //     message.reply(res.choices[0].message.content)
      // } else {
      //     client.logger.log('Respuesta inesperada de OpenAI', 'error')
      // }
    } catch (e) {
      client.logger.log(e, "error");
    }
  }
};
