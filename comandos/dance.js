const gifs = ["gifs/dance.gif", "gifs/dance2.gif", "gifs/dance3.gif", "gifs/dance4.gif", "gifs/dance5.gif", "gifs/dance6.gif", "gifs/dance7.gif"]


module.exports = {
    name: "dance",
    execute: async (ctx) => {
        const autor = ctx.from.first_name;
        const userId = ctx.from.id;

        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];


        
        const now = Date.now();

        if (cooldowns.has(userId)) {
            const expiration = cooldowns.get(userId);
            if (now < expiration) {
                const timeLeft = ((expiration - now) / 1000).toFixed(1);
                return ctx.reply(`Espera ${timeLeft}s antes de usar esto otra vez.`);
            }
        }

        cooldowns.set(userId, now + COOLDOWN_TIME)

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
