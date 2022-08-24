const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "Посмотреть пинг веб-сокета",
  async run(client, message) {
    if (message.author.id != "980103023034527865") return;
    const timeTaken = Date.now() - message.createdTimestamp;
    let gatewayLatency = Math.floor(client.ws.ping);
    message.channel.send(`Ping: \`${timeTaken}ms\`\nApi: \`${gatewayLatency}ms\``);
  }
}