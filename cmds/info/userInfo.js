const Discord = require("discord.js");

module.exports = {
  name: "user-info",
  description: "Информация о пользователе",
  async run(client, message) {
    const userInfo = new Discord.MessageEmbed()
      .setTitle(`Информация о ${message.member.displayName}#${message.member.user.discriminator}`)
      .setThumbnail(message.member.displayAvatarURL())
      .setColor("#ff00ff")
      .addFields(
        {
          name: "Никнейм:", value: `${message.member.displayName}`, inline: true
        },
        {
          name: "Роли:", value: `${Array.from(message.member.roles.cache.mapValues(roles => roles.name).values()).join(", ") || "Отсутствуют"}`, inline: true
        },
        {
          name: "Дата входа на сервер:", value: `${message.member.joinedAt}`, inline: true
        },
        {
          name: "Статус:", value: `${message.member.presence ? message.member.presence.status : "offline"}`, inline: true
        },
      )
      .setFooter({
        text: `🆔: ${message.member.id} | Аккаунт создан:`
      })
      .setTimestamp(`${message.member.user.createdAt}`)
    return message.channel.send({
      embeds: [userInfo]
    });
  }
}