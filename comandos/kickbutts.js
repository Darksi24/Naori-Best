const gifs = ["https://naori-best.vercel.app/gifs/kickbutts.gif", "https://naori-best.vercel.app/gifs/kickbutts2.gif", "https://naori-best.vercel.app/gifs/kickbutts3.gif", "https://naori-best.vercel.app/gifs/kickbutts4.gif", "https://naori-best.vercel.app/gifs/kickbutts5.gif", "https://naori-best.vercel.app/gifs/kickbutts6.gif", "https://naori-best.vercel.app/gifs/kickbutts7.gif"];


module.exports = {
    name: "kickbutts",
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
            return ctx.reply("¿Porque yo? ¿que te hice?");
        }
        
        if (reply && reply.from.id === userId) {
            return ctx.reply("Sería Ilógico....")
        }


        
        await ctx.replyWithAnimation(
            {
                source: randomGif
            },
            {
                caption: `*${autor}* pateó a *${destinatario}*`,
                parse_mode: "Markdown"
            }
        );


    }
}