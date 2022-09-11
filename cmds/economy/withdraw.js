const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: "withdraw",
  description: "Посмотреть баланс",
  async run(client, message, args) {
    const members = message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;
    const balance = await db.get(`balance_${message.guild.id}_${message.author.id}`)
    const bank = await db.get(`invest_${message.guild.id}_${message.author.id}`)

    if (!args[0]) {
      return message.channel.send("Укажите кол-во монет")
    } else if (isNaN(args[0])) {
      return message.channel.send("Введите число")
    } else if (args[0] == 0 || args[0] < 0) {
      return message.channel.send("Вы не можете вложить меньше 1-ой монеты")
    } else if (balance < 0 || balance == 0 || null) {
      return message.channel.send("У вас не хватает денег на снятие")
    }

    await db.add(`balance_${message.guild.id}_${members.id}`, parseInt(args[0]))
    await db.sub(`invest_${message.guild.id}_${members.id}`, parseInt(args[0]))
    
    db.get(`balance_${message.guild.id}_${message.author.id}`).then(money => {
      const withdraw = new Discord.MessageEmbed()
        .setTitle(`${members.user.username}`)
        .setColor("#00ffff")
        .addFields(
          {
            name: "Снято", value: `${args[0]} <:coin:1011228817060274236>`.replace(null, 0), inline: true
          },
          {
            name: "Баланс", value: `${money} <:coin:1011228817060274236>`.replace(null, 0), inline: true
          },
          {
            name: "В банке", value: `${bank} <:coin:1011228817060274236>`.replace(null, 0), inline: true
          },
        )
      return message.channel.send({ embeds: [withdraw] })
    })
  }
}