const Discord = require("discord.js");

module.exports = {
  name: "channel-info",
  description: "Информация о сервере",
  async run(client, message, args) {
    const channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(" ").toLocaleLowerCase()) || message.channel;
    const channelType = {
      GUILD_TEXT: "Текстовой",
      UILD_VOICE: "Голосовой",
      GUILD_NEWS: "Новостной"
    }
    if (!channel) {
      return message.channel.send("Канал не найден");
    }

    const channelInfo = new Discord.MessageEmbed()
      .setTitle(`Информация о канале ${channel.name}`)
      .setThumbnail(message.guild.iconURL())
      .setColor("GREEN")
      .addFields(
        {
          name: "Описание", value: `${channel.topic || "Нет описания"}`
        },
        {
          name: "Тип", value: `${channelType[channel.type]}`
        },
        {
          name: "NSFW", value: `${channel.nsfw}`
        },
      )
      .setFooter({
        text: `🆔: ${channel.id} | Канал создан:`
      })
      .setTimestamp(`${channel.createdAt}`)
    message.channel.send({
      embeds: [channelInfo]
    });
  }
}