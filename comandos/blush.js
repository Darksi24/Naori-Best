const cooldowns = new Map(); // fuera del export para mantener entre llamadas
const COOLDOWN_TIME = 20000; // en milisegundos (5 segundos por ejemplo)
const gifs = ["gifs/blush.gif", "gifs/blush2.gif", "gifs/blush3.gif", "gifs/blush4.gif", "gifs/blush5.gif", "gifs/blush6.gif", "gifs/blush7.gif", "gifs/blush8.gif", "gifs/blush9.gif"]


module.exports = {
    name: "blush",
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
                caption: `*${autor}* se sonrojó 0////0`,
                parse_mode: "Markdown"
            }
        );


    }
}