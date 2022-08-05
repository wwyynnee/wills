const express = require("express");
const server = express();

let message = "Бот запускается...";
server.all("/", (req, res) => {
  res.send(message)
})

server.listen(3000, () => {
  console.log("Сервер готов")
})

module.exports= {
  run: () => {
    message = "Бот запущен!"
  },
  event: "ready"
}