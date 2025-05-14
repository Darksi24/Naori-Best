import telegramBot from "../telegram.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Use POST");
  }
  try {
    // Telegram envía JSON con la actualización
    await telegramBot.handleUpdate(req.body);
    return res.status(200).send("OK");
  } catch (err) {
    console.error("Error en webhook:", err);
    return res.status(500).send("Error interno");
  }
}
