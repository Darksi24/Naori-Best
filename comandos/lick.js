const gifs = ["gifs/lick.gif", "gifs/lick2.gif", "gifs/lick3.gif", "gifs/lick4.gif", "gifs/lick5.gif", "gifs/lick6.gif", "gifs/lick7.gif"]


module.exports = {
    name: "lick",
    execute: async (ctx) => {
        const autor = ctx.from.first_name;
        const reply = ctx.message.reply_to_message;
        const destinatario = reply ? reply.from.first_name: null;
        const userId = ctx.from.id;

        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

        if (!destinatario) {
            return ctx.reply("Debes responder a un mensaje.");
        }

        if (reply && reply.from.id === ctx.botInfo.id) {
            return ctx.reply("¿Porque yo? ni me gusta...");
        }

        if (reply && reply.from.id === userId) {
            return ctx.reply("Mejor besa un espejo....")
        }



        await ctx.replyWithAnimation(
            {
                source: randomGif
            },
            {
                caption: `*${autor}* lamió a *${destinatario}*`,
                parse_mode: "Markdown"
            }
        );


    }
}