const fs = require("fs");
const path = "./familias.json";

module.exports = {
  name: "marry",
  execute: async (ctx) => {
    const autor = ctx.from;
    const reply = ctx.message.reply_to_message;

    if (!reply || reply.from.is_bot) {
      return ctx.reply("Debes responder al mensaje de una \"persona\"");
    }

    if (reply.from.id === autor.id) {
      return ctx.reply("¿Casarte contigo mismo? Mejor no.");
    }

    const data = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : {};

    // Revisa si ya están casados
    for (const m of Object.values(data)) {
      if ((m.user1 === autor.id && m.user2 === reply.from.id) || (m.user1 === reply.from.id && m.user2 === autor.id)) {
        return ctx.reply("¡Ya están casados!");
      }
    }

    // Enviar botones para aceptar o rechazar
    ctx.replyWithMarkdown(
      `*${autor.first_name}* ha propuesto matrimonio a *${reply.from.first_name}*.`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Aceptar", callback_data: `aceptar_${autor.id}_${reply.from.id}` },
              { text: "Rechazar", callback_data: `rechazar_${autor.id}_${reply.from.id}` }
            ]
          ]
        }
      }
    );
  }
};
