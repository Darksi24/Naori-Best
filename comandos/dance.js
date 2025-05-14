const gifs = ["https://naori-best.vercel.app/gifs/dance.gif", "https://naori-best.vercel.app/gifs/dance2.gif", "https://naori-best.vercel.app/gifs/dance3.gif", "https://naori-best.vercel.app/gifs/dance4.gif", "https://naori-best.vercel.app/gifs/dance5.gif", "https://naori-best.vercel.app/gifs/dance6.gif", "https://naori-best.vercel.app/gifs/dance7.gif"];


module.exports = {
    name: "dance",
    execute: async (ctx) => {
        const autor = ctx.from.first_name;
        const userId = ctx.from.id;

        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];



        await ctx.replyWithAnimation(
            {
                source: randomGif
            },
            {
                caption: `*${autor}* se puso a bailar :D`,
                parse_mode: "Markdown"
            }
        );


    }
}