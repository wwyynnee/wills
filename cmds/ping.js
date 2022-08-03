const Discord = require("discord.js");

module.exports={
	name: "ping",
	description: "Посмотреть пинг веб-сокета",
	async run(client,message,args) {
    const timeTaken = Date.now() - message.createdTimestamp;
    let gatewayLatency = Math.floor(client.ws.ping);
    message.channel.send(`Ping: \`${timeTaken}ms\`\nApi: \`${gatewayLatency}ms\``);
  }
}