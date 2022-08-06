const Discord = require("discord.js");
const translate = require("@vitalets/google-translate-api");

module.exports = {
  name: "minecraft",
  description: "Модификация изображений: Получить Minecraft достижение!",
  async run(client, message, args) {
    const argsMinecraft = args.join("+")
    if (!argsMinecraft) {
      return message.channel.send("Введите название достижения")
    }

    const minecraft = new Discord.MessageEmbed()
      .setTitle("Minecraft достижение!")
      .setColor("#00ffff")
      .setImage(`https://minecraftskinstealer.com/achievement/12/Achievement%20Get!/${argsMinecraft}`);
    message.channel.send({
      embeds: [minecraft]
    });
  }
}