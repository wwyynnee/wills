const Discord = require("discord.js");
const ms = require("ms");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: "work",
  description: "Заработать деньги",
  async run(client, message, args) {
    let timeout = 1800000;
    let author = await db.get(`work_${message.guild.id}_${message.author.id}`)

    if (author !== null && timeout - (Date.now() - author) > 0) {
      let time = ms(timeout - (Date.now() - author));

      return message.channel.send("Нельзя повторно использовать команду. Лимит: 30 минут")
    }
    db.set(`work_${message.guild.id}_${message.author.id}`, Date.now())

    const random = Math.floor(Math.random() * 300 + 10)
    const balance = await db.get(`balance_${message.guild.id}_${message.author.id}`)

    await db.add(`balance_${message.guild.id}_${message.author.id}`, parseInt(random))

    db.get(`balance_${message.guild.id}_${message.author.id}`).then(money => {
      const work = new Discord.MessageEmbed()
        .setColor("#00ffff")
        .setAuthor({
          name: `${message.member.user.username}`,
          iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`
        })
        .addFields(
          {
            name: "Заработал", value: `${random} <:coin:1011228817060274236>`, inline: true
          },
          {
            name: "Баланс", value: `${money} <:coin:1011228817060274236>`.replace(null, 0), inline: true
          },
        )
      message.channel.send({ embeds: [work] })
    })
  }
}