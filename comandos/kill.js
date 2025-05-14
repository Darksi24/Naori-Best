const gifs = ["gifs/kill.gif", "gifs/kill2.gif", "gifs/kill3.gif", "gifs/kill4.gif", "gifs/kill5.gif", "gifs/kill6.gif", "gifs/kill7.gif", "gifs/kill8.gif", "gifs/kill9.gif"]


module.exports = {
    name: "kill",
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
            return ctx.reply("¿Porque me usarías eso contra mi?");
        }

        if (reply && reply.from.id === userId) {
            return ctx.reply("¿Porque te lo harias? es suicidio....")
        }



        await ctx.replyWithAnimation(
            {
                source: randomGif
            },
            {
                caption: `*${autor}* mató a *${destinatario}*`,
                parse_mode: "Markdown"
            }
        );


    }
}