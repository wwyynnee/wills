const Discord = require("discord.js");

module.exports = {
  name: "invite",
  description: "Пригласить бота на сервер",
  async run(client, message) {
    const embed = new Discord.MessageEmbed()
      .setAuthor({
        name: `Пригласить ${client.user.tag} на сервер!`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setColor("BLUE")
      .setDescription(`Вы можете пригласить меня [здесь](https://discord.com/api/oauth2/authorize?client_id=980377656291913728&permissions=8&scope=bot)`);
    message.channel.send({
      embeds: [embed]
    })
  }
}