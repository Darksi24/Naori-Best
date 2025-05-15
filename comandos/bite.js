const gifs = ["https://naori-best.vercel.app/gifs/bite.gif", "https://naori-best.vercel.app/gifs/bite2.gif", "https://naori-best.vercel.app/gifs/bite3.gif", "https://naori-best.vercel.app/gifs/bite4.gif", "https://naori-best.vercel.app/gifs/bite5.gif", "https://naori-best.vercel.app/gifs/bite6.gif", "https://naori-best.vercel.app/gifs/bite7.gif"];



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
        
        const count = ctx.state.interactionCount;


        await ctx.replyWithAnimation(randomGif,
        caption: `*${autor}* mordió a *${destinatario}*, mordidas dadas #${count}`,
                parse_mode: "Markdown"
            
        );



    }
}