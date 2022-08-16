const Discord = require("discord.js");
const ModeratorBot = require("discord-moderator");
const translate = require("@vitalets/google-translate-api");

module.exports = {
  name: "del-role",
  description: "Убрать роль участнику",
  async run(client, message, args) {
    client.moderator = new ModeratorBot(client);

    const member = message.mentions.members.last() || message.member.id;
    const role = message.mentions.roles.last() || message.guild.roles.id || args.join(" ");
    const roleAdd = message.mentions.roles.last() || args.slice(1).join(" ");
    
    if (!message.member.permissions.has("MANAGE_ROLES")) {
      return message.channel.send("У вас нет прав [Управление ролями]");
    } else if (!member) {
      return message.channel.send("Укажите пользователя для снятия роли");
    } else if (!role) {
      return message.channel.send("Укажите роль для снятия");
    }

    client.moderator.roles.remove(member, role).then(data => {
      const delRole = new Discord.MessageEmbed()
        .setTitle("Снятие роли")
        .setColor("BLACK")
        .addFields(
          {
            name: "Выполнил:", value: `${message.author}`
          },
          {
            name: "Для пользователя:", value: `${member}`
          },
          {
            name: "Роль:", value: `${role}`
          },
        )
        .setTimestamp()
      return message.channel.send({
        embeds: [delRole]
      });
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