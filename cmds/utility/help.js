const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "Просмотр команд бота",
  async run(client, message) {
    const embed = new Discord.MessageEmbed()
      .setTitle(`Вот список моих команд`)
      .setColor("BLUE")
      .addFields(
        {
          name: "Экономика", value: `
          \`w.work\` › Заработать валюту
          \`w.balance\` › Посмотреть баланс
          \`w.invest\` › Положить валюту в банк
          \`w.withdraw\` › Вывести валюту с банка
          \`w.crime\` › Устроить преступление против кого-то
          \`w.pay\` › Перевести валюту кому-то`
        },
        {
          name: "Развлечения", value: `
          \`w.8ball\` › Магический шар
          \`w.coins\` › Орёл-решка
          \`w.cat\` › Случайные фотографии с котами
          \`w.dog\` › Случайные фотографии с собаками
          \`w.fox\` › Случайные фотографии с лисами`
        },
        {
          name: "Модификация изображений", value: `
          \`w.avatar\` › Посмотреть аватарку участника
          \`w.minecraft\` › Майнкрафт достижение`
        },
        {
          name: "Информация", value: `
          \`w.anime\` › О любом аниме
          \`w.bot-info\` › Обо мне
          \`w.server-info\` › О сервере
          \`w.channel-info\` › О канале`
        },
      )
      .setFooter({ text: `Данный список будет расширяться, пока что бот в разработке` });
    message.channel.send({
      embeds: [embed]
    })
  }
}