const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: "crime",
  description: "Своровать у другого игровую валюту",
  async run(client, message, args) {
    let members = message.mentions.users.first()
    
    /*let timeout = 600000;
    let author = await db.add(`balance_${message.guild.id}_${message.author.id}`)

    if (author !== null && timeout - (Date.now() - author) > 0) {
      let time = ms(timeout - (Date.now() - author));

      return message.channel.send("Нельзя повторно использовать команду. Лимит: 10 минут")
    }*/

    const random = Math.floor(Math.random() * 200 + 20)
    const rando = Math.floor(Math.random() * 2)
    if (!members) {
      return message.channel.send("Укажите участника")
    }

    if (rando == 0) {
      db.sub(`balance_${message.guild.id}_${message.author.id}`, parseInt(random))
      db.add(`balance_${message.guild.id}_${members.id}`, parseInt(random))


      const crime = new Discord.MessageEmbed()
        .setColor("#00ffff")
        .setAuthor({
          name: `${message.member.user.username}`,
          iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`
        })
        .addFields(
          {
            name: "Не удалось обократь", value: `${members}`, inline: true
          },
          {
            name: "Штраф", value: `${random} <:coin:1011228817060274236>`, inline: true
          },
        )
      message.channel.send({ embeds: [crime] })
    } else if (rando == 1) {
      db.sub(`balance_${message.guild.id}_${member.id}`, parseInt(random))
      db.add(`balance_${message.guild.id}_${message.author.id}`, parseInt(random))

      db.get(`balance_${message.guild.id}_${message.author.id}`).then(money => {
        const crime = new Discord.MessageEmbed()
          .setColor("#00ffff")
          .setAuthor({
            name: `${message.member.user.username}`,
            iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`
          })
          .addFields(
            {
              name: "Успешно обокрали", value: `${members}`, inline: true
            },
            {
              name: "Пополнение", value: `${random} <:coin:1011228817060274236>`, inline: true
            },
            {
              name: "Баланс", value: `${money} <:coin:1011228817060274236>`, inline: true
            },
          )
        message.channel.send({ embeds: [crime] })
      })
    }
  }
}