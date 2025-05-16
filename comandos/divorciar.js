const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../familias.json");

// Tu ID de Telegram (el "juez" que aprueba divorcios)
const OWNER_ID = 6262019167;

module.exports = {
  name: "divorciar",
  execute: async (ctx) => {
    const reply = ctx.message.reply_to_message;

    if (!reply) {
      return ctx.reply("Debes responder al mensaje del usuario con /divorciar.");
    }

    const from = ctx.from;
    const targetId = reply.from.id;
    const targetUsername = reply.from.username || "usuario";
    const fromUsername = from.username || "usuario";

    try {
      if (!fs.existsSync(filePath)) return ctx.reply("No hay matrimonios registrados.");
      const matrimonios = JSON.parse(fs.readFileSync(filePath));

      const match = Object.entries(matrimonios).find(([key, value]) => {
        return (
          (value.user1 === from.id && value.user2 === targetId) ||
          (value.user2 === from.id && value.user1 === targetId)
        );
      });

      if (!match) {
        return ctx.reply("No estás casado/a con esa persona.");
      }

      const [marriageId] = match;

      // Enviar solicitud al OWNER (juez)
      await ctx.telegram.sendMessage(
        OWNER_ID,
        `El usuario @${fromUsername} (${from.id}) desea divorciarse de @${targetUsername} (${targetId}).\n\n¿Deseas aprobar?`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "✅ Aprobar divorcio",
                  callback_data: `aprobarDivorcio_${marriageId}`
                },
                {
                  text: "❌ Rechazar",
                  callback_data: `rechazarDivorcio_${marriageId}`
                }
              ]
            ]
          }
        }
      );

      await ctx.reply("Solicitud de divorcio enviada al juez [@DSRK_24] del bot.");
    } catch (err) {
      console.error("Error en /divorciar:", err);
      ctx.reply("Ocurrió un error al procesar el divorcio.");
    }
  }
};
