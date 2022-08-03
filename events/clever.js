const Discord = require("discord.js");
const ai = require("clever-bot-api");
const translate = require("@vitalets/google-translate-api");

module.exports={
  run: (message)=>{
    if (message.channel.id === "992865052036190248" || message.channel.id === "992865626408357929") {
      if (message.content.startsWith(prefix)) {
        return message.channel.send("В данном канале нельзя использовать мои команды");
      } else if (message.content.indexOf(args) > -1 && message.author.bot == false) {
        const args = message.content.slice().split(" ");
        translate(`${args}`, { to: "en" }).then(res => {
          ai(res.text).then(
            async res => {
              translate(res, {from: "en",to: "ru"
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
  },
  event: "messageCreate"
}