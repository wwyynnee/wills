const Discord = require("discord.js");

module.exports = {
  name: "clear",
  description: "Очистить сообщения",
  async run(client, message, args) {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return message.channel.send("У вас нет прав [Управление сообщениями]");
    } else if (!args) {
      return message.channel.send("Вы не указали сколько сообщений нужно удалить!");
    } else if (isNaN(args)) {
      return message.channel.send("Это не число!");
    } else if (args > 100) {
      return message.channel.send("Вы не можете удалить 100 или более сообщений за раз");
    } else if (args < 1) {
      return message.channel.send("Вы должны ввести число больше чем 1");
    }

    async function __delete() {
      await message.channel.messages.fetch({
        limit: args
      }).then(messages => {
        message.delete()
        message.channel.bulkDelete(messages, true)
        message.channel.send(`Удалено ${args} сообщений!`)
      })
    };
    __delete();
  }
}