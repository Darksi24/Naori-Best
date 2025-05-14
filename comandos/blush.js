const gifs = ["https://naori-best.vercel.app/gifs/blush.gif", "https://naori-best.vercel.app/gifs/blush2.gif", "https://naori-best.vercel.app/gifs/blush3.gif", "https://naori-best.vercel.app/gifs/blush4.gif", "https://naori-best.vercel.app/gifs/blush5.gif", "https://naori-best.vercel.app/gifs/blush6.gif", "https://naori-best.vercel.app/gifs/blush7.gif", "https://naori-best.vercel.app/gifs/blush8.gif", "https://naori-best.vercel.app/gifs/blush9.gif"];


module.exports = {
    name: "blush",
    execute: async (ctx) => {
        const autor = ctx.from.first_name;
        const userId = ctx.from.id;

        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];



        await ctx.replyWithAnimation(randomGif,
            {
                caption: `*${autor}* se sonrojó 0////0`,
                parse_mode: "Markdown"
            }
        );


    }
}