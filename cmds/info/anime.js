const Discord = require("discord.js");
const malScraper = require("mal-scraper");
const translate = require("@vitalets/google-translate-api");

module.exports = {
  name: "anime",
  description: "Найти информацию об каком-либо аниме",
  async run(client, message, args) {
    const res = await translate(`${args}`, { to: "en" });
    const search = `${args}`

    if (!search) {
      return message.channel.send("Введите название аниме")
    }

    malScraper.getInfoFromName(res.text).then((data) => {
      const anime = new Discord.MessageEmbed()
        .setAuthor({ name: `Результаты поиска ${res.text}`.split(",").join(" ") })
        .setThumbnail(data.picture)
        .setColor("#00ff00")
        .addFields(
          {
            name: "Английское название:", value: data.englishTitle
          },
          {
            name: "Японское название:", value: data.japaneseTitle
          },
          {
            name: "Тип:", value: data.type
          },
          {
            name: "Эпизодов:", value: data.episodes
          },
          {
            name: "Рейтинг:", value: data.rating
          },
          {
            name: "Эфир:", value: data.aired
          },
          {
            name: "Оценка:", value: data.score
          },
          {
            name: "Очков:", value: data.scoreStats
          },
          {
            name: "Ссылка:", value: data.url
          },
        )
        .setFooter({
          text: `${client.user.tag}`
        })
        .setTimestamp()
      message.channel.send({
        embeds: [anime]
      })
    })
  }
}