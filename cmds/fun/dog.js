const Discord = require("discord.js");
const translate = require("@vitalets/google-translate-api");
const axios = require("axios");

module.exports = {
  name: "dog",
  description: "Случайные картинки с собаками",
  async run(client, message, args) {
    const url = "https://some-random-api.ml/img/dog"
    const facts = "https://some-random-api.ml/facts/dog"
    
    let image, response, fact, responses
    
    try {
      response = await axios.get(url)
      image = response.data
      responses = await axios.get(facts)
      fact = responses.data
    } catch (err) {
      const error = new Discord.MessageEmbed()
        .setTitle("Ошибка")
        .setColor("RED")
        .setDescription(`\`\`\`js\n${err}\n\`\`\``)
      message.channel.send({ embeds: [error] })
    }

    translate(`${fact.fact}`, { to: "ru" }).then(res => {
      const dog = new Discord.MessageEmbed()
        .setTitle("Случайные собачки UwU")
        .setColor("WHITE")
        .setURL(image.link)
        .setDescription(`${res.text}`)
        .setImage(image.link)
      message.channel.send({ embeds: [dog] })
    })
  }
}