const Discord = require("discord.js");
const ModeratorBot = require("discord-moderator");
const translate = require("@vitalets/google-translate-api");

module.exports = {
  name: "warns",
  description: "Просмотр предупреждений у какого-либо пользователя",
  async run(client, message, args) {
    client.moderator = new ModeratorBot(client);

    const member = message.mentions.members.last() || message.member.id;

    if (!member) {
      return message.channel.send("Укажите пользователя для получения предупреждений");
    }

    client.moderator.warns.getAll(member).then(data => {
      const warns = new Discord.MessageEmbed()
        .setTitle("Просмотр предупреждений")
        .setColor("BLACK")
        .addFields(
          {
            name: "Кол-во предупреждений:", value: `${data.warns}`
          },
        )
        .setTimestamp()
      return message.channel.send({
        embeds: [warns]
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