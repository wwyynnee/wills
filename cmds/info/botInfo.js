const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "bot-info",
  description: "Информация о боте",
  async run(client, message) {
    const botInfo = new Discord.MessageEmbed()
      .setTitle(`Информация о ${client.user.tag}`)
      .setColor("#ff00ff")
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .addFields(
        {
          name: "Время безотказной работы", value: `${ms(client.uptime)}`
        },
        {
          name: "Пинг веб-сокета", value: `${client.ws.ping}ms`
        },
        {
          name: "Память", value: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`
        },
        {
          name: "Серверов", value: `${client.guilds.cache.size}`
        },
        {
          name: "Пользователей", value: `${client.users.cache.size}`
        },
        {
          name: "Эмодзи", value: `${client.emojis.cache.size}`
        },
        {
          name: "Node", value: `${process.version} в ${process.platform} ${process.arch}`
        },
      )
    message.channel.send({
      embeds: [botInfo]
    })
  }
}