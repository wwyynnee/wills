const Discord = require("discord.js");

module.exports = {
  name: "say",
  description: "Написать от лица бота",
  async run(client, message, args) {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return message.channel.send("У вас нет прав [Управление сообщениями]");
    } else if (!args[0]) {
      return message.channel.send("Введите текст")
    }
    message.channel.send(args.join(" "))
    message.delete()
  }
}