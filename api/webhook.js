// api/webhook.js
const bot = require("../telegram");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Use POST");
  }

  try {
    console.log("Update recibido:", JSON.stringify(req.body).slice(0, 200)); // log parcial
    await bot.handleUpdate(req.body);
    return res.status(200).send("OK");
  } catch (err) {
    console.error("Error en webhook:", err);
    return res.status(500).send("Error interno");
  }
};
