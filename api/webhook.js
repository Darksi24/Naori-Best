const bot = require("../../telegram");

module.exports = async (req, res) => {
  try {
    console.log("Update recibido:", req.body);  // <-- Agrega esto para verificar
    await bot.handleUpdate(req.body);
    res.status(200).send("OK");
  } catch (err) {
    console.error("Error en webhook:", err);
    res.status(500).send("Error en webhook");
  }
};

console.log("BODY:", JSON.stringify(req.body, null, 2));
