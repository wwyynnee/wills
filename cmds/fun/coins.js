const Discord = require("discord.js");

module.exports = {
  name: "coins",
  description: "Подбросить монетку",
  async run(client, message) {
    const random = Math.floor(Math.random() * 4) + 1;
    message.channel.send("Монета подбрасывается...");
    if (random === 1) {
      message.channel.send(":full_moon: Орёл!")
    } else if (random === 2) {
      message.channel.send(":new_moon: Решка!")
    } else if (random === 3) {
      message.channel.send(":last_quarter_moon: Монета упала ребром!")
    }
  }
}