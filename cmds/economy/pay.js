const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: "pay",
  description: "Перевести игровую валюту",
  async run(client, message, args) {
    const members = message.mentions.members.first()

    const balance = await db.get(`balance_${message.guild.id}_${message.author.id}`)

    if (!args[0] || !members) {
      return message.channel.send("Укажите участника")
    } else if (balance < 0 || balance == 0 || null) {
      return message.channel.send("У вас не хватает денег на перевод")
    } else if (!args[1]) {
      return message.channel.send("Укажите кол-во денег")
    } else if (isNaN(args[1])) {
      return message.channel.send("Укажите число")
    } else if (args[1] == 0 || args[1] < 0) {
      return message.channel.send(`Вы не можете перевести меньше 1-ой монеты`)
    } else if (members) {
      db.sub(`balance_${message.guild.id}_${message.author.id}`, parseInt(args[1]))
      db.add(`balance_${message.guild.id}_${members.id}`, parseInt(args[1]))

      const pay = new Discord.MessageEmbed()
        .setColor("#00ffff")
        .setAuthor({
          name: `${message.member.user.username}`,
          iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`
        })
        .addFields(
          {
            name: "Перевод", value: `${members}`, inline: true
          },
          {
            name: "Кол-во", value: `${args[1]} <:coin:1011228817060274236>`, inline: true
          },
        )
      message.channel.send({ embeds: [pay] })
    }
  }
}