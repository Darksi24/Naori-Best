// /api/setup-webhook.js
const bot = require("../telegram");

module.exports = async function handler(req, res) {
  try {
    await bot.telegram.setWebhook(
      "https://naori-best.vercel.app/api/webhook",
      {
        allowed_updates: [
          "message",           // para comandos tipo /hug, /slap…
          "callback_query",    // para botones
          "new_chat_members"   // para mensajes de bienvenida
        ]
      }
    );
    return res.status(200).send("✅ Webhook configurado con allowed_updates.");
  } catch (err) {
    console.error("Error configurando webhook:", err);
    return res.status(500).send("❌ Error configurando webhook");
  }
};
