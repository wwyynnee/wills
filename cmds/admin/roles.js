const Discord = require("discord.js");
const ModeratorBot = require("discord-moderator");
const translate = require("@vitalets/google-translate-api");

module.exports = {
  name: "roles",
  description: "Вывести все роли",
  async run(client, message, args) {
    if (!message.member.permissions.has("MANAGE_ROLES")) {
      return message.channel.send("У вас нет прав [Управление ролями]");
    }

    client.moderator.roles.getAll(message.guild).then(data => {
      const roles = new Discord.MessageEmbed()
        .setTitle("Все роли")
        .setColor("BLACK")
        .setDescription(data.map(role => `\`${role.name}\``).join(", "))
      return message.channel.send({
        embeds: [roles]
      })
    }).catch(err => {
      translate(`${err.message}`, {
        from: "en",
        to: "ru"
      }).then(res => {
        return message.channel.send(res.text)
      })
    })
  }
}