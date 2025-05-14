const gifs = ["https://naori-best.vercel.app/gifs/hug.gif", "https://naori-best.vercel.app/gifs/hug2.gif", "https://naori-best.vercel.app/gifs/hug3.gif", "https://naori-best.vercel.app/gifs/hug4.gif", "https://naori-best.vercel.app/gifs/hug5.gif", "https://naori-best.vercel.app/gifs/hug6.gif"];


module.exports = {
    name: "hug",
    execute: async (ctx) => {
        const autor = ctx.from.first_name;
        const reply = ctx.message.reply_to_message;
        const destinatario = reply ? reply.from.first_name: null;
        const userId = ctx.from.id;

        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];


        if (!destinatario) {
            return ctx.reply("Debes responder a un mensaje de alguien.");
        }}



    await ctx.replyWithAnimation(
        {
            source: randomGif
        },
        {
            caption: `*${autor}* le dio un abrazito a *${destinatario}*`,
            parse_mode: "Markdown"
        }
    );


}
}