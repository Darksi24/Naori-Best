const { setNSFW, getNSFW } = require("../utils/config");

module.exports = {
  name: "nsfw",
  execute: async (ctx) => {
    const text = ctx.message.text;
    const option = text.split(" ")[1];

    if (!option || !["on", "off"].includes(option.toLowerCase())) {
      const estado = getNSFW() ? "activado" : "desactivado";
      return ctx.reply(`Modo NSFW actualmente está *${estado}*`, { parse_mode: "Markdown" });
    }

    const nuevoEstado = option.toLowerCase() === "on";
    setNSFW(nuevoEstado);
    ctx.reply(`Modo NSFW ${nuevoEstado ? "activado" : "desactivado"} correctamente.`);
  }
};