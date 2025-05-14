const gifs = ["gifs/sleep.gif", "gifs/sleep2.gif", "gifs/sleep3.gif", "gifs/sleep4.gif", "gifs/sleep5.gif", "gifs/sleep6.gif", "gifs/sleep7.gif", "gifs/sleep8.gif"]


module.exports = {
    name: "sleep",
    execute: async (ctx) => {
        const autor = ctx.from.first_name;
        const userId = ctx.from.id;

        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];




        await ctx.replyWithAnimation(
            {
                source: randomGif
            },
            {
                caption: `*${autor}* tiene sueeeeño...`,
                parse_mode: "Markdown"
            }
        );


    }
}