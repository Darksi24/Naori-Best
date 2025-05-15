const { setNSFW, getNSFW } = require("../utils/config");

module.exports = {
  name: "nsfw",
  execute: async (ctx) => {
    const chat = ctx.chat;
    const user = ctx.from;

    // Si es un chat privado, solo el propietario puede cambiarlo
    if (chat.type === "private") {
      return ctx.reply("Este comando solo se puede usar en grupos.");
    }

    // Verificar si el usuario es admin del grupo
    try {
      const member = await ctx.telegram.getChatMember(chat.id, user.id);
      const esAdmin = ["administrator", "creator"].includes(member.status);

      if (!esAdmin) {
        return ctx.reply("Solo los administradores pueden cambiar el modo NSFW.");
      }
    } catch (err) {
      console.error("Error al verificar admin:", err);
      return ctx.reply("No se pudo verificar permisos. Intenta de nuevo.");
    }

    // Leer parámetro /nsfw on /nsfw off
    const parts = ctx.message.text.trim().split(/\s+/);
    const option = parts[1]?.toLowerCase();

    if (!option || !["on", "off"].includes(option)) {
      const estado = getNSFW() ? "activado" : "desactivado";
      return ctx.reply(`Modo NSFW actualmente está *${estado}*`, { parse_mode: "Markdown" });
    }

    const nuevo = option === "on";
    setNSFW(nuevo);
    await ctx.reply(`Modo NSFW *${nuevo ? "activado" : "desactivado"}*`, { parse_mode: "Markdown" });
  }
};
