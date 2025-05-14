const express = require("express");
const bot = require("./telegram");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot activo y funcionando");
});

app.listen(3000, () => {
  console.log("Servidor web corriendo en puerto 3000");
});
