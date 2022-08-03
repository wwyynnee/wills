const Discord = require("discord.js");
const ai = require("clever-bot-api");
const translate = require("@vitalets/google-translate-api");

module.exports = {
  run: (message) => {
    let args = message.content.split(" ");
    if (message.channel.id === "992865052036190248" || message.channel.id === "992865626408357929" || message.channel.id === "1000277360475652157") {
      if (message.content.startsWith(process.env.prefix)) {
        return message.channel.send("В данном канале нельзя использовать мои команды");
      } else if (message.author.bot == false) {
        translate(`${args}`, { to: "en" }).then(res => {
          ai(res.text, "fake-session").then(async res => {
            if (res) {
              translate(res, {
                from: "en", to: "ru"
              }).then(res => {
                return message.reply(res.text)
              });
            } else {
              return message.reply("Мне нечего ответить...")
            }
          }).catch(err => {
            console.error(err)
          });
        }).catch(err => {
          console.error(err)
        })
      }
    }
  },
  event: "messageCreate"
}