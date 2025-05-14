const gifs = ["https://naori-best.vercel.app/gifs/sleep.gif", "https://naori-best.vercel.app/gifs/sleep2.gif", "https://naori-best.vercel.app/gifs/sleep3.gif", "https://naori-best.vercel.app/gifs/sleep4.gif", "https://naori-best.vercel.app/gifs/sleep5.gif", "https://naori-best.vercel.app/gifs/sleep6.gif", "https://naori-best.vercel.app/gifs/sleep7.gif", "https://naori-best.vercel.app/gifs/sleep8.gif"]


module.exports = {
    name: "sleep",
    execute: async (ctx) => {
        const autor = ctx.from.first_name;
        const userId = ctx.from.id;

        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];




        await ctx.replyWithAnimation(randomGif,
            {
                caption: `*${autor}* tiene sueeeeño...`,
                parse_mode: "Markdown"
            }
        );


    }
}