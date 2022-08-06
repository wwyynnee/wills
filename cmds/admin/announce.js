const Discord = require("discord.js");

module.exports = {
  name: "announce",
  description: "Создать объявление",
  async run(client, message, args) {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return message.channel.send("У вас нет прав [Управление сообщениями]");
    } else if (!args[0]) {
      return message.channel.send("Введите объявление")
    }

    const announce = new Discord.MessageEmbed()
      .setTitle("Объявление")
      .setDescription(args.join(" "))
      .setColor("#00ff00")
      .setFooter({ text: `Объявлено: ${message.author.tag}` })
      .setTimestamp()
    message.delete()
    message.channel.send({
      embeds: [announce]
    })
  }
}