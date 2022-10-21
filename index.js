const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client({ intents: 28373 });
client.commands = new Discord.Collection(); 

// .env
const prefix = process.env.prefix;
const token = process.env.token;

try {
  client.on("ready", async () => {
    console.log("Запуск!");
    client.user.setPresence({
      activities: [{
        name: "w.help",
        type: "LISTENING"
      }],
      status: "dnd"
    });
  })

  client.on("error", (e) => {
    console.log("Ошибка:", e);
  });
  
  client.on("debug", (e) => {
    console.log("Отладка:", e);
  });
} catch (e) {
  console.log(e)
}

fs.readdir("./cmds", (err, dirs) => {
  dirs = dirs.filter(i => fs.lstatSync("./cmds/" + i).isDirectory());
  dirs.map(dir => {
    fs.readdir("./cmds/" + dir, (err, files) => {
      files = files.filter(i => i.endsWith(".js"));
      files.map(file => {
        let command = require("./cmds/" + dir + "/" + file);
        client.commands.set(command.name, command);
      })
    })
  })
})

fs.readdir("events", (err, files) => {
  files = files.filter(i => i.endsWith(".js"));
  files.map(file => {
    let props = require("./events/" + file);
    client.on(props.event, (...args) => props.run(...args));
  })
})


client.on("messageCreate", async message => {  
  const argsInterserver = message.content.slice().split(" ").join(" ");

  //if (message.author.id == "1002291347102904440") return;

  const channel1 = "1009765734987079742";
  const channel2 = "1009723616188977152";
  const channel3 = "1009687114570543144";

  let interserverImage = message.attachments.size > 0 ? message.attachments.first().url : "";
  
  const interserver = new Discord.MessageEmbed()
    .setAuthor({
      name: `${message.author.username}`,
      iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`
    })
    .setColor("#03ffc8")
    .setDescription( String(argsInterserver) )
    .setImage(`${interserverImage}`)
    .setFooter({ text: `С сервера ${message.guild.name}` })

  const interserverError = new Discord.MessageEmbed()
    .setTitle("Что-то пошло не так :/")
    .setColor("RED")
    .setDescription("Попробуйте снова через какое-то время или обратитесь к Wynne#5531")

  switch (message.channel.id) {
    case channel1:
      if (message.content.indexOf(argsInterserver) <= 1) {
        if (message.author.bot == false) {
          client.channels.cache.get(channel2).send({
            embeds: [interserver]
          })
          client.channels.cache.get(channel3).send({
            embeds: [interserver]
          })
          message.react("<:send:1009721052429041735>")
        }
      } else {
        message.reply({ embeds: [interserverError] })
      }
      break;
    case channel2:
      if (message.content.indexOf(argsInterserver) <= 1) {
        if (message.author.bot == false) {
          client.channels.cache.get(channel1).send({ embeds: [interserver] })
          client.channels.cache.get(channel3).send({ embeds: [interserver] })
          message.react("<:send:1009721052429041735>")
        }
      } else {
        message.reply({ embeds: [interserverError] })
      }
      break;
    case channel3:
      if (message.content.indexOf(argsInterserver) <= 1) {
        if (message.author.bot == false) {
          client.channels.cache.get(channel2).send({ embeds: [interserver] })
          client.channels.cache.get(channel1).send({ embeds: [interserver] })
          message.react("<:send:1009721052429041735>")
        }
      } else {
        message.reply({ embeds: [interserverError] })
      }
      break;
  }

  if (
    !message.content.startsWith(process.env.prefix) ||
    message.author.bot ||
    !message.guild
  ) return;

  let messageArray = message.content.split(" ")
  let command = messageArray[0]
  let args = messageArray.slice(1)

  let command_file = client.commands.get(command.slice(prefix.length))
  if (command_file) {
    command_file.run(client, message, args)
  }
})

client.login(token);