const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "server-info",
  description: "Информация о сервере",
  async run(client, message) {
    const filterLevels = {
      DISABLED: "Выключено",
      MEMBERS_WITHOUT_ROLES: "Без ролей",
      ALL_MEMBERS: "Всех участников"
    };

    const verificationLevels = {
      NONE: "Отсутствует",
      LOW: "Низкий",
      MEDIUM: "Средний",
      HIGH: "(╯°□°）╯︵ ┻━┻",
      VERY_HIGH: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻"
    };

    const regions = {
      brazil: "Бразилия",
      europe: "Европа",
      hongkong: "Гонконг",
      india: "Индия",
      japan: "Япония",
      russia: "Россия",
      singapore: "Сингапур",
      southafrica: "Южная Африка",
      sydeny: "Сидней",
      "us-central": "Центральная Америка",
      "us-east": "Восточная Америка",
      "us-west": "Западная Америка",
      "us-south": "Южная Америка"
    };

    const serverInfo = new Discord.MessageEmbed()
      .setTitle(`Информация о сервере ${message.guild.name}`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setColor("GREEN")
      .addFields(
        /*{
          name: "🌟 Владелец:", value: `${message.guild.owner.user.tag}`
        },*/
        {
          name: "Участники:", value: `Всего: ${message.guild.memberCount}\nПользователей: ${message.guild.members.cache.filter(member => !member.user.bot).size}\nБотов: ${message.guild.members.cache.filter(member => member.user.bot).size}`, inline: true
        },
        /*{
          name: "Статусы:",
          value: `В сети: ${message.member.presence.status === "online".size}\n
            Неактивен: ${message.member.presence.status === "idle".size}\n
            Не беспокоить: ${message.member.presence.status === "dnd".size}\n
            Не в сети: ${message.member.presence.status === "offline".size}`, inline: true
        },*/
        {
          name: "Каналы:", value: `${message.guild.channels.cache.filter(c => c.type == "text").size} текстовых\n${message.guild.channels.cache.filter(c => c.type == "voice").size} голосовых`, inline: true
        },
        {
          name: "Бусты",
          value: `Уровень: ${message.guild.premiumTier ? `${message.guild.premiumTier}` : "Отсутствует"}\nКол-во: ${message.guild.premiumSubscriptionCount || "0"}`,
          inline: true
        },
        {
          name: "Регион:", value: `${regions[message.guild.region]}`, inline: true
        },
        {
          name: "Уровень проверки:", value: `${verificationLevels[message.guild.verificationLevel]}`, inline: true
        },
        {
          name: "Фильтрация медиаконтента:", value: `${filterLevels[message.guild.explicitContentFilter]}`, inline: true
        },
        {
          name: "Ролей:", value: `${message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).length}`, inline: true
        },
        /*{
          name: "Эмодзи:", value: `${message.guild.emojis.cache.size} всего, из них ${emojis.filter(emoji => !emoji.animated).size} обычных и ${emojis.filter(emoji => emoji.animated).size} анимированных`, inline: true
        },*/
      )
      .setFooter({
        text: `🆔: ${message.guild.id} | Сервер создан:`
      })
      .setTimestamp(`${moment(message.guild.createdTimestamp).format("LT")} ${moment(message.guild.createdTimestamp).format("LL")} ${moment(message.guild.createdTimestamp).fromNow()}`)
    message.channel.send({
      embeds: [serverInfo]
    })
  }
}