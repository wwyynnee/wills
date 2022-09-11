const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: "invest",
  description: "Положить деньги в банк",
  async run(client, message, args) {
    const balance = await db.get(`balance_${message.guild.id}_${message.author.id}`)
    const bank = await db.get(`invest_${message.guild.id}_${message.author.id}`)

    if (!args[0]) {
      return message.channel.send("Укажите кол-во монет")
    } else if (isNaN(args[0])) {
      return message.channel.send("Укажите число монет")
    } else if (args[0] == 0 || args[0] < 0) {
      return message.channel.send("Вы не можете вложить меньше 1-ой монеты")
    } else if (balance < 0 || balance == 0 || null) {
      db.get(`balance_${message.guild.id}_${message.author.id}`).then(money => {
        return message.channel.send(`У вас не хватает денег на вложение\nВаш баланс - ${money}$`)
      })
    }

    await db.sub(`balance_${message.guild.id}_${message.author.id}`, parseInt(args[0]))
    await db.add(`invest_${message.guild.id}_${message.author.id}`, parseInt(args[0]))
    
    db.get(`balance_${message.guild.id}_${message.author.id}`).then(money => {
      const invest = new Discord.MessageEmbed()
        .setColor("#00ffff")
        .setAuthor({
          name: `${message.member.user.username}`,
          iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`
        })
        .addFields(
          {
            name: "Вложено", value: `${args[0]} <:coin:1011228817060274236>`, inline: true
          },
          {
            name: "Баланс", value: `${money} <:coin:1011228817060274236>`.replace(null, 0), inline: true
          },
        )
      message.channel.send({ embeds: [invest] })
    })
  }
}