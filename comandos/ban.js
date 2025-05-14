module.exports = {
    name: "ban",
    execute: async (ctx) => {
        try {
            // Verificar si el que ejecuta es admin
            const admins = await ctx.getChatAdministrators();
            const isAdmin = admins.some(admin => admin.user.id === ctx.from.id);
            if (!isAdmin) return ctx.reply("No eres admin, creo...");

            // Verificar si se respondió a alguien
            const target = ctx.message.reply_to_message?.from;
            if (!target) return ctx.reply("Responde al mensaje de quien quieres banear.");

            // Ejecutar el ban
            await ctx.telegram.banChatMember(ctx.chat.id, target.id);
            await ctx.replyWithPhoto(
                {
                    source: "ban.jpg"
                },
                {
                    caption: "No aguanto el modo HOT, JAJAJA",
                    parse_mode: "Markdown"
                }
            );
        } catch (err) {
            ctx.reply(`Error brou: ${err.message}`);
        }
    }
};