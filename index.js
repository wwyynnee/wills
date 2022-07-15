const Discord = require("discord.js");
const moment = require("moment");
const ms = require("ms");

const prefix = process.env.prefix;

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"]
});

const keepAlive = require("./server");

//ready
try {
  client.on("ready", () => {
    client.user.setPresence({
      activities: [{
        name: "w.help"
      }],
      status: "idle"
    });
    /*
      online - В сети
      idle - Неактивен
      dnd - Не беспокоить
    */
    /*
      Playing - Играет
      Streaming - Cтримит
      Listening - Cлушает
      Watching - Cмотрит
    */
    console.log("Запуск!");
  });

  client.on("guildCreate", guild => {
    const channels = guild.channels.cache.filter(channel => channel.type == "text");

    channels.first().send("Спасибо за приглашение!").catch(err => {
      console.error(err)
    });
  })
} catch (e) {
  console.log(e)
}

client.on("messageCreate", async message => {
  try {

    const argument = message.content.slice(prefix.length);
    const args = argument.split(" ");
    const cmd = args.shift().toLowerCase();

    /*
      Общение с AI
    */

    const ai = require("clever-bot-api");
    const translate = require("@vitalets/google-translate-api");

    if (message.channel.id === "992865052036190248" || message.channel.id === "992865626408357929") {
      if (message.content.startsWith(prefix)) {
        return message.channel.send("В данном канале нельзя использовать мои команды");
      } else if (message.content.indexOf(args) > -1 && message.author.bot == false) {
        const args = message.content.slice().split(" ");
        translate(`${args}`, { to: "en" }).then(res => {
          ai(res.text).then(
            async res => {
              translate(res, {
                from: "en",
                to: "ru"
              }).then(res => {
                return message.channel.send(res.text)
              });
            }).catch(err => {
              console.error(err)
            });
        }).catch(err => {
          console.error(err)
        })
      }
    }

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    if (cmd === "help") {
      const help = new Discord.MessageEmbed()
        .setTitle("Список команд")
        .setColor("#00ff00")
        .setFields(
          {
            name: "Основные", value: `w.avatar — Посмотреть аватар пользователя\nw.invite — Пригласить бота на сервер\nw.anime — Узнать информацию об аниме\nw.bot-info — Информация о боте`
          },
          {
            name: "Развлекательные", value: `w.coins — Подбросить монетку\nw.8ball — Задать вопрос магическому шару`
          },
          /*{
            name: "Музыкальные", value: `w.play — Включить музыку\nw.skip — Пропуск трека\nw.lyrics — Текст песни\nw.queue — Добавить в очередь\nw.filter — Установить фильтр\nw.join — Подключение к голосовому каналу\nw.leave — Отключить от голосового канала`
          },*/
          {
            name: "Модерация", value: `w.clear — Удалить сообщения\nw.say — Написать от лица бота\nw.announce — Сделать объявление`
          },
        )
        .setFooter({
          text: `${client.user.tag}`
        })
        .setTimestamp()
      message.channel.send({
        embeds: [help]
      })

    } else if (cmd === "ping") {
      const timeTaken = Date.now() - message.createdTimestamp;
      let gatewayLatency = Math.floor(client.ws.ping);
      message.channel.send(`Ping: \`${timeTaken}ms\`\nApi: \`${gatewayLatency}ms\``);
    } else if (cmd === "clear") {
      if (!message.member.permissions.has("MANAGE_MESSAGES")) {
        return message.channel.send("У вас нет прав [Управление сообщениями]");
      } else if (!args) {
        return message.channel.send("Вы не указали сколько сообщений нужно удалить!");
      } else if (isNaN(args)) {
        return message.channel.send("Это не число!");
      } else if (args > 100) {
        return message.channel.send("Вы не можете удалить 100 или более сообщений за раз");
      } else if (args < 1) {
        return message.channel.send("Вы должны ввести число больше чем 1");
      }

      async function __delete() {
        await message.channel.messages.fetch({
          limit: args
        }).then(messages => {
          message.channel.bulkDelete(messages)
          message.channel.send(`Удалено ${args} сообщений!`)
        })
      };
      __delete();
    } else if (cmd === "coins") {
      const random = Math.floor(Math.random() * 4) + 1;
      message.channel.send("> Монета подбрасывается...");
      if (random === 1) {
        message.channel.send("> :full_moon: Орёл!")
      } else if (random === 2) {
        message.channel.send("> :new_moon: Решка!")
      } else if (random === 3) {
        message.channel.send("> :last_quarter_moon: Монета упала ребром!")
      }
    } else if (cmd === "say") {
      if (!message.member.permissions.has("MANAGE_MESSAGES")) {
        return message.channel.send("У вас нет прав [Управление сообщениями]");
      } else if (!args[0]) {
        return message.channel.send("Введите текст")
      }
      message.channel.send(args.join(" "))
      message.delete().catch();
    } else if (cmd === "8ball") {
      let replyes = [
        "Да!",
        "Нет.",
        "Возможно",
        "Я не знаю!",
        "Можешь не сомневаться в этом!",
        "Ну конечно же нет!",
        "Я не уверен спроси позже"
      ]

      if (!args[0]) {
        return message.channel.send("Вы не задали вопрос")
      }

      let result = replyes[Math.floor(Math.random() * replyes.length)]
      message.channel.send(`${result}`)
    } else if (cmd === "avatar") {
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
    } else if (cmd === "invite") {
      const embed = new Discord.MessageEmbed()
        .setAuthor({
          name: `Пригласить ${client.user.tag} на сервер!`,
          iconURL: client.user.displayAvatarURL(),
        })
        .setColor("BLUE")
        .setDescription(`Вы можете пригласить меня, нажав [здесь](https://discord.com/api/oauth2/authorize?client_id=980377656291913728&permissions=8&scope=bot)`);
      message.channel.send({
        embeds: [embed]
      })
    } else if (cmd === "rules") {
      if (message.author.id !== "980103023034527865") return;
      const rules = new Discord.MessageEmbed()
        .setColor("#DBA5FF")
        .setTitle("Правила сервера")
        .setDescription(`**Добро пожаловать на сервер ${message.guild.name}! Для комфортного общения, тебе следует прочитать наши правила.\nВот что у нас запрещено (в скобках указаны примерные наказания за эти действия):**`)
        .addFields(
          {
            name: "Текстовые каналы", value: `\`1.1\` Реклама чего-либо, спам (В лс - бан, на сервере - мьют от 24ч. до бана)\n\`1.2\` Флуд, злоупотребление CAPS, многочисленные упоминания без причины (Мьют от 1ч.)\n\`1.3\` Неадекватное, агрессивное и провокационное поведение, а также ответ на провокации (Мьют от 1ч.)\n\`1.4\` Любые оскорбления, в т.ч. семьи и себя, а также дискриминация и травля по любому признаку (Мьют от 1ч. до бана)\n\`1.5\` Торговля и обмен чем-либо, предложение различных услуг, попрошайничество (Мьют от 24ч.)\n\`1.6\` Распространение вредоносных файлов и ПО, а также фишинг ссылок (Мьют от 12ч. до бана)\n\`1.7\` Жестокие и откровенные материалы вне <#823588601706971136> (От предупреждения до мьюта)\n\`1.8\` Пропаганда нездорового образа жизни, суицида и т.п (Мьют от 1ч.)\n\`1.9\` Обход наказаний и ограничений любым способом (От продления наказания до бана)\n\`1.10\` Офф-топик, сообщения не по теме канала (От предупреждения до мьюта)`
          },
          {
            name: "Голосовые каналы", value: `
          \`2.1\` Посторонние звуки, мешающие общению или прослушиванию (Мьют микрофона от 5мин.)\n\`2.2\` Использование музыкального бота в непредназначенном для него канале (От предупреждения до мьюта микрофона/ушей)\n\`2.3\` Частое переподключение и перемещение по каналам (От предупреждения до запрета на подключение)\n\`2.4\` Неадекватная манера речи, оскорбление, токсичность и прочее (Мьют микрофона от 10мин.)`
          },
          {
            name: "Правила Discord", value: `\`3.1\` Нарушение [правил сообщества Discord](https://discord.com/guidelines).\n\`3.2\` Несоблюдение [условий использования Discord](https://discord.com/terms).`
          },
          {
            name: "Рекомендации", value: `Не стоит использовать недостатки правил, прикрываясь ими и доказывая за счет них свою правоту. Также не надо обсуждать и осуждать решения администраторов и модераторов сервера, они могут действовать в зависимости от ситуации по-разному и с некоторым отхождением от общих правил.`
          },
        )
      message.delete().catch();
      message.channel.send({
        embeds: [rules]
      });
    } else if (cmd === "restart") {
      if (message.author.id !== "980103023034527865") return;
      message.channel.send("Перезагрузка выполняется!")
      console.log("Перезагрузка!")
      process.exit()
    } else if (cmd === "server-info") {
      let verifilv = ["Отсутствует", "Низкий", "Средний", "Высокий", "Очень высокий"]
      let serverinfo = new Discord.MessageEmbed()
        .setAuthor({
          name: message.guild.name,
          iconURL: message.guild.iconURL
        })
        .setThumbnail(message.guild.iconURL)
        .setTitle("👑 Информация о сервере 👑")
        .setColor("#00ff00")
        .addFields(
          {
            name: "🌟 Владелец:", value: message.guild.owner
          },
          {
            name: "🏳️ Регион:", value: message.guild.region
          },
          {
            name: "🌠 Участники:", value: `${message.guild.presences.size} в сети\n${message.guild.memberCount} всего`
          },
          /*{
            name: "⚙️ Каналы:", value: `${message.guild.channels(c => c.type == "text").size} текстовых\n${message.guild.channels(c => c.type == "voice").size} голосовых`
          },*/
          {
            name: "♻️ Уровень проверки:", value: verifilv[message.guild.verificationLevel]
          },
          {
            name: "♾️ Ролей:", value: message.guild.roles.size
          },
          {
            name: "😀 Эмодзи:", value: message.guild.emojis.size
          },
        )
        .setFooter({
          text: `🆔 Сервера: ${message.guild.id} | Сервер создан:`
        })
        .setTimestamp(new Date(message.guild.createdTimestamp))
      message.channel.send({
        embeds: [serverinfo]
      })

    } else if (cmd === "anime") {
      const malScraper = require("mal-scraper");
      const search = `${args}`

      if (!search) {
        return message.channel.send("Введите название аниме")
      }

      malScraper.getInfoFromName(search).then((data) => {
        const anime = new Discord.MessageEmbed()
          .setAuthor(`Результаты поиска ${args}`.split(",").join(" "))
          .setThumbnail(data.picture)
          .setColor("#00ff00")
          .addFields(
            {
              name: "Английское название:", value: data.englishTitle
            },
            {
              name: "Японское название:", value: data.japaneseTitle
            },
            {
              name: "Тип:", value: data.type
            },
            {
              name: "Эпизодов:", value: data.episodes
            },
            {
              name: "Рейтинг:", value: data.rating
            },
            {
              name: "Эфир:", value: data.aired
            },
            {
              name: "Оценка:", value: data.score
            },
            {
              name: "Очков:", value: data.scoreStats
            },
            {
              name: "Ссылка:", value: data.url
            },
          )
          .setFooter({
            text: `${client.user.tag}`
          })
          .setTimestamp()
        message.channel.send({
          embeds: [anime]
        })
      })

    } else if (cmd === "announce") {
      if (!message.member.permissions.has("MANAGE_MESSAGES")) {
        return message.channel.send("У вас нет прав [Управление сообщениями]");
      } else if (!args[0]) {
        return message.channel.send("Введите объявление")
      }

      const announce = new Discord.MessageEmbed()
        .setTitle("Объявление")
        .setDescription(args.join(" "))
        .setColor("#00ff00")
        .setFooter({
          text: `Объявлено: ${message.author.tag}`
        })
        .setTimestamp()
      message.delete()
      message.channel.send({
        embeds: [announce]
      })

    } else if (cmd === "bot-info") {
      const botinfo = new Discord.MessageEmbed()
        .setTitle("👑 Информация о боте 👑")
        .setColor("#00ff00")
        .setDescription("Функциональный бот для любого сервера")
        .addFields(
          {
            name: "🌟 Создатель бота", value: "Wynne#5531"
          },
          {
            name: "🔥 Название бота", value: `${client.user.tag}`
          },
          {
            name: "💫 Бот создан", value: `${moment.utc(client.user.createdAt).format("dddd, MMMM Do YYYY")} (${ms(Date.now() - client.user.createdAt, { long: true })})`
          },
        )
        .setFooter({
          text: "🆔: 700643975043743827"
        })
        .setTimestamp();
      message.channel.send({
        embeds: [botinfo]
      })
    }

  } catch (e) {
    console.log(e)
  }
})

keepAlive()
client.login(process.env.token);