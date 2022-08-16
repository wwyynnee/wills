const Discord = require("discord.js");
const ModeratorBot = require("discord-moderator");
const translate = require("@vitalets/google-translate-api");

module.exports = {
  name: "kick",
  description: "Выгнать участника",
  async run(client, message, args) {
    client.moderator = new ModeratorBot(client);

    const member = message.mentions.members.last() || message.member.id;
    const reason = args.slice(1).join(" ");
    
    if (!message.member.permissions.has("KICK_MEMBERS")) {
      return message.channel.send("У вас нет прав [Выгонять участников]");
    } else if (!member) {
      return message.channel.send("Укажите пользователя");
    } else if (!reason) {
      return message.channel.send("Укажите причину для кика");
    }

    client.moderator.punishments.kick(member, reason, message.author.id).then(data => {
      const kick = new Discord.MessageEmbed()
        .setTitle("Кик")
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
      message.channel.send({ embeds: [kick] })
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