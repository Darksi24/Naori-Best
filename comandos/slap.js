const gif = ["gifs/slap.gif", "gifs/slap2.gif", "gifs/slap3.gif", "gifs/slap4.gif", "gifs/slap5.gif", "gifs/slap6.gif"];

module.exports = {
    name: "slap",
    execute: async (ctx) => {
        //cooldown
        const userId = ctx.from.id;


        //auto slap bot
        const reply = ctx.message.reply_to_message;


        if (reply && reply.from.id === ctx.botInfo.id) {
            return ctx.reply("No puedes hacer eso conmigo...");
        }
        //auto slap user

        if (reply && reply.from.id === userId) {
            return ctx.reply("¿Por que te cacheteas a ti mismo?")
        }

        const name = ctx.from.first_name;

        const destinatario = reply ? reply.from.first_name: null;

        if (!destinatario) {
            return ctx.reply("Debes responder a un mensaje o mencionar a alguien.");
        }



        const randomGif = gif[Math.floor(Math.random() * gif.length)];



        await ctx.replyWithAnimation(
            {
                source: randomGif
            },
            {
                caption: `¡*${name}* le dio una cachetada a *${destinatario}*!`,
                parse_mode: "Markdown"
            });
    }
}