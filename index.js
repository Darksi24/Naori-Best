const express = require("express");
const app = express();

// Inicia el bot
require("./telegram"); // Esto lanza el bot

// Ruta web simple
app.get("/", (req, res) => {
  res.send("Bot activo y funcionando.");
});

// Inicia servidor web
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor web corriendo en puerto ${PORT}`);
});
