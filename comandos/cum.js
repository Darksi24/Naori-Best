const blacklist = [, 1234567, 6262019167]
const {
    getNSFW
} = require("../utils/config");


module.exports = {
    name: "cum",
    execute: async (ctx) => {

        const autor = ctx.from.first_name;
        if (!getNSFW()) {
            return ctx.reply("Este comando está desactivado porque el modo NSFW está apagado.");
        }


        //cooldown

        const userId = ctx.from.id;
        if (blacklist.includes(userId)) {
            return ctx.replyWithMarkdown(`*${autor}* no mas chaquetas para ti, \nBLACKLIST`)
        }







        //primero


        //Segundo
        const reply = ctx.message.reply_to_message;
        const destinatario = reply ? reply.from.first_name: null;

        if (reply && reply.from.id === ctx.botInfo.id) {
            return ctx.reply("No puedes hacer eso conmigo, puto enfermo...");
        }

        if (!destinatario) {
            return ctx.reply("Debes responder al mensaje de alguien")
        }



        const args = ctx.message.text.split(" ").slice(1);
        const mencionado = ctx.message.entities?.find(e => e.type === "text_mention" || e.type === "mention");


        //random gifs
        const gifs = ["https://naori-best.vercel.app/gifs/cum.gif",
            "https://naori-best.vercel.app/gifs/cum2.gif"]; // Agrega los nombres de tus archivos aquí
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

        await ctx.replyWithAnimation(randomGif,
            {
                caption: `*${autor}* se vino en *${destinatario}*`,
                parse_mode: "Markdown"
            });
    }
}