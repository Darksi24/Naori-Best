const gifs = ["https://naori-best.vercel.app/gifs/kiss.gif", "https://naori-best.vercel.app/gifs/kiss2.gif", "https://naori-best.vercel.app/gifs/kiss3.gif", "https://naori-best.vercel.app/gifs/kiss4.gif", "https://naori-best.vercel.app/gifs/kiss5.gif", "https://naori-best.vercel.app/gifs/kiss6.gif", "https://naori-best.vercel.app/gifs/kiss7.gif"];

module.exports = {
    name: "kiss",
    execute: async (ctx) => {
        const autor = ctx.from.first_name;
        const reply = ctx.message.reply_to_message;
        const destinatario = reply ? reply.from.first_name: null;
        const userId = ctx.from.id;

        if (!destinatario) {
            return ctx.reply("Debes responder a un mensaje de alguien.");
        }

        if (reply && reply.from.id === userId) {
            return ctx.replyWithMarkdown(`Mejor... que alguien mas te bese *${autor}*`)
        }


        //cooldown}


        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

        await ctx.replyWithAnimation(randomGif,
            {
                caption: `*${autor}* le dio un besito a *${destinatario}*`,
                parse_mode: "Markdown"
            }
        );


    }
}