const fs = require("fs");
const path = "./familias.json";

module.exports = {
  name: "familias",
  execute: async (ctx) => {
    if (!fs.existsSync(path)) return ctx.reply("No hay matrimonios registrados.");

    const data = JSON.parse(fs.readFileSync(path));
    const matrimonios = Object.values(data);

    if (matrimonios.length === 0) return ctx.reply("No hay matrimonios registrados.");

    let respuesta = "";

    for (let i = 0; i < matrimonios.length; i++) {
      const pareja = matrimonios[i];
      try {
        const [user1, user2] = await Promise.all([
          ctx.telegram.getChat(pareja.user1),
          ctx.telegram.getChat(pareja.user2)
        ]);

        const fecha = new Date(pareja.timestamp * 1000).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        });

        respuesta += `=≈=≈=≈=≈=≈=≈=≈=≈=≈=≈=≈=≈\n`;
        respuesta += `*Matrimonio ${i + 1}:*\n`;
        respuesta += `  » Esposo/a: ${user1.first_name}\n`;
        respuesta += `  » Esposa/o: ${user2.first_name}\n`;
        respuesta += `  » Desde: ${fecha}\n`;
      } catch (error) {
        respuesta += `*Matrimonio ${i + 1}:* [Error al obtener usuarios]\n`;
      }
    }

    respuesta += "=≈=≈=≈=≈=≈=≈=≈=≈=≈=≈=≈=≈";

    ctx.replyWithMarkdown(respuesta);
  }
};
