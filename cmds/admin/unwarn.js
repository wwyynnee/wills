const Discord = require("discord.js");
const ModeratorBot = require("discord-moderator");
const translate = require("@vitalets/google-translate-api");

module.exports = {
  name: "unwarn",
  description: "Снять предупреждение",
  async run(client, message, args) {
    client.moderator = new ModeratorBot(client);

    const member = message.mentions.members.last() || message.member.id;
    
    if (!message.member.permissions.has("BAN_MEMBERS") || !message.member.permissions.has("KICK_MEMBERS")) {
      return message.channel.send("У вас нет прав [Банить или Кикать]");
    } else if (!member) {
      return message.channel.send("Укажите пользователя для отмены предупреждения");
    }

    client.moderator.warns.remove(member).then(data => {
      const unwarn = new Discord.MessageEmbed()
        .setTitle("Снятие предупреждения")
        .setColor("BLACK")
        .addFields(
          {
            name: "Убрал:", value: `${message.author}`
          },
          {
            name: "У пользователя:", value: `${member}`
          },
        )
        .setTimestamp()
      return message.channel.send({
        embeds: [unwarn]
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