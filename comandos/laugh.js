
const gifs = ["https://naori-best.vercel.app/gifs/laugh.gif", "https://naori-best.vercel.app/gifs/laugh2.gif", "https://naori-best.vercel.app/gifs/laugh3.gif", "https://naori-best.vercel.app/gifs/laugh4.gif", "https://naori-best.vercel.app/gifs/laugh5.gif", "https://naori-best.vercel.app/gifs/laugh6.gif", "https://naori-best.vercel.app/gifs/laugh7.gif", "https://naori-best.vercel.app/gifs/laugh8.gif", "https://naori-best.vercel.app/gifs/laugh9.gif", "https://naori-best.vercel.app/gifs/laugh10.gif"];

module.exports = {
    name: "laugh",
    execute: async (ctx) => {
        const user = ctx.from.first_name;
        const reply = ctx.message.reply_to_message;
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
        const destinatario = reply ? reply.from.first_name: null;

        if (!destinatario) {
            return ctx.reply("Debes responder a alguien.");
        }

        if (reply && reply.from.id == ctx.botInfo.id) {
            return ctx.reply("Se quiere reir de mí el muy idiota, Jajaja");
        }

        await ctx.replyWithAnimation(randomGif, 
            {
                caption: `*${user}* se burla de *${destinatario}*`,
                parse_mode: "Markdown"
            }
        );




    }
}