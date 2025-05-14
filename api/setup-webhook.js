// /api/setup-webhook.js
const bot = require("../telegram");

module.exports = async function handler(req, res) {
  try {
    await bot.telegram.setWebhook("https://naori-best.vercel.app/api/webhook");
    return res.status(200).send("Webhook configurado 👍");
  } catch (err) {
    console.error("Error configurando webhook:", err);
    return res.status(500).send("Error configurando webhook");
  }
};