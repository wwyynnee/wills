const Discord = require("discord.js");
const ModeratorBot = require("discord-moderator");
const translate = require("@vitalets/google-translate-api");

module.exports = {
  name: "role",
  description: "Информация о какой-либо роли",
  async run(client, message, args) {
    if (!message.member.permissions.has("MANAGE_ROLES")) {
      return message.channel.send("У вас нет прав [Управление ролями]");
    } else if (!role) {
      return message.channel.send("Укажите роль для получения информации");
    }

    client.moderator.roles.get(message.guild, role).then(data => {
      if (!data.status) {
        return message.channel.send("Роль не найдена");
      }

      const role = new Discord.MessageEmbed()
        .setTitle("О роли")
        .setColor("BLACK")
        .addFields(
          {
            name: "Имя:", value: `${data.role.name}`
          },
          {
            name: "Цвет:", value: `${data.role.color}`
          },
          {
            name: "Позиция:", value: `${data.role.position}`
          },
          {
            name: "Упоминания", value: `${data.role.mentionable}`
          },
        )
      return message.channel.send({
        embeds: [role]
      });
    })
  }
}