const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../familias.json");

// Tu ID de Telegram
const OWNER_ID = 6262019167;

module.exports = {
    name: "divorciar",
    execute: async (ctx) => {
        const reply = ctx.message.reply_to_message;
        const args = ctx.message.text.split(" ");
        const mention = args[1];

        if (!mention || !mention.startsWith("@")) {
            return ctx.reply("Usa /divorciar [@user]");
        }

        const from = ctx.from;
        const chat = ctx.chat;

        // Obtener username objetivo
        const targetUsername = mention.replace("@", "").toLowerCase();

        try {
            // Buscar en matrimonios
            if (!fs.existsSync(filePath)) return ctx.reply("No hay matrimonios registrados.");
            const matrimonios = JSON.parse(fs.readFileSync(filePath));

            const match = Object.entries(matrimonios).find(([key, value]) => {
                return (
                    (value.user1 === from.id || value.user2 === from.id) &&
                    (value.user1_username?.toLowerCase() === targetUsername || value.user2_username?.toLowerCase() === targetUsername)
                );
            });

            if (!match) {
                return ctx.reply("No estás casado/a con esa persona.");
            }

            const [marriageId,
                datos] = match;

            // Enviar solicitud al OWNER
            await ctx.telegram.sendMessage(OWNER_ID, `El usuario @${from.username} (${from.id}) desea divorciarse de @${targetUsername}.\n\n¿Deseas aprobar?`, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "✅ Aprobar divorcio",
                            callback_data: `aprobarDivorcio_${marriageId}`
                        },
                            {
                                text: "❌ Rechazar",
                                callback_data: `rechazarDivorcio_${marriageId}`
                            }]
                    ]
                }
            });

            await ctx.reply("Solicitud de divorcio enviada al juez [@DSRK_24] del bot.");
        } catch (err) {
            console.error("Error en /divorciar:", err);
            ctx.reply("Ocurrió un error.");
        }
    }
};
