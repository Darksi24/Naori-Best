const express = require("express");
const fs = require("fs");
const path = require("path");
const bot = require("./telegram");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de prueba para que Vercel tenga un endpoint
app.get("/", (req, res) => {
  res.send("Bot activo y funcionando");
});

// Cargar comandos desde la carpeta "comandos"
const comandosPath = path.join(__dirname, "comandos");
fs.readdirSync(comandosPath).forEach(file => {
  const cmd = require(path.join(comandosPath, file));
  if (cmd.name && cmd.execute) {
    bot.command(cmd.name, ctx => cmd.execute(ctx));
    console.log(`Comando cargado: ${cmd.name}`);
  }
});

// Lanzar el bot
bot.launch()
  .then(() => console.log("Bot iniciado correctamente"))
  .catch(err => console.error("Error al iniciar el bot:", err));

// Iniciar el servidor (necesario para Vercel)
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
