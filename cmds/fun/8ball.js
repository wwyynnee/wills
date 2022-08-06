const Discord = require("discord.js");

module.exports = {
  name: "8ball",
  description: "Магический шар",
  async run(client, message, args) {
    if (!args[0]) {
      return message.channel.send("Вы не задали вопрос")
    }
    
    let replyes = [
      "Да!",
      "Нет.",
      "Возможно",
      "Я не знаю!",
      "Можешь не сомневаться в этом!",
      "Ну конечно же нет!",
      "Я не уверен спроси позже"
    ]

    let result = replyes[Math.floor(Math.random() * replyes.length)]
    message.channel.send(`${result}`)
  }
}