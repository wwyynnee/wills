const express = require("express");
const server = express();

let message = "Бот запускается...";
server.all("/", (req, res) => {
  res.send(message)
})

server.listen(process.env.PORT, () => {
  console.log("Сервер готов")
})

module.exports = {
  run: () => {
    message = "Бот запущен!"
  },
  event: "ready"
}