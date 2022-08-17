const Discord = require("discord.js");

module.exports = {
  name: "eval",
  description: "",
  async run(client, message, args) {
    try {
      if (message.author.id != "980103023034527865") return;
      eval(args.join(" "))
      message.delete()
    } catch (err) {
      const error = new Discord.MessageEmbed()
        .setTitle("Ошибка")
        .setColor("RED")
        .setDescription(`\`\`\`js\n${err}\n\`\`\``)
      message.channel.send({ embeds: [error] })
    }
  }
}