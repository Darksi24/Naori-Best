const gifs = ["https://naori-best.vercel.app/gifs/lick.gif", "https://naori-best.vercel.app/gifs/lick2.gif", "https://naori-best.vercel.app/gifs/lick3.gif", "https://naori-best.vercel.app/gifs/lick4.gif", "https://naori-best.vercel.app/gifs/lick5.gif", "https://naori-best.vercel.app/gifs/lick6.gif", "https://naori-best.vercel.app/gifs/lick7.gif"];


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



        await ctx.replyWithAnimation(randomGif,
            {
                caption: `*${autor}* lamió a *${destinatario}*`,
                parse_mode: "Markdown"
            }
        );


    }
}
