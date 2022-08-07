const Discord = require("discord.js");
const ModeratorBot = require("discord-moderator");
const translate = require("@vitalets/google-translate-api");

module.exports = {
  name: "warn",
  description: "Выдать предупреждение",
  async run(client, message, args) {
    client.moderator = new ModeratorBot(client);

    const member = message.mentions.members.last() || message.member.id;
    const reason = args.slice(1).join(" ");

    if (!message.member.permissions.has("BAN_MEMBERS") || !message.member.permissions.has("KICK_MEMBERS")) {
      return message.channel.send("У вас нет прав [Банить или Кикать]");
    } else if (!member) {
      return message.channel.send("Укажите пользователя");
    } else if (!reason) {
      return message.channel.send("Укажите причину для предупреждения");
    }

    client.moderator.warns.add(member, message.channel, reason, message.author.id, "999999999999999999").then(data => {
      const warn = new Discord.MessageEmbed()
        .setTitle("Предупреждение")
        .setColor("BLACK")
        .addFields(
          {
            name: "Выдал:", value: `${message.author}`
          },
          {
            name: "Нарушитель:", value: `${member}`
          },
          {
            name: "Причина:", value: `${reason}`
          },
        )
        .setTimestamp()
      return message.channel.send({
        embeds: [warn]
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