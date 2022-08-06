const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Посмотреть аватар пользователя",
  async run(client, message) {
    let user = message.author
    if (message.mentions.members.size >= 1) {
      user = message.mentions.members.first().user
    }

    const avatar = new Discord.MessageEmbed()
      .setColor("#00ff00")
      .setTitle(`Аватар пользователя \n${user.username}`)
      .setImage(user.displayAvatarURL({ dynamic: true }))
    message.channel.send({
      embeds: [avatar]
    });
  }
}