const gifs = ["gifs/bite.gif", "gifs/bite3.gif", "gifs/bite4.gif", "gifs/bite6.gif", "gifs/bite7.gif"];



module.exports = {
    name: "bite",
    execute: async (ctx) => {

        const autor = ctx.from.first_name;
        const reply = ctx.message.reply_to_message;
        const destinatario = reply ? reply.from.first_name: null;

        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

        if (!destinatario) {
            return ctx.reply("Debes responder a un mensaje o mencionar a alguien.");
        }

        if (reply && reply.from.id === ctx.botInfo.id) {
            return ctx.reply("No puedes hacer eso conmigo, soy solo un bot...");
        }


        const userId = ctx.from.id;


        await ctx.replyWithAnimation(
            {
                source: randomGif
            },
            {
                caption: `*${autor}* mordió a *${destinatario}*`,
                parse_mode: "Markdown"
            }
        );



    }
}
