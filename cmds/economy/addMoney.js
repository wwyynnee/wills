const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: "add-money",
  description: "Добавить деньги",
  async run(client, message, args) {
    const permissions = message.member.permissions.has("ADMINISTRATOR")

    const members = message.mentions.members.first()

    if (!permissions) {
      return message.channel.send("У вас нет прав на это действие")
    } else if (members) {
      return message.channel.send("Вы не указали участника")
    } else if (!args[1]) {
      return message.channel.send("Укажите кол-во монет")
    } else if (isNaN(args[1])) {
      return message.channel.send("Укажите число монет")
    } else if (args[0] == 0 || args[0] < 0) {
      return message.channel.send("Вы не можете указать меньше 1-ой монеты")
    } else if (args[0] > 10000) {
      return message.channel.send("Нельзя добавить слишком много монет")
    }

    await db.add(`balance_${message.guild.id}_${members.id}`, parseInt(args[1]))

    message.channel.send(`Вы успешно добавили у ${members} ${args[1]} <:coin:1011228817060274236>`)
  }
}