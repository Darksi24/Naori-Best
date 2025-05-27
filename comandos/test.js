module.exports = {
    name: "testboton",
      execute: async (ctx) => {
          return ctx.reply("¿Te funciona este botón?", {
                reply_markup: {
                        inline_keyboard: [[{ text: "✅ Sí", callback_data: "boton_prueba" }]]
                              }
                                  });
                                    }
                                    };
