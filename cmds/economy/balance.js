const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: "balance",
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

    if (balance == null) {
      db.set(`balance_${message.guild.id}_${message.author.id}`, 0)
    } else if (bank == null) {
      db.set(`invest_${message.guild.id}_${message.author.id}`, 0)
    }

    if (!members) {
      db.get(`balance_${message.guild.id}_${message.author.id}`).then(money => {
        const balanceEmbed = new Discord.MessageEmbed()
          .setTitle(`${members.user.username}`)
          .setColor("#00ffff")
          .addFields(
            {
              name: "Баланс", value: `${money} <:coin:1011228817060274236>`.replace(null, 0), inline: true
            },
            {
              name: "В банке", value: `${bank} <:coin:1011228817060274236>`.replace(null, 0), inline: true
            },
            {
              name: "Всего", value: `${bank + money} <:coin:1011228817060274236>`, inline: true
            },
          )
        return message.channel.send({ embeds: [balanceEmbed] })
      })
    } else if (members) {
      db.get(`balance_${message.guild.id}_${members.id}`).then(money => {
        const balanceEmbed = new Discord.MessageEmbed()
          .setTitle(`${members.user.username}`)
          .setColor("#00ffff")
          .addFields(
            {
              name: "Баланс", value: `${money} <:coin:1011228817060274236>`.replace(null, 0), inline: true
            },
            {
              name: "В банке", value: `${bank} <:coin:1011228817060274236>`.replace(null, 0), inline: true
            },
            {
              name: "Всего", value: `${bank + money} <:coin:1011228817060274236>`, inline: true
            },
          )
        return message.channel.send({ embeds: [balanceEmbed] })
      })
    }
  }
}