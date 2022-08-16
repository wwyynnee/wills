const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client({ intents: 28373 });
client.commands = new Discord.Collection();

// .env
const prefix = process.env.prefix;
const token = process.env.token;

const clientId = "980103023034527865";
const { REST } = require("@discordjs/rest");
const rest = new REST({ version: "10" }).setToken(token);
(async () => {
	try {
		console.log("Запустились слэш-команды");

		await rest.put(
			Discord.Routes.applicationGuildCommands(clientId),
			{ body: commands },
		);

		console.log("Успешно перезагружены слэш-команды приложения");
	} catch (error) {
		console.error(error);
	}
})();

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


try {
  client.on("ready", async () => {
    client.user.setPresence({
      activities: [{
        name: "я воскрес",
        type: "LISTENING"
      }],
      status: "dnd"
    });
    console.log("Запуск!");
  })
} catch (e) {
  console.log(e)
}

client.on("messageCreate", async message => {
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